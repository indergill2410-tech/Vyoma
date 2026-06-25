import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { getProduct as getLocalProduct } from "@/lib/catalog";
import { shopifyConfigured, getProduct as getShopifyProduct } from "@/lib/shopify";

// A review's productSlug must point at a real product. Shopify is authoritative;
// fall back to the local catalog when the store isn't connected yet.
async function productExists(slug) {
  if (!slug) return false;
  if (shopifyConfigured()) {
    try {
      if (await getShopifyProduct(slug)) return true;
    } catch {
      /* fall through to local */
    }
  }
  return Boolean(getLocalProduct(slug));
}

// GET /api/reviews?slug=...  → approved reviews + average (public)
// GET /api/reviews?admin=1   → all reviews (admin only)
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("admin")) {
    if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
    return NextResponse.json({ reviews });
  }

  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const reviews = await prisma.review.findMany({
    where: { productSlug: slug, status: "approved" },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  const count = reviews.length;
  const average = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return NextResponse.json({ reviews, count, average });
}

// POST /api/reviews — submit a review (public; lands as "pending")
export async function POST(req) {
  try {
    const { slug, author, rating, title, body } = await req.json();
    if (!(await productExists(slug))) return NextResponse.json({ error: "Unknown product" }, { status: 400 });

    const r = parseInt(rating, 10);
    if (!(r >= 1 && r <= 5)) return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 });
    const name = String(author || "").trim().slice(0, 80);
    const text = String(body || "").trim().slice(0, 2000);
    if (!name || !text) return NextResponse.json({ error: "Name and review are required" }, { status: 400 });

    await prisma.review.create({
      data: {
        productSlug: slug,
        author: name,
        rating: r,
        title: title ? String(title).trim().slice(0, 120) : null,
        body: text,
        status: "pending",
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("review post error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// PATCH /api/reviews — moderate (admin only)
export async function PATCH(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status } = await req.json();
  if (!["pending", "approved", "hidden"].includes(status)) {
    return NextResponse.json({ error: "Bad status" }, { status: 400 });
  }
  try {
    const review = await prisma.review.update({ where: { id }, data: { status } });
    return NextResponse.json({ review });
  } catch (err) {
    if (err && err.code === "P2025") {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }
    throw err;
  }
}

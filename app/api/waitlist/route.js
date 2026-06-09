import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { isRegion } from "@/lib/regions";

// POST /api/waitlist  { email, region, source } — public
export async function POST(req) {
  try {
    const { email, region, source } = await req.json();
    const clean = String(email || "").trim().toLowerCase();
    if (!clean || !clean.includes("@") || clean.length > 200) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    const reg = isRegion(region) ? region : "AU";
    const src = String(source || "homepage").slice(0, 60);

    try {
      await prisma.waitlistEntry.create({ data: { email: clean, region: reg, source: src } });
      return NextResponse.json({ ok: true });
    } catch (e) {
      // Unique([email, source]) — already signed up from this source.
      if (e.code === "P2002") return NextResponse.json({ ok: true, already: true });
      throw e;
    }
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// GET /api/waitlist — list (admin only)
export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const entries = await prisma.waitlistEntry.findMany({ orderBy: { createdAt: "desc" }, take: 1000 });
  return NextResponse.json({ entries });
}

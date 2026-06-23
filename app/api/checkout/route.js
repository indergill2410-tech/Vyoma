import { NextResponse } from "next/server";
import { createCheckout, shopifyConfigured } from "@/lib/shopify";

function normaliseLine(raw) {
  const merchandiseId = raw?.merchandiseId || raw?.variantId;
  if (!merchandiseId || typeof merchandiseId !== "string") return null;

  const parsedQty = parseInt(raw.quantity, 10);
  const quantity = Math.min(Math.max(Number.isNaN(parsedQty) ? 1 : parsedQty, 1), 10);

  return {
    merchandiseId,
    quantity,
    ...(Array.isArray(raw.attributes) ? { attributes: raw.attributes } : {}),
  };
}

// POST /api/checkout
// Shopify is the only production checkout backend. Products, variants, stock,
// taxes, shipping, payments, orders and customer checkout all stay in Shopify.
export async function POST(req) {
  if (!shopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify checkout is not configured yet." },
      { status: 503 }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const lines = Array.isArray(payload?.lines)
    ? payload.lines.map(normaliseLine).filter(Boolean)
    : payload?.variantId
    ? [normaliseLine(payload)]
    : [];

  if (!lines.length) {
    return NextResponse.json(
      { error: "Shopify checkout requires a product variant." },
      { status: 400 }
    );
  }

  try {
    const url = await createCheckout(lines);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("shopify checkout error", err);
    return NextResponse.json(
      { error: "Could not start Shopify checkout. Please try again." },
      { status: 500 }
    );
  }
}

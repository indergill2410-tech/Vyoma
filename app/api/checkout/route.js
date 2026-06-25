import { NextResponse } from "next/server";
import { createCheckout, shopifyConfigured } from "@/lib/shopify";

// POST /api/checkout — Shopify-hosted checkout.
//   Multi-item cart: { lines: [{ merchandiseId, quantity }] }
//   Single buy-now:  { variantId, quantity }
// Shopify owns pricing, currency and the payment page; we only pass variant ids
// and quantities and hand back Shopify's hosted checkout URL.
export async function POST(req) {
  if (!shopifyConfigured()) {
    return NextResponse.json(
      { error: "The store isn't connected yet. Please check back soon." },
      { status: 503 }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const clampQty = (q) => Math.min(Math.max(parseInt(q, 10) || 1, 1), 10);

  // Build the line list from either a multi-item cart or a single variant.
  let lines = [];
  if (Array.isArray(payload?.lines) && payload.lines.length) {
    lines = payload.lines
      .slice(0, 50)
      .filter((l) => l && l.merchandiseId)
      .map((l) => ({ merchandiseId: l.merchandiseId, quantity: clampQty(l.quantity) }));
  } else if (payload?.variantId) {
    lines = [{ merchandiseId: payload.variantId, quantity: clampQty(payload.quantity) }];
  }

  if (!lines.length) {
    return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });
  }

  try {
    const url = await createCheckout(lines);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}

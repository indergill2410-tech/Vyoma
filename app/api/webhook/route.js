import { NextResponse } from "next/server";

// Legacy Stripe webhook endpoint kept as a clear dead-end for old dashboard
// configuration. Vyoma checkout is Shopify-only; use /api/shopify-webhook for
// Shopify order notifications.
export async function POST() {
  return NextResponse.json(
    { error: "Stripe checkout has been removed. Use Shopify webhooks at /api/shopify-webhook." },
    { status: 410 }
  );
}

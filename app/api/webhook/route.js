import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getProduct, COLOURWAYS } from "@/lib/catalog";
import { makeOrderNumber } from "@/lib/orderNumber";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/webhook — Stripe calls this after payment.
// SECURITY: the signature is verified and orders are created ONLY from verified
// `checkout.session.completed` events — never from the browser. The success page
// proves nothing; this is the source of truth.
export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    try {
      // Enrich the compact record with product names from the catalog.
      let items = [];
      try {
        const raw = JSON.parse(session.metadata?.items || "[]");
        items = raw.map((it) => {
          const p = getProduct(it.slug);
          return {
            slug: it.slug,
            name: p?.name || it.slug,
            colour: it.colour,
            colourName: COLOURWAYS[it.colour]?.name || it.colour,
            size: it.size,
            quantity: it.quantity,
            unitAmount: it.unitAmount,
          };
        });
      } catch {
        items = [];
      }

      await prisma.order.upsert({
        where: { stripeSessionId: session.id },
        update: {}, // idempotent — Stripe may retry
        create: {
          orderNumber: makeOrderNumber(),
          stripeSessionId: session.id,
          email: session.customer_details?.email || "unknown",
          customerName: session.customer_details?.name || null,
          region: session.metadata?.region || "AU",
          items: JSON.stringify(items),
          amountTotal: session.amount_total ?? 0,
          currency: session.currency || "aud",
          shippingAddress: session.shipping_details
            ? JSON.stringify(session.shipping_details)
            : session.customer_details?.address
            ? JSON.stringify(session.customer_details.address)
            : null,
        },
      });
    } catch (err) {
      console.error("Order save failed:", err);
      // 500 so Stripe retries — we never want to lose a paid order.
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { send, twilioConfigured, messages } from "@/lib/twilio";

// Shopify webhook → WhatsApp/SMS order updates.
// Configure in Shopify admin (Settings → Notifications → Webhooks, or your app):
//   orders/create   and   orders/fulfilled   →  POST {site}/api/shopify-webhook
// Set SHOPIFY_WEBHOOK_SECRET to the webhook signing secret.
//
// We must read the RAW body to verify the HMAC, so this route does its own
// parsing. Always 200 on verified requests (even if no message is sent) so
// Shopify doesn't retry; 401 only on a bad/maile signature.
export async function POST(req) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const raw = await req.text();

  if (!secret) {
    // Not configured — acknowledge so Shopify doesn't retry forever.
    return NextResponse.json({ skipped: "no-secret" });
  }

  const hmac = req.headers.get("x-shopify-hmac-sha256") || "";
  const digest = crypto.createHmac("sha256", secret).update(raw, "utf8").digest("base64");
  const a = Buffer.from(digest);
  const b = Buffer.from(hmac);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Bad signature" }, { status: 401 });
  }

  let order;
  try {
    order = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  const topic = req.headers.get("x-shopify-topic") || "";
  const phone =
    order?.shipping_address?.phone || order?.customer?.phone || order?.phone || null;
  const name = order?.name || (order?.order_number ? `#${order.order_number}` : "your order");

  if (phone && twilioConfigured()) {
    try {
      if (topic === "orders/create") {
        await send({ to: phone, channel: "whatsapp", body: messages.orderPlaced(name) });
      } else if (topic === "orders/fulfilled") {
        const tracking = order?.fulfillments?.[0]?.tracking_number || "";
        await send({ to: phone, channel: "whatsapp", body: messages.shipped(name, tracking) });
      }
    } catch (err) {
      // Log but still 200 — the order is real; don't make Shopify retry on a
      // transient Twilio hiccup.
      console.error("shopify-webhook twilio error", err);
    }
  }

  return NextResponse.json({ ok: true });
}

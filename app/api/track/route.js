import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/track  { orderNumber, email } — public, but requires BOTH the order
// number and the matching email, so one alone can't reveal another's order.
export async function POST(req) {
  try {
    const { orderNumber, email } = await req.json();
    const num = String(orderNumber || "").trim().toUpperCase();
    const mail = String(email || "").trim().toLowerCase();
    if (!num || !mail) {
      return NextResponse.json({ error: "Enter your order number and email." }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { orderNumber: num } });
    if (!order || order.email.toLowerCase() !== mail) {
      return NextResponse.json({ error: "We couldn't find that order." }, { status: 404 });
    }

    // Only return what the customer needs — never the raw Stripe session id, etc.
    return NextResponse.json({
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        region: order.region,
        items: order.items,
        amountTotal: order.amountTotal,
        currency: order.currency,
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt,
      },
    });
  } catch (err) {
    console.error("track error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

// GET /api/metrics — dashboard aggregates (admin only)
export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [orders, waitlist] = await Promise.all([
    prisma.order.findMany({ select: { region: true, amountTotal: true, status: true } }),
    prisma.waitlistEntry.count(),
  ]);

  const metrics = {
    totalOrders: orders.length,
    revenueAud: 0,
    revenueInr: 0,
    ordersAud: 0,
    ordersIn: 0,
    unfulfilled: 0,
    waitlist,
    byStatus: { paid: 0, in_production: 0, shipped: 0, delivered: 0 },
  };

  for (const o of orders) {
    if (o.region === "IN") {
      metrics.revenueInr += o.amountTotal;
      metrics.ordersIn += 1;
    } else {
      metrics.revenueAud += o.amountTotal;
      metrics.ordersAud += 1;
    }
    if (o.status in metrics.byStatus) metrics.byStatus[o.status] += 1;
    if (o.status === "paid" || o.status === "in_production") metrics.unfulfilled += 1;
  }

  return NextResponse.json({ metrics });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const STATUSES = ["paid", "in_production", "shipped", "delivered"];

// GET /api/orders — list orders (admin only)
export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 300 });
  return NextResponse.json({ orders });
}

// PATCH /api/orders — update status and/or tracking number (admin only)
export async function PATCH(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, status, trackingNumber } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const data = {};
  if (status !== undefined) {
    if (!STATUSES.includes(status)) {
      return NextResponse.json({ error: "Bad status" }, { status: 400 });
    }
    data.status = status;
  }
  if (trackingNumber !== undefined) data.trackingNumber = trackingNumber || null;

  try {
    const order = await prisma.order.update({ where: { id }, data });
    return NextResponse.json({ order });
  } catch (err) {
    if (err.code === "P2025") {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    throw err;
  }
}

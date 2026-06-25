import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { circleCount } from "@/lib/circle";

// GET /api/metrics — dashboard aggregates (admin only).
// Orders, revenue and fulfilment live in the Shopify admin now; this covers the
// things Vyoma owns: The Circle waitlist and review moderation.
export async function GET(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [waitlistRows, members, pendingReviews, approvedReviews] = await Promise.all([
    prisma.waitlistEntry.count(),
    circleCount(),
    prisma.review.count({ where: { status: "pending" } }),
    prisma.review.count({ where: { status: "approved" } }),
  ]);

  const metrics = {
    waitlist: waitlistRows, // total signups across all sources
    members, // distinct people on The Circle
    pendingReviews,
    approvedReviews,
  };

  return NextResponse.json({ metrics });
}

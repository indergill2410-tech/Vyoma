import { NextResponse } from "next/server";

// Order status now belongs to the hosted checkout/order email flow.
// Keep this endpoint as an explicit dead-end for old clients.
export async function POST() {
  return NextResponse.json(
    { error: "Order tracking is handled through the secure link in your confirmation email." },
    { status: 410 }
  );
}

import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { send, twilioConfigured } from "@/lib/twilio";

// POST /api/notify  (admin only)  { to, body, channel? }
// Send a one-off SMS/WhatsApp — foundation for drop blasts and order updates.
export async function POST(req) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!twilioConfigured()) {
    return NextResponse.json({ error: "Twilio is not configured." }, { status: 503 });
  }
  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const { to, body, channel } = payload || {};
  if (!to || !body) {
    return NextResponse.json({ error: "'to' and 'body' are required." }, { status: 400 });
  }
  try {
    const result = await send({ to, body, channel: channel === "whatsapp" ? "whatsapp" : "sms" });
    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("notify error", err);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }
}

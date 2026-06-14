import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { isRegion } from "@/lib/regions";
import { makeReferralCode, circleStatus, circleCount } from "@/lib/circle";

// Reuse this email's existing share code, or mint a fresh unique one.
async function codeForEmail(email) {
  const existing = await prisma.waitlistEntry.findFirst({
    where: { email, referralCode: { not: null } },
    select: { referralCode: true },
  });
  if (existing?.referralCode) return existing.referralCode;

  for (let i = 0; i < 6; i++) {
    const code = makeReferralCode();
    const clash = await prisma.waitlistEntry.findFirst({ where: { referralCode: code }, select: { id: true } });
    if (!clash) return code;
  }
  return makeReferralCode(); // collision odds are negligible; don't block the signup
}

// POST /api/waitlist  { email, region, source, ref } — public
export async function POST(req) {
  try {
    const { email, region, source, ref } = await req.json();
    const clean = String(email || "").trim().toLowerCase();
    if (!clean || !clean.includes("@") || clean.length > 200) {
      return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
    }
    const reg = isRegion(region) ? region : "AU";
    const src = String(source || "homepage").slice(0, 60);

    const referralCode = await codeForEmail(clean);

    // Attribute the referrer only on a member's first-ever signup, and never to
    // their own code. Self-referrals and re-joins don't earn anyone credit.
    let referredBy = null;
    const refCode = String(ref || "").trim().toUpperCase().slice(0, 12);
    if (refCode && refCode !== referralCode) {
      const seenBefore = await prisma.waitlistEntry.findFirst({ where: { email: clean }, select: { id: true } });
      const refOwner = await prisma.waitlistEntry.findFirst({ where: { referralCode: refCode }, select: { email: true } });
      if (!seenBefore && refOwner && refOwner.email !== clean) referredBy = refCode;
    }

    let already = false;
    try {
      await prisma.waitlistEntry.create({
        data: { email: clean, region: reg, source: src, referralCode, referredBy },
      });
    } catch (e) {
      if (e.code === "P2002") already = true; // already on this source
      else throw e;
    }

    const status = await circleStatus({ email: clean });
    return NextResponse.json({ ok: true, already, ...status });
  } catch (err) {
    console.error("waitlist error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

// GET /api/waitlist
//   ?count=1     → { total }              (public — live homepage count)
//   ?code=SKY-X  → circle status          (public — the code is the share token)
//   (no params)  → full entry list        (admin only)
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  if (searchParams.get("count")) {
    const total = await circleCount();
    return NextResponse.json({ total });
  }

  const code = searchParams.get("code");
  if (code) {
    const status = await circleStatus({ code: code.trim().toUpperCase() });
    if (!status) return NextResponse.json({ error: "We couldn't find that code." }, { status: 404 });
    return NextResponse.json(status);
  }

  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const entries = await prisma.waitlistEntry.findMany({ orderBy: { createdAt: "desc" }, take: 1000 });
  return NextResponse.json({ entries });
}

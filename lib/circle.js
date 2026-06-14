// The Circle — the referral engine on top of the waitlist.
//
// Pre-launch growth loop: every member gets a share code. Each friend they bring
// in moves them up the line (founder rank − referrals × BOOST) and up a ladder of
// Founding-Member perks. Zero paid acquisition; the list grows itself.
//
// Everything is computed from WaitlistEntry rows, deduped by email, so it stays
// correct even though a person can sign up from several sources.

import { prisma } from "@/lib/db";
import { BOOST_PER_REFERRAL, tierFor } from "@/lib/circle-config";

export { makeReferralCode, BOOST_PER_REFERRAL, TIERS, tierFor } from "@/lib/circle-config";

// Pull the whole list once and fold it into per-email facts. Pre-launch scale
// (hundreds–thousands) makes this trivially cheap; revisit if the list explodes.
async function loadList() {
  const rows = await prisma.waitlistEntry.findMany({
    select: { email: true, createdAt: true, referralCode: true, referredBy: true },
    orderBy: { createdAt: "asc" },
    take: 100000,
  });

  const byEmail = new Map(); // email -> { rank, code }
  const codeToEmail = new Map(); // share code -> owner email
  const referred = new Map(); // code -> Set(referred email)
  let rank = 0;

  for (const r of rows) {
    if (!byEmail.has(r.email)) byEmail.set(r.email, { rank: ++rank, code: r.referralCode || null });
    else if (r.referralCode && !byEmail.get(r.email).code) byEmail.get(r.email).code = r.referralCode;

    if (r.referralCode) codeToEmail.set(r.referralCode, r.email);
    if (r.referredBy) {
      if (!referred.has(r.referredBy)) referred.set(r.referredBy, new Set());
      referred.get(r.referredBy).add(r.email);
    }
  }

  return { byEmail, codeToEmail, referred, total: byEmail.size };
}

// Total distinct people on the list (for the live homepage count).
export async function circleCount() {
  const rows = await prisma.waitlistEntry.findMany({ select: { email: true }, take: 100000 });
  return new Set(rows.map((r) => r.email)).size;
}

// Full status for one member, found by email or by share code.
export async function circleStatus({ email, code } = {}) {
  const { byEmail, codeToEmail, referred, total } = await loadList();

  const targetEmail = email
    ? String(email).trim().toLowerCase()
    : code
    ? codeToEmail.get(code)
    : null;
  if (!targetEmail || !byEmail.has(targetEmail)) return null;

  const me = byEmail.get(targetEmail);
  const myCode = me.code || code || null;

  const refSet = (myCode && referred.get(myCode)) || new Set();
  refSet.delete(targetEmail); // never count yourself
  const referrals = refSet.size;

  const founderNumber = me.rank; // fixed at join — earlier is more OG
  const position = Math.max(1, founderNumber - referrals * BOOST_PER_REFERRAL);
  const { current, next, toNext } = tierFor(referrals);

  return {
    code: myCode,
    total,
    referrals,
    founderNumber,
    position,
    ahead: position - 1,
    tier: current,
    nextTier: next,
    toNext,
  };
}

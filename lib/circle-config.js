// Pure, dependency-free Circle config — safe to import in client components.
// (lib/circle.js adds the DB-backed status logic on top of this.)

// Unambiguous alphabet (no 0/O/1/I) — matches the order-number style.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function makeReferralCode() {
  let s = "";
  for (let i = 0; i < 5; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return `SKY-${s}`;
}

// Each referral jumps you this many places up the line.
export const BOOST_PER_REFERRAL = 10;

// The Founding-Member ascent. `at` = referrals required to unlock.
export const TIERS = [
  { at: 0, key: "joined", label: "On the list", perk: "First to hear the next restock or colour note." },
  { at: 1, key: "early", label: "Early access", perk: "Hear about restocks and new releases before everyone else." },
  { at: 3, key: "shipping", label: "Free shipping", perk: "Free shipping on your first order — India or Australia." },
  { at: 5, key: "founding", label: "Founding Member", perk: "A numbered Founding-Member gift, made only for the first circle." },
  { at: 10, key: "piece", label: "A piece on us", perk: "A future Vyoma piece, our gift to you." },
];

export function tierFor(referrals) {
  let current = TIERS[0];
  let next = null;
  for (const t of TIERS) {
    if (referrals >= t.at) current = t;
    else {
      next = t;
      break;
    }
  }
  const toNext = next ? Math.max(0, next.at - referrals) : 0;
  return { current, next, toNext };
}

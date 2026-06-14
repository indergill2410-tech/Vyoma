// Seed a few approved reviews and waitlist entries so a fresh install looks alive.
// Run with: npm run db:seed   (after `npm run db:push`)
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const reviews = [
  {
    productSlug: "vyoma-high-rise-legging",
    author: "Priya S.",
    rating: 5,
    title: "Finally, a waistband that stays",
    body: "I've tried everything. These don't roll down once in an hour-long flow. Squat-proof is real. The indigo is gorgeous in person.",
    verified: true,
    status: "approved",
  },
  {
    productSlug: "vyoma-high-rise-legging",
    author: "Hannah M.",
    rating: 5,
    title: "Worth the wait",
    body: "Arrived in the most beautiful packaging. Feels premium, fits like it was made for me.",
    verified: true,
    status: "approved",
  },
  {
    productSlug: "vyoma-studio-top",
    author: "Aarti R.",
    rating: 5,
    title: "Studio to street, exactly",
    body: "Wore it to class then straight to brunch. The drape is unreal and it breathes through hot yoga. Dawn rose is my new everything.",
    verified: true,
    status: "approved",
  },
  {
    productSlug: "vyoma-studio-top",
    author: "Bel T.",
    rating: 4,
    title: "Lovely, runs a touch relaxed",
    body: "Beautiful fabric. I sized down for a closer fit and it's perfect now. The back detail gets compliments every time.",
    verified: false,
    status: "approved",
  },
  {
    productSlug: "vyoma-the-set",
    author: "Meera K.",
    rating: 5,
    title: "The whole practice in one box",
    body: "Buying the set was the move — the colours match perfectly and it felt like a real treat. The made-in-India story matters to me.",
    verified: true,
    status: "approved",
  },
];

// A small Circle with a referral chain so the founder mechanic looks alive:
// SKY-AARTI brought in two friends (→ Early access tier).
const waitlist = [
  { email: "aarti@example.com", region: "IN", source: "circle", referralCode: "SKY-AARTI" },
  { email: "early2@example.com", region: "IN", source: "circle", referralCode: "SKY-EAR2X", referredBy: "SKY-AARTI" },
  { email: "early3@example.com", region: "AU", source: "circle", referralCode: "SKY-EAR3Y", referredBy: "SKY-AARTI" },
  { email: "early4@example.com", region: "AU", source: "homepage", referralCode: "SKY-EAR4Z" },
];

async function main() {
  for (const r of reviews) {
    await prisma.review.create({ data: r });
  }
  for (const w of waitlist) {
    try {
      await prisma.waitlistEntry.create({ data: w });
    } catch {
      /* unique conflict — ignore */
    }
  }
  console.log(`Seeded ${reviews.length} reviews and ${waitlist.length} waitlist entries.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

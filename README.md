# Vyomawear — Full-Stack Store

> *Vyoma (vee-OH-ma): Sanskrit for sky, ether, infinite space.*

Premium, made-to-order yoga wear from the birthplace of yoga — built as a complete
Next.js 14 storefront for **two markets** (🇮🇳 India · INR and 🇦🇺 Australia · AUD)
from one Indian supply base.

A living-sky brand experience on top of a real commerce engine: Stripe Checkout,
a Prisma orders database, customer order tracking, a drop waitlist, moderated
reviews, and an admin dashboard.

## What's inside

| Area | Path | Notes |
|---|---|---|
| **Living-sky homepage** | `/` | Animated constellation canvas, drop countdown, waitlist, story pillars, social proof |
| **Story** | `/about` | The Vyoma origin, pronunciation, made-to-order ethos |
| **Collection** | `/#shop` | Catalog from `lib/catalog.js` — prices live server-side only |
| **Product** | `/product/[slug]` | Colourways, size guide, made-to-order timeline, reviews |
| **Cart** | drawer + `/cart` | Multi-item, persisted to localStorage |
| **Checkout** | `/api/checkout` | Builds Stripe line items server-side; client can never set a price |
| **Webhook** | `/api/webhook` | Signature-verified; the ONLY thing that creates orders |
| **Order tracking** | `/track` | Order number + email → live status timeline |
| **Reviews** | `/api/reviews` | Submit (pending) → admin approves → shown with average rating |
| **Waitlist** | `/api/waitlist` | The pre-order drop list (how a $0 brand funds run #1) |
| **Admin** | `/admin` | Token-gated: dashboard metrics, orders, waitlist, reviews |

## Region & currency

`lib/regions.js` defines the two markets. The toggle in the nav switches currency,
pricing (`priceAud` / `priceInr` in the catalog), and the shipping country Stripe
collects. Australia ships duty-free under the India–Australia ECTA agreement.

> **India payments note:** Stripe doesn't onboard new Indian merchants. This repo
> uses Stripe for the demo in both currencies; for a real India launch, add Razorpay
> as a parallel checkout route (the checkout API is structured to make that swap easy).

## Local setup

```bash
npm install
cp .env.example .env        # fill in your Stripe TEST keys
npm run db:push             # creates the SQLite dev database
npm run db:seed             # optional — a few sample reviews so it looks alive
npm run dev                 # http://localhost:3000
```

### Test the payment loop locally

1. Install the Stripe CLI, then:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   Copy the printed `whsec_...` into `.env` as `STRIPE_WEBHOOK_SECRET`.
2. Buy with Stripe's test card `4242 4242 4242 4242`, any future date, any CVC.
3. Open `/admin`, sign in with your `ADMIN_TOKEN` — the order is there. Grab the
   order number, then try `/track` with that number + the email you paid with.

## Deploy (Vercel + Neon/Supabase Postgres)

SQLite does NOT work on Vercel (serverless filesystem). For production:

1. Create a free Postgres DB at neon.tech (or Supabase).
2. In `prisma/schema.prisma`, change `provider = "sqlite"` → `"postgresql"`.
3. Push to GitHub → import to Vercel.
4. Set env vars in Vercel: `DATABASE_URL`, `STRIPE_SECRET_KEY` (LIVE),
   `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DROP_DATE`, `ADMIN_TOKEN`.
5. Run `npx prisma db push` once against the production DB.
6. Stripe dashboard → Webhooks → add `https://yourdomain.com/api/webhook` for
   `checkout.session.completed`; use its signing secret as `STRIPE_WEBHOOK_SECRET`.
7. Activate your Stripe account before taking live payments.

## Security model

- **Prices are server-side.** The browser sends only `slug / colour / size / quantity`;
  prices come from `lib/catalog.js` and the active region. Never trust a client price.
- **Orders come only from the verified webhook.** The success page proves nothing.
- **No card data touches the server** — Stripe hosts the payment page (out of PCI scope).
- **Order tracking requires order number AND matching email** — one alone reveals nothing.
- **Admin is token-gated** via header (`lib/auth.js`). Move to real auth (NextAuth)
  before adding team members.

## Honest gaps (deliberate — add when needed)

- **India payments** — wire up Razorpay for a real India launch (see note above).
- **Transactional email** — Stripe sends receipts; add Resend/Postmark for branded
  "being made / shipped" emails.
- **Tracking sync** — set status + tracking number manually in admin for now.
- **Inventory caps** — made-to-order needs none; add a cap for a limited drop.
- **Refunds** — handle from the Stripe dashboard.

*Vyoma — room to grow.*

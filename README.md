# Vyomawear — Natural-fibre activewear store

> *Vyoma (vee-OH-ma): Sanskrit for sky, ether, infinite space.*

Premium **natural-fibre activewear with a yoga soul** — made in India for the studio,
the gym and everyday life. A living-sky brand experience on top of **Shopify** as the
commerce backend, launching in **Australia (AUD)**.

Shopify owns the catalogue, checkout, orders, fulfilment and customer emails. This
Next.js 14 app is the custom storefront on top of it, plus the two things Vyoma owns
itself: **The Circle** (a referral waitlist) and **moderated reviews**.

## What's inside

| Area | Path | Notes |
|---|---|---|
| **Living-sky homepage** | `/` | Animated sky, brand story, collection grid, The Circle waitlist |
| **Story** | `/about` | The Vyoma origin and pronunciation |
| **Why natural fibre** | `/research` | The material research, with sources to read further |
| **Fabric** | `/fabric` | The natural-fibre fabric story |
| **Collection** | `/shop` | Live from Shopify (`lib/shopify.js`) |
| **Product** | `/product/[handle]` | Shopify product: variants, gallery, add-to-bag, reviews |
| **Cart** | drawer + `/cart` | Multi-item, Shopify-variant lines, persisted to localStorage |
| **Checkout** | `/api/checkout` | Creates a Shopify cart from the line list → hosted checkout |
| **Order updates** | `/api/shopify-webhook` | Signature-verified; fires WhatsApp/SMS via Twilio |
| **Reviews** | `/api/reviews` | Submit (pending) → admin approves → shown with average rating |
| **The Circle** | `/circle` | Referral waitlist: share code, place in line, perk ladder (`lib/circle.js`) |
| **Admin** | `/admin` | Token-gated: The Circle waitlist + review moderation |

Orders, revenue and fulfilment live in your **Shopify admin** — not in this app.

## Architecture

- **Commerce:** Shopify Storefront API (`lib/shopify.js`). Products, prices (AUD),
  checkout and orders are all Shopify's. The app reads products and creates carts;
  it never sets a price.
- **Database (Postgres):** only `WaitlistEntry` + `Review` (`prisma/schema.prisma`).
  No order data is stored here.
- **Graceful fallback:** without the Shopify env vars the site still renders from the
  local catalogue in `lib/catalog.js` as a **read-only preview** (no checkout), so dev
  and previews work before the store is connected.

## Local setup

```bash
npm install
cp .env.example .env        # fill in Shopify + a Postgres DATABASE_URL
npm run db:push             # create the waitlist/review tables
npm run dev                 # http://localhost:3000
```

### Connect Shopify

1. Shopify admin → **Settings → Apps and sales channels → Develop apps → Create app**.
2. Enable Storefront API scopes: `unauthenticated_read_product_listings`,
   `unauthenticated_write_checkouts`. Install the app, copy the **Storefront access token**.
3. Set `SHOPIFY_STORE_DOMAIN` (e.g. `vyomawear.myshopify.com`) and
   `SHOPIFY_STOREFRONT_TOKEN` in `.env`. The grid, product pages and checkout now go live.
4. (Optional) Set `SHOPIFY_WEBHOOK_SECRET` and the `TWILIO_*` vars to send WhatsApp/SMS
   order updates from `orders/create` and `orders/fulfilled` webhooks.

## Deploy (Render + Postgres)

The repo ships a `render.yaml` Blueprint (a web service + a managed Postgres):

1. Push to GitHub → Render → **New → Blueprint** → pick this repo.
2. Render provisions the Postgres DB and wires `DATABASE_URL` automatically.
3. Set the remaining env vars in the Render dashboard: `SHOPIFY_STORE_DOMAIN`,
   `SHOPIFY_STOREFRONT_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_TOKEN`,
   `NEXT_PUBLIC_DROP_DATE`, and optionally `SHOPIFY_WEBHOOK_SECRET` + `TWILIO_*`.
4. The build runs `prisma generate && next build`; the pre-deploy step runs
   `prisma db push` to sync the waitlist/review tables.

## Domains

Production canonical: **`https://www.vyomawear.com.au`**

Render automatically redirects the apex (`vyomawear.com.au`) → `www`, and that
direction isn't configurable, so `www` is the canonical host. `middleware.js`
and `lib/seo.js` are set to match; `NEXT_PUBLIC_SITE_URL` must be
`https://www.vyomawear.com.au` in Render.

DNS at the registrar (per domain):

| Type | Host | Value |
|---|---|---|
| `ALIAS` (or `A`) | `@` | `vyoma-imsr.onrender.com` (ALIAS) · `216.24.57.1` (A) |
| `CNAME` | `www` | `vyoma-imsr.onrender.com` |

Add each domain under Render → Settings → **Custom Domains**; SSL is issued
automatically once DNS verifies. `vyomawear.com` is also pointed at the service
and redirects to `www.vyomawear.com.au` via `middleware.js`.

## Security model

- **Prices and orders are Shopify's.** The browser only sends variant ids + quantities;
  Shopify hosts the payment page (out of PCI scope).
- **The Circle / reviews** live in your Postgres; reviews are moderated before they show.
- **Admin is token-gated** via header (`lib/auth.js`). Move to real auth (NextAuth or
  Shopify customer accounts) before adding team members.

## Honest gaps (deliberate — add when needed)

- **India market** — kept dormant in `lib/regions.js`; re-enable (Shopify market for INR
  + the region toggle) when ready.
- **Transactional email** — Shopify sends order/shipping emails; add Resend/Postmark for
  extra branded touches.
- **Reviews auth** — reviews are open + moderated; tie to verified orders when useful.

*Vyoma — room to grow.*

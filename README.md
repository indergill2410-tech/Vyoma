# Vyomawear

Vyomawear is a custom Next.js storefront for organic-first activewear. The front end lives here; products, variants, stock, payments, checkout, tax, shipping and orders are handled by Shopify.

Primary brand domain target: `https://vyomawear.com.au`
Current temporary Render URL: `https://vyoma-imsr.onrender.com`

## Commerce Model

- Shopify is the live commerce backend.
- `/api/checkout` creates a Shopify cart and redirects to Shopify hosted checkout.
- Stripe is not used for checkout.
- The local product catalogue remains as a visual fallback so current catalogue pages and product imagery are not lost while Shopify data is being connected.

## Required Production Env Vars

```bash
NEXT_PUBLIC_SITE_URL="https://vyoma-imsr.onrender.com" # switch to https://vyomawear.com.au after DNS is connected
SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
SHOPIFY_STOREFRONT_TOKEN="your-storefront-access-token"
SHOPIFY_WEBHOOK_SECRET=""
DATABASE_URL="..."
ADMIN_TOKEN="..."
```

## Custom Domain Setup

Until `vyomawear.com.au` is connected, keep `NEXT_PUBLIC_SITE_URL` on the Render URL so canonical tags, sitemap, robots and social previews do not point to a dead domain.

When the domain is ready:

1. Add `vyomawear.com.au` as a custom domain in Render for the web service.
2. Add the DNS records Render gives you at the domain/DNS provider.
3. Add `www.vyomawear.com.au` too if you want the `www` version supported.
4. After DNS and SSL are active, set `NEXT_PUBLIC_SITE_URL="https://vyomawear.com.au"` in Render.
5. In Shopify, connect `vyomawear.com.au` as the store domain if you want Shopify checkout/customer emails to use the brand domain.
6. Configure Shopify webhooks to post to `https://vyomawear.com.au/api/shopify-webhook`.

The app includes middleware to redirect `www.vyomawear.com.au`, `vyomawear.com`, and `www.vyomawear.com` to `https://vyomawear.com.au` once those domains point at the app.

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:push
npm run dev
```

Local development runs at `http://localhost:3000`. If Shopify env vars are set locally, the shop grid and product pages pull live Shopify data; otherwise the local catalogue is shown.

## Important Paths

| Area | Path |
|---|---|
| Home | `/` |
| Collection | `/#shop` |
| Product detail | `/product/[slug]` |
| Shopify checkout API | `/api/checkout` |
| Shopify webhook | `/api/shopify-webhook` |
| Research | `/research` |
| Circle | `/circle` |
| Admin | `/admin` |

## Current Production Priorities

- Connect `vyomawear.com.au` to Render and Shopify.
- Ensure all live Shopify products have matching images, variants and prices.
- Strengthen PDP trust blocks: reviews, fit/model notes, certifications, returns, stock status.
- Upgrade product cards with swatches, badges, price hierarchy and quick actions.
- Turn The Circle into a referral/community engine rather than the primary purchase CTA.

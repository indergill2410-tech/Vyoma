# Botika — real on-model product photos

The durable way to get photography onto the site. Botika (a Shopify app) turns a
simple garment photo into realistic on-model shots and saves them to the product.
The storefront already displays whatever Shopify holds — **no code changes needed.**

## One-time setup

### 1. Install Botika
Shopify admin → **Apps** → search **"Botika"** → Install. (Free trial; alternatives:
Pebblely, VModel.AI.)

### 2. Add products in Shopify
For each product:
- Title, description, price (set INR and AUD via **Markets** for dual pricing).
- A **"Size"** option (XS–XL). A **"Colour"** option works too — the PDP handles both.
- Upload one basic reference photo (hanger, flat-lay, or mannequin is fine).

### 3. Generate with Botika
- Create **2+ images per product**: a full **on-model** shot and a **detail/back** shot
  (more angles = a richer gallery; the PDP shows up to 6).
- Save them to the product. Set the best on-model shot as the **featured image**
  (used by the collection grid + social previews).
- Tip: feed Botika the real garment so the product stays accurate and the model
  is consistent across shots.

### 4. Connect the store to this site
Set these env vars on the host (Render → Environment):

| Var | Value |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_TOKEN` | Storefront API access token (below) |

Get the token: Shopify admin → **Settings → Apps and sales channels → Develop apps
→ Create app** → enable Storefront API scopes `unauthenticated_read_product_listings`
and `unauthenticated_write_checkouts` → Install → copy the token.

### 5. Redeploy
The collection grid and product galleries switch to live Shopify products + photos
(60-second cache). Checkout routes to Shopify's hosted checkout.

## Day-to-day
- Add/replace photos in Shopify anytime — they appear within ~60s, no redeploy.
- New products in Shopify appear automatically on the grid and at `/product/<handle>`.
- Until a product has photos, the branded colourway swatch shows — never broken.

## Related
- `docs/shopify-photos.md` — photo-app overview
- `docs/art-direction.md` — the look to aim for
- `.env.example` — all env vars

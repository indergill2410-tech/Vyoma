# Product photos with models — via Shopify

The storefront pulls up to 8 images per product straight from Shopify and shows
them in an interactive gallery (`ShopifyGallery`). So the workflow is: **generate
on-model photos with a Shopify app, and they appear on the site automatically**
(60-second cache, no redeploy).

## 1. Pick an AI photo app (Shopify App Store)

| App | Best for | Notes |
| --- | --- | --- |
| **Botika** | Apparel on a model | Feed a flat/mannequin/real photo → realistic on-model shots, multiple poses. Free trial. |
| **Pebblely** | Accessories, scenes, backgrounds | ~40 free images to start. |
| **VModel.AI / ZMO.ai / Flair** | Model swap / generation | Free trials. |

> Tip: these apps work best when you give them a **real garment photo** (even on a
> hanger or mannequin) as the reference. That keeps the actual product accurate and
> the model consistent across angles. Pure text-to-model drifts the garment.

## 2. Generate and attach

1. Shoot each garment simply (phone + mannequin/hanger is fine).
2. In the app, generate **2+ images per product**: a full **on-model** shot and a
   **detail/back** shot (more angles = a richer gallery; we show up to 6).
3. Save them to the matching Shopify product (the apps do this for you).
4. Set the best on-model shot as the product's **featured image** — it's what the
   collection grid and social previews use.

## 3. That's it

The headless front end already:

- shows the **featured image** on the collection grid (`ShopGrid`),
- shows **all images** as an interactive, swipeable gallery on the product page
  (`ShopifyGallery`),
- falls back to the generated colourway swatch if a product has no photos yet.

No code changes are needed when you add or replace photos in Shopify.

## Alternative: generate locally, upload yourself

If you'd rather generate outside Shopify (e.g. `scripts/generate-images.mjs` with
Google Imagen/Gemini), you can upload the resulting files to each product
in the Shopify admin. Ask and we can add a `scripts/upload-to-shopify.mjs` that
pushes a folder of images onto products via the Shopify **Admin API**.

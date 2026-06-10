// Weekly business digest — runs in GitHub Actions (or `npm run report`).
// Pulls a few live signals and prints Markdown (Actions appends it to the run
// summary). Extend with Supabase waitlist counts, Shopify orders, etc.

import { shopifyConfigured, getProducts } from "../lib/shopify.js";

const out = [`# ✦ Vyoma weekly report`, `_${new Date().toUTCString()}_`, ""];

if (shopifyConfigured()) {
  try {
    const products = await getProducts();
    out.push(`## Storefront`);
    out.push(`- Products live: **${products.length}**`);
    const withPhotos = products.filter((p) => p.featuredImage).length;
    out.push(`- With photos: **${withPhotos}/${products.length}**`);
    out.push("");
    out.push(`### Newest`);
    for (const p of products.slice(0, 5)) {
      const price = p.priceRange?.minVariantPrice;
      out.push(`- ${p.title}${price ? ` — ${price.amount} ${price.currencyCode}` : ""}`);
    }
  } catch (e) {
    out.push(`- Shopify: ⚠️ ${e.message}`);
  }
} else {
  out.push(`- Shopify not configured (set SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_TOKEN).`);
}

console.log(out.join("\n"));

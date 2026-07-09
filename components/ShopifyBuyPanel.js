"use client";

import { useState } from "react";
import Link from "next/link";
import { formatMoney } from "@/lib/shopify";
import { useCart } from "./Providers";
import { toast, celebrateFrom } from "@/lib/fx";

// Option-aware buy panel for a Shopify product. Tracks a selection per option
// (Size, Colour, …), resolves the matching variant, and adds it to the cart.
// Checkout (Shopify-hosted) happens from the cart drawer. Works for single-option
// (just sizes) and multi-option products.
export default function ShopifyBuyPanel({ product }) {
  const { addItem } = useCart();
  const options = (product.options || []).filter(
    (o) => !(o.values.length === 1 && o.values[0] === "Default Title")
  );
  const variants = product.variants.nodes;

  const [selected, setSelected] = useState(() =>
    variants.length === 1 ? variantOptions(variants[0]) : {}
  );
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  function variantOptions(v) {
    const m = {};
    for (const o of v.selectedOptions) m[o.name] = o.value;
    return m;
  }

  const match = variants.find((v) =>
    v.selectedOptions.every((o) => selected[o.name] === o.value)
  );
  const complete = options.every((o) => selected[o.name]);
  const price = match ? match.price : product.priceRange.minVariantPrice;
  const image = product.featuredImage || product.images?.nodes?.[0] || null;
  const addLabel = match && !match.availableForSale ? "Sold out" : "Add to bag";

  function pick(name, value) {
    setError("");
    setSelected((s) => ({ ...s, [name]: value }));
  }

  function addToBag(e) {
    setError("");
    if (!complete || !match) {
      setError("Choose your options to continue.");
      return;
    }
    if (!match.availableForSale) {
      setError("That option is sold out.");
      return;
    }
    celebrateFrom(e);
    addItem({
      variantId: match.id,
      handle: product.handle,
      productTitle: product.title,
      variantTitle: match.title && match.title !== "Default Title" ? match.title : "",
      image: image ? { url: image.url, alt: image.altText || product.title } : null,
      amount: match.price.amount,
      currencyCode: match.price.currencyCode,
      qty,
    });
    toast(`${product.title} — added to your bag`);
  }

  return (
    <div className="pdp-info shopify-pdp-info">
      <div className="pdp-proofline" aria-label="Product proof points">
        <span>Organic-material activewear</span>
        <span>Fit support</span>
        <span>Secure hosted checkout</span>
      </div>
      <p className="pdp-cat">{product.productType || "Vyomawear"}</p>
      <h1>{product.title}</h1>
      <p className="pdp-price">{formatMoney(price)}</p>
      {product.description && <p className="pdp-desc">{product.description}</p>}

      <div className="pdp-fit-panel pdp-fit-highlight">
        <h3>Fit first. Checkout second.</h3>
        <p>
          Choose your size and colour here, then use the Fit Finder if you want a second check before adding to bag.
        </p>
        <Link className="link-btn" href="/fit">Open Fit Finder</Link>
      </div>

      {options.map((opt) => {
        const selectedValue = selected[opt.name];
        const isSize = /size/i.test(opt.name);
        return (
          <div className="pdp-field" key={opt.name}>
            <div className="pdp-field-head">
              <span className="pdp-label">
                {opt.name}{selectedValue ? ` — ${selectedValue}` : ""}
              </span>
              {isSize && <Link className="link-btn" href="/fit">Size help</Link>}
            </div>
            <div className="sizes" role="group" aria-label={`Choose ${opt.name}`}>
              {opt.values.map((val) => {
                const isAvail = variants.some(
                  (v) =>
                    v.availableForSale &&
                    v.selectedOptions.some((o) => o.name === opt.name && o.value === val)
                );
                return (
                  <button
                    key={val}
                    className="size"
                    aria-pressed={selected[opt.name] === val}
                    disabled={!isAvail}
                    style={!isAvail ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
                    onClick={() => pick(opt.name, val)}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="pdp-field">
        <span className="pdp-label">Quantity</span>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
        </div>
      </div>

      <div className="pdp-actions">
        <button className="btn block" onClick={addToBag}>{addLabel}</button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}

      <p className="pdp-lead">✦ Made for you in India · ships in 10–14 days</p>
      <p className="pdp-stock-note">Made-to-order flow: your selected option is confirmed once it is in the bag.</p>

      <dl className="pdp-trust-grid" aria-label="Purchase confidence">
        <div>
          <dt>Materials</dt>
          <dd>Natural-fibre first, designed to feel calmer against skin.</dd>
        </div>
        <div>
          <dt>Fit support</dt>
          <dd>Use the Fit Finder before checkout; support is clear if the first size is not right.</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>Tracked shipping after your piece is prepared and checked.</dd>
        </div>
        <div>
          <dt>Checkout</dt>
          <dd>Payment completes through the secure hosted checkout already connected to the store.</dd>
        </div>
      </dl>

      <div className="pdp-day-grid" data-reveal>
        <article>
          <span>How it fits into your day</span>
          <p>
            Built for training first, then easy enough for travel, recovery and everyday wear.
          </p>
        </article>
        <article>
          <span>Why your body notices</span>
          <p>
            Organic-material layers help the closest part of the kit feel calmer, cleaner and more considered.
          </p>
        </article>
      </div>

      <div className="shopify-sticky-buy" aria-label="Sticky add to bag">
        <div className="pdp-sticky-info">
          <strong>{product.title}</strong>
          <span>{formatMoney(price)}</span>
        </div>
        <button className="btn" onClick={addToBag}>{addLabel}</button>
      </div>
    </div>
  );
}

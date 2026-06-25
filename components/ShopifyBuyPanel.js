"use client";

import { useState } from "react";
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
    <div className="pdp-info">
      <p className="pdp-cat">{product.productType || "Vyomawear"}</p>
      <h1>{product.title}</h1>
      <p className="pdp-price">{formatMoney(price)}</p>
      {product.description && <p className="pdp-desc">{product.description}</p>}

      {options.map((opt) => (
        <div className="pdp-field" key={opt.name}>
          <div className="pdp-field-head">
            <span className="pdp-label">{opt.name}</span>
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
      ))}

      <div className="pdp-field">
        <span className="pdp-label">Quantity</span>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span aria-live="polite">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
        </div>
      </div>

      <div className="pdp-actions">
        <button className="btn block" onClick={addToBag}>Add to bag</button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}

      <p className="pdp-lead">✦ Made for you in India · ships in 10–14 days</p>
    </div>
  );
}

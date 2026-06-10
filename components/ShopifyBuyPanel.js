"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/shopify";
import { toast, celebrateFrom } from "@/lib/fx";

// Option-aware buy panel for a Shopify product. Tracks a selection per option
// (Size, Colour, …), resolves the matching variant, and starts Shopify's hosted
// checkout. Works for single-option (just sizes) and multi-option products.
export default function ShopifyBuyPanel({ product }) {
  const options = (product.options || []).filter(
    (o) => !(o.values.length === 1 && o.values[0] === "Default Title")
  );
  const variants = product.variants.nodes;

  const [selected, setSelected] = useState(() =>
    variants.length === 1 ? variantOptions(variants[0]) : {}
  );
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
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

  function pick(name, value) {
    setError("");
    setSelected((s) => ({ ...s, [name]: value }));
  }

  async function buy(e) {
    setError("");
    if (!complete || !match) {
      setError("Choose your options to continue.");
      return;
    }
    if (!match.availableForSale) {
      setError("That option is sold out.");
      return;
    }
    setBusy(true);
    try {
      celebrateFrom(e);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId: match.id, quantity: qty }),
      });
      const data = await res.json();
      if (data.url) {
        toast(`${product.title} — to checkout`);
        window.location.href = data.url; // Shopify-hosted checkout
      } else {
        setError(data.error || "Could not start checkout. Please try again.");
        setBusy(false);
      }
    } catch {
      setError("Could not start checkout. Check your connection and try again.");
      setBusy(false);
    }
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
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(5, qty + 1))}>+</button>
        </div>
      </div>

      <div className="pdp-actions">
        <button className="btn block" onClick={buy} disabled={busy}>
          {busy ? "Opening secure checkout…" : "Buy now — secure checkout"}
        </button>
      </div>
      {error && <p className="error" role="alert">{error}</p>}

      <p className="pdp-lead">✦ Made for you in India · ships in 10–14 days</p>
    </div>
  );
}

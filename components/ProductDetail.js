"use client";

import { useState } from "react";
import { useCart, useRegion } from "./Providers";
import { COLOURWAYS, swatchStyle } from "@/lib/catalog";
import { getRegion } from "@/lib/regions";
import { formatMoney, priceFor } from "@/lib/format";
import SizeGuide from "./SizeGuide";

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const { region } = useRegion();
  const [colour, setColour] = useState(product.colourways[0]);
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const r = getRegion(region);
  const unit = priceFor(product, region);

  function build() {
    if (!size) {
      setError("Pick your size first ✦");
      return null;
    }
    setError("");
    return {
      slug: product.slug,
      name: product.name,
      colour,
      colourName: COLOURWAYS[colour]?.name,
      size,
      qty,
      priceAud: product.priceAud,
      priceInr: product.priceInr,
      category: product.category,
    };
  }

  function add() {
    const item = build();
    if (item) addItem(item);
  }

  async function buyNow() {
    const item = build();
    if (!item) return;
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          items: [{ slug: product.slug, colour, size, quantity: qty }],
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else {
        setError(data.error || "Could not start checkout.");
        setBusy(false);
      }
    } catch {
      setError("Could not start checkout. Try again.");
      setBusy(false);
    }
  }

  return (
    <div className="pdp">
      <div className="pdp-media">
        <div className="pdp-swatch" style={swatchStyle(colour)} role="img" aria-label={COLOURWAYS[colour]?.name}>
          <span className="pdp-glyph" style={{ color: COLOURWAYS[colour]?.ink }}>व्योम</span>
        </div>
        <div className="pdp-thumbs">
          {product.colourways.map((key) => (
            <button
              key={key}
              className={`pdp-thumb ${colour === key ? "active" : ""}`}
              style={swatchStyle(key)}
              onClick={() => setColour(key)}
              aria-label={COLOURWAYS[key]?.name}
              aria-pressed={colour === key}
            />
          ))}
        </div>
      </div>

      <div className="pdp-info">
        <p className="pdp-cat">{product.category} · {product.tagline}</p>
        <h1>{product.name}</h1>
        <p className="pdp-price">{formatMoney(unit, region)}</p>
        <p className="pdp-desc">{product.description}</p>

        <div className="pdp-field">
          <div className="pdp-field-head">
            <span className="pdp-label">Colour — {COLOURWAYS[colour]?.name}</span>
          </div>
          <div className="colour-row">
            {product.colourways.map((key) => (
              <button
                key={key}
                className={`colour-dot ${colour === key ? "active" : ""}`}
                style={{ background: COLOURWAYS[key]?.base }}
                onClick={() => setColour(key)}
                aria-label={COLOURWAYS[key]?.name}
                aria-pressed={colour === key}
                title={COLOURWAYS[key]?.name}
              />
            ))}
          </div>
        </div>

        <div className="pdp-field">
          <div className="pdp-field-head">
            <span className="pdp-label">Size</span>
            <button className="link-btn" onClick={() => setGuideOpen(true)}>Size guide</button>
          </div>
          <div className="sizes" role="group" aria-label="Choose size">
            {product.sizes.map((s) => (
              <button
                key={s}
                className="size"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-field">
          <span className="pdp-label">Quantity</span>
          <div className="qty">
            <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span aria-live="polite">{qty}</span>
            <button aria-label="Increase quantity" onClick={() => setQty(Math.min(10, qty + 1))}>+</button>
          </div>
        </div>

        <div className="pdp-actions">
          <button className="btn block" onClick={add}>Add to bag</button>
          <button className="btn ghost block" onClick={buyNow} disabled={busy}>
            {busy ? "Opening checkout…" : "Buy it now"}
          </button>
        </div>
        {error && <p className="error" role="alert">{error}</p>}

        <p className="pdp-lead">✦ {product.leadTime} · {r.shipping}</p>

        <dl className="pdp-specs">
          <div><dt>Fabric</dt><dd>{product.fabric}</dd></div>
          <div><dt>Fit</dt><dd>{product.fit}</dd></div>
          <div><dt>Care</dt><dd>{product.care}</dd></div>
        </dl>

        <div className="made-for-you">
          <h4>Made for you, not for a warehouse</h4>
          <ol className="moto-timeline">
            <li><span>1</span> You order — and your piece begins, in Tiruppur, India</li>
            <li><span>2</span> Cut, sewn and checked by hand, just for you</li>
            <li><span>3</span> Couriered to your door, with tracking the whole way</li>
          </ol>
          <p className="muted small">Nothing mass-produced. Nothing wasted. That's the whole idea.</p>
        </div>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} fit={product.fit} />
    </div>
  );
}

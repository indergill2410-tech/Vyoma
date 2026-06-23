"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, useRegion } from "@/components/Providers";
import { getRegion } from "@/lib/regions";
import { formatMoney } from "@/lib/format";
import { COLOURWAYS, swatchStyle, getProduct } from "@/lib/catalog";

function unitPrice(it, region) {
  const product = getProduct(it.slug);
  if (product) return region === "IN" ? product.priceInr : product.priceAud;
  return region === "IN" ? it.priceInr : it.priceAud;
}

export default function CartPage() {
  const { items, count, updateQty, removeItem, lineId } = useCart();
  const { region } = useRegion();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const r = getRegion(region);

  const subtotal = items.reduce((sum, it) => sum + unitPrice(it, region) * it.qty, 0);

  async function checkout() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          items: items.map((it) => ({ slug: it.slug, colour: it.colour, size: it.size, quantity: it.qty })),
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else {
        setError(data.error || "Could not start secure checkout.");
        setBusy(false);
      }
    } catch {
      setError("Could not start secure checkout. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="commerce-page cart-page">
      <section className="cart-hero">
        <div className="commerce-shell cart-hero-inner">
          <p className="commerce-eyebrow">Your bag</p>
          <h1>{count === 0 ? "Your bag is ready when you are." : "A calmer checkout starts here."}</h1>
          <p>
            Review your pieces, then move through secure checkout. Prices and shipping are confirmed before payment.
          </p>
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          {count === 0 ? (
            <div className="empty-bag-panel">
              <span className="commerce-motif">व्योम</span>
              <h2>Nothing here yet.</h2>
              <p>
                Start with the first drop, or use the Fit Finder if you want a little help choosing your size.
              </p>
              <div className="commerce-actions center-actions">
                <Link href="/shop" className="btn accent">Shop the first drop</Link>
                <Link href="/fit" className="btn ghost">Find your fit</Link>
              </div>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-lines" aria-label="Bag items">
                {items.map((it) => {
                  const id = lineId(it);
                  const unit = unitPrice(it, region);
                  return (
                    <article className="cart-line" key={id}>
                      <div className="cart-thumb" style={swatchStyle(it.colour)} aria-hidden="true" />
                      <div className="cart-line-body">
                        <div className="cart-line-top">
                          <div>
                            <h2>{it.name}</h2>
                            <p>{COLOURWAYS[it.colour]?.name} · Size {it.size}</p>
                          </div>
                          <button className="link-btn" onClick={() => removeItem(id)}>Remove</button>
                        </div>
                        <div className="cart-line-foot">
                          <div className="qty-mini" aria-label={`Quantity for ${it.name}`}>
                            <button onClick={() => updateQty(id, Math.max(0, it.qty - 1))} aria-label="Decrease">−</button>
                            <span>{it.qty}</span>
                            <button onClick={() => updateQty(id, Math.min(10, it.qty + 1))} aria-label="Increase">+</button>
                          </div>
                          <strong>{formatMoney(unit * it.qty, region)}</strong>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <aside className="cart-summary" aria-label="Order summary">
                <p className="commerce-eyebrow">Summary</p>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>{formatMoney(subtotal, region)}</strong>
                </div>
                <p className="muted small">{r.shipping}</p>
                <ul className="summary-trust">
                  <li>Secure hosted checkout</li>
                  <li>Tracked delivery</li>
                  <li>Fit support after purchase</li>
                </ul>
                {error && <p className="error">{error}</p>}
                <button className="btn accent block" onClick={checkout} disabled={busy}>
                  {busy ? "Opening secure checkout..." : `Checkout · ${formatMoney(subtotal, region)}`}
                </button>
                <Link href="/shop" className="cart-continue">Continue shopping</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

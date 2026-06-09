"use client";

import { useState } from "react";
import { useCart, useRegion } from "./Providers";
import { getRegion } from "@/lib/regions";
import { formatMoney } from "@/lib/format";
import { COLOURWAYS, swatchStyle } from "@/lib/catalog";

export default function CartDrawer() {
  const { items, count, updateQty, removeItem, lineId, drawerOpen, setDrawerOpen } = useCart();
  const { region } = useRegion();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const r = getRegion(region);
  const subtotal = items.reduce(
    (sum, it) => sum + (region === "IN" ? it.priceInr : it.priceAud) * it.qty,
    0
  );

  async function checkout() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          items: items.map((it) => ({
            slug: it.slug,
            colour: it.colour,
            size: it.size,
            quantity: it.qty,
          })),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
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
    <>
      <div
        className={`drawer-scrim ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer ${drawerOpen ? "open" : ""}`}
        aria-hidden={!drawerOpen}
        aria-label="Shopping cart"
      >
        <div className="drawer-head">
          <h2>Your bag</h2>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        {count === 0 ? (
          <div className="drawer-empty">
            <span className="dev">व्योम</span>
            <p>Your bag is empty.</p>
            <p className="muted">Everything is made to order — nothing sits in a warehouse.</p>
            <button className="btn" onClick={() => setDrawerOpen(false)}>
              Browse the collection
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((it) => {
                const id = lineId(it);
                const c = COLOURWAYS[it.colour];
                const unit = region === "IN" ? it.priceInr : it.priceAud;
                return (
                  <div className="drawer-item" key={id}>
                    <div className="drawer-thumb" style={swatchStyle(it.colour)} aria-hidden="true" />
                    <div className="drawer-item-body">
                      <div className="drawer-item-top">
                        <strong>{it.name}</strong>
                        <button className="link-btn" onClick={() => removeItem(id)} aria-label={`Remove ${it.name}`}>
                          Remove
                        </button>
                      </div>
                      <p className="muted small">
                        {c?.name} · Size {it.size}
                      </p>
                      <div className="drawer-item-foot">
                        <div className="qty-mini">
                          <button onClick={() => updateQty(id, Math.max(0, it.qty - 1))} aria-label="Decrease quantity">−</button>
                          <span>{it.qty}</span>
                          <button onClick={() => updateQty(id, Math.min(10, it.qty + 1))} aria-label="Increase quantity">+</button>
                        </div>
                        <span className="drawer-line-price">{formatMoney(unit * it.qty, region)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="drawer-foot">
              <div className="drawer-subtotal">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal, region)}</strong>
              </div>
              <p className="muted small">{r.shipping}</p>
              {error && <p className="error">{error}</p>}
              <button className="btn block" onClick={checkout} disabled={busy}>
                {busy ? "Opening secure checkout…" : `Checkout · ${formatMoney(subtotal, region)}`}
              </button>
              <p className="muted xsmall center">
                Secure checkout. {r.note}
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

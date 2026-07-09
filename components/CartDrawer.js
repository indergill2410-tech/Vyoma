"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./Providers";
import { formatMoney } from "@/lib/shopify";

// The bag. Lines are Shopify variants; checkout creates a Shopify cart with every
// line and redirects to Shopify's hosted, secure checkout.
export default function CartDrawer() {
  const { items, count, updateQty, removeItem, lineId, drawerOpen, setDrawerOpen } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const currencyCode = items[0]?.currencyCode || "AUD";
  const subtotal = items.reduce((sum, it) => sum + parseFloat(it.amount || 0) * it.qty, 0);
  const money = (amount) => formatMoney({ amount, currencyCode });

  async function checkout() {
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((it) => ({ merchandiseId: it.variantId, quantity: it.qty })),
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
            <p className="muted">Start with the layer your body will actually want to keep on.</p>
            <button className="btn" onClick={() => setDrawerOpen(false)}>
              Browse the collection
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((it) => {
                const id = lineId(it);
                return (
                  <div className="drawer-item" key={id}>
                    {it.image?.url ? (
                      <Image
                        className="drawer-thumb"
                        src={it.image.url}
                        alt={it.image.alt || it.productTitle}
                        width={64}
                        height={80}
                      />
                    ) : (
                      <div className="drawer-thumb" aria-hidden="true" />
                    )}
                    <div className="drawer-item-body">
                      <div className="drawer-item-top">
                        <strong>{it.productTitle}</strong>
                        <button className="link-btn" onClick={() => removeItem(id)} aria-label={`Remove ${it.productTitle}`}>
                          Remove
                        </button>
                      </div>
                      {it.variantTitle && <p className="muted small">{it.variantTitle}</p>}
                      <div className="drawer-item-foot">
                        <div className="qty-mini">
                          <button onClick={() => updateQty(id, Math.max(0, it.qty - 1))} aria-label="Decrease quantity">−</button>
                          <span>{it.qty}</span>
                          <button onClick={() => updateQty(id, Math.min(10, it.qty + 1))} aria-label="Increase quantity">+</button>
                        </div>
                        <span className="drawer-line-price">{money(parseFloat(it.amount || 0) * it.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="drawer-foot">
              <div className="drawer-subtotal">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p className="muted small">Shipping and taxes are shown before payment in hosted checkout.</p>
              {error && <p className="error">{error}</p>}
              <button className="btn block" onClick={checkout} disabled={busy}>
                {busy ? "Opening secure checkout…" : `Checkout · ${money(subtotal)}`}
              </button>
              <p className="muted xsmall center">
                Hosted Shopify checkout. Your total is shown before payment.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/Providers";
import { formatMoney } from "@/lib/shopify";

// Full-page bag. Lines are Shopify variants; checkout creates a Shopify cart with
// every line and redirects to Shopify's hosted checkout.
export default function CartPage() {
  const { items, count, updateQty, removeItem, lineId } = useCart();
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
      if (data.url) window.location.href = data.url;
      else { setError(data.error || "Could not start checkout."); setBusy(false); }
    } catch {
      setError("Could not start checkout. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="container" style={{ padding: "44px 24px 80px", maxWidth: 760 }}>
      <p className="crumb" style={{ paddingTop: 0 }}><Link href="/#shop">Collection</Link> / Bag</p>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: 36, margin: "8px 0 24px" }}>Your bag</h1>

      {count === 0 ? (
        <div className="order-card" style={{ textAlign: "center", padding: 48 }}>
          <span className="dev" style={{ fontSize: 36, color: "var(--marigold)", display: "block", marginBottom: 12 }}>व्योम</span>
          <p className="muted">Nothing here yet. Warm activewear for training, travel, recovery and everything after.</p>
          <p style={{ marginTop: 18 }}><Link href="/#shop" className="btn">Browse the collection</Link></p>
        </div>
      ) : (
        <>
          {items.map((it) => {
            const id = lineId(it);
            return (
              <div className="drawer-item" key={id} style={{ background: "#fff", border: "1px solid var(--mist)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                {it.image?.url ? (
                  <Image className="drawer-thumb" src={it.image.url} alt={it.image.alt || it.productTitle} width={64} height={80} />
                ) : (
                  <div className="drawer-thumb" aria-hidden="true" />
                )}
                <div className="drawer-item-body">
                  <div className="drawer-item-top">
                    <strong>{it.productTitle}</strong>
                    <button className="link-btn" onClick={() => removeItem(id)}>Remove</button>
                  </div>
                  {it.variantTitle && <p className="muted small">{it.variantTitle}</p>}
                  <div className="drawer-item-foot">
                    <div className="qty-mini">
                      <button onClick={() => updateQty(id, Math.max(0, it.qty - 1))} aria-label="Decrease">−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(id, Math.min(10, it.qty + 1))} aria-label="Increase">+</button>
                    </div>
                    <span className="drawer-line-price">{money(parseFloat(it.amount || 0) * it.qty)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="order-card">
            <div className="drawer-subtotal" style={{ marginBottom: 8 }}>
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <p className="muted small">Shipping &amp; taxes calculated at checkout.</p>
            {error && <p className="error">{error}</p>}
            <button className="btn block" style={{ marginTop: 14 }} onClick={checkout} disabled={busy}>
              {busy ? "Opening secure checkout…" : `Checkout · ${money(subtotal)}`}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

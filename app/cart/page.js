"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, useRegion } from "@/components/Providers";
import { getRegion } from "@/lib/regions";
import { formatMoney } from "@/lib/format";
import { COLOURWAYS, swatchStyle } from "@/lib/catalog";

export default function CartPage() {
  const { items, count, updateQty, removeItem, lineId } = useCart();
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
          items: items.map((it) => ({ slug: it.slug, colour: it.colour, size: it.size, quantity: it.qty })),
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
          <p className="muted">Nothing here yet. Everything's made the moment you order it — so let's find your piece.</p>
          <p style={{ marginTop: 18 }}><Link href="/#shop" className="btn">Browse the collection</Link></p>
        </div>
      ) : (
        <>
          {items.map((it) => {
            const id = lineId(it);
            const unit = region === "IN" ? it.priceInr : it.priceAud;
            return (
              <div className="drawer-item" key={id} style={{ background: "#fff", border: "1px solid var(--mist)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
                <div className="drawer-thumb" style={swatchStyle(it.colour)} aria-hidden="true" />
                <div className="drawer-item-body">
                  <div className="drawer-item-top">
                    <strong>{it.name}</strong>
                    <button className="link-btn" onClick={() => removeItem(id)}>Remove</button>
                  </div>
                  <p className="muted small">{COLOURWAYS[it.colour]?.name} · Size {it.size}</p>
                  <div className="drawer-item-foot">
                    <div className="qty-mini">
                      <button onClick={() => updateQty(id, Math.max(0, it.qty - 1))} aria-label="Decrease">−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(id, Math.min(10, it.qty + 1))} aria-label="Increase">+</button>
                    </div>
                    <span className="drawer-line-price">{formatMoney(unit * it.qty, region)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="order-card">
            <div className="drawer-subtotal" style={{ marginBottom: 8 }}>
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal, region)}</strong>
            </div>
            <p className="muted small">{r.shipping}</p>
            {error && <p className="error">{error}</p>}
            <button className="btn block" style={{ marginTop: 14 }} onClick={checkout} disabled={busy}>
              {busy ? "Opening secure checkout…" : `Checkout · ${formatMoney(subtotal, region)}`}
            </button>
          </div>
        </>
      )}
    </main>
  );
}

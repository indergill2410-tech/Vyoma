"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";
import { COLOURWAYS } from "@/lib/catalog";

const STEPS = [
  { key: "paid", title: "Order confirmed", desc: "Payment received. Your order is in the queue." },
  { key: "in_production", title: "Being made for you", desc: "Cut, sewn and quality-checked to order in Tiruppur, India." },
  { key: "shipped", title: "On its way", desc: "Handed to a tracked courier, heading to you." },
  { key: "delivered", title: "Delivered", desc: "It's yours. We hope it has room to grow with you." },
];

export default function Track() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  async function lookup(e) {
    e.preventDefault();
    setError("");
    setState("loading");
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber: orderNumber.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        setOrder(data.order);
        setState("done");
      } else {
        setOrder(null);
        setState("idle");
        setError(data.error || "We couldn't find that order. Check the number and email.");
      }
    } catch {
      setState("idle");
      setError("Network error. Please try again.");
    }
  }

  const activeIndex = order ? STEPS.findIndex((s) => s.key === order.status) : -1;
  const items = order ? safeItems(order.items) : [];

  return (
    <main className="center-page">
      <span className="dev">व्योम</span>
      <h1>Track your order</h1>
      <p>Enter your order number (like VY-7F3K2) and the email you used at checkout.</p>

      <form className="track-form" onSubmit={lookup}>
        <input
          placeholder="Order number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
          aria-label="Order number"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          required
        />
        <button className="btn" type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Looking…" : "Track"}
        </button>
      </form>
      {error && <p className="error" style={{ textAlign: "center" }}>{error}</p>}

      {order && (
        <>
          <div className="order-card">
            <div className="order-card-head">
              <strong style={{ fontFamily: "var(--serif)", fontSize: 18 }}>{order.orderNumber}</strong>
              <span className={`status ${order.status}`}>{order.status.replaceAll("_", " ")}</span>
            </div>
            {items.map((it, i) => (
              <p key={i} className="muted small" style={{ margin: "2px 0" }}>
                {it.name} — {COLOURWAYS[it.colour]?.name || it.colour}, size {it.size} × {it.quantity}
              </p>
            ))}
            <p style={{ marginTop: 12, fontFamily: "var(--serif)" }}>
              Total {formatMoney(order.amountTotal, order.region)}
            </p>
            {order.trackingNumber && (
              <p className="small" style={{ marginTop: 8 }}>
                Tracking: <strong>{order.trackingNumber}</strong>
              </p>
            )}
          </div>

          <div className="timeline">
            {STEPS.map((step, i) => {
              const cls = i < activeIndex ? "done" : i === activeIndex ? "current done" : "";
              return (
                <div className={`tl-step ${cls}`} key={step.key}>
                  <div className="tl-dot">{i <= activeIndex ? "✓" : i + 1}</div>
                  <div className="tl-body">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

function safeItems(json) {
  try {
    return JSON.parse(json) || [];
  } catch {
    return [];
  }
}

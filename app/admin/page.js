"use client";

import { useState } from "react";

const STATUSES = ["paid", "in_production", "shipped", "delivered"];

export default function Admin() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [error, setError] = useState("");

  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [waitlist, setWaitlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  function headers() {
    return { "Content-Type": "application/json", "x-admin-token": token };
  }

  async function loadAll(tk = token) {
    setError("");
    try {
      const opts = { headers: { "x-admin-token": tk } };
      const [m, o, w, r] = await Promise.all([
        fetch("/api/metrics", opts),
        fetch("/api/orders", opts),
        fetch("/api/waitlist", opts),
        fetch("/api/reviews?admin=1", opts),
      ]);
      if (m.status === 401) {
        setError("That admin token isn't right.");
        return false;
      }
      if (!m.ok || !o.ok || !w.ok || !r.ok) {
        setError("Couldn't load the dashboard. Please try again.");
        return false;
      }
      setMetrics((await m.json()).metrics);
      setOrders((await o.json()).orders || []);
      setWaitlist((await w.json()).entries || []);
      setReviews((await r.json()).reviews || []);
      return true;
    } catch {
      setError("A network error occurred. Please try again.");
      return false;
    }
  }

  async function gate() {
    const ok = await loadAll();
    if (ok) setAuthed(true);
  }

  async function setStatus(id, status) {
    await fetch("/api/orders", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, status }) });
    loadAll();
  }

  async function setTracking(id) {
    const trackingNumber = prompt("Tracking number for this order:");
    if (trackingNumber == null) return;
    await fetch("/api/orders", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, trackingNumber }) });
    loadAll();
  }

  async function moderate(id, status) {
    await fetch("/api/reviews", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, status }) });
    loadAll();
  }

  if (!authed) {
    return (
      <main className="container admin">
        <h1>Admin</h1>
        <p className="muted" style={{ marginBottom: 20 }}>Enter the admin token to view orders, the waitlist and reviews.</p>
        <div className="admin-gate">
          <input
            type="password"
            placeholder="Admin token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && gate()}
          />
          <button className="btn" onClick={gate}>Sign in</button>
          {error && <p className="error">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="container admin">
      <h1>Mission control</h1>
      <p className="muted">Vyomawear · live store data</p>

      <div className="admin-tabs">
        {["dashboard", "orders", "waitlist", "reviews"].map((t) => (
          <button key={t} className={`admin-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "waitlist" ? `Waitlist (${waitlist.length})` : t === "reviews" ? `Reviews (${reviews.filter((r) => r.status === "pending").length})` : t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "dashboard" && metrics && (
        <>
          <div className="metrics">
            <div className="metric">
              <div className="m-label">Revenue (AUD)</div>
              <div className="m-value">A${(metrics.revenueAud / 100).toLocaleString()}</div>
              <div className="m-sub">{metrics.ordersAud} AU orders</div>
            </div>
            <div className="metric">
              <div className="m-label">Revenue (INR)</div>
              <div className="m-value">₹{(metrics.revenueInr / 100).toLocaleString()}</div>
              <div className="m-sub">{metrics.ordersIn} IN orders</div>
            </div>
            <div className="metric">
              <div className="m-label">Total orders</div>
              <div className="m-value">{metrics.totalOrders}</div>
              <div className="m-sub">{metrics.unfulfilled} to fulfil</div>
            </div>
            <div className="metric">
              <div className="m-label">Waitlist</div>
              <div className="m-value">{metrics.waitlist}</div>
              <div className="m-sub">future customers</div>
            </div>
          </div>
          <div className="metrics">
            {STATUSES.map((s) => (
              <div className="metric" key={s}>
                <div className="m-label">{s.replaceAll("_", " ")}</div>
                <div className="m-value">{metrics.byStatus?.[s] || 0}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "orders" && (
        orders.length === 0 ? (
          <p className="muted">No orders yet. When the first one lands, it appears here.</p>
        ) : (
          <table className="table">
            <thead>
              <tr><th>When</th><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Move to</th></tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><small>{new Date(o.createdAt).toLocaleString()}</small></td>
                  <td><strong>{o.orderNumber}</strong><br /><small>{o.region}</small></td>
                  <td>{o.customerName || "—"}<br /><small>{o.email}</small></td>
                  <td>{renderItems(o.items)}</td>
                  <td>{(o.amountTotal / 100).toFixed(0)} {o.currency.toUpperCase()}</td>
                  <td><span className={`status ${o.status}`}>{o.status.replaceAll("_", " ")}</span>{o.trackingNumber && <><br /><small>#{o.trackingNumber}</small></>}</td>
                  <td>
                    <div className="admin-actions">
                      {STATUSES.filter((s) => s !== o.status).map((s) => (
                        <button key={s} className="mini-btn" onClick={() => setStatus(o.id, s)}>{s.replaceAll("_", " ")}</button>
                      ))}
                      <button className="mini-btn" onClick={() => setTracking(o.id)}>+ tracking</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}

      {tab === "waitlist" && (
        waitlist.length === 0 ? (
          <p className="muted">No signups yet.</p>
        ) : (
          <table className="table">
            <thead><tr><th>When</th><th>Email</th><th>Region</th><th>Source</th></tr></thead>
            <tbody>
              {waitlist.map((w) => (
                <tr key={w.id}>
                  <td><small>{new Date(w.createdAt).toLocaleDateString()}</small></td>
                  <td>{w.email}</td>
                  <td>{w.region}</td>
                  <td><small>{w.source}</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}

      {tab === "reviews" && (
        reviews.length === 0 ? (
          <p className="muted">No reviews yet.</p>
        ) : (
          <table className="table">
            <thead><tr><th>When</th><th>Product</th><th>Rating</th><th>Review</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td><small>{new Date(r.createdAt).toLocaleDateString()}</small></td>
                  <td><small>{r.productSlug}</small></td>
                  <td>{"★".repeat(r.rating)}<span style={{ color: "var(--mist)" }}>{"★".repeat(5 - r.rating)}</span></td>
                  <td>{r.title && <strong>{r.title}</strong>}<br />{r.body}<br /><small>— {r.author}</small></td>
                  <td><span className="status">{r.status}</span></td>
                  <td>
                    <div className="admin-actions">
                      {r.status !== "approved" && <button className="mini-btn" onClick={() => moderate(r.id, "approved")}>Approve</button>}
                      {r.status !== "hidden" && <button className="mini-btn danger" onClick={() => moderate(r.id, "hidden")}>Hide</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </main>
  );
}

function renderItems(json) {
  try {
    const items = JSON.parse(json);
    return items.map((it, i) => (
      <div key={i}><small>{it.name} · {it.size} × {it.quantity}</small></div>
    ));
  } catch {
    return <small>—</small>;
  }
}

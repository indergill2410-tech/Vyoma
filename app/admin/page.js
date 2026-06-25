"use client";

import { useState } from "react";

// Orders, revenue and fulfilment live in the Shopify admin. This dashboard covers
// what Vyoma owns: The Circle waitlist and review moderation.
export default function Admin() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [error, setError] = useState("");

  const [metrics, setMetrics] = useState(null);
  const [waitlist, setWaitlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  function headers() {
    return { "Content-Type": "application/json", "x-admin-token": token };
  }

  async function loadAll(tk = token) {
    setError("");
    try {
      const opts = { headers: { "x-admin-token": tk } };
      const [m, w, r] = await Promise.all([
        fetch("/api/metrics", opts),
        fetch("/api/waitlist", opts),
        fetch("/api/reviews?admin=1", opts),
      ]);
      if (m.status === 401) {
        setError("That admin token isn't right.");
        return false;
      }
      if (!m.ok || !w.ok || !r.ok) {
        setError("Couldn't load the dashboard. Please try again.");
        return false;
      }
      setMetrics((await m.json()).metrics);
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

  async function moderate(id, status) {
    await fetch("/api/reviews", { method: "PATCH", headers: headers(), body: JSON.stringify({ id, status }) });
    loadAll();
  }

  if (!authed) {
    return (
      <main className="container admin">
        <h1>Admin</h1>
        <p className="muted" style={{ marginBottom: 20 }}>Enter the admin token to view The Circle and reviews.</p>
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
      <p className="muted">Vyomawear · The Circle &amp; reviews. Orders live in your Shopify admin.</p>

      <div className="admin-tabs">
        {["dashboard", "waitlist", "reviews"].map((t) => (
          <button key={t} className={`admin-tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t === "waitlist" ? `Waitlist (${waitlist.length})` : t === "reviews" ? `Reviews (${reviews.filter((r) => r.status === "pending").length})` : t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "dashboard" && metrics && (
        <div className="metrics">
          <div className="metric">
            <div className="m-label">The Circle</div>
            <div className="m-value">{metrics.members}</div>
            <div className="m-sub">distinct members</div>
          </div>
          <div className="metric">
            <div className="m-label">Signups</div>
            <div className="m-value">{metrics.waitlist}</div>
            <div className="m-sub">across all sources</div>
          </div>
          <div className="metric">
            <div className="m-label">Reviews to moderate</div>
            <div className="m-value">{metrics.pendingReviews}</div>
            <div className="m-sub">pending approval</div>
          </div>
          <div className="metric">
            <div className="m-label">Approved reviews</div>
            <div className="m-value">{metrics.approvedReviews}</div>
            <div className="m-sub">live on the site</div>
          </div>
        </div>
      )}

      {tab === "waitlist" && (
        waitlist.length === 0 ? (
          <p className="muted">No signups yet.</p>
        ) : (
          <table className="table">
            <thead><tr><th>When</th><th>Email</th><th>Source</th><th>Code</th><th>Referred by</th></tr></thead>
            <tbody>
              {waitlist.map((w) => (
                <tr key={w.id}>
                  <td><small>{new Date(w.createdAt).toLocaleDateString()}</small></td>
                  <td>{w.email}</td>
                  <td><small>{w.source}</small></td>
                  <td><small>{w.referralCode || "—"}</small></td>
                  <td><small>{w.referredBy || "—"}</small></td>
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

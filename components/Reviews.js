"use client";

import { useCallback, useEffect, useState } from "react";

function Stars({ value, onChange }) {
  return (
    <div className={`stars ${onChange ? "input" : ""}`} role={onChange ? "radiogroup" : "img"} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star ${n <= value ? "on" : ""}`}
          onClick={onChange ? () => onChange(n) : undefined}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          tabIndex={onChange ? 0 : -1}
          disabled={!onChange}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Reviews({ slug }) {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ author: "", rating: 5, title: "", body: "" });
  const [state, setState] = useState("idle");

  const load = useCallback(async function load() {
    try {
      const res = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) return;
      const json = await res.json();
      setData(json);
    } catch {
      // Leave data null — the section falls back to its "no reviews yet" state
      // instead of throwing if the API is briefly unavailable.
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit(e) {
    e.preventDefault();
    if (!form.author.trim() || !form.body.trim()) {
      setState("error");
      return;
    }
    setState("loading");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, slug }),
    });
    if (res.ok) {
      setState("done");
      setForm({ author: "", rating: 5, title: "", body: "" });
    } else {
      setState("error");
    }
  }

  const avg = data?.average || 0;
  const count = data?.count || 0;

  return (
    <section className="reviews container" id="reviews">
      <div className="reviews-head">
        <div>
          <h2>What people say</h2>
          {count > 0 ? (
            <div className="reviews-summary">
              <Stars value={Math.round(avg)} />
              <span>{avg.toFixed(1)} · {count} review{count === 1 ? "" : "s"}</span>
            </div>
          ) : (
            <p className="muted">No reviews yet. Until then, use the fit notes, fabric details and delivery timing to choose with confidence.</p>
          )}
        </div>
        <button className="btn ghost" onClick={() => setOpen((o) => !o)}>
          {open ? "Close" : "Write a review"}
        </button>
      </div>

      {open && (
        state === "done" ? (
          <div className="review-thanks">
            ✦ Thank you. Your review is in - we read every one before it goes live.
          </div>
        ) : (
          <form className="review-form" onSubmit={submit}>
            <div className="review-form-row">
              <input
                placeholder="Your name"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                aria-label="Your name"
                required
              />
              <Stars value={form.rating} onChange={(n) => setForm({ ...form, rating: n })} />
            </div>
            <input
              placeholder="Headline (optional)"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              aria-label="Review headline"
            />
            <textarea
              placeholder="How does it move, feel and fit?"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              aria-label="Your review"
              rows={3}
              required
            />
            {state === "error" && <p className="error">Please add your name, a rating and a few words.</p>}
            <button className="btn" type="submit" disabled={state === "loading"}>
              {state === "loading" ? "Sending…" : "Submit review"}
            </button>
          </form>
        )
      )}

      <div className="review-list">
        {data?.reviews?.length > 0 &&
          data.reviews.map((rv) => (
            <article className="review" key={rv.id}>
              <div className="review-top">
                <Stars value={rv.rating} />
                {rv.verified && <span className="verified">✓ Verified</span>}
              </div>
              {rv.title && <h4>{rv.title}</h4>}
              <p>{rv.body}</p>
              <p className="muted small">— {rv.author}</p>
            </article>
          ))}
      </div>
    </section>
  );
}

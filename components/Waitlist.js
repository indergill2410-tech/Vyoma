"use client";

import { useEffect, useState } from "react";
import { useRegion } from "./Providers";
import { TIERS } from "@/lib/circle-config";

// Email capture for the drop waitlist — now "The Circle": after you join you get
// a share code, a place in line, and a ladder of Founding-Member perks. Every
// friend you bring in moves you up. See lib/circle.js.
export default function Waitlist({ source = "homepage", compact = false }) {
  const { region } = useRegion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [ref, setRef] = useState("");
  const [copied, setCopied] = useState(false);

  // Pick up ?ref=CODE from the share link the visitor arrived on.
  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get("ref");
      if (code) setRef(code.trim().toUpperCase().slice(0, 12));
    } catch {
      /* no-op */
    }
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setState("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, region, source, ref }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus(data);
        setState("done");
        setMessage(data.already ? "You're already in the circle ✦" : "You're in the circle.");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  if (state === "done" && status) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = status.code ? `${origin}/circle?ref=${status.code}` : origin;
    const shareText =
      "I just joined the Vyoma circle ✦ natural-fibre activewear, made in India. Join me before the first drop:";

    async function copy() {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* clipboard blocked — links below still work */
      }
    }
    async function nativeShare() {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Vyoma — The Circle", text: shareText, url: shareUrl });
        } catch {
          /* dismissed */
        }
      } else {
        copy();
      }
    }

    const wa = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

    return (
      <div className={`circle-card ${compact ? "compact" : ""}`} data-reveal>
        <p className="circle-hello">✦ {message}</p>

        <div className="circle-stats">
          {status.founderNumber ? (
            <div className="circle-stat">
              <span className="circle-stat-num">#{status.founderNumber}</span>
              <span className="circle-stat-label">Founding Member</span>
            </div>
          ) : null}
          <div className="circle-stat">
            <span className="circle-stat-num">#{status.position}</span>
            <span className="circle-stat-label">Your place in line</span>
          </div>
          <div className="circle-stat">
            <span className="circle-stat-num">{status.referrals}</span>
            <span className="circle-stat-label">{status.referrals === 1 ? "Friend joined" : "Friends joined"}</span>
          </div>
        </div>

        {status.nextTier ? (
          <p className="circle-next">
            Refer <strong>{status.toNext} more</strong> to unlock <strong>{status.nextTier.label}</strong> —
            and jump {status.toNext * 10} places up the line.
          </p>
        ) : (
          <p className="circle-next">You've unlocked every Founding-Member perk. You're one of us. ✦</p>
        )}

        <div className="circle-share">
          <button type="button" className="btn accent" onClick={nativeShare}>Share your link</button>
          <button type="button" className="btn ghost" onClick={copy}>
            {copied ? "Copied ✦" : "Copy link"}
          </button>
          <a className="circle-chip wa" href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="circle-chip x" href={x} target="_blank" rel="noopener noreferrer">Post on X</a>
        </div>

        {status.code ? <p className="circle-code">Your code · <strong>{status.code}</strong></p> : null}

        <ol className="circle-ladder">
          {TIERS.filter((t) => t.at > 0).map((t) => {
            const unlocked = status.referrals >= t.at;
            return (
              <li key={t.key} className={unlocked ? "unlocked" : ""}>
                <span className="ladder-mark">{unlocked ? "✦" : t.at}</span>
                <span className="ladder-body">
                  <strong>{t.label}</strong>
                  <span className="ladder-perk">{t.perk}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  return (
    <form className={`waitlist ${compact ? "compact" : ""}`} onSubmit={submit}>
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        required
      />
      <button className="btn accent" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Joining…" : "Join the circle"}
      </button>
      {ref ? <p className="waitlist-msg muted small">A friend invited you ✦ you'll both move up.</p> : null}
      {state === "error" && <p className="error waitlist-msg">{message}</p>}
    </form>
  );
}

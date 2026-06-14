"use client";

import { useState } from "react";
import { TIERS } from "@/lib/circle-config";

// Look up your Circle standing by share code (the code is the share token, so
// this is safe to expose — it reveals rank/referrals, never anyone's email).
export default function CircleStatusCheck() {
  const [code, setCode] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    const c = code.trim().toUpperCase();
    if (!c) return;
    setState("loading");
    setError("");
    try {
      const res = await fetch(`/api/waitlist?code=${encodeURIComponent(c)}`);
      const data = await res.json();
      if (res.ok) {
        setStatus(data);
        setState("done");
      } else {
        setState("error");
        setError(data.error || "We couldn't find that code.");
      }
    } catch {
      setState("error");
      setError("Network error. Try again.");
    }
  }

  return (
    <div className="circle-check">
      <form className="waitlist" onSubmit={submit}>
        <input
          type="text"
          placeholder="SKY-XXXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-label="Your Circle code"
          autoCapitalize="characters"
        />
        <button className="btn" type="submit" disabled={state === "loading"}>
          {state === "loading" ? "Checking…" : "Check my place"}
        </button>
      </form>
      {state === "error" && <p className="error waitlist-msg">{error}</p>}

      {state === "done" && status && (
        <div className="circle-card" style={{ marginTop: 18 }}>
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
              Refer <strong>{status.toNext} more</strong> to unlock <strong>{status.nextTier.label}</strong>.
            </p>
          ) : (
            <p className="circle-next">Every Founding-Member perk unlocked. ✦</p>
          )}
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
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRegion } from "./Providers";

// Email capture for the drop waitlist. Owning the audience is channel #3 in the
// plan — drops are announced here first.
export default function Waitlist({ source = "homepage", compact = false }) {
  const { region } = useRegion();
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const [message, setMessage] = useState("");

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
        body: JSON.stringify({ email, region, source }),
      });
      const data = await res.json();
      if (res.ok) {
        setState("done");
        setMessage(data.already ? "You're already on the list ✦" : "You're on the list. We'll email you first.");
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Try again.");
    }
  }

  if (state === "done") {
    return (
      <div className={`waitlist done ${compact ? "compact" : ""}`}>
        <p className="waitlist-done">✦ {message}</p>
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
      <button className="btn" type="submit" disabled={state === "loading"}>
        {state === "loading" ? "Joining…" : "Join the drop"}
      </button>
      {state === "error" && <p className="error waitlist-msg">{message}</p>}
    </form>
  );
}

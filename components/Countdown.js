"use client";

import { useEffect, useState } from "react";

// Counts down to the first drop. Scarcity + a real date = the Vuori/Gymshark
// playbook (business plan §7). Date comes from NEXT_PUBLIC_DROP_DATE.
export default function Countdown({ date }) {
  const target = date ? new Date(date).getTime() : null;
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!target || now === null) {
    return <div className="countdown" aria-hidden="true" />;
  }

  const diff = Math.max(0, target - now);
  const live = diff === 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  if (live) {
    return <div className="countdown live">The first drop is live ✦</div>;
  }

  const cells = [
    { v: d, l: "days" },
    { v: h, l: "hrs" },
    { v: m, l: "min" },
    { v: s, l: "sec" },
  ];

  return (
    <div className="countdown" role="timer" aria-label="Time until the first drop">
      {cells.map((c) => (
        <div className="cd-cell" key={c.l}>
          <span className="cd-v">{String(c.v).padStart(2, "0")}</span>
          <span className="cd-l">{c.l}</span>
        </div>
      ))}
    </div>
  );
}

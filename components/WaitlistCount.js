"use client";

import { useEffect, useState } from "react";

// Live social proof. Stays quiet until a real circle has formed, then shows the
// count — never an invented number.
export default function WaitlistCount({ threshold = 25, className = "" }) {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/waitlist?count=1")
      .then((r) => r.json())
      .then((d) => alive && setTotal(typeof d.total === "number" ? d.total : null))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (total === null || total < threshold) {
    return <p className={`circle-count forming ${className}`}>The first circle is forming — be among the founders.</p>;
  }
  return (
    <p className={`circle-count ${className}`}>
      <strong>{total.toLocaleString()}</strong> already in the circle ✦ join them
    </p>
  );
}

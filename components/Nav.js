"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "./Providers";
import RegionToggle from "./RegionToggle";

export default function Nav() {
  const { count, setDrawerOpen } = useCart();
  const [bump, setBump] = useState(false);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 500);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link href="/" className="mark" aria-label="Vyomawear home">
          Vyoma<span className="mark-thin">wear</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <Link href="/#shop">Shop</Link>
          <Link href="/fit">Fit Finder</Link>
          <Link href="/about">Story</Link>
          <Link href="/track">Track order</Link>
        </nav>

        <div className="nav-right">
          <RegionToggle compact />
          <button
            type="button"
            id="cart-button"
            className="cart-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            Cart
            <span className={`cart-count ${count > 0 ? "on" : ""} ${bump ? "bump" : ""}`}>{count}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

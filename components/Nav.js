"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCart } from "./Providers";
import RegionToggle from "./RegionToggle";

const LINKS = [
  { href: "/#shop", label: "Shop" },
  { href: "/pure", label: "Pure" },
  { href: "/fabric", label: "Fabric" },
  { href: "/research", label: "Research" },
  { href: "/drops", label: "Drops" },
  { href: "/circle", label: "The Circle" },
  { href: "/about", label: "Story" },
  { href: "/track", label: "Track order" },
];

export default function Nav() {
  const { count, setDrawerOpen } = useCart();
  const [bump, setBump] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        <Link href="/" className="mark" aria-label="Vyomawear home" onClick={() => setMenuOpen(false)}>
          Vyoma<span className="mark-thin">wear</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
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
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "open" : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
      </div>
    </header>
  );
}

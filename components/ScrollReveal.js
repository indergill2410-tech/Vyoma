"use client";

import { useEffect } from "react";

// Global scroll-reveal. Any element with [data-reveal] fades + rises into view
// once. Re-scans on DOM changes so it works across client navigations.
// Content is only hidden while `html.reveal-ready` is set (see layout), so if
// JS never runs, everything stays visible.
export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const seen = new WeakSet();
    function scan() {
      document
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((el) => {
          if (!seen.has(el)) {
            seen.add(el);
            io.observe(el);
          }
        });
    }

    // Debounce to one scan per frame — the homepage countdown mutates the DOM
    // every second, so we must not run querySelectorAll on every mutation.
    let rafId = null;
    function queueScan() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        scan();
        rafId = null;
      });
    }

    scan();
    const mo = new MutationObserver(queueScan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

export default function SkyAtmosphere() {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    const root = document.documentElement;
    if (reduce) {
      root.style.setProperty("--site-sky", "0.42");
      return;
    }

    const scheduleFrame =
      typeof window.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : (callback) => window.setTimeout(callback, 16);
    const cancelFrame =
      typeof window.cancelAnimationFrame === "function"
        ? window.cancelAnimationFrame.bind(window)
        : window.clearTimeout.bind(window);

    let raf = 0;

    function update() {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--site-sky", clamp(window.scrollY / max).toFixed(3));
      raf = 0;
    }

    function requestUpdate() {
      if (!raf) raf = scheduleFrame(update);
    }

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (raf) cancelFrame(raf);
    };
  }, []);

  return <div className="site-sky-atmosphere" aria-hidden="true" />;
}

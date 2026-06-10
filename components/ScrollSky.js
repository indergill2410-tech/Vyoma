"use client";

import { useEffect, useRef } from "react";

// The signature: a fixed sky behind the homepage that warms from night into a
// marigold dawn as you scroll. Sits at z-index:-1, so transparent sections
// reveal it while opaque (white / ink) sections read as clean islands.
// Drives a single CSS variable (--dawn, 0→1) from scroll progress; all the
// colour work happens in CSS. Respects prefers-reduced-motion.
export default function ScrollSky() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.style.setProperty("--dawn", "0.55");
      return;
    }

    let raf = 0;
    function update() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--dawn", p.toFixed(3));
      raf = 0;
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="home-sky" ref={ref} aria-hidden="true" />;
}

"use client";

import { useEffect, useRef } from "react";

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export default function LandingSky({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--dusk", "0.42");
      el.style.setProperty("--night", "0.18");
      el.style.setProperty("--dawn", "0.46");
      return;
    }

    let raf = 0;
    let max = 1;

    function measure() {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }

    function update() {
      const p = clamp(window.scrollY / max);
      const dusk = clamp((p - 0.08) / 0.28);
      const night = clamp((p - 0.34) / 0.34) * (1 - clamp((p - 0.76) / 0.18) * 0.65);
      const dawn = clamp((p - 0.72) / 0.28);

      el.style.setProperty("--dusk", dusk.toFixed(3));
      el.style.setProperty("--night", night.toFixed(3));
      el.style.setProperty("--dawn", dawn.toFixed(3));
      raf = 0;
    }

    function requestUpdate() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    function onResize() {
      measure();
      requestUpdate();
    }

    measure();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={className} ref={ref} aria-hidden="true">
      <span />
    </div>
  );
}

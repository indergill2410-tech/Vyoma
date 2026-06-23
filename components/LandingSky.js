"use client";

import { useEffect, useRef } from "react";

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(start, end, value) {
  const x = clamp((value - start) / (end - start));
  return x * x * (3 - 2 * x);
}

export default function LandingSky({ className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--dusk", "0.34");
      el.style.setProperty("--night", "0.1");
      el.style.setProperty("--dawn", "0.34");
      return;
    }

    let raf = 0;
    let max = 1;
    let resizeObserver;

    function measure() {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    }

    function update() {
      const p = clamp(window.scrollY / max);
      const dusk = smoothstep(0.04, 0.48, p) * (1 - smoothstep(0.58, 0.98, p) * 0.28);
      const night = smoothstep(0.2, 0.7, p) * (1 - smoothstep(0.64, 1, p) * 0.78);
      const dawn = smoothstep(0.52, 1, p);

      el.style.setProperty("--dusk", (dusk * 0.72).toFixed(3));
      el.style.setProperty("--night", (night * 0.58).toFixed(3));
      el.style.setProperty("--dawn", (dawn * 0.68).toFixed(3));
      raf = 0;
    }

    function requestUpdate() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    function onMeasure() {
      measure();
      requestUpdate();
    }

    measure();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(onMeasure);
      resizeObserver.observe(document.documentElement);
    } else {
      window.addEventListener("resize", onMeasure);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", onMeasure);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={className} ref={ref} aria-hidden="true">
      <span />
    </div>
  );
}

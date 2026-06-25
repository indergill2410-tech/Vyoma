"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SKY_MOTES = [
  { x: "9%", y: "18%", size: "4px", rise: "14px", wobble: "8px", duration: "14s", delay: "-2s", alpha: 0.44 },
  { x: "22%", y: "64%", size: "3px", rise: "18px", wobble: "-10px", duration: "18s", delay: "-7s", alpha: 0.34 },
  { x: "36%", y: "28%", size: "5px", rise: "16px", wobble: "12px", duration: "16s", delay: "-4s", alpha: 0.42 },
  { x: "48%", y: "76%", size: "3px", rise: "20px", wobble: "-8px", duration: "19s", delay: "-10s", alpha: 0.3 },
  { x: "62%", y: "16%", size: "4px", rise: "13px", wobble: "10px", duration: "15s", delay: "-5s", alpha: 0.4 },
  { x: "74%", y: "52%", size: "3px", rise: "17px", wobble: "-12px", duration: "17s", delay: "-9s", alpha: 0.32 },
  { x: "84%", y: "26%", size: "5px", rise: "15px", wobble: "9px", duration: "20s", delay: "-12s", alpha: 0.36 },
  { x: "91%", y: "70%", size: "3px", rise: "22px", wobble: "-9px", duration: "21s", delay: "-6s", alpha: 0.28 },
];

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

function getMoteProfile(pathname) {
  return /^\/(cart|success|track)(\/|$)/.test(pathname) || /^\/product(\/|$)/.test(pathname)
    ? "quiet"
    : "alive";
}

export default function SkyAtmosphere() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    document.documentElement.dataset.skyMotes = getMoteProfile(pathname);
  }, [pathname]);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;
    const root = document.documentElement;
    if (reduce) {
      root.style.setProperty("--site-sky", "0.42");
      root.style.setProperty("--sky-pointer-x", "0px");
      root.style.setProperty("--sky-pointer-y", "0px");
      return;
    }

    const hasAnimationFrame =
      typeof window.requestAnimationFrame === "function" &&
      typeof window.cancelAnimationFrame === "function";
    const scheduleFrame = hasAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : (callback) => window.setTimeout(callback, 16);
    const cancelFrame = hasAnimationFrame
      ? window.cancelAnimationFrame.bind(window)
      : (id) => window.clearTimeout(id);

    let scrollRaf = 0;
    let pointerRaf = 0;
    let pointerX = 0;
    let pointerY = 0;

    function updateScroll() {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--site-sky", clamp(window.scrollY / max).toFixed(3));
      scrollRaf = 0;
    }

    function updatePointer() {
      root.style.setProperty("--sky-pointer-x", `${pointerX.toFixed(2)}px`);
      root.style.setProperty("--sky-pointer-y", `${pointerY.toFixed(2)}px`);
      pointerRaf = 0;
    }

    function requestScrollUpdate() {
      if (!scrollRaf) scrollRaf = scheduleFrame(updateScroll);
    }

    function requestPointerUpdate(event) {
      const halfWidth = Math.max(1, window.innerWidth / 2);
      const halfHeight = Math.max(1, window.innerHeight / 2);
      pointerX = ((event.clientX - halfWidth) / halfWidth) * 16;
      pointerY = ((event.clientY - halfHeight) / halfHeight) * 12;
      if (!pointerRaf) pointerRaf = scheduleFrame(updatePointer);
    }

    function resetPointer() {
      pointerX = 0;
      pointerY = 0;
      if (!pointerRaf) pointerRaf = scheduleFrame(updatePointer);
    }

    updateScroll();
    updatePointer();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate);
    window.addEventListener("pointermove", requestPointerUpdate, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);

    return () => {
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("pointermove", requestPointerUpdate);
      window.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
      if (scrollRaf) cancelFrame(scrollRaf);
      if (pointerRaf) cancelFrame(pointerRaf);
    };
  }, []);

  return (
    <>
      <div className="site-sky-atmosphere" aria-hidden="true">
        <div className="site-sky-motes">
          {SKY_MOTES.map((mote, index) => (
            <span
              className="site-sky-mote"
              key={`${mote.x}-${mote.y}-${index}`}
              style={{
                "--mote-x": mote.x,
                "--mote-y": mote.y,
                "--mote-size": mote.size,
                "--mote-rise": mote.rise,
                "--mote-wobble": mote.wobble,
                "--mote-duration": mote.duration,
                "--mote-delay": mote.delay,
                "--mote-alpha": mote.alpha,
              }}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        :root { --sky-pointer-x: 0px; --sky-pointer-y: 0px; }
        .site-sky-motes { position: absolute; inset: 0; z-index: 2; pointer-events: none; opacity: 0.58; mix-blend-mode: screen; }
        html[data-sky-motes="quiet"] .site-sky-motes { opacity: 0.22; }
        .site-sky-mote { position: absolute; left: var(--mote-x); top: var(--mote-y); width: var(--mote-size); aspect-ratio: 1; opacity: var(--mote-alpha); border-radius: 999px; background: radial-gradient(circle, rgba(255,238,187,.95) 0 18%, rgba(226,166,50,.74) 42%, rgba(226,166,50,0) 72%); box-shadow: 0 0 10px rgba(226,166,50,.46), 0 0 26px rgba(239,213,184,.16); transform: translate3d(var(--sky-pointer-x), var(--sky-pointer-y), 0) scale(.9); animation: vyomaMoteDrift var(--mote-duration) ease-in-out infinite; animation-delay: var(--mote-delay); will-change: transform, opacity; }
        .site-sky-mote:nth-child(3n) { background: radial-gradient(circle, rgba(255,244,214,.92) 0 16%, rgba(203,135,49,.62) 44%, rgba(203,135,49,0) 74%); }
        html[data-sky-motes="quiet"] .site-sky-mote:nth-child(n + 5) { display: none; }
        @keyframes vyomaMoteDrift { 0%, 100% { transform: translate3d(var(--sky-pointer-x), var(--sky-pointer-y), 0) scale(.82); } 46% { transform: translate3d(calc(var(--sky-pointer-x) + var(--mote-wobble)), calc(var(--sky-pointer-y) - var(--mote-rise)), 0) scale(1); } }
        @media (max-width: 720px), (pointer: coarse) { .site-sky-motes { opacity: .28; } .site-sky-mote:nth-child(n + 6) { display: none; } }
        @media (prefers-reduced-motion: reduce) { .site-sky-motes { opacity: .16; } .site-sky-mote { animation: none; transform: none; } }
      `}</style>
    </>
  );
}

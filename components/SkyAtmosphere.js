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
  );
}

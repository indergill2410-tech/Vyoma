"use client";

import { useEffect, useRef } from "react";

// A living night sky. Vyoma means sky / ether / infinite space — so the hero
// IS a sky: drifting stars, soft twinkle, the occasional shooting star.
// Respects prefers-reduced-motion (renders a still field of stars).
export default function SkyHero({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf;
    let stars = [];
    let shootings = [];
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((w * h) / 7000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * 0.02 + 0.004,
        ph: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
      }));
    }

    function spawnShooting() {
      if (reduce) return;
      const startX = Math.random() * w * 0.7;
      shootings.push({
        x: startX,
        y: Math.random() * h * 0.4,
        len: Math.random() * 80 + 60,
        speed: Math.random() * 4 + 5,
        life: 1,
      });
    }

    let t = 0;
    function frame() {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const tw = reduce ? s.a : s.a + Math.sin(t * s.tw * 60 + s.ph) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 239, 243, ${Math.max(0.05, tw)})`;
        ctx.fill();
        if (!reduce) {
          s.x += s.vx;
          if (s.x < -2) s.x = w + 2;
          if (s.x > w + 2) s.x = -2;
        }
      }

      // shooting stars
      for (const sh of shootings) {
        const grad = ctx.createLinearGradient(sh.x, sh.y, sh.x - sh.len, sh.y + sh.len * 0.4);
        grad.addColorStop(0, `rgba(217, 154, 43, ${sh.life})`);
        grad.addColorStop(1, "rgba(217, 154, 43, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.len, sh.y + sh.len * 0.4);
        ctx.stroke();
        sh.x += sh.speed;
        sh.y += sh.speed * 0.4;
        sh.life -= 0.012;
      }
      shootings = shootings.filter((s) => s.life > 0 && s.x < w + 100);

      t += 1;
      if (!reduce && Math.random() < 0.004) spawnShooting();
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="sky-hero">
      <canvas ref={canvasRef} className="sky-canvas" aria-hidden="true" />
      <div className="sky-content container">{children}</div>
      <div className="sky-horizon" aria-hidden="true" />
    </section>
  );
}

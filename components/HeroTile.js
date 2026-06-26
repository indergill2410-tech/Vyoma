"use client";

import { useEffect, useRef, useState } from "react";
import { COLOURWAYS, swatchStyle } from "@/lib/catalog";

const KEYS = Object.keys(COLOURWAYS);
// When this photo exists (e.g. after `npm run images` or via Shopify), the tile
// upgrades from the gamified swatch to the real shot automatically.
const HERO_PHOTO = "/products/vyoma-the-set/model.webp";
<<<<<<< Updated upstream
=======
const HERO_PHOTO_FALLBACK = "/products/vyoma-the-set/model.png";
>>>>>>> Stashed changes

// The gamified hero product tile: click a colourway and the sky cross-dissolves
// with a ✦ sparkle burst; the tile tilts in 3D to the pointer; a light sheen
// sweeps across. Doubles as the drop-in slot for real product photos later.
export default function HeroTile() {
  const [active, setActive] = useState(0);
  const [hasPhoto, setHasPhoto] = useState(false);
  const stageRef = useRef(null);
  const tileRef = useRef(null);
  const reduceRef = useRef(false);

  function sparkle() {
    const tile = tileRef.current;
    if (!tile || reduceRef.current) return;
    for (let i = 0; i < 7; i++) {
      const s = document.createElement("span");
      s.className = "ht-spark";
      s.textContent = "✦";
      const a = Math.random() * Math.PI * 2;
      s.style.left = 40 + Math.random() * 20 + "%";
      s.style.top = 45 + Math.random() * 10 + "%";
      s.style.setProperty("--dx", Math.cos(a) * 60 + "px");
      s.style.setProperty("--dy", Math.sin(a) * 60 + "px");
      tile.appendChild(s);
      setTimeout(() => s.remove(), 720);
    }
  }

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) return;
    const stage = stageRef.current;
    const tile = tileRef.current;
    if (!stage || !tile) return;

    function move(e) {
      const r = tile.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tile.style.transform = `rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`;
    }
    function leave() {
      tile.style.transform = "";
    }
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);

    // Auto-demo a couple of swatches so visitors notice it's interactive.
    let n = 1;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % KEYS.length);
      sparkle();
      if (++n > 2) clearInterval(t);
    }, 1700);

    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      clearInterval(t);
    };
  }, []);

  function pick(i) {
    if (i === active) return;
    setActive(i);
    sparkle();
  }

  const key = KEYS[active];
  const cw = COLOURWAYS[key];

  return (
    <div className="hero-tile-stage" ref={stageRef}>
      <div className={`hero-tile ${hasPhoto ? "has-photo" : ""}`} ref={tileRef}>
        <div className="hero-tile-bg" key={key} style={swatchStyle(key)} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="ht-photo"
          src={HERO_PHOTO}
          alt="The Vyoma Set, worn"
          onLoad={() => setHasPhoto(true)}
          onError={(event) => {
            if (event.currentTarget.src.endsWith("/model.webp")) {
              event.currentTarget.src = HERO_PHOTO_FALLBACK;
            } else {
              setHasPhoto(false);
            }
          }}
          loading="eager"
          fetchPriority="high"
        />
        <span className="ht-sheen" aria-hidden="true" />
        <span className="ht-stamp">व्योम Vyoma</span>
        <span className="ht-tag">New</span>
        <span className="ht-dev" style={{ color: cw.ink }} aria-hidden="true">व्योम</span>
        <span className="ht-chip"><b>Vyoma Pure</b> · {cw.name}</span>
        <div className="ht-dots" role="group" aria-label="Preview colourways">
          {KEYS.map((k, i) => (
            <button
              key={k}
              className={`ht-dot ${i === active ? "on" : ""}`}
              style={{ background: COLOURWAYS[k].base }}
              aria-label={COLOURWAYS[k].name}
              aria-pressed={i === active}
              onClick={() => pick(i)}
            />
          ))}
        </div>
        <span className="ht-hint">Tap a colour ✦</span>
      </div>
    </div>
  );
}

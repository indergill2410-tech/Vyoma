"use client";

import { useEffect, useRef, useState } from "react";
import { COLOURWAYS } from "@/lib/catalog";

// Scrollytelling: a sticky "scene" on one side changes as each step scrolls
// through the centre of the viewport. IntersectionObserver picks the active
// step; the scene cross-dissolves to that step's sky.
const STEPS = [
  { key: "you", word: "You", colour: "night-sky-indigo",
    h: "It begins with you.",
    b: "No order, no garment. Nothing is made until you choose it — so nothing is ever made in vain." },
  { key: "india", word: "India", colour: "marigold-dusk",
    h: "Crafted in India.",
    b: "In one of the world's great textile traditions, by hands that have shaped beautiful cloth for generations." },
  { key: "cut", word: "Cut", colour: "monsoon-grey",
    h: "Your fabric is cut.",
    b: "Measured and cut to your size — one piece, on purpose. The offcuts are kept and reused, never binned." },
  { key: "sewn", word: "Sewn", colour: "dawn-rose",
    h: "Sewn, stitch by stitch.",
    b: "Seamed, hemmed and finished by people paid fairly for skilled work. This is the slow part. It's worth it." },
  { key: "checked", word: "Checked", colour: "ether",
    h: "Checked by eye and hand.",
    b: "Every seam, every stitch, every waistband. If it isn't good enough to keep, it doesn't leave." },
  { key: "door", word: "Yours", colour: "night-sky-indigo",
    h: "Couriered to your door.",
    b: "From India to your mat — in Mumbai, in Melbourne, anywhere. Tracked the whole way, made with care." },
];

function sceneStyle(key) {
  const c = COLOURWAYS[key];
  return {
    background: `radial-gradient(120% 90% at 25% 20%, ${c.accent} 0%, transparent 60%), linear-gradient(150deg, ${c.base} 0%, ${c.weave} 70%, ${c.base} 100%)`,
    color: c.ink,
  };
}

export default function MakingJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.dataset.idx));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <div className="mk-grid">
      <div className="mk-sticky">
        <div className="mk-scene" key={step.key} style={sceneStyle(step.colour)}>
          <span className="mk-word">{step.word}</span>
          <span className="mk-count">{String(active + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}</span>
        </div>
      </div>

      <ol className="mk-steps">
        {STEPS.map((s, i) => (
          <li
            key={s.key}
            data-idx={i}
            ref={(el) => (refs.current[i] = el)}
            className={`mk-step ${active === i ? "on" : ""}`}
          >
            <span className="mk-num">{String(i + 1).padStart(2, "0")}</span>
            <h2>{s.h}</h2>
            <p>{s.b}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

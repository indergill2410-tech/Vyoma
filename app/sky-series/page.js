import Link from "next/link";
import { COLOURWAYS } from "@/lib/catalog";

export const metadata = {
  title: "The Sky Series",
  description:
    "Every Vyoma colour is a moment in the sky. A field guide to the palette — night, dawn, monsoon, marigold and ether.",
};

// One editorial scene per colourway. Soft, full-bleed gradients built from the
// colourway tokens — the palette as a field guide to the sky.
const SCENES = [
  {
    key: "night-sky-indigo",
    moment: "Nightfall",
    line: "When the studio goes quiet and the world goes dark.",
    body: "The deepest blue there is. For the last flow of the day, and the first stretch of stillness.",
  },
  {
    key: "dawn-rose",
    moment: "First light",
    line: "The first breath, before the first thought.",
    body: "Warm as the sun coming up over the mat. Soft, but it shows up.",
  },
  {
    key: "monsoon-grey",
    moment: "The hush",
    line: "The held breath before the rain.",
    body: "Cool, grounded, certain. The colour of a sky deciding what to do next.",
  },
  {
    key: "marigold-dusk",
    moment: "Gold hour",
    line: "Hold the pose a little longer.",
    body: "The marigold of an Indian evening — and of every flower strung in welcome.",
  },
  {
    key: "ether",
    moment: "Ether",
    line: "The space that holds everything.",
    body: "Akasha. The quietest, cleanest light — the one you reach for without thinking.",
  },
];

function sceneStyle(key) {
  const c = COLOURWAYS[key];
  return {
    background: `radial-gradient(120% 90% at 22% 18%, ${c.accent} 0%, transparent 60%), linear-gradient(150deg, ${c.base} 0%, ${c.weave} 70%, ${c.base} 100%)`,
    color: c.ink,
  };
}

export default function SkySeries() {
  return (
    <main className="lookbook">
      <section className="lb-intro">
        <span className="section-eyebrow">The Sky Series</span>
        <h1>Every colour is a moment in the sky.</h1>
        <p>
          We don't do seasons. We do skies. Five moments — from deepest night to
          first light — each one a colourway you can wear.
        </p>
      </section>

      {SCENES.map((s, i) => (
        <section
          className={`lb-scene ${i % 2 ? "right" : "left"}`}
          style={sceneStyle(s.key)}
          key={s.key}
        >
          <div className="lb-scene-inner" data-reveal>
            <span className="lb-moment">{s.moment}</span>
            <h2>{s.line}</h2>
            <p>{s.body}</p>
            <p className="lb-name">{COLOURWAYS[s.key].name}</p>
          </div>
        </section>
      ))}

      <section className="lb-outro">
        <h2>Find your sky.</h2>
        <div className="lb-outro-cta">
          <Link href="/#shop" className="btn">Explore the collection</Link>
          <Link href="/fit" className="btn ghost">Take the Fit Finder</Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import EditorialImage from "@/components/EditorialImage";
import { COLOURWAYS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "The Sky Series",
  description:
    "Every Vyoma colour is a moment in the sky: night, dawn, monsoon, copper and ether.",
  alternates: { canonical: abs("/sky-series") },
};

const SCENES = [
  {
    key: "night-sky-indigo",
    moment: "Nightfall",
    line: "The studio goes quiet. The body settles.",
    body: "A deep, steady blue for the last flow of the day and the first stretch of stillness.",
  },
  {
    key: "dawn-rose",
    moment: "First light",
    line: "The first breath before the first thought.",
    body: "Warm, soft and alive without needing to be loud.",
  },
  {
    key: "monsoon-grey",
    moment: "The hush",
    line: "The held breath before rain.",
    body: "Cool, grounded and easy to wear with everything else you own.",
  },
  {
    key: "marigold-dusk",
    moment: "Copper hour",
    line: "A little ceremony in the everyday.",
    body: "The warmth of an Indian evening, grounded into a copper tone you can move in.",
  },
  {
    key: "ether",
    moment: "Ether",
    line: "The space that holds everything.",
    body: "The quietest light in the palette: clean, soft and effortless.",
  },
];

function sceneStyle(key) {
  const colour = COLOURWAYS[key];
  return {
    background: `radial-gradient(120% 90% at 22% 18%, ${colour.accent} 0%, transparent 60%), linear-gradient(150deg, ${colour.base} 0%, ${colour.weave} 70%, ${colour.base} 100%)`,
    color: colour.ink,
    "--scene-image": "url('/editorial/sky-series-fabrics.svg')",
  };
}

export default function SkySeries() {
  return (
    <main className="commerce-page sky-redesign">
      <section className="commerce-hero sky-series-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">The Sky Series</p>
            <h1>Every colour is a moment in the sky.</h1>
            <p className="commerce-lead">
              Vyoma does not chase seasons. The palette moves from night to dawn, through rain,
              warmth and ether - colourways made to feel calm on the body.
            </p>
            <div className="commerce-actions">
              <Link href="/shop" className="btn accent">Shop the colours</Link>
              <Link href="/fit" className="btn ghost">Find your fit</Link>
            </div>
          </div>
          <EditorialImage
            name="skySeries"
            alt="Stacked Vyoma sky colour fabric swatches from night to dawn"
            className="sky-stack"
            priority
          />
        </div>
      </section>

      {SCENES.map((scene, index) => (
        <section
          className={`sky-shop-scene with-editorial-scene ${index % 2 ? "right" : "left"}`}
          style={sceneStyle(scene.key)}
          key={scene.key}
        >
          <div className="sky-shop-inner">
            <p>{scene.moment}</p>
            <h2>{scene.line}</h2>
            <span>{COLOURWAYS[scene.key].name}</span>
            <p>{scene.body}</p>
            <Link href="/shop" className="btn on-dark">Shop this colour</Link>
          </div>
        </section>
      ))}

      <section className="commerce-section sky-close-band">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Find your sky</p>
            <h2>The colour is the mood. The product is the promise.</h2>
          </div>
          <p>
            Choose by shade, then buy by fit, fabric and feel. Every product page carries the details
            that help turn a beautiful colour into the right piece.
          </p>
        </div>
      </section>
    </main>
  );
}

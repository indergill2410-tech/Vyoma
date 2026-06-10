import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog";
import SkyHero from "@/components/SkyHero";
import ScrollSky from "@/components/ScrollSky";
import Countdown from "@/components/Countdown";
import Waitlist from "@/components/Waitlist";
import ProductCard from "@/components/ProductCard";

const PILLARS = [
  {
    glyph: "॥",
    title: "Born where yoga was born",
    body: "Made in Tiruppur, the heart of India's knitwear. Yoga wear from the very place yoga began.",
  },
  {
    glyph: "✦",
    title: "Nothing to hide",
    body: "We only say what we can prove. Soft on skin, tested safe, and honest about every single thread.",
  },
  {
    glyph: "◯",
    title: "Made the day you order it",
    body: "Nothing mass-produced. Nothing sitting in a warehouse. Yours is cut and sewn just for you.",
  },
];

const QUOTES = [
  "The waistband actually stays put",
  "Squat-proof. Finally.",
  "It feels like it was made for me",
  "The drape on this top is unreal",
  "You can feel the quality",
  "I basically live in these now",
];

export default function Home() {
  const dropDate = process.env.NEXT_PUBLIC_DROP_DATE;
  const featured = PRODUCTS.filter((p) => p.hero).slice(0, 3);

  return (
    <main className="home">
      <ScrollSky />
      <SkyHero>
        <span className="sky-eyebrow">Made where yoga began</span>
        <h1>Room to breathe.</h1>
        <p className="sky-pron">Vyoma (vee-OH-ma) — Sanskrit for sky, ether, infinite space.</p>
        <p className="sky-lead">
          Yoga wear made for you, the day you order it. Never mass-produced,
          never wasted. From India — to India and Australia.
        </p>
        <div className="sky-cta">
          <Link href="/#shop" className="btn">Explore the collection</Link>
          <Link href="/about" className="btn light">Our story</Link>
        </div>
      </SkyHero>

      {/* Drop + waitlist */}
      <section className="drop" id="drop">
        <span className="drop-label">✦ The First Drop ✦</span>
        <h2>Small batch. The list hears first.</h2>
        <Countdown date={dropDate} />
        <Waitlist source="homepage" />
        <p className="muted small">Be first in line. No spam, ever. Leave whenever you like.</p>
        <Link href="/drops" className="link-btn" style={{ color: "var(--marigold)" }}>See the drops calendar →</Link>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Why Vyomawear</span>
            <h2>Three promises, kept.</h2>
            <p>Where it's made. What it's made of. And how. The things we will never cut a corner on.</p>
          </div>
          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title} data-reveal>
                <span className="glyph">{p.glyph}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>{QUOTES.join(" ")}</span>
          <span>{QUOTES.join(" ")}</span>
        </div>
      </div>

      {/* Shop */}
      <section className="section" id="shop">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">The Collection</span>
            <h2>Pieces, not product.</h2>
            <p>Made to be worn, not stored. Every piece has to earn its place in your week — or it doesn't make the cut.</p>
            <p style={{ marginTop: 14 }}>
              <Link href="/sky-series" className="link-btn">See the Sky Series →</Link>
            </p>
          </div>
          <div className="grid">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Origin split */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="split">
            <div className="split-media" data-reveal>
              <span className="dev">व्योम</span>
            </div>
            <div data-reveal>
              <span className="section-eyebrow">Where it comes from</span>
              <h2>From the home of yoga, to yours.</h2>
              <p>
                Everything we make is made in India — the birthplace of yoga, and one of
                the great textile nations on earth. Cut and sewn in Tiruppur by people
                who have done it, brilliantly, for generations.
              </p>
              <p>
                Whether you practise in Mumbai or Melbourne, it reaches you the same way:
                made on purpose, by hand, for you — and for no one else.
              </p>
              <span className="ecta">✦ Made in India · Worn in India &amp; Australia</span>
              <p style={{ marginTop: 18 }}>
                <Link href="/making" className="link-btn">Follow a piece from order to door →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing waitlist — left transparent so it sits in the warmest dawn */}
      <section className="section section-light">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Don't miss the drop</span>
            <h2>Room to grow.</h2>
            <p>The first drop is small, and made to order. The list always hears first.</p>
          </div>
          <Waitlist source="drop" />
        </div>
      </section>
    </main>
  );
}

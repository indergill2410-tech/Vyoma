import Link from "next/link";
import SkyHero from "@/components/SkyHero";
import ScrollSky from "@/components/ScrollSky";
import HeroTile from "@/components/HeroTile";
import Countdown from "@/components/Countdown";
import Waitlist from "@/components/Waitlist";
import WaitlistCount from "@/components/WaitlistCount";
import ShopGrid from "@/components/ShopGrid";

const PILLARS = [
  {
    glyph: "॥",
    title: "From the birthplace of yoga",
    body: "Made in India — the land that gave the world yoga. A lineage you can feel, and wear.",
  },
  {
    glyph: "✦",
    title: "A cleaner layer",
    body: "We begin with natural fibre, not plastic — gentler against the skin that notices everything.",
  },
  {
    glyph: "◯",
    title: "Honest by design",
    body: "We tell you exactly what's in the fabric, and only ever say what we can prove. You decide what you wear all day.",
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

  return (
    <main className="home">
      <ScrollSky />
      <SkyHero>
        <div className="sky-grid">
          <div className="sky-copy">
            <span className="sky-eyebrow">Made where yoga was born</span>
            <h1>Room to breathe.</h1>
            <p className="sky-pron">Vyoma (vee-OH-ma) — Sanskrit for sky.</p>
            <p className="sky-lead">
              Yoga wear grown from natural fibre — made in India, the birthplace of yoga.
              The cleaner layer, next to the skin that notices everything.
            </p>
            <div className="sky-cta">
              <Link href="/#shop" className="btn">Shop the collection</Link>
              <Link href="/fabric" className="btn light">The fabric story →</Link>
            </div>
          </div>
          <HeroTile />
        </div>
      </SkyHero>

      {/* Drop + waitlist */}
      <section className="drop" id="drop">
        <span className="drop-label">✦ The First Drop ✦</span>
        <h2>Small batch. The circle hears first.</h2>
        <Countdown date={dropDate} />
        <WaitlistCount />
        <Waitlist source="homepage" />
        <p className="muted small">Bring a friend, move up the line. No spam, ever. Leave whenever you like.</p>
        <Link href="/circle" className="link-btn" style={{ color: "var(--marigold)" }}>How The Circle works →</Link>
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
          <ShopGrid />
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
                the great textile traditions on earth, by hands that have practised the
                craft for generations.
              </p>
              <p>
                Whether you practise in Mumbai or Melbourne, it reaches you the same way:
                made with care, carried with pride.
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
            <p>The first drop is small and considered. Join the list to be the first to know.</p>
          </div>
          <Waitlist source="drop" />
        </div>
      </section>
    </main>
  );
}

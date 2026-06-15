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
    body: "Designed around yoga's origin, then made in India with the discipline of a modern performance house.",
  },
  {
    glyph: "✦",
    title: "Organic performance",
    body: "Plant-grown fibres, engineered for movement. No polyester, nylon, elastane or spandex against your skin.",
  },
  {
    glyph: "◯",
    title: "Proof before noise",
    body: "We publish the material standard, hold back unearned claims, and let the product do the convincing.",
  },
];

const HOUSE_STANDARDS = [
  ["01", "Organic-first", "Cotton performance knits and cotton-modal jerseys selected for breathability, handfeel and natural movement."],
  ["02", "Made in India", "Cut, sewn and checked close to the textile traditions that shaped the practice itself."],
  ["03", "Small-batch discipline", "Drops stay considered, traceable and limited enough to protect quality."],
  ["04", "Certified as issued", "GOTS and OEKO-TEX documents are published batch by batch as they arrive."],
];

const QUOTES = [
  "Organic cotton, made to move",
  "No polyester, nylon, elastane or spandex",
  "Made in India",
  "Small-batch first drop",
  "Certified batch by batch",
  "Built for practice, finished for life",
];

export default function Home() {
  const dropDate = process.env.NEXT_PUBLIC_DROP_DATE;

  return (
    <main className="home">
      <ScrollSky />
      <SkyHero>
        <div className="sky-grid">
          <div className="sky-copy">
            <span className="sky-eyebrow">Organic activewear · Made in India</span>
            <h1>Room to breathe. Built to move.</h1>
            <p className="sky-pron">Vyoma (vee-OH-ma) — Sanskrit for sky.</p>
            <p className="sky-lead">
              A cleaner performance layer for yoga and the hours around it. Organic
              natural fibres, sculpted activewear cuts, and no synthetic stretch against
              the skin that notices everything.
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
            <h2>A new standard for the layer closest to you.</h2>
            <p>Origin, material and proof. The things a serious activewear house should be clear about from day one.</p>
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

      {/* House standard */}
      <section className="house-standard" aria-labelledby="standard-title">
        <div className="container">
          <div className="standard-grid">
            <div className="standard-copy" data-reveal>
              <span className="section-eyebrow">The House Standard</span>
              <h2 id="standard-title">Not just softer. More considered.</h2>
              <p>
                Enduring brands are built on recognisable standards. Vyoma's is simple:
                activewear that feels alive on the body, made from organic natural fibre,
                with origin and certification treated as product facts, not marketing theatre.
              </p>
              <Link href="/fabric" className="link-btn">Read the material standard →</Link>
            </div>
            <div className="standard-list">
              {HOUSE_STANDARDS.map(([num, title, body]) => (
                <div className="standard-item" key={title} data-reveal>
                  <span>{num}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <h2>The first wardrobe of organic performance layers.</h2>
            <p>Fitted, sculpted and made to move — leggings, bras, layers and everyday basics that earn their place in your week.</p>
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
              <h2>From the home of yoga, finished for the world.</h2>
              <p>
                Everything we make is made in India — the birthplace of yoga, and one of
                the great textile traditions on earth. The ambition is global; the centre
                of gravity stays here.
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

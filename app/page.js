import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog";
import SkyHero from "@/components/SkyHero";
import Countdown from "@/components/Countdown";
import Waitlist from "@/components/Waitlist";
import ProductCard from "@/components/ProductCard";

const PILLARS = [
  {
    glyph: "॥",
    title: "Born where yoga was born",
    body: "Made to order in Tiruppur — India's knitwear capital. Yoga wear from the soil yoga grew in. A story no one else can credibly tell.",
  },
  {
    glyph: "✦",
    title: "Honest fabrics",
    body: "OEKO-TEX Standard 100 certified, GOTS-track organic fibres. We never make a claim a certificate can't back. Premium means proof.",
  },
  {
    glyph: "◯",
    title: "Made to order, never wasted",
    body: "Nothing mass-produced. Nothing sits in a warehouse. Nothing is landfilled. Your piece is cut and sewn the day you order it.",
  },
];

const QUOTES = [
  "The waistband actually stays put",
  "Squat-proof, finally",
  "It feels like it was made for me",
  "The drape on the top is unreal",
  "You can feel the quality",
  "Made in India and it shows — in the best way",
];

export default function Home() {
  const dropDate = process.env.NEXT_PUBLIC_DROP_DATE;
  const featured = PRODUCTS.filter((p) => p.hero).slice(0, 3);

  return (
    <main>
      <SkyHero>
        <span className="sky-eyebrow">Premium yoga wear · Made in India</span>
        <h1>Room to breathe.</h1>
        <p className="sky-pron">Vyoma (vee-OH-ma) — Sanskrit for sky, ether, infinite space.</p>
        <p className="sky-lead">
          Made-to-order yoga wear from the birthplace of yoga. Nothing mass-produced.
          Nothing wasted. Shipping to India &amp; Australia.
        </p>
        <div className="sky-cta">
          <Link href="/#shop" className="btn">Explore the collection</Link>
          <Link href="/about" className="btn light">Our story</Link>
        </div>
      </SkyHero>

      {/* Drop + waitlist */}
      <section className="drop" id="drop">
        <span className="drop-label">✦ The First Drop ✦</span>
        <h2>A limited first run. Announced to the list first.</h2>
        <Countdown date={dropDate} />
        <Waitlist source="homepage" />
        <p className="muted small">Join the waitlist — early access, no spam, leave any time.</p>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Why Vyomawear</span>
            <h2>Three promises, kept.</h2>
            <p>Authenticity of origin, honest materials, and a model that wastes nothing — the three things competitors sourcing from anywhere else can't copy.</p>
          </div>
          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title}>
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
          <div className="section-head">
            <span className="section-eyebrow">The Collection</span>
            <h2>Pieces, not product.</h2>
            <p>One hero, earned. Every piece passes the squat test, the drape test, and the "would we wear it every day?" test.</p>
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
            <div className="split-media">
              <span className="dev">व्योम</span>
            </div>
            <div>
              <span className="section-eyebrow">The unfair advantage</span>
              <h2>One supply base. Two markets. Zero tariff drag.</h2>
              <p>
                We make everything in India — the birthplace of yoga and one of the
                world's great textile nations. For our Australian community, the
                India–Australia ECTA trade agreement means most Indian apparel arrives
                at <strong>0% duty</strong>. A structural cost edge competitors sourcing
                from elsewhere simply don't have.
              </p>
              <p>
                For India, it's simply home — made down the road, in Tiruppur, by people
                paid fairly to make something worth keeping.
              </p>
              <span className="ecta">✦ 0% duty to Australia under India–Australia ECTA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing waitlist */}
      <section className="section section-light" style={{ background: "var(--horizon)" }}>
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Don't miss the drop</span>
            <h2>Room to grow.</h2>
            <p>The first run is limited and made to order. The list hears first.</p>
          </div>
          <Waitlist source="drop" />
        </div>
      </section>
    </main>
  );
}

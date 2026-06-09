import Link from "next/link";
import Waitlist from "@/components/Waitlist";

export const metadata = {
  title: "Our story",
  description:
    "Vyoma means sky. Yoga wear made in India — the birthplace of yoga — to order, never wasted.",
};

export default function About() {
  return (
    <main>
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">Our story</span>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(34px,6vw,56px)", lineHeight: 1.1, margin: "12px 0 18px" }}>
            Vyoma means sky.
          </h1>
          <p style={{ fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--dusk)", fontSize: 19 }}>
            व्योम · vee-OH-ma · Sanskrit for sky, ether, the infinite space that holds everything.
          </p>
          <p className="muted" style={{ marginTop: 22, fontSize: 17 }}>
            Yoga was born in India. So is everything we make. That isn't a marketing
            line we borrowed — it's where our hands actually are. We cut and sew in
            Tiruppur, Tamil Nadu, India's knitwear capital, working with factories
            that hold OEKO-TEX certification and pay fairly.
          </p>
          <p className="muted" style={{ marginTop: 16, fontSize: 17 }}>
            We don't mass-produce. Every piece is made to order — cut the day you buy
            it. Nothing sits in a warehouse marked down. Nothing ends in landfill. It
            takes a few days longer, and we think that's a fair trade for clothing made
            on purpose, for one person: you.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff", paddingTop: 50 }}>
        <div className="container">
          <div className="pillars">
            <div className="pillar">
              <span className="glyph">॥</span>
              <h3>Made in India</h3>
              <p>Tiruppur, Tamil Nadu. Knitwear made by people who've made it for generations, in yoga's homeland.</p>
            </div>
            <div className="pillar">
              <span className="glyph">✦</span>
              <h3>Certified, not claimed</h3>
              <p>OEKO-TEX Standard 100 and GOTS-track organic fibres. We only say what the certificate can prove.</p>
            </div>
            <div className="pillar">
              <span className="glyph">◯</span>
              <h3>Zero overproduction</h3>
              <p>Made to order. No deadstock, no markdown bins, no waste. Premium and responsible aren't a trade-off.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">The honest part</span>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(26px,4vw,38px)", margin: "12px 0 16px" }}>
            We protect full price. We don't discount the brand.
          </h2>
          <p className="muted" style={{ fontSize: 17 }}>
            You won't find a 40%-off banner here. Made-to-order, fairly-paid, certified
            clothing costs what it costs. Instead of sales, we do limited drops and a
            waitlist — the people on the list hear first. It keeps the brand honest and
            the wardrobe small and good.
          </p>
          <div style={{ marginTop: 30 }}>
            <Waitlist source="about" />
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href="/#shop" className="btn">See the collection</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

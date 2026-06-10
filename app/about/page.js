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
            Yoga was born in India. So is everything we make. That's not a line we
            borrowed — it's where our hands actually are, alongside artisans who have
            shaped beautiful cloth for generations.
          </p>
          <p className="muted" style={{ marginTop: 16, fontSize: 17 }}>
            We make with care, not in haste — each piece considered, never mass-produced.
            We think that's a fair trade for something made to be loved, and to last.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff", paddingTop: 50 }}>
        <div className="container">
          <div className="pillars">
            <div className="pillar">
              <span className="glyph">॥</span>
              <h3>Made in India</h3>
              <p>Crafted in yoga's homeland by artisans who have practised the craft for generations.</p>
            </div>
            <div className="pillar">
              <span className="glyph">✦</span>
              <h3>Nothing to hide</h3>
              <p>Soft on skin, tested safe, honest about every thread. We only ever say what we can prove.</p>
            </div>
            <div className="pillar">
              <span className="glyph">◯</span>
              <h3>Made to last</h3>
              <p>Considered, never mass-produced. Beautiful and responsible aren't a trade-off.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">Our name</span>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(26px,4vw,38px)", margin: "12px 0 16px" }}>
            व्योम — the sky that holds everything.
          </h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Vyoma is Sanskrit for sky, ether, infinite space — the room to breathe that
            a practice gives you. We carry that name with pride: made in India, rooted in
            the tradition that gave the world yoga, and built to move with you for years.
          </p>

          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(24px,4vw,34px)", margin: "40px 0 16px" }}>
            Not made of plastic.
          </h2>
          <p className="muted" style={{ fontSize: 17 }}>
            Most activewear is plastic — polyester, nylon and elastane. We build the other
            way: natural fibre first, nothing synthetic against your skin unless it has to
            be there. The layer closest to you should be the cleanest — which is why we made{" "}
            Vyoma Pure (available for <Link href="/product/vyoma-pure-brief-women" style={{ textDecoration: "underline" }}>women</Link> and <Link href="/product/vyoma-pure-trunk-men" style={{ textDecoration: "underline" }}>men</Link>),
            our natural-cotton everyday basics.
          </p>
          <p className="muted" style={{ fontSize: 15, marginTop: 16, fontStyle: "italic" }}>
            We don&apos;t make medical claims. No item of clothing treats, cures or
            prevents any condition. What we can tell you is exactly what our fabric is
            made of — and let you decide what you want against your skin all day.
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

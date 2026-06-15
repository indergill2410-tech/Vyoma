import Link from "next/link";
import Waitlist from "@/components/Waitlist";

export const metadata = {
  title: "Our story",
  description:
    "Vyoma means sky. Yoga wear made in India — the birthplace of yoga — to order, never wasted.",
};

export default function About() {
  return (
    <main className="article-page">
      <section className="section" style={{ paddingBottom: 36 }}>
        <div className="container prose article">
          <span className="section-eyebrow">Our story</span>
          <h1 className="article-h1">Vyoma means sky.</h1>
          <p className="pron">
            व्योम · vee-OH-ma · Sanskrit for sky, ether, the infinite space that holds everything.
          </p>
          <p style={{ marginTop: 22 }}>
            Yoga was born in India. So is everything we make. That&apos;s not a line we
            borrowed — it&apos;s where our hands actually are, alongside artisans who have
            shaped beautiful cloth for generations.
          </p>
          <p>
            We make with care, not in haste — each piece considered, never mass-produced.
            A fair trade, we think, for something made to be loved, and to last.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="pillars">
            <div className="pillar" data-reveal>
              <span className="glyph">॥</span>
              <h3>From the birthplace of yoga</h3>
              <p>Crafted in yoga&apos;s homeland by artisans who have practised the craft for generations.</p>
            </div>
            <div className="pillar" data-reveal>
              <span className="glyph">✦</span>
              <h3>A cleaner layer</h3>
              <p>Natural fibre first, not plastic. We tell you exactly what&apos;s in the fabric — and only ever say what we can prove.</p>
            </div>
            <div className="pillar" data-reveal>
              <span className="glyph">◯</span>
              <h3>Made to last</h3>
              <p>Considered, never mass-produced. Beautiful and responsible were never a trade-off.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose article">
          <span className="section-eyebrow">Our name</span>
          <h2>व्योम — the sky that holds everything.</h2>
          <p>
            Vyoma is Sanskrit for sky, ether, infinite space — the room to breathe that
            a practice gives you. We carry that name with pride: made in India, rooted in
            the tradition that gave the world yoga, and built to move with you for years.
          </p>

          <h2>A cleaner layer.</h2>
          <p>
            Most activewear is plastic — polyester, nylon, elastane and spandex. We begin
            the other way: organic natural fibre, engineered to move without synthetic
            stretch against your skin. The layer closest to you should be the cleanest — which is why we made{" "}
            Vyoma Pure (for <Link href="/product/vyoma-pure-brief-women">women</Link> and{" "}
            <Link href="/product/vyoma-pure-trunk-men">men</Link>), our organic-cotton everyday basics.
          </p>
          <p className="cite-note">
            We don&apos;t make medical claims. No item of clothing treats, cures or prevents
            any condition. What we can tell you is exactly what our fabric is made of — and
            let you decide what you want against your skin all day.
          </p>

          <div className="btn-row">
            <Waitlist source="about" />
          </div>
          <p style={{ marginTop: 28 }}>
            <Link href="/#shop" className="btn">Shop the collection</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

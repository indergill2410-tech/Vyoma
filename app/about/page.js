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
            borrowed — it's where our hands actually are. We cut and sew in Tiruppur,
            Tamil Nadu, alongside people who are paid fairly and have made beautiful
            things for generations.
          </p>
          <p className="muted" style={{ marginTop: 16, fontSize: 17 }}>
            We don't mass-produce. Every piece is made the day you order it. Nothing
            sits in a warehouse. Nothing ends in a landfill. It takes a few days
            longer — and we think that's a fair trade for something made on purpose,
            for one person: you.
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
              <h3>Nothing to hide</h3>
              <p>Soft on skin, tested safe, honest about every thread. We only ever say what we can prove.</p>
            </div>
            <div className="pillar">
              <span className="glyph">◯</span>
              <h3>Made, not stockpiled</h3>
              <p>Made the day you order it. No waste, no warehouses. Beautiful and responsible aren't a trade-off.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">The honest part</span>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(26px,4vw,38px)", margin: "12px 0 16px" }}>
            No sales. No markdown bins. Ever.
          </h2>
          <p className="muted" style={{ fontSize: 17 }}>
            You won't find a 40%-off banner here. Made-to-order, fairly-made clothing
            costs what it costs — and we'd rather be honest about it than dress it up
            with a fake discount. Instead, we make small drops. The people on the list
            always hear first.
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

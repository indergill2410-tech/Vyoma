import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Vyoma Pure — Natural-cotton underwear",
  description:
    "Natural-cotton underwear for women and men, made in India. The layer closest to you, made clean — no plastic against your most sensitive skin.",
};

export default function PurePage() {
  const pure = PRODUCTS.filter((p) => p.category === "Vyoma Pure");
  const women = pure.filter((p) => /women/i.test(p.name));
  const men = pure.filter((p) => /men/i.test(p.name));

  return (
    <main className="article-page">
      <section className="section" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <span className="section-eyebrow">Vyoma Pure</span>
          <h1 className="article-h1">
            The layer closest to you<br />should be the cleanest.
          </h1>
          <p className="lede" style={{ margin: "0 auto" }}>
            Natural-cotton underwear for women and men — grown in soil, not synthesized
            from oil. Made in India. No plastic against your most sensitive skin.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container article" style={{ maxWidth: 760 }}>
          <p>
            Most underwear is polyester, nylon and elastane — plastics — finished with
            chemicals to make them stretchy. Independent lab testing has found BPA in
            synthetic activewear at many times the limit California considers safe, and
            skin contact is a real exposure route. Underwear is the definition of warm,
            damp and high-friction — worn over the most sensitive areas, many hours a day.
          </p>
          <p>
            <strong>
              We&apos;re not making a medical claim, and we never will. We&apos;re making a
              simpler point: reducing avoidable, everyday exposure is a reasonable thing
              to want — and it starts with the layer that touches you first.
            </strong>
          </p>
          <p className="cite-note">
            See the full research on the{" "}
            <Link href="/fabric" className="link-btn">Fabric page →</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="io-grid">
            <div className="io-col io-in">
              <h3>What&apos;s in</h3>
              <ul>
                <li>Natural cotton body — soft and breathable</li>
                <li>An organic + OEKO-TEX standard, certified batch by batch as issued</li>
                <li>The smallest possible stretch, only in the waistband</li>
                <li>Made in India</li>
              </ul>
            </div>
            <div className="io-col io-out">
              <h3>Designed without</h3>
              <ul>
                <li>BPA and other bisphenols</li>
                <li>Phthalates</li>
                <li>PFAS &ldquo;forever chemicals&rdquo;</li>
                <li>Formaldehyde finishes</li>
                <li>Polyester or nylon against the skin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="women" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Vyoma Pure · Women</span>
            <h2>Soft on the skin that notices everything.</h2>
          </div>
          <div className="grid">
            {women.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" id="men">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Vyoma Pure · Men</span>
            <h2>All-day comfort. Nothing synthetic where it counts.</h2>
          </div>
          <div className="grid">
            {men.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section section-light" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 620 }}>
          <h2 style={{ fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(28px,4.4vw,40px)" }}>
            Made clean.
          </h2>
          <p className="muted" style={{ margin: "10px auto 0" }}>
            The everyday layer, the way it should be.
          </p>
          <p style={{ marginTop: 22 }}>
            <Link href="/fabric" className="btn ghost">Why it matters →</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

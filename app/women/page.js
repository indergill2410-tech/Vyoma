import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { productShots, womenCatalogueProducts } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Women's Lifestyle Activewear",
  description:
    "Women's Vyomawear lifestyle activewear for practice, warm days, soft support and closest-to-skin organic layers.",
  alternates: { canonical: abs("/women") },
};

const WOMEN_PROMISES = [
  {
    title: "Practice first",
    body: "Leggings, shorts, skort and soft tops are built around movement before anything else.",
  },
  {
    title: "Organic close layers",
    body: "Pure briefs, cami and breathable cotton-rich pieces sit softly against skin through the whole day.",
  },
  {
    title: "Copper warmth",
    body: "The palette keeps the collection warm, natural and lifestyle-ready without drifting into streetwear.",
  },
];

const WOMEN_PLAN = [
  {
    mark: "01",
    name: "Start close",
    body: "Begin with Pure when you want the cleanest base layer under the rest of the kit.",
  },
  {
    mark: "02",
    name: "Hold the practice",
    body: "Choose leggings, shorts or the skort for the level of coverage your session needs.",
  },
  {
    mark: "03",
    name: "Support softly",
    body: "Add the bra, studio top or rib tank so the top layer moves without digging in.",
  },
  {
    mark: "04",
    name: "Leave it on",
    body: "Finish with the set or wrap so the outfit still feels right after practice.",
  },
];

const WOMEN_SECTIONS = [
  {
    categories: ["Bottoms", "Sets"],
    eyebrow: "Practice foundation",
    title: "Leggings, shorts, skort and the full set.",
    body: "The core women catalogue lives here: sculpted hold, warm weather coverage and the complete practice uniform.",
  },
  {
    categories: ["Tops", "Bras"],
    eyebrow: "Tops + support",
    title: "Soft layers for the studio and the hours after.",
    body: "Rib, open-back jersey and cotton-rich support pieces keep the women edit breathable and easy to layer.",
  },
  {
    categories: ["Vyoma Pure", "Layers"],
    eyebrow: "Pure + recovery",
    title: "Closest-to-skin basics and the softer finish.",
    body: "Pure underwear, the everyday cami and the Akasha wrap complete the full-day activewear wardrobe.",
  },
];

const HERO_SLUGS = [
  "vyoma-high-rise-legging",
  "vyoma-the-set",
  "vyoma-studio-top",
];

function sectionId(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function WomenPage() {
  const products = womenCatalogueProducts();
  const heroProducts = HERO_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean);

  return (
    <main className="commerce-page women-page">
      <section className="commerce-hero women-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Vyoma Women</p>
            <h1>Women&apos;s activewear for practice, warm days and softer daily layers.</h1>
            <p className="commerce-lead">
              The existing women catalogue now has its own home: leggings, shorts,
              studio tops, bras, Pure basics, the set and the wrap, all kept in the
              natural-fibre activewear lane.
            </p>
            <div className="commerce-actions">
              <Link href="#women-catalog" className="btn accent">Shop women</Link>
              <Link href="/pure" className="btn ghost">Start with Pure</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Women's shopping promises">
              <span>Practice to life</span>
              <span>Organic close layers</span>
              <span>Secure checkout</span>
            </div>
          </div>
          <figure className="women-story-visual" aria-label="Women's Vyoma catalogue highlights">
            {heroProducts.map((product, index) => {
              const shot = productShots(product)[0];
              return (
                <Link
                  href={`/product/${product.slug}`}
                  className={`women-hero-card card-${index + 1}`}
                  key={product.slug}
                >
                  <ProductImage
                    src={shot.src}
                    fallbackSrc={shot.fallbackSrc}
                    alt={shot.alt}
                    colour={product.colourways[0]}
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : undefined}
                    mark
                  />
                  <span className="women-hero-label">
                    <strong>{product.name.replace("The ", "")}</strong>
                    <small>{product.category}</small>
                  </span>
                </Link>
              );
            })}
          </figure>
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {WOMEN_PROMISES.map((promise) => (
              <article className="commerce-card" key={promise.title}>
                <h3>{promise.title}</h3>
                <p>{promise.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section women-plan-section" aria-labelledby="women-plan-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">The women section plan</p>
            <h2 id="women-plan-heading">Build from the base layer out.</h2>
            <p>
              This page separates the women catalogue from the full shop so each piece
              has a clearer role in the wardrobe.
            </p>
          </div>
          <div className="women-plan-grid">
            {WOMEN_PLAN.map((item) => (
              <article className="women-plan-card" key={item.name}>
                <span className="women-plan-mark">{item.mark}</span>
                <h3>{item.name}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="women-catalog" className="commerce-section" aria-labelledby="women-catalog-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head split">
            <div>
              <p className="commerce-eyebrow">Women&apos;s catalogue</p>
              <h2 id="women-catalog-heading">The existing women pieces, now in one place.</h2>
            </div>
            <Link href="/fit" className="link-btn">Need size help?</Link>
          </div>
          {WOMEN_SECTIONS.map((section) => {
            const groupProducts = products.filter((product) => section.categories.includes(product.category));
            if (!groupProducts.length) return null;

            const id = sectionId(section.eyebrow);
            return (
              <section
                className="commerce-subsection"
                id={id}
                aria-labelledby={`${id}-heading`}
                key={section.eyebrow}
              >
                <div className="commerce-section-head compact">
                  <p className="commerce-eyebrow">{section.eyebrow}</p>
                  <h3 id={`${id}-heading`}>{section.title}</h3>
                  <p>{section.body}</p>
                </div>
                <div className="grid">
                  {groupProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="commerce-section section-light" aria-labelledby="women-pure-heading">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Women + Pure</p>
            <h2 id="women-pure-heading">The soft base layer belongs in the same wardrobe.</h2>
          </div>
          <p>
            Women&apos;s activewear should not stop at leggings and tops. Pure basics
            sit closest to skin, then the practice pieces and wrap complete the day.
          </p>
        </div>
      </section>
    </main>
  );
}

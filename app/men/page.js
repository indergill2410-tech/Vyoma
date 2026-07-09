import Link from "next/link";
import { mensCatalogueProducts } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Men's Lifestyle Activewear",
  description:
    "Men's Vyomawear lifestyle activewear for training, travel, recovery and weekends: base layers, tees, joggers, hoodies, socks and carry pieces.",
  alternates: { canonical: abs("/men") },
};

const MENS_PROMISES = [
  {
    title: "Gym to street",
    body: "Training tee, tapered jogger, recovery fleece and the bag that moves from workout to weekend.",
  },
  {
    title: "Colour with pace",
    body: "Teal, cobalt, saffron, graphite and clean white give the men's edit its own energy.",
  },
  {
    title: "Base layer up",
    body: "Start with the trunk, then build the full-day kit for training, travel and after-hours.",
  },
];

const MEN_COLOUR_STORY = [
  {
    name: "Training teal",
    tone: "#0f6c78",
    body: "The active top colour: sharp, wearable and made to stand out against concrete and gym steel.",
  },
  {
    name: "Cobalt hit",
    tone: "#0057b8",
    body: "The men's blue: brighter than navy, cleaner than black, built for outer layers and accents.",
  },
  {
    name: "Saffron carry",
    tone: "#c98a22",
    body: "A warm utility pop on bags, stripes and details so the kit feels alive, not flat.",
  },
  {
    name: "Graphite base",
    tone: "#30333a",
    body: "The grounding neutral for joggers, trunks and recovery pieces.",
  },
];

const MEN_SECTIONS = [
  {
    group: "Base Layer",
    eyebrow: "Base layer",
    title: "Start close.",
    body: "The trunk is the first layer of the day: soft, breathable and built to disappear under everything.",
  },
  {
    group: "Training + Transit",
    eyebrow: "Training + transit",
    title: "Work out, then keep moving.",
    body: "The tee and jogger carry the same line from gym floor to airport lounge to coffee run.",
  },
  {
    group: "Recovery",
    eyebrow: "Recovery",
    title: "Layer for after.",
    body: "Heavy fleece with a clean street profile for cool-downs, late starts and weekend plans.",
  },
  {
    group: "Carry + Socks",
    eyebrow: "Carry + socks",
    title: "Make it a kit.",
    body: "A saffron carry and crisp crew socks give the men's line its lifestyle signature.",
  },
];

function sectionId(group) {
  return group.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MenPage() {
  const products = mensCatalogueProducts();

  return (
    <main className="commerce-page mens-page">
      <section className="commerce-hero mens-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Vyoma Men</p>
            <h1>Lifestyle activewear for training, travel and everything after.</h1>
            <p className="commerce-lead">
              A men&apos;s edit with its own colour story: teal training layers, cobalt recovery fleece,
              graphite bases and saffron carry pieces built for the full day.
            </p>
            <div className="commerce-actions">
              <Link href="#mens-catalog" className="btn accent">Shop men</Link>
              <Link href="/product/vyoma-pure-trunk-men" className="btn ghost">Start with Pure</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Men's shopping promises">
              <span>Gym to street</span>
              <span>Alive colour</span>
              <span>Secure checkout</span>
            </div>
          </div>
          <figure className="mens-story-visual" data-photo-board="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/editorial/mens-catalogue-hero.png"
              alt="Vyoma men's lifestyle activewear model leaving a boutique gym with teal, cobalt and saffron kit"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      <section className="commerce-section commerce-section-tight">
        <div className="commerce-shell">
          <div className="commerce-card-grid three">
            {MENS_PROMISES.map((promise) => (
              <article className="commerce-card" key={promise.title}>
                <h3>{promise.title}</h3>
                <p>{promise.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commerce-section mens-colour-section" aria-labelledby="mens-colour-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Colour story</p>
            <h2 id="mens-colour-heading">Not another navy-only men&apos;s rack.</h2>
            <p>
              The women&apos;s line can stay softer and studio-led. Men gets a more electric rhythm:
              gym colour, city neutrals and one warm utility hit.
            </p>
          </div>
          <div className="mens-colour-grid">
            {MEN_COLOUR_STORY.map((colour) => (
              <article className="mens-colour-card" key={colour.name}>
                <span className="mens-colour-swatch" style={{ background: colour.tone }} />
                <h3>{colour.name}</h3>
                <p>{colour.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mens-catalog" className="commerce-section" aria-labelledby="mens-catalog-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head split">
            <div>
              <p className="commerce-eyebrow">Men&apos;s lifestyle kit</p>
              <h2 id="mens-catalog-heading">Build the day in layers.</h2>
            </div>
            <Link href="/fit" className="link-btn">Need size help?</Link>
          </div>
          {MEN_SECTIONS.map((section) => {
            const groupProducts = products.filter((product) => product.mensGroup === section.group);
            if (!groupProducts.length) return null;

            return (
              <section
                className="commerce-subsection"
                id={sectionId(section.group)}
                aria-labelledby={`${sectionId(section.group)}-heading`}
                key={section.group}
              >
                <div className="commerce-section-head compact">
                  <p className="commerce-eyebrow">{section.eyebrow}</p>
                  <h3 id={`${sectionId(section.group)}-heading`}>{section.title}</h3>
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

      <section className="commerce-section section-light" aria-labelledby="mens-pure-heading">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Pure for men</p>
            <h2 id="mens-pure-heading">The base layer under the whole kit.</h2>
          </div>
          <p>
            Start with breathable trunks, then pull on the tee, jogger, hoodie and carry pieces that
            move through training, travel and the rest of your day.
          </p>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
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
    title: "Training to life",
    body: "Training tee, tapered jogger, recovery fleece and the bag that moves from workout to weekend.",
  },
  {
    title: "Warm utility",
    body: "Warm neutrals and copper depth keep the men's edit strong without turning loud.",
  },
  {
    title: "Base layer up",
    body: "Start with the trunk, then build the full-day kit for training, travel and after-hours.",
  },
];

const MEN_DAY_MOMENTS = [
  {
    mark: "01",
    name: "Start close",
    body: "Begin with the trunk: the first layer that makes the rest of the kit feel easier.",
  },
  {
    mark: "02",
    name: "Train",
    body: "Add the tee and jogger for movement that still looks clean when the session ends.",
  },
  {
    mark: "03",
    name: "Keep moving",
    body: "Carry the same line through coffee, errands, travel and whatever happens after.",
  },
  {
    mark: "04",
    name: "Recover",
    body: "Finish with soft fleece and socks for the quieter part of the day.",
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
    body: "Heavy fleece with a clean lifestyle profile for cool-downs, late starts and weekend plans.",
  },
  {
    group: "Carry + Socks",
    eyebrow: "Carry + socks",
    title: "Make it a kit.",
    body: "A warm carry piece and crisp crew socks give the men's line its lifestyle signature.",
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
            <h1>Men&apos;s activewear for training, travel and the hours after.</h1>
            <p className="commerce-lead">
              A restrained men&apos;s edit in warm neutrals and copper depth:
              base layers, training pieces, recovery fleece and carry pieces built for the full day.
            </p>
            <div className="commerce-actions">
              <Link href="#mens-catalog" className="btn accent">Shop men</Link>
              <Link href="/product/vyoma-pure-trunk-men" className="btn ghost">Start with Pure</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Men's shopping promises">
              <span>Training to life</span>
              <span>Warm utility</span>
              <span>Secure checkout</span>
            </div>
          </div>
          <figure className="mens-story-visual" data-photo-board="true">
            <Image
              src="/editorial/mens-catalogue-hero.webp"
              alt="Vyoma men's lifestyle activewear in warm copper studio light"
              fill
              priority
              sizes="(min-width: 920px) 46vw, 100vw"
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

      <section className="commerce-section mens-colour-section" aria-labelledby="mens-moments-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">The day sequence</p>
            <h2 id="mens-moments-heading">Train in it. Travel in it. Keep it on.</h2>
            <p>
              The men&apos;s edit is built from the closest layer outward, so the kit feels
              clean on skin, sharp in public and useful after the workout.
            </p>
          </div>
          <div className="mens-colour-grid">
            {MEN_DAY_MOMENTS.map((moment) => (
              <article className="mens-colour-card mens-moment-card" key={moment.name}>
                <span className="mens-colour-swatch mens-moment-mark">{moment.mark}</span>
                <h3>{moment.name}</h3>
                <p>{moment.body}</p>
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

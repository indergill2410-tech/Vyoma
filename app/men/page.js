import Link from "next/link";
import { productsForAudience } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import EditorialImage from "@/components/EditorialImage";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Men's Vyomawear",
  description:
    "Shop men's Vyomawear: cotton-rich gym tees, tanks, training shorts, joggers, hoodies and Pure underwear.",
  alternates: { canonical: abs("/men") },
};

const CATEGORY_LINKS = [
  { label: "Gym edit", href: "#gym-edit", body: "Cotton-rich training pieces with atelier polish." },
  { label: "Tops", href: "#tops", body: "Tees and tanks that solve heat, cling and rough seams." },
  { label: "Bottoms", href: "#bottoms", body: "Training shorts, track pants and clean joggers." },
  { label: "Layers", href: "#layers", body: "Warmup fleece and recovery layers for the full day." },
  { label: "Pure", href: "#pure", body: "Closest-to-skin comfort made clean." },
];

const MEN_GYM_SLUGS = [
  "vyoma-mens-cotton-training-tee",
  "vyoma-mens-lift-muscle-tank",
  "vyoma-mens-heavy-pump-tee",
  "vyoma-mens-7-inch-training-short",
  "vyoma-mens-cotton-flex-track-pant",
  "vyoma-mens-studio-performance-jogger",
  "vyoma-mens-warmup-zip-hoodie",
  "vyoma-mens-recovery-crew-sweatshirt",
];

const FEATURED_SLUGS = [
  "vyoma-mens-cotton-training-tee",
  "vyoma-mens-7-inch-training-short",
  "vyoma-mens-warmup-zip-hoodie",
];

function orderBySlugs(products, slugs) {
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const ordered = slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  const rest = products.filter((product) => !slugs.includes(product.slug));
  return [...ordered, ...rest];
}

export default function MenPage() {
  const products = productsForAudience("men");
  const gymEdit = orderBySlugs(
    products.filter((product) => MEN_GYM_SLUGS.includes(product.slug)),
    MEN_GYM_SLUGS
  );
  const pure = products.filter((product) => product.category === "Vyoma Pure");
  const tops = orderBySlugs(products.filter((product) => product.category === "Tops"), MEN_GYM_SLUGS);
  const bottoms = orderBySlugs(products.filter((product) => product.category === "Bottoms"), MEN_GYM_SLUGS);
  const layers = orderBySlugs(products.filter((product) => product.category === "Layers"), MEN_GYM_SLUGS);
  const featured = orderBySlugs(products, FEATURED_SLUGS).slice(0, 3);

  return (
    <main className="commerce-page shop-page audience-page men-page">
      <section className="commerce-hero shop-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Men's Vyoma</p>
            <h1>The refined active uniform for training, stillness and the day after.</h1>
            <p className="commerce-lead">
              Cotton-rich men's gym essentials with handsome athletic fit, joyful colour, quiet branding and an atelier-level finish that solves the daily problems of activewear.
            </p>
            <div className="commerce-actions">
              <Link href="#gym-edit" className="btn accent">Shop gymwear</Link>
              <Link href="/pure#men" className="btn ghost">Shop Pure Men</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Shopping promises">
              <span>Small-batch care</span>
              <span>Tracked delivery</span>
              <span>Natural fibre first</span>
            </div>
          </div>
          <EditorialImage
            name="fabricMacro"
            alt="Men's Vyoma natural-fibre layers and Pure essentials in a premium studio collage"
            className="commerce-visual"
            priority
          />
        </div>
      </section>

      {gymEdit.length > 0 && (
        <section id="gym-edit" className="commerce-section commerce-section-tight" aria-labelledby="men-gym-heading">
          <div className="commerce-shell">
            <div className="commerce-section-head split">
              <div>
                <p className="commerce-eyebrow">Cotton gym edit</p>
                <h2 id="men-gym-heading">Active gymwear with natural-fibre comfort and a sharper finish.</h2>
                <p>Tees, tanks, shorts and warmup layers made to reduce cling, rough seams and throwaway gym style.</p>
              </div>
              <Link href="#collection" className="link-btn">View full men's catalogue</Link>
            </div>
            <div className="grid">
              {gymEdit.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </div>
        </section>
      )}

      <section className="commerce-section">
        <div className="commerce-shell">
          <div className="category-strip" aria-label="Shop men's categories">
            {CATEGORY_LINKS.map((item) => (
              <Link href={item.href} className="category-tile" key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="commerce-section commerce-section-tight" aria-labelledby="men-featured-heading">
          <div className="commerce-shell">
            <div className="commerce-section-head split">
              <div>
                <p className="commerce-eyebrow">Start here</p>
                <h2 id="men-featured-heading">The pieces that set the active uniform.</h2>
              </div>
              <Link href="/fit" className="link-btn">Need size help?</Link>
            </div>
            <div className="grid">
              {featured.map((product) => <ProductCard key={product.slug} product={product} />)}
            </div>
          </div>
        </section>
      )}

      <section id="collection" className="commerce-section collection-section" aria-labelledby="men-collection-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head">
            <p className="commerce-eyebrow">Men's collection</p>
            <h2 id="men-collection-heading">Everything for the polished daily active uniform.</h2>
            <p>Shop by category or move through the whole men's catalogue in one place.</p>
          </div>
          {[
            ["pure", "Pure", pure],
            ["tops", "Tops", tops],
            ["bottoms", "Bottoms", bottoms],
            ["layers", "Layers", layers],
          ].map(([id, title, items]) => (
            items.length > 0 && (
              <section id={id} className="commerce-section-tight" key={id} aria-labelledby={`men-${id}-heading`}>
                <div className="commerce-section-head split">
                  <div>
                    <p className="commerce-eyebrow">Men · {title}</p>
                    <h3 id={`men-${id}-heading`}>{title}</h3>
                  </div>
                </div>
                <div className="grid">
                  {items.map((product) => <ProductCard key={product.slug} product={product} />)}
                </div>
              </section>
            )
          ))}
        </div>
      </section>
    </main>
  );
}

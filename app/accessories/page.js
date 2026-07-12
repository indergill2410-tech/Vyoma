import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

export const metadata = {
  title: "Vyomawear Accessories",
  description:
    "Shop the existing Vyomawear accessories: the Gym Carry and Organic Crew Sock, placed together as the kit-finishing edit.",
  alternates: { canonical: abs("/accessories") },
};

const ACCESSORY_SLUGS = ["vyoma-mat-bag", "vyoma-organic-crew-sock"];
const accessories = ACCESSORY_SLUGS.map((slug) =>
  PRODUCTS.find((product) => product.slug === slug)
).filter(Boolean);

export default function AccessoriesPage() {
  return (
    <main className="commerce-page accessories-page">
      <section className="commerce-hero">
        <div className="commerce-shell commerce-hero-grid">
          <div className="commerce-copy">
            <p className="commerce-eyebrow">Vyoma Accessories</p>
            <h1>Everything that carries the day.</h1>
            <p className="commerce-lead">
              The existing Gym Carry and Organic Crew Sock finish the catalogue without
              creating another bag: a structured carry piece and the colour hit that
              completes the kit.
            </p>
            <div className="commerce-actions">
              <Link href="/product/vyoma-mat-bag" className="btn accent">Shop the Gym Carry</Link>
              <Link href="/shop#accessories" className="btn ghost">See all accessories</Link>
            </div>
            <div className="commerce-trust-row" aria-label="Accessory placement notes">
              <span>No duplicate bag</span>
              <span>Existing products only</span>
              <span>Kit-finishing edit</span>
            </div>
          </div>
          <div className="commerce-card-grid two">
            <article className="commerce-card">
              <h3>The bag that carries the hours between.</h3>
              <p>
                Training kit, Pure layers, bottle, towel and the piece you pull on afterwards
                belong in one clear accessory story before any new carry product is proposed.
              </p>
            </article>
            <article className="commerce-card">
              <h3>Placed before expansion.</h3>
              <p>
                Accessories now has its own route, shop tile and sitemap entry while the
                catalogue remains at the verified 18 products.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="accessories" className="commerce-section" aria-labelledby="accessories-heading">
        <div className="commerce-shell">
          <div className="commerce-section-head split">
            <div>
              <p className="commerce-eyebrow">Current accessories</p>
              <h2 id="accessories-heading">The existing carry and sock edit.</h2>
            </div>
            <Link href="/shop" className="link-btn">Back to Shop All</Link>
          </div>
          <div className="grid">
            {accessories.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

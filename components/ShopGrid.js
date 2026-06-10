import Link from "next/link";
import { shopifyConfigured, getProducts, formatMoney } from "@/lib/shopify";
import { PRODUCTS } from "@/lib/catalog";
import ProductCard from "./ProductCard";

// The collection grid. Pulls live from Shopify when configured (real products +
// photos), otherwise renders the local catalog so the site always works.
export default async function ShopGrid() {
  if (shopifyConfigured()) {
    let products = [];
    try {
      products = await getProducts();
    } catch {
      products = [];
    }
    if (products.length) {
      return (
        <div className="grid">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.handle}`} className="card" data-reveal>
              <div className="card-media">
                {p.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.featuredImage.url}
                    alt={p.featuredImage.altText || p.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="swatch-fallback" role="img" aria-label={p.title} />
                )}
              </div>
              <div className="card-body">
                <div className="card-top">
                  <h3>{p.title}</h3>
                </div>
                {p.description && <p className="card-desc">{p.description.slice(0, 120)}</p>}
                <div className="card-foot">
                  <span className="card-price">{formatMoney(p.priceRange.minVariantPrice)}</span>
                  <span className="card-cta">View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  }

  // Fallback: local catalog.
  return (
    <div className="grid">
      {PRODUCTS.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { shopifyConfigured, getProducts, formatMoney } from "@/lib/shopify";
import { PRODUCTS } from "@/lib/catalog";
import ProductCard from "./ProductCard";

// The collection grid. Shopify is the live source of truth when configured.
// The existing catalog stays as the visual fallback so current products and
// product imagery are never hidden by a temporary Shopify/API issue.
export default async function ShopGrid() {
  if (shopifyConfigured()) {
    let products = [];
    try {
      products = await getProducts();
    } catch (err) {
      console.error("Shopify product fetch failed", err);
      products = [];
    }
    if (products.length) {
      return (
        <div className="grid">
          {products.map((p) => {
            const colourOption = p.options?.find((o) => /colou?r/i.test(o.name));
            return (
              <Link key={p.id} href={`/product/${p.handle}`} className="card" data-reveal>
                <div className="card-media">
                  <div className="card-flags" aria-label="Product badges">
                    <span className="card-flag dark">First drop</span>
                    <span className="card-flag">New</span>
                  </div>
                  {p.featuredImage ? (
                    <Image
                      src={p.featuredImage.url}
                      alt={p.featuredImage.altText || p.title}
                      fill
                      sizes="(min-width: 980px) 32vw, (min-width: 640px) 46vw, 100vw"
                      className="product-img"
                    />
                  ) : (
                    <div className="swatch-fallback" role="img" aria-label={p.title} />
                  )}
                  <span className="brand-stamp"><span className="bs-dev">व्योम</span> Vyoma</span>
                </div>
                <div className="card-body">
                  <p className="card-kicker">{p.productType || "Vyomawear"}</p>
                  <div className="card-top">
                    <h3>{p.title}</h3>
                  </div>
                  {colourOption?.values?.length > 0 && (
                    <p className="card-tagline">{colourOption.values.length} colours</p>
                  )}
                  {colourOption?.values?.length > 0 && (
                    <div className="card-swatches" aria-label="Available colours">
                      {colourOption.values.slice(0, 5).map((value) => (
                        <span key={value} className="card-swatch" title={value} />
                      ))}
                    </div>
                  )}
                  {p.description && <p className="card-desc">{p.description.slice(0, 120)}</p>}
                  <div className="card-foot">
                    <span className="card-price">{formatMoney(p.priceRange.minVariantPrice)}</span>
                    <span className="card-cta">View →</span>
                  </div>
                  <div className="card-actions">
                    <span className="card-quick">Choose options</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  }

  return (
    <div className="grid">
      {PRODUCTS.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

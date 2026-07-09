import Link from "next/link";
import Image from "next/image";
import { shopifyConfigured, getProducts, formatMoney } from "@/lib/shopify";
import { PRODUCTS } from "@/lib/catalog";
import ProductCard from "./ProductCard";

const FALLBACK_SWATCHES = ["#262A4E", "#D1998F", "#6B7280", "#9D4F24", "#E7E3DA"];

function swatchFor(value, index) {
  const named = {
    indigo: "#262A4E",
    navy: "#262A4E",
    rose: "#D1998F",
    pink: "#D1998F",
    grey: "#6B7280",
    gray: "#6B7280",
    marigold: "#9D4F24",
    yellow: "#9D4F24",
    ether: "#E7E3DA",
    white: "#F7F6F2",
    black: "#14162E",
  };
  const lower = String(value || "").toLowerCase();
  const hit = Object.entries(named).find(([key]) => lower.includes(key));
  return hit ? hit[1] : FALLBACK_SWATCHES[index % FALLBACK_SWATCHES.length];
}

function rangeLabel(values = []) {
  if (!values.length) return "Fit help on page";
  if (values.length === 1) return values[0];
  return `${values[0]}-${values[values.length - 1]}`;
}

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
      const liveHandles = new Set(products.map((p) => p.handle));
      const localProducts = PRODUCTS.filter((p) => !liveHandles.has(p.slug));

      return (
        <div className="grid">
          {products.map((p) => {
            const colourOption = p.options?.find((o) => /colou?r/i.test(o.name));
            const sizeOption = p.options?.find((o) => /size/i.test(o.name));
            return (
              <Link key={p.id} href={`/product/${p.handle}`} className="card">
                <div className="card-media">
                  <div className="card-flags" aria-label="Product badges">
                    <span className="card-flag dark">Organic-first</span>
                    <span className="card-flag">Live store</span>
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
                  <div className="card-title-row">
                    <h3>{p.title}</h3>
                    <span className="card-price card-price-main">{formatMoney(p.priceRange.minVariantPrice)}</span>
                  </div>
                  {colourOption?.values?.length > 0 ? (
                    <p className="card-tagline">{colourOption.values.length} colours</p>
                  ) : (
                    <p className="card-tagline">Soft movement layer</p>
                  )}
                  {colourOption?.values?.length > 0 && (
                    <div className="card-swatches" aria-label="Available colours">
                      {colourOption.values.slice(0, 5).map((value, index) => (
                        <span
                          key={value}
                          className="card-swatch"
                          style={{ background: swatchFor(value, index) }}
                          title={value}
                        />
                      ))}
                    </div>
                  )}
                  <div className="card-proofline" aria-label="Product proof points">
                    <span>Live store</span>
                    <span>{rangeLabel(sizeOption?.values)}</span>
                  </div>
                  {p.description && <p className="card-desc">{p.description.slice(0, 140)}</p>}
                  <div className="card-foot">
                    <span className="card-cta">View product</span>
                    <span className="card-micro">Fit + checkout details</span>
                  </div>
                </div>
              </Link>
            );
          })}
          {localProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
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

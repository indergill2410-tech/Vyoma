import Link from "next/link";
import Image from "next/image";
import { shopifyConfigured, getProducts, formatMoney } from "@/lib/shopify";
import { PRODUCTS } from "@/lib/catalog";
import ProductCard from "./ProductCard";

function localCatalogAllowed() {
  return process.env.NODE_ENV !== "production";
}

function EmptyDropState() {
  return (
    <div className="grid">
      <div className="card" data-reveal>
        <div className="card-body">
          <div className="card-top">
            <h3>The first drop is being prepared.</h3>
          </div>
          <p className="card-desc">
            The pieces are almost ready. Join The Circle for first access when
            the Shopify collection opens.
          </p>
          <div className="card-foot">
            <Link href="/circle" className="card-cta">
              Join The Circle -&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// The collection grid. Production reads live products from Shopify; the local
// catalog is only a development fallback.
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
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.handle}`} className="card" data-reveal>
              <div className="card-media">
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

  if (!localCatalogAllowed()) {
    return <EmptyDropState />;
  }

  return (
    <div className="grid">
      {PRODUCTS.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

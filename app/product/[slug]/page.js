import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct as getLocalProduct, PRODUCTS, relatedProducts } from "@/lib/catalog";
import { shopifyConfigured, getProduct as getShopifyProduct } from "@/lib/shopify";
import ProductDetail from "@/components/ProductDetail";
import ShopifyProductDetail from "@/components/ShopifyProductDetail";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";

// Local slugs are pre-rendered; Shopify handles render on demand (dynamicParams).
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

async function resolve(slug) {
  const local = getLocalProduct(slug);
  if (local) return { kind: "local", product: local };
  if (shopifyConfigured()) {
    try {
      const sp = await getShopifyProduct(slug);
      if (sp) return { kind: "shopify", product: sp };
    } catch {
      /* fall through */
    }
  }
  return null;
}

export async function generateMetadata({ params }) {
  const found = await resolve(params.slug);
  if (!found) return { title: "Not found" };
  const p = found.product;
  return {
    title: found.kind === "shopify" ? p.title : p.name,
    description: (found.kind === "shopify" ? p.description : p.description) || "",
  };
}

export default async function ProductPage({ params }) {
  const found = await resolve(params.slug);
  if (!found) notFound();

  if (found.kind === "shopify") {
    return <ShopifyProductDetail product={found.product} />;
  }

  const product = found.product;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Vyomawear" },
    category: product.category,
    offers: {
      "@type": "Offer",
      price: (product.priceAud / 100).toFixed(2),
      priceCurrency: "AUD",
      availability: "https://schema.org/InStock",
    },
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="container">
        <p className="crumb">
          <Link href="/#shop">Collection</Link> / {product.name}
        </p>
        <ProductDetail product={product} />
      </div>
      <Reviews slug={product.slug} />
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Pairs well</span>
            <h2>Complete your practice.</h2>
          </div>
          <div className="grid">
            {relatedProducts(product.slug, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

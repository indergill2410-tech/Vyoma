import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct as getLocalProduct, PRODUCTS } from "@/lib/catalog";
import { shopifyConfigured, getProduct as getShopifyProduct } from "@/lib/shopify";
import ProductDetail from "@/components/ProductDetail";
import ShopifyProductDetail from "@/components/ShopifyProductDetail";
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
  return (
    <main>
      <div className="container">
        <p className="crumb">
          <Link href="/#shop">Collection</Link> / {product.name}
        </p>
        <ProductDetail product={product} />
      </div>
      <Reviews slug={product.slug} />
    </main>
  );
}

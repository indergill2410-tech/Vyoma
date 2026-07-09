import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct as getLocalProduct, PRODUCTS, relatedProducts } from "@/lib/catalog";
import { shopifyConfigured, getProduct as getShopifyProduct } from "@/lib/shopify";
import { abs } from "@/lib/seo";
import { prisma } from "@/lib/db";
import ProductDetail from "@/components/ProductDetail";
import ShopifyProductDetail from "@/components/ShopifyProductDetail";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";

async function approvedReviewSummary(slug) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productSlug: slug, status: "approved" },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    const count = reviews.length;
    if (!count) return null;
    const average = reviews.reduce((s, r) => s + r.rating, 0) / count;
    return { count, average, reviews };
  } catch {
    return null;
  }
}

// Shopify handles render on demand (dynamicParams); local slugs seed the build
// so the site still renders before the Storefront token is set.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Shopify is authoritative. We only fall back to the local catalog (read-only
// preview) when Shopify isn't connected yet or the handle isn't found there.
async function resolve(slug) {
  if (shopifyConfigured()) {
    try {
      const sp = await getShopifyProduct(slug);
      if (sp) return { kind: "shopify", product: sp };
    } catch (err) {
      // Log, then fall through to the local catalog preview.
      console.error("Shopify product lookup failed", err);
    }
  }

  const local = getLocalProduct(slug);
  if (local) return { kind: "local", product: local };
  return null;
}

export async function generateMetadata({ params }) {
  const found = await resolve(params.slug);
  if (!found) return { title: "Not found" };
  const p = found.product;
  const title = found.kind === "shopify" ? p.title : p.name;
  const description =
    (p.description || "").slice(0, 200) ||
    "Premium natural-fibre activewear, made in India — built for the studio, the gym and everyday life.";
  const url = abs(`/product/${params.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: `${title} · Vyomawear`,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ProductPage({ params }) {
  const found = await resolve(params.slug);
  if (!found) notFound();

  if (found.kind === "shopify") {
    return <ShopifyProductDetail product={found.product} />;
  }

  const product = found.product;
  const isMensProduct = product.catalogues?.includes("men");
  const url = abs(`/product/${product.slug}`);
  const reviewSummary = await approvedReviewSummary(product.slug);

  const priceValidUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const offer = (currency, minorAmount) => ({
    "@type": "Offer",
    url,
    priceCurrency: currency,
    price: (minorAmount / 100).toFixed(2),
    priceValidUntil,
    itemCondition: "https://schema.org/NewCondition",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Vyomawear" },
  });

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [abs(`/product/${product.slug}/opengraph-image`)],
    sku: product.slug,
    url,
    brand: { "@type": "Brand", name: "Vyomawear" },
    category: product.category,
    offers: [offer("AUD", product.priceAud)],
    ...(reviewSummary && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: reviewSummary.average.toFixed(1),
        reviewCount: reviewSummary.count,
        bestRating: 5,
        worstRating: 1,
      },
      review: reviewSummary.reviews.slice(0, 5).map((r) => ({
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        author: { "@type": "Person", name: r.author },
        ...(r.title && { name: r.title }),
        reviewBody: r.body,
        datePublished: r.createdAt.toISOString().slice(0, 10),
      })),
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: "Collection", item: abs("/shop") },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  return (
    <main className="commerce-page local-product-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container">
        <p className="crumb">
          <Link href={isMensProduct ? "/men" : "/shop"}>{isMensProduct ? "Men" : "Collection"}</Link> / {product.name}
        </p>
        <ProductDetail product={product} commerceEnabled={false} />
      </div>
      <Reviews slug={product.slug} />
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-eyebrow">Pairs well</span>
            <h2>{isMensProduct ? "Build the full day kit." : "Complete your practice."}</h2>
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

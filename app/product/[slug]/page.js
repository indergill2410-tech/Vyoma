import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/catalog";
import ProductDetail from "@/components/ProductDetail";
import Reviews from "@/components/Reviews";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

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

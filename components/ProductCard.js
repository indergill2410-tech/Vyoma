import Link from "next/link";
import ProductImage from "./ProductImage";
import Price from "./Price";
import { productShots } from "@/lib/catalog";

export default function ProductCard({ product }) {
  const model = productShots(product)[0];
  return (
    <Link href={`/product/${product.slug}`} className="card" data-reveal>
      <div className="card-media">
        <ProductImage
          src={model.src}
          alt={model.alt}
          colour={product.colourways[0]}
          sizes="(min-width: 980px) 32vw, (min-width: 640px) 46vw, 100vw"
          mark
        />
        <span className="brand-stamp"><span className="bs-dev">व्योम</span> Vyoma</span>
      </div>
      <div className="card-body">
        <p className="card-kicker">{product.category}</p>
        <div className="card-top">
          <h3>{product.name}</h3>
          {product.hero && <span className="card-badge">First drop</span>}
        </div>
        <p className="card-tagline">{product.tagline}</p>
        <p className="card-desc">{product.description}</p>
        <div className="card-foot">
          <Price product={product} className="card-price" />
          <span className="card-cta">View →</span>
        </div>
      </div>
    </Link>
  );
}

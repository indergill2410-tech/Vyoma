import Link from "next/link";
import Swatch from "./Swatch";
import Price from "./Price";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`} className="card">
      <Swatch colourway={product.colourways[0]} mark />
      <div className="card-body">
        <div className="card-top">
          <h3>{product.name}</h3>
          {product.hero && <span className="card-badge">Most loved</span>}
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

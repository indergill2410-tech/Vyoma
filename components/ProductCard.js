import Link from "next/link";
import ProductImage from "./ProductImage";
import Price from "./Price";
import { COLOURWAYS, audienceLabel, productShots } from "@/lib/catalog";

export default function ProductCard({ product }) {
  const model = productShots(product)[0];
  return (
    <Link href={`/product/${product.slug}`} className="card" data-reveal>
      <div className="card-media">
        <ProductImage
          src={model.src}
          fallbackSrc={model.fallbackSrc}
          alt={model.alt}
          colour={product.colourways[0]}
          sizes="(min-width: 980px) 32vw, (min-width: 640px) 46vw, 100vw"
          mark
        />
      </div>
      <div className="card-body">
        <div className="card-flags" aria-label="Product badges">
          {product.hero && <span className="card-flag dark">First drop</span>}
          <span className="card-flag">New</span>
        </div>
        <p className="card-kicker">{audienceLabel(product)} · {product.category}</p>
        <div className="card-top">
          <h3>{product.name}</h3>
        </div>
        <p className="card-tagline">{product.tagline}</p>
        <div className="card-swatches" aria-label="Available colours">
          {product.colourways.slice(0, 5).map((key) => (
            <span
              key={key}
              className="card-swatch"
              style={{ background: COLOURWAYS[key]?.base }}
              title={COLOURWAYS[key]?.name}
            />
          ))}
        </div>
        <p className="card-desc">{product.description}</p>
        <div className="card-foot">
          <Price product={product} className="card-price" />
          <span className="card-cta">View →</span>
        </div>
      </div>
    </Link>
  );
}

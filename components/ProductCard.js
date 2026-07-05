import Link from "next/link";
import ProductImage from "./ProductImage";
import Price from "./Price";
import { COLOURWAYS, productShots } from "@/lib/catalog";

function sizeRange(product) {
  if (!product.sizes?.length) return "Size help on page";
  if (product.sizes.length === 1) return product.sizes[0];
  return `${product.sizes[0]}-${product.sizes[product.sizes.length - 1]}`;
}

function proofCopy(product) {
  if (/pure/i.test(product.category)) return "Closest-to-skin";
  if (/accessories/i.test(product.category)) return "Organic cotton canvas";
  if (/sets/i.test(product.category)) return "Complete uniform";
  return "Natural-fibre feel";
}

export default function ProductCard({ product }) {
  const model = productShots(product)[0];
  return (
    <Link href={`/product/${product.slug}`} className="card" data-reveal>
      <div className="card-media">
        <div className="card-flags" aria-label="Product badges">
          {product.hero && <span className="card-flag dark">First drop</span>}
          <span className="card-flag">Small batch</span>
        </div>
        <ProductImage
          src={model.src}
          fallbackSrc={model.fallbackSrc}
          alt={model.alt}
          colour={product.colourways[0]}
          sizes="(min-width: 980px) 32vw, (min-width: 640px) 46vw, 100vw"
          mark
        />
        <span className="brand-stamp"><span className="bs-dev">व्योम</span> Vyoma</span>
      </div>
      <div className="card-body">
        <p className="card-kicker">{product.category}</p>
        <div className="card-title-row">
          <h3>{product.name}</h3>
          <Price product={product} className="card-price card-price-main" />
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
        <div className="card-proofline" aria-label="Product proof points">
          <span>{proofCopy(product)}</span>
          <span>{sizeRange(product)}</span>
        </div>
        <p className="card-desc">{product.description}</p>
        <div className="card-foot">
          <span className="card-cta">View product</span>
          <span className="card-micro">Fit + fabric details</span>
        </div>
      </div>
    </Link>
  );
}

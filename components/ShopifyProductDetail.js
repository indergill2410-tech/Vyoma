import Link from "next/link";
import ShopifyBuyPanel from "./ShopifyBuyPanel";

// Server-rendered PDP for a Shopify product: image gallery + client buy panel.
export default function ShopifyProductDetail({ product }) {
  const images = product.images?.nodes?.length
    ? product.images.nodes
    : product.featuredImage
    ? [product.featuredImage]
    : [];

  return (
    <main>
      <div className="container">
        <p className="crumb">
          <Link href="/#shop">Collection</Link> / {product.title}
        </p>
        <div className="pdp">
          <div className="pdp-media">
            <div className="pdp-frame">
              {images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="pdp-photo"
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                />
              ) : (
                <div className="swatch-fallback" role="img" aria-label={product.title} />
              )}
            </div>
            {images.length > 1 && (
              <div className="pdp-thumbs">
                {images.slice(0, 5).map((img, i) => (
                  <span className="pdp-thumb" key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.altText || `${product.title} ${i + 1}`} loading="lazy" />
                  </span>
                ))}
              </div>
            )}
          </div>
          <ShopifyBuyPanel product={product} />
        </div>
      </div>
    </main>
  );
}

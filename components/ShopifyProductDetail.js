import Link from "next/link";
import ShopifyGallery from "./ShopifyGallery";
import ShopifyBuyPanel from "./ShopifyBuyPanel";

// Server-rendered PDP for a Shopify product: interactive image gallery + buy panel.
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
          <ShopifyGallery images={images} title={product.title} />
          <ShopifyBuyPanel product={product} />
        </div>
      </div>
    </main>
  );
}

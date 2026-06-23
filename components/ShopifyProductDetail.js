import Link from "next/link";
import ShopifyGallery from "./ShopifyGallery";
import ShopifyBuyPanel from "./ShopifyBuyPanel";
import EditorialImage from "./EditorialImage";

export default function ShopifyProductDetail({ product }) {
  const images = product.images?.nodes?.length
    ? product.images.nodes
    : product.featuredImage
    ? [product.featuredImage]
    : [];

  return (
    <main className="shopify-product-page">
      <div className="container">
        <p className="crumb">
          <Link href="/shop">Collection</Link> / {product.title}
        </p>
        <div className="pdp">
          <ShopifyGallery images={images} title={product.title} />
          <ShopifyBuyPanel product={product} />
        </div>
      </div>

      <section className="commerce-section pdp-story-section" aria-labelledby="pdp-story-heading">
        <div className="commerce-shell two-column-section">
          <div className="sticky-copy">
            <p className="commerce-eyebrow">Why it belongs</p>
            <h2 id="pdp-story-heading">A piece should earn its place before it reaches your drawer.</h2>
            <EditorialImage
              name="fabricMacro"
              alt="Close-up natural fibre texture supporting the product material story"
              className="fabric-sample pdp-story-image"
            />
          </div>
          <div className="commerce-card-grid two">
            <article className="commerce-card">
              <h3>Soft natural fibres</h3>
              <p>Chosen for the feeling of movement, heat and long wear against skin.</p>
            </article>
            <article className="commerce-card">
              <h3>Made with care</h3>
              <p>Prepared in India, checked for finish and sent with tracked delivery.</p>
            </article>
            <article className="commerce-card">
              <h3>Fit support</h3>
              <p>Use the Fit Finder before checkout, then rely on clear support if the first fit is not right.</p>
            </article>
            <article className="commerce-card">
              <h3>Clear checkout</h3>
              <p>Payment is handled through secure hosted checkout with confirmation by email.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="commerce-section section-light pdp-next-section">
        <div className="commerce-shell confidence-grid">
          <div>
            <p className="commerce-eyebrow">Still deciding?</p>
            <h2>Choose by feel, not pressure.</h2>
          </div>
          <div className="pdp-next-actions">
            <Link href="/fit" className="btn accent">Find your fit</Link>
            <Link href="/fabric" className="btn ghost">Read the fabric promise</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

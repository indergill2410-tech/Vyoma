"use client";

import { useState } from "react";
import Link from "next/link";
import { COLOURWAYS } from "@/lib/catalog";
import { formatMoney, priceFor } from "@/lib/format";
import Gallery from "./Gallery";
import SizeGuide from "./SizeGuide";

// Local catalog preview. Shopify is the live store, but when the Storefront token
// isn't connected yet we still render a rich, read-only product page so the site
// looks complete. Add-to-bag / checkout live on the Shopify-backed pages.
export default function ProductDetail({ product }) {
  const [colour, setColour] = useState(product.colourways[0]);
  const [size, setSize] = useState(null);
  const [guideOpen, setGuideOpen] = useState(false);

  const unit = priceFor(product, "AU");
  const cw = COLOURWAYS[colour];

  return (
    <div
      className="pdp"
      style={{ "--cw-base": cw?.base, "--cw-accent": cw?.accent, "--cw-ink": cw?.ink }}
    >
      <Gallery product={product} colour={colour} />

      <div className="pdp-info">
        <div className="pdp-proofline" aria-label="Product proof points">
          <span>Made to order</span>
          <span>Natural-fibre first</span>
          <span>Fit support</span>
        </div>
        <p className="pdp-cat">{product.category} · {product.tagline}</p>
        <h1>{product.name}</h1>
        <p className="pdp-price">{formatMoney(unit, "AU")}</p>
        <p className="pdp-desc">{product.description}</p>

        <div className="pdp-fit-panel pdp-fit-highlight">
          <h3>Fit first. Checkout second.</h3>
          <p>{product.fit}</p>
          <button className="link-btn" onClick={() => setGuideOpen(true)}>Open size guide</button>
        </div>

        <div className="pdp-field">
          <div className="pdp-field-head">
            <span className="pdp-label">Colour — {COLOURWAYS[colour]?.name}</span>
          </div>
          <div className="colour-row">
            {product.colourways.map((key) => (
              <button
                key={key}
                className={`colour-dot ${colour === key ? "active" : ""}`}
                style={{ background: COLOURWAYS[key]?.base }}
                onClick={() => setColour(key)}
                aria-label={COLOURWAYS[key]?.name}
                aria-pressed={colour === key}
                title={COLOURWAYS[key]?.name}
              />
            ))}
          </div>
        </div>

        <div className="pdp-field">
          <div className="pdp-field-head">
            <span className="pdp-label">Size{size ? ` — ${size}` : ""}</span>
            <button className="link-btn" onClick={() => setGuideOpen(true)}>Size guide</button>
          </div>
          <div className="sizes" role="group" aria-label="Choose size">
            {product.sizes.map((s) => (
              <button
                key={s}
                className="size"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-actions">
          <Link className="btn block" href="/shop">Shop the live collection</Link>
        </div>

        <p className="pdp-lead">✦ {product.leadTime}</p>
        <p className="pdp-stock-note">Made-to-order preview: checkout appears when this piece is released live.</p>

        <ul className="pdp-trust" aria-label="Why buy from Vyoma">
          <li><span>॥</span> Made in India</li>
          <li><span>✦</span> Secure checkout</li>
          <li><span>◯</span> Tracked delivery</li>
        </ul>

        <dl className="pdp-trust-grid" aria-label="Purchase confidence">
          <div>
            <dt>Fabric</dt>
            <dd>{product.fabric}</dd>
          </div>
          <div>
            <dt>Fit</dt>
            <dd>{product.fit}</dd>
          </div>
          <div>
            <dt>Care</dt>
            <dd>{product.care}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{product.leadTime}</dd>
          </div>
        </dl>

        <div className="pdp-day-grid" data-reveal>
          <article>
            <span>How it fits into your day</span>
            <p>
              Wear it for movement first, then keep it on for the drive, the coffee,
              the errand or the quieter hours after.
            </p>
          </article>
          <article>
            <span>Why your body notices</span>
            <p>
              The closest layer changes the way the rest of the day feels: softer
              touch, clearer fit and less friction between training and life.
            </p>
          </article>
        </div>

        <div className="made-for-you" data-reveal>
          <h4>Made in India, with care</h4>
          <ol className="moto-timeline">
            <li><span>1</span> Crafted in India in small, considered runs</li>
            <li><span>2</span> Cut, sewn and checked by hand</li>
            <li><span>3</span> Couriered to your door, with tracking the whole way</li>
          </ol>
          <p className="muted small">Considered, never mass-produced. Made to last.</p>
        </div>
      </div>

      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} fit={product.fit} />
    </div>
  );
}

"use client";

import { useState } from "react";

// Interactive gallery for Shopify product images: a main frame plus a thumbnail
// rail. Clicking a thumb swaps the main image with the cross-dissolve (cw-in).
export default function ShopifyGallery({ images, title }) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="pdp-media">
        <div className="pdp-frame">
          <div className="swatch-fallback" role="img" aria-label={title} />
        </div>
      </div>
    );
  }

  const main = images[active] || images[0];

  return (
    <div className="pdp-media">
      <div className="pdp-frame" key={active}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pdp-photo" src={main.url} alt={main.altText || title} />
        <span className="brand-stamp"><span className="bs-dev">व्योम</span> Vyoma</span>
      </div>
      {images.length > 1 && (
        <div className="pdp-thumbs">
          {images.slice(0, 6).map((img, i) => (
            <button
              key={i}
              className={`pdp-thumb ${active === i ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.altText || `${title} ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

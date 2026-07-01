"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";
import { productShots } from "@/lib/catalog";

// PDP photo gallery: a main image plus thumbnails for each shot. Cross-dissolves
// on change (cw-in) and recolours its swatch fallback with the selected colourway.
export default function Gallery({ product, colour }) {
  const shots = productShots(product);
  const [active, setActive] = useState(0);
  const activeShot = shots[active];

  return (
    <div className="pdp-media">
      <div className="pdp-frame" key={`${active}-${colour}`}>
        <ProductImage
          src={activeShot.src}
          fallbackSrc={activeShot.fallbackSrc}
          alt={activeShot.alt}
          colour={colour}
          sizes="(min-width: 820px) 45vw, 100vw"
          loading="eager"
          fetchPriority="high"
          mark
        />
      </div>
      <div className="pdp-thumbs">
        {shots.map((s, i) => (
          <button
            key={s.slot}
            className={`pdp-thumb ${active === i ? "active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Show ${s.alt}`}
            aria-pressed={active === i}
          >
            <ProductImage
              src={s.src}
              fallbackSrc={s.fallbackSrc}
              alt={s.alt}
              colour={colour}
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

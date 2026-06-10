"use client";

import { useState } from "react";
import ProductImage from "./ProductImage";
import { productShots } from "@/lib/catalog";

// PDP photo gallery: a main image plus thumbnails for each shot. Cross-dissolves
// on change (cw-in) and recolours its swatch fallback with the selected colourway.
export default function Gallery({ product, colour }) {
  const shots = productShots(product);
  const [active, setActive] = useState(0);

  return (
    <div className="pdp-media">
      <div className="pdp-frame" key={`${active}-${colour}`}>
        <ProductImage
          src={shots[active].src}
          alt={shots[active].alt}
          colour={colour}
          sizes="(min-width: 820px) 45vw, 100vw"
          priority
          mark
        />
        <span className="brand-stamp"><span className="bs-dev">व्योम</span> Vyoma</span>
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
            <ProductImage src={s.src} alt={s.alt} colour={colour} sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

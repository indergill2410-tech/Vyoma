"use client";

import { useEffect, useState } from "react";

// Renders toasts + the flying-star celebration. Mounted once in the layout.
// Listens for the events dispatched by lib/fx.js.
let counter = 0;

export default function Fx() {
  const [toasts, setToasts] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onToast(e) {
      const id = ++counter;
      setToasts((t) => [...t, { id, message: e.detail.message }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
    }

    function onCelebrate(e) {
      const target = document.getElementById("cart-button");
      if (!target || reduce) return;
      const rect = target.getBoundingClientRect();
      const id = ++counter;
      setStars((s) => [
        ...s,
        {
          id,
          x0: e.detail.x,
          y0: e.detail.y,
          x1: rect.left + rect.width / 2,
          y1: rect.top + rect.height / 2,
        },
      ]);
      setTimeout(() => setStars((s) => s.filter((st) => st.id !== id)), 900);
    }

    window.addEventListener("vyoma:toast", onToast);
    window.addEventListener("vyoma:celebrate", onCelebrate);
    return () => {
      window.removeEventListener("vyoma:toast", onToast);
      window.removeEventListener("vyoma:celebrate", onCelebrate);
    };
  }, []);

  return (
    <>
      <div className="toast-stack" aria-live="polite" aria-atomic="false">
        {toasts.map((t) => (
          <div className="toast" key={t.id} role="status">
            {t.message}
          </div>
        ))}
      </div>
      {stars.map((s) => (
        <span
          key={s.id}
          className="fly-star"
          aria-hidden="true"
          style={{
            "--x0": `${s.x0}px`,
            "--y0": `${s.y0}px`,
            "--x1": `${s.x1}px`,
            "--y1": `${s.y1}px`,
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
}

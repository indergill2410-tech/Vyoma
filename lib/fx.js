// Tiny client-side FX event bus. Components dispatch; <Fx /> renders.
// SSR-safe — every call guards on `window`.

export function toast(message) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vyoma:toast", { detail: { message } }));
}

// Fire a ✦ that flies from (x, y) into the cart button. Pass the origin point,
// usually the centre of the button the user just clicked.
export function celebrate(x, y) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vyoma:celebrate", { detail: { x, y } }));
}

// Convenience: derive the origin point from a click/pointer event.
export function celebrateFrom(e) {
  const el = e?.currentTarget;
  if (!el) return;
  const r = el.getBoundingClientRect();
  celebrate(r.left + r.width / 2, r.top + r.height / 2);
}

export const VYOMA_WORDMARK = {
  devanagari: "व्योम",
  latin: "Vyoma",
  descriptor: "Organic movement wear",
};

export function logoPlacementFor(product, slot = "model") {
  const category = (product?.category || "").toLowerCase();
  const name = (product?.name || "").toLowerCase();

  if (slot === "detail") return "detail";

  if (slot === "back") {
    if (category.includes("layer") || name.includes("hoodie") || name.includes("wrap")) return "back-neck";
    if (category.includes("bottom") || name.includes("legging") || name.includes("short") || name.includes("jogger") || name.includes("skort")) return "back-waist";
    return "back-hem";
  }

  if (category === "vyoma pure") return "waist";
  if (category.includes("bra")) return "underband";
  if (category.includes("layer") || name.includes("hoodie") || name.includes("wrap")) return "chest";
  if (category.includes("accessor") || name.includes("sock")) return "cuff";
  if (category.includes("bottom") || category.includes("set") || name.includes("legging") || name.includes("short") || name.includes("jogger") || name.includes("skort")) return "waist";
  if (category.includes("top") || name.includes("tee") || name.includes("tank") || name.includes("cami")) return name.includes("tee") ? "chest" : "hem";

  return "hem";
}

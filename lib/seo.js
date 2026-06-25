// Single source of truth for canonical URLs and brand metadata used across
// metadata, JSON-LD, sitemap and the generated social-share images.
//
// Kept dependency-free (no prisma, no next/server) so it is safe to import from
// edge/runtime-light routes such as the Open Graph image generators.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vyoma-imsr.onrender.com"
).replace(/\/+$/, "");

// Absolute URL for a path. Pass-through for anything already absolute.
export function abs(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

export const BRAND = {
  name: "Vyomawear",
  legalName: "Vyomawear",
  slogan: "Activewear with a yoga soul.",
  description:
    "Premium natural-fibre activewear — made in India for the studio, the gym and everyday life. Natural fibre first, fewer synthetics against your skin. Vyoma (vee-OH-ma): Sanskrit for sky, ether, infinite space.",
};

// Sky palette reused by the OG image generators so social cards match the site.
export const SKY = {
  night: "#14162E",
  indigo: "#262A4E",
  indigoSoft: "#3A3F66",
  marigold: "#E9AC3F",
  marigoldDeep: "#C98A22",
  ether: "#E7E3DA",
  ink: "#EDEFF3",
  muted: "#9AA3AE",
};

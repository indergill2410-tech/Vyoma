import { abs } from "@/lib/seo";

// Crawlers welcome on the storefront; kept out of gated/transactional surfaces.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/success", "/cart"],
      },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}

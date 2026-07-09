import { PRODUCTS } from "@/lib/catalog";
import { abs } from "@/lib/seo";

// Dynamic sitemap. Static marketing/story routes + every catalog product.
// Transactional and gated routes (/admin, /cart, /success, /api) are left out.
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/shop", priority: 0.95, changeFrequency: "daily" },
    { path: "/women", priority: 0.9, changeFrequency: "daily" },
    { path: "/men", priority: 0.9, changeFrequency: "daily" },
    { path: "/pure", priority: 0.8, changeFrequency: "weekly" },
    { path: "/sky-series", priority: 0.7, changeFrequency: "weekly" },
    { path: "/fabric", priority: 0.7, changeFrequency: "monthly" },
    { path: "/research", priority: 0.8, changeFrequency: "monthly" },
    { path: "/making", priority: 0.6, changeFrequency: "monthly" },
    { path: "/drops", priority: 0.8, changeFrequency: "weekly" },
    { path: "/fit", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  ].map((r) => ({
    url: abs(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: abs(`/product/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.hero ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

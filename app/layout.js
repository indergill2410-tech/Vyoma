import "./globals.css";
import "./conversion.css";
import "./editorial.css";
import "./brand-polish.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import Nav from "@/components/Nav";
import AnnounceBar from "@/components/AnnounceBar";
import CartDrawer from "@/components/CartDrawer";
import BrandLogo from "@/components/BrandLogo";
import Fx from "@/components/Fx";
import ScrollReveal from "@/components/ScrollReveal";
import SkyAtmosphere from "@/components/SkyAtmosphere";
import { abs, SITE_URL, BRAND } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vyomawear - Lifestyle activewear for the full day",
    template: "%s · Vyomawear",
  },
  description: BRAND.description,
  keywords: [
    "activewear Australia",
    "natural fibre activewear",
    "organic cotton activewear",
    "men's organic cotton underwear",
    "men's activewear Australia",
    "lifestyle activewear",
    "gym wear",
    "natural fibre leggings",
    "Vyoma",
    "Vyomawear",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vyomawear",
    title: "Vyomawear - Lifestyle activewear for the full day.",
    description:
      "Premium natural-fibre activewear for training, travel, recovery and everyday life. Shipping across Australia.",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyomawear - Lifestyle activewear for the full day",
    description:
      "Premium natural-fibre activewear for training, travel, recovery and everyday life. Shipping across Australia.",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: "Vyoma", statusBarStyle: "default" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // viewport-fit=cover is required for env(safe-area-inset-*) to resolve to
  // real values on notched iPhones — without it the insets are always 0.
  viewportFit: "cover",
  themeColor: "#fbf7ef",
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      legalName: BRAND.legalName,
      description: "Premium natural-fibre activewear for training, travel, recovery and everyday life.",
      slogan: BRAND.slogan,
      url: SITE_URL,
      logo: abs("/icon.svg"),
      image: abs("/opengraph-image"),
      areaServed: ["AU"],
      foundingLocation: { "@type": "Place", name: "India" },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      description: BRAND.description,
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Warm up the Shopify image CDN early so product photos start
            downloading sooner (Next hoists these into <head>). */}
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-ready')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
        <SkyAtmosphere />
        <Providers>
          <AnnounceBar />
          <Nav />
          {children}
          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <BrandLogo className="footer-logo" />
                <p className="muted small">Warm natural-fibre activewear for training, travel, recovery and everyday life.</p>
              </div>
              <div className="footer-links">
                <Link href="/shop">Shop</Link>
                <Link href="/women">Women</Link>
                <Link href="/men">Men</Link>
                <Link href="/pure">Vyoma Pure</Link>
                <Link href="/fabric">Fabric</Link>
                <Link href="/research">Research</Link>
                <Link href="/drops">The Drops</Link>
                <Link href="/circle">The Circle</Link>
                <Link href="/sky-series">The Sky Series</Link>
                <Link href="/making">The Making</Link>
                <Link href="/fit">Fit Finder</Link>
                <Link href="/story">Story</Link>
              </div>
              <div className="footer-meta">
                <span className="dev">व्योम</span>
                <p className="muted small">Lifestyle activewear - Shipping across Australia</p>
                <p className="muted xsmall">© {new Date().getFullYear()} Vyomawear · Room to grow.</p>
              </div>
            </div>
          </footer>
          <CartDrawer />
          <Fx />
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}

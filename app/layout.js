import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import Nav from "@/components/Nav";
import AnnounceBar from "@/components/AnnounceBar";
import CartDrawer from "@/components/CartDrawer";
import Fx from "@/components/Fx";
import ScrollReveal from "@/components/ScrollReveal";
import { abs, SITE_URL, BRAND } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vyomawear — Yoga wear, made where yoga was born",
    template: "%s · Vyomawear",
  },
  description: BRAND.description,
  keywords: [
    "yoga wear",
    "yoga clothes India",
    "made in India activewear",
    "organic yoga wear",
    "natural fibre leggings",
    "yoga leggings Australia",
    "Vyoma",
    "Vyomawear",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vyomawear",
    title: "Vyomawear — Room to breathe.",
    description:
      "Premium yoga wear, made in India — the birthplace of yoga. India & Australia.",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyomawear — Yoga wear, made where yoga was born",
    description:
      "Premium yoga wear, made in India — the birthplace of yoga. India & Australia.",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: "Vyoma", statusBarStyle: "black-translucent" },
};

export const viewport = {
  themeColor: "#14162E",
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      legalName: BRAND.legalName,
      description: "Premium yoga wear, made in India — the birthplace of yoga.",
      slogan: BRAND.slogan,
      url: SITE_URL,
      logo: abs("/icon.svg"),
      image: abs("/opengraph-image"),
      areaServed: ["IN", "AU"],
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
        <Providers>
          <AnnounceBar />
          <Nav />
          {children}
          <footer className="site-footer">
            <div className="container footer-grid">
              <div>
                <span className="footer-mark">Vyoma<span className="mark-thin">wear</span></span>
                <p className="muted small">Vyoma (vee-OH-ma) — Sanskrit for sky, ether, infinite space.</p>
              </div>
              <div className="footer-links">
                <Link href="/#shop">Shop</Link>
                <Link href="/pure">Vyoma Pure</Link>
                <Link href="/fabric">Fabric</Link>
                <Link href="/drops">The Drops</Link>
                <Link href="/sky-series">The Sky Series</Link>
                <Link href="/making">The Making</Link>
                <Link href="/fit">Fit Finder</Link>
                <Link href="/about">Story</Link>
                <Link href="/track">Track order</Link>
                <Link href="/admin">Admin</Link>
              </div>
              <div className="footer-meta">
                <span className="dev">व्योम</span>
                <p className="muted small">Made in India · Shipping to India &amp; Australia</p>
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

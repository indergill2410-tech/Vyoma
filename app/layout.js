import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import Nav from "@/components/Nav";
import AnnounceBar from "@/components/AnnounceBar";
import CartDrawer from "@/components/CartDrawer";
import Fx from "@/components/Fx";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Vyomawear — Yoga wear, made where yoga was born",
    template: "%s · Vyomawear",
  },
  description:
    "Premium yoga wear, made in India — the birthplace of yoga. Shipping to India and Australia. Vyoma (vee-OH-ma): Sanskrit for sky, ether, infinite space.",
  openGraph: {
    title: "Vyomawear — Room to breathe.",
    description:
      "Premium yoga wear, made in India — the birthplace of yoga. India & Australia.",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  appleWebApp: { capable: true, title: "Vyoma", statusBarStyle: "black-translucent" },
};

export const viewport = {
  themeColor: "#14162E",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vyomawear",
  description: "Premium yoga wear, made in India — the birthplace of yoga.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vyoma-imsr.onrender.com",
  logo: "/icon.svg",
  areaServed: ["IN", "AU"],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
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

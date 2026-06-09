import "./globals.css";
import Link from "next/link";
import { Providers } from "@/components/Providers";
import Nav from "@/components/Nav";
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
    "Premium yoga wear, made to order in India — yoga's birthplace. Shipping to India and Australia. Vyoma (vee-OH-ma): Sanskrit for sky.",
  openGraph: {
    title: "Vyomawear — Room to breathe.",
    description:
      "Premium, made-to-order yoga wear from the birthplace of yoga. India & Australia.",
    type: "website",
  },
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
        <Providers>
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

import Link from "next/link";
import CartClearer from "@/components/CartClearer";

export const metadata = { title: "Order confirmed" };

export default function Success() {
  return (
    <main className="center-page">
      <CartClearer />
      <span className="dev">व्योम</span>
      <h1>Yours is on its way to being made.</h1>
      <p>
        It&apos;s official — a receipt and order details are heading to your inbox.
        Your piece is now being crafted in India, and we&apos;ll email you tracking
        the moment it ships. Thank you for choosing something made with care.
      </p>
      <p style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/#shop" className="btn">Keep browsing</Link>
      </p>
    </main>
  );
}

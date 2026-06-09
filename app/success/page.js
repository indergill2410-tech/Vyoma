import Link from "next/link";
import CartClearer from "@/components/CartClearer";

export const metadata = { title: "Order confirmed" };

export default function Success() {
  return (
    <main className="center-page">
      <CartClearer />
      <span className="dev">व्योम</span>
      <h1>Your piece is being made for you.</h1>
      <p>
        Order confirmed — a receipt is on its way to your email. Your piece now
        enters production in Tiruppur, India, and ships with full tracking. Thank you
        for choosing something made, not mass-produced.
      </p>
      <p style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/track" className="btn">Track your order</Link>
        <Link href="/#shop" className="btn ghost">Keep browsing</Link>
      </p>
    </main>
  );
}

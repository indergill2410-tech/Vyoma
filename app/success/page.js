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
        It's official — a receipt is heading to your inbox. Your piece is now being
        crafted in India, and we'll track it all the way to your door.
        Thank you for choosing something made with care.
      </p>
      <p style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/track" className="btn">Track your order</Link>
        <Link href="/#shop" className="btn ghost">Keep browsing</Link>
      </p>
    </main>
  );
}

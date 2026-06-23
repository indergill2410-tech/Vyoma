import Link from "next/link";
import CartClearer from "@/components/CartClearer";
import EditorialImage from "@/components/EditorialImage";

export const metadata = { title: "Order confirmed" };

export default function Success() {
  return (
    <main className="commerce-page success-page">
      <CartClearer />
      <section className="success-confirmation">
        <EditorialImage
          name="fitPackaging"
          alt="Vyoma packaging and order cards ready for delivery"
          className="empty-bag-image"
        />
        <span className="commerce-motif">व्योम</span>
        <p className="commerce-eyebrow">Order confirmed</p>
        <h1>Your piece is on its way to becoming yours.</h1>
        <p>
          Your confirmation is heading to your inbox. From here, the order-status link in that email
          is the easiest way to follow your piece from preparation to tracked delivery.
        </p>
        <div className="commerce-actions center-actions">
          <Link href="/track" className="btn accent">Track your order</Link>
          <Link href="/shop" className="btn ghost">Keep browsing</Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="center-page">
      <span className="dev">व्योम</span>
      <h1>We couldn&apos;t find that piece.</h1>
      <p>It may have moved or sold through. Head back to the collection to keep browsing.</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/#shop" className="btn">Back to the collection</Link>
      </p>
    </main>
  );
}

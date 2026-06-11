import Link from "next/link";

export const metadata = {
  title: "Fabric",
  description:
    "Why we build yoga wear and underwear from natural, plant-grown fibre — and what independent research says about synthetic activewear.",
};

export default function FabricPage() {
  return (
    <main className="article-page">
      <section className="section" style={{ paddingBottom: 24 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="section-eyebrow">Fabric</span>
          <h1 className="article-h1">A field, or a refinery.</h1>
          <p className="lede">
            Every fabric on earth begins in one of two places. Polyester, nylon and
            elastane are plastics — made from oil and finished with industrial
            chemicals. Ours begins the other way: cotton grown in living soil. Here&apos;s
            the research behind why that matters.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "#fff", paddingTop: 40 }}>
        <div className="container article" style={{ maxWidth: 760 }}>
          <h2>What independent testing found</h2>
          <p>
            The Center for Environmental Health (CEH), a US non-profit, lab-tested
            activewear from major brands and reported BPA in some sports bras and tops
            at many times the limit California considers safe — and issued legal
            notices to a long list of well-known labels. BPA is a widely studied
            endocrine-disrupting chemical that can mimic estrogen and interfere with
            the body&apos;s hormonal signalling.
          </p>
          <p className="cite-note">
            Sources: Center for Environmental Health testing &amp; press releases
            (2022–2023); CNN Business reporting, May 2023.
          </p>

          <h2>Why activewear is a special case</h2>
          <p>
            Two things set tight, synthetic activewear apart from a loose cotton shirt.
            Absorption: BPA and phthalates can pass through skin, and warm, damp,
            high-friction conditions — exactly what exercise creates — can increase how
            much migrates from fabric to skin. And contact time: leggings, bras and
            underwear sit tight against the body, often over the most sensitive areas,
            for many hours a day.
          </p>

          <h2>Our standard</h2>
          <p>
            We build to a simple standard: a natural, plant-grown cotton body, with the
            smallest possible amount of stretch only where a garment genuinely needs it
            (like a waistband). Our standard is to exclude the chemicals below —
            verified by independent testing, with certificates published here as each
            batch is issued.
          </p>
          <div className="chem">
            <div className="chem-row"><strong>BPA</strong><span>A well-studied endocrine disruptor used in some synthetic textiles.</span></div>
            <div className="chem-row"><strong>Phthalates</strong><span>Plasticisers used to soften synthetics and in printed graphics.</span></div>
            <div className="chem-row"><strong>PFAS</strong><span>&ldquo;Forever chemicals&rdquo; used for stain- and water-resistance.</span></div>
            <div className="chem-row"><strong>Formaldehyde finishes</strong><span>Used to make fabrics wrinkle-resistant; a known irritant.</span></div>
          </div>

          <div className="honest-box">
            <h3>What we are — and aren&apos;t — saying</h3>
            <p>
              We are not making a medical claim. No item of clothing treats, cures or
              prevents any disease, and we will never tell you otherwise. What we can
              tell you is what our fabric is made of and what it&apos;s tested to be free of
              — and let you decide what you want against your skin all day. Reducing
              avoidable, everyday exposure is a reasonable thing to want. That&apos;s the
              whole idea behind Vyomawear.
            </p>
          </div>

          <h2>Certificates</h2>
          <p className="muted">
            Certificates, not promises. As our fabric is certified — GOTS for organic
            fibre, OEKO-TEX Standard 100 for the finished blend — we&apos;ll publish each one
            here, batch by batch. Until then, we only say what we can prove. Made in India.
          </p>

          <p style={{ marginTop: 36 }}>
            <Link href="/#shop" className="btn">Shop the collection</Link>
            <Link href="/pure" className="btn ghost" style={{ marginLeft: 12 }}>Meet Vyoma Pure</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

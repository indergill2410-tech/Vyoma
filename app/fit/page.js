import FitFinder from "@/components/FitFinder";

export const metadata = {
  title: "Fit Finder",
  description:
    "Two questions and a sky — find your Vyoma size and colourway in under a minute.",
};

export default function FitPage() {
  return (
    <main className="container fit-page">
      <FitFinder />
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { COLOURWAYS, swatchStyle } from "@/lib/catalog";

// A short, conversational fit + colour quiz. All client-side: height sets a base
// size, feel nudges it up/down, and your practice picks a sky (colourway).
const STEPS = [
  {
    key: "height",
    q: "How tall are you?",
    sub: "We'll start with your frame.",
    options: [
      { label: "Under 5'2\"", note: "below 157 cm", value: 0 },
      { label: "5'2\" – 5'5\"", note: "157 – 165 cm", value: 1 },
      { label: "5'6\" – 5'9\"", note: "166 – 175 cm", value: 2 },
      { label: "5'10\" and up", note: "176 cm +", value: 3 },
    ],
  },
  {
    key: "feel",
    q: "How do you like it to feel?",
    sub: "There's no wrong answer.",
    options: [
      { label: "Snug & supportive", note: "a firm, held hug", value: -1 },
      { label: "Just right", note: "true to size", value: 0 },
      { label: "Relaxed & breathy", note: "room to move", value: 1 },
    ],
  },
  {
    key: "practice",
    q: "When do you find your flow?",
    sub: "This one picks your sky.",
    options: [
      { label: "Sunrise flow", note: "soft and warm", value: "dawn-rose" },
      { label: "Midday power", note: "bold and golden", value: "marigold-dusk" },
      { label: "Evening wind-down", note: "deep and calm", value: "night-sky-indigo" },
      { label: "All day, every day", note: "quiet and clean", value: "ether" },
    ],
  },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function FitFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const done = step >= STEPS.length;

  function choose(opt) {
    setAnswers((a) => ({ ...a, [STEPS[step].key]: opt.value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  if (done) {
    const base = answers.height ?? 1;
    const adj = answers.feel ?? 0;
    const size = SIZES[Math.min(SIZES.length - 1, Math.max(0, base + adj))];
    const colour = answers.practice || "night-sky-indigo";
    const cw = COLOURWAYS[colour];

    return (
      <div className="fit">
        <div className="fit-step" key="result">
          <span className="section-eyebrow">Your match</span>
          <h1 className="fit-title">Made for you in {size}.</h1>
          <p className="fit-lead">Your size, and a sky to wear it under.</p>

          <div className="fit-match" style={{ "--cw-base": cw?.base }}>
            <div className="fit-swatch" style={swatchStyle(colour)} aria-hidden="true">
              <span className="fit-size">{size}</span>
            </div>
            <div className="fit-match-body">
              <span className="pdp-label">Your sky</span>
              <h3>{cw?.name}</h3>
              <p className="muted small">
                A recommendation, not a rule — every piece has a full size guide, and
                you know your body best.
              </p>
              <div className="fit-actions">
                <Link href="/product/vyoma-high-rise-legging" className="btn">
                  Shop the legging
                </Link>
                <button className="btn ghost" onClick={restart}>Start over</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const s = STEPS[step];
  return (
    <div className="fit">
      <div className="fit-progress" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
        {STEPS.map((_, i) => (
          <span key={i} className={`fit-dot ${i <= step ? "on" : ""}`} />
        ))}
      </div>
      <div className="fit-step" key={s.key}>
        <span className="section-eyebrow">Fit Finder · {step + 1} of {STEPS.length}</span>
        <h1 className="fit-title">{s.q}</h1>
        <p className="fit-lead">{s.sub}</p>
        <div className="fit-options">
          {s.options.map((opt) => (
            <button key={opt.label} className="fit-option" onClick={() => choose(opt)}>
              <span className="fit-option-label">{opt.label}</span>
              <span className="fit-option-note">{opt.note}</span>
            </button>
          ))}
        </div>
        {step > 0 && (
          <button className="link-btn fit-back" onClick={() => setStep((x) => x - 1)}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

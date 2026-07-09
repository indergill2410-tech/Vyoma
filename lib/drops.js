// The releases calendar. Focused runs, announced to the list first. Status is
// explicit (not date-derived) so badges never go stale. Honest for a
// focused brand: one active edit, with future colour stories on the horizon.
export const DROPS = [
  {
    key: "first-light",
    name: "First Light",
    edition: "Drop 001 · Active edit",
    when: "Available now",
    status: "live",
    blurb:
      "The one that starts it all — the High-Rise Legging and the Studio Top, in the first three skies.",
    colourways: ["dawn-rose", "marigold-dusk", "night-sky-indigo"],
    featured: true,
  },
  {
    key: "monsoon",
    name: "Monsoon",
    edition: "Drop 002",
    when: "Later in 2026",
    status: "planned",
    blurb: "Cooler tones for the rainy season — the Akasha Wrap joins the family.",
    colourways: ["monsoon-grey", "ether", "night-sky-indigo"],
  },
  {
    key: "gold-hour",
    name: "Copper Hour",
    edition: "Drop 003",
    when: "On the horizon",
    status: "planned",
    blurb: "A warm capsule for long evenings — copper, front and centre.",
    colourways: ["marigold-dusk", "dawn-rose", "ether"],
  },
  {
    key: "ether",
    name: "Ether",
    edition: "Drop 004",
    when: "On the horizon",
    status: "planned",
    blurb: "The quiet one. Cleanest lines, lightest layers, the Mat Carry to match.",
    colourways: ["ether", "night-sky-indigo", "monsoon-grey"],
  },
];

export const STATUS_LABEL = {
  upcoming: "Up next",
  live: "Live now",
  planned: "On the horizon",
};

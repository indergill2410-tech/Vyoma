# Art direction — making it feel premium

The single biggest lever between "template" and "iconic" is imagery. The code is
ready for it; this is how to feed it.

## The look
- **Lighting = the sky palette.** Night indigo, dawn rose, monsoon grey, marigold
  dusk, ether. Shoot/grade toward these tones.
- **Editorial, not catalog.** Negative space, real crops, motion, calm.
- **India, with pride.** The setting, the light, the craft — lead with origin.
- Consistent model + styling across a product's shots (front, detail, in-motion).

## Hero film (optional, high impact)
`SkyHero` accepts a video:
```jsx
<SkyHero video="/hero.mp4" poster="/hero-poster.jpg"> … </SkyHero>
```
Drop a short, silent, looping clip (a model flowing as light shifts night→dawn)
at `public/hero.mp4`. Without it, the animated constellation canvas is used.
Keep it < 6 MB, 1080p, ~8–12s, muted.

## Product photos
- Per product: an on-model shot + a detail shot (more angles = richer gallery).
- Routes: a Shopify photo app (Botika/Pebblely) → auto-appears; or
  `scripts/generate-images.mjs` (Gemini/Imagen) → commit to
  `public/products/<slug>/`.
- Until photos exist, the branded colourway swatch shows — never broken.

## The brand stamp
Every image carries a crisp **व्योम Vyoma** corner mark (CSS), so branding is
sharp regardless of the photo.

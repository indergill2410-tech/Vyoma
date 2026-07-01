# Art direction — making it feel premium

The single biggest lever between "template" and "iconic" is imagery. The code is
ready for it; this is how to feed it.

## Permanent positioning

Vyomawear should feel like the luxury house of activewear. Internally, use
LV/Dior-level activewear as the creative shorthand, but never say that in public
site copy. The feeling should come through quiet branding, immaculate fit,
cotton-rich texture, restraint, joyful colour and clothes that solve real
movement-day problems.

## The look
- **Lighting = the sky palette.** Night indigo, dawn rose, monsoon grey, marigold
  dusk, ether. Shoot/grade toward these tones.
- **Editorial, not generic catalogue.** Negative space, real crops, motion, calm.
- **Atelier polish.** Every garment should look precise, tactile and expensive.
- **Origin with restraint.** The setting, light and craft can carry the story
  without repeating origin claims across shopping pages.
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

## Branding on images
No floating stamps, UI labels, captions, corner marks or logo boxes should sit
on top of product photos. Branding should appear as a real garment detail:
embroidery, woven label, screen print, waistband mark or stitched patch.

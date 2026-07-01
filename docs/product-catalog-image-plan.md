# Vyomawear Product Catalogue Image Plan

## Scope

Add to the current catalogue. Do not remove existing products, current product photos, existing swatches, or existing shop categories.

## Brand Positioning Memory

Vyomawear should feel like the luxury house of activewear: refined, desirable, precise and quietly powerful. Internally, the shorthand is LV/Dior-level activewear energy, but customer-facing copy must not say that directly and must not mention millionaires or billionaires.

Express the promise through atelier-level finishing, cotton-rich comfort, quiet branding, strong silhouette, joyful colour made expensive through restraint, and activewear that solves real world problems: synthetic feel, cling, rough seams, loud branding, weak drape and clothes that fail after the gym or studio.

## Catalogue Structure

- Women: leggings, shorts, skorts, tops, bras, sets, Pure underwear, layers.
- Men: practice tee, movement short, off-duty jogger, meditation hoodie, cotton-rich gym tees, muscle tank, training short, track pant, performance jogger, warmup hoodie, recovery sweatshirt, Pure trunk, Pure brief.
- Unisex: wrap, mat carry, socks and shared comfort layers where appropriate.

## Required Shots Per Product

Each product should have three committed assets under `public/products/<slug>/`:

- `model.png` or `model.webp`: front/on-model catalogue shot.
- `back.png` or `back.webp`: back-view fit shot.
- `detail.png` or `detail.webp`: fabric, seam, stitching and logo close-up.

## Colour Direction

The clothing should feel super premium and joyful, not muted or generic. Keep the existing Vyoma sky palette, then lead more catalogue images with brighter colour stories:

- Clear-sky blue
- Mango pop
- Hibiscus pink
- Parrot green
- Peacock teal
- Saffron sun
- Lotus coral
- Twilight amethyst

Use rich but tasteful saturation, polished natural-fibre texture and elevated tailoring. Bright pieces should look expensive, clean and intentional, never cheap, plastic or neon.

## Morning-To-Night Theme Direction

All catalogue, audience, Pure and product-detail pages must follow a morning-to-night Vyoma sky journey. The page should begin in bright morning light, move through clear daylight and warm gold/rose sunset, then settle into deep blue night lower on the page.

Rules:

- No flat full-page white or plain paper backgrounds on shop pages.
- Page sections should be transparent or softly translucent so the sky atmosphere remains visible.
- White is allowed for cards, forms, modals and product information panels only.
- Hero sections should feel like morning: bright, clean, airy and premium.
- Mid-page catalogue and editorial bands should introduce warm daylight, marigold and rose sunset tones.
- Lower-page sections can deepen toward dusk and night with ink blue and violet, while keeping text readable.
- Navigation, section bands, catalogue grids and PDP pages should all feel part of the same morning-to-night system.

## Typography Direction

Use the homepage typography system across the whole site:

- Fraunces for brand headings, page titles, section titles, product names and elevated text moments.
- Karla for body copy, buttons, labels, chips, product metadata and forms.
- Eyebrows and chips should keep the homepage feel: uppercase is fine, but avoid wide letter spacing.
- Catalogue hero titles should feel closer to the homepage hero: bigger, confident, serif-led and not overly narrow.
- Product cards should use the same clean rhythm: serif product names, simple sans labels and calm readable body copy.

## Origin Copy Direction

Keep the India/origin story available in deeper story/making contexts, but do not repeat `Made in India` across the shopping UI. On shop, catalogue, cart, product cards, product-detail trust rows and footer/announcement chrome, prefer quieter phrases such as:

- Small-batch care
- Natural fibre first
- Tracked delivery
- Built to last
- Soft natural fibres

## Model Direction

Men's catalogue images should use an exceptionally handsome adult male model, age 25-35, with a sharp jawline, polished grooming, athletic lean build, confident calm expression and premium fashion presence.

Women's catalogue images should use a very attractive adult female model, age 25-35, with premium grooming, confident calm expression, athletic lean build and tasteful aspirational presence.

All imagery must be tasteful, product-first and non-explicit.

## Logo Direction

The Vyoma mark must be treated as a physical garment detail, not a floating watermark.

Use both:

- `व्योम`
- `Vyoma`

Preferred treatments:

- Tees and tanks: small woven hem label or subtle chest mark.
- Hoodies and wraps: chest or neckline embroidery.
- Leggings, shorts, skorts and joggers: waistband mark.
- Bras: elastic underband mark.
- Pure underwear: waistband mark, tasteful and non-explicit.
- Socks and accessories: cuff, front or visible label.
- Detail shots: close-up of the real label, embroidery, stitching or printed patch.

If an image model cannot render the exact logo text, it should leave a clean blank label area rather than invent random letters.

Do not paste UI text, floating logo boxes, watermarks, captions, sale chips or label badges on top of product photos. In particular, do not overlay `New`, `First drop`, `व्योम Vyoma`, `Vyoma Organic Movement Wear`, or `Organic movement wear` on the image surface. Branding should appear as a real garment detail in the photo, or as normal card/page copy outside the photo.

## QA Checklist

- Existing catalogue and current pictures are still present.
- Men and women products appear in the correct catalogue pages.
- `/shop` still contains the original categories, plus Men and Women entry points.
- `/men` and `/women` render product grids.
- Product pages show audience-aware size guides.
- Logo spelling is correct: `व्योम` and `Vyoma`.
- No generated random letters or misspelled logo text is visible.
- No white logo badges, floating stamps, captions, `New` chips, `First drop` chips or `Organic movement wear` overlays sit on top of product photos.
- Underwear imagery is tasteful, non-explicit and product-first.
- Morning-to-night sky atmosphere is visible across `/shop`, `/men`, `/women`, `/pure` and PDP pages.
- Homepage typography style is used across catalogue, Pure, PDP, cart and shared commerce components.
- Repeated `Made in India` callouts are minimized in the shopping flow.
- Mobile cards do not overlap text or controls.
- Desktop PDP gallery renders without layout shift.

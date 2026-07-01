# Vyomawear Product Catalogue Image Plan

## Scope

Add to the current catalogue. Do not remove existing products, current product photos, existing swatches, or existing shop categories.

## Catalogue Structure

- Women: leggings, shorts, skorts, tops, bras, sets, Pure underwear, layers.
- Men: practice tee, movement short, off-duty jogger, meditation hoodie, Pure trunk, Pure brief.
- Unisex: wrap, mat carry, socks and shared comfort layers where appropriate.

## Required Shots Per Product

Each product should have three committed assets under `public/products/<slug>/`:

- `model.png` or `model.webp`: front/on-model catalogue shot.
- `back.png` or `back.webp`: back-view fit shot.
- `detail.png` or `detail.webp`: fabric, seam, stitching and logo close-up.

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

If an image model cannot render the exact logo text, it should leave a clean blank label area rather than invent random letters. The site renders a crisp deterministic Vyoma applique over catalogue and PDP imagery as a safety layer.

## QA Checklist

- Existing catalogue and current pictures are still present.
- Men and women products appear in the correct catalogue pages.
- `/shop` still contains the original categories, plus Men and Women entry points.
- `/men` and `/women` render product grids.
- Product pages show audience-aware size guides.
- Logo spelling is correct: `व्योम` and `Vyoma`.
- No generated random letters or misspelled logo text is visible.
- Underwear imagery is tasteful, non-explicit and product-first.
- Mobile cards do not overlap text or controls.
- Desktop PDP gallery renders without layout shift.

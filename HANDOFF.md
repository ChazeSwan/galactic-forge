# Galactic Forge — Session Handoff
**Date:** 2026-03-13

---

## What Has Been Completed

### Phases 1–3 — Done
- Shopify CLI installed, authenticated, skeleton theme initialized
- All 10 products in Shopify admin (5 Light Side, 5 Dark Side, variants set up)
- Full design system locked in (see CLAUDE.md Locked Decisions)

### Phase 4 — Complete (Light Side Homepage)

| Section | Status | Files |
|---|---|---|
| Entry screen (crawl + split) | ✅ | `sections/path-chooser.liquid`, `assets/path-chooser.css/js` |
| Hero | ✅ | `sections/homepage-hero.liquid`, `assets/homepage-hero.css` |
| Categories | ✅ | `sections/homepage-categories.liquid`, `assets/homepage-categories.css` |
| Featured Products | ✅ | `sections/homepage-products.liquid`, `assets/homepage-products.css` |
| Features "Why the Light Side?" | ✅ | `sections/homepage-features.liquid`, `assets/homepage-features.css` |
| Testimonials | ✅ | `sections/homepage-testimonials.liquid`, `assets/homepage-testimonials.css` |
| Section dividers | ✅ | `sections/section-divider.liquid`, `assets/section-divider.css` |
| Header / Navbar | ✅ | `sections/header.liquid`, `assets/header.css`, `assets/header.js` |
| Footer | ✅ | `sections/footer.liquid`, `assets/footer.css` |

### This Session — Light/Dark Side Toggle (complete)
- Logo area restructured: sabers left, text column right (`div.gf-nav__logo-wrap`)
- `sections/header.liquid` — toggle buttons live in `.gf-nav__logo-col` below store name (outside anchor — valid HTML)
- `assets/header.css` — 3D gameboy-style pill buttons; gold = Light Side, navy = Dark Side; blue/red pill outline + box-shadow signals active; hover glow + press `translateY(1px)` animation
- `assets/header.js` — `applyGfSide()` sets `data-gf-side` on body + localStorage; listens for `gf:sideChosen` event from path-chooser so toggle activates right after entry screen; no `|| 'light'` fallback — first-time visitors always see the path chooser

---

## Decisions That Are Locked In

### Design system
- **Fonts:** Cinzel (headings, eyebrows) · Inter (body/subtext)
- **Colors:** Background `#F7FAFC` · Ink `#1A1A2E` · Jedi blue `#2B6CB0` · Blue light `#90CDF4` · Gold `#C9A84C` · Hover blue `#2c5282`
- **Alternating backgrounds:** `#F7FAFC` (categories, features) / `#ffffff` (products, testimonials)
- **Content width:** `width: 80%; max-width: 1100px; margin: 0 auto` — class `gf-inner`
- **Full-bleed:** `full-width` class on all section outer elements, hero, header, footer, dividers

### Header
- Sticky via `.shopify-section-group-header-group { position: sticky; top: 0 }`
- Topbar hides on scroll using `top: -34px` on header group — NO height collapse (prevents shutter)
- Gold phone pill `519-574-4734`, Shop By dropdown, mobile drawer from left
- Side toggle: gold pill = Light Side, navy pill = Dark Side; active state = colored outline + inner tint + colored bottom shadow; hover = outer glow bloom; press = sink 1px

### Footer
- Wavy SVG divider background matches section above it (`#ffffff` — testimonials)
- 4-col desktop grid, flex-column mobile stacking
- Dev reset button "↺ Replay Intro" in footer legal bar — **remove before going live**
- Footer text alignment flagged by Chaz for a future tweak pass

### Entry / localStorage
- Returning visitors skip the entry screen entirely (localStorage `gf-side` key)
- No default side — missing localStorage always shows path chooser
- Page always scrolls to top on load (`window.scrollTo(0, 0)` in path-chooser.js)

---

## What Is Up Next

1. **Collection page** — next page to build
   - **Architecture:** single `sections/collection.liquid` adapts via `data-gf-side` (Light and Dark Side share one file, CSS handles visual differences)
   - **Layout TBD:** Chaz is sourcing design inspiration — will confirm grid vs list on return
   - **Banner/hero strip:** confirmed — wide short banner at top of page
   - **Sort:** simple sort dropdown, no filters
   - Chaz is generating banner images with these prompts:
     - Light Side collection banner: Jedi temple interior, golden hour, wide cinematic, no characters
     - Lightsabers banner: lightsaber hilts on aged stone, product hero shot
     - Figures/Collectibles banner: Jedi council chamber, empty, atmospheric

2. **Dark Side (Sith) homepage sections** — after collection page

3. **Phase 5 polish** (after all pages):
   - Lightsaber ignition animation on scroll (Intersection Observer API)
   - Product images — upload to Shopify admin
   - Footer text alignment tweaks (Chaz-flagged)
   - Minor tweaks as Chaz identifies them
   - Remove dev reset button from footer

---

## Key Reference Files

- `_design-refs/DESIGN-BRIEF.md` — full spec for all sections
- `_design-refs/full-page-preview.html` — visual reference
- `_design-refs/coruscant_night.jpg` — hero background image

---

## Unresolved Questions

- Collection page grid vs list layout — Chaz deciding after design inspiration search
- Lightsaber part style names (placeholder "Style A / Style B") — decide when building product page
- `gf-inner` content width class — not yet applied sitewide on all older sections
- Dark Side toggle: should `data-gf-side` update sitewide on collection/product pages for returning visitors? Yes — already handled by header.js `applyGfSide` on load
- Dev reset button in footer — remove before going live

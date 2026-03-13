# Galactic Forge — Session Handoff
**Date:** 2026-03-12

---

## What Has Been Completed

### Phases 1–3 — Done
- Shopify CLI installed, authenticated, skeleton theme initialized
- All 10 products in Shopify admin (5 Light Side, 5 Dark Side, variants set up)
- Full design system locked in (see CLAUDE.md Locked Decisions)

### Phase 4 — Homepage (Light Side) — Nearly Complete

| Section | Status | Files |
|---|---|---|
| Entry screen (crawl + split) | ✅ | `sections/path-chooser.liquid`, `assets/path-chooser.css/js` |
| Hero | ⚠️ Needs redesign | `sections/homepage-hero.liquid`, `assets/homepage-hero.css` |
| Categories | ✅ | `sections/homepage-categories.liquid`, `assets/homepage-categories.css` |
| Features "Why the Light Side?" | ❌ Not built | — |
| Featured Products | ✅ | `sections/homepage-products.liquid`, `assets/homepage-products.css` |
| Testimonials | ✅ | `sections/homepage-testimonials.liquid`, `assets/homepage-testimonials.css` |
| Section dividers | ❌ Not built | — |
| Header / Navbar | ✅ | `sections/header.liquid`, `assets/header.css`, `assets/header.js` |
| Footer | ✅ | `sections/footer.liquid`, `assets/footer.css` |

---

## Decisions That Are Locked In

### Design system
- **Fonts:** Cinzel (headings, eyebrows) · Crimson Pro italic (body subtext) — comparison in progress
- **Colors:** Background `#F7FAFC` · Ink `#1A1A2E` · Jedi blue `#2B6CB0` · Blue light `#90CDF4` · Gold `#C9A84C` · Hover blue `#2c5282`
- **Content width:** `width: 80%; max-width: 1100px; margin: 0 auto` — class `gf-inner` (not yet applied sitewide)
- **Full-bleed:** `full-width` class on topbar, nav, drawer, footer, dividers

### Header
- Sticky via `.shopify-section-group-header-group { position: sticky; top: 0; z-index: 100 }`
- Topbar hides on scroll (height+opacity transition), nav gains box-shadow on scroll
- Gold phone pill `519-574-4734` — hover darkens gold, no fill
- JS in separate `assets/header.js`, loaded with `defer`

### Footer
- Wavy SVG divider (page bg → navy), 4-col desktop grid, flex-column mobile stacking
- Shop + H&S use `display: contents` on desktop so all 4 columns sit in one row
- Mobile: col-group becomes `display: grid; 1fr 1fr` (Shop+H&S side by side), newsletter+account below centered
- Gold `border-top` separates bottom bar (same navy, no darker background)
- Bottom bar: copyright + legal left, social icons (X, Instagram, YouTube, Facebook) right

### Font comparison (not committed yet — decision needed at start of next session)
- Hero subtext: Crimson Pro `1.15rem`
- Testimonial quotes: Inter `0.9rem` (Obi-Wan + Ren Talos) · Crimson Pro pending on Yoda for side-by-side
- **First task next session:** compare and pick one body font, then apply it sitewide

---

## What Is Up Next

In priority order:

1. **Font decision** — compare Crimson Pro vs Inter across hero + testimonials, pick one, apply sitewide to all subtext/body elements
2. **Hero redesign** — full-bleed Coruscant night image (`_design-refs/coruscant_night.jpg`), left-aligned text, dark overlay + Force glow, location credit bottom-right. Reference: `_design-refs/full-page-preview.html`
3. **Section dividers** — `snippets/section-divider.liquid`, lightsaber hilt centered on two fading blue lines, render between every section in `templates/index.json`. Spec in DESIGN-BRIEF.md.
4. **Features section** — "Why the Light Side?", 4-column grid, Cinzel titles, Crimson Pro italic descriptions. Spec in DESIGN-BRIEF.md.
5. **Commit everything** — header + footer + homepage sections together once font is decided
6. **Full page review** — Chaz reviews full homepage before moving to Collection page

---

## Key Reference Files

- `_design-refs/DESIGN-BRIEF.md` — full spec for all remaining sections
- `_design-refs/full-page-preview.html` — visual reference for hero, dividers, features
- `_design-refs/coruscant_night.jpg` — hero background image (check if file exists in refs folder)

---

## Unresolved Questions

- Lightsaber part style names (placeholder "Style A / Style B") — decide when building product page
- Dark Side (Sith) homepage — after all Light Side sections complete
- Returning visitor localStorage skip logic — currently always shows entry screen on refresh
- `gf-inner` content width class — not yet applied sitewide, do on next styling pass

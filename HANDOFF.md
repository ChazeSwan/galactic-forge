# Galactic Forge — Session Handoff
**Date:** 2026-03-11

## What Has Been Completed

- **Phase 1** — Shopify CLI installed, authenticated, skeleton theme initialized and connected to dev store
- **Phase 2** — All 10 products added to Shopify admin:
  - Light Side: Jedi Poster, R2-D2, Clone Trooper (2 variants), Luke Skywalker, Luke's Lightsaber (8 variants)
  - Dark Side: Sith Poster, Imperial Probe Droid, Battle Droid (2 variants), Darth Vader, Vader's Lightsaber (8 variants)
- **Phase 3** — All design decisions locked in and saved to CLAUDE.md
- **Phase 4 — IN PROGRESS** — Entry screen complete + homepage hero complete:
  - `templates/index.json` — updated to load path-chooser + homepage-hero sections
  - `sections/path-chooser.liquid` — full entry screen HTML
  - `assets/path-chooser.css` — entry screen styles
  - `assets/path-chooser.js` — sequence logic + FOUC fix (data-gf-side now set before fade starts)
  - `snippets/icon-jedi-crest.liquid` — lightsaber SVG (blue blade, animated on hover)
  - `snippets/icon-sith-emblem.liquid` — lightsaber SVG (red blade, animated on hover)
  - `sections/homepage-hero.liquid` — hero HTML (eyebrow, headline, subtext, CTA button)
  - `assets/homepage-hero.css` — hero styles (Cinzel font, 70vh, flex centering, Force glow, button, mobile)

## Decisions That Are Locked In

- Entry experience: full screen split (Light Side left / Dark Side right)
- Animation sequence: black screen → "A long time ago..." (3.5s) → perspective crawl (12s) → split screen
- Crawl font: Oswald, color: #FFD700 — width and scroll end point manually adjusted by Chaz
- Side choice saved to localStorage key `gf-side`, applied as `data-gf-side` on `<body>` immediately on click (before fade)
- Homepage hero: 70vh tall banner, Cinzel font, Force blue radial glow, solid blue CTA button
- CSS architecture: all homepage section styles gated on `body[data-gf-side="light"]`
- Teaching approach: build HTML structure first, then add CSS one rule at a time with explanations

## What Is Up Next

Homepage sections (Light Side / Jedi) — build in this order, one at a time:
1. **Categories** (`sections/homepage-categories.liquid` + `assets/homepage-categories.css`) — 3-column grid: Lightsabers, Figures, Collectibles
2. **Features** (`sections/homepage-features.liquid` + `assets/homepage-features.css`) — 4 Jedi feature highlights
3. **Testimonials** (`sections/homepage-testimonials.liquid` + `assets/homepage-testimonials.css`) — Obi-Wan, Yoda, Ahsoka quotes with circular portrait placeholders
4. **Featured Products** (`sections/homepage-products.liquid` + `assets/homepage-products.css`) — 4-product grid pulling from `collections['light-side']`, placeholder images for now

## Unresolved Questions

- Lightsaber part style names (placeholder "Style A / Style B") — finalize when building product page
- Dark Side (Sith) homepage sections — build after all Light Side sections are complete
- Returning visitor flow — currently always shows entry screen on refresh (no localStorage skip logic yet)

# Galactic Forge — Session Handoff
**Date:** 2026-03-09

## What Has Been Completed

- **Phase 1** — Shopify CLI installed, authenticated, skeleton theme initialized and connected to dev store
- **Phase 2** — All 10 products added to Shopify admin:
  - Light Side: Jedi Poster, R2-D2, Clone Trooper (2 variants), Luke Skywalker, Luke's Lightsaber (8 variants)
  - Dark Side: Sith Poster, Imperial Probe Droid, Battle Droid (2 variants), Darth Vader, Vader's Lightsaber (8 variants)
- **Phase 3** — All design decisions locked in and saved to CLAUDE.md
- **Phase 4 — IN PROGRESS** — Entry screen fully built and wired up:
  - `templates/index.json` — updated to load `path-chooser` section on homepage
  - `sections/path-chooser.liquid` — full entry screen HTML: stars, intro, crawl, skip button, split panels
  - `assets/path-chooser.css` — complete entry screen styles
  - `assets/path-chooser.js` — full sequence logic: intro → crawl → split screen, skip button, panel clicks
  - `snippets/icon-jedi-crest.liquid` — lightsaber SVG (blue blade, animated on hover)
  - `snippets/icon-sith-emblem.liquid` — lightsaber SVG (red blade, animated on hover)

## Decisions That Are Locked In

- Entry experience: full screen split (Light Side left / Dark Side right)
- Animation sequence: black screen → "A long time ago..." (3.5s) → perspective crawl (12s) → split screen
- Crawl content: "GALACTIC FORGE" title + 3 body paragraphs + "A PATH MUST BE CHOSEN."
- Crawl font: Oswald (neutral pre-choice font, loaded via Google Fonts)
- Crawl text color: #FFD700 (classic Star Wars crawl gold)
- Perspective crawl: `rotateX(25deg)` tilt, scrolls from `translateY(80vh)` to `translateY(-60vh)`
- Skip button: bottom-right corner, Oswald font, subtle opacity — hides when split screen appears
- Hover: 60/40 panel expand using CSS flexbox + `:has()`
- Lightsaber emblems: vertical SVG, blade grows from hilt upward on hover (`scaleY` + `transform-origin: bottom center`)
- Mobile: lightsaber blades ignited immediately (`@media (hover: none)`)
- Side blade edge lines: removed (replaced by central lightsaber emblem)
- Center divider line: removed
- Starfield background: 34 CSS `radial-gradient` dots, three sizes (0.5px / 1px / 1.5px)
- Side choice saved to `localStorage` key `gf-side` and applied as `data-gf-side` on `<body>`
- Custom event `gf:sideChosen` dispatched on choice (for homepage sections to listen to)

## What Is Up Next

1. **Tweak crawl** — Chaz to manually adjust:
   - Width: `.gf-crawl__text { width: 55%; }` in `assets/path-chooser.css`
   - Scroll end point: `@keyframes gfCrawl` `to` translateY value (currently `-60vh`) in same file
2. **Build homepage sections** — hero content that appears after the entry screen fades out
3. **Lightsaber configurator product page** — comes last (most complex)

## Unresolved Questions

- Lightsaber part style names (currently placeholder "Style A / Style B") — finalize when building product page
- Crawl width and scroll end position — Chaz reviewing manually next session

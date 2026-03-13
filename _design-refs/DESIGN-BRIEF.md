Galactic Forge — Light Side Design Brief
Status
Full page review pending. Three remaining tasks before review:

Hero (new full-bleed Coruscant design)
Dividers (between all sections)
Features / "Why the Light Side?" section


Color Palette

Background: #F7FAFC
Ink/dark: #1A1A2E
Jedi blue: #2B6CB0
Blue light: #90CDF4
Gold accent: #C9A84C
Blue hover/dark: #2c5282

Typography

Headings: Cinzel (400, 600, 700)
Body/italic: Crimson Pro (italic, 300, 400)

Content Width System

Full bleed: hero backgrounds, dividers, footer wave, topbar
Inner content: width: 80%; max-width: 1100px; margin: 0 auto; — class gf-inner


Sections (in order)
main → hero → categories → features → products → testimonials → footer
Defined in templates/index.json

Navbar ✅ IMPLEMENTED

Topbar: #1A1A2E background, hides on scroll (height + opacity transition)
Main nav: sticky, gains box-shadow once topbar is hidden (.is-stuck)
Logo: two clashing lightsabers (blue left #2B6CB0, green right #38A169) — blades grey at rest, colour on hover — + "Galactic Forge" / "Light Side" in gold subtitle
Links: Shop By (dropdown), The Jedi Order, Jedi Academy — left-aligned after logo
Inspiration link: REMOVED
Right side: gold phone number 519-574-4734, search, account, cart, hamburger
Mobile drawer: slides from left, Shop By expands inline, phone number at top, secondary links at bottom
Breakpoint: 900px
Reference: _design-refs/navbar.html


Hero ⬜ TODO

Full bleed, min-height: 70vh
Background image: coruscant_night_.jpg (in _design-refs/)
CSS on image: filter: brightness(0.45) contrast(1.2) saturate(0.8)
Overlay: linear-gradient(to right, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.55) 45%, rgba(10,15,30,0.15) 100%)
Force glow: radial-gradient(ellipse at 25% 60%, rgba(43,108,176,0.18) 0%, transparent 60%)
Content uses .gf-inner (80% width)
Text: left-aligned, white title, #90CDF4 span on "Legend.", italic Crimson Pro subtext
Eyebrow: "Light Side Artifacts" in gold with ::before line
Button: filled #2B6CB0, hover goes transparent with blue text
Location credit: bottom right — "Planet / CORUSCANT" in gold + muted white
Reference: _design-refs/full-page-preview.html


Dividers ⬜ TODO

Create snippets/section-divider.liquid
Use {% render 'section-divider' %} between every section in template
Full bleed background #F7FAFC, inner width 80%
Design: single lightsaber hilt centered on two fading blue lines
Left line: linear-gradient(to right, transparent, rgba(43,108,176,0.25))
Right line: linear-gradient(to left, transparent, rgba(43,108,176,0.25))
Hilt SVG (viewBox 0 0 40 200, width 10px, height 52px):

Guard: rgba(43,108,176,0.45)
Grip: rgba(74,85,104,0.5)
Grip rings: rgba(153,153,153,0.45)
Pommel: rgba(85,85,85,0.4)


Reference: _design-refs/full-page-preview.html


Categories ✅ IMPLEMENTED

3-column CSS grid
Dark blue gradient cards, gold eyebrow, Jedi crest icon top-right
Blue border + lift on hover, "Shop Now" slides up
Eyebrow: "Browse the Archive"
Reference: existing sections/homepage-categories.liquid


Features / Why the Light Side? ⬜ TODO

4-column grid
Eyebrow: "The Jedi Way"
Title: "Why the Light Side?"
Four items: Forged with Precision, Rooted in the Force, Built to Last, Ships Across the Galaxy
Each: symbol icon (blue, subtle), title in Cinzel uppercase, Crimson Pro italic description
Background: #F7FAFC
Reference: _design-refs/full-page-preview.html


Products ✅ IMPLEMENTED (placeholder images)

4-column grid, pulls from collections['light-side']
Eyebrow: "From the Vault"
Title: "Featured Artifacts"
Button label: "View Relic" (not "Shop Now")


Testimonials ✅ IMPLEMENTED

3 cards: Obi-Wan Kenobi (blue), Yoda (green), Ren Talos (purple)
Portrait sits -36px above card, blue Force ring glow on hover
Lightsaber SVG replaces quote mark
60% horizontal rule before attribution
Gold rank text, em dash prefix via ::before
Prev/next nav arrows below grid
Eyebrow: "Trusted by the Galaxy" → "Voices of the Force"


Footer ✅ IMPLEMENTED

Wave SVG divider from page background into footer
Dark #1A1A2E background
4-column grid: Shop, Help & Support, Newsletter (centered), Account
Newsletter: "Stay In The Know" — Cinzel heading, Crimson Pro italic sub, inline email form
Bottom bar: copyright + legal links left, social icons right (X, Instagram, YouTube, Facebook)
Reference: _design-refs/footer.html


Key Files for tomorrow

_design-refs/full-page-preview.html — full page with hero, all sections, dividers
_design-refs/coruscant_night.jpg — hero background image
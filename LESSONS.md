# Galactic Forge — Lessons Learned

Mistakes and gotchas we've hit. Check this before making assumptions.

---

## Shopify / Liquid

### asset_url is NOT needed for background images in CSS files
**Mistake:** Suggested using an inline `style` attribute with `| asset_url` to set a background image, claiming plain CSS `url()` wouldn't work.
**Reality:** CSS files in `assets/` are served from the same CDN folder as images. A plain relative `url('filename.jpg')` resolves correctly — no Liquid filter needed.
**Use `| asset_url` only when:** referencing an asset from inside a `.liquid` file (HTML/template context).
**Example of what works fine in a CSS file:**
```css
.gf-banner {
  background-image: url('collections_hero.jpg');
}
```

---

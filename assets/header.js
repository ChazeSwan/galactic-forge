/* header.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Galactic Forge header interactions.
 *
 * Handles:
 *   - Topbar hide/show on scroll
 *   - Nav shadow when sticky (is-stuck class)
 *   - Desktop Shop By dropdown toggle
 *   - Mobile hamburger → drawer open/close
 *   - Mobile Shop By sub-menu accordion
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  var topbar        = document.getElementById('gfTopbar');
  var nav           = document.getElementById('gfNav');
  var hamburgerBtn  = document.getElementById('hamburgerBtn');
  var mobileDrawer  = document.getElementById('mobileDrawer');
  var shopByBtn     = document.getElementById('shopByBtn');
  var shopByDD      = document.getElementById('shopByDropdown');
  var mobileShopBtn = document.getElementById('mobileShopBtn');
  var mobileShopSub = document.getElementById('mobileShopSub');

  /* ── Scroll: hide topbar, add shadow to sticky nav ── */
  window.addEventListener('scroll', function () {
    var topbarH = topbar ? topbar.scrollHeight : 0;
    if (window.scrollY > topbarH) {
      if (topbar) topbar.classList.add('is-hidden');
      nav.classList.add('is-stuck');
    } else {
      if (topbar) topbar.classList.remove('is-hidden');
      nav.classList.remove('is-stuck');
    }
  });

  /* ── Hamburger: toggles mobile drawer open/close ── */
  hamburgerBtn.addEventListener('click', function () {
    var open = mobileDrawer.classList.toggle('is-open');
    hamburgerBtn.classList.toggle('is-open', open);
    hamburgerBtn.setAttribute('aria-expanded', open);
    mobileDrawer.setAttribute('aria-hidden', !open);
  });

  /* ── Desktop dropdown: Shop By toggle ── */
  shopByBtn.addEventListener('click', function () {
    var open = shopByDD.classList.toggle('is-open');
    shopByBtn.classList.toggle('is-open', open);
    shopByBtn.setAttribute('aria-expanded', open);
  });

  /* Close dropdown when clicking anywhere outside it */
  document.addEventListener('click', function (e) {
    if (!shopByBtn.contains(e.target) && !shopByDD.contains(e.target)) {
      shopByDD.classList.remove('is-open');
      shopByBtn.classList.remove('is-open');
      shopByBtn.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Mobile sub-menu: Shop By accordion ── */
  mobileShopBtn.addEventListener('click', function () {
    var open = mobileShopSub.classList.toggle('is-open');
    mobileShopBtn.setAttribute('aria-expanded', open);
  });
})();

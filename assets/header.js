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
  var headerGroup   = document.querySelector('.shopify-section-group-header-group');
  var hamburgerBtn  = document.getElementById('hamburgerBtn');
  var mobileDrawer  = document.getElementById('mobileDrawer');
  var shopByBtn     = document.getElementById('shopByBtn');
  var shopByDD      = document.getElementById('shopByDropdown');
  var mobileShopBtn = document.getElementById('mobileShopBtn');
  var mobileShopSub = document.getElementById('mobileShopSub');

  /* ── Scroll: slide header group up by topbar height, add nav shadow ──
     Sliding the whole group via `top` avoids height/reflow changes that
     cause a layout shutter when scrolling back toward the top. */
  window.addEventListener('scroll', function () {
    var topbarH = topbar ? topbar.scrollHeight : 0;
    var pastTopbar = window.scrollY > topbarH;

    if (topbar) topbar.classList.toggle('is-hidden', pastTopbar);
    if (headerGroup) headerGroup.classList.toggle('topbar-hidden', pastTopbar);
    nav.classList.toggle('is-stuck', pastTopbar);
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

  /* ── Side toggle: switch body[data-gf-side] + persist to localStorage ──
     data-gf-side on <body> is the single source of truth for theming.
     All section CSS is already gated on body[data-gf-side="light/dark"],
     so flipping the attribute re-themes the page instantly — no reload. */
  var toggleBtns = document.querySelectorAll('.gf-side-toggle__btn');

  function applyGfSide(side) {
    /* 1. Stamp the chosen side onto <body> so CSS selectors can react */
    document.body.setAttribute('data-gf-side', side);
    /* 2. Persist so returning visitors land on their chosen side */
    localStorage.setItem('gf-side', side);
    /* 3. Light up the active button, dim the inactive one */
    toggleBtns.forEach(function (btn) {
      var isActive = btn.dataset.side === side;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  /* On page load — restore saved side only if the user has already chosen.
     If nothing is stored, do nothing: path-chooser.js will run the intro
     and fire gf:sideChosen when the visitor picks. */
  var storedSide = localStorage.getItem('gf-side');
  if (storedSide) applyGfSide(storedSide);

  /* Listen for path-chooser.js to dispatch its custom event after the entry
     screen fades out — that's when we know a first-time visitor has chosen. */
  document.addEventListener('gf:sideChosen', function (e) {
    applyGfSide(e.detail.side);
  });

  /* Wire each button */
  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyGfSide(btn.dataset.side);
    });
  });
})();

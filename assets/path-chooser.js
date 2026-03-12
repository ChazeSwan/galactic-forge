/**
 * path-chooser.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Drives the Galactic Forge entry screen sequence:
 *
 *   1. "A long time ago..." intro animates for 3.5s via CSS, then fades out.
 *   2. Crawl fades in and scrolls for 8s (CSS animation), then fades out.
 *   3. Split-screen panels fade in — visitor chooses Light Side or Dark Side.
 *   4. Skip button cancels all timers and jumps straight to the split screen.
 *   5. Panel click saves the choice to localStorage and fades out the entry screen.
 *
 * localStorage key : 'gf-side'        →  value: 'light' | 'dark'
 * Custom event     : 'gf:sideChosen'  →  detail: { side }
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── Config ──────────────────────────────────────────────────────────────── */
  var STORAGE_KEY    = 'gf-side';
  var INTRO_DURATION = 3500; // How long the intro CSS animation plays (ms)
  var INTRO_FADE     = 800;  // Fade-out duration of the intro overlay (ms)
  var CRAWL_DURATION = 12000; // How long the crawl scrolls — must match CSS animation (ms)
  var CRAWL_FADE     = 800;  // Fade-out duration of the crawl (ms)
  var EXIT_DURATION  = 800;  // Fade-out duration when a side is chosen (ms)

  /* ── DOM ─────────────────────────────────────────────────────────────────── */
  var entryScreen = document.getElementById('gf-entry-screen');
  var intro       = document.getElementById('gfIntro');
  var crawl       = document.getElementById('gfCrawl');
  var split       = document.getElementById('gfSplit');
  var skipBtn     = document.getElementById('gfSkip');

  // If any required element is missing, bail out gracefully
  if (!entryScreen || !intro || !crawl || !split || !skipBtn) return;

  /* ── Timer management ────────────────────────────────────────────────────── */
  // We track all timer IDs so the skip button can cancel the whole sequence at once
  var timers = [];

  function after(ms, fn) {
    var id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function clearAllTimers() {
    timers.forEach(function (id) { clearTimeout(id); });
    timers = [];
  }

  /* ── Sequence ────────────────────────────────────────────────────────────── */

  // Step 1: After intro animation completes, fade out the intro overlay
  after(INTRO_DURATION, function () {
    intro.classList.add('is-done');
  });

  // Step 2: After intro has faded out, fade the crawl in (also starts the CSS scroll)
  after(INTRO_DURATION + INTRO_FADE, function () {
    crawl.classList.add('is-visible');
  });

  // Step 3: After the crawl has finished scrolling, fade it out
  after(INTRO_DURATION + INTRO_FADE + CRAWL_DURATION, function () {
    crawl.classList.add('is-done');
  });

  // Step 4: After the crawl has faded, reveal the split screen
  after(INTRO_DURATION + INTRO_FADE + CRAWL_DURATION + CRAWL_FADE, function () {
    showSplit();
  });

  /* ── showSplit() ─────────────────────────────────────────────────────────── */
  // Hides the skip button and reveals the two panels
  function showSplit() {
    skipBtn.classList.add('is-hidden');
    split.classList.add('is-visible');
  }

  /* ── Skip button ─────────────────────────────────────────────────────────── */
  skipBtn.addEventListener('click', function () {
    // Cancel every pending timer in the sequence
    clearAllTimers();

    // Immediately hide intro and crawl (no waiting for transitions)
    intro.classList.add('is-done');
    crawl.classList.add('is-done');

    // Go straight to the split screen
    showSplit();
  });

  /* ── Panel interaction ───────────────────────────────────────────────────── */

  // Attach click and keyboard listeners to each panel
  split.querySelectorAll('.gf-panel').forEach(function (panel) {

    // Mouse click
    panel.addEventListener('click', function () {
      chooseSide(panel.dataset.side);
    });

    // Keyboard: Enter or Space activates the panel (accessibility)
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        chooseSide(panel.dataset.side);
      }
    });
  });

  /* ── chooseSide(side) ────────────────────────────────────────────────────── */
  /**
   * Called when the visitor picks Light Side or Dark Side.
   * @param {string} side - 'light' or 'dark'
   */
  function chooseSide(side) {
    // Guard: ignore if already exiting
    if (entryScreen.classList.contains('is-exiting')) return;

    // Persist the choice so the homepage (and any future pages) can read it
    try {
      localStorage.setItem(STORAGE_KEY, side);
    } catch (e) {
      // localStorage may be blocked in private/restricted contexts — that's OK
    }

    // Apply chosen side to <body> immediately so homepage CSS is ready
    // before the entry screen becomes transparent during the fade
    document.body.dataset.gfSide = side;

    // Trigger the CSS exit fade
    entryScreen.classList.add('is-exiting');

    // After the fade completes, hide the entry screen and notify the rest of the page
    setTimeout(function () {
      entryScreen.style.display = 'none';

      // Dispatch a custom event — homepage sections will listen for this
      document.dispatchEvent(
        new CustomEvent('gf:sideChosen', { detail: { side: side } })
      );
    }, EXIT_DURATION);
  }

}());

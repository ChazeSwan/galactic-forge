/* ============================================================
   lightsaber-configurator.js
   ============================================================ */

(function () {

  /* ── Element refs ───────────────────────────────────────── */
  const overlay  = document.getElementById('gf-cfg');
  const openBtn  = document.getElementById('gf-open-configurator');
  const closeBtn = document.getElementById('gf-cfg-close');
  const backdrop = document.getElementById('gf-cfg-backdrop');

  if (!overlay) return; /* not a lightsaber page — bail early */


  /* ── SVG definitions ────────────────────────────────────── */
  /*
    Six SVGs total — 2 options per part × 3 parts.
    All use viewBox="0 0 60 130" so they render at a consistent scale.
    Colours use a metallic blue-grey palette to sit on the dark panel.
      #8fa6c0 — main metal    #6b8aad — mid tone
      #4a5568 — dark shadow   #2d3748 — deepest shadow
      #cbd5e0 — highlight
  */
  const SVGS = {

    emitter: {

      /* Standard — slim clean cylinder, narrow blade aperture at top */
      Standard: `<svg viewBox="0 5 60 107" xmlns="http://www.w3.org/2000/svg">
        <!-- blade aperture -->
        <rect x="26" y="8"  width="8"  height="12" rx="1" fill="#4a5568"/>
        <rect x="27" y="9"  width="6"  height="10" rx="1" fill="#2d3748"/>
        <!-- shroud step -->
        <rect x="20" y="20" width="20" height="7"  rx="1" fill="#8fa6c0"/>
        <rect x="20" y="20" width="20" height="2"  fill="#cbd5e0" opacity="0.35"/>
        <!-- main cylinder -->
        <rect x="22" y="27" width="16" height="58" rx="2" fill="#8fa6c0"/>
        <rect x="22" y="27" width="3"  height="58" fill="#4a5568" opacity="0.45"/>
        <rect x="35" y="27" width="3"  height="58" fill="#4a5568" opacity="0.3"/>
        <rect x="27" y="27" width="5"  height="58" fill="#cbd5e0" opacity="0.12"/>
        <!-- collar -->
        <rect x="19" y="85" width="22" height="8"  rx="1" fill="#6b8aad"/>
        <rect x="19" y="85" width="22" height="2"  fill="#cbd5e0" opacity="0.2"/>
        <rect x="18" y="93" width="24" height="6"  rx="1" fill="#5a7a9d"/>
        <!-- bottom connector -->
        <rect x="21" y="99" width="18" height="10" rx="1" fill="#4a5568"/>
      </svg>`,

      /* Flanged — three outward flange rings give it a more aggressive look */
      Flanged: `<svg viewBox="0 5 60 98" xmlns="http://www.w3.org/2000/svg">
        <!-- blade aperture -->
        <rect x="25" y="8"  width="10" height="10" rx="1" fill="#4a5568"/>
        <rect x="26" y="9"  width="8"  height="8"  rx="1" fill="#2d3748"/>
        <!-- upper shroud -->
        <rect x="18" y="18" width="24" height="8"  rx="1" fill="#8fa6c0"/>
        <!-- flange ring 1 -->
        <rect x="12" y="26" width="36" height="8"  rx="2" fill="#6b8aad"/>
        <rect x="12" y="26" width="36" height="2"  fill="#cbd5e0" opacity="0.25"/>
        <!-- body segment 1 -->
        <rect x="20" y="34" width="20" height="16" rx="1" fill="#8fa6c0"/>
        <rect x="20" y="34" width="3"  height="16" fill="#4a5568" opacity="0.4"/>
        <rect x="37" y="34" width="3"  height="16" fill="#4a5568" opacity="0.3"/>
        <!-- flange ring 2 -->
        <rect x="12" y="50" width="36" height="8"  rx="2" fill="#6b8aad"/>
        <rect x="12" y="50" width="36" height="2"  fill="#cbd5e0" opacity="0.2"/>
        <!-- body segment 2 -->
        <rect x="20" y="58" width="20" height="16" rx="1" fill="#8fa6c0"/>
        <rect x="20" y="58" width="3"  height="16" fill="#4a5568" opacity="0.4"/>
        <rect x="37" y="58" width="3"  height="16" fill="#4a5568" opacity="0.3"/>
        <!-- flange ring 3 -->
        <rect x="12" y="74" width="36" height="8"  rx="2" fill="#6b8aad"/>
        <rect x="12" y="74" width="36" height="2"  fill="#cbd5e0" opacity="0.2"/>
        <!-- collar -->
        <rect x="18" y="82" width="24" height="8"  rx="1" fill="#5a7a9d"/>
        <rect x="21" y="90" width="18" height="10" rx="1" fill="#4a5568"/>
      </svg>`
    },

    hilt: {

      /* Ridged — classic evenly spaced grip rings */
      Ridged: `<svg viewBox="0 5 60 120" xmlns="http://www.w3.org/2000/svg">
        <!-- main grip body -->
        <rect x="21" y="8"  width="18" height="114" rx="2" fill="#8fa6c0"/>
        <rect x="21" y="8"  width="3"  height="114" fill="#4a5568" opacity="0.45"/>
        <rect x="36" y="8"  width="3"  height="114" fill="#4a5568" opacity="0.3"/>
        <rect x="27" y="8"  width="5"  height="114" fill="#cbd5e0" opacity="0.1"/>
        <!-- ridge rings — evenly spaced every 14px -->
        <rect x="18" y="16" width="24" height="5" rx="1" fill="#6b8aad"/>
        <rect x="18" y="30" width="24" height="5" rx="1" fill="#6b8aad"/>
        <rect x="18" y="44" width="24" height="5" rx="1" fill="#6b8aad"/>
        <rect x="18" y="58" width="24" height="5" rx="1" fill="#6b8aad"/>
        <rect x="18" y="72" width="24" height="5" rx="1" fill="#6b8aad"/>
        <rect x="18" y="86" width="24" height="5" rx="1" fill="#6b8aad"/>
        <rect x="18" y="100" width="24" height="5" rx="1" fill="#6b8aad"/>
        <!-- ridge highlights -->
        <rect x="18" y="16" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
        <rect x="18" y="30" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
        <rect x="18" y="44" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
        <rect x="18" y="58" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
        <rect x="18" y="72" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
        <rect x="18" y="86" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
        <rect x="18" y="100" width="24" height="1" fill="#cbd5e0" opacity="0.3"/>
      </svg>`,

      /* Wrapped — crosshatch diagonal lines suggest leather wrapping */
      Wrapped: `<svg viewBox="0 5 60 120" xmlns="http://www.w3.org/2000/svg">
        <!-- main grip body -->
        <rect x="21" y="8"  width="18" height="114" rx="2" fill="#5a7a9d"/>
        <!-- crosshatch lines going up-right (bottom-left to top-right) -->
        <line x1="21" y1="26" x2="39" y2="8"   stroke="#cbd5e0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="44" x2="39" y2="26"  stroke="#cbd5e0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="62" x2="39" y2="44"  stroke="#cbd5e0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="80" x2="39" y2="62"  stroke="#cbd5e0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="98" x2="39" y2="80"  stroke="#cbd5e0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="116" x2="39" y2="98" stroke="#cbd5e0" stroke-width="1.5" opacity="0.3"/>
        <!-- crosshatch lines going down-right (top-left to bottom-right) -->
        <line x1="21" y1="8"   x2="39" y2="26"  stroke="#8fa6c0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="26"  x2="39" y2="44"  stroke="#8fa6c0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="44"  x2="39" y2="62"  stroke="#8fa6c0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="62"  x2="39" y2="80"  stroke="#8fa6c0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="80"  x2="39" y2="98"  stroke="#8fa6c0" stroke-width="1.5" opacity="0.3"/>
        <line x1="21" y1="98"  x2="39" y2="116" stroke="#8fa6c0" stroke-width="1.5" opacity="0.3"/>
        <!-- left / right edge shadows -->
        <rect x="21" y="8"  width="3"  height="114" fill="#2d3748" opacity="0.4" rx="1"/>
        <rect x="36" y="8"  width="3"  height="114" fill="#2d3748" opacity="0.3" rx="1"/>
        <!-- top and bottom collars -->
        <rect x="19" y="8"   width="22" height="6" rx="1" fill="#8fa6c0"/>
        <rect x="19" y="116" width="22" height="6" rx="1" fill="#8fa6c0"/>
      </svg>`
    },

    pommel: {

      /* Smooth — simple stepped cap, rounded at the bottom */
      Smooth: `<svg viewBox="0 15 60 69" xmlns="http://www.w3.org/2000/svg">
        <!-- top connector -->
        <rect x="21" y="18" width="18" height="10" rx="1" fill="#4a5568"/>
        <!-- step 1 -->
        <rect x="19" y="28" width="22" height="12" rx="1" fill="#8fa6c0"/>
        <rect x="19" y="28" width="22" height="2"  fill="#cbd5e0" opacity="0.3"/>
        <!-- step 2 — slightly wider -->
        <rect x="17" y="40" width="26" height="12" rx="1" fill="#7a97b5"/>
        <rect x="17" y="40" width="26" height="2"  fill="#cbd5e0" opacity="0.2"/>
        <!-- cap body -->
        <rect x="19" y="52" width="22" height="22" rx="2" fill="#8fa6c0"/>
        <rect x="27" y="52" width="5"  height="22" fill="#cbd5e0" opacity="0.12"/>
        <rect x="19" y="52" width="3"  height="22" fill="#4a5568" opacity="0.35"/>
        <!-- rounded bottom -->
        <ellipse cx="30" cy="74" rx="11" ry="7" fill="#8fa6c0"/>
        <ellipse cx="30" cy="74" rx="4"  ry="3" fill="#cbd5e0" opacity="0.15"/>
      </svg>`,

      /* Vented — mechanical vent cutouts on both sides */
      Vented: `<svg viewBox="0 15 60 84" xmlns="http://www.w3.org/2000/svg">
        <!-- top connector -->
        <rect x="21" y="18" width="18" height="10" rx="1" fill="#4a5568"/>
        <!-- main body -->
        <rect x="16" y="28" width="28" height="54" rx="2" fill="#8fa6c0"/>
        <rect x="16" y="28" width="3"  height="54" fill="#4a5568" opacity="0.4"/>
        <rect x="41" y="28" width="3"  height="54" fill="#4a5568" opacity="0.3"/>
        <rect x="27" y="28" width="5"  height="54" fill="#cbd5e0" opacity="0.1"/>
        <!-- vent cutouts — left side -->
        <rect x="16" y="36" width="8" height="4" rx="1" fill="#1a2332"/>
        <rect x="16" y="46" width="8" height="4" rx="1" fill="#1a2332"/>
        <rect x="16" y="56" width="8" height="4" rx="1" fill="#1a2332"/>
        <rect x="16" y="66" width="8" height="4" rx="1" fill="#1a2332"/>
        <!-- vent cutouts — right side -->
        <rect x="40" y="36" width="8" height="4" rx="1" fill="#1a2332"/>
        <rect x="40" y="46" width="8" height="4" rx="1" fill="#1a2332"/>
        <rect x="40" y="56" width="8" height="4" rx="1" fill="#1a2332"/>
        <rect x="40" y="66" width="8" height="4" rx="1" fill="#1a2332"/>
        <!-- bottom cap -->
        <rect x="18" y="82" width="24" height="8" rx="1" fill="#6b8aad"/>
        <ellipse cx="30" cy="90" rx="12" ry="6"  fill="#5a7a9d"/>
        <ellipse cx="30" cy="90" rx="4"  ry="2"  fill="#cbd5e0" opacity="0.2"/>
      </svg>`
    }

  };


  /* ── Part options & state ───────────────────────────────── */
  /*
    OPTIONS maps each part to its ordered array of option names.
    state tracks which index is currently selected per part.
    These must match the variant option values set in Shopify admin.
  */
  const OPTIONS = {
    emitter: ['Standard', 'Flanged'],
    hilt:    ['Ridged',   'Wrapped'],
    pommel:  ['Smooth',   'Vented']
  };

  const state = {
    emitter: 0,
    hilt:    0,
    pommel:  0
  };


  /* ── Render a single part ───────────────────────────────── */
  /*
    Fades the current SVG out, swaps the innerHTML, then fades back in.
    The .is-swapping CSS class handles the opacity transition.
  */
  function renderPart(part) {
    const optionName = OPTIONS[part][state[part]];
    const wrap   = document.getElementById('cfg-' + part + '-display');
    const nameEl = document.getElementById('cfg-' + part + '-name');

    wrap.classList.add('is-swapping');

    setTimeout(function () {
      wrap.innerHTML    = SVGS[part][optionName];
      nameEl.textContent = optionName;
      wrap.classList.remove('is-swapping');
    }, 150);
  }

  function initParts() {
    renderPart('emitter');
    renderPart('hilt');
    renderPart('pommel');
  }


  /* ── Arrow clicks ───────────────────────────────────────── */
  /*
    Each arrow button has data-part (emitter/hilt/pommel) and either
    the --prev or --next class. We step the state index and re-render.
    The modulo wraps around: going left from index 0 → index 1 (last).
  */
  document.querySelectorAll('.gf-cfg__arrow').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var part  = btn.dataset.part;
      var count = OPTIONS[part].length;
      var dir   = btn.classList.contains('gf-cfg__arrow--prev') ? -1 : 1;
      state[part] = (state[part] + dir + count) % count;
      renderPart(part);
    });
  });


  /* ── Assemble button ────────────────────────────────────── */

  var configureView = document.getElementById('gf-cfg-configure');
  var assembledView = document.getElementById('gf-cfg-assembled');
  var assembleBtn   = document.getElementById('gf-cfg-assemble');
  var reconfigureBtn = document.getElementById('gf-cfg-reconfigure');

  if (assembleBtn) {
    assembleBtn.addEventListener('click', function () {
      /* inject the currently selected SVG into each floating container */
      document.getElementById('gf-float-emitter').innerHTML = SVGS.emitter[OPTIONS.emitter[state.emitter]];
      document.getElementById('gf-float-hilt').innerHTML    = SVGS.hilt[OPTIONS.hilt[state.hilt]];
      document.getElementById('gf-float-pommel').innerHTML  = SVGS.pommel[OPTIONS.pommel[state.pommel]];

      /* ── Populate summary row ── */
      document.getElementById('gf-sum-emitter').textContent = OPTIONS.emitter[state.emitter];
      document.getElementById('gf-sum-hilt').textContent    = OPTIONS.hilt[state.hilt];
      document.getElementById('gf-sum-pommel').textContent  = OPTIONS.pommel[state.pommel];

      /* ── Variant lookup ── */
      /*
        Read the variant JSON baked into the overlay's data attribute.
        Find the entry where all three option values match the current state.
        Set that variant's ID on the hidden form input and update the price.
      */
      var variants = JSON.parse(overlay.dataset.variants);
      var match = variants.find(function (v) {
        return v.emitter === OPTIONS.emitter[state.emitter] &&
               v.hilt    === OPTIONS.hilt[state.hilt]       &&
               v.pommel  === OPTIONS.pommel[state.pommel];
      });

      if (match) {
        document.getElementById('gf-cfg-variant-id').value = match.id;
        document.getElementById('gf-cfg-price').textContent = match.price;
      }

      configureView.style.display = 'none';
      assembledView.classList.add('is-visible');
      assembledView.setAttribute('aria-hidden', 'false');

      /* trigger the staggered float-in animation */
      var stage = document.getElementById('gf-cfg-assembly-stage');
      stage.classList.add('is-assembled');

      /* once all parts have landed, start hover and ignite blade together */
      setTimeout(function () {
        stage.classList.remove('is-assembled');
        stage.classList.add('is-hovering');
        document.getElementById('gf-cfg-blade').classList.add('is-ignited');
      }, 1200);
    });
  }

  if (reconfigureBtn) {
    reconfigureBtn.addEventListener('click', function () {
      /* reset animations so they replay next time assemble is clicked */
      var stage = document.getElementById('gf-cfg-assembly-stage');
      stage.classList.remove('is-assembled');
      stage.classList.remove('is-hovering');
      var blade = document.getElementById('gf-cfg-blade');
      blade.classList.remove('is-ignited');
      blade.style.setProperty('--blade-color', '#90CDF4');

      assembledView.classList.remove('is-visible');
      assembledView.setAttribute('aria-hidden', 'true');
      configureView.style.display = '';
    });
  }


  /* ── Crystal picker ─────────────────────────────────────── */

  document.querySelectorAll('.gf-cfg__crystal').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.gf-cfg__crystal').forEach(function (b) {
        b.classList.remove('is-active');
      });
      btn.classList.add('is-active');
      document.getElementById('gf-crystal-name').textContent = btn.dataset.name;

      /* update the blade color live */
      var blade = document.getElementById('gf-cfg-blade');
      blade.style.setProperty('--blade-color', btn.dataset.color);
    });
  });


  /* ── Open / close ───────────────────────────────────────── */

  function openConfigurator() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    initParts(); /* inject SVGs fresh each time the overlay opens */
  }

  function closeConfigurator() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn)  openBtn.addEventListener('click', openConfigurator);
  if (closeBtn) closeBtn.addEventListener('click', closeConfigurator);
  if (backdrop) backdrop.addEventListener('click', closeConfigurator);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeConfigurator();
  });

})();

/* product.js */
/* Handles: thumbnail swap, qty stepper, variant pills, accordions */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     THUMBNAIL SWAP
     When a thumbnail button is clicked:
     1. Update the main image src and alt
     2. Move the is-active class to the clicked thumb
  ───────────────────────────────────────── */

  const mainImg = document.getElementById('gf-main-img-tag');
  const thumbs  = document.querySelectorAll('.gf-product__thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {

      /* Swap the main image — data-src and data-alt were set in Liquid */
      if (mainImg && thumb.dataset.src) {
        mainImg.src = thumb.dataset.src;
        mainImg.alt = thumb.dataset.alt || '';
      }

      /* Move is-active to the clicked thumb */
      thumbs.forEach(function (otherThumb) { otherThumb.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
  });


  /* ─────────────────────────────────────────
     QTY STEPPER
     Minus and plus buttons update:
     - The visible count span
     - The hidden quantity input inside the form
     Minimum quantity is 1 — never goes below.
  ───────────────────────────────────────── */

  const qtyMinus = document.getElementById('gf-qty-minus');
  const qtyPlus  = document.getElementById('gf-qty-plus');
  const qtyCount = document.getElementById('gf-qty-count');
  const qtyInput = document.getElementById('gf-qty-input');

  if (qtyMinus && qtyPlus && qtyCount && qtyInput) {

    qtyMinus.addEventListener('click', function () {
      var current = parseInt(qtyCount.textContent, 10);
      if (current > 1) {
        var newVal = current - 1;
        qtyCount.textContent = newVal;
        qtyInput.value       = newVal;
      }
    });

    qtyPlus.addEventListener('click', function () {
      var current = parseInt(qtyCount.textContent, 10);
      var newVal  = current + 1;
      qtyCount.textContent = newVal;
      qtyInput.value       = newVal;
    });

  }


  /* ─────────────────────────────────────────
     VARIANT PILLS
     When a pill is clicked:
     1. Move is-active to the clicked pill
     2. Update the hidden variant ID input so the form submits the right variant
     3. Update the displayed price
  ───────────────────────────────────────── */

  const variantPills = document.querySelectorAll('.gf-product__variant-pill');
  const variantInput = document.getElementById('gf-variant-id');
  const priceDisplay = document.querySelector('.gf-product__price');

  variantPills.forEach(function (pill) {
    pill.addEventListener('click', function () {

      /* Move is-active */
      variantPills.forEach(function (otherPill) { otherPill.classList.remove('is-active'); });
      pill.classList.add('is-active');

      /* Update the hidden input with the selected variant ID */
      if (variantInput) {
        variantInput.value = pill.dataset.variantId;
      }

      /* Update the displayed price if the variant has a different price */
      if (priceDisplay && pill.dataset.variantPrice) {
        priceDisplay.textContent = pill.dataset.variantPrice;
      }

    });
  });


  /* ─────────────────────────────────────────
     ACCORDIONS
     Each accordion item has:
     - .gf-product__acc-hd   — the clickable header button
     - .gf-product__acc-body — the content that shows/hides
     Clicking the header toggles is-open on the parent item.
     CSS handles the actual show/hide via max-height transition.
     The toggle symbol switches between + and −.
  ───────────────────────────────────────── */

  const accItems = document.querySelectorAll('.gf-product__acc-item');

  accItems.forEach(function (accItem) {
    var header = accItem.querySelector('.gf-product__acc-hd');
    var toggle = accItem.querySelector('.gf-product__acc-toggle');

    header.addEventListener('click', function () {
      /* Toggle this item independently — multiple can be open at once */
      var isOpen = accItem.classList.contains('is-open');
      accItem.classList.toggle('is-open');
      if (toggle) toggle.textContent = isOpen ? '+' : '−';
    });
  });

});

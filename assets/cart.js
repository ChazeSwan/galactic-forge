/* ============================================================
   cart.js
   Full AJAX cart — qty stepper + remove.
   Both update the DOM live without a page reload.
   ============================================================ */

(function () {

  /* ----------------------------------------------------------
     Helpers
  ---------------------------------------------------------- */

  /* Convert Shopify's cent integer to a "$X.XX" string */
  function formatMoney(cents) {
    return '$' + (cents / 100).toFixed(2);
  }

  /* After any cart change, refresh the subtotal and total displays */
  function updateTotals(cart) {
    var subtotal = document.getElementById('gf-cart-subtotal');
    var total    = document.getElementById('gf-cart-total');
    if (subtotal) subtotal.textContent = formatMoney(cart.total_price);
    if (total)    total.textContent    = formatMoney(cart.total_price);
  }

  /* POST to /cart/change.js and return the parsed cart JSON */
  function cartChange(variantId, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: quantity })
    }).then(function (res) { return res.json(); });
  }


  /* ----------------------------------------------------------
     Qty stepper
     Each .gf-cart__qty widget carries data-variant-id.
     Clicking +/- fires a cartChange call immediately, then
     updates the line price and totals from the response.
  ---------------------------------------------------------- */

  document.querySelectorAll('.gf-cart__qty').forEach(function (widget) {
    var minus     = widget.querySelector('.gf-cart__qty-minus');
    var plus      = widget.querySelector('.gf-cart__qty-plus');
    var countEl   = widget.querySelector('.gf-cart__qty-count');
    var variantId = widget.dataset.variantId;
    var item      = widget.closest('.gf-cart__item');
    var priceEl   = item ? item.querySelector('.gf-cart__item-price') : null;
    var qty       = parseInt(countEl.textContent, 10);

    minus.addEventListener('click', function () {
      if (qty <= 1) return;
      var prev = qty;
      qty--;
      countEl.textContent = qty;
      cartChange(variantId, qty).then(function (cart) {
        if (!cart.items) { qty = prev; countEl.textContent = prev; return; }
        var lineItem = cart.items.find(function (i) {
          return String(i.variant_id) === String(variantId);
        });
        if (lineItem && priceEl) priceEl.textContent = formatMoney(lineItem.line_price);
        updateTotals(cart);
      }).catch(function () { qty = prev; countEl.textContent = prev; });
    });

    plus.addEventListener('click', function () {
      var prev = qty;
      qty++;
      countEl.textContent = qty;
      cartChange(variantId, qty).then(function (cart) {
        if (!cart.items) { qty = prev; countEl.textContent = prev; return; }
        var lineItem = cart.items.find(function (i) {
          return String(i.variant_id) === String(variantId);
        });
        if (lineItem && priceEl) priceEl.textContent = formatMoney(lineItem.line_price);
        updateTotals(cart);
      }).catch(function () { qty = prev; countEl.textContent = prev; });
    });
  });


  /* ----------------------------------------------------------
     Remove buttons
     Each .gf-cart__item-remove button carries data-variant-id.
     Sets quantity to 0, removes the item row from the DOM,
     and refreshes the totals.
     If the cart is now empty, reload so the Liquid empty
     state renders.
  ---------------------------------------------------------- */

  document.querySelectorAll('.gf-cart__item-remove').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var variantId = btn.dataset.variantId;
      var item = btn.closest('.gf-cart__item');

      fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 0 })
      })
        .then(function (res) { return res.json(); })
        .then(function (cart) {
          if (item) item.remove();
          updateTotals(cart);
          if (cart.item_count === 0) {
            window.location.href = window.location.pathname;
          }
        });
    });
  });

})();

/* ============================================================
   Upsell "Add to Order" buttons
   Intercepts the click so the parent <a> card doesn't navigate.
   POSTs to /cart/add.js, then reloads so the new item appears
   in the cart items list with the correct totals.
   ============================================================ */

(function () {

  document.querySelectorAll('.gf-cart__upsell-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var variantId = btn.dataset.variantId;
      btn.textContent = 'Adding…';
      btn.disabled = true;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity: 1 })
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          window.location.href = window.location.pathname;
        })
        .catch(function () {
          btn.textContent = 'Add to Order';
          btn.disabled = false;
        });
    });
  });

})();

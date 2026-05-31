/**
 * FOLD — booking.js
 * Multi-step booking wizard:
 *   1. ZIP qualify  →  2. Plan  →  3. Account + payment
 *   →  4. Pickup window  →  5. Confirm
 *
 * All state is kept in sessionStorage via store.js so it
 * survives a soft refresh.  No actual API calls in this
 * Phase 1 build; the TRA3 integration points are clearly
 * marked with TODO comments.
 */

import store from './store.js';

// Only run on the schedule page
if (document.body.dataset.page === 'schedule') {
  initBooking();
}

function initBooking() {
  // ── State ──────────────────────────────────────────────
  const state = store.get('fold_booking', {
    step: 1,
    zip: '',
    plan: null,
    name: '',
    mobile: '',
    email: '',
    address: '',
    instructions: '',
    window: null,
  });

  // ── DOM references ─────────────────────────────────────
  const steps        = [...document.querySelectorAll('.booking-step')];
  const progressPips = [...document.querySelectorAll('.progress-step')];
  const progressConn = [...document.querySelectorAll('.progress-connector')];
  const btnNext      = document.getElementById('btn-next');
  const btnBack      = document.getElementById('btn-back');

  // ── ZIP check (hero + step 1) ──────────────────────────
  document.querySelectorAll('.js-zip-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('.zip-input');
      const msg   = form.querySelector('.zip-message');
      const zip   = input.value.trim();

      if (!/^\d{5}$/.test(zip)) {
        showZipState(input, msg, 'error', 'Please enter a valid 5-digit ZIP code.');
        return;
      }

      // TODO: Replace with a real TRA3 endpoint call
      //   POST /api/check-zip { zip }  →  { served: bool }
      const served = isZipServed(zip);

      if (served) {
        showZipState(input, msg, 'valid',
          '✓ Great news — we serve your area!');
        state.zip = zip;
        store.set('fold_booking', state);

        // Auto-advance to schedule page if on homepage
        if (document.body.dataset.page === 'home') {
          setTimeout(() => {
            window.location.href = `/schedule.html?zip=${zip}`;
          }, 800);
        } else {
          goToStep(2);
        }
      } else {
        showZipState(input, msg, 'error',
          'We\'re not in your area yet — join the waitlist below.');
      }
    });
  });

  // ── Plan selection (step 2) ────────────────────────────
  document.querySelectorAll('.js-select-plan').forEach(btn => {
    btn.addEventListener('click', () => {
      const planId = btn.dataset.plan;
      state.plan = planId;
      store.set('fold_booking', state);

      // Highlight selected
      document.querySelectorAll('.js-select-plan').forEach(b => {
        b.closest('.plan-card').classList.remove('plan-card--selected');
      });
      btn.closest('.plan-card').classList.add('plan-card--selected');

      // Auto-advance to step 3 after brief moment
      setTimeout(() => goToStep(3), 300);
    });
  });

  // ── Account form (step 3) ──────────────────────────────
  const accountForm = document.getElementById('account-form');
  if (accountForm) {
    // Pre-fill from state
    setValue('field-name',    state.name);
    setValue('field-mobile',  state.mobile);
    setValue('field-email',   state.email);
    setValue('field-address', state.address);
  }

  // ── Window selection (step 4) ──────────────────────────
  document.querySelectorAll('.window-tile input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      state.window = radio.value;
      store.set('fold_booking', state);
    });
  });

  // ── Next / Back buttons ────────────────────────────────
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (!validateStep(state.step)) return;

      if (state.step === 3) {
        // Collect account form values
        state.name    = getVal('field-name');
        state.mobile  = getVal('field-mobile');
        state.email   = getVal('field-email');
        state.address = getVal('field-address');
        state.instructions = getVal('field-instructions');
        store.set('fold_booking', state);
      }

      if (state.step === 5) {
        submitBooking();
        return;
      }

      goToStep(state.step + 1);
    });
  }

  if (btnBack) {
    btnBack.addEventListener('click', () => {
      if (state.step > 1) goToStep(state.step - 1);
    });
  }

  // ── Summary card (step 5) ──────────────────────────────
  function updateSummary() {
    const planNames = { solo: 'Solo', household: 'Household', estate: 'Estate' };
    const planPrices = { solo: '$39', household: '$69', estate: '$119' };

    setText('summary-plan',    planNames[state.plan]  || '—');
    setText('summary-price',   planPrices[state.plan] || '—');
    setText('summary-name',    state.name    || '—');
    setText('summary-address', state.address || '—');
    setText('summary-window',  state.window  || '—');
  }

  // ── Booking submission ─────────────────────────────────
  function submitBooking() {
    if (btnNext) {
      btnNext.setAttribute('data-loading', '');
      btnNext.textContent = 'Confirming…';
    }

    // TODO: Replace with real TRA3 POST /api/bookings call
    //   { zip, plan, name, mobile, email, address, instructions, window }
    //   Response: { orderId, confirmationAt }
    setTimeout(() => {
      const orderId = 'FLD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      store.set('fold_booking_confirmed', { orderId, ...state });
      store.remove('fold_booking');
      window.location.href = `/confirmation.html?order=${orderId}`;
    }, 1200);
  }

  // ── Navigation helpers ─────────────────────────────────
  function goToStep(n) {
    state.step = n;
    store.set('fold_booking', state);

    // Show correct step panel
    steps.forEach((el, i) => {
      el.classList.toggle('is-active', i + 1 === n);
    });

    // Update progress pips
    progressPips.forEach((pip, i) => {
      pip.classList.remove('progress-step--done', 'progress-step--active');
      if (i + 1 < n)  pip.classList.add('progress-step--done');
      if (i + 1 === n) pip.classList.add('progress-step--active');
      pip.querySelector('.progress-pip').setAttribute(
        'aria-label',
        `Step ${i + 1}${i + 1 < n ? ' — completed' : i + 1 === n ? ' — current' : ''}`
      );
    });

    // Update connectors
    progressConn.forEach((conn, i) => {
      conn.classList.toggle('progress-connector--done', i + 1 < n);
    });

    // Next/Back label
    if (btnNext) {
      btnNext.textContent = n === 5 ? 'Confirm & pay' : 'Continue';
    }
    if (btnBack) {
      btnBack.style.visibility = n === 1 ? 'hidden' : 'visible';
    }

    if (n === 5) updateSummary();

    // Scroll to top of booking form
    const booking = document.querySelector('.booking-wrap');
    if (booking) booking.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Validation ─────────────────────────────────────────
  function validateStep(step) {
    let ok = true;

    if (step === 1) {
      if (!state.zip) {
        alert('Please check your ZIP code first.');
        ok = false;
      }
    }
    if (step === 2) {
      if (!state.plan) {
        alert('Please choose a plan to continue.');
        ok = false;
      }
    }
    if (step === 3) {
      const name    = getVal('field-name');
      const mobile  = getVal('field-mobile');
      const email   = getVal('field-email');
      const address = getVal('field-address');

      if (!name || !mobile || !email || !address) {
        alert('Please fill in all required fields.');
        ok = false;
      }
    }
    if (step === 4) {
      if (!state.window) {
        alert('Please pick a pickup window.');
        ok = false;
      }
    }

    return ok;
  }

  // ── Utilities ──────────────────────────────────────────
  function showZipState(input, msgEl, state, text) {
    input.dataset.state = state;
    if (msgEl) {
      msgEl.className = 'zip-message zip-message--' +
        (state === 'valid' ? 'served' : state === 'error' ? 'error' : 'waitlist');
      msgEl.textContent = text;
    }
  }

  /**
   * Placeholder ZIP check — replace with TRA3 call.
   * Returns true for all Montgomery, AL area ZIP codes.
   */
  function isZipServed(zip) {
    const served = new Set([
      '36101','36102','36103','36104','36105',
      '36106','36107','36108','36109','36110',
      '36111','36112','36113','36114','36115',
      '36116','36117','36118','36119','36120',
    ]);
    return served.has(zip);
  }

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function setValue(id, val) {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // ── Initialise to current step ─────────────────────────
  // Pre-fill ZIP from URL param (handed off from hero)
  const params = new URLSearchParams(window.location.search);
  const urlZip = params.get('zip');
  if (urlZip && /^\d{5}$/.test(urlZip)) {
    state.zip = urlZip;
    store.set('fold_booking', state);
  }

  goToStep(state.step);
}

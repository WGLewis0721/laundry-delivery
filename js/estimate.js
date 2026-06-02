/**
 * FOLD - estimate.js
 * 3KD Vision Engine - front-end scaffold (mock build).
 *
 * Flow: photo upload -> mock recognition -> weight estimate -> Q&A refinement -> book CTA.
 *
 * // TODO: 3KD - flip USE_MOCK = false and POST images to the real vision backend
 *   when the 3KD vision service is ready. The recognizeLaundry() function documents
 *   the expected request/response shape.
 */

import store from './store.js';
import {
  estimateWeightRange,
  recommendPlan,
  estimateQuote,
  PLANS,
} from './estimate-data.js';

// Only run on the estimate page
if (document.body.dataset.page === 'estimate') {
  initEstimate();
}

// -- Config -----------------------------------------------------------------

/**
 * Flip to false when the real vision backend is wired.
 * // TODO: 3KD - set USE_MOCK = false and implement real POST in recognizeLaundry()
 */
const USE_MOCK = true;

// -- State ------------------------------------------------------------------

/** @type {File[]} */
let uploadedFiles = [];

/**
 * @type {{ blend: { light: number, medium: number, heavy: number }, fillLevel: number, heavyOutliers: string[] } | null}
 */
let recognitionResult = null;

/**
 * @type {{ clothingType: string|null, towelsSheets: string|null, heavyItems: string[], fillLevel: number|null }}
 */
let qaAnswers = {
  clothingType: null,   // 'adult' | 'kids' | 'mixed'
  towelsSheets: null,   // 'none' | 'few' | 'lot'
  heavyItems:   [],     // ['comforter', 'duvet', 'suit']
  fillLevel:    null,   // 0.25 | 0.5 | 0.75 | 1.0
};

// -- Entry point ------------------------------------------------------------

function initEstimate() {
  renderUploadSection();
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 3 - Upload + Recognition
// ═══════════════════════════════════════════════════════════════════════════

function renderUploadSection() {
  const section = document.getElementById('section-upload');
  section.innerHTML = `
    <h2 id="upload-heading" style="font-family: var(--font-display); font-size: var(--text-2xl); margin-bottom: var(--space-6);">
      Upload your laundry photos
    </h2>

    <!-- Consent notice - shown BEFORE upload -->
    <div class="consent-notice" role="note" aria-label="Privacy notice">
      <span class="consent-notice__icon" aria-hidden="true">Lock</span>
      <span>
        <strong>Your photos stay private.</strong>
        We use them only to estimate your laundry load; they aren't stored long-term
        or shared with third parties.
      </span>
    </div>

    <!-- Capture tip -->
    <p style="font-size: var(--text-sm); color: var(--ink-lighter); margin-bottom: var(--space-6);">
      <strong>Tip:</strong> Photograph your laundry in or next to a FOLD bag; it helps us
      gauge the load size and gives a more accurate estimate.
    </p>

    <!-- Drop zone -->
    <div
      class="upload-area"
      id="drop-zone"
      role="button"
      tabindex="0"
      aria-label="Upload laundry photos - click or drop files here"
      aria-describedby="upload-hint"
    >
      <div class="upload-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
             aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="m21 15-5-5L5 21"/>
        </svg>
      </div>
      <h3 style="font-size: var(--text-lg); margin-bottom: var(--space-2);">
        Drop photos here
      </h3>
      <p id="upload-hint">
        Or choose up to 3 photos - JPG, PNG, HEIC accepted.
      </p>

      <input
        type="file"
        id="photo-input"
        class="upload-file-input"
        accept="image/*"
        multiple
        aria-label="Choose laundry photos"
        tabindex="-1"
      >
      <label for="photo-input" class="upload-btn-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        Choose photos
      </label>
    </div>

    <!-- Thumbnail previews -->
    <div class="thumbs-row" id="thumbs-row" aria-label="Selected photos" role="list"></div>

    <!-- Analyse button -->
    <div style="margin-top: var(--space-8); text-align: center;">
      <button
        id="btn-analyze"
        class="btn btn--primary"
        style="min-width: 220px; min-height: 3rem;"
        disabled
        aria-disabled="true"
      >
        Analyse my laundry
      </button>
      <p id="analyze-status" role="status" aria-live="polite"
         style="font-size: var(--text-sm); color: var(--ink-lighter); margin-top: var(--space-3);">
        Add at least one photo to continue.
      </p>
    </div>

    <!-- Recognition result area -->
    <div id="recognition-result" style="margin-top: var(--space-10);" aria-live="polite" aria-atomic="true"></div>
  `;

  wireUploadEvents();
}

function wireUploadEvents() {
  const dropZone    = document.getElementById('drop-zone');
  const fileInput   = document.getElementById('photo-input');
  const thumbsRow   = document.getElementById('thumbs-row');
  const btnAnalyze  = document.getElementById('btn-analyze');
  const analyzeStatus = document.getElementById('analyze-status');

  // File input change
  fileInput.addEventListener('change', () => {
    addFiles([...fileInput.files]);
    fileInput.value = ''; // reset so the same file can be re-added
  });

  // Drag-and-drop
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    addFiles([...e.dataTransfer.files].filter(f => f.type.startsWith('image/')));
  });

  // Keyboard activation of the drop zone itself
  dropZone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  // Analyse button
  btnAnalyze.addEventListener('click', handleAnalyze);

  function addFiles(incoming) {
    const remaining = 3 - uploadedFiles.length;
    const toAdd = incoming.slice(0, remaining);
    uploadedFiles = [...uploadedFiles, ...toAdd];
    renderThumbs();
    updateAnalyzeButton();
  }

  function renderThumbs() {
    thumbsRow.innerHTML = '';
    uploadedFiles.forEach((file, idx) => {
      const url = URL.createObjectURL(file);
      const li = document.createElement('div');
      li.className = 'thumb-item';
      li.setAttribute('role', 'listitem');
      li.innerHTML = `
        <img src="${url}" alt="Photo ${idx + 1} - ${escHtml(file.name)}" loading="lazy">
        <button
          class="thumb-remove"
          aria-label="Remove photo ${idx + 1}"
          data-idx="${idx}"
          type="button"
        >✕</button>
      `;
      li.querySelector('.thumb-remove').addEventListener('click', () => {
        URL.revokeObjectURL(url);
        uploadedFiles.splice(idx, 1);
        renderThumbs();
        updateAnalyzeButton();
      });
      thumbsRow.appendChild(li);
    });
  }

  function updateAnalyzeButton() {
    const hasPhotos = uploadedFiles.length > 0;
    btnAnalyze.disabled = !hasPhotos;
    btnAnalyze.setAttribute('aria-disabled', String(!hasPhotos));
    analyzeStatus.textContent = hasPhotos
      ? `${uploadedFiles.length} photo${uploadedFiles.length > 1 ? 's' : ''} ready - tap Analyze to continue.`
      : 'Add at least one photo to continue.';
  }
}

async function handleAnalyze() {
  const resultArea = document.getElementById('recognition-result');
  const btn        = document.getElementById('btn-analyze');

  btn.disabled = true;
  btn.setAttribute('aria-disabled', 'true');
  btn.textContent = 'Analyzing...';

  resultArea.innerHTML = renderLoadingState('Recognizing your laundry...');

  try {
    recognitionResult = await recognizeLaundry(uploadedFiles);
    resultArea.innerHTML = renderRecognitionCard(recognitionResult);
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Proceed to Part 4: render quote
    renderQuoteSection(recognitionResult);

  } catch (err) {
    resultArea.innerHTML = renderErrorState(
      'We couldn\'t analyze the photos. Please try again.',
      handleAnalyze,
    );
    console.error('[estimate.js] recognizeLaundry failed:', err);
  } finally {
    btn.disabled = false;
    btn.setAttribute('aria-disabled', 'false');
    btn.textContent = 'Analyze my laundry';
  }
}

/**
 * Mocked vision recognition.
 * Returns a plausible fixture after an artificial delay.
 *
 * // TODO: 3KD - when USE_MOCK = false, POST { images: base64[] } to the vision backend:
 *   const res = await fetch('/api/vision/recognise', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ images: await filesToBase64(images) }),
 *   });
 *   return res.json();
 *   Expected response: { blend: { light, medium, heavy }, fillLevel, heavyOutliers }
 *
 * @param {File[]} images
 * @returns {Promise<{ blend: { light: number, medium: number, heavy: number }, fillLevel: number, heavyOutliers: string[] }>}
 */
async function recognizeLaundry(images) {  // eslint-disable-line no-unused-vars
  if (!USE_MOCK) {
    throw new Error('Real 3KD vision backend not yet wired. Set USE_MOCK = true or implement POST.');
  }

  // Artificial delay - realistic async feel
  await delay(1800);

  // Mock fixture - plausible everyday household load
  return {
    blend: { light: 0.6, medium: 0.3, heavy: 0.1 },
    fillLevel: 0.7,
    heavyOutliers: ['towels'],
  };
}

function renderRecognitionCard(result) {
  const { blend, fillLevel, heavyOutliers } = result;
  const pct = v => Math.round(v * 100);
  const fillPct = Math.round(fillLevel * 100);

  const mixLabel = blend.light > 0.5
    ? 'Mostly everyday clothing'
    : blend.heavy > 0.4
      ? 'Heavier mixed load'
      : 'Balanced everyday mix';

  return `
    <div class="recognition-card" role="region" aria-label="Recognition result">
      <p class="recognition-card__label">Here's what we see</p>
      <h2 id="upload-heading" style="font-size: var(--text-xl); margin-bottom: var(--space-2);">
        ${escHtml(mixLabel)}
      </h2>
      <p style="font-size: var(--text-sm); color: var(--ink-lighter); margin-bottom: var(--space-4);">
        Looks like a typical laundry load; we'll use this to estimate your weight and plan.
      </p>

      <!-- Mix bar -->
      <div class="mix-bar" role="img" aria-label="Load mix: ${pct(blend.light)}% light, ${pct(blend.medium)}% medium, ${pct(blend.heavy)}% heavy">
        <div class="mix-bar__seg mix-bar__seg--light"  style="width: ${pct(blend.light)}%;"></div>
        <div class="mix-bar__seg mix-bar__seg--medium" style="width: ${pct(blend.medium)}%;"></div>
        <div class="mix-bar__seg mix-bar__seg--heavy"  style="width: ${pct(blend.heavy)}%;"></div>
      </div>
      <div class="mix-legend" aria-hidden="true">
        <span class="mix-legend__item">
          <span class="mix-legend__swatch" style="background: var(--sky);"></span>
          Light (${pct(blend.light)}%)
        </span>
        <span class="mix-legend__item">
          <span class="mix-legend__swatch" style="background: var(--gold);"></span>
          Medium (${pct(blend.medium)}%)
        </span>
        <span class="mix-legend__item">
          <span class="mix-legend__swatch" style="background: var(--green);"></span>
          Heavy (${pct(blend.heavy)}%)
        </span>
      </div>

      <!-- Fill level -->
      <div class="fill-meter">
        <div class="fill-meter__label">
          <span>Bag fill level</span>
          <span>${fillPct}%</span>
        </div>
        <div class="fill-meter__track" role="img" aria-label="Bag approximately ${fillPct}% full">
          <div class="fill-meter__bar" style="width: ${fillPct}%;"></div>
        </div>
      </div>

      <!-- Heavy outliers -->
      ${heavyOutliers.length > 0 ? `
        <p style="font-size: var(--text-sm); color: var(--ink-light); margin-top: var(--space-3);">
          We spotted some heavier items:
          ${heavyOutliers.map(o => `<span class="outliers-tag">${escHtml(o)}</span>`).join(' ')}
        </p>
      ` : ''}

      <p class="confidence-note">
        These are educated guesses based on what we can see; your answers in the next steps
        will help us sharpen the estimate.
      </p>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 4 - Estimate Quote
// ═══════════════════════════════════════════════════════════════════════════

function renderQuoteSection(recognition) {
  const section = document.getElementById('section-quote');
  section.removeAttribute('hidden');

  const { blend, fillLevel } = recognition;
  const { lowLb, midLb, highLb } = estimateWeightRange(blend, fillLevel);
  const planId = recommendPlan(midLb);
  const quote  = estimateQuote(lowLb, highLb, planId);
  const plan   = PLANS[planId];

  section.innerHTML = buildQuoteCardHTML(lowLb, highLb, planId, plan, quote, blend, fillLevel);
  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Proceed to Part 5: render Q&A
  renderQASection(recognition);
}

function buildQuoteCardHTML(lowLb, highLb, planId, plan, quote, blend, fillLevel) {
  const hasOverage   = quote.overageHigh > 0;
  const overageText  = hasOverage
    ? `About $${fmt(quote.overageLow)}-$${fmt(quote.overageHigh)} overage at $2.50/lb over ${quote.cap} lb cap`
    : `Fits within the ${quote.cap} lb bag cap - no overage expected`;
  const pct = v => Math.round(v * 100);

  return `
    <div class="quote-card" role="region" aria-labelledby="quote-heading">
      <h2 id="quote-heading" style="font-size: var(--text-xl); margin-bottom: var(--space-2);">
        Your estimated quote
      </h2>
      <p style="font-size: var(--text-sm); color: var(--ink-lighter); margin-bottom: var(--space-6);">
        Based on the recognition above; answers to the questions below will refine this.
      </p>

      <!-- Weight range -->
      <div class="quote-range" aria-label="Estimated weight ${lowLb}-${highLb} lb">
        <span class="quote-range__value live-range" id="quote-range-display">
          ${fmtLb(lowLb)}-${fmtLb(highLb)} lb
        </span>
        <span class="quote-range__unit">estimated</span>
      </div>

      <!-- Recommended plan -->
      <div class="quote-plan-pill ${plan.featured ? 'quote-plan-pill--featured' : ''}" aria-label="Recommended plan: ${plan.name}">
        <span aria-hidden="true">${plan.featured ? 'Featured' : 'Recommended'}</span>
        ${plan.name} plan recommended
      </div>

      <!-- Overage line -->
      <p style="font-size: var(--text-sm); color: ${hasOverage ? 'var(--warning)' : 'var(--success)'}; margin-bottom: var(--space-4);" id="quote-overage-display">
        ${escHtml(overageText)}
      </p>

      <!-- How we got this -->
      <details class="quote-breakdown">
        <summary style="cursor: pointer; font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--ink); list-style: none; display: flex; align-items: center; gap: var(--space-2);">
          <span aria-hidden="true">&gt;</span> How we got this
        </summary>
        <dl style="margin-top: var(--space-3);">
          <dt>Mix</dt>
          <dd>Light ${pct(blend.light)}%, Medium ${pct(blend.medium)}%, Heavy ${pct(blend.heavy)}%</dd>
          <dt>Fill level</dt>
          <dd>${Math.round(fillLevel * 100)}% of a standard FOLD bag</dd>
          <dt>Mid estimate</dt>
          <dd>${fmtLb((lowLb + highLb) / 2)} lb (+/-15% band applied)</dd>
          <dt>Plan cap</dt>
          <dd>${plan.name} - ${quote.cap} lb per bag</dd>
          <dt>Plan price</dt>
          <dd>$${plan.price}/mo (${plan.pickups} pickups, ${plan.bags} bags)</dd>
        </dl>
      </details>

      <!-- Transparency line -->
      <p class="quote-transparency">
        <strong>This is an estimate.</strong> Your final price is set by the scale at pickup,
        weighed in front of you before any charge is processed.
      </p>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════════════════
// PART 5 - Q&A Refinement
// ═══════════════════════════════════════════════════════════════════════════

function renderQASection(recognition) {
  const section = document.getElementById('section-qa');
  section.removeAttribute('hidden');

  section.innerHTML = `
    <div class="qa-intro">
      <h2 id="qa-heading" style="font-family: var(--font-display); font-size: var(--text-2xl); margin-bottom: var(--space-2);">
        Help us sharpen the estimate
      </h2>
      <p style="font-size: var(--text-sm); color: var(--ink-light); margin-bottom: 0; line-height: var(--leading-relaxed);">
        A few quick answers make the range much tighter. Your estimate updates live as you go.
      </p>
    </div>

    <!-- Reassurance -->
    <div class="reassurance-bar" role="note">
      Your answers refine the estimate only - your final price is always set by the scale at pickup.
    </div>

    <!-- Q1: Clothing type -->
    <fieldset class="qa-question-group">
      <legend>Mostly adult or kids' clothes?</legend>
      <div class="qa-options" role="group" aria-label="Clothing type">
        ${qaRadio('clothing-type', 'adult',  'Adult')}
        ${qaRadio('clothing-type', 'mixed',  'Mixed')}
        ${qaRadio('clothing-type', 'kids',   'Kids')}
      </div>
    </fieldset>

    <!-- Q2: Towels/sheets -->
    <fieldset class="qa-question-group">
      <legend>About how many towels or sheets?</legend>
      <div class="qa-options" role="group" aria-label="Towels and sheets">
        ${qaRadio('towels-sheets', 'none', 'None')}
        ${qaRadio('towels-sheets', 'few',  'A few')}
        ${qaRadio('towels-sheets', 'lot',  'A lot')}
      </div>
    </fieldset>

    <!-- Q3: Heavy items -->
    <fieldset class="qa-question-group">
      <legend>Any comforters, duvets, or suits?</legend>
      <div class="qa-options" role="group" aria-label="Heavy items">
        ${qaCheckbox('heavy-comforter', 'comforter', '+ Comforter')}
        ${qaCheckbox('heavy-duvet',     'duvet',     '+ Duvet')}
        ${qaCheckbox('heavy-suit',      'suit',      '+ Suit')}
      </div>
    </fieldset>

    <!-- Q4: Fill level -->
    <fieldset class="qa-question-group">
      <legend>How full is the bag?</legend>
      <div class="qa-options" role="group" aria-label="Bag fill level">
        ${qaRadio('fill-level', '0.25', '1/4 full')}
        ${qaRadio('fill-level', '0.5',  '1/2 full')}
        ${qaRadio('fill-level', '0.75', '3/4 full')}
        ${qaRadio('fill-level', '1.0',  'Packed full')}
      </div>
    </fieldset>

    <!-- Refined quote summary (updates live) -->
    <div id="refined-quote-area" aria-live="polite" aria-atomic="true"></div>
  `;

  wireQAEvents(recognition);
}

function wireQAEvents(recognition) {
  const section        = document.getElementById('section-qa');
  const refinedArea    = document.getElementById('refined-quote-area');
  const quoteRangeEl   = document.getElementById('quote-range-display');
  const quoteOverageEl = document.getElementById('quote-overage-display');

  function handleChange() {
    // Read clothing type
    const clothingInput = section.querySelector('input[name="clothing-type"]:checked');
    qaAnswers.clothingType = clothingInput ? clothingInput.value : null;

    // Read towels/sheets
    const towelsInput = section.querySelector('input[name="towels-sheets"]:checked');
    qaAnswers.towelsSheets = towelsInput ? towelsInput.value : null;

    // Read heavy items (checkboxes)
    qaAnswers.heavyItems = [...section.querySelectorAll('input[name^="heavy-"]:checked')]
      .map(el => el.value);

    // Read fill level
    const fillInput = section.querySelector('input[name="fill-level"]:checked');
    qaAnswers.fillLevel = fillInput ? parseFloat(fillInput.value) : null;

    recomputeAndRender(recognition);
  }

  function recomputeAndRender(recognition) {
    const { blend: rawBlend, fillLevel: rawFill } = recognition;

    // -- Apply Q&A adjustments ----------------------------------------------
    let blend = { ...rawBlend };
    let fillLevel = qaAnswers.fillLevel ?? rawFill;

    // Q1 - clothing type shifts blend
    if (qaAnswers.clothingType === 'kids') {
      blend.light  = Math.min(1, blend.light  + 0.15);
      blend.heavy  = Math.max(0, blend.heavy  - 0.10);
      blend.medium = Math.max(0, blend.medium - 0.05);
    } else if (qaAnswers.clothingType === 'adult') {
      blend.medium = Math.min(1, blend.medium + 0.05);
      blend.light  = Math.max(0, blend.light  - 0.05);
    }

    // Q2 - towels/sheets shift heavy fraction
    const towelDelta = { none: -0.10, few: 0, lot: 0.15 };
    const td = towelDelta[qaAnswers.towelsSheets] ?? 0;
    blend.heavy = Math.max(0, blend.heavy + td);
    blend.light = Math.max(0, blend.light - td);

    // Normalise blend so fractions sum to 1
    const total = blend.light + blend.medium + blend.heavy;
    if (total > 0) {
      blend.light  /= total;
      blend.medium /= total;
      blend.heavy  /= total;
    }

    // Q3 - heavy items add a fixed weight on top
    const HEAVY_WEIGHTS = { comforter: 5.5, duvet: 4.0, suit: 3.0 };
    const heavyAddLb = qaAnswers.heavyItems.reduce((sum, item) => {
      return sum + (HEAVY_WEIGHTS[item] ?? 0);
    }, 0);

    // Compute range from adjusted blend + fill
    const range = estimateWeightRange(blend, fillLevel);
    const adjLowLb  = range.lowLb  + heavyAddLb;
    const adjHighLb = range.highLb + heavyAddLb;
    const adjMidLb  = range.midLb  + heavyAddLb;

    const planId = recommendPlan(adjMidLb);
    const plan   = PLANS[planId];
    const quote  = estimateQuote(adjLowLb, adjHighLb, planId);

    // -- Update live range display in quote card ----------------------------
    if (quoteRangeEl) {
      const newText = `${fmtLb(adjLowLb)}-${fmtLb(adjHighLb)} lb`;
      if (quoteRangeEl.textContent.trim() !== newText) {
        quoteRangeEl.textContent = newText;
        // Pulse animation for sighted users
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          quoteRangeEl.classList.remove('live-range--updating');
          void quoteRangeEl.offsetWidth; // force reflow
          quoteRangeEl.classList.add('live-range--updating');
        }
      }
    }
    if (quoteOverageEl) {
      const hasOverage = quote.overageHigh > 0;
      quoteOverageEl.textContent = hasOverage
        ? `About $${fmt(quote.overageLow)}-$${fmt(quote.overageHigh)} overage at $2.50/lb over ${quote.cap} lb cap`
        : `Fits within the ${quote.cap} lb bag cap - no overage expected`;
      quoteOverageEl.style.color = hasOverage ? 'var(--warning)' : 'var(--success)';
    }

    // -- Render/update refined quote summary --------------------------------
    const allAnswered =
      qaAnswers.clothingType !== null &&
      qaAnswers.towelsSheets !== null &&
      qaAnswers.fillLevel    !== null;

    refinedArea.innerHTML = renderRefinedSummary(
      adjLowLb, adjHighLb, planId, plan, quote, allAnswered,
    );

    // Wire the CTA buttons
    const btnBook = refinedArea.querySelector('#btn-book');
    if (btnBook) {
      btnBook.addEventListener('click', () =>
        handleBook(adjLowLb, adjHighLb, planId),
      );
    }
    const btnReset = refinedArea.querySelector('#btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', handleReset);
    }
  }

  // Listen to all Q&A inputs
  section.addEventListener('change', handleChange);
}

function renderRefinedSummary(lowLb, highLb, planId, plan, quote, allAnswered) {
  const hasOverage  = quote.overageHigh > 0;
  const overageText = hasOverage
    ? `About $${fmt(quote.overageLow)}-$${fmt(quote.overageHigh)} potential overage`
    : 'No overage expected';

  return `
    <div class="refined-quote-card" role="region" aria-label="Refined quote summary">
      <h2 id="refined-heading" style="font-size: var(--text-xl); margin-bottom: var(--space-4);">
        ${allAnswered ? 'Refined estimate' : 'Estimate so far'}
      </h2>

      <div class="refined-summary">
        <div>
          <div class="refined-summary__range live-range" aria-label="Weight estimate ${fmtLb(lowLb)}-${fmtLb(highLb)} lb">
            ${fmtLb(lowLb)}-${fmtLb(highLb)} lb
          </div>
          <div class="refined-summary__plan" style="margin-top: var(--space-1);">
            ${plan.name} plan - $${plan.price}/mo
          </div>
        </div>
        <div style="font-size: var(--text-sm); color: ${hasOverage ? 'var(--warning)' : 'var(--success)'};">
          ${escHtml(overageText)}
        </div>
      </div>

      <p class="quote-transparency" style="margin-bottom: var(--space-6);">
        <strong>This is an estimate.</strong> Your final price is set by the scale at pickup,
        weighed in front of you before any charge is processed.
      </p>

      <!-- CTAs -->
      <div class="estimate-cta-block">
        <button
          id="btn-book"
          class="btn btn--primary"
          style="min-height: 3rem; min-width: 220px;"
          type="button"
        >
          Looks right - book a pickup
        </button>
        <button
          id="btn-reset"
          class="btn btn--ghost"
          style="min-height: 3rem;"
          type="button"
          aria-label="Start over - clear all photos and answers"
        >
          Start over
        </button>
      </div>
    </div>
  `;
}

function handleBook(lowLb, highLb, planId) {
  // Persist the estimate for the booking page
  store.set('fold_estimate', {
    rangeLowLb:  lowLb,
    rangeHighLb: highLb,
    planId,
    answers:     { ...qaAnswers },
    ts:          Date.now(),
  });

  // Merge plan into the booking state so booking.js can read it
  // MINIMAL handoff - do nothing else to the booking flow
  const b = store.get('fold_booking', {});
  b.plan = planId;
  store.set('fold_booking', b);

  window.location.href = 'schedule.html';
}

function handleReset() {
  // Clear persisted estimate
  store.set('fold_estimate', null);

  // Reset module state
  uploadedFiles    = [];
  recognitionResult = null;
  qaAnswers = {
    clothingType: null,
    towelsSheets: null,
    heavyItems:   [],
    fillLevel:    null,
  };

  // Hide downstream sections
  const qSection = document.getElementById('section-qa');
  const qtSection = document.getElementById('section-quote');
  if (qSection)  { qSection.innerHTML  = ''; qSection.setAttribute('hidden',  ''); }
  if (qtSection) { qtSection.innerHTML = ''; qtSection.setAttribute('hidden', ''); }

  // Re-render the upload section fresh
  renderUploadSection();

  // Scroll back to upload
  document.getElementById('section-upload')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// -- Shared UI helpers ------------------------------------------------------

function renderLoadingState(message = 'Loading...') {
  return `
    <div class="state-loading" role="status" aria-label="${escHtml(message)}">
      <div class="state-loading__spinner" aria-hidden="true"></div>
      <p>${escHtml(message)}</p>
    </div>
  `;
}

function renderErrorState(message, retryFn) {
  const id = `err-retry-${Date.now()}`;
  // Wire retry after insertion
  requestAnimationFrame(() => {
    document.getElementById(id)?.addEventListener('click', retryFn);
  });
  return `
    <div class="state-error" role="alert">
      <strong>Something went wrong</strong>
      <p style="margin-top: var(--space-2);">${escHtml(message)}</p>
      <button id="${id}" class="btn btn--ghost" type="button">Try again</button>
    </div>
  `;
}

function qaRadio(name, value, label) {
  const id = `qa-${name}-${value}`;
  return `
    <span class="qa-option">
      <input type="radio" name="${name}" id="${id}" value="${value}">
      <label for="${id}">${escHtml(label)}</label>
    </span>
  `;
}

function qaCheckbox(name, value, label) {
  const id = `qa-${name}`;
  return `
    <span class="qa-option">
      <input type="checkbox" name="${name}" id="${id}" value="${value}">
      <label for="${id}">${escHtml(label)}</label>
    </span>
  `;
}

// -- Utility ----------------------------------------------------------------

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Format lb to 1 decimal, dropping .0 */
function fmtLb(n) {
  const r = Math.round(n * 10) / 10;
  return Number.isInteger(r) ? String(r) : r.toFixed(1);
}

/** Format dollars to 2 decimal places */
function fmt(n) {
  return n.toFixed(2);
}

/** Minimal HTML escaping to prevent XSS from file names etc. */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

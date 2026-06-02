/**
 * FOLD — estimate-data.js
 * 3KD Vision Engine — single source of truth for garment weights and pricing.
 *
 * Weights are APPROXIMATE dry weights in pounds (lb).
 * Calibrate from real pickup-scale data over time — that feedback loop
 * is the accuracy advantage.
 *
 * // TODO: 3KD — replace GARMENTS weights with empirical median values
 *   collected from pickup-scale data.
 */

// ── Garment dry weights (lb) ───────────────────────────────────────────────

export const GARMENTS = {
  light: {
    tshirt:        0.35,
    blouse:        0.30,
    undergarment:  0.15,
    childItem:     0.20,
  },
  medium: {
    collaredShirt: 0.50,
    dress:         0.60,
    pants:         0.90,
    jeans:         1.10,
  },
  heavy: {
    sweater:       0.90,
    towel:         0.85,
    suit:          3.00,
    sheetSet:      3.50,
    comforter:     5.50,
  },
};

// ── Plans ──────────────────────────────────────────────────────────────────

/** @type {Record<string, { name: string, price: number, bags: number, capLb: number, pickups: number, featured?: boolean }>} */
export const PLANS = {
  solo: {
    name:    'Solo',
    price:   79,
    bags:    2,
    capLb:   18,
    pickups: 2,
  },
  household: {
    name:     'Household',
    price:    149,
    bags:     4,
    capLb:    18,
    pickups:  4,
    featured: true,
  },
  estate: {
    name:    'Estate',
    price:   279,
    bags:    6,
    capLb:   20,
    pickups: 8,
  },
};

// ── Billing ────────────────────────────────────────────────────────────────

export const BILLING = {
  overagePerLb: 2.50,
};

// ── Density assumptions (lb at 100% fill, per blend category) ─────────────
// A standard FOLD bag fully packed with items from each category:
const DENSITY_LB_FULL = {
  light:  10, // fluffy, low-density clothing
  medium: 15, // everyday mix
  heavy:  22, // towels, denim, bedding
};

// ── Pure helpers ───────────────────────────────────────────────────────────

/**
 * Estimate a weight range (lb) from a blend and fill level.
 *
 * @param {{ light: number, medium: number, heavy: number }} blend  — fractions summing to ~1
 * @param {number} fillLevel  — 0–1 representing how full the bag looks
 * @returns {{ lowLb: number, midLb: number, highLb: number }}
 */
export function estimateWeightRange(blend, fillLevel) {
  const blendMidLb =
    blend.light  * DENSITY_LB_FULL.light  +
    blend.medium * DENSITY_LB_FULL.medium +
    blend.heavy  * DENSITY_LB_FULL.heavy;

  const midLb = fillLevel * blendMidLb;
  const lowLb  = Math.max(0.5, midLb * 0.85); // −15%
  const highLb = midLb * 1.15;                 // +15%

  return {
    lowLb:  Math.round(lowLb  * 10) / 10,
    midLb:  Math.round(midLb  * 10) / 10,
    highLb: Math.round(highLb * 10) / 10,
  };
}

/**
 * Recommend the smallest plan whose per-bag capLb can hold a load of midLb.
 * Falls back to 'estate' for very heavy loads.
 *
 * @param {number} midLb
 * @returns {string}  plan id
 */
export function recommendPlan(midLb) {
  // Prioritise in ascending price order
  const order = ['solo', 'household', 'estate'];
  for (const id of order) {
    if (midLb <= PLANS[id].capLb) return id;
  }
  return 'estate'; // heaviest plan as safety net
}

/**
 * Estimate the quote for a given weight range and plan.
 *
 * @param {number} lowLb
 * @param {number} highLb
 * @param {string} planId
 * @returns {{ planPrice: number, overageLow: number, overageHigh: number, cap: number }}
 */
export function estimateQuote(lowLb, highLb, planId) {
  const plan = PLANS[planId];
  const cap  = plan.capLb;

  const overageLow  = Math.max(0, lowLb  - cap) * BILLING.overagePerLb;
  const overageHigh = Math.max(0, highLb - cap) * BILLING.overagePerLb;

  return {
    planPrice:   plan.price,
    overageLow:  Math.round(overageLow  * 100) / 100,
    overageHigh: Math.round(overageHigh * 100) / 100,
    cap,
  };
}

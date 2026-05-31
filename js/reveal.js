/**
 * FOLD — reveal.js
 * IntersectionObserver-driven scroll reveals.
 * Respects prefers-reduced-motion.
 * Targets elements with .reveal and .reveal-group.
 */

(() => {
  // If the user prefers reduced motion, skip all animation
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduced) {
    // Make all reveal elements immediately visible
    document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // IntersectionObserver not available — fall back gracefully
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // one-shot reveal
        }
      });
    },
    {
      threshold: 0.12,      // element is 12% visible before triggering
      rootMargin: '0px 0px -40px 0px', // slight early trigger from bottom
    }
  );

  // Observe all reveal targets
  document.querySelectorAll('.reveal, .reveal-group').forEach(el => {
    observer.observe(el);
  });
})();

/**
 * FOLD — map.js
 * Lazy-initialise the service-area map only when its
 * container is scrolled into view.
 *
 * Uses Leaflet (loaded dynamically) with OpenStreetMap tiles.
 * The map element must have id="service-map".
 * A text list of served neighbourhoods is always present in
 * the HTML as the non-map fallback (accessibility).
 */

(() => {
  const mapEl = document.getElementById('service-map');
  if (!mapEl) return;

  let mapInitialised = false;

  // Montgomery, AL approximate centre
  const CENTER = [32.3792, -86.3077];

  // Placeholder service-area polygon (convex hull approximation)
  const SERVICE_POLYGON = [
    [32.43, -86.38], [32.43, -86.22], [32.33, -86.18],
    [32.30, -86.22], [32.30, -86.38], [32.35, -86.42],
  ];

  function initMap() {
    if (mapInitialised) return;
    mapInitialised = true;

    // Dynamically load Leaflet CSS
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Dynamically load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lylyzeQ=';
    script.crossOrigin = 'anonymous';
    script.onload = () => buildMap();
    document.head.appendChild(script);
  }

  function buildMap() {
    /* global L */
    const map = L.map('service-map', {
      center: CENTER,
      zoom:   12,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Service area shading
    L.polygon(SERVICE_POLYGON, {
      color:       '#2E7D32',
      weight:      2,
      fillColor:   '#5FAF6A',
      fillOpacity: 0.15,
    }).addTo(map).bindPopup('FOLD service area — Montgomery, AL');

    // Centre marker
    L.marker(CENTER)
      .addTo(map)
      .bindPopup('<strong>FOLD</strong><br>Montgomery, AL');
  }

  // Observe map container — only load Leaflet when visible
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          initMap();
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(mapEl);
  } else {
    // No IO support — init immediately
    initMap();
  }
})();

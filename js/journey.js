// ============================================================
// THE JOURNEY: scroll-driven story map (MapLibre GL)
// Chapters pair with the .journey-chapter sections in journey.html
// by index. Camera settings per chapter; markers + route drawn
// from the same data.
// ============================================================

const STOPS = [
  {
    name: 'Spring Green, WI',
    coords: [-90.067, 43.175],
    camera: { center: [-90.10, 43.16], zoom: 11.2, pitch: 45, bearing: -20 },
  },
  {
    name: 'UW-Milwaukee / AGSL',
    coords: [-87.951, 43.075],
    camera: { center: [-87.93, 43.06], zoom: 11.5, pitch: 30, bearing: 15 },
  },
  {
    name: 'City of New Berlin, WI',
    coords: [-88.108, 42.976],
    camera: { center: [-88.108, 42.976], zoom: 11.5, pitch: 35, bearing: -10 },
  },
  {
    name: 'Sequoia & Kings Canyon NP',
    coords: [-118.565, 36.565],
    camera: { center: [-118.70, 36.62], zoom: 9.8, pitch: 62, bearing: 35 },
  },
  {
    name: 'USFS Lake Tahoe Basin (Meyers, CA)',
    coords: [-119.999, 38.857],
    camera: { center: [-120.01, 38.90], zoom: 10.8, pitch: 58, bearing: -25 },
  },
  {
    name: 'El Dorado National Forest',
    coords: [-120.47, 38.78],
    camera: { center: [-120.42, 38.82], zoom: 9.6, pitch: 55, bearing: 20 },
  },
  {
    name: 'TRPA (Stateline, NV)',
    coords: [-119.940, 38.960],
    camera: { center: [-120.00, 39.02], zoom: 10.4, pitch: 60, bearing: -40 },
  },
  {
    name: 'UW-Madison',
    coords: [-89.408, 43.076],
    camera: { center: [-89.40, 43.075], zoom: 11.4, pitch: 30, bearing: 10 },
  },
  {
    name: 'Blue Basin Cartography (South Lake Tahoe, CA)',
    coords: [-120.012, 38.940],
    camera: { center: [-120.04, 39.09], zoom: 9.4, pitch: 55, bearing: -15 },
  },
  {
    // Overview chapter: no marker of its own
    name: null,
    coords: null,
    camera: { center: [-104.5, 41.3], zoom: 3.7, pitch: 0, bearing: 0 },
  },
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const map = new maplibregl.Map({
  container: 'journey-map',
  style: 'https://tiles.openfreemap.org/styles/positron',
  center: [-90.10, 43.16],
  zoom: 10.5,
  pitch: 45,
  bearing: -20,
  attributionControl: { compact: true },
  interactive: false, // scroll drives the camera; the page scrolls normally
});

map.on('load', () => {
  // 3D terrain + hillshade (AWS Open Data Terrain Tiles, terrarium encoding)
  map.addSource('dem', {
    type: 'raster-dem',
    tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
    encoding: 'terrarium',
    tileSize: 256,
    maxzoom: 13,
    attribution: 'Terrain: <a href="https://registry.opendata.aws/terrain-tiles/">AWS Open Data</a>',
  });
  map.setTerrain({ source: 'dem', exaggeration: 1.4 });

  map.addSource('dem-hillshade', {
    type: 'raster-dem',
    tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
    encoding: 'terrarium',
    tileSize: 256,
    maxzoom: 13,
  });
  map.addLayer({
    id: 'hillshade',
    type: 'hillshade',
    source: 'dem-hillshade',
    paint: {
      'hillshade-exaggeration': 0.35,
      'hillshade-shadow-color': '#4A6741',
      'hillshade-highlight-color': '#FAFAF6',
      'hillshade-accent-color': '#C9A86C',
    },
  });

  // Route line through every stop
  const routeCoords = STOPS.filter(s => s.coords).map(s => s.coords);
  map.addSource('route', {
    type: 'geojson',
    data: { type: 'Feature', geometry: { type: 'LineString', coordinates: routeCoords } },
  });
  map.addLayer({
    id: 'route',
    type: 'line',
    source: 'route',
    layout: { 'line-cap': 'round', 'line-join': 'round' },
    paint: {
      'line-color': '#BF5B18',
      'line-width': 2,
      'line-opacity': 0.55,
      'line-dasharray': [0.8, 2.2],
    },
  });

  // Numbered hex markers
  STOPS.forEach((stop, i) => {
    if (!stop.coords) return;
    const el = document.createElement('div');
    el.className = 'journey-marker';
    el.dataset.stop = i;
    el.innerHTML = `<svg viewBox="0 0 30 34" aria-hidden="true"><polygon points="15,1 28,9 28,25 15,33 2,25 2,9"/></svg><span>${i + 1}</span>`;
    el.title = stop.name;
    new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(stop.coords).addTo(map);
  });
});

// Scroll-driven chapters
const chapters = document.querySelectorAll('.journey-chapter');
let activeChapter = -1;

function setChapter(i) {
  if (i === activeChapter) return;
  activeChapter = i;

  const cam = STOPS[i].camera;
  if (reduceMotion) {
    map.jumpTo(cam);
  } else {
    map.flyTo({ ...cam, duration: 2600, essential: false });
  }

  chapters.forEach((c, ci) => c.classList.toggle('is-active', ci === i));
  document.querySelectorAll('.journey-marker').forEach(m => {
    m.classList.toggle('is-active', Number(m.dataset.stop) === i);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setChapter(Number(entry.target.dataset.chapter));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });

chapters.forEach(c => observer.observe(c));

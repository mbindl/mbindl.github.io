// ============================================================
// PROJECT DATA: single source of truth for the home page
// featured grid and the work page grid.
//
// To add or update a project:
//   1. Drop a thumbnail in /assets (aim for ~300 KB or less,
//      16:10 aspect ratio looks best in the grid).
//   2. Add or edit an entry below.
//
// Fields:
//   id          unique slug
//   title       card heading
//   desc        short description shown on cards
//   wideDesc    (optional) longer text for the full-width card
//   tags        display chips; must exist in TAG_CLASSES (main.js)
//   categories  filter keys: webmap dashboard carto dataviz print trpa bbc
//   year        (optional) shown as a year chip
//   thumb       image path, or null to use placeholder
//   alt         image alt text (required when thumb is set)
//   placeholder { className, icon } used when thumb is null
//   href        detail page path or external URL; null = no link
//   external    true to open in a new tab with the external icon
//   featured    true to show on the home page
//   wide        true = full-width card (home page only)
//   credit      (optional) small attribution line
// ============================================================

const PROJECTS = [
  {
    id: 'climate-dashboard',
    title: 'Climate Resilience Dashboard',
    desc: '33 indicators across 4 goals: air quality, lake health, forest resilience, and built systems. Embeddable chart pages feeding a CMS-driven platform used by agency staff and the public.',
    tags: ['Dashboard', 'TRPA'],
    categories: ['dashboard', 'dataviz', 'trpa'],
    year: 2025,
    thumb: 'assets/climate_thumb.jpg',
    alt: 'Climate Resilience Dashboard goals and outcomes: four goals spanning climate conditions, resilient environment, built environment, and community resilience',
    href: 'portfolio/climate-dashboard.html',
    featured: true,
  },
  {
    id: 'forest-health',
    title: 'Forest Health Thresholds',
    desc: "A monitoring framework tracking forest condition indicators against science-based thresholds for the Tahoe basin, supporting TRPA's adaptive management of fire risk, tree mortality, and ecosystem resilience.",
    tags: ['Dashboard', 'TRPA'],
    categories: ['dashboard', 'dataviz', 'trpa'],
    year: 2025,
    thumb: 'assets/foresthealth_thumb.jpg',
    alt: 'Forest Health Threshold Standards Update story map, with Lake Tahoe shoreline and forest at sunset',
    href: 'https://storymaps.arcgis.com/collections/d89adce0aa9047efb018e49a6f8eff87',
    external: true,
    featured: true,
  },
  {
    id: 'driftless-maps',
    title: 'Driftless Region Map Series',
    desc: "Three commissioned maps of Wisconsin's Driftless Region drawn in the graphic language of Frank Lloyd Wright's Prairie School. Made in ArcGIS Pro and Illustrator through Blue Basin Cartography.",
    wideDesc: "Three commissioned maps of Wisconsin's Driftless Region: the Lower Wisconsin Riverway, Kickapoo River Valley, and Spring Green area, drawn in the graphic language of Frank Lloyd Wright's Prairie School. Wright spent his life in Spring Green; the maps borrow his organic forms, earthen palette, and reverence for the land's horizontal character. Made in ArcGIS Pro and Illustrator through Blue Basin Cartography.",
    tags: ['Cartography', 'Print', 'Blue Basin'],
    categories: ['carto', 'print', 'bbc'],
    thumb: 'assets/driftless_thumb.jpg',
    alt: 'Spring Green Driftless series map detail: the Wisconsin River winding past forested bluffs in a Prairie School palette',
    href: 'https://bluebasincartography.com/products/spring-green',
    external: true,
    featured: true,
    wide: true,
    credit: 'Blue Basin Cartography',
  },
  {
    id: 'regional-plan-tracking',
    title: 'Regional Plan Tracking',
    desc: "Live dashboards tracking development in the Tahoe basin against the Regional Plan's growth caps: how much has been built and what's still available.",
    tags: ['Dashboard', 'Data Viz', 'TRPA'],
    categories: ['dashboard', 'dataviz', 'trpa'],
    thumb: 'assets/regionalplan_thumb.jpg',
    alt: 'Regional Plan Tracking dashboard showing residential allocations, bonus units, commercial floor area, and tourist accommodation against Regional Plan caps',
    href: 'portfolio/regional-plan-tracking.html',
  },
  {
    id: 'permit-review',
    title: 'Permit Review Tool',
    desc: 'Web application supporting TRPA permit review: custom geoprocessing intersects proposed project boundaries with environmental constraint layers to surface issues before staff review.',
    tags: ['Web Map', 'TRPA'],
    categories: ['webmap', 'trpa'],
    thumb: 'assets/permitreview_thumb.jpg',
    alt: 'Permit Review Map showing parcel search, permissible use table, and land capability layers over a parcel basemap',
    href: 'https://gis.trpa.org/permitreview/',
    external: true,
  },
];

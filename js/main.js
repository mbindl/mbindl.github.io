// Navbar scroll shadow
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ============================================================
// Project card rendering (data lives in js/projects.js)
// ============================================================
const TAG_CLASSES = {
  'Web Map':    'tag-webmap',
  'Dashboard':  'tag-dashboard',
  'Data Viz':   'tag-dataviz',
  'Cartography':'tag-carto',
  'Print':      'tag-print',
  'TRPA':       'tag-trpa',
  'Blue Basin': 'tag-bbc',
  'Commission': 'tag-commission',
};

function projectTagsHtml(p) {
  const chips = p.tags.map(t =>
    `<span class="tag ${TAG_CLASSES[t] || ''}">${t}</span>`
  );
  if (p.year) chips.push(`<span class="tag tag-year">${p.year}</span>`);
  return `<div class="project-tags">${chips.join('')}</div>`;
}

function projectImageHtml(p, wide) {
  const wrapClasses = ['project-img-wrap'];
  if (!p.thumb && p.placeholder) wrapClasses.push(p.placeholder.className);
  if (wide) wrapClasses.push('project-wide-img');

  const overlayIcon = p.external ? 'fa-arrow-up-right-from-square' : 'fa-arrow-right';
  const overlay = p.href
    ? `<div class="project-img-overlay"><i class="fa-solid ${overlayIcon}"></i></div>`
    : '';

  const inner = p.thumb
    ? `<img src="${p.thumb}" alt="${p.alt || p.title}" class="project-img" loading="lazy">`
    : `<i class="fa-solid ${p.placeholder.icon} project-thumb-icon" aria-hidden="true"></i>`;

  return `<div class="${wrapClasses.join(' ')}">${inner}${overlay}</div>`;
}

// Whole card is clickable via a stretched link on the title
function projectTitleHtml(p) {
  if (!p.href) return `<h3 class="project-title">${p.title}</h3>`;
  const ext = p.external ? ' target="_blank" rel="noopener"' : '';
  const extIcon = p.external
    ? ' <i class="fa-solid fa-arrow-up-right-from-square fa-xs" aria-hidden="true"></i>'
    : '';
  return `<h3 class="project-title"><a href="${p.href}" class="project-card-link"${ext}>${p.title}${extIcon}</a></h3>`;
}

function projectCardHtml(p, { wide = false } = {}) {
  const desc = (wide && p.wideDesc) ? p.wideDesc : p.desc;
  const credit = p.credit ? `<p class="project-credit">${p.credit}</p>` : '';
  return `
    <div class="project-card${wide ? ' project-card-wide' : ''}" data-categories="${p.categories.join(' ')}">
      ${projectImageHtml(p, wide)}
      <div class="project-body">
        ${projectTagsHtml(p)}
        ${projectTitleHtml(p)}
        <p class="project-desc">${desc}</p>
        ${credit}
      </div>
    </div>`;
}

if (typeof PROJECTS !== 'undefined') {
  // Home page: featured grid + optional full-width card
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid) {
    const featured = PROJECTS.filter(p => p.featured);
    featuredGrid.innerHTML = featured.filter(p => !p.wide)
      .map(p => projectCardHtml(p)).join('');
    const wideHost = document.getElementById('featured-wide');
    if (wideHost) {
      wideHost.innerHTML = featured.filter(p => p.wide)
        .map(p => projectCardHtml(p, { wide: true })).join('');
    }
  }

  // Work page: full grid
  const projectsGrid = document.getElementById('projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = PROJECTS.map(p => projectCardHtml(p)).join('');
  }
}

// Project grid filter (work.html); runs after render so it sees the cards
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  const cards = document.querySelectorAll('.projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = (card.dataset.categories || '').split(/\s+/);
        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

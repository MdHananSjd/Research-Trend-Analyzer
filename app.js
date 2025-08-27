// Sample data seeding
const sampleTrending = [
  { topic: 'Diffusion Models', papers: 42, keywords: ['latent', 'denoising', 'guidance'] },
  { topic: 'Large Language Models', papers: 57, keywords: ['alignment', 'tool use', 'distillation'] },
  { topic: 'Multimodal Learning', papers: 34, keywords: ['vision-language', 'contrastive', 'fusion'] },
  { topic: 'Agentic AI', papers: 29, keywords: ['planning', 'memory', 'autonomy'] },
  { topic: 'Efficient Training', papers: 23, keywords: ['LoRA', 'quantization', 'sparsity'] },
  { topic: 'Robustness & Safety', papers: 18, keywords: ['adversarial', 'evaluations', 'interpretability'] },
];

const samplePapers = [
  {
    title: 'Guided Latent Diffusion for High-Fidelity Image Synthesis',
    authors: 'A. Researcher, B. Scientist',
    abstract: 'We propose a guided latent diffusion framework that improves fidelity and controllability through adaptive denoising schedules and classifier-free guidance... ',
    link: '#'
  },
  {
    title: 'Tool-Use Enhanced LLMs via Modular Reasoning',
    authors: 'C. Engineer, D. Analyst',
    abstract: 'We present a modular reasoning architecture enabling LLMs to interface with tools and APIs, improving task success with dynamic planning and verification... ',
    link: '#'
  },
  {
    title: 'Contrastive Multimodal Fusion with Cross-Modal Memory',
    authors: 'E. Vision, F. Language',
    abstract: 'A novel cross-modal memory mechanism enhances fusion of visual and textual features, yielding gains in retrieval and VQA benchmarks... ',
    link: '#'
  }
];

function createTrendCard({ topic, papers, keywords }) {
  const card = document.createElement('article');
  card.className = 'trend-card';
  card.innerHTML = `
    <h3 class="trend-title">${topic}</h3>
    <div class="trend-meta">${papers} papers</div>
    <div class="keyword-chips">${keywords.map(k => `<span class="chip">${k}</span>`).join('')}</div>
  `;
  return card;
}

function createPaperCard({ title, authors, abstract, link }) {
  const card = document.createElement('article');
  card.className = 'paper-card';
  const abstractId = `abs-${Math.random().toString(36).slice(2)}`;
  card.innerHTML = `
    <h3 class="paper-title">${title}</h3>
    <p class="paper-authors">${authors}</p>
    <div class="paper-actions">
      <button class="toggle-abstract" aria-controls="${abstractId}" aria-expanded="false">Show abstract</button>
      <a class="link" href="${link}" target="_blank" rel="noreferrer noopener">Full paper</a>
    </div>
    <p id="${abstractId}" class="paper-abstract" hidden>${abstract}</p>
  `;
  return card;
}

function mountTrending() {
  const container = document.getElementById('trending-cards');
  container.innerHTML = '';
  sampleTrending.forEach(item => container.appendChild(createTrendCard(item)));
}

function mountPapers() {
  const list = document.getElementById('papers-list');
  list.innerHTML = '';
  samplePapers.forEach(p => list.appendChild(createPaperCard(p)));
}

function setupAbstractToggles() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle-abstract');
    if (!btn) return;
    const id = btn.getAttribute('aria-controls');
    const target = document.getElementById(id);
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!isOpen));
    btn.textContent = isOpen ? 'Show abstract' : 'Hide abstract';
    if (target) {
      if (isOpen) {
        target.setAttribute('hidden', '');
      } else {
        target.removeAttribute('hidden');
      }
    }
  });
}

function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  if (!hamburger || !sidebar) return;
  hamburger.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}

function setupFilters() {
  const applyBtn = document.getElementById('apply-filters');
  if (!applyBtn) return;
  applyBtn.addEventListener('click', () => {
    // Simulate data refresh animations for viz placeholders
    const vizBodies = document.querySelectorAll('.viz-body');
    vizBodies.forEach((el) => {
      el.style.opacity = '0.6';
      el.animate([
        { transform: 'scale(0.98)', opacity: 0.6 },
        { transform: 'scale(1.00)', opacity: 1 }
      ], { duration: 400, easing: 'ease-out' });
      setTimeout(() => { el.style.opacity = '1'; }, 400);
    });
  });
}

function setup() {
  mountTrending();
  mountPapers();
  setupAbstractToggles();
  setupHamburger();
  setupFilters();
  setupScrollSpy();
}

document.addEventListener('DOMContentLoaded', setup);

// ScrollSpy for navbar active link
function setupScrollSpy() {
  const sections = Array.from(document.querySelectorAll('main .section'));
  const links = Array.from(document.querySelectorAll('.nav-links .nav-link'));
  const linkByHash = new Map(links.map(l => [l.getAttribute('href'), l]));

  // Clear default active
  links.forEach(l => l.classList.remove('active'));

  const observer = new IntersectionObserver((entries) => {
    // Choose the most visible section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = `#${visible.target.id}`;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
  }, { root: null, rootMargin: '0px 0px -50% 0px', threshold: [0.25, 0.5, 0.75, 1] });

  sections.forEach(sec => observer.observe(sec));

  // Fallback: set initial based on scroll position
  requestAnimationFrame(() => {
    let current = sections[0];
    const fromTop = window.scrollY + 100;
    for (const sec of sections) {
      if (sec.offsetTop <= fromTop) current = sec;
    }
    const id = `#${current.id}`;
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
  });
}



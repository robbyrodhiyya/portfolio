// ── Dark Mode ──────────────────────────────────────────────────────────────
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') root.setAttribute('data-theme', 'dark');

  function toggleDarkMode() {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateDarkModeIcon();
  }

  function updateDarkModeIcon() {
    const btn = document.getElementById('dark-mode-btn');
    if (!btn) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('dark-mode-btn');
    if (btn) {
      btn.addEventListener('click', toggleDarkMode);
      updateDarkModeIcon();
    }
  });
})();

// ── Back to Top ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ── Project Filter ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const cards = document.querySelectorAll('.project-card');

      cards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = card.getAttribute('data-tags') || '';
          if (tags.includes(filter)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
});

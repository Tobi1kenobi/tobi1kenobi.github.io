(() => {
  const pubList = document.getElementById('pub-list');
  if (pubList) {
    const items = Array.from(pubList.querySelectorAll('.publication'));
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    const searchInput = document.getElementById('pub-search');
    const countEl = document.getElementById('pub-count');
    const emptyEl = document.getElementById('empty-results');
    const resetBtn = document.getElementById('reset-search');

    let activeFilter = 'all';

    const updateList = () => {
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      let visibleCount = 0;

      items.forEach((item) => {
        const categories = (item.dataset.category || '').split(/\s+/);
        const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
        const matchesQuery = !query || item.textContent.toLowerCase().includes(query);
        const show = matchesFilter && matchesQuery;
        item.hidden = !show;
        if (show) visibleCount += 1;
      });

      if (countEl) {
        countEl.textContent = `Showing ${visibleCount} of ${items.length} entries`;
      }
      if (emptyEl) {
        emptyEl.hidden = visibleCount > 0;
      }
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter || 'all';
        filterButtons.forEach((b) => {
          const isCurrent = b === btn;
          b.classList.toggle('is-active', isCurrent);
          b.setAttribute('aria-pressed', String(isCurrent));
        });
        updateList();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', updateList);
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeFilter = 'all';
        if (searchInput) searchInput.value = '';
        filterButtons.forEach((b) => {
          const isAll = (b.dataset.filter || '') === 'all';
          b.classList.toggle('is-active', isAll);
          b.setAttribute('aria-pressed', String(isAll));
        });
        updateList();
      });
    }

    updateList();
  }

  const printBtn = document.getElementById('print-cv');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  const iconGrid = document.getElementById('iconGrid');
  const iconSearch = document.getElementById('iconSearch');
  const itemsPerPageSelect = document.getElementById('itemsPerPage');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');
  const pageNumbers = document.getElementById('pageNumbers');
  const iconCountEl = document.getElementById('iconCount');
  const pageInfoEl = document.getElementById('pageInfo');
  const toast = document.getElementById('toast');

  let currentPage = 1;
  let itemsPerPage = 48;
  let filteredIcons = [...window.remixIcons];

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`已复制: ${text}`);
    }).catch(err => {
      console.error('Copy failed:', err);
      showToast('复制失败');
    });
  }

  function renderIcons() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const iconsToShow = filteredIcons.slice(start, end);

    iconGrid.innerHTML = iconsToShow.map(iconName => `
      <div class="icon-item" data-icon="${iconName}">
        <i class="${iconName} icon-display"></i>
        <span class="icon-name">${iconName}</span>
      </div>
    `).join('');

    iconCountEl.textContent = `共 ${filteredIcons.length} 个图标`;
    pageInfoEl.textContent = `第 ${currentPage} 页 / 共 ${Math.ceil(filteredIcons.length / itemsPerPage)} 页`;

    document.querySelectorAll('.icon-item').forEach(item => {
      item.addEventListener('click', function () {
        const iconName = this.getAttribute('data-icon').replace('ri-', '');

        copyToClipboard(`<remix-icon name="${iconName}"></remix-icon>`);
      });
    });
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
    const maxVisiblePages = 7;

    pageNumbers.innerHTML = '';

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
          currentPage = i;
          renderIcons();
          renderPagination();
        });
        pageNumbers.appendChild(pageBtn);
      }
    } else {
      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.min(totalPages, currentPage + 3);

      if (currentPage <= 4) {
        endPage = Math.min(totalPages, 7);
      } else if (currentPage >= totalPages - 3) {
        startPage = Math.max(1, totalPages - 6);
      }

      if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'page-number';
        firstBtn.textContent = '1';
        firstBtn.addEventListener('click', () => {
          currentPage = 1;
          renderIcons();
          renderPagination();
        });
        pageNumbers.appendChild(firstBtn);

        if (startPage > 2) {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'page-number ellipsis';
          ellipsis.textContent = '...';
          pageNumbers.appendChild(ellipsis);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
          currentPage = i;
          renderIcons();
          renderPagination();
        });
        pageNumbers.appendChild(pageBtn);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'page-number ellipsis';
          ellipsis.textContent = '...';
          pageNumbers.appendChild(ellipsis);
        }

        const lastBtn = document.createElement('button');
        lastBtn.className = 'page-number';
        lastBtn.textContent = totalPages;
        lastBtn.addEventListener('click', () => {
          currentPage = totalPages;
          renderIcons();
          renderPagination();
        });
        pageNumbers.appendChild(lastBtn);
      }
    }

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
  }

  function filterIcons(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    if (term === '') {
      filteredIcons = [...window.remixIcons];
    } else {
      filteredIcons = window.remixIcons.filter(icon =>
        icon.toLowerCase().includes(term)
      );
    }
    currentPage = 1;
    renderIcons();
    renderPagination();
  }

  iconSearch.addEventListener('input', function () {
    filterIcons(this.value);
  });

  itemsPerPageSelect.addEventListener('change', function () {
    itemsPerPage = parseInt(this.value);
    currentPage = 1;
    renderIcons();
    renderPagination();
  });

  prevPageBtn.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage--;
      renderIcons();
      renderPagination();
    }
  });

  nextPageBtn.addEventListener('click', function () {
    const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderIcons();
      renderPagination();
    }
  });

  renderIcons();
  renderPagination();
});

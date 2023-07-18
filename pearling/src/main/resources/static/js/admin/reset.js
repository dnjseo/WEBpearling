window.addEventListener('DOMContentLoaded', (event) => {
  const paginationContainer = document.querySelector('.pagination');

  paginationContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.tagName === 'A') {
      const page = parseInt(target.textContent);
      if (!isNaN(page)) {
        navigateToPage(page);
      }
    }
  });

  const previousPageButton = document.getElementById('prev-button');
  previousPageButton.addEventListener('click', () => {
    const currentPage = getCurrentPage();
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      navigateToPage(previousPage);
    }
  });

  const nextPageButton = document.getElementById('next-button');
  const totalPageInput = document.getElementById('total-page');
  const totalPages = parseInt(totalPageInput.value);

  nextPageButton.addEventListener('click', () => {
    const currentPage = getCurrentPage();
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      navigateToPage(nextPage);
    }
  });

  function getCurrentPage() {
    const currentUrl = new URL(window.location.href);
    return parseInt(currentUrl.searchParams.get('page')) || 1;
  }

  function getTotalPages() {
    const total = parseInt(document.getElementById('next-button').getAttribute('data-total-pages'));
    return total || 1;
  }

  function navigateToPage(page) {
    const currentUrl = new URL(window.location.href);
    const searchParams = currentUrl.searchParams;

    // 5단위로 페이징 처리
    const basePage = Math.floor((page - 1) / 5) * 5 + 1;
    const startPage = Math.min(basePage, getTotalPages());
    const endPage = Math.min(startPage + 4, getTotalPages());

    searchParams.set('page', page);
    const query = searchParams.get('query');
    if (query !== null) {
      searchParams.set('query', query);
    } else {
      searchParams.delete('query');
    }
    currentUrl.search = searchParams.toString();
    window.location.href = currentUrl.href;

    // Update pagination display
    const paginationLinks = paginationContainer.getElementsByTagName('a');
    for (let i = 0; i < paginationLinks.length; i++) {
      const link = paginationLinks[i];
      const pageNumber = parseInt(link.textContent);
      if (pageNumber >= startPage && pageNumber <= endPage) {
        link.style.display = 'block';
      } else {
        link.style.display = 'none';
      }
    }
  }

  // 페이지 로드 시 초기 페이징 링크 표시 설정
  function initializePaginationDisplay() {
    const currentPage = getCurrentPage();
    const paginationLinks = paginationContainer.getElementsByTagName('a');
    const startPage = Math.min(Math.floor((currentPage - 1) / 5) * 5 + 1, totalPages);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = 0; i < paginationLinks.length; i++) {
      const link = paginationLinks[i];
      const pageNumber = parseInt(link.textContent);
      if (pageNumber >= startPage && pageNumber <= endPage) {
        link.style.display = 'block';
      } else {
        link.style.display = 'none';
      }
      if (pageNumber === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }

    // Show/hide next button based on current page
    if (currentPage === totalPages) {
      nextPageButton.style.display = 'none'; // 마지막 페이지일 경우 다음 버튼 숨김
    } else {
      nextPageButton.style.display = 'block';
    }
  }

  // 페이지 로드 시 초기 페이징 링크 표시 설정
  initializePaginationDisplay();

  // 페이지가 완전히 로드된 후에도 페이징 링크 표시 업데이트
  window.addEventListener('load', () => {
    // 다시 한 번 페이징 링크 표시 업데이트
    initializePaginationDisplay();
  });
});

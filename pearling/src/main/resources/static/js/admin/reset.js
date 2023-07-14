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
    nextPageButton.addEventListener('click', () => {
      const currentPage = getCurrentPage();
      const totalPages = getTotalPages();
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
    }
});
  
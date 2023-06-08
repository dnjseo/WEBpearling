window.addEventListener("load", function (e) {

  let dropSearch = document.querySelector('.drop-search');
  let submenu = document.querySelector('.dropdown-submenu');
  let isOpen = false;


  dropSearch.addEventListener('mouseover', function () {
    if (isOpen) {
      submenu.style.display = 'none';
      isOpen = false;
    } else {
      submenu.style.display = 'block';
      isOpen = true;
    }
  });
});
fetch("/html/search/search-main.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("dropdown").innerHTML = data;
    
    let dropSearch = document.querySelector('.drop-search');
    let submenu = document.querySelector('.dropdown-submenu');
    let isOpen = false; 
    
    dropSearch.addEventListener('click', function() {
      if (isOpen) {
        submenu.style.display = 'none';
        isOpen = false;
      } else {
        submenu.style.display = 'block';
        isOpen = true;
      }
    });
  })
  .catch((error) => console.error(error));




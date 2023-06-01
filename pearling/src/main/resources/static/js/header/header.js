fetch("/html/header/header.html")
  .then((response) => response.text())
  .then((data) => {
      document.getElementById("header").innerHTML = data;
      
      var header = document.getElementById('header');
      var menu = header.querySelector(".menu");
      var subMenu = document.getElementById('sub-menu');
      var close = subMenu.querySelector('.sub-close');
      
      menu.addEventListener('click', function() {
        subMenu.style.right = "0";
        console.log("클릭");
      });

      close.addEventListener('click', function(){
        subMenu.style.right = "-100%";
      });
  })
  .catch((error) => console.error(error));


window.addEventListener("load", function(e) {
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
});
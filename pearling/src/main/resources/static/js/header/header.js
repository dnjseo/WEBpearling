window.addEventListener("load", function(e) {
  let header = document.getElementById('header');
  let menu = header.querySelector(".menu");
  let subMenu = document.getElementById('sub-menu');
  let close = subMenu.querySelector('.sub-close');
  
  menu.addEventListener('click', function() {
    subMenu.style.right = "0";
    console.log("클릭");
  });

  close.addEventListener('click', function(){
    subMenu.style.right = "-100%";
  });
});
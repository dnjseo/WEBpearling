window.addEventListener("load", function(e) {
  let header = document.getElementById('header');
  let dmf = document.getElementById('dmf');
  let menu = header.querySelector(".menu");
  let close = header.querySelector('.sub-close')
  let subMenu = document.getElementById('sub-menu');
  
  menu.addEventListener('click', function() {
    subMenu.style.right = "0";
    menu.style.display = "none";
    close.style.display = "block";
    dmf.style.display="none";
    console.log("클릭");
  });
  
  close.addEventListener('click', function(){
    subMenu.style.right = "-100%";
    menu.style.display = "block"
    close.style.display = "none";
    dmf.style.display="block";

  });
});
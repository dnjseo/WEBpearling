window.addEventListener("load", function(e) {
  let header = document.getElementById('header');
  let dmf = document.getElementById('dmf');
  let menu = header.querySelector(".menu");
  let searchIcon = header.querySelector(".searchIcon")
  let searchInput = header.querySelector(".searchInput")
  let close = header.querySelector('.sub-close')
  let subMenu = document.getElementById('sub-menu');
  let logo = header.querySelector('.logo')
  let searchClose = header.querySelector('.search-close');

  menu.addEventListener('click', function() {
    subMenu.style.right = "0";
    menu.style.display = "none";
    close.style.display = "block";
    dmf.style.display="none";
    header.classList.remove('bgnone');
    header.classList.add('bgshow');
    document.querySelector('#shell-menu').style.opacity="0";
    document.querySelector('#myshell-menu').style.opacity="0";
    console.log("클릭");
  });

  
  close.addEventListener('click', function(){
    subMenu.style.right = "-100%";
    menu.style.display = "block"
    close.style.display = "none";
    dmf.style.display="block";
    header.classList.remove('bgshow');
    header.classList.add('bgnone');
    document.querySelector('#shell-menu').style.opacity="1";
    document.querySelector('#myshell-menu').style.opacity="1";
  
  });
  
  searchIcon.addEventListener('click', function(){
    searchInput.classList.toggle('searchInputShow');


    //모바일이 아닐 경우 리턴
    if (!window.matchMedia("(max-width: 768px)").matches) 
    return

    // 검색창을 클릭하면 헤더 이미지 없애기
    if(searchInput.classList.contains('searchInputShow')) {
      document.querySelector('.headerLogoimg').style.opacity= "0"
    } else {
      setTimeout(function() {
      document.querySelector('.headerLogoimg').style.opacity= "1"
      }, 1000)
    }
  });

  let roleId = document.querySelector('input[name="roleId"]').value;
  let adminHeader1 = this.document.querySelector("#shell-menu");
  let adminHeader2 = this.document.querySelector(".no-sticky"); 
  console.log(roleId);

  if(roleId == 1){
    adminHeader1.style.display = "none";
    adminHeader2.style.display = "none";
  }
  
});

window.addEventListener("DOMContentLoaded", function() {
  let backButton = document.getElementById('back1');

  backButton.addEventListener('click', function(e) {
    e.preventDefault();
    history.back();
  });

  // 기타 코드...
});
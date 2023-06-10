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

window.addEventListener("DOMContentLoaded", function() {
  let accountClickBtn = document.querySelector(".account-click");
  let myShellClickBtn = document.querySelector(".myshell-click");
  let accountListSection = document.querySelector(".account");
  let myShellListSection = document.querySelector(".myshell");
  
  // account-click 버튼 클릭 시 이벤트 처리
  accountClickBtn.addEventListener("click", function() {
    accountListSection.style.display = "block";
    myShellListSection.style.display = "none";

    myShellClickBtn.style.backgroundImage = "url(/images/search/my-shell.png)";
    accountClickBtn.style.backgroundImage = "url(/images/search/account-color.png)";
  });
  
  // myshell-click 버튼 클릭 시 이벤트 처리
  myShellClickBtn.addEventListener("click", function() {
    accountListSection.style.display = "none";
    myShellListSection.style.display = "block";

    myShellClickBtn.style.backgroundImage = "url(/images/search/my-shell-color.png)";
    accountClickBtn.style.backgroundImage = "url(/images/search/account.png)";
  });
});

// fetch("/html/shell/shell-menu.html")
//   .then((response) => response.text())
//   .then((data) => {
//     document.getElementById("shell-menu").innerHTML = data;
//   })
//   .catch((error) => console.error(error));


function fetchAndInjectHTML(url, targetId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(targetId).innerHTML = data;
      applyCSS(targetId); // CSS 효과 적용
    })
    .catch((error) => console.error(error));
}

function applyCSS(targetId) {
  var currentURL = window.location.href;

  if (targetId === "shell-menu") {
    var ourShell = document.querySelector("#shell-menu .ourShell");
    var myShell = document.querySelector("#shell-menu .myShell");
    if (currentURL.includes("/html/shell/main-ourshell.html")) {
      ourShell.classList.remove("notseleted");
      myShell.classList.remove("myShell")
    } else if (currentURL.includes("/html/shell/main-myshell.html")) {
      ourShell.classList.remove("ourShell");
      myShell.classList.remove("notselected");


    }
  }
}

// 쉘 메뉴 HTML 가져오기
fetchAndInjectHTML("/html/shell/shell-menu.html", "shell-menu");


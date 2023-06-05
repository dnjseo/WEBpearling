
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
  let currentURL = window.location.href;

  if (targetId === "shell-menu") {
    const ourShell = document.querySelector("#shell-menu .ourShell");
    const myShell = document.querySelector("#shell-menu .myShell");
    if (currentURL.includes("/shell/ourshell")) {
      ourShell.classList.remove("notseleted");
      myShell.classList.remove("myShell")
    } else if (currentURL.includes("shell/main-myshell")) {
      ourShell.classList.remove("ourShell");
      myShell.classList.remove("notselected");
    }
  }
}

// 쉘 메뉴 HTML 가져오기
fetchAndInjectHTML("/shell/shell-menu", "shell-menu");


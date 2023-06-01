document.addEventListener("DOMContentLoaded", function() {
    fetch("/html/shell/myshell-menu.html")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(data, "text/html");
        const monthlyLink = htmlDocument.querySelector(".monthly");
        const diaryLink = htmlDocument.querySelector(".diary");
        const guestbookLink = htmlDocument.querySelector(".guestbook");
        
        monthlyLink.classList.remove("monthly")
        guestbookLink.classList.remove("notselected")
        diaryLink.classList.remove("diary");
        document.getElementById("myshell-menu").innerHTML = htmlDocument.documentElement.innerHTML;
      })
      .catch((error) => console.error(error));
    });

window.addEventListener("load", function () {
    var wrap = document.getElementById("wrap");
    var liElements = wrap.querySelectorAll('li');
    var book = document.getElementById("s1");
    var gclose = wrap.querySelector(".guestbook-close");
    var black = wrap.querySelector(".black");

    // 방명록 하나하나 보이게 해주는 함수
    for (var i = 0; i < liElements.length; i++) {
        liElements[i].addEventListener("click", function () {
            book.style.display = "block";
            black.style.display = "block";
        });
    }

    // 닫기 버튼을 누르면 방명록이 닫히는 함수
    gclose.addEventListener('click', function(){
        book.style.display = 'none';
        black.style.display = "none";
      });
});
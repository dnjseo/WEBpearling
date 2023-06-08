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
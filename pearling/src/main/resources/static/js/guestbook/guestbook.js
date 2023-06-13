window.addEventListener("load", function () {
  const wrap = document.getElementById("wrap");
  const liElements = document.querySelectorAll("li");
  const bookElements = document.querySelectorAll('section[class^="guestbook"]');
  const gcloseElements = document.querySelectorAll(".guestbook-close");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const black = document.querySelector(".black");

  const deleteModal = document.getElementById("delete-modal");
  const deleteYes = deleteModal.querySelector(".delete-yes");

  // 방명록 하나하나 보이게 해주는 함수
  liElements.forEach(function (li) {
    li.addEventListener("click", function (event) {
      event.preventDefault(); // 기본 동작(새로고침) 방지

      // 모든 방명록 숨기기
      bookElements.forEach(function (book) {
        book.style.display = "none";
      });

      const index = li.getAttribute("data-index");
      const book = document.querySelector("#s" + index);
      book.style.display = "block";
      black.style.display = "block";
    });
  });

  // 닫기 버튼을 누르면 방명록이 닫히는 함수
  gcloseElements.forEach(function (gclose) {
    gclose.addEventListener("click", function () {
      console.log("닫아져라!!!!!!!!!!!!!!");
      bookElements.forEach(function (book) {
        book.style.display = "none";
      });
      black.style.display = "none";
    });
  });

  // 삭제 버튼
  deleteBtn.forEach(function (addDelete, index) {
    addDelete.addEventListener("click", function () {
      const book = bookElements[index];
      if (book) {
        book.style.display = "none";
        deleteModal.style.display = "block";
      }
    });
  });

  deleteYes.addEventListener("click", function () {
    deleteModal.style.display = "none";
    black.style.display = "none";
  });
});

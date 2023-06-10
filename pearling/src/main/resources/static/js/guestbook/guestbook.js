window.addEventListener("load", function () {
  const wrap = document.getElementById("wrap");
  const liElements = wrap.querySelectorAll('li');
  const books = document.getElementById('s1');
  const gclose = wrap.querySelectorAll('.guestbook-close');
  const deleteBtn = wrap.querySelectorAll(".deleteBtn");

  const black = wrap.querySelector(".black");

  const deleteModal = document.getElementById("delete-modal");
  const deleteYes = deleteModal.querySelector(".delete-yes");

  // 방명록 하나하나 보이게 해주는 함수
  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener("click", function (event) {
      event.preventDefault(); // 기본 동작(새로고침) 방지
      if (books) {
        const guestbookId = liElements[i].getAttribute("data-guestbook-id");
        const guestbookDiv = books.querySelector(`[data-guestbook-id="${guestbookId}"]`);
        if (guestbookDiv) {
          guestbookDiv.style.display = "block";
        }
        black.style.display = "block";
      }
    });
  }

  // 닫기 버튼
  for (let i = 0; i < gclose.length; i++) {
    gclose[i].addEventListener("click", function () {
      if (books) {
        books.style.display = "none";
        black.style.display = "none";
      }
    });
  }

  // 각 방명록에 대해 삭제 버튼 이벤트 처리
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", function () {
      if (books) {
        books.style.display = "none";
        deleteModal.style.display = "block";
      }
    });
  }

  // 확인 버튼
  if (deleteYes) {
    deleteYes.addEventListener("click", function () {
      deleteModal.style.display = "none";
      black.style.display = "none";
    });
  }
});

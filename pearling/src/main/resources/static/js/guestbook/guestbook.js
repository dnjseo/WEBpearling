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

        // 추가된 코드: 삭제 확인 버튼을 누르면 AJAX 요청을 서버로 보냄
        deleteYes.addEventListener("click", function () {
          const guestbookId = book.getAttribute("data-id"); // 방명록 ID 추출
          deleteGuestbook(guestbookId);
        });
      }
    });
  });

  deleteYes.addEventListener("click", function () {
    deleteModal.style.display = "none";
    black.style.display = "none";
  });

  // 방명록 삭제 요청을 서버로 보내는 함수
  function deleteGuestbook(guestbookId) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/guestbook/delete/" + guestbookId, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          console.log("방명록 삭제에 성공했습니다");
          location.reload(); // 페이지 새로고침
        } else {
          console.error("방명록 삭제에 실패했습니다.");
        }
      }
    };
    xhr.send();
  }
});
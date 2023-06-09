window.addEventListener("load", function () {
    const wrap = document.getElementById("wrap");
    const liElements = wrap.querySelectorAll('li');
    const bookElements = wrap.querySelectorAll('section[id^="s"]');
    const gcloseElements = document.querySelectorAll('.guestbook-close');
    const addDeleteElements = wrap.querySelectorAll(".add-delete");
    const black = wrap.querySelector(".black");

    const confirmModal = document.getElementById("confirm-modal");
    const confirmYes = confirmModal.querySelector(".confirm-yes");
  
    // 방명록 하나하나 보이게 해주는 함수
    for (let i = 0; i < liElements.length; i++) {
      liElements[i].addEventListener("click", function (event) {
        event.preventDefault(); // 기본 동작(새로고침) 방지
  
        // 모든 방명록 숨기기
        bookElements.forEach(function (book) {
          book.style.display = 'none';
        });
  
        const index = this.getAttribute('data-index');
        const book = wrap.querySelector('#s' + index);
        book.style.display = "block";
        black.style.display = "block";
      });
    }
  
    gcloseElements.forEach(function (gclose) {
        gclose.addEventListener('click', function () {
          bookElements.forEach(function (book) {
            book.style.display = 'none';
          });
          black.style.display = 'none';
        });
      });

      // 각 방명록에 대해 삭제 버튼 이벤트 처리
    addDeleteElements.forEach(function (addDelete, index) {
        addDelete.addEventListener("click", function () {
            const book = bookElements[index];
            if (book) {
                book.style.display = "none";
                confirmModal.style.display = "block";
            }
        });
    });

    confirmYes.addEventListener("click", function () {
        confirmModal.style.display = "none";
        black.style.display = "none";
    });
  });
  
window.addEventListener('load', function (e) {
    let form = document.querySelector('.guestbook-add-form');
    let guestbookAddBtn = document.querySelector(".guestbook-add-btn");

    let confirmModal = form.querySelector("#confirm-modal");
    let confirmBtn = confirmModal.querySelector(".confirm-yes");

    let textarea = form.querySelector('textarea');
    let content = textarea.value;

    let memberId = document.querySelector("#input-member-id").value;
    let userId = document.querySelector("#input-user-id").value;
    let toId = userId;
    let fromId = memberId;

    console.log("이것은 너의 아이디 "+ toId);
    console.log("이것은 나의 아이디 "+ fromId);

    guestbookAddBtn.addEventListener('click', function (e) {
      e.preventDefault();

      confirmModal.style.display = "block";
    });

    confirmBtn.addEventListener('click', function (e) {
      e.preventDefault();

      let formData = {
        content: content,
        fromId: fromId, // 수정: 작성자의 ID를 fromId로 설정
        toId: toId // 수정: 대상 사용자의 ID를 toId로 설정
      };

      let jsonData = JSON.stringify(formData);

      fetch('/api/guestbook/add/' + userId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
        .then(function (response) {
          if (response.ok) {
            console.log('방명록 등록이 완료되었습니다.');
            form.submit();
            window.location.href = '/guestbook/list';
          } else {
            console.error('방명록 등록에 실패했습니다.');
          }
        })
        .catch(function (error) {
          console.error('방명록 등록 중 오류가 발생했습니다.', error);
        });
    });
});

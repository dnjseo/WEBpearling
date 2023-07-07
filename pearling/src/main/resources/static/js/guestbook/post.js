window.addEventListener('DOMContentLoaded', function (e) {
  let form = document.querySelector('.add-form');
  let guestbookAddBtn = document.querySelector(".add-btn");

  let confirmModal = document.querySelector("#confirm-modal");
  let confirmBtn = confirmModal.querySelector(".confirm-yes");

  let inputs = form.elements;
  let contentInput = inputs["content"];
  let content = contentInput.value;

  let memberId = document.querySelector("#input-member-id").value;
  let userId = document.querySelector("#input-user-id").value;
  let toId = userId;
  let fromId = memberId;

  guestbookAddBtn.addEventListener('click', function (e) {
      e.preventDefault();
      confirmModal.style.display = "block";
  });

  // 방명록 등록
  confirmBtn.addEventListener('click', function (e) {
      e.preventDefault();

      let formData = {
          content: contentInput.value,
          fromId: fromId,
          toId: toId
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
                window.location.href = '/guestbook/list/' + userId;
            } else {
                console.error('방명록 등록에 실패했습니다.');
            }
        })
        .catch(function (error) {
            console.error('방명록 등록 중 오류가 발생했습니다.', error);
        });
  });

});

window.addEventListener('DOMContentLoaded', function (e) {
    // 방명록 수정
    let updateBtn = document.querySelector('.update-btn');
    
    updateBtn.addEventListener('click', function (e) {
        e.preventDefault();
        
        console.log('gggggg rkwlakrkwlakr');

        let form = document.querySelector('.update-form');
        let inputs = form.elements;
        let contentInput = inputs["content"];
        let content = contentInput.value;
        let urlParams = new URLSearchParams(window.location.search);
        let guestbookId = urlParams.get('gid');
        let userId = document.querySelector("#input-user-id").value;

        let formData = {
            content: contentInput.value,
        };

        let jsonData = JSON.stringify(formData);

        fetch('/api/guestbook/update/' + guestbookId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
        .then(function (response) {
            if (response.ok) {
                console.log('방명록이 수정되었습니다.');
                window.location.href = '/guestbook/list/' + userId;
            } else {
                console.error('방명록 수정에 실패했습니다.');
            }
        })
        .catch(function (error) {
            console.error('방명록 수정 중 오류가 발생했습니다.', error);
        });
    });
});
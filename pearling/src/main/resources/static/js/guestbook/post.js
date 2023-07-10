// 모달 보여주는 함수
function showModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
  }
  
  // 모달 확인 버튼 누르면 모달 사라지는 함수
  function noneModal(modalId, buttonClass) {
    let modal = document.getElementById(modalId);
    let button = document.querySelector(buttonClass);
  
    button.addEventListener("click", function () {
      modal.style.display = "none";
    });
  }
  
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
      if (contentInput.value.trim() === "") {
        showModal("no-insert-modal");
        noneModal("no-insert-modal", ".insert-yes");
      } else if (contentInput.value.length > 300) {
        alert("입력한 내용이 300자를 초과하였습니다.");
      } else {
        confirmModal.style.display = "block";
      }
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
  let userId = document.querySelector("#input-user-id").value;

  // 방명록 수정
  let updateBtn = document.querySelector('.update-btn');
  let cancleBtn = document.querySelector(".cancle-btn");
  let modifyYes = document.querySelector('.modify-yes');

  updateBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let form = document.querySelector('.update-form');
    let inputs = form.elements;
    let contentInput = inputs["content"];

    if (contentInput.value.trim() === "") {
      alert("내용을 입력하세요."); // 내용을 입력하라는 알림 표시
    } else if (contentInput.value.length > 300) {
      alert("입력한 내용이 300자를 초과하였습니다.");
    } else {
      showModal("modify-modal");
    }
  });

  cancleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '/guestbook/list/' + userId;
  });

  modifyYes.addEventListener('click', function (e) {
    e.preventDefault();

    let form = document.querySelector('.update-form');
    let inputs = form.elements;
    let contentInput = inputs["content"];
    let content = contentInput.value;
    let urlParams = new URLSearchParams(window.location.search);
    let guestbookId = urlParams.get('gid');

    if (contentInput.value.trim() === "") {
      alert("내용을 입력하세요."); // 내용을 입력하라는 알림 표시
    } else if (contentInput.value.length > 300) {
      alert("입력한 내용이 300자를 초과하였습니다.");
    } else {
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
            window.location.href = '/guestbook/list/' + userId;
          } else {
            console.error('방명록 수정에 실패했습니다.');
          }
        })
        .catch(function (error) {
          console.error('방명록 수정 중 오류가 발생했습니다.', error);
        });
    }
  });
});
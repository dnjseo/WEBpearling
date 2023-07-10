// Delete 요청 처리
function handleDelete(id) {
  fetch(`/api/diary/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        console.log('다이어리 삭제가 완료되었습니다.');
        window.location.href = '/diary/list';
        // 추가적인 동작이 필요하다면 여기에서 처리합니다.
      } else {
        console.error('다이어리 삭제에 실패했습니다.');
        // 추가적인 에러 처리 등을 수행합니다.
      }
    })
    .catch((error) => {
      console.error('다이어리 삭제 중 오류가 발생했습니다.', error);
    });
}

// Update 요청 처리
function handleUpdate(id, jsonData) {
  fetch(`/api/diary/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  })
    .then((response) => {
      if (response.ok) {
        console.log('다이어리 업데이트가 완료되었습니다.');
        console.log(jsonData);
        window.location.href = '#';
        // 업데이트 완료되었을 때 띄울 콘솔.
      } else {
        console.error('다이어리 업데이트에 실패했습니다.');
        // 업데이트 에러 발생 시 띄울 콘솔.
      }
    })
    .catch((error) => {
      console.error('다이어리 업데이트 중 오류가 발생했습니다.', error);
    });
}

window.addEventListener('DOMContentLoaded', function (e) {
  // 삭제 버튼 클릭 시 이벤트 처리
  let delForm = document.querySelector(".diary-edit-form");
  let showBtn = delForm.querySelector(".show-btn");
  let showedBtns = delForm.querySelector(".show-diary-del-edit-btn");
  let delBtn = delForm.querySelector(".del-confirm-yes");
  
  let urlParams = new URLSearchParams(window.location.search);
  // console.log("url : " + urlParams);
  let userId = urlParams.get('uid');
  // console.log("uid : " + userId);
  let loginId = document.querySelector("#input-login-id").value;
  // console.log("loginId : " + loginId);
  let selectElement = document.querySelector('select[name="diary-scope-id"]');
  // console.log("selectShow : " + selectElement);

  let diaryDateInput = document.querySelector(".diary-detail-date");
  let diaryTitleInput = document.querySelector(".diary-detail-title");
  let diaryContentInput = document.querySelector(".diary-detail-input");
 
  let updateBtn = document.querySelector(".update-btn");

  if(userId == loginId || userId == "") {
      showBtn.style.display = "block";
  } else {
      showBtn.style.display = "none";
  }

  updateBtn.addEventListener("click", function() {
    selectElement.removeAttribute("disabled");
    diaryDateInput.removeAttribute("disabled");
    diaryTitleInput.removeAttribute("disabled");
    diaryContentInput.removeAttribute("disabled");
  });

  showBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (showedBtns.style.display === "block") {
      showedBtns.style.display = "none";
    } else {
      showedBtns.style.display = "block";
    }

    delBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showedBtns.style.display = "none";

      let inputs = delForm.elements;
      let id = inputs["id"].value;
      handleDelete(id);
    });
  });

  // 등록 버튼 클릭 시 이벤트 처리
  let editForm = document.querySelector(".diary-edit-form");
  let addBtn = editForm.querySelector(".confirm-yes");

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showedBtns.style.display = "none";
    let selectElement = document.querySelector('select[name="diary-scope-id"]');  
    let diaryDateInput = document.querySelector(".diary-detail-date");
    let diaryTitleInput = document.querySelector(".diary-detail-title");
    let diaryContentInput = document.querySelector(".diary-detail-input");

    let inputs = editForm.elements;
    let id = inputs["id"].value;
    let date = inputs["date"].value;
    let title = inputs["title"].value;
    let content = inputs["content"].value;
    let diaryScopeId = inputs["diary-scope-id"].value;

    let formData = { id, date, title, content, diaryScopeId };
    let jsonData = JSON.stringify(formData);

    handleUpdate(id, jsonData);
    
    selectElement.disabled = true;
    diaryDateInput.disabled = true;
    diaryTitleInput.disabled = true;
    diaryContentInput.disabled = true;

  });

  let diaryEditForm = document.querySelector(".diary-edit-form");

  diaryEditForm.addEventListener('click', function (e) {
    let el = e.target;
    if (!el.classList.contains('icon-heart'))
      return;

    e.preventDefault();

    let { memberId, diaryId } = el.dataset;

    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('uid');

    let id;
    if(userId == '') {
        id = memberId;
    } else if(memberId == userId) {
        id = memberId;
    } else {
        id = userId;
    }

    console.log("이것이죠" + userId);
    console.log("이것입니다" + memberId);

    // LIKE 삭제
    if (el.classList.contains("icon-heart-fill")) {
      fetch(`/api/diarylikes/${diaryId}/members/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.text())
        .then(value => parseInt(value))
        .then(result => {
          if (result == 1) { // 결과가 1이면 일어날 일
            el.classList.remove("icon-heart-fill");
            // 현재 업데이트된 좋아요를 불러오기
            fetch(`/api/diarylikes/count?dr=${diaryId}`) // diaryId에 해당하는 diary의 정보를 불러오고
              .then(response => response.json()) // 정보를 json 형식으로 담아줌
              .then(count => { // count라는 이름에 json 객체를 담아주고
                el.nextElementSibling.innerText = count;
                console.log(`count is ${count}`);
              });
          }
        });
    }

    // LIKE 추가
    else {
      let data = `dr=${diaryId}&mb=${id}`;

      fetch("/api/diarylikes", { // 보낼 api: POST/diaryLikes
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data) // 파라미터로 data 값 넘기기
      })
        .then(response => response.text())
        .then(value => parseInt(value)) // value를 정수형으로 변환
        .then(result => {
          if (result == 1) { // 결과가 1이면 일어날 일
            el.classList.add("icon-heart-fill");
            // 현재 업데이트된 좋아요를 불러오기
            fetch(`/api/diarylikes/count?dr=${diaryId}`) // diaryId에 해당하는 diary의 정보를 불러오고
              .then(response => response.json()) // 정보를 json 형식으로 담아줌
              .then(count => { // count라는 이름에 json 객체를 담아주고
                el.nextElementSibling.innerText = count;
                console.log(`count is ${count}`);
              });
          }
        });

      // catch -> 네트워크 오류에 대한 응답
    }
  });

});
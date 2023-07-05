function formatDate() {
  const today = new Date(); // 오늘 날짜를 생성합니다.
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

window.addEventListener('load', function (e) {
  let form = document.querySelector('.diary-add-form');
  let diaryAddBtn = document.querySelector(".diary-add-btn");

  let confirmModal = form.querySelector("#confirm-modal");
  let confirmBtn = confirmModal.querySelector(".confirm-yes");

  let inputs = form.elements;
  let dateInput = inputs["date"];
  let titleInput = inputs['title'];
  let contentInput = inputs["content"];

  let date = dateInput.value;
  let title = titleInput.value;
  let content = contentInput.value;
  let diaryScopeId = inputs["diary-scope-id"].value;
  let view = 0;
  let memberId = inputs["member-id"].value;

  let todayDate = formatDate(new Date());
  dateInput.value = todayDate;
  date = todayDate;

  diaryAddBtn.addEventListener('click', function (e) {
    e.preventDefault();
    
    confirmModal.style.display = "block";
  });

  confirmBtn.addEventListener('click', function (e) {
    e.preventDefault();

    date = inputs["date"].value;
    title = inputs["title"].value;
    content = inputs["content"].value;
    diaryScopeId = inputs["diary-scope-id"].value;
    view = 0;
    memberId = inputs["member-id"].value;

    if(title.trim() == '') {
      title = "Untitled";
      titleInput.placeholder = title;
    }

    console.log("title value : " + title);

    if(content.trim() == '') {
      contentInput.placeholder = "다이어리 내용을 입력하셔야 합니다.";
      contentInput.classList.add('alert');
      confirmModal.style.display = "none";
      return;
    }

    let formData = { date, title, content, diaryScopeId, view, memberId };
    let jsonData = JSON.stringify(formData);

    fetch('/api/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
      .then(function (response) {
        if (response.ok) {
          console.log('다이어리 등록이 완료되었습니다.');
          form.submit();
          window.location.href = '/diary/list';
          // 추가적인 동작이 필요하다면 여기에서 처리합니다.
        } else {
          console.error('다이어리 등록에 실패했습니다.');
          // 추가적인 에러 처리 등을 수행합니다.
        }
      })
      .catch(function (error) {
        console.error('다이어리 등록 중 오류가 발생했습니다.', error);
      });
  });
});
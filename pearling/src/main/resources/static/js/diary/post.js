window.addEventListener('load', function (e) {
  let form = document.querySelector('.diary-add-form');
  let diaryAddBtn = document.querySelector(".diary-add-btn");

  let confirmModal = form.querySelector("#confirm-modal");
  let confirmBtn = confirmModal.querySelector(".confirm-yes");

  diaryAddBtn.addEventListener('click', function (e) {
    e.preventDefault();
    confirmModal.style.display = "block";
  });

  confirmBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let inputs = form.elements;
    let date = inputs["date"].value;
    let title = inputs["title"].value;
    let content = inputs["content"].value;
    let diaryScopeId = inputs["diary-scope-id"].value;
    let view = 0;
    let memberId = inputs["member-id"].value;

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
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

    let formData = new FormData(form);

    let diaryRequest = {
      date: formData.get('date'),
      title: formData.get('title'),
      content: formData.get('content'),
      diaryScopeId: formData.get('diaryScopeId'),
    };

    fetch('/api/diary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diaryRequest),
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
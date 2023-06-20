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
function handleUpdate(id, diaryRequest) {
  fetch(`/api/diary/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(diaryRequest),
  })
    .then((response) => {
      if (response.ok) {
        console.log('다이어리 업데이트가 완료되었습니다.');
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
  let delBtn = delForm.querySelector(".del-confirm-yes");
  delBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let confirmModal = delForm.querySelector("#confirm-modal")
    let diaryId = confirmModal.querySelector('[name="id"]').value;
    handleDelete(diaryId);
  });

  // 등록 버튼 클릭 시 이벤트 처리
  let editForm = document.querySelector(".diary-edit-form");
  let addBtn = editForm.querySelector(".confirm-yes");
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let delModal = editForm.querySelector("#delete-modal");
    let diaryId = delModal.querySelector('[name="id"]').value;
    let diaryRequest = {
      date: editForm.querySelector('[name="date"]').value,
      title: editForm.querySelector('[name="title"]').value,
      content: editForm.querySelector('[name="content"]').value,
      diaryScopeId: editForm.querySelector('[name="diaryScopeId"]').value,
    };
    handleUpdate(diaryId, diaryRequest);
  });
});
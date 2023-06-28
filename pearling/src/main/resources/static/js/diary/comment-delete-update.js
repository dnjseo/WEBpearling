// Delete 요청 처리
function handleDelete(id, memberId) {
    fetch(`/api/diaryComments/${id}/members/${memberId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('다이어리 삭제가 완료되었습니다.');
          window.location.href = '#';
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
  // function handleUpdate(id, memberId, diaryCommentRequest) {
  //   fetch(`/api/diaryComments/${id}/members/${memberId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(diaryCommentRequest),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log('다이어리 업데이트가 완료되었습니다.');
  //         window.location.href = '#';
  //         // 업데이트 완료되었을 때 띄울 콘솔.
  //       } else {
  //         console.error('다이어리 업데이트에 실패했습니다.');
  //         // 업데이트 에러 발생 시 띄울 콘솔.
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('다이어리 업데이트 중 오류가 발생했습니다.', error);
  //     });
  // }
  
  window.addEventListener('DOMContentLoaded', function (e) {
    // 삭제 버튼 클릭 시 이벤트 처리
    let delForm = document.querySelector(".diary-comment-form");
    let delBtn = delForm.querySelector(".co-del-btn");

    delBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("클릭..됐다");

      let delForm = document.querySelector(".diary-comment-form");
      let inputs = delForm.elements;

      let id = inputs["id"].value;
      let memberId = inputs["reg-member-id"].value;

      handleDelete(id, memberId);
    });
  
    // 등록 버튼 클릭 시 이벤트 처리
    // let CommentForm = document.querySelector('.diary-comment-form');
    // let updateBtn = CommentForm.querySelector('.co-update-btn');
    // let commentAddBtn = CommentForm.querySelector(".comment-add-btn");
    // let id = CommentForm.querySelector('[name="id"]').value;

    // updateBtn.addEventListener('click', function(e) {
    //     e.preventDefault();
        
    // });

    // commentAddBtn.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     let diaryCommentRequest = {
    //     content: CommentForm.querySelector('[name="content"]').value
    //   };
    //   handleUpdate(id, memberId, diaryCommentRequest);
    //     console.log("쿨릭");
    // });

    
  });
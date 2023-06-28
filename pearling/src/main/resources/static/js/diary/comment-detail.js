function commentListLoad(url) {
    let commentSection = document.querySelector(".diary-comment-section");
    let commentList = commentSection.querySelector(".comment-list");

    fetch(url)
        .then(response => response.json())
        .then(list => {
            commentList.innerHTML = "";

            for (let comment of list) {

                let commentDate = new Date(comment.regDate);
                let year = commentDate.getFullYear();
                let month = commentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
                let formattedMonth = month < 10 ? `0${month}` : month;
                let day = commentDate.getDate();
                let formattedDay = day < 10 ? `0${day}` : day;
                let hour = commentDate.getHours();
                let formattedHour = hour < 10 ? `0${hour}` : hour;
                let minute = commentDate.getMinutes();
                let formattedMinute = minute < 10 ? `0${minute}` : minute;
                
                let formattedDate = `${year}/${formattedMonth}/${formattedDay} ${formattedHour}:${formattedMinute}`;

                let itemTemplate = `
                    <div class="comment">
                        <span>${comment.regMemberNickname}</span>
                        <span>${comment.content}</span>
                        <div class="up-del-box">
                            <span>${formattedDate}</span>
                            <div class="up-del-btns">
                            <button class="co-update-btn" type="button">수정</button>
                            <button class="co-del-btn" type="button" data-id="${comment.id}">삭제</button>
                        </div>
                        <input type="hidden" name="diaryPostId">
                        <input type="hidden" name="comment-id" value="${comment.id}">
                    </div>
                    </div>`;

                commentList.insertAdjacentHTML("beforeend", itemTemplate);
            }
        })
        .then(() => {
            addClickEventListeners();
        });
}

function addClickEventListeners() {
    let commentSection = document.querySelector(".diary-comment-section");
  
    commentSection.addEventListener('click', function (event) {
      if (event.target.classList.contains('co-update-btn')) {
        // 수정 버튼 클릭 처리
        // let commentId = event.target.closest('.comment').querySelector('[name="id"]').value;
        // let memberId = event.target.closest('.comment').querySelector('[name="reg-member-id"]').value;
        // handleUpdate(commentId, memberId);
      } else if (event.target.classList.contains('co-del-btn')) {
        // 삭제 버튼 클릭 처리
        let delBtnId = event.target.dataset.id;

        let delForm = document.querySelector(".diary-comment-form");
        let memberIdInput = delForm.querySelector('input[name="reg-member-id"]');
        let memberId = memberIdInput.value;
        
        handleCommentDelete(delBtnId, memberId);

      }
    });
  }

// Delete 요청 처리
function handleCommentDelete(commentId, memberId) {
    fetch(`/api/diaryComments/${commentId}/members/${memberId}`, {
      method: 'DELETE',
      headers: { 'Content-Type' : 'application/json'},
    })
      .then((response) => {
        if (response.ok) {
          console.log('댓글 삭제가 완료되었습니다.');
          location.reload();
          // 추가적인 동작이 필요하다면 여기에서 처리합니다.
        } else {
          console.error('댓글 삭제에 실패했습니다.');
          // 추가적인 에러 처리 등을 수행합니다.
        }
      })
      .catch((error) => {
        console.error('댓글 삭제 중 오류가 발생했습니다.', error);
      });
  }

window.addEventListener('DOMContentLoaded', function (e) {
    let diaryPostIdInput = document.querySelector('input[name="diary-post-id"]');
    let diaryId = diaryPostIdInput.value;
    commentListLoad(`/api/diaryComments/${diaryId}`);
});
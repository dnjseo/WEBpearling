/* ----------------- 다이어리 댓글 동적으로 조회 불러오기 ----------------- */

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
                    <div class="comment" data-com-id="${comment.id}">
                    <div class="comment-deco-box">
                        <div>
                        <span class="pearl-img"><img src="/images/profile/circle.png"></span>
                        <span>${comment.regMemberNickname}</span>
                        </div>
                    </div>
                        <span class="content-span">${comment.content}</span>
                        <div class="up-del-box">
                            <span>${formattedDate}</span>
                            <div class="up-del-btns">
                            <button class="co-update-btn" type="button" data-id="${comment.id}">수정</button>
                            <button class="co-del-btn" type="button" data-id="${comment.id}">삭제</button>
                        </div>
                        <input type="hidden" name="diaryPostId">
                        <input type="hidden" name="comment-id" value="${comment.id}">
                        <input type="hidden" name="reg-id" value="${comment.regMemberId}">
                    </div>
                    </div>`;

                commentList.insertAdjacentHTML("beforeend", itemTemplate);

                showCommenteBtns();
            }
        })
        .catch((error) => {
            console.error('댓글 리스트 호출 중 오류가 발생했습니다', error);
        });
}

function showCommenteBtns() {

    let commentUpdateBtns = document.querySelectorAll(".co-update-btn");
    let commentDeleteBtns = document.querySelectorAll(".co-del-btn");

    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('uid');
    let loginId = document.querySelector("#input-login-id").value;
    let regMemberIdInputs = document.querySelectorAll('input[name="reg-id"]');
    let diaryHostIdInput = document.querySelector('input[name="diary-reg-member-id"]');
    let diaryHostId = diaryHostIdInput.value;
    console.log("다이어리 주인 아이디" + diaryHostIdInput.value);

    for (let i = 0; i < regMemberIdInputs.length; i++) {
        let regMemberId = regMemberIdInputs[i].value;

        console.log("유저 : " + loginId + "멤버 : " + regMemberId);
        console.log("조건식 결과: " + i + (loginId == regMemberId) + (userId == null) + (loginId == diaryHostId));

        if (loginId == regMemberId || userId == null || loginId == diaryHostId) {
            commentUpdateBtns[i].classList.remove("d-none");
            commentDeleteBtns[i].classList.remove("d-none");
        } else {
            commentUpdateBtns[i].classList.add("d-none");
            commentDeleteBtns[i].classList.add("d-none");
        }
    }
}

/* ----------------- Delete 요청 처리 ----------------- */
function handleCommentDelete(commentId, memberId) {
    let commentSection = document.querySelector(".diary-comment-section");
    let commentList = commentSection.querySelector(".comment-list");

    let diaryPostIdInput = document.querySelector('input[name="diary-post-id"]');
    let diaryId = diaryPostIdInput.value;

    fetch(`/api/diaryComments/${commentId}/members/${memberId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (response.ok) {
                commentList.innerHTML = ""
                console.log('댓글 삭제가 완료되었습니다.');
                commentListLoad(`/api/diaryComments/${diaryId}`);
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

/* ----------------- POST 요청 처리 ----------------- */
function handleCommentPost(jsonData) {

    let commentSection = document.querySelector(".diary-comment-section");
    let commentList = commentSection.querySelector(".comment-list");
    let commentInput = document.querySelector(".comment-input")

    let diaryPostIdInput = document.querySelector('input[name="diary-post-id"]');
    let diaryId = diaryPostIdInput.value;

    fetch('/api/diaryComments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then(function (response) {
            if (response.ok) {
                commentInput.value = "";
                commentList.innerHTML = "";
                console.log('다이어리 댓글 등록이 완료되었습니다.');
                commentListLoad(`/api/diaryComments/${diaryId}`);
            } else {
                console.error('다이어리 댓글 등록에 실패했습니다.');
            }
        })
        .catch(function (error) {
            console.error('다이어리 댓글 등록 중 오류가 발생했습니다.', error);
        });
}

/* ----------------- PUT 요청 처리 ----------------- */
function handleCommentUpdate(updateBtnId, memberId, jsonData) {
    let commentSection = document.querySelector(".diary-comment-section");
    let commentList = commentSection.querySelector(".comment-list");

    let diaryPostIdInput = document.querySelector('input[name="diary-post-id"]');
    let diaryId = diaryPostIdInput.value;

    fetch(`/api/diaryComments/${updateBtnId}/members/${memberId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then(function (response) {
            if (response.ok) {
                // commentInput.value = "";
                commentList.innerHTML = "";
                console.log('다이어리 댓글 업데이트가 완료되었습니다.');
                commentListLoad(`/api/diaryComments/${diaryId}`);

                // window.location.reload();
            } else {
                console.error('다이어리 댓글 업데이트에 실패했습니다.');
            }
        })
        .catch(function (error) {
            console.error('다이어리 댓글 업데이트 중 오류가 발생했습니다.', error);
        });
}

/* ----------------- 클릭 이벤트(DELETE, POST, PUT) ----------------- */

function addClickEventListeners() {
    let commentSection = document.querySelector(".diary-comment-section");

    let form = document.querySelector('.diary-comment-form');
    let commentAddBtn = form.querySelector(".comment-add-btn");

    commentSection.addEventListener('click', function (event) {
        if (event.target.classList.contains('co-update-btn')) {
            event.preventDefault();

            // 수정 폼 표시
            let commentItem = event.target.closest('.comment');
            let commentContent = commentItem.querySelector('.content-span').textContent;

            let memberIdInput = document.querySelector('input[name="reg-member-id"]');
            let memberId = memberIdInput.value;

            if (!memberIdInput) {
                console.error('reg-member-id input을 찾을 수 없습니다.');
                return;
            }

            let updateForm = document.createElement('form');
            updateForm.classList.add('comment-update-form');
            updateForm.innerHTML = `
            <textarea class="comment-update-input" name="update-content">${commentContent}</textarea>
            <input type="hidden" name="comment-id" value="${commentItem.dataset.comId}">
            <input type="hidden" name="reg-member-id" value="${memberId}">
            <button class="comment-update-submit" type="submit">✓</button>
            `;

            commentItem.replaceWith(updateForm);

            updateForm.addEventListener('submit', function (e) {
                e.preventDefault();

                let content = updateForm.querySelector('.comment-update-input').value;
                console.log(updateForm.querySelector('.comment-update-input').value);
                let commentId = updateForm.querySelector('input[name="comment-id"]').value;
                let memberId = updateForm.querySelector('input[name="reg-member-id"]').value;

                let id = commentId;
                let regMemberId = memberId;

                let formData = { id, content, regMemberId };
                let jsonData = JSON.stringify(formData);

                handleCommentUpdate(commentId, memberId, jsonData);
            });
        } else if (event.target.classList.contains('co-del-btn')) {
            // 삭제 버튼 클릭 처리
            let delBtnId = event.target.dataset.id;

            let delForm = document.querySelector(".diary-comment-form");
            let memberIdInput = delForm.querySelector('input[name="reg-member-id"]');
            let memberId = memberIdInput.value;

            handleCommentDelete(delBtnId, memberId);
        }
    });

    commentAddBtn.addEventListener('click', function (e) {
        console.log("클릭되었습니다.");
        e.preventDefault();

        let form = document.querySelector('.diary-comment-form');
        let inputs = form.elements;

        let regMemberId = inputs["reg-member-id"].value;
        let content = inputs["content"].value;
        let diaryPostId = inputs["diary-post-id"].value;
        let regMemberNickname = inputs["reg-member-nickname"].value;

        let formData = { regMemberId, content, diaryPostId, regMemberNickname };
        let jsonData = JSON.stringify(formData);

        console.log(jsonData);

        handleCommentPost(jsonData);
    });
}

/* ----------------- 윈도우 로드 시 댓글 리스트 조회 ----------------- */

window.addEventListener('DOMContentLoaded', function (e) {

    let diaryPostIdInput = document.querySelector('input[name="diary-post-id"]');
    let diaryId = diaryPostIdInput.value;

    let editForm = document.querySelector(".diary-edit-form");
    let commentForm = document.querySelector(".diary-comment-form");
    let commentShowBtn = editForm.querySelector(".comment-btn");

    commentShowBtn.addEventListener('click', function (e) {
        console.log("나 불렀엉?");
        e.preventDefault();

        if (commentForm.style.display === "block") {
            commentForm.style.display = "none";
        } else {
            commentForm.style.display = "block";
        }

        commentListLoad(`/api/diaryComments/${diaryId}`);

    });

    addClickEventListeners();
});
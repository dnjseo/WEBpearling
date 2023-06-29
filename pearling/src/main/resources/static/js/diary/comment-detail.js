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
                        <span>${comment.regMemberNickname}</span>
                        <span class="content-span">${comment.content}</span>
                        <div class="up-del-box">
                            <span>${formattedDate}</span>
                            <div class="up-del-btns">
                            <button class="co-update-btn" type="button" data-id="${comment.id}">수정</button>
                            <button class="co-del-btn" type="button" data-id="${comment.id}">삭제</button>
                        </div>
                        <input type="hidden" name="diaryPostId">
                        <input type="hidden" name="comment-id" value="${comment.id}">
                    </div>
                    </div>`;

                commentList.insertAdjacentHTML("beforeend", itemTemplate);


            }
        })
        .catch((error) => {
            console.error('댓글 리스트 호출 중 오류가 발생했습니다', error);
        });
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
                window.location.reload();
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
            // 수정 버튼 클릭 처리
            let updateBtnId = event.target.dataset.id;
            console.log(updateBtnId);

            // let commentBox = document.querySelector(".comment");
            // let commentText = commentBox.querySelector('.content-span').textContent;

            // 기존 댓글 자리에 수정 textarea replace 처리
            let commentUpdateInput = document.createElement("textarea");
            commentUpdateInput.classList.add = "comment-update-input";
            commentUpdateInput.name = "update-content";
            commentUpdateInput.id = "update-comment-input"
            commentUpdateInput.dataset.id = updateBtnId;
            // commentUpdateInput.value = commentText;
            let commentItem = event.target.closest('.comment');
            commentItem.replaceWith(commentUpdateInput);

            let updateForm = document.querySelector(".diary-comment-form");
            let memberIdInput = updateForm.querySelector('input[name="reg-member-id"]');
            let memberId = memberIdInput.value;

            // json 데이터로 넘겨줄 변수 선언, id와 등록멤버를 충족하면 content 속성을 변경.
            let content;
            let id;
            let regMemberId = memberId;

            // 수정 textread 현재 value를 포함하기 위해 input 이벤트 설정
            commentUpdateInput.addEventListener('input', function (e) {
                e.preventDefault();
                content = this.value;
                id = commentUpdateInput.dataset.id;
            });

            // 기존 댓글 작성 버튼을 댓글 수정 버튼으로 변경하기 위해 replace
            let updateBtn = document.querySelector(".comment-add-btn");
            let newCommentAddBtn = document.createElement("button");
            newCommentAddBtn.classList.add = "new-comment-add-btn";
            newCommentAddBtn.innerText = "댓글 수정";

            let replaceBtn = updateBtn.parentNode;
            replaceBtn.replaceChild(newCommentAddBtn, updateBtn);

            replaceBtn.addEventListener('click', function (e) {
                console.log("쿨릭");
                e.preventDefault();

                let formData = { id, content, regMemberId };
                let jsonData = JSON.stringify(formData);

                handleCommentUpdate(updateBtnId, memberId, jsonData);
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
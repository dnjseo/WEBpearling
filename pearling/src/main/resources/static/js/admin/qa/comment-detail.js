function qaCommentListLoad(url){
    let qaCommentList = document.querySelector(".answer-input");

    fetch(url)
        .then(response => response.json())
        .then(list => {
            qaCommentList.innerHTML = "";

            for(let qaComment of list){

                let itemTemplate = `
                <div class="edit-part">
                    <div class="pearl-logo">
                    <img src="/images/profile/circle.png">
                        <p> PEARLING </p>
                    </div>
                    <div class="edit-btn" value=${qaComment.id}>
                        <button class="update-btn" type="button">수정</button>
                        <p> </p>
                        <button class="delete-btn" type="button">삭제</button>
                        <p> </p>
                        <button class="put-btn" type="button">저장</button>
                    </div>
                </div>
                <textarea disabled class="admin-text">${qaComment.answer}</textarea>
                <p>${qaComment.regdate}</p>
                `;
                qaCommentList.insertAdjacentHTML("beforeend", itemTemplate);
            }
        })
}

window.addEventListener("DOMContentLoaded", function(e) {

    // 댓글 로드
    let qaId = document.querySelector("input[name='qaId']").value;
    qaCommentListLoad(`/api/admin/QaComment/${qaId}`);
    
    
    // 댓글 작성
    let writeBtn = document.querySelector(".write-btn");
    writeBtn.addEventListener("click", function(e){
        e.preventDefault();
        
        let answerTextarea = document.querySelector("textarea[name='QaAnswer']");
        let answer = answerTextarea.value;

        if (answer.trim() === "") {
            answerTextarea.placeholder = "내용은 필수로 작성해야 합니다.";
            return; 
        }


        let roleId = document.querySelector("input[name='roleId']").value;
        
        console.log(answer);
        console.log(roleId);
        console.log(qaId);

        fetch(`/api/admin/QaComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({answer, qaId, roleId})
        })
        .then(function(response){
            if(response.ok){
                console.log("답변 등록 완료");
                location.reload();
            } else {
                console.log("답변 등록 실패");
            }
        });
    })

   // 동적으로 불러온 댓글 삭제 및 수정
    let commentList = document.querySelector(".answer-input");
   
    commentList.addEventListener("click", function(event) {
        
        let target = event.target;
        let textarea = target.parentElement.parentElement.nextElementSibling;
        let id = target.parentElement.getAttribute("value");
      
       
        if (target.classList.contains("delete-btn")) {
          
          console.log(id);
      
          fetch(`/api/admin/QaComment/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function(response) {
              if (response.ok) {
                console.log("답변 삭제 완료");
                location.reload();
              } else {
                console.log("답변 삭제 실패");
              }
            });
        }

        if (target.classList.contains("update-btn")) {
            
            textarea.disabled = false;

            
            console.log(id);

            let answer = textarea.value;
            console.log(answer);
    
        }

        if (target.classList.contains("put-btn")) {
        
            let answer = textarea.value;

            fetch(`/api/admin/QaComment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, answer})
            })
            .then(function(response) {
                if (response.ok) {
                    console.log("답변 수정 완료");
                    location.reload();
                } else {
                    console.log("답변 수정 실패");
                }
            });
            console.log(id);
            console.log(answer);
        }
    
    });

    
    
    
    
  });
  
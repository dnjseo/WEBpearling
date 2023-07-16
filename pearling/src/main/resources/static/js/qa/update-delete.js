window.addEventListener("DOMContentLoaded", function(e){
    
    let realUrl = new URL(window.location.href);
    let searchParams = realUrl.searchParams;
    let id = searchParams.get("id");

    qaCommentListLoad(`/api/Qa/${id}`);

    // 점 3개 버튼 누르면 수정 / 삭제 / 등록 버튼 뜨기
    let threeBtn = document.querySelector(".three-btn");
    let editBtn = document.querySelector(".edit-btn");
    threeBtn.addEventListener("click", function(e){
    
        if(editBtn.style.display === "block"){
            editBtn.style.display = "none";
        } else{
            editBtn.style.display = "block";
        }
    })

    // 로그인 유저랑 작성자가 다를 때는 수정 버튼 안 보이게 하기
    let loginId = document.querySelector("input[name='loginId']").value;
    let writerId = document.querySelector("input[name='writerId']").value;

    if(loginId != writerId){
        threeBtn.style.display = "none";
    }

    let updateBtn = document.querySelector(".update-btn");
    let titleInput = document.querySelector(".qa-titles");
    let secretCheckbox = document.querySelector(".qa-secret input[type='checkbox']");
    let contentTextarea = document.querySelector(".qa-context");

    // 수정 버튼 누르면 disabled 사라짐
    updateBtn.addEventListener("click", function(e){

        titleInput.removeAttribute("disabled");
        secretCheckbox.removeAttribute("disabled");
        contentTextarea.removeAttribute("disabled");
    })


    // 게시글 수정
    let addBtn = document.querySelector(".addBtn");
    
    addBtn.addEventListener("click", function(e){
        e.preventDefault();
        
        let title = document.querySelector("input[name='title']").value;
        let content = document.querySelector("textarea[name='content']").value;
        let isChecked = document.querySelector("input[name='lock']").checked;
        let securityCheck = isChecked ? 1: 0;

        console.log(id);

        fetch(`/api/Qa/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, title, content, securityCheck})
        })
        .then(function(response){
            if(response.ok){
                console.log("질문 수정 완료");
                window.location.href = 'list';
        
            } else {
                console.log("질문 수정 실패");
            }
        });
        
        console.log(id);
        console.log(title);
        console.log(content);
        console.log(isChecked);
        console.log(securityCheck);
    })

    // 게시글 삭제
    let deletebtn = document.querySelector(".deleteBtn");
    deletebtn.addEventListener("click", function(e){
        e.preventDefault();

        fetch(`/api/Qa/${id}`,{
            method: 'DELETE'
        })
        .then(function(response){
            if(response.ok){
                console.log( id+ "질문 삭제 완료");
                window.location.href = 'list';
            
            } else {
                console.log("질문 삭제 실패");
            }
        });     

    })

})

// 댓글 목록 불러오기
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
                </div>
                <textarea disabled class="admin-text">${qaComment.answer}</textarea>
                <p>${qaComment.regdate}</p>

                `;

                qaCommentList.insertAdjacentHTML("beforeend", itemTemplate);
            }
        })
}
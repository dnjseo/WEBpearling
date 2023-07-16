window.addEventListener("DOMContentLoaded", function(e){
    
    let writeBtn = document.querySelector(".write-btn");

    writeBtn.addEventListener("click", function(e){
        e.preventDefault();
        
        let titleInput = document.querySelector("input[name='title']");
        let contentTextarea = document.querySelector("textarea[name='content']");

        let title = titleInput.value;
        let content = contentTextarea.value;

        if (title.trim() === "") {
            titleInput.placeholder = "제목은 필수로 작성해야 합니다.";
            return; 
        }

        if (content.trim() === "") {
            contentTextarea.placeholder = "내용은 필수로 작성해야 합니다.";
            return; 
        }

        let memberId = document.querySelector("input[name='memberId']").value;
        let memberNickname = document.querySelector("input[name='writerNickname']").value;
        let isChecked = document.querySelector("input[name='lock']").checked;
        let securityCheck = isChecked ? 1: 0;
        
        
        fetch(`/api/Qa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content, memberId, securityCheck, memberNickname})
        })
        .then(function(response){
            if(response.ok){
                console.log("질문 등록 완료");
                window.location.href = 'list';
        
            } else {
                console.log("질문 등록 실패");
            }
        });

        console.log(title);
        console.log(content);
        console.log(memberId);
        console.log(isChecked);
        console.log(memberNickname);
    })
})
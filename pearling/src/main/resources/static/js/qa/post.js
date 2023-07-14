window.addEventListener("DOMContentLoaded", function(e){
    
    let writeBtn = this.document.querySelector(".write-btn")

    writeBtn.addEventListener("click", function(e){
        e.preventDefault();
        
        let title = document.querySelector("input[name='title']").value;
        let content = document.querySelector("textarea[name='content']").value;
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
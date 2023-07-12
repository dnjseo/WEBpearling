window.addEventListener("DOMContentLoaded", function(e){

    let writeBtn = document.querySelector(".write-btn");
    let realUrl = new URL(window.location.href);
    let searchParams = realUrl.searchParams;
    let id = searchParams.get("id");
    
    writeBtn.addEventListener("click", function(e){
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
                // 오류 처리 등 추가 작업 수행
            }
        });
        
        console.log(id);
        console.log(title);
        console.log(content);
        console.log(isChecked);
        console.log(securityCheck);
    })
})
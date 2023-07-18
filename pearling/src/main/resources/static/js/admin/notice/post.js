window.addEventListener("DOMContentLoaded", function(e){

    let postBtn = document.querySelector(".post-btn");

    postBtn.addEventListener('click', function(e){
        e.preventDefault();
        
        let titleInput = document.querySelector("input[name='title']");
        let contentInput = document.querySelector("textarea[name='content']");

        let title = titleInput.value;
        let content = contentInput.value;
        let roleId = document.querySelector("input[name='hiddenRoleId']").value;

        if (title.trim() === "") {
            titleInput.placeholder = "제목은 필수로 작성해야 합니다.";
            return; 
        }

        if (content.trim() === "") {
            contentInput.placeholder = "내용은 필수로 작성해야 합니다.";
            return; 
        }
        
        
        fetch(`/api/admin/notice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content, roleId})
        })
        .then(function(response){
            if(response.ok){
                console.log("공지 등록 완료");
                window.location.href = "/admin/notice/list";
            } else {
                console.log("공지 등록 실패");
                // 오류 처리 등 추가 작업 수행
            }
        });
        
        console.log(title);
        console.log(content);
        console.log(roleId);
    });
    
})
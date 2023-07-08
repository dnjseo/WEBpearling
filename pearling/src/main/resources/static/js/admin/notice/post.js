window.addEventListener("DOMContentLoaded", function(e){

    let postBtn = document.querySelector(".post-btn");

    postBtn.addEventListener('click', function(e){
        e.preventDefault();
        
        let title = document.querySelector("input[name='title']").value;
        let content = document.querySelector("textarea[name='content']").value;
        let roleId = document.querySelector("input[name='hiddenRoleId']").value;
        
        
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
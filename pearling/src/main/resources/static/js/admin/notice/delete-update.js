window.addEventListener("DOMContentLoaded", function(e){

    let realUrl = new URL(window.location.href);
    let searchParams = realUrl.searchParams;
    let id = searchParams.get("id");

    let deleteBtn = document.querySelector(".delete-btn");
    let editBtn = document.querySelector(".edit-btn");
    
    deleteBtn.addEventListener('click', function(e){
        e.preventDefault();
        
        let title = document.querySelector("input[name='title']").value;
        let content = document.querySelector("textarea[name='content']").value;
        let roleId = document.querySelector("input[name='hiddenRoleId']").value;

        fetch(`/api/admin/notice/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content, roleId})
        })
        .then(function(response){
            if(response.ok){
                console.log("공지 삭제 완료");
                window.location.href = "/admin/notice/list";
            } else {
                console.log("공지 삭제 실패");
                // 오류 처리 등 추가 작업 수행
            }
        });
        
    });
    

    editBtn.addEventListener('click', function(e){
        e.preventDefault();
        
        let title = document.querySelector("input[name='title']").value;
        let content = document.querySelector("textarea[name='content']").value;
        let roleId = document.querySelector("input[name='hiddenRoleId']").value;
        
        
        fetch(`/api/admin/notice/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, title, content, roleId})
        })
        .then(function(response){
            if(response.ok){
                console.log("공지 수정 완료");
                window.location.href = "/admin/notice/list";
            } else {
                console.log("공지 수정 실패");
                // 오류 처리 등 추가 작업 수행
            }
        });

        console.log(title);
        console.log(content);
        console.log(id);

    });
})
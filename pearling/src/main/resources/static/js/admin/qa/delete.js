window.addEventListener("DOMContentLoaded", function(e){

    // 점 3개 버튼 누르면  삭제 버튼 뜨기
    let threeBtn = document.querySelector(".three-btn");
    let editBtn = document.querySelector(".edit-btn");
    threeBtn.addEventListener("click", function(e){
    
        if(editBtn.style.display === "block"){
            editBtn.style.display = "none";
        } else{
            editBtn.style.display = "block";
        }
    })
    
    let realUrl = new URL(window.location.href);
    let searchParams = realUrl.searchParams;
    let id = searchParams.get("id");

    console.log(id);

   let deleteBtn = document.querySelector(".deleteBtn");
   deleteBtn.addEventListener("click", function(e){
       e.preventDefault();

       fetch(`/api/admin/Qa/${id}`,{
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
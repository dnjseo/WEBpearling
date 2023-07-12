
window.addEventListener("load", function (e) {
  let qaListBodies = document.querySelectorAll('.qa-list-body');
  let openedAnswer = null; // 열려있는 항목 변수 추가

  qaListBodies.forEach(function (qaListBody) {
    let memberQ = qaListBody.querySelector('.item');
    let adminA = qaListBody.querySelector('.dropdown-answer');
    let isOpen = false;

    adminA.style.display = 'none';

    memberQ.addEventListener('click', function () {
      let personalQa = qaListBody.querySelector("[name='isCheckedId']").value;
      let userId = qaListBody.querySelector("[name='writerId']").value;
      let loginId = qaListBody.querySelector("[name='loginId']").value;
      let roleId = qaListBody.querySelector("[name='roleId']").value;

      let updateAndDelete = qaListBody.querySelector(".updateAndDelete");

      if (personalQa == 0 || roleId == 1 || loginId == userId) {
        if (openedAnswer === adminA) {
          adminA.style.display = isOpen ? 'none' : 'block';
          isOpen = !isOpen;
          openedAnswer = isOpen ? adminA : null;
        } else {
          if (openedAnswer !== null) {
            openedAnswer.style.display = 'none';
          }
          adminA.style.display = 'block';
          isOpen = true;
          openedAnswer = adminA;
        }
      }

      if(loginId != userId){
        updateAndDelete.style.display = "none";
      }
      
      let adminAnswer = qaListBody.querySelector(".answerForUser");
      if(roleId != 1){
        adminAnswer.style.display = "none";
      }

    });

    let secretImg = qaListBody.querySelector(".secret");
    let secretQa = qaListBody.querySelector("[name='isCheckedId']").value;

    if (secretQa == 0) {
      secretImg.style.display = "none";
    }

  });

  let deleteBtns = document.querySelectorAll(".deleteBtn");
    
    deleteBtns.forEach(deleteBtn => {
        
        deleteBtn.addEventListener('click', function(e){
            
            let el = e.target;
            let id = el.dataset.id;

            console.log(id);

            fetch(`/api/Qa/${id}`,{
                method: 'DELETE'
            })
        .then(function(response){
            if(response.ok){
                console.log( id+ "질문 삭제 완료");
                location.reload()
            
            } else {
                console.log("질문 삭제 실패");
                // 오류 처리 등 추가 작업 수행
            }
        });    
        })
    })
 
});
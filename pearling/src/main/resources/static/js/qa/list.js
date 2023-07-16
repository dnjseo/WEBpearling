window.addEventListener("load", function (e) {

  let qaListBodies = document.querySelectorAll('.qa-list-body');

  qaListBodies.forEach(function (qaListBody) {
    let answerStatus = qaListBody.querySelector(".answer");
    let qaStaus = qaListBody.querySelector("[name='qaStatus']").value;
   
    
    if(qaStaus == 1){
      answerStatus.innerHTML = "답변 완료";
    }
    else if(qaStaus == 0){
      answerStatus.innerHTML = "답변 예정";
    }

    let secretImg = qaListBody.querySelector(".secret");
    let secretQa = qaListBody.querySelector("[name='isCheckedId']").value;

    if (secretQa == 0) {
      secretImg.style.display = "none";
    }
 
    let roleId = qaListBody.querySelector("[name='roleId']").value;
    let userId = qaListBody.querySelector("[name='writerId']").value;
    let loginId = qaListBody.querySelector("[name='loginId']").value;

    
    if (secretQa == 1 && roleId != 1 && userId != loginId) {
      let link = qaListBody.querySelector('.item');
      link.style.pointerEvents = 'none';
      link.style.color = 'gray';
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }
    
  });
  
});

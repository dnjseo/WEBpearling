
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

  });

});
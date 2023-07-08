window.addEventListener("DOMContentLoaded", function(e){

    let roleId = document.querySelector("input[name='loginId']").value;
    let noticeBtn = document.querySelector(".notice-btn");
    let title = document.querySelector(".notice-title");
    let content = document.querySelector(".notice-context");

    if(roleId != "1"){
        noticeBtn.style.display = "none";
        title.disabled = true;
        content.disabled = true;
    }

    
});
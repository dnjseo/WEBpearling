window.addEventListener("DOMContentLoaded", function(e){

    let loginId = document.querySelector("input[name='loginId']").value;
    let addBtn = document.querySelector(".write-btn");

    if(loginId == "1"){
        addBtn.style.display = "block"; 
    } else{
        addBtn.style.display = "none"; 
    }
});
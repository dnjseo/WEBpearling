window.addEventListener("DOMContentLoaded", function(e){

    let roleId = document.querySelector("input[name='loginId']").value;
    let addBtn = document.querySelector(".write-btn");

    if(roleId == "1"){
        addBtn.style.display = "block"; 
    } else{
        addBtn.style.display = "none"; 
    }
});
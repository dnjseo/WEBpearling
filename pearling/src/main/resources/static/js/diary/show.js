// window.addEventListener('DOMContentLoaded', function (e) {

//     let commentUpdateBtns = document.querySelectorAll(".co-update-btn");
//     let commentDeleteBtn = document.querySelector(".co-del-btn");
    
//     let urlParams = new URLSearchParams(window.location.search);
//     console.log("댓글 url : " + urlParams);
//     let userId = urlParams.get('uid');
//     console.log("댓글 uid : " + userId);
//     let loginId = document.querySelector("#input-login-id").value;
//     console.log("댓글 loginId : " + loginId);
//     let regMemberId = document.querySelector('input[name="reg-id"]').value;
//     console.log("댓글 regId : " + regMemberId);
//     let contentSpan = document.querySelector(".content-span");

//     for (let i = 0; i < commentUpdateBtns.length; i++) {
//             if(userId == regMemberId || loginId == regMemberId || userId == "") {
//             commentUpdateBtns[i].style.display = "block";
//         } else {
//             commentUpdateBtns[i].style.display = "none";
//         }
//         // commentDeleteBtn.style.display = "block";
//     }
// });
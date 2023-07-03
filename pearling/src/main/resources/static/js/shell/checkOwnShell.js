document.addEventListener('DOMContentLoaded', function () {

const url = new URL(window.location.href);
const path = url.pathname;
const pathArray = path.split("/");
const userId = (pathArray[1] === "shell" && pathArray[2] === "myshell") ? pathArray[3] || null : null;
const plusBtn = document.querySelector('.plusbox')
const checkboxes = document.querySelectorAll('.todo-checkbox');

fetch('/api/member')
.then(response => response.json())
.then(member => {
  let loginMember = member.id;


if(userId == null || userId == loginMember){
  plusBtn.classList.remove('d-none');
  document.querySelector('.show-del-btn').classList.remove('d-none');
          
    checkboxes.forEach(function(checkbox) {
      checkbox.removeAttribute('disabled');
    });


  } else {
    document.getElementById('s1').style.display = "block";
    document.getElementById('s1').style.display = "flex";
    document.getElementById('shell-menu').style.display = "none";

    document.querySelector('#myshell-menu .monthly').href = "/shell/myshell/"+userId
    document.querySelector('#myshell-menu .diary').href = "/diary/list/"+userId
    document.querySelector('#myshell-menu .guestbook').href = "/guestbook/list/"+userId
}

})
  

}); //DOM end

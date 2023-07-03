document.addEventListener('DOMContentLoaded', function () {

const url = new URL(window.location.href);
const path = url.pathname;
const pathArray = path.split("/");
const userId = (pathArray[1] === "shell" && pathArray[2] === "myshell") ? pathArray[3] || null : null;
const plusBtn = document.querySelector('.plusbox')
const checkboxes = document.querySelectorAll('.todo-checkbox');

if(userId == null){
  plusBtn.classList.remove('d-none');
  document.querySelector('.show-del-btn').classList.remove('d-none');
        
    checkboxes.forEach(function(checkbox) {
      checkbox.removeAttribute('disabled');
    });
  }
  

}); //DOM end

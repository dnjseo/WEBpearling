document.addEventListener('DOMContentLoaded', function () {

  const url = new URL(window.location.href);
  const path = url.pathname;
  const pathArray = path.split("/");
  const userId = (pathArray[1] === "shell" && pathArray[2] === "myshell") ? pathArray[3] || null : null;
  const plusBtn = document.querySelector('.plusbox')
  const checkboxes = document.querySelectorAll('.todo-checkbox');
  const schedules = document.querySelectorAll('.sche-link');

  //로그인한 회원 정보 가져오기
  fetch('/api/member')
    .then(response => response.json())
    .then(member => {
      let loginMember = member.id;

      // 본인 쉘일 경우 : myshell의 작성/수정/삭제 활성화 
      if (userId == null || userId == loginMember) {
        plusBtn.classList.remove('d-none');
        document.querySelector('.show-del-btn').classList.remove('d-none');

        checkboxes.forEach(function (checkbox) {
          checkbox.removeAttribute('disabled');
        });

        // 본인 쉘이 아닐 경우 
        // : 아워쉘 메뉴 비활성화
      } else {
        document.getElementById('s1').style.display = "block";
        document.getElementById('s1').style.display = "flex";
        document.getElementById('shell-menu').style.display = "none";

        //: 마이쉘 하위메뉴 a링크 값 변경
        document.querySelector('#myshell-menu .monthly').href = "/shell/myshell/" + userId
        document.querySelector('#myshell-menu .diary').href = "/diary/list?uid=" + userId
        document.querySelector('#myshell-menu .guestbook').href = "/guestbook/list/" + userId
       
        // : 프로필 변경 
        changeProfile(userId);

        schedules.forEach(function (schedule) {
      
          schedule.href = '#';
          schedule.onclick = function (event) {
            event.preventDefault(); // 클릭 이벤트 막기
            return false;
          }
        });
        
        


      }

    })//fetch


}); //DOM end


// 쉘 프로필 변경하는 로직.
function changeProfile(userId){
  fetch(`/api/member/${userId}`)
  .then(response => response.json())
  .then(member => {
    console.log('member확인:'+member)

   let userProfile = document.getElementById('s1')
   userProfile.querySelector('.shell-name').innerHTML=`${member.nickname}의 Shell`
   userProfile.querySelector('.shell-image').src=`/resources/img/${member.profileImage}`
  })
}
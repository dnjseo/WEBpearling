document.addEventListener('DOMContentLoaded', function () {

  let url = new URL(window.location.href);
  let urlParams = url.searchParams;
  let userId = urlParams.get('uid');

  let urlParam = new URLSearchParams(window.location.search);


  //로그인한 회원 정보 가져오기
  fetch('/api/member')
    .then(response => response.json())
    .then(member => {
      let loginMember = member.id;

      if(userId == null || userId == loginMember) {
        document.getElementById('s1').style.display = "none";
      } else if (userId != null || userId != loginMember) {

        document.getElementById('s1').style.display = "block";
        document.getElementById('s1').style.display = "flex";
        document.getElementById('shell-menu').style.display = "none";

        //: 마이쉘 하위메뉴 a링크 값 변경
        document.querySelector('#myshell-menu .monthly').href = "/shell/myshell/" + userId
        document.querySelector('#myshell-menu .diary').href = "/diary/list?uid=" + userId
        document.querySelector('#myshell-menu .guestbook').href = "/guestbook/list/" + userId
       
        // : 프로필 변경 
        changeProfile(userId);
       } 
      

    })//fetch


}); //DOM end


// 쉘 프로필 변경하는 로직.
function changeProfile(userId) {
  fetch(`/api/member/${userId}`)
    .then(response => response.json())
    .then(member => {
      console.log('member확인:' + member)

      let userProfile = document.getElementById('s1')
      userProfile.querySelector('.shell-name').innerHTML = `${member.nickname}의 Shell`
      userProfile.querySelector('.shell-image').src = `/resources/img/${member.profileImage}`
    })
}
window.addEventListener("DOMContentLoaded", function(e) {
    let realUrl = new URL(window.location.href);
    let path = realUrl.pathname;
    let pathArray = path.split("/");
    let uid = pathArray[pathArray.length - 1];
    let urlwithId = `/api/shell/myshell/${uid}`;
    let Btn = document.querySelector(".follobutton");
    
    // 친구 쉘 header 로드
    function friendShellLoad(urlwithId) {
        let friendShellList = document.querySelector(".profile-x");
        
        console.log('friendShellLoad 함수 실행됨');
        console.log('urlwithId:', urlwithId);

        fetch(urlwithId)
            .then(response => response.json())
            .then(followList => {
                friendShellList.innerHTML = "";
                
                const idToCheck = uid.toString(); // 검사할 id 값을 현재 페이지의 id로 설정
                
                let itemTemplate = `
                <form class="profile-x">
                <img class="shell-image" src="/images/profile/profile_yr.png">
                <p class="shell-name"> 탐정's shell</p>
                <button class="follobutton">팔로우</button>
                </form>
                `;

                const matchingFriend = followList.find(friend => friend.id.toString() === idToCheck)
                
                // 팔로잉 상태인 경우 템플릿을 수정하여 출력
                if (matchingFriend) {

                    // 내 팔로우 리스트에서 현재 페이지 id랑(followerId)랑 같은 값 찾기
                    let id = matchingFriend.statusId;
                    console.log(id);
                    
                    itemTemplate = `
                    <form class="profile-x">
                    <img class="shell-image" src="/images/profile/profile_yr.png">
                    <p class="shell-name"> 탐정's shell</p>
                    <button class="follobutton">팔로잉</button>
                        </form>
                        `;
                    }
                    
                    friendShellList.insertAdjacentHTML("beforeend", itemTemplate);
                    
                    // followBtn 선택 및 이벤트 리스너 등록
                    let followBtn = document.querySelector(".follobutton");
                    followBtn.addEventListener('click', function(e){
                        e.preventDefault();
                        
                        let followerId = uid;
                        console.log("친구의 id는 " + followerId);
                        let followingIdInput = document.querySelector("input[name='followingHiddenId']");
                        let followingNicknameInput = document.querySelector("input[name='followingHiddenNickname']");
                        console.log(followingIdInput);
                        
                        let followingId = followingIdInput.value;
                        let followingNickname = followingNicknameInput.value;
                        console.log("내 id는 " + followingId);
                        
                        if(followBtn.innerText == "팔로우"){
                            fetch(`/api/shell/myshell/${uid}`,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({followingId, followerId})
                            })
                            .then(function(response){
                                if(response.ok){
                                    followBtn.innerText = '팔로잉';
                                    console.log("추가 완");

                                    // 팔로우 등록 성공 시 알림 등록
                                    let pubMemberId = followingId; // 등록한 사람: memberId
                                    let pubMemberNickname = followingNickname;
                                    let subMemberId = followerId; // 수신할 사람: userId
                                    let message = pubMemberNickname + '님이 팔로우 신청을 했습니다.';
                                    let type = 2;
                                    console.log(message);
                                    
                                    let notificationData = { pubMemberId, subMemberId, message, type };
                                    
                                    notifyNotificationService(subMemberId, notificationData);

                                    // e.preventDefault(); 
                                }
                            })
                        }
                        else if (followBtn.innerText == "팔로잉") {
                            id = matchingFriend.statusId;
                            fetch(`/api/shell/myshell/${id}`, {
                                method: 'DELETE', 
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ followingId, followerId })
                            })
                            .then(function(response) {
                                if (response.ok) {
                                    followBtn.innerText = '팔로우';
                                    followBtn.style.backgroundColor = "";
                                    console.log("삭제 완" + id);
                                    // e.preventDefault();
                            
                                }
                            });
                    }
                });
            });
    }

    friendShellLoad(urlwithId);
});

/* ----------------- 댓글 알림 등록 함수 ----------------- */
function notifyNotificationService(subMemberId, notificationData) {

    console.log("댓글은 이렇습니다" + JSON.stringify(notificationData));
  
    fetch(`/api/notifications/notify/${subMemberId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData),
    })
      .then(function (response) {
        if (response.ok) {
          console.log('알림 등록이 완료되었습니다.');
        } else {
          console.error('알림 등록에 실패했습니다.');
        }
      })
      .catch(function (error) {
        console.error('알림 등록 중 오류가 발생했습니다.', error);
      });
  }

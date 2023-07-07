window.addEventListener("DOMContentLoaded", function(e) {
    let realUrl = new URL(window.location.href);
    let path = realUrl.pathname;
    let pathArray = path.split("/");
    let uid = pathArray[pathArray.length - 1];
    let urlwithId = `http://localhost:8080/api/shell/myshell/${uid}`;
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
                        console.log(followingIdInput);
                        
                        let followingId = followingIdInput.value;
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
                                    followBtn.style.backgroundColor = '#5A2E95';
                                    console.log("추가 완");
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



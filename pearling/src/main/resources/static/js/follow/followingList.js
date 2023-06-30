function followingListLoad(url) {
    let followingList = document.querySelector(".following-list");

    fetch(url)
        .then(response => response.json())
        .then(list => {
            followingList.innerHTML = "";

            for (let following of list) {
                let itemTemplate = `
                <form class="following-list">
                    <div>
                    <h2 class="d-none">목록</h2>
                    <ul class="followers">
                        <li>
                        <img src=${following.profileImage}>
                        <p>${following.nickname}</p>
                        <p class="following-statement" data-id="${following.statusId}">팔로잉</p>
                        </li>
                    </ul>
                    </div>     
                </form>
                `;

                followingList.insertAdjacentHTML("beforeend", itemTemplate);
            }
    }); 
}

let url = 'http://localhost:8080/api/follow/followingList';

window.addEventListener("DOMContentLoaded", function(e){
    e.preventDefault(); // 새로고침 방지
    let followBtns = document.querySelectorAll(".following-statement");

    followBtns.forEach(followBtn => {
        followBtn.addEventListener('click', function(e) {

            let el = e.target;
            let followingId = el.parentElement.querySelector("input[name='hideFollowingId']").value;
            let followerId = el.parentElement.querySelector("input[name='hideFollowerId']").value;

            let id = el.dataset.id;
            console.log("id값은  "+id);
            console.log("내 id는" +followingId);
            console.log("내가 팔로우한 사람의 id는 " +followerId);

            if (el.classList.contains('following-statement')) {
                e.preventDefault(); 
                
                if(followBtn.innerText == '팔로잉'){
                    fetch(`/api/follow/followingList/${id}`,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({followingId, followerId})
                    })
                        .then(function(response){
                            if(response.ok){
                                followBtn.innerText = '팔로우';
                                e.preventDefault(); 
                            }
                        })
                    
                }

                else if(followBtn.innerText == '팔로우'){
                        
                    fetch(`/api/follow/followingList/${id}`,{
                         method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({followingId, followerId})
                    })
                        .then(function(response){
                            if(response.ok){
                                followBtn.innerText = '팔로잉';
                                e.preventDefault(); 
                            }
                        })

                }
            }


                    
        });
    });
});

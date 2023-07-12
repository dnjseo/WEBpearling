function followerListLoad(url){
    let followerList = document.querySelector(".follower-list");

    fetch(url)
        .then(response => response.json())
        .then(list => {
            followerList.innerHTML = "";

            for(let follower of list){
                let itemTemplate = `
                <form class="follower-list">
                    <div>
                        <h2 class="d-none">목록</h2>
                        <ul class="followers">
                            <li>
                                <img src=${follower.profileImage}>
                                <div>
                                    <p>${follower.nickname}>연주</p>
                                    <button class="follow-follower" data-follow-status="${follower.isFollower}">팔로우</button>
                                </div>
                                <!-- <p>팔로잉</p> -->
                                <button class="follower-delete" data-id="${follower.statusId}">삭제</button>
                            </li>
                        </ul>
                    </div>
                </form>
                `;

                followerList.insertAdjacentHTML("beforeend", itemTemplate);
            }

            
        })
}

let url = '/api/follow/followerList';

window.addEventListener("DOMContentLoaded", function(e){
    let deleteBtns = document.querySelectorAll(".follower-delete");
    let followBtns = document.querySelectorAll(".follow-follower");

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', function(e){

            let el = e.target;
            let followerId = el.parentElement.querySelector("input[name='hideFollowerId']").value;
            let followingId = el.parentElement.querySelector("input[name='hideFollowingId']").value;
            
            let id = el.dataset.id;

            console.log("id값은 " +id);
            console.log("나를 팔로우하는 사람의 id는 " +followerId);
            console.log("내 id는 " +followingId);
           

            if (el.classList.contains('follower-delete')) {

                    fetch(`/api/follow/followerList/${id}`,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({followerId, followingId})
                    })
                        .then(function(response){
                            if(response.ok){
                                console.log("삭제 완");
                            }
                        })
                    
            }

        })
    })

    followBtns.forEach(followBtn => {
        followBtn.addEventListener('click', function(e){

            let el = e.target;
    
            let followingId = el.closest("li").querySelector("input[name='hideFollowingId']").value;
            let followerId = el.closest("li").querySelector("input[name='hideFollowerId']").value;


            
            let id = el.dataset.id;
            
            console.log("id값은 " +id);
            console.log("나를 팔로우하는 사람의 id는 " +followerId);
            console.log("내 id는 " +followingId);
            
            if (el.classList.contains('follow-follower')) {
                
                fetch(`/api/follow/followerList/${id}`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({followingId, followerId})
                })
                    .then(function(response){
                        if(response.ok){
                            console.log("추가 완");
                        }
                    })
                
            }


        })

    })
})
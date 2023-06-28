window.onload = function () {
    function countLoad(){
        let followCount = document.querySelector(".follow-list");
        let following = followCount.querySelector(".following-count");
        let follower = followCount.querySelector(".follower-count");
    
        fetch("/api/aside")
            .then(response => response.json())
            .then(count => {
                following.innerHTML = count[0];
                follower.innerHTML = count[1];
            });
    }
    
    countLoad();

}
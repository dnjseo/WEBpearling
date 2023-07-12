window.addEventListener("DOMContentLoaded", function(e){
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

    let loginId = document.querySelector("input[name='loginId']").value;
    let roleStatus = document.querySelector(".nickname")
    let followStatus = document.querySelector(".follow-list")
    let adminSetting = document.querySelector(".admin-setting");

    if(loginId == "1"){
        roleStatus.innerText += " (관리자)";
        followStatus.style.display = "none"; 
        adminSetting.style.display = "block"; 
    }

});



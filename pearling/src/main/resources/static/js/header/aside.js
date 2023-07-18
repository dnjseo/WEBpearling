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
    let adminName = document.querySelector(".admin-name")
    let followStatus = document.querySelector(".follow-list")
    let adminSetting = document.querySelector(".admin-setting");

    if(loginId == "1"){
        adminName.innerText = " (관리자)";
        followStatus.style.display = "none"; 
        adminSetting.style.display = "block"; 
    }
    else
        adminName.style.display = "none";

});



window.onload = function(){
    
    let roleId = document.querySelector("input[name='roleId']").value;

    if(roleId == 1){
        let noticeLink = document.querySelector(".notice-link a");
        let qaLink = document.querySelector(".qa-link a");
        noticeLink.href="/admin/notice/list";
        qaLink.href="/admin/qa/list";
    }


};
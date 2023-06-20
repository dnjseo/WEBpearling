function chkEmailConfirm(data, memailconfirm, memailconfirmTxt) {
    var emconfirmchk = document.querySelector(".emconfirmchk");
    memailconfirm.addEventListener("keyup", function() {
        if (data !== memailconfirm.value) {
            emconfirmchk.textContent = "인증번호가 잘못되었습니다";
            emconfirmchk.style.color = "#FA3E3E";
            emconfirmchk.style.fontWeight = "bold";
            emconfirmchk.style.fontSize = "10px";
        } else {
            emconfirmchk.textContent = "인증번호 확인 완료";
            emconfirmchk.style.color = "#0D6EFD";
            emconfirmchk.style.fontWeight = "bold";
            emconfirmchk.style.fontSize = "10px";
        }
    });
}

// 인증번호 모달
function showModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
    var checkEmailBtn = document.getElementById("checkEmail");

    checkEmailBtn.addEventListener("click", function() {
        var memail = document.getElementById("memail");
        var memailconfirm = document.getElementById("memailconfirm");
        var memailconfirmTxt = document.getElementById("memailconfirmTxt");

        var fullEmail = memail.value + "@" + document.getElementById("memail-domain").value;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/signup/mailConfirm", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                showModal("send-modal");
                var data = xhr.responseText;
                console.log("data: " + data);
                chkEmailConfirm(data, memailconfirm, memailconfirmTxt);
            } else if (xhr.status !== 200) {
                console.log("Error: " + xhr.status);
            }
        };
        xhr.send("email=" + fullEmail);
    });

    var sendModal = document.getElementById("send-modal");
    var sendYes = sendModal.querySelector(".send-yes");

    sendYes.addEventListener("click", function() {
        sendModal.style.display = "none";
    });

});
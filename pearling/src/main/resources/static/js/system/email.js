$(function() {
    // 이메일 인증번호 체크 함수
    function chkEmailConfirm(data, $memailconfirm, $memailconfirmTxt) {
        $memailconfirm.on("keyup", function() {
            if (data !== $memailconfirm.val()) {
                emconfirmchk = false;
                $memailconfirmTxt.html("<span id='emconfirmchk'>인증번호가 잘못되었습니다</span>");
                $("#emconfirmchk").css({
                    "color": "#FA3E3E",
                    "font-weight": "bold",
                    "font-size": "10px"
                });
            } else {
                emconfirmchk = true;
                $memailconfirmTxt.html("<span id='emconfirmchk'>인증번호 확인 완료</span>");
                $("#emconfirmchk").css({
                    "color": "#0D6EFD",
                    "font-weight": "bold",
                    "font-size": "10px"
                });
            }
            console.log('ggggggggggg');
        });
    }

    // 인증번호 전송 확인 모달
    function showModal(modalId) {
        // 모달 요소를 가져옴
        var modal = document.getElementById(modalId);
        // 모달을 보이도록 스타일을 설정
        modal.style.display = "block";
    }

    // 인증번호 확인 버튼 모달
    function noneModal(modalId) {
        // 모달 요소를 가져옴
        var modal = document.getElementById(modalId);
        // 모달을 보이도록 스타일을 설정
        modal.style.display = "none";
    }

    // 이메일 인증번호
    $("#checkEmail").click(function() {
        var $memail = $("#memail");
        var $memailconfirm = $("#memailconfirm");
        var $memailconfirmTxt = $("#memailconfirmTxt");

        var fullEmail = $memail.val() + "@" + $("#memail-domain").val();

        $.ajax({
            type: "POST",
            url: "/signup/mailConfirm", // 수정된 경로
            data: {
                "email": fullEmail
            },
            success: function(data) {
                showModal("send-modal");
                console.log("data: " + data);
                chkEmailConfirm(data, $memailconfirm, $memailconfirmTxt);
        
                // 인증번호 확인 버튼 클릭 시 실행되는 로직
                $(".check-num-box button").click(function() {
                    var inputNum = $("#memailconfirm").val(); // 사용자가 입력한 인증번호
        
                    // 기대하는 인증번호와 사용자가 입력한 인증번호 비교
                    if (inputNum === data) {
                        showModal("confirm-modal"); // 인증 완료 모달 보이기
                    } else {
                        alert("인증번호가 일치하지 않습니다.");
                    }
                });
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    });
});

window.addEventListener("load", function () {
    
    // 인증번호 전송 모달
    let sendModal = document.getElementById("send-modal");
    let sendYes = sendModal.querySelector(".send-yes");

    sendYes.addEventListener("click", function () {
        sendModal.style.display = "none"; // 모달창 닫기
        
        // 인증번호 확인 모달
        let confirmModal = document.getElementById("confirm-modal");
        let confirmYes = confirmModal.querySelector(".confirm-yes");

        confirmYes.addEventListener("click", function () {
            confirmModal.style.display = "none"; // 모달창 닫기
        });
    });

});
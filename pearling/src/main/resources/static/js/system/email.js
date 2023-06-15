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

    // 이메일 인증번호
    $("#checkEmail").click(function() {
        var $memail = $("#memail");
        var $memailconfirm = $("#memailconfirm");
        var $memailconfirmTxt = $("#memailconfirmTxt");

        $.ajax({
            type: "POST",
            url: "signup/mailConfirm", // 수정된 경로
            data: {
                "email": $memail.val()
            },
            success: function(data) {
                alert("해당 이메일로 인증번호 발송이 완료되었습니다. \n 확인부탁드립니다.");
                console.log("data: " + data);
                chkEmailConfirm(data, $memailconfirm, $memailconfirmTxt);
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
            }
        });
    });
});

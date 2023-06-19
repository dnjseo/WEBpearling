window.addEventListener("load", function () {

    var checkModal = document.getElementById("check-modal"); // 항목을 모두 입력하지 않은 모달
    var checkYes = checkModal.querySelector('.check-yes');
    var signupConfirmModal = document.getElementById("signup-confirm-modal"); // 회원가입 완료 모달
    var signupConfirmYes = signupConfirmModal.querySelector('.signup-confirm-yes');

    // 폼 제출 시 유효성 검사 및 모달 표시
    document.querySelector("form").addEventListener("submit", function(event) {
        var inputs = this.querySelectorAll("input[type=text], input[type=password], input[type=date]");

        // 입력하지 않은 항목이 있는지 확인
        var emptyInputs = Array.from(inputs).filter(function(input) {
            return !input.value;
        });

        if (emptyInputs.length > 0) {
            event.preventDefault(); // 폼 제출 막기
            checkModal.style.display = "block"; // 모달 창 표시
        }else {
            signupConfirmModal.style.display = "block"; // 회원가입 완료 모달 표시
        }
    });

    // 항목을 모두 입력하지 않은 모달 확인
    checkYes.addEventListener("click", function() {
        checkModal.style.display = "none";
    });

    // 회원가입 완료 모달 확인
    signupConfirmYes.addEventListener("click", function() {
        signupConfirmModal.style.display = "none";
    });

    // 취소 버튼 클릭 시 로그인 화면으로 돌아가기
    var cancelButton = document.querySelector(".btns button[value=취소]");
    cancelButton.addEventListener("click", function (event) {
        event.preventDefault(); // 폼 제출 막기
        window.location.href = "/login"; // 로그인 페이지로 이동
    });

    // 비밀번호 확인 체크
    var pwdInput = document.getElementById("pwd");
    var pwdCheckInput = document.getElementById("pwd-check");
    var matchMessage = document.getElementById("pwd-match-message");

    pwdCheckInput.addEventListener("input", function() {
        var pwd = pwdInput.value;
        var pwdCheck = this.value;

        if (pwd === pwdCheck) {
            matchMessage.textContent = "비밀번호가 일치합니다.";
            matchMessage.style.color = "blue";
        } else {
            matchMessage.textContent = "비밀번호가 일치하지 않습니다.";
            matchMessage.style.color = "red";
        }
    });

    // 유효성 검사

    // 비밀번호 유효성 검사
    var pwdInput = document.getElementById("pwd");

    pwdInput.addEventListener("keyup", function(){
        var password = this.value;
        var errorMessage = document.getElementById("pwd-error");

        var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (regex.test(password)) {
            document.getElementById("pwd-error").textContent = ""; // 유효한 비밀번호 입력
        } else {
            errorMessage.textContent = "비밀번호는 영문, 숫자, 특수 기호를 포함하여 6자리 이상이어야 합니다.";
            errorMessage.style.color = "red";
        }
    });
});
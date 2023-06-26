window.addEventListener("load", function () {
    let form = document.querySelector('.member-add-form');
    let memberAddBtn = document.querySelector(".signup-btn");

    // 회원가입 취소
    let cancelButton = document.querySelector(".btns button[value=취소]");
    cancelButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "/login"; 
    });

    // 입력하지 않은 항목이 있다고 뜨는 오류
    function noInputModal() {
        checkModal.style.display = "block";
    }

    // 입력하지 않는 항목이 있다고 알려주는 모달
    let checkModal = document.getElementById("check-modal"); // 항목을 모두 입력하지 않은 모달
    let checkYes = checkModal.querySelector('.check-yes');
    checkYes.addEventListener('click', function() {
        checkModal.style.display = "none";
    });

    // 비밀번호 확인 체크
    let pwdInput = document.getElementById("pwd");
    let pwdCheckInput = document.getElementById("pwd-check");
    let matchMessage = document.getElementById("pwd-match-message");

    pwdCheckInput.addEventListener("input", function() {
        let pwd = pwdInput.value;
        let pwdCheck = this.value;

        if (pwd === pwdCheck) {
            matchMessage.textContent = "비밀번호가 일치합니다.";
            matchMessage.style.color = "blue";
        } else {
            matchMessage.textContent = "비밀번호가 일치하지 않습니다.";
            matchMessage.style.color = "red";
        }
    });

    // 비밀번호 유효성 검사
    let checkpwdInput = document.getElementById("pwd");

    checkpwdInput.addEventListener("keyup", function(){
        let password = this.value;
        let errorMessage = document.getElementById("pwd-error");

        let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (regex.test(password)) {
            document.getElementById("pwd-error").textContent = ""; // 유효한 비밀번호 입력
        } else {
            errorMessage.textContent = "비밀번호는 영문, 숫자, 특수 기호를 포함하여 6자리 이상이어야 합니다.";
            errorMessage.style.color = "red";
        }
    });

    // 닉네임 중복검사
    let checkNickname = document.getElementById("checkNickname"); // 중복검사 버튼

    let nicknameModal = document.getElementById("nickname-Modal"); // 중복된 닉네임
    let nicknameYes = nicknameModal.querySelector('.nickname-yes');

    let checkNicknameModal = document.getElementById("check-nickname-Modal"); // 사용 가능한 닉네임
    let checkNicknameYes = checkNicknameModal.querySelector('.check-nickname-yes');

    // 닉네임 중복검사
    checkNickname.addEventListener('click', function() {
        // 회원가입 post를 위한 요소들
        let formData = new FormData(form);

        let checkNicknameRequest = {
            checkNickname: formData.get('nickname'),
        };

        // 닉네임 중복 검사 요청 추가
        fetch('/api/member/check-nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkNicknameRequest),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.error('닉네임 중복 검사에 실패했습니다.');
            }
        })
        .then(function (data) {
            if (data) {
                nicknameModal.style.display = 'block';
            } else {
                checkNicknameModal.style.display = 'block';
            }
        })
        .catch(function (error) {
            console.error('닉네임 중복 검사 중 오류가 발생했습니다.', error);
        });
    });

    // 중복된 닉네임 확인 버튼 클릭 시
    nicknameYes.addEventListener('click', function() {
        nicknameModal.style.display = 'none';
    });

    // 사용 가능한 닉네임 확인 버튼 클릭 시
    checkNicknameYes.addEventListener('click', function() {
        checkNicknameModal.style.display = 'none';
    });

    // 회원가입 전송 post
    memberAddBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // 회원가입 post를 위한 요소들
        let formData = new FormData(form);

        let memberRequest = {
            email: formData.get('email'),
            domain: formData.get('domain'),
            pwd: formData.get('pwd'),
            name: formData.get('name'),
            nickname: formData.get('nickname'),
            birth: formData.get('birth'),
        };

        // 회원가입 완료
        let signupConfirmModal = document.getElementById("signup-confirm-modal"); // 회원가입 완료 모달
        let signupConfirmYes = signupConfirmModal.querySelector('.signup-confirm-yes');

        // 회원가입 완료 함수
        function openModal() {
            signupConfirmModal.style.display = "block";
        }

        // 모달 창 닫기 클릭
        signupConfirmYes.addEventListener("click", function(e) {
            e.preventDefault();
            form.submit();
            signupConfirmModal.style.display = "none";
            window.location.href = "/login";
        });

        fetch('/api/member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberRequest),
        })
        .then(function(response) {
            if (response.ok) {
                openModal();
            } else {
                noInputModal();
            }
        })
        .catch(function(error) {
            console.error('멤버 등록 중 오류가 발생했습니다.', error);
        });
    });
});

// 이메일 전송 함수
function chkEmailConfirm(data, memailconfirm) {
    let emconfirmchk = document.querySelector(".emconfirmchk");
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
    let checkEmailBtn = document.getElementById("checkEmail");
    // 이메일 중복검사
    let emailModal = document.getElementById("email-modal"); // 중복된 이메일
    let emailYes = emailModal.querySelector('.email-yes');

    let sendModal = document.getElementById("send-modal");
    let sendYes = sendModal.querySelector(".send-yes");

    sendYes.addEventListener("click", function() {
        sendModal.style.display = "none";
    });

    emailYes.addEventListener("click", function() {
        emailModal.style.display = "none";
    });

    checkEmailBtn.addEventListener("click", function() {

        let memail = document.getElementById("memail");
        let memailconfirm = document.getElementById("memailconfirm");
        let memailconfirmTxt = document.getElementById("memailconfirmTxt");

        let fullEmail = memail.value + "@" + document.getElementById("memail-domain").value;

        let checkEmailRequest = {
            checkEmail: fullEmail,
        };

        // 닉네임 중복 검사 요청 추가
        fetch('/api/member/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkEmailRequest),
        })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                console.error('이메일 중복 검사에 실패했습니다.');
            }
        })
        .then(function (data) {
            if (data) {
                emailModal.style.display = 'block';
            } else {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "/signup/mailConfirm", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        showModal("send-modal");
                        let data = xhr.responseText;
                        console.log("data: " + data);
                        chkEmailConfirm(data, memailconfirm, memailconfirmTxt);
                    } else if (xhr.status !== 200) {
                        console.log("Error: " + xhr.status);
                    }
                };
                xhr.send("email=" + fullEmail);
            }
        })
        .catch(function (error) {
            console.error('이메일 중복 검사 중 오류가 발생했습니다.', error);
        });

    });
});
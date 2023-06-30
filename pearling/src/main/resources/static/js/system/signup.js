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

    // 닉네임 중복검사
    let checkNickname = document.getElementById("checkNickname"); // 중복검사 버튼

    let nicknameModal = document.getElementById("nickname-Modal"); // 중복된 닉네임
    let nicknameYes = nicknameModal.querySelector('.nickname-yes');

    let checkNicknameModal = document.getElementById("check-nickname-Modal"); // 사용 가능한 닉네임
    let checkNicknameYes = checkNicknameModal.querySelector('.check-nickname-yes');

    // 닉네임 중복검사
    checkNickname.addEventListener('click', function () {
        let nickname = document.getElementById("nickname").value;

        // 닉네임 중복 검사 요청 추가
        fetch('/api/member/check-nickname?nickname=' + encodeURIComponent(nickname), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
    nicknameYes.addEventListener('click', function () {
        nicknameModal.style.display = 'none';
    });

    // 사용 가능한 닉네임 확인 버튼 클릭 시
    checkNicknameYes.addEventListener('click', function () {
        checkNicknameModal.style.display = 'none';
    });


    // 회원가입 전송 post
    memberAddBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // 회원가입 post를 위한 요소들
        let inputs = form.elements;
        let email = inputs["email"].value;
        let domain = inputs["domain"].value;
        let fullEmail = email + "@" + domain;
        let pwd = inputs["pwd"].value;
        let name = inputs["name"].value;
        let nickname = inputs["nickname"].value;
        let birth = inputs["birth"].value;

        let formData = { email: fullEmail, pwd, name, nickname, birth };
        let jsonData = JSON.stringify(formData);

        // 비밀번호 유효성 검사
        let pwdInput = document.getElementById("pwd");
        let errorMessage = document.getElementById("pwd-error");

        let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!regex.test(pwd)) {
            errorMessage.textContent = "비밀번호는 영문, 숫자, 특수 기호를 포함하여 6자리 이상이어야 합니다.";
            errorMessage.style.color = "red";
            return; // 비밀번호 유효성 검사에 실패하면 함수 종료
        }

        // 회원가입 완료
        let signupConfirmModal = document.getElementById("signup-confirm-modal"); // 회원가입 완료 모달
        let signupConfirmYes = signupConfirmModal.querySelector('.signup-confirm-yes');

        // 회원가입 완료 함수
        function openModal() {
            signupConfirmModal.style.display = "block";
        }

        // 모달 창 닫기 클릭
        signupConfirmYes.addEventListener("click", function (e) {
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
            body: jsonData,
        })
            .then(function (response) {
                if (response.ok) {
                    openModal();
                } else {
                    noInputModal();
                }
            })
            .catch(function (error) {
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
        fetch('/api/member/check-email?email=' + encodeURIComponent(fullEmail), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
                let mailConfirmRequest = new URLSearchParams();
                mailConfirmRequest.append('email', fullEmail);
        
                fetch('/signup/mailConfirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: mailConfirmRequest
                })
                .then(function (response) {
                    if (response.ok) {
                        showModal("send-modal");
                        return response.text();
                    } else {
                        console.error('이메일 확인 요청에 실패했습니다.');
                    }
                })
                .then(function (data) {
                    console.log("data: " + data);
                    chkEmailConfirm(data, memailconfirm, memailconfirmTxt);
                })
                .catch(function (error) {
                    console.error('이메일 확인 요청 중 오류가 발생했습니다.', error);
                });
            }
        })
        .catch(function (error) {
            console.error('이메일 중복 검사 중 오류가 발생했습니다.', error);
        }); 
    });
});
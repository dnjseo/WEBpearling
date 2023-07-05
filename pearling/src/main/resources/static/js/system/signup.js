// 모달 보여주는 함수
function showModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// 모달 확인 버튼 누르면 모달 사라지는 함수
function noneModal(modalId, buttonClass) {
    let modal = document.getElementById(modalId);
    let button = document.querySelector(buttonClass);

    button.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

function noneModalFocus(modalId, buttonClass, focusFunction) {
    let modal = document.getElementById(modalId);
    let button = document.querySelector(buttonClass);

    button.addEventListener("click", function() {
        modal.style.display = "none";
        if (typeof focusFunction === "function") {
            focusFunction(); // focus 함수 호출
        }
    });
}

// 입력하지 않은 값에 포커스를 줌
function focusOnEmptyFields() {
    let inputs = document.querySelectorAll('.member-add-form input');
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (input.value === '') {
        input.focus();
        break;
      }
    }
}

// 이메일 중복 검사
async function checkEmailDuplicate(email) {
    try {
        let emailResponse = await fetch(
        "/api/member/check-email?email=" + encodeURIComponent(email),
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );

        if (!emailResponse.ok) {
            throw new Error("이메일 중복 검사에 실패했습니다.");
        }

        let emailData = await emailResponse.json();

        if (emailData.isDuplicate) {
            // 중복된 이메일이 있을 경우 해당 input에 포커스를 줌
            let emailInput = document.getElementById("email");
            emailInput.focus();
        }

        return emailData;
    } catch (error) {
        console.error("이메일 중복 검사 중 오류가 발생했습니다.", error);
        return false;
    }
}

// 닉네임 중복 검사
async function checkNicknameDuplicate(nickname) {
    try {
        let nicknameResponse = await fetch(
        "/api/member/check-nickname?nickname=" + encodeURIComponent(nickname),
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        }
        );

        if (!nicknameResponse.ok) {
            throw new Error("닉네임 중복 검사에 실패했습니다.");
        }

        let nicknameData = await nicknameResponse.json();

        if (nicknameData.isDuplicate) {
            // 중복된 닉네임이 있을 경우 해당 input에 포커스를 줌
            let nicknameInput = document.getElementById("nickname");
            nicknameInput.focus();
        }

        return nicknameData;
    } catch (error) {
        console.error("닉네임 중복 검사 중 오류가 발생했습니다.", error);
        return false;
    }
}

// 이메일 인증번호 확인
async function verifyEmailConfirmation(sentCode, inputCode) {
    if (sentCode !== inputCode) {
        showModal("send-nocorrect-Modal");
        noneModal("send-nocorrect-Modal", ".send-nocorrect-yes");
        return false;
    }
    return true;
}


window.addEventListener("load", function () {
    let form = document.querySelector('.member-add-form');
    let memberAddBtn = document.querySelector(".signup-btn");

    // 회원가입 취소
    let cancelButton = document.querySelector(".btns button[value=취소]");
    cancelButton.addEventListener("click", function (event) {
        event.preventDefault();
        window.location.href = "/login"; 
    });

    // 비밀번호 확인 체크
    let pwdInput = document.getElementById("pwd");
    let pwdCheckInput = document.getElementById("pwd-check");
    let matchMessage = document.getElementById("pwd-match-message");

    pwdInput.addEventListener("input", function() {
        let pwd = this.value;
        let pwdCheck = pwdCheckInput.value;
    
        if (pwd === pwdCheck) {
            matchMessage.style.display = "block";
            matchMessage.textContent = "비밀번호가 일치합니다.";
            matchMessage.style.color = "blue";
        } else {
            matchMessage.style.display = "block";
            matchMessage.textContent = "비밀번호가 일치하지 않습니다.";
            matchMessage.style.color = "red";
        }
    });
    
    pwdCheckInput.addEventListener("input", function() {
        let pwd = pwdInput.value;
        let pwdCheck = this.value;
    
        if (pwd === pwdCheck) {
            matchMessage.style.display = "block";
            matchMessage.textContent = "비밀번호가 일치합니다.";
            matchMessage.style.color = "blue";
        } else {
            matchMessage.style.display = "block";
            matchMessage.textContent = "비밀번호가 일치하지 않습니다.";
            matchMessage.style.color = "red";
        }
    });
    

    let checkNickname = document.getElementById("checkNickname"); // 중복검사 버튼

    // 닉네임 중복검사
    checkNickname.addEventListener('click', async function () { 
        let nickname = document.getElementById("nickname").value;
        let nicknameData = await checkNicknameDuplicate(nickname);

        if (nicknameData) {
            showModal("nickname-Modal");
            return; // 닉네임 중복이면 함수 종료
        }

        showModal("check-nickname-Modal");
    });

    noneModal("nickname-Modal", ".nickname-yes"); // 중복된 닉네임 모달
    noneModal("check-nickname-Modal", ".check-nickname-yes"); // 사용가능한 닉네임 모달

   // 비밀번호 유효성 검사 결과 표시 함수
    function displayPasswordErrorMessage(message) {
        let errorMessage = document.getElementById("pwd-error");
        errorMessage.style.display = "block";
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }

    // 비밀번호 유효성 검사 함수
    function validatePassword(pwd) {
        let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(pwd);
    }

    // 비밀번호 유효성 검사 이벤트 핸들러
    pwdInput.addEventListener("input", function () {
        let pwd = pwdInput.value;
        let errorMessage = document.getElementById("pwd-error");

        if (validatePassword(pwd)) {
            errorMessage.style.display = "block";
            errorMessage.textContent = ""; // 유효성 검사에 성공하면 에러 메시지를 지움
        } else {
            displayPasswordErrorMessage("비밀번호는 영문, 숫자, 특수 기호를 포함하여 6자리 이상이어야 합니다.");
        }
    });

    // 회원가입 전송 버튼 클릭 이벤트 리스너
    memberAddBtn.addEventListener('click', async function (e) {
        e.preventDefault();
    
        // 회원가입 post를 위한 요소들
        let inputs = form.elements;
        let email = inputs["email"].value;
        let domain = inputs["domain"].value;
        let fullEmail = email + "@" + domain;
        let pwd = inputs["pwd"].value;
        let pwdCheck = inputs["pwd-check"].value;
        let name = inputs["name"].value;
        let nickname = inputs["nickname"].value;
        let birth = inputs["birth"].value;
    
        let formData = { email: fullEmail, pwd, name, nickname, birth };
        let jsonData = JSON.stringify(formData);

        // 입력하지 않은 값
        if (email === "" || domain === "" || pwd === "" || pwdCheck === "" || name === "" || nickname === "" || birth === "") {
            showModal("no-input-Modal");
            noneModalFocus("no-input-Modal",".no-input-yes", focusOnEmptyFields);
            return; 
        }

        // 이메일 인증번호 확인
        let emailConfirmation = inputs["email-confirmation"].value;
        let isEmailConfirmed = await verifyEmailConfirmation(sentCode, emailConfirmation);

        if (!isEmailConfirmed) {
            return;
        }
        
        // 비밀번호 유효성 검사
        if (!validatePassword(pwd)) {
            showModal("check-pwd-Modal");
        }

        // 비밀번호 같은지 다른지
        if (pwd != pwdCheck) {
            showModal("no-pwd-Modal");
            noneModal("no-pwd-Modal", ".no-pwd-yes"); // 비밀번호 다시 확인하는 함수
            return;
        } 

        try {
        // 이메일 중복 검사
        let isEmailDuplicate = await checkEmailDuplicate(fullEmail);
    
        if (isEmailDuplicate) {
            showModal("email-modal");
            return; // 이메일 중복이면 함수 종료
        }
    
        // 닉네임 중복 검사
        let isNicknameDuplicate = await checkNicknameDuplicate(nickname);
    
        if (isNicknameDuplicate) {
            showModal("nickname-Modal");
            return; // 닉네임 중복이면 함수 종료
        }
    
        // 회원가입 완료
        let signupConfirmModal = document.getElementById("signup-confirm-modal"); // 회원가입 완료 모달
        let signupConfirmYes = signupConfirmModal.querySelector('.signup-confirm-yes');
    
        signupConfirmYes.addEventListener("click", function (e) {
            e.preventDefault();
            form.submit();
            signupConfirmModal.style.display = "none";
            window.location.href = "/login";
        });
    
        let signupResponse = await fetch('/api/member', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: jsonData,
        });
    
        if (signupResponse.ok) {
            showModal("signup-confirm-modal");
        } else {
            throw new Error('멤버 등록 중 오류가 발생했습니다.');
        }
        } catch (error) {
        console.error('오류가 발생했습니다:', error);
        }
    });  
});

// 이메일 전송 함수
function chkEmailConfirm(data, memailconfirm) {
    let emconfirmchk = document.querySelector(".emconfirmchk");
    memailconfirm.addEventListener("keyup", function() {
        if (data !== memailconfirm.value) {
            emconfirmchk.style.display = "block";
            emconfirmchk.textContent = "인증번호가 잘못되었습니다";
            emconfirmchk.style.color = "#FA3E3E";
            emconfirmchk.style.fontWeight = "bold";
            emconfirmchk.style.fontSize = "10px";
        } else {
            emconfirmchk.style.display = "block";
            emconfirmchk.textContent = "인증번호 확인 완료";
            emconfirmchk.style.color = "#0D6EFD";
            emconfirmchk.style.fontWeight = "bold";
            emconfirmchk.style.fontSize = "10px";
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    let checkEmailBtn = document.getElementById("checkEmail");

    noneModal("send-modal",".send-yes"); // 인증번호 전송 모달
    noneModal("email-modal",".email-yes"); // 중복된 이메일 모달

    checkEmailBtn.addEventListener("click", async function() {
        let memail = document.getElementById("memail");
        let memailconfirm = document.getElementById("memailconfirm");
        let memailconfirmTxt = document.getElementById("memailconfirmTxt");
        
        let fullEmail = memail.value + "@" + document.getElementById("memail-domain").value;
        
        try {
            let isDuplicate = await checkEmailDuplicate(fullEmail);
        
            if (isDuplicate) {
            showModal("email-modal");
            return; // 이메일 중복이면 함수 종료
            }
        
            let mailConfirmRequest = new URLSearchParams();
            mailConfirmRequest.append('email', fullEmail);
        
            let confirmResponse = await fetch('/signup/mailConfirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: mailConfirmRequest
            });
        
            if (!confirmResponse.ok) {
            throw new Error('이메일 확인 요청에 실패했습니다.');
            }
        
            showModal("send-modal");
            let data = await confirmResponse.text();
            console.log("data: " + data);
            sentCode = data; // 보낸 인증번호 저장
            chkEmailConfirm(data, memailconfirm, memailconfirmTxt);
        } catch (error) {
            console.error('이메일 검사 또는 확인 요청 중 오류가 발생했습니다.', error);
        }
        });
});
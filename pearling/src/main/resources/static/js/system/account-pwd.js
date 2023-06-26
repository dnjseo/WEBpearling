window.addEventListener('load', function (e) {
  let form = document.querySelector('.pwd-form');
  let addBtn = document.querySelector(".add-btn");

  addBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // 비밀번호 변경 완료 모달
    let pwdConfirmModal = document.getElementById("pwd-confirm-modal"); // 회원가입 완료 모달
    let pwdConfirmYes = pwdConfirmModal.querySelector('.pwd-yes');

    function openModal() {
      pwdConfirmModal.style.display = "block";
    }

    pwdConfirmYes.addEventListener("click", function(e) {
        e.preventDefault();
        form.submit();
        pwdConfirmModal.style.display = "none";
        window.location.href = "/shell/ourshell";
    });

    // 현재 비밀번호 일치 않은 함수
    let currentPwdConfirmModal = document.getElementById("currentPwd-confirm-modal"); // 회원가입 완료 모달
    let currnetPwdYes = currentPwdConfirmModal.querySelector('.currentPwd-yes');

    function noCorrectModal() {
      currentPwdConfirmModal.style.display = "block";
    }

    currnetPwdYes.addEventListener("click", function(e) {
        currentPwdConfirmModal.style.display = "none";
    });

    // 비밀번호와 비밀번호 확인이 일치하지 않은 함수
    let noPwdConfirmModal = document.getElementById("nopwd-confirm-modal"); // 회원가입 완료 모달
    let noPwdYes = noPwdConfirmModal.querySelector('.nopwd-yes');

    function pwdCorrectModal() {
      noPwdConfirmModal.style.display = "block";
    }

    noPwdYes.addEventListener("click", function(e) {
      noPwdConfirmModal.style.display = "none";
    });

    let currentPwdInput = document.getElementById('currentPwd');
    let newPwdInput = document.getElementById('newPwd');
    let confirmPwdInput = document.getElementById('confirmPwd');

    let currentPwd = currentPwdInput.value;
    let newPwd = newPwdInput.value;
    let confirmPwd = confirmPwdInput.value;

    if (currentPwd === "") {
      alert("현재 비밀번호를 입력해주세요.");
      currentPwdInput.focus();
      return;
    }

    if (newPwd === "") {
      alert("변경할 비밀번호를 입력해주세요.");
      newPwdInput.focus();
      return;
    }

    if (confirmPwd === "") {
      alert("변경할 비밀번호 확인을 입력해주세요.");
      confirmPwdInput.focus();
      return;
    }

    if (newPwd !== confirmPwd) {
      pwdCorrectModal();
      newPwdInput.value = "";
      confirmPwdInput.value = "";
      newPwdInput.focus();
      return;
    }
    
    if (currentPwd === newPwd) {
      alert("현재 비밀번호와 변경할 비밀번호가 동일합니다.");
      newPwdInput.value = "";
      confirmPwdInput.value = "";
      newPwdInput.focus();
      return;
    }

    let changePasswordRequest = {
      currentPassword: currentPwd,
      newPassword: newPwd,
      confirmNewPassword: confirmPwd
    };

    fetch('/api/member/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changePasswordRequest),
    })
      .then(function (response) {
        if (response.ok) {
          openModal();
        } else {
          noCorrectModal();
        }
      })
      .catch(function (error) {
        console.error('비밀번호 변경 시 오류가 발생했습니다.', error);
      });
  });
});
// 모달 보여주는 함수
function showModal(modalId) {
  let modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// 모달 확인 버튼 누르면 모달 사라지는 함수
function noneModal(modalId, buttonClass) {
  let modal = document.getElementById(modalId);
  let button = document.querySelector(buttonClass);

  button.addEventListener("click", function () {
    modal.style.display = "none";
  });
}

window.addEventListener("load", function (e) {
  let form = document.querySelector(".pwd-form");
  let addBtn = document.querySelector(".add-btn");

  addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // 비밀번호 변경 완료 모달
    let pwdConfirmModal = document.getElementById("pwd-confirm-modal");
    let pwdConfirmYes = pwdConfirmModal.querySelector(".pwd-yes");

    pwdConfirmYes.addEventListener("click", function (e) {
      e.preventDefault();
      form.submit();
      pwdConfirmModal.style.display = "none";
      window.location.href = "/shell/ourshell";
    });

    let currentPwdInput = document.getElementById("currentPwd");
    let newPwdInput = document.getElementById("newPwd");
    let confirmPwdInput = document.getElementById("confirmPwd");

    let currentPwd = currentPwdInput.value;
    let newPwd = newPwdInput.value;
    let confirmPwd = confirmPwdInput.value;

    // 현재 비밀번호를 입력하지 않음
    if (currentPwd === "") {
      showModal("current-pwd-modal");
      noneModal("current-pwd-modal", ".currnet-yes");
      currentPwdInput.focus();
      return;
    }

    // 변경할 비밀번호를 입력하지 않음
    if (newPwd === "") {
      showModal("input-pwd-modal");
      noneModal("input-pwd-modal", ".input-yes");
      newPwdInput.focus();
      return;
    }

    // 변경할 비밀번호 확인 입력하지 않음
    if (confirmPwd === "") {
      showModal("onemore-confirm-modal");
      noneModal("onemore-confirm-modal", ".onemore-yes");
      confirmPwdInput.focus();
      return;
    }

    // 입력한 비밀번호와 확인 비밀번호가 일치하지 않음
    if (newPwd !== confirmPwd) {
      showModal("nopwd-confirm-modal");
      noneModal("nopwd-confirm-modal", ".nopwd-yes");
      newPwdInput.value = "";
      confirmPwdInput.value = "";
      newPwdInput.focus();
      return;
    }

    // 현재 비밀번호와 변경할 비밀번호가 동일함
    if (currentPwd === newPwd) {
      showModal("same-pwd-modal");
      noneModal("same-pwd-modal", ".same-yes");
      newPwdInput.value = "";
      currentPwdInput.value = "";
      newPwdInput.focus();
      return;
    }

    let formData = new FormData();
    formData.append("currentPassword", currentPwd);
    formData.append("newPassword", newPwd);
    formData.append("confirmNewPassword", confirmPwd);

    fetch("/api/member/change-password", {
      method: "PUT",
      body: formData,
    })
      .then(function (response) {
        if (response.ok) {
          showModal("pwd-confirm-modal");
          noneModal("nopwd-confirm-modal", ".nopwd-yes");
        } else {
          showModal("currentPwd-confirm-modal");
          noneModal("currentPwd-confirm-modal", ".currentPwd-yes");
        }
      })
      .catch(function (error) {
        console.error("비밀번호 변경 시 오류가 발생했습니다.", error);
      });
  });
});
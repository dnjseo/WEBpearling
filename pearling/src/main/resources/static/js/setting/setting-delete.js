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
    window.location.href = "/login";
  });
}

window.addEventListener("load", function () {
  let noButton = document.querySelector(".select-btn button:last-child");
  noButton.addEventListener("click", function (event) {
    history.back();
  });

  let yesButton = document.querySelector(".select-btn button:first-child");
  yesButton.addEventListener("click", function (event) {
    deleteAccount();
  });

  function deleteAccount() {
    // Perform a fetch request to delete the account
    fetch("/api/member/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (response.ok) {
          showModal("delete-modal");
          noneModal("delete-modal", ".delete-yes");
        } else {
          alert("계정 삭제 중에 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        alert("계정 삭제 중에 오류가 발생했습니다.");
      });
  }
});
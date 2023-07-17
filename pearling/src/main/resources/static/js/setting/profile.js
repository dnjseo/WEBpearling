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

    if (!nicknameResponse.ok)
      throw new Error("닉네임 중복 검사에 실패했습니다.");

    let nicknameData = await nicknameResponse.json();

    // 중복된 닉네임이 있을 경우 해당 input에 포커스를 줌
    if (nicknameData.isDuplicate) {
      let nicknameInput = document.getElementById("nickname");
      nicknameInput.focus();
    }

    return nicknameData;
  } catch (error) {
    console.error("닉네임 중복 검사 중 오류가 발생했습니다.", error);
    return false;
  }
}

window.addEventListener("load", function () {
  let modify = document.querySelector(".modify"); // 수정 버튼
  let cancelButton = document.querySelector(".cancel"); // 취소 버튼

  let modifyModal = document.getElementById("modify-modal");
  let modifyYes = document.querySelector(".modify-yes");

  // 취소 버튼
  cancelButton.addEventListener("click", function (event) {
    event.preventDefault(); // 폼 제출 막기
    window.location.href = "shell/ourshell";
  });

  // 수정하기 버튼 클릭 시
  modify.addEventListener("click", async function (event) {
    event.preventDefault(); // 폼 제출 막기

    let nicknameInput = document.getElementById("nickname");
    let nickname = nicknameInput.value.trim(); // 입력된 닉네임

    // 기존 닉네임을 수정하지 않은 경우
    if (nickname === nicknameInput.defaultValue) {
      modifyModal.style.display = "block"; // 수정 완료 창 표시
      return;
    }

    // 닉네임이 공백인 경우 중복 검사를 수행하지 않고 바로 수정 완료 창을 표시
    if (nickname === "") {
      modifyModal.style.display = "block"; // 수정 완료 창 표시
      return;
    }

    let nicknameData = await checkNicknameDuplicate(nickname);

    if (nicknameData) {
      alert("중복된 닉네임이 있습니다.");
      return;
    }
    modifyModal.style.display = "block"; // 수정 완료 창 표시
  });

  // 수정 완료 창 확인 버튼 클릭 시
  modifyYes.addEventListener("click", function (event) {
    modifyModal.style.display = "none";
  });

  // 파일 선택 시 이미지 미리보기
  document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          document
            .querySelector(".profile_img")
            .setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    });

  // 닉네임 중복검사
  checkNickname.addEventListener("click", async function () {
    let nickname = document.getElementById("nickname").value;
    let nicknameData = await checkNicknameDuplicate(nickname);

    if (nicknameData) {
      alert("중복된 닉네임이 있습니다.");
      return; // 닉네임 중복이면 함수 종료
    }
    alert("사용 가능한 닉네임입니다.");
  });
});
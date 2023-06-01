window.addEventListener("load", function () {
    let section = document.getElementById("d1");
    let signupBtn = section.querySelector(".signup-btn");

    let confirmModal = document.getElementById("signup-confirm-modal");
    let confirmYes = confirmModal.querySelector(".confirm-yes");

    signupBtn.addEventListener("click", function () {
        confirmModal.style.display = "block";
    });

    confirmYes.addEventListener("click", function () {
        // 등록 처리
        confirmModal.style.display = "none"; // 모달창 닫기
    });
});
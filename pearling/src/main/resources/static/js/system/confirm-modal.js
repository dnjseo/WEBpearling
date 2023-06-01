window.addEventListener("load", function () {
    let section = document.getElementById("d1");
    let addBtn = section.querySelector(".add-btn");

    let confirmModal = document.getElementById("confirm-modal");
    let confirmYes = confirmModal.querySelector(".confirm-yes");

    addBtn.addEventListener("click", function () {
        confirmModal.style.display = "block";
    });

    confirmYes.addEventListener("click", function () {
        // 등록 처리
        confirmModal.style.display = "none"; // 모달창 닫기
    });
});
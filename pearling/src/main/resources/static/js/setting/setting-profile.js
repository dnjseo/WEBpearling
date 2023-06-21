window.addEventListener("load", function () {
    var modify = document.querySelector('.modify'); // 수정 버튼
    var cancelButton = document.querySelector('.cancel'); // 취소 버튼
    var editButton = document.querySelector('.edit'); // 편집 버튼

    var modifyModal = document.getElementById("modify-modal");
    var modifyYes = document.querySelector('.modify-yes');

    // 취소 버튼
    cancelButton.addEventListener("click", function (event) {
        event.preventDefault(); // 폼 제출 막기
        window.location.href = "shell/ourshell";
    });

    // 수정하기 버튼 클릭 시
    // modify.addEventListener("click", function (event) {
    //     event.preventDefault(); // 폼 제출 막기
    //     modifyModal.style.display = "block"; // 수정 완료 창 표시
    // });

    // 수정 완료 창 확인 버튼 클릭 시
    // modifyYes.addEventListener("click", function (event) {
    //     console.log("보내진다 ㅎㅎ");
    //     modifyModal.style.display = "none";
    // });

});
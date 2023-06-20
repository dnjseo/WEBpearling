window.addEventListener("load", function () {
    var modify = document.querySelector('.modify'); // 수정버튼
    var cancelButton = document.querySelector('.cancel'); // 취소버튼

    var modifyModal = document.getElementById("modify-modal");
    var modifyYes = document.querySelector('.modify-yes');

    // 취소 버튼
    cancelButton.addEventListener("click", function () {
        event.preventDefault(); // 폼 제출 막기
        history.back(); // 이전 페이지로 이동
    });

    // 수정하기
    modify.addEventListener("click", function () {
        modifyModal.style.display = "block";
    });

    // 모달창 확인 누르면 모달 없어짐
    modifyYes.addEventListener("click", function () {
        modifyModal.style.display = "none";
    });

});
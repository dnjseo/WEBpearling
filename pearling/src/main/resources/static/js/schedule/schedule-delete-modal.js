window.addEventListener("load", function () {
    let wrap = document.getElementById("wrap")
    // let btns = wrap.querySelector(".schedule-btns");
    let delBtn = wrap.querySelector(".del-btn");

    let deleteModal = document.getElementById("delete-modal");
    let confirmYes = deleteModal.querySelector(".del-confirm-yes");
    let confirmNo = deleteModal.querySelector(".del-confirm-no");

    delBtn.addEventListener("click", function () {
        deleteModal.style.display = "block";
    });

    confirmNo.addEventListener("click", function () {
        deleteModal.style.display = "none"; // 모달창 닫기  
    });


    confirmYes.addEventListener("click", function () {
        // 등록 처리

        console.log('삭제버튼')
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        fetch(`/api/schedules/${id}`,{
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
              // 성공적으로 요청이 처리된 경우의 동작
              console.log('스케쥴 삭제 성공~!');
                         // 리다이렉트
              window.location.href = "http://localhost:8080/shell/myshell";

            } else {
              // 요청이 실패한 경우의 동작
              console.error('스케쥴 삭제 실패');
            }
          })
          .catch(error => {
            // 네트워크 오류 등 예외 처리
            console.error('폼 제출 오류:', error);
          });    
          
    });
});
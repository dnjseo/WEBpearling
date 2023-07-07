window.addEventListener('DOMContentLoaded', function(e) {
  let clamList = document.getElementById("clam-list");
  let black = document.querySelector(".black");

  // URL에서 userId 값을 가져오기
  let userId = document.querySelector("#input-user-id").value; // userId 추가
  let loginId = document.querySelector("#input-member-id").value;

  // 이미지 URL 배열 생성
  let imageUrls = [
    "/images/guestbook/clam1.png",
    "/images/guestbook/clam2.png",
    "/images/guestbook/clam3.png"
  ];

  let listItems = clamList.getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {

    let randomIndex = Math.floor(Math.random() * imageUrls.length);
    let imageUrl = imageUrls[randomIndex];
    let listItem = listItems[i];
    let clamImage = listItem.getElementsByTagName("img")[0];

    let sectionId = "b" + listItem.getAttribute("data-index");
    let section = document.getElementById(sectionId);

    let closeBtn = section.querySelector(".guestbook-close"); // 닫기 버튼

    // let deleteButton = section.querySelector(".delete-button"); // 삭제버튼
    let deleteModal = document.getElementById("delete-modal");
    let deleteYes = deleteModal.querySelector(".delete-yes");

    // 내버전
    // let deleteButton = section.querySelector(".delete-button");

    // 친구버전
    let deleteBtn = section.querySelector(".deleteBtn"); // 삭제버튼
    let updateBtn = section.querySelector(".updateBtn"); // 수정버튼

    let plusBtn = document.querySelector(".plus"); // 추가하기 버튼

    clamImage.src = imageUrl;
    clamImage.addEventListener("click", function() {
      section.style.display = "block";
      black.style.display = "block";

      let fromId = section.querySelector("#from-id").textContent;

      if(loginId == userId || userId == "" || loginId == fromId){
        deleteBtn.style.display = "block";
      }else if(loginId != fromId){
        deleteBtn.style.display = "none";
      }

      if(fromId == loginId)
        updateBtn.style.display = "block";
    });

    if(userId != "" && userId != loginId)
      plusBtn.style.display = "block";
    else{
      plusBtn.style.display = "none";
    }

    closeBtn.addEventListener("click", function() {
      section.style.display = "none";
      black.style.display = "none";
    });

    deleteBtn.addEventListener("click", function() {
      deleteModal.style.display = "block";
      section.style.display = "none";
      deleteYes.setAttribute("data-id", section.getAttribute("data-id"));
    });

    deleteYes.addEventListener("click", function() {
      let guestbookId = deleteYes.getAttribute("data-id");
      deleteGuestbook(guestbookId);
    });
  }

  // 방명록 삭제 요청을 서버로 보내는 함수
  function deleteGuestbook(guestbookId) {
    fetch("/api/guestbook/delete/" + guestbookId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("방명록 삭제에 성공했습니다");
          location.reload(); // 페이지 새로고침
        } else {
          console.error("방명록 삭제에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("방명록 삭제 요청 중 오류가 발생했습니다.", error);
      });
  }
});
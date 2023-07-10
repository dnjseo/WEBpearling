// 모달 보여주는 함수
function showModal(modalId) {
  let modal = document.getElementById(modalId);
  modal.style.display = "block";
}

// 모달 확인 버튼 누르면 모달 사라지는 함수
function noneModal(modalId, buttonClass) {
  let modal = document.getElementById(modalId);
  let button = document.querySelector(buttonClass);

  button.addEventListener("click", function() {
      modal.style.display = "none";
  });
}

window.addEventListener('DOMContentLoaded', function(e) {
  let clamList = document.getElementById("clam-list");
  let black = document.querySelector(".black");
  let paginationLinks = document.querySelectorAll(".pagination a");

  // URL에서 userId 값을 가져오기
  let userId = document.querySelector("#input-user-id").value; // userId 추가
  let loginId = document.querySelector("#input-member-id").value;
  let currentPage = parseInt(document.querySelector("#current-page").value); // 현재 페이지 추가

  // 이미지 URL 배열 생성
  let imageUrls = [
    "/images/guestbook/clam1.png",
    "/images/guestbook/clam2.png",
    "/images/guestbook/clam3.png"
  ];

  let listItems = clamList.getElementsByTagName("li");

  // 페이징 단위 계산
  let pageSize = 20; // 페이지당 이미지 개수
  let totalItems = listItems.length; // 전체 이미지 개수
  let totalPages = Math.ceil(totalItems / pageSize); // 전체 페이지 수

  let maxPageLinks = 5; // 한 번에 표시할 페이지 링크 수
  let halfMaxPageLinks = Math.floor(maxPageLinks / 2);
  let startPage = Math.max(currentPage - halfMaxPageLinks, 1);
  let endPage = Math.min(startPage + maxPageLinks - 1, totalPages);
  startPage = Math.max(endPage - maxPageLinks + 1, 1);

  // 페이징 링크 생성
  let pagingContainer = document.querySelector(".my-paging");
  pagingContainer.innerHTML = ""; // 기존의 페이징 링크 제거

  if (totalPages > 1) {
    // 이전 페이지로 이동
    if (currentPage > 0) {
      let previousPageLink = document.createElement("li");
      let previousPageBtn = document.createElement("a");
      previousPageBtn.href = "#";
      previousPageBtn.id = "previous-page";
      previousPageBtn.innerHTML = "&lt;&lt;";
      previousPageLink.appendChild(previousPageBtn);
      pagingContainer.appendChild(previousPageLink);
    }

    // 페이지 링크 생성
    for (let page = startPage; page <= endPage; page++) {
      let pageLink = document.createElement("li");
      let pageBtn = document.createElement("a");
      pageBtn.href = `/guestbook/list?uid=${userId}&page=${page}`;
      pageBtn.innerHTML = page;
      if (currentPage === page) {
        pageBtn.classList.add("active");
      }
      pageLink.appendChild(pageBtn);
      pagingContainer.appendChild(pageLink);
    }

    // 다음 페이지로 이동
    if (currentPage < totalPages) {
      let nextPageLink = document.createElement("li");
      let nextPageBtn = document.createElement("a");
      nextPageBtn.href = "#";
      nextPageBtn.id = "next-page";
      nextPageBtn.innerHTML = "&gt;&gt;";
      nextPageLink.appendChild(nextPageBtn);
      pagingContainer.appendChild(nextPageLink);
    }
  }
  

  // 현재 페이지 번호가 유효한 범위를 벗어나는 경우 첫 페이지로 설정
  if (currentPage < 1 || currentPage > totalPages) {
    currentPage = 1;
  }

  // 페이지에 따라 보여줄 이미지 범위 계산
  let startIdx = (currentPage - 1) * pageSize;
  let endIdx = Math.min(startIdx + pageSize, totalItems);

  // 이미지 출력 및 이벤트 처리
  for (let i = 0; i < listItems.length; i++) {
    let listItem = listItems[i];
    if (i >= startIdx && i < endIdx) {
      let randomIndex = Math.floor(Math.random() * imageUrls.length);
      let imageUrl = imageUrls[randomIndex];
      let clamImage = listItem.getElementsByTagName("img")[0];

      let sectionId = "b" + listItem.getAttribute("data-index");
      let section = document.getElementById(sectionId);

      let closeBtn = section.querySelector(".guestbook-close"); // 닫기 버튼

      let deleteModal = document.getElementById("delete-modal");
      let deleteYes = deleteModal.querySelector(".delete-yes");
      let deleteNo = deleteModal.querySelector(".delete-no");

      let plusBtn = document.querySelector(".plus"); // 추가하기 버튼

      let deleteBtn = section.querySelector(".deleteBtn"); // 삭제버튼
      let updateBtn = section.querySelector(".updateBtn"); // 수정버튼

      // 페이징
      let myPaging = document.querySelector(".my-paging");
      let friendPaging = document.querySelector(".friend-paging");

      let fromId = section.querySelector("#from-id").textContent;

      clamImage.src = imageUrl;
      clamImage.addEventListener("click", function() {

        if (loginId == userId || userId == "" || loginId == fromId) {
          section.style.display = "block";
          black.style.display = "block";
          deleteBtn.style.display = "block";
        } else if (loginId != fromId) {
          showModal("no-show-modal");
          noneModal("no-show-modal",".no-show-yes");
          section.style.display = "none";
          black.style.display = "none";
          deleteBtn.style.display = "none";
        }

        if (fromId == loginId) updateBtn.style.display = "block";
      });

      if(userId != "" && userId != loginId){
        plusBtn.style.display = "block";
        friendPaging.style.display = "block";
        myPaging.style.display = "none";
      }
      else{
        plusBtn.style.display = "none";
        friendPaging.style.display = "none";
        myPaging.style.display = "block" 
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

      deleteNo.addEventListener("click", function() {
        deleteModal.style.display = "none";
        black.style.display = "none";
      });

      // .lock 요소 처리
      let lock = listItem.querySelector(".lock");
      if (loginId != fromId)
        lock.style.display = "block";
      else
        lock.style.display = "none";

      if(loginId == userId || userId == "")
        lock.style.display = "none";

    } else {
      listItem.style.display = "none";
    }
  }

  // 이전 페이지로 이동
  let previousPageBtn = document.getElementById("previous-page");
  let previousPageBtn2 = document.getElementById("previous-page2");
  
  // 내버전
  previousPageBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let previousPage = currentPage - 1;
    if (previousPage >= 1) {
      goToPage(previousPage);
    }
  });

  // 친구버전
  previousPageBtn2.addEventListener("click", function(e) {
    e.preventDefault();
    let previousPage = currentPage - 1;
    if (previousPage >= 1) {
      goToPageFriend(previousPage);
    }
  });

  // 다음 페이지로 이동
  let nextPageBtn = document.getElementById("next-page"); 
  let nextPageBtn2 = document.getElementById("next-page2"); 

  // 내버전
  nextPageBtn.addEventListener("click", function(e) {
    e.preventDefault();
    let nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      goToPage(nextPage);
    }
  })

  // 
  nextPageBtn2.addEventListener("click", function(e) {
    e.preventDefault();
    let nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      goToPageFriend(nextPage);
    }
  })

  // 페이징 링크 이벤트 처리
  paginationLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      console.log('페이징....');
      let page = parseInt(this.getAttribute("data-page"));
      if (page) {
        currentPage = page;
        setActivePage(page); // 활성화된 페이지로 변경
        if(userId == ""){
          goToPage(page);
        }else{
          goToPageFriend(page);
        }
      }
    });
  });

  // 활성화된 페이지로 변경하는 함수
  function setActivePage(page) {
    paginationLinks.forEach(function(link) {
      link.classList.remove("active");
      if (parseInt(link.getAttribute("data-page")) === page) {
        link.classList.add("active");
      }
    });
  }

  // 페이지 이동 함수
  function goToPage(page) {
    let url = `/guestbook/list?uid=${userId}&page=${page}`;
    window.location.href = url;
  }

  function goToPageFriend(page) {
    let url = `/guestbook/list/${userId}?id=${userId}&page=${page}`;
    window.location.href = url;
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
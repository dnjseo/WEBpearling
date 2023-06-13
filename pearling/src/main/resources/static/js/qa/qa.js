window.addEventListener("load", function (e) {
    let qaListBodies = document.querySelectorAll('.qa-list-body');
    let openedAnswer = null; // 열려있는 항목 변수 추가
  
    qaListBodies.forEach(function (qaListBody) {
      let memberQ = qaListBody.querySelector('.item');
      let adminA = qaListBody.querySelector('.dropdown-answer');
      let isOpen = false;
  
      adminA.style.display = 'none';
  
      memberQ.addEventListener('click', function () {
        if (openedAnswer === adminA) { // 현재 클릭한 항목이 이미 열려있는 상태인 경우
          adminA.style.display = 'none'; // 항목 닫기
          isOpen = false;
          openedAnswer = null; // 열린 항목 초기화
          return;
        }
  
        if (openedAnswer !== null) { // 열려있는 항목이 있을 경우
          openedAnswer.style.display = 'none'; // 기존 항목 닫기
        }
  
        adminA.style.display = 'block'; // 현재 클릭한 항목 열기
        isOpen = true;
        openedAnswer = adminA; // 열린 항목 업데이트
      });
    });
  });
  
function sendFormData() {
    let scheduleTitle = document.getElementById('schedule-title').value;
    let startDate = document.getElementById('start-date').value;
    let endDate = document.getElementById('end-date').value;
  
    // 위도와 경도 값을 가져오기
    let latitude = map.getCenter().getLat();
    let longitude = map.getCenter().getLng();
  
    // AJAX 요청 설정
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/schedule/post', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    // 요청 완료 후 처리
    xhr.onload = function() {
      if (xhr.status === 200) {
        // 요청이 성공적으로 처리됨
        console.log('일정이 등록되었습니다.');
        console.log('서버 응답:', xhr.responseText); // 서버로부터의 응답 확인
      } else {
        // 요청이 실패하거나 오류가 발생함
        console.error('일정 등록에 실패했습니다.');
      }
    };
  
    // 요청 전송
    xhr.send('title=' + encodeURIComponent(scheduleTitle) + '&startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate) + '&latitude=' + encodeURIComponent(latitude) + '&longitude=' + encodeURIComponent(longitude));
  }

let addButton = document.querySelector('.add-btn.defence');
addButton.addEventListener('click', function(event) {
  event.preventDefault(); // 기본 동작인 form 제출을 막기 위해 호출
  
    // AJAX 요청 보내기
  sendFormData();
});



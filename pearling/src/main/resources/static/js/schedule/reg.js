class ScheduleElements {
    constructor(){
        let s = document.querySelector("#d1")
        this.title = s.querySelector("#schedule-title");
        this.startDate = s.querySelector("#start-date");
        this.startTime = s.querySelector("#start-time");
        this.endDate = s.querySelector("#end-date");
        this.endTime = s.querySelector("#end-time");
        this.place = s.querySelector("#keyword");
        this.backgroundColor = s.querySelector("#background-color");
        
        this.tagedFr = s.querySelector(".taged-freind-nickname")
        
        this.colBox = s.querySelector(".col-box");
        this.colBall = this.colBox.querySelectorAll(".col-ball");
        this.current = this.colBox.querySelector(".active");
    }
}// class end

let isDeleted = false;
let tagedInputValues = [];
window.addEventListener("load", function(e) {
  e.preventDefault;
  let schedule = new ScheduleElements();  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const delScheduleBtn = document.querySelector('#schedule-del-btn-in-header')
  const friendIds = [];

    // 삭제 버튼 클릭 시 스케쥴 삭제.
    delScheduleBtn.addEventListener("click", function () {
        deleteSchedule(id);
    });

    setOffsetDate(schedule);
    paintPallet(schedule);
    
    // 스케쥴 디테일 가져오는 경우
    if(id!=null){
        getDetail(id, schedule);
        delScheduleBtn.classList.add('schedule-del-btn-in-header-show')  
        changeUpdateMode()
    } 
    
    // reg.html 하단의 확인키 
    const postBtn = this.document.querySelector('.confirm-yes')

    postBtn.addEventListener("click", function () {

    const friends = document.querySelectorAll('.taged-id-input');

      //태그 된 친구 배열에 넣기
      friends.forEach(friend => {
        //중복 값이 들어가지 않게 조건 검사 
        if (!friendIds.includes(friend.value)) {
          friendIds.push(friend.value);
        }
      });

      // 스케쥴 등록, 수정 구분
      if(id==null){
        postSchedule(id, schedule, friendIds);
      }else{
        deleteFriendTag(id, tagedInputValues, isDeleted);
        updateSchedule(id, schedule, friendIds);
      }
    });


});//window.addEventListener end 

function changeUpdateMode() {
  let updateBtn = document.querySelector(".confirm-btn")
  updateBtn.innerHTML='수정'

  confirmModal = document.getElementById('confirm-modal')
  confirmModal.querySelector('.confirm-text').innerHTML = '일정이 수정되었습니다.'
}

// schedule Detail 가져오기
function getDetail(id,schedule) {

    let url = `/api/schedules/detail?id=${id}`;
    
    fetch(url)
      .then(response => response.json())
      .then(s => {
   
        schedule.title.value = s.title;
        schedule.startDate.value = s.startDate;
        schedule.startTime.value = s.startTime;
        schedule.endDate.value = s.endDate;
        schedule.endTime.value = s.endTime;
        schedule.place.value = s.place;
        schedule.backgroundColor.value = s.backgroundColor;

      // ** 태그 된 친구 불러오기 **
        s.friendNicknames.forEach((friendNickname) => {

          let taged = `
            <div class="taged-item">
              <input class="complete-tag already-taged-nicknames" type="text" value="${friendNickname}" disabled>
              <button class="already-taged-btn tag-del-btn" type="button"> x </button>
            </div>
          `;
          schedule.tagedFr.innerHTML += taged;
        });

        
        // 이전 태그 삭제하기 
        document.addEventListener('click', function(event) {
          if (event.target.classList.contains('tag-del-btn')) {
            // 클릭된 Delete 버튼의 부모 요소인 div를 찾음
            let tagDiv = event.target.closest('.taged-item');
            let tagedInput = tagDiv.querySelector('.already-taged-nicknames');
            let tagedInputValue = tagedInput.value;
            
            // div가 존재하는 경우 삭제
            if (tagDiv) { 
              tagDiv.remove();
              isDeleted = true;
              tagedInputValues.push(tagedInputValue); // 배열에 값 추가
            }
          }
        });

              
        // ** 선택 된 컬러 표시하기 **
        let receivedColor = schedule.backgroundColor.value;
        // 데이터 컬러와 일치하는 col-ball 찾기.
        let selectedColBall = Array.from(schedule.colBall).find(
          colBall => colBall.getAttribute("data-color") === receivedColor
        );
          selectedColBall.classList.add("selected");        

      });
  }//getDetail end

// 컬러팔레트 설정 부분.
function paintPallet(schedule) {

    let pallet = [
        { color: "#E6E6FA", category: "약속" },
        { color: "#f3e5fa", category: "기념일" },
        { color: "#fae5f0", category: "카테고리1" },
        { color: "#e5fae7", category: "카테고리2" },
        { color: "#e5f3fa", category: "카테고리3" },
        { color: "#faf1e5", category: "카테고리4" },
        { color: "#E8E8E8", category: "카테고리5" }
    ];

    for (let i = 0; i < pallet.length; i++) {
        schedule.colBall[i].style.background = pallet[i].color;
    }
  

    //색상 선택(클릭) 이벤트 
       schedule.colBox.onclick = function(e) {
        console.log(schedule.colBox + '선택')
        if (!(e.target.classList.contains("col-ball"))) {
            return;
        }

        if (schedule.current != null) {
            schedule.current.classList.remove("active");
        }

        e.target.classList.add("active");
        schedule.current = e.target;

        let selectedColor = e.target.getAttribute("data-color");
        schedule.backgroundColor.value = selectedColor;

    };// colBox click end

} //paintPallet end

// 오늘 날짜로 기본 날짜 설정하기.
function setOffsetDate(schedule){

    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        timeZone: 'Asia/Seoul'
      };
      
    const currentKRDate = new Date().toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      
    schedule.startDate.value = currentKRDate;
    schedule.endDate.value = schedule.startDate.value ;

    // 시작 날짜가 바뀌면 끝나는 날짜 자동으로 변경
    schedule.startDate.oninput = () =>{
      schedule.endDate.value = schedule.startDate.value ;
    }

} //setOffsetDate end



// 스케쥴 등록
function postSchedule(id, schedule, friendIds){
  if(id != null) return;

  if(schedule.title.value.trim() == ''){
  document.getElementById('schedule-title').placeholder="*일정 제목을 입력하셔야 합니다."
  document.getElementById('schedule-title').classList.add('alert')
  return;
  }
  
    const scheduleData = {
      startDate: schedule.startDate.value,
      startTime: schedule.startTime.value,
      endDate: schedule.endDate.value,
      endTime: schedule.endTime.value,
      title : schedule.title.value,
      backgroundColor: schedule.backgroundColor.value,
      latitude: document.querySelector('#latitude').value,
      longitude: document.querySelector('#longitude').value,
      place: schedule.place.value,
    }

    const requestData = {
      scheduleData: scheduleData,
      tagData: friendIds
    };
 
    fetch('/api/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData) // 폼 데이터를 URL 인코딩하여 전송
    })
      .then(response => {
        if (response.ok) {
          // 성공적으로 요청이 처리된 경우의 동작
          console.log('폼 제출 성공');
          window.location.href = "/shell/myshell";
        } else {
          // 요청이 실패한 경우의 동작
          console.error('폼 제출 실패');
          console.log(requestData);
        }
      })
      .catch(error => {
        // 네트워크 오류 등 예외 처리
        console.error('폼 제출 오류:', error);
      })

}

// 스케쥴 삭제
function deleteSchedule(id){
  let deleteModal = document.getElementById("delete-modal");
  let confirmYes = deleteModal.querySelector(".del-confirm-yes");
  let confirmNo = deleteModal.querySelector(".del-confirm-no");
  
  deleteModal.style.display = "block";

  confirmNo.addEventListener("click", function () {
    console.log ('삭제 모달 - 노')
    deleteModal.style.display = "none";
  });

  confirmYes.addEventListener("click", function () {
    console.log ('삭제 모달 - 예스')

    fetch(`/api/schedules/${id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            // 성공적으로 요청이 처리된 경우의 동작
            console.log('삭제 성공~!');
            window.location.href = "/shell/myshell";
    
          } else {
            // 요청이 실패한 경우의 동작
            console.error('삭제 실패');
          }
        })
        .catch(error => {
          // 네트워크 오류 등 예외 처리
          console.error('폼 제출 오류:', error);
        });

      })

}//deleteSchedule end

// 스케쥴 업데이트
function updateSchedule(id, schedule, friendIds){
  if(id == null) return;

  if(schedule.title.value.trim() == ''){
    document.getElementById('schedule-title').placeholder="*일정 제목을 입력하셔야 합니다."
    document.getElementById('schedule-title').classList.add('alert')
    return;
    }

  let url = `/api/schedules/detail?id=${id}`;
  let titlefornoti = schedule.title.value;

  const scheduleData = {
    id : id,
    title : schedule.title.value,
    startDate: schedule.startDate.value,
    startTime: schedule.startTime.value,
    endDate: schedule.endDate.value,
    endTime: schedule.endTime.value,
    latitude: document.querySelector('#latitude').value,
    longitude: document.querySelector('#longitude').value,
    place: schedule.place.value,
    backgroundColor: schedule.backgroundColor.value,
  }


    // 서버로 데이터 전송
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scheduleData)// 체크 상태를 JSON 형식으로 전송
    })
      .then(response => {

        // 서버 응답 처리
        if (response.ok) {
          updateFriendTag(id, friendIds, titlefornoti)

        } else {
          console.error('스케쥴 업데이트 실패');
        }
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });

}//updateSchedule end

function updateFriendTag(id, friendIds, titlefornoti) {

    const requestData = {
    scheduleId: id,
    scheduleTitle: titlefornoti,
    tagData: friendIds
  };

  fetch('/api/friendtag', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData) // 폼 데이터를 URL 인코딩하여 전송
  })
    .then(response => {
      if (response.ok) {
        // 성공적으로 요청이 처리된 경우의 동작
        window.location.href = "/shell/myshell";
      } else {
        // 요청이 실패한 경우의 동작
        console.error('친구태그 수정 폼 제출 실패');
        console.log(requestData);
      }
    })
    .catch(error => {
      // 네트워크 오류 등 예외 처리
      console.error('친구태그 수정 폼 제출 오류:', error);
    })

}

function deleteFriendTag(id, tagedInputValues, isDeleted)
{
  const requestData = {
    id: id,
    value: tagedInputValues
  };

  if(isDeleted){
      fetch("/api/friendtag", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      if (response.ok) {
        // 성공적으로 요청이 처리된 경우의 동작
        console.log('삭제 성공~!');
        isDeleted = false;
      } else {
        // 요청이 실패한 경우의 동작
        console.error('삭제 실패');
      }
    })
    .catch(error => {
      // 네트워크 오류 등 예외 처리
      console.error('폼 제출 오류:', error);
    })
}
}
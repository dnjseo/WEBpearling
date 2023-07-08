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
      friends.forEach(friend => {
        friendIds.push(friend.value);
      });
      if(id==null){
        postSchedule(id, schedule, friendIds);
      }else{
        updateSchedule(id, schedule);
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

    let url = `http://localhost:8080/api/schedules/detail?id=${id}`;
    
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
              <input class="complete-tag" type="text" value="${friendNickname}" disabled>
              <button class="tag-del-btn" type="button"> x </button>
            </div>
          `;
          schedule.tagedFr.innerHTML += taged;
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


// 친구 태그
function selectFriend() {
  fetch('/api/follow/followerList')
    .then(response => response.json())
    .then(followerList => {
      console.log('fetch확인', followerList);
      const list = data.followerList.map(item => item.nickname);

      const input = document.querySelector('#friend-tag-input');
      const autoComplete = document.querySelector('.autocomplete');
      let nowIndex = 0;

      const showList = (data, value, currentIndex) => {
        // 정규식으로 변환
        const regex = new RegExp(`(${value})`, 'g');

        autoComplete.innerHTML = data
          .map((label, index) => `
            <div class="${currentIndex === index ? 'active' : ''}">
              ${label.replace(regex, '<mark>$1</mark>')}
            </div>
          `)
          .join('');
      };

      input.onkeyup = (e) => {
        const value = input.value.trim();

        const matchDataList = value
          ? list.filter((label) => label.includes(value))
          : [];

        switch (e.keyCode) {
          // UP KEY
          case 38:
            nowIndex = Math.max(nowIndex - 1, 0);
            break;

          // DOWN KEY
          case 40:
            nowIndex = Math.min(nowIndex + 1, matchDataList.length - 1);
            break;

          // ENTER KEY
          case 13:
            document.querySelector("#search").value = matchDataList[nowIndex] || "";
            // 초기화
            nowIndex = 0;
            matchDataList.length = 0;
            break;

          // 그외 다시 초기화
          default:
            nowIndex = 0;
            break;
        }

        // 리스트 보여주기
        showList(matchDataList, value, nowIndex);
      };
    })
    .catch(error => {
      console.log('팔로워 목록을 가져오는 동안 오류가 발생했습니다:', error);
    });
}




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
          window.location.href = "http://localhost:8080/shell/myshell";
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
            window.location.href = "http://localhost:8080/shell/myshell";
    
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
function updateSchedule(id, schedule){
  if(id == null) return;

  if(schedule.title.value.trim() == ''){
    document.getElementById('schedule-title').placeholder="*일정 제목을 입력하셔야 합니다."
    document.getElementById('schedule-title').classList.add('alert')
    return;
    }

  let url = `http://localhost:8080/api/schedules/detail?id=${id}`;

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
    backgroundColor: schedule.backgroundColor.value
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
          window.location.href = "http://localhost:8080/shell/myshell";

        } else {
          console.error('스케쥴 업데이트 실패');
        }
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });

}
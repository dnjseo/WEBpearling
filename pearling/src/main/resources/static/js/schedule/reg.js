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

    // 삭제 버튼 클릭 시 스케쥴 삭제.
    delScheduleBtn.addEventListener("click", function () {
        console.log('삭제버튼 클릭')
        deleteSchedule(id);
    });

    setOffsetDate(schedule);
    paintPallet(schedule);
    
    if(id!=null){
        getDetail(id, schedule);
        delScheduleBtn.classList.add('schedule-del-btn-in-header-show')  
        changeUpdateMode()


    }

});    

function changeUpdateMode() {
  let cofirmModal = document.querySelector('.confirmModal')
  let updateBtn = document.querySelector(".confirm-btn")
  updateBtn.innerHTML='수정'

  cofirmModal.querySelector(".confirm-text").innerHTML = '일정이 수정되었습니다.'
  let cofirmBtn = cofirmModal.querySelector(".confirm-yes")
  cofirmBtn.onclick= (e) => {
    e.preventDefault;
    updateSchedule(id, schedule)
  }
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
        schedule.backgroundColor.value = s.backgroundColor

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
    schedule.endDate.value = currentKRDate;
} //setOffsetDate end

function selectFreind(){

    let friendList = document.querySelector('.friendList')
    let friend = friendList.querySelector('.fr')
    let current = colBox.querySelector(".active");

        //색상 선택(클릭) 이벤트 
        friendList.onclick = (e) => {
            if (!(e.target.classList.contains("fr"))) {
                return;
            }

            console.log('친구 클릭!');
            
            if (current != null) {
                current.classList.remove("active");
            }
    
            e.target.classList.add("active");
            current = e.target;
    
            // let input = document.createElement("input");
            // input.type = "hidden";
            // input.name = "tag";
            // input.value = selectedColor.color;
            // document.querySelector(".send-form").appendChild(input);
    
            console.log("선택한 색상:", selectedColor.color);
            console.log("선택한 카테고리:", selectedColor.category);
        };// colBox click end
} //selectFriend end

// 스케쥴 삭제 로직 
function deleteSchedule(id){

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

}//deleteSchedule end

// 스케쥴 업데이트 로직
function updateSchedule(id, schedule){

  const scheduleData = {
    id : id,
    title : schedule.title.value,
    startDate: schedule.startDate.value,
    startTime: schedule.startTime.value,
    endDate: schedule.endDate.value,
    endTime: schedule.endTime.value,
    latitude: document.querySelector('#latitude').value,
    longitude: document.querySelector('#longtitude').value,
    place: schedule.place.value,
    backgroundColor: schedule.backgroundColor.value
  }

    // 서버로 데이터 전송
    fetch(`/api/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scheduleData)// 체크 상태를 JSON 형식으로 전송
    })
      .then(response => {

        // 서버 응답 처리
        if (response.ok) {
          console.log(todoId + '체크 상태 업데이트 성공');
        } else {
          console.error(todoId + '체크 상태 업데이트 실패');
        }
      })
      .catch(error => {
        console.error('오류 발생:', error);
      });

}
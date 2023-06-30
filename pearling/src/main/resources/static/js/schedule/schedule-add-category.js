class ScheduleElements {
    constructor(){
        let s = document.querySelector("#d1")
        this.title = s.querySelector("#schedule-title");
        this.startDate = s.querySelector("#start-date");
        this.startTime = s.querySelector("#start-time");
        this.endDate = s.querySelector("#end-date");
        this.endTime = s.querySelector("#end-time");
        this.place = s.querySelector("#keyword");

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


    setOffsetDate(schedule);
    paintPallet(schedule);
    //selectFreind();

    if(id!=null){
        getDetail(id, schedule);
     }

});    


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
        if (!(e.target.classList.contains("col-ball"))) {
            return;
        }

        if (schedule.current != null) {
            schedule.current.classList.remove("active");
            
        }

        e.target.classList.add("active");
        schedule.current = e.target;

        let colorIndex = Array.from(schedule.colBall).indexOf(e.target);
        let selectedColor = pallet[colorIndex];

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "backgroundColor";
        input.value = selectedColor.color;
        document.querySelector(".send-form").appendChild(input);

        console.log("선택한 색상:", selectedColor.color);
        console.log("선택한 카테고리:", selectedColor.category);

          // s.backgroundColor 값과 일치하는 col-ball 요소에 active 클래스 추가
  let selectedColorIndex = pallet.findIndex(color => color.color === s.backgroundColor);
  if (selectedColorIndex !== -1) {
    let selectedColBall = schedule.colBall[selectedColorIndex];
    selectedColBall.classList.add("active");
    schedule.current = selectedColBall;
  }
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


  
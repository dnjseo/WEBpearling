let scheduleTitle = document.querySelector("#schedule-title")

window.addEventListener("load", function(e) {
    e.preventDefault;

    setOffsetDate();
    paintPallet();
    selectFreind();
    
 
});

//카테고리 선택(컬러 팔레트) 설정
function paintPallet() {
    let colBox = this.document.querySelector(".col-box");
    let colBall = colBox.querySelectorAll(".col-ball");
    let current = colBox.querySelector(".active");
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
        colBall[i].style.background = pallet[i].color;
    }

    //색상 선택(클릭) 이벤트 
    colBox.onclick = function(e) {
        if (!(e.target.classList.contains("col-ball"))) {
            return;
        }

        if (current != null) {
            current.classList.remove("active");
        }

        e.target.classList.add("active");
        current = e.target;

        let colorIndex = Array.from(colBall).indexOf(e.target);
        let selectedColor = pallet[colorIndex];

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "backgroundColor";
        input.value = selectedColor.color;
        document.querySelector(".send-form").appendChild(input);

        console.log("선택한 색상:", selectedColor.color);
        console.log("선택한 카테고리:", selectedColor.category);
    };// colBox click end

} //paintPallet end

// 기본 시간 : 오늘
function setOffsetDate(){
    let startDate = document.getElementById('start-date')
    let endDate = document.getElementById('end-date')

    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        timeZone: 'Asia/Seoul'
      };
      
    const currentKRDate = new Date().toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
      
    startDate.value = currentKRDate;
    endDate.value = currentKRDate;
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

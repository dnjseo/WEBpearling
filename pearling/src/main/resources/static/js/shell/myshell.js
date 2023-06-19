//캘린더
document.addEventListener('DOMContentLoaded', function () {

    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {

        // plugins: [ googleCalendarPlugin ],
        editable: true,
        initialView: 'dayGridMonth',
        googleCalendarApiKey: 'AIzaSyC7DwkG7gzH6oNfouokyqXiKisgP13t8wM',
        EventSource: [
            {
                googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                className: '대한민국공휴일',
                color: '#A587E0',
                textcolor: 'red'
            }
        ],
        // events: [
        //     {
        //         title: 'start',
        //         start: '2023-06-09',
        //         color: 'white'
        //     }
        // ]

    });

    //캘린더 이벤트에 스케쥴 db 추가 
    fetch(`http://localhost:8080/api/schedules?`)
    .then(response => response.json())
    .then(scheduleList => {
        for (let schedule of scheduleList) {
            let scheduleTitle = schedule.title;
            let scheduleStartDate = schedule.startDate;

            let event = {
                title: scheduleTitle,
                start: scheduleStartDate,
                color: '#E6E6FA'
            };
            calendar.addEvent(event);
        }
    });

    calendar.render();
    calendar.setOption('contentHeight', 350);

    let mstoday = document.querySelector("#ms4")
    let dayIndex = 0;
    updateDate(dayIndex);


    function updateDate(offset) {
        let today = new Date();
        today.setDate(today.getDate() + offset);
        let month = today.getMonth();
        let day = today.getDay();
        let date = today.getDate();

        switch (month) {
            case 0: month = "01"; break;
            case 1: month = "02"; break;
            case 2: month = "03"; break;
            case 3: month = "04"; break;
            case 4: month = "05"; break;
            case 5: month = "06"; break;
            case 6: month = "07"; break;
            case 7: month = "08"; break;
            case 8: month = "09"; break;
            case 9: month = "10"; break;
            case 10: month = "11"; break;
            case 11: month = "12"; break;
        }

        switch (date) {
            case 1: date = "01"; break;
            case 2: date = "02"; break;
            case 3: date = "03"; break;
            case 4: date = "04"; break;
            case 5: date = "05"; break;
            case 6: date = "06"; break;
            case 7: date = "07"; break;
            case 8: date = "08"; break;
            case 9: date = "09"; break;
        }

        switch (day) {
            case 0: day = "sun"; break;
            case 1: day = "mon"; break;
            case 2: day = "tue"; break;
            case 3: day = "wed"; break;
            case 4: day = "thu"; break;
            case 5: day = "fri"; break;
            case 6: day = "sat"; break;
        }

        mstoday.querySelector('.ms-today-day').innerText = month + "." + date + " " + day;

    }

    let dayDetail = document.getElementById('dayDetail');
    calendar.on('dateClick', function (info) {
        console.log('clicked on ' + info.dateStr);

    });


    //캘린더 상의 날짜 클릭할 때 함수
    calendar.on('dateClick', (info) => {

        let clickedDate = new Date(info.dateStr);
        let month = (clickedDate.getMonth() + 1).toString().padStart(2, '0');
        let day = clickedDate.getDate().toString().padStart(2, '0');
        let date = clickedDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();

        //캘린더 아래에 클릭한 날짜 출력
        let mstoday = document.querySelector("#ms4");
        mstoday.querySelector(".ms-today-day").innerText = month + "." + day + " " + date;

        let selectedDateStr = clickedDate.toISOString().substr(0, 10); // 선택된 날짜의 문자열(YYYY-MM-DD)로 변환
        
        let scheduleElements = document.querySelector('.scheduleListSection');
        let todoElements = document.querySelector('.todoListSection');

           //클릭한 투두 비교 및 출력하기.
           fetch(`http://localhost:8080/api/todos?`)
           .then(response => response.json())
           .then(list => {
               
               // 기존에 출력된 투두 리스트 지우기
               todoElements.innerHTML = '';
         
             for (let todo of list) {
               let tododate = new Date(todo.date);
               
               // 날짜 비교를 위해 clickedDate와 scheduleStartDate의 년, 월, 일을 비교
               if (
                 clickedDate.getFullYear() === tododate.getFullYear() &&
                 clickedDate.getMonth() === tododate.getMonth() &&
                 clickedDate.getDate() === tododate.getDate()
               ) {
   
               //스케쥴 출력하기     
                 let todoTemplate = `
                     <li class="todoList">
                        <div class="content">
                            <input type="checkbox">
                            <p>${todo.content}</p>
                        </div>
                    </li>
                `;
   
                todoElements.insertAdjacentHTML("beforeend", todoTemplate);
               }
             }
           })
           .catch(error => {
             console.error("Error fetching todo:", error);
           });


        //클릭한 스케쥴 비교 및 출력하기.
        fetch(`http://localhost:8080/api/schedules?`)
        .then(response => response.json())
        .then(list => {
            
            // 기존에 출력된 스케줄 지우기
            scheduleElements.innerHTML = '';
      
          for (let schedule of list) {
            let scheduleStartDate = new Date(schedule.startDate);

            // 날짜 비교를 위해 clickedDate와 scheduleStartDate의 년, 월, 일을 비교
            if (
              clickedDate.getFullYear() === scheduleStartDate.getFullYear() &&
              clickedDate.getMonth() === scheduleStartDate.getMonth() &&
              clickedDate.getDate() === scheduleStartDate.getDate()
            ) {

            //스케쥴 출력하기     
              let itemTemplate = `
              <li class="scheduleList">
                <div class="content">
                  <p>${schedule.title}</p>
                </div>
            </li>`;

              scheduleElements.insertAdjacentHTML("beforeend", itemTemplate);
            }
          }
        })
        .catch(error => {
          console.error("Error fetching schedules:", error);
        });
     
     
    }); // onclick calendar end

});//calendar end

// 체크박스 요소 선택
let checkboxElement = document.querySelector('input[type="checkbox"]');

// 체크 상태 변경 이벤트 리스너 추가
checkboxElement.addEventListener('change', function() {
  // 체크 상태 가져오기
  let isChecked = checkboxElement.checked;

  // 서버로 데이터 전송
  fetch('http://localhost:8080/api/updateCheckbox', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ isChecked: isChecked }) // 체크 상태를 JSON 형식으로 전송
  })
  .then(response => {
    // 서버 응답 처리
    if (response.ok) {
      console.log('체크 상태 업데이트 성공');
    } else {
      console.error('체크 상태 업데이트 실패');
    }
  })
  .catch(error => {
    console.error('오류 발생:', error);
  });
});


window.addEventListener("load", function () {
    let plus1 = document.querySelector('.plus');
    let plusDetail = document.querySelector('.plusDetail');
    let plusTodo = document.querySelector('.plus-todo');
    let plusSchedule = this.document.querySelector('.plus-schedule');
    let isOpen = false;

    plus1.addEventListener('click', () => {
        plusDetail.classList.toggle('act');
    })

});




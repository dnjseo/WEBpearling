
//캘린더

document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
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
        events: [
            {
                title: 'start',
                start: '2023-06-09',
                color: 'white'
            }
        ]
    });

    let scheduleElements = document.getElementsByClassName('scheduleList');
    for (var i = 0; i < scheduleElements.length; i++) {
        let scheduleTitle = scheduleElements[i].querySelector('p').dataset.schedule;
        let scheduleStartDate = scheduleElements[i].querySelector('.scheduledate').dataset.schedule;

        let event = {
            title: scheduleTitle,
            start: scheduleStartDate,
            color: '#E6E6FA'
        };
        calendar.addEvent(event);
    }

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


    calendar.on('dateClick', function (info) {
        let clickedDate = new Date(info.dateStr);
        let month = (clickedDate.getMonth() + 1).toString().padStart(2, '0');
        let day = clickedDate.getDate().toString().padStart(2, '0');
        let date = clickedDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();

        let mstoday = document.querySelector("#ms4");
        mstoday.querySelector(".ms-today-day").innerText = month + "." + day + " " + date;

        let selectedDateStr = clickedDate.toISOString().substr(0, 10); // 선택된 날짜의 문자열(YYYY-MM-DD)로 변환

        
        let scheduleElements = document.getElementsByClassName('scheduleList');
        let todoElements = document.getElementsByClassName('todoList');


        // 일정 비교
        for (let i = 0; i < scheduleElements.length; i++) {
            let scheduleTitle = scheduleElements[i].querySelector('p').dataset.schedule;
            let scheduleStartDate = scheduleElements[i].querySelector('.scheduledate').dataset.schedule;

            if (scheduleStartDate === selectedDateStr) {
                let scheduleItem = document.getElementById('scheduleItem');
                scheduleItem.innerText = scheduleTitle;
            }
        }

         

        //TO DO 비교
        
        let mstodoList = document.getElementById('mstodoList');
        // while (mstodoList.firstChild) {
        //     mstodoList.removeChild(mstodoList.firstChild);
        // }
        

        let todoTitles = [];
        for (let i = 0; i < todoElements.length; i++) {
            let todoTitle = todoElements[i].querySelector('p').dataset.todo;
            let todoStartDate = todoElements[i].querySelector('.todoDate').dataset.todo;
            let childtodoList = document.createElement('li')
            let childtodoContentdiv = document.createElement('div')
            let childTodoContent = document.createElement('span');
            let todoItemCheckbox = document.createElement('input');

                        
            if (todoStartDate === selectedDateStr) {
                // let todoItem = document.getElementById('todoItem');
                // todoItem.innerText = todoTitle;
           
                todoItemCheckbox.type = 'checkbox';
                childTodoContent.innerText = todoTitle;
                childtodoList.classList.add('todoList');
                childtodoContentdiv.classList.add('content')
                
                childtodoList.appendChild(childtodoContentdiv);
                childtodoContentdiv.appendChild(todoItemCheckbox);
                childtodoContentdiv.appendChild(childTodoContent);
                
                mstodoList.appendChild(childtodoList);

            }
            
            
        }

        // TO DO 비교
        // let todoItems = []; // todoItem을 담을 배열

        // for (let i = 0; i < todoElements.length; i++) {
        //     let todoTitle = todoElements[i].querySelector('span').id; // span 요소의 id를 가져옴
        //     let todoStartDate = todoElements[i].querySelector('.todoDate').dataset.todo;

        //     if (todoStartDate === selectedDateStr) {
        //         let todoItem = document.createElement('li');
        //         let todoItemContent = document.createElement('span');
        //         todoItemContent.innerText = todoTitle;
        //         todoItem.appendChild(todoItemContent);
        //         todoItems.push(todoItem); // todoItem을 배열에 추가
        //     }
        // }

        // let todoList = document.querySelector('.schedule ul'); // todoList의 ul 요소 선택
        // todoList.innerHTML = ''; // 기존 목록 초기화

        // if (todoItems.length > 0) {
        //     for (let i = 0; i < todoItems.length; i++) {
        //         todoList.appendChild(todoItems[i]); // 목록에 각각의 todoItem을 추가
        //     }
        // } else {
        //     todoList.innerHTML = '<li>No todos for selected date.</li>'; // 선택된 날짜에 대한 할 일이 없는 경우 메시지 표시
        // }



    });



    // function toggleTextDecoration(checkbox) {
    //     var taskElement = mstoday.querySelector(".task");
    //     if (checkbox.checked) {
    //         taskElement.style.textDecoration = 'line-through';
    //     } else {
    //         taskElement.style.textDecoration = 'none';
    //     }
    // }


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




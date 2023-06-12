
//캘린더

document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        // plugins: [ googleCalendarPlugin ],
        editable: true,
        initialView: 'dayGridMonth',
        googleCalendarApiKey: 'AIzaSyC7DwkG7gzH6oNfouokyqXiKisgP13t8wM',
        EventSource: [
        {
            googleCalendarId:'ko.south_korea#holiday@group.v.calendar.google.com',
            className : '대한민국공휴일',
            color: '#A587E0',
            textcolor:'red'
        }
    ],
        events:[
            {
            title: 'start',
            start: '2023-06-09',
            color:'white'
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
        
        switch (month) 
        {
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

    
        switch(day)
        {
            case 0 : day = "sun"; break; 
            case 1 : day = "mon"; break;
            case 2 : day = "tue"; break;
            case 3 : day = "wed"; break;
            case 4 : day = "thu"; break;
            case 5 : day = "fri"; break;
            case 6 : day = "sat"; break;
        }

        mstoday.querySelector('.ms-today-day').innerText = month+"."+date+" "+day;    

    }


    let dayDetail = document.getElementById('dayDetail');
        calendar.on('dateClick', function(info) {
        console.log('clicked on ' + info.dateStr);
        
    });


    calendar.on('dateClick', function(info) {
        let clickedDate = new Date(info.dateStr);
        let month = (clickedDate.getMonth() + 1).toString().padStart(2, '0');
        let day = clickedDate.getDate().toString().padStart(2, '0');
        let date = clickedDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
     
        let mstoday = document.querySelector("#ms4");
        mstoday.querySelector(".ms-today-day").innerText = month + "." + day + " " + date;
   
    });


    function toggleTextDecoration(checkbox) {
        var taskElement = mstoday.querySelector(".task");
        if (checkbox.checked) {
            taskElement.style.textDecoration = 'line-through';
        } else {
            taskElement.style.textDecoration = 'none';
        }
    }


  });

  window.addEventListener("load", function () {
    let plus1 = document.querySelector('.plus');
    let plusDetail = document.querySelector('.plusDetail');
    let plusTodo = document.querySelector('.plus-todo');
    let plusSchedule = this.document.querySelector('.plus-schedule');
    let isOpen = false; 

        plus1.addEventListener('click',() => {
            plusDetail.classList.toggle('act');
        })
    
    });




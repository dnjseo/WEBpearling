// 체크 상태 변경 이벤트 리스너 등록 함수
function addCheckboxEventListener(checkbox) {

  checkbox.addEventListener('change', function () {
    // 체크 상태 가져오기
    let isChecked = checkbox.checked;
    let todoId = checkbox.dataset.id; // data-todo-id 속성에서 todoId 가져오기


    // <p> 요소 폰트 스타일 변경 (줄 그어짐)
    let pElement = checkbox.nextElementSibling;
    if (isChecked) {
      pElement.style.textDecoration = 'line-through';
    } else {
      pElement.style.textDecoration = 'none';
    }

    const todoCheck = {
      id: todoId,
      statement: isChecked
    }

    // 서버로 데이터 전송
    fetch(`/api/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoCheck)// 체크 상태를 JSON 형식으로 전송
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

    // <li> 요소 위치 변경
    let liElement = checkbox.closest('li');
    let ulElement = liElement.closest('ul');
    if (isChecked) {
      ulElement.appendChild(liElement); // 가장 하위로 이동
    }
  });
}

function printCalendarEvent(calendar) {
  fetch('http://localhost:8080/api/user') // 사용자 정보를 받아오는 API 엔드포인트
    .then(response => response.json())
    .then(userData => {
      const userId = userData.id; // 사용자의 ID를 받아옴

      // 캘린더 이벤트에 스케줄 db 추가
      let url = 'http://localhost:8080/api/schedules';
      if (userId) {
        url += `/${userId}`;
      }


      //캘린더 이벤트에 스케쥴 db 추가 
      fetch(url)
        .then(response => response.json())
        .then(scheduleList => {
          for (let schedule of scheduleList) {
            let scheduleTitle = schedule.title;
            let scheduleStartDate = schedule.startDate;
            let scheduleEndDate = schedule.endDate;
            let scheduleColor = schedule.backgroundColor;
            let scheduleStartTime = schedule.startTime;
            let scheduleEndTime = schedule.endTime;

            if (scheduleColor == null) {
              scheduleColor = '#e6eced'
            }

            console.log(scheduleColor)

            let event = null;
            if (!scheduleStartTime && !scheduleEndTime
              && scheduleStartDate == scheduleEndDate) {
              event = {
                title: scheduleTitle,
                start: scheduleStartDate,
                end: scheduleEndDate,
                color: scheduleColor,
                allDay: true
              };
              calendar.addEvent(event);
            };

            if (!scheduleStartTime && !scheduleEndTime
              && scheduleStartDate != scheduleEndDate) {

              document.querySelector('.fc-event-time').style.display="none"; 
              let endDate = new Date(scheduleEndDate);
              endDate.setDate(endDate.getDate() + 1);

              event = {
                title: scheduleTitle,
                start: scheduleStartDate,
                end: endDate,
                color: scheduleColor,
                allDay: true,
              };
            }

            else {
              event = {
                title: scheduleTitle,
                start: scheduleStartDate + 'T' + scheduleStartTime,
                end: scheduleEndDate + 'T' + scheduleEndTime,
                color: scheduleColor,
                allDay: false
              };
            }
            calendar.addEvent(event);
          }
        });
    });

  calendar.render();
  calendar.setOption('contentHeight', 350);

}

document.addEventListener('DOMContentLoaded', function () {

  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false
    },
    
    eventDidMount: function(info) {
      let time = null;

      if( info.event.end && info.event.start != info.event.end) {
        time =  info.event.startStr.slice(0, 10)+' '+info.event.startStr.slice(11, 16)
        + ' - ' +
        info.event.endStr.slice(0, 10) +' '+info.event.endStr.slice(11, 16);
      } else {
        time = info.event.allDay ?  '하루종일' : 
        info.event.startStr.slice(0, 10)+' '+info.event.startStr.slice(11, 16)
        + ' - ' +
        info.event.endStr.slice(0, 10) +' '+info.event.endStr.slice(11, 16);
      }
      
      tippy(info.el, {
          content:  `<div style="padding:5px">
          <div class="tippy-title" style="background-color:${info.event.backgroundColor}">
            <p>${info.event.title}</p>
          </div>
          <p class="tippy-content"> 기간 : ${time}</p>
          </div>`
         //이벤트 타이틀을 툴팁으로 가져옵니다. 
          ,placement: 'top'
          ,theme: 'lavendar'
          ,animation: 'scale'
          , delay: [500,0]
          ,allowHTML: true
          //content:  info.event.extendedProps.description,//이벤트 디스크립션을 툴팁으로
          });
      },

  });
  //캘린더 출력
  printCalendarEvent(calendar);

  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    timeZone: 'Asia/Seoul'
  };
  
  const currentKRDate = new Date().toLocaleString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2');
  
  console.log(currentKRDate);

  //캘린더 하단 리스트 날짜 업데이트 
  let currentDay = document.querySelector("#ms4")
  let dayIndex = 0;
  updateDate(dayIndex, currentDay);

  // 캘린더에서 선택한 날짜 (스코프)
  let clickedDate = null;
  let cMonth = null; let cDay = null; let cDate = null;
  let todoDeleteBtns = document.querySelectorAll('.todo-delete-button');
  let checkboxes = document.querySelectorAll('.todo-checkbox');

  checkboxes = document.querySelectorAll('.todoListSection input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    addCheckboxEventListener(checkbox);
  });

  //캘린더에서 날짜 클릭
  calendar.on('dateClick', (info) => {
    console.log('clicked on ' + info.dateStr);
    clickedDate = new Date(info.dateStr);
    cMonth = (clickedDate.getMonth() + 1).toString().padStart(2, '0');
    cDay = clickedDate.getDate().toString().padStart(2, '0');
    cDate = clickedDate.toLocaleString('en-US', { weekday: 'short' }).toLowerCase();

    //캘린더 아래에 클릭한 날짜 출력
    let currentDay = document.querySelector("#ms4");
    let clickedDateContainer = currentDay.querySelector(".ms-today-day")
    clickedDateContainer.innerText = cMonth + "." + cDay + " " + cDate;
    //clickedDateContainer.innerHTML = `${cMonth}.${cDay} ${cDate}`
    clickedDateContainer.classList.toggle('flipped')

    // 업데이트된 Todo List & Schedule List 조회
    updateTodoList(clickedDate, checkboxes);
    updateScheduleList(clickedDate);

    checkboxes = document.querySelectorAll('.todoListSection input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      addCheckboxEventListener(checkbox);
    });
  }); // onclick calendar end


  let todoListBox = document.querySelector('.todo-list-box');
  //하단 픽스드 버튼 이벤트
  let plus1 = document.querySelector('.plus');
  let plusDetail = document.querySelector('.plusDetail');
  let plusTodo = document.querySelector('.plus-todo');
  let plusSchedule = document.querySelector('.plus-schedule');

  const formContainer = document.getElementById('todo-add-form-section');
  const showDelBtn = document.querySelector('.show-del-btn');
  let todoAddForm = null;

  //투두 리스트 박스 클릭 시에 투두 입력창 생성
  // todoListBox.onclick = (e) => {
  //   e.preventDefault();
  
  //   if (e.target.classList.contains('show-del-btn')) {
  //     return;
  //   }
  //   else if (e.target.classList.contains('todoListSection')) {
  //     return;
  //   }
  //   else {
  //     if (!todoAddForm) {
  //       createTodoForm();
  //     } else if (!todoAddForm.contains(document.activeElement)) {
  //       removeTodoForm();
  //     }
  //   }
  // };

  //투두의 편집 버튼 클릭
  showDelBtn.onclick =(e)=> {
    e.preventDefault;

    todoDeleteBtns = document.querySelectorAll(".todo-delete-button");
    console.log('편집 버튼을 클릭햇다')

    todoDeleteBtns.forEach(delBtn => {
      delBtn.classList.toggle('act')

      delBtn.onclick = (e) => {
        e.preventDefault();

        const id = e.target.dataset.id;

        fetch(`/api/todos/${id}`, {
          method: "DELETE"
        })
          .then(response => {
            if (response.ok) {
              // 성공적으로 요청이 처리된 경우의 동작
              console.log('삭제 성공~!');
              if (!clickedDate)
                clickedDate = currentKRDate
                updateTodoList(clickedDate)
            } else {
              // 요청이 실패한 경우의 동작
              console.error('삭제 실패');
            }
          })
          .catch(error => {
            // 네트워크 오류 등 예외 처리
            console.error('폼 제출 오류:', error);
          });
      }//deBtn onclick end

    })
  }

  // 픽스드 < + > 버튼 클릭
  plus1.addEventListener('click', () => {
    plusDetail.classList.toggle('act');
  })

  //< 할 일 > 버튼 클릭
  plusTodo.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('투두 버튼 클릭햇음다')

    // 투두 Input 폼 생성
    if (!todoAddForm) {
      createTodoForm()
    } else {
      removeTodoForm()
    }
  })

  // 투두 Input 폼 생성
  function createTodoForm() {

    if (todoAddForm) return;

    todoAddForm = document.createElement('form');
    todoAddForm.className = 'todo-add-form';
    // todoAddForm.method = 'post';
    // todoAddForm.action = 'post';

    const contentInput = document.createElement('input');
    contentInput.className = 'todo-content-input';
    contentInput.type = 'text';
    contentInput.name = 'content';
    contentInput.placeholder = '추가할 할 일을 입력하세요';

    todoAddForm.appendChild(contentInput);
    formContainer.appendChild(todoAddForm);

    // 폼이 생성될 때만 한 번 등록
    document.addEventListener('keydown', handleFormSubmit);
  }//createTodoForm end

  // 투두 Input 폼 제거
  function removeTodoForm() {
    if (!todoAddForm) return;

    formContainer.removeChild(todoAddForm);
    todoAddForm = null;

    // 폼이 제거될 때 등록 해제
    document.removeEventListener('keydown', handleFormSubmit);
  }//removeTodoForm end 


  // 투두(할일)추가용 엔터키 이벤트 핸들러
  // function handleFormSubmit(e) {
  //   if (e.key === 'Enter' &&
  //   todoAddForm.contains(document.activeElement) &&
  //   document.querySelector(".todo-content-input").value != ""
  //   ) {
  //     e.preventDefault(); // 기본 동작인 새로운 줄 추가 방지
  //     console.log('enter-key 입력')

  //     const formData = new FormData(todoAddForm);

  //     if (!clickedDate)
  //       clickedDate = currentKRDate
  //       console.log('클릭 된 날짜가 없어 시스템 날짜로 등록됩니다'+ clickedDate)
      
  //       const todoData = {
  //       date: clickedDate,
  //       content: formData.get('content')
  //     };

  //     fetch("/api/todos", {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(todoData) // 폼 데이터를 URL 인코딩하여 전송
  //     })
  //       .then(response => {
  //         if (response.ok) {
  //           // 성공적으로 요청이 처리된 경우의 동작
  //           console.log('폼 제출 성공');
  //           updateTodoList(clickedDate)
  //           document.querySelector(".todo-content-input").value = "";

  //         } else {
  //           // 요청이 실패한 경우의 동작
  //           console.error('폼 제출 실패');
  //         }
  //       })
  //       .catch(error => {
  //         // 네트워크 오류 등 예외 처리
  //         console.error('폼 제출 오류:', error);
  //       });
  //   }
  // }// 엔터키 핸들러 end

  // 투두(할일)추가용 엔터키 이벤트 핸들러
function handleFormSubmit(e) {
  if (e.key !== 'Enter' || !todoAddForm ||
   !todoAddForm.contains(document.activeElement)) {
    return;
  }

  e.preventDefault(); // 기본 동작인 새로운 줄 추가 방지
  console.log('enter-key 입력');

  const contentInput = document.querySelector('.todo-content-input');
  const content = contentInput.value.trim();
  if (!content || contentInput.dataset.isPosting === 'true') {
    return;
  }

  contentInput.dataset.isPosting = 'true'; // 포스트 요청 중임을 나타내는 플래그 설정

  const formData = new FormData();
  formData.append('content', content);

  if (!clickedDate) {
    clickedDate = currentKRDate;
    console.log('클릭 된 날짜가 없어 현재 시스템 날짜로 등록됩니다', clickedDate);
  }

  const todoData = {
    date: clickedDate,
    content: content
  };

  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todoData) // 폼 데이터를 URL 인코딩하여 전송
  })
    .then(response => {
      if (response.ok) {
        // 성공적으로 요청이 처리된 경우의 동작
        console.log('폼 제출 성공');
        updateTodoList(clickedDate);
        contentInput.value = '';
      } else {
        // 요청이 실패한 경우의 동작
        console.error('폼 제출 실패');
      }
    })
    .catch(error => {
      // 네트워크 오류 등 예외 처리
      console.error('폼 제출 오류:', error);
    })
    .finally(() => {
      contentInput.dataset.isPosting = 'false'; // 포스트 요청 완료를 나타내는 플래그 설정
    });
}


});// DOM road end


// 캘린더 하단 : 리스트 섹션 날짜 출력 및 설정
function updateDate(offset, currentDay) {
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

  return currentDay.querySelector('.ms-today-day').innerText = month + "." + date + " " + day;
}//updateDate end

// 투두 리스트 업데이트 
function updateTodoList(clickedDate, checkboxes) {
  let todoElements = document.querySelector('.todoListSection');

  // 클릭한 투두 비교 및 출력하기.
  fetch(`http://localhost:8080/api/todos?`)
    .then(response => response.json())
    .then(list => {
      // 기존에 출력된 투두 리스트 지우기
      todoElements.innerHTML = '';

      for (let todo of list) {
        let tododate = new Date(todo.date).toISOString().substring(0, 10);

        if (clickedDate == null)
          clickedDate = new Date().toISOString().substring(0, 10);
        // 클릭한 날짜와 Todo 날짜 비교
        if (
          new Date(clickedDate).toISOString().substring(0, 10) === tododate 
        ) {
          // 투두 출력하기
          if (clickedDate) {
            let todoTemplate = `
                <li class="todoList">
                  <div class="content">
                    <input type="checkbox" name="statement" data-id="${todo.id}" ${todo.statement ? 'checked' : ''}>
                    <p class="todo-content">${todo.content}</p>
                    <button class="todo-delete-button" data-id="${todo.id}">x</button>
                  </div>
                </li>
              `;
            todoElements.insertAdjacentHTML("beforeend", todoTemplate);


          } else {
            let noTodoTemplate = `
                <li class="todoList">
                  <div class="content">
                    <p>일정이 없습니다.</p>
                  </div>
                </li>
              `;
            todoElements.insertAdjacentHTML("beforeend", noTodoTemplate);
          }
        }
      }
      // 체크박스 이벤트 리스너 등록
      checkboxes = document.querySelectorAll('.todoListSection input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        addCheckboxEventListener(checkbox);
      });
    })
    .catch(error => {
      console.error("투두를 가져오는 중 오류 발생:", error);
    });
}//updateTodoList end

// 스케쥴 리스트 업데이트
function updateScheduleList(clickedDate) {
  let scheduleElements = document.querySelector('.scheduleListSection');

  //클릭한 스케쥴 비교 및 출력하기.
  fetch(`http://localhost:8080/api/schedules?`)
    .then(response => response.json())
    .then(list => {

      // 기존에 출력된 스케줄 지우기
      scheduleElements.innerHTML = '';

      for (let schedule of list) {
        let scheduleStartDate = new Date(schedule.startDate);
        let scheduleEndDate = new Date(schedule.endDate)

        // 날짜 비교를 위해 clickedDate와 scheduleStartDate의 년, 월, 일을 비교
        if (
          clickedDate.getFullYear() >= scheduleStartDate.getFullYear() &&
          clickedDate.getMonth() >= scheduleStartDate.getMonth() &&
          clickedDate.getDate() >= scheduleStartDate.getDate() &&
          clickedDate.getFullYear() <= scheduleEndDate.getFullYear() &&
          clickedDate.getMonth() <= scheduleEndDate.getMonth() &&
          clickedDate.getDate() <= scheduleEndDate.getDate()
        ) {

          //스케쥴 출력하기     
          let itemTemplate = `
           <li class="scheduleList">
             <div class="content">
               <a href=../schedule/detail?id=${schedule.id}>${schedule.title}</a>
             </div>
           </li>`;

          scheduleElements.insertAdjacentHTML("beforeend", itemTemplate);
        }
      }
    })
    .catch(error => {
      console.error("Error fetching schedules:", error);
    });
}//updateScheduleList end




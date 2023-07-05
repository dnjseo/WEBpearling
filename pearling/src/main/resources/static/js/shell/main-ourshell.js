
/* ===================== 오늘 날짜 달력 섹션 ===================== */

window.addEventListener("DOMContentLoaded", function () {
  let todayIndex = 0;
  let currentDay = null;
  const todaySection = document.querySelector("#m2-today");

  updateDate(todayIndex); // 현재 날짜로 업데이트

  function updateDate(offset) {
    let today = new Date();
    today.setDate(today.getDate() + offset);
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDay();
    let date = today.getDate();
    currentDay = `${year}-${String(month+ 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    console.log(currentDay)

    switch (month) {
      case 0: month = "january"; break;
      case 1: month = "february"; break;
      case 2: month = "march"; break;
      case 3: month = "april"; break;
      case 4: month = "may"; break;
      case 5: month = "june"; break;
      case 6: month = "july"; break;
      case 7: month = "august"; break;
      case 8: month = "september"; break;
      case 9: month = "october"; break;
      case 10: month = "november"; break;
      case 11: month = "december"; break;
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

    todaySection.querySelector('.today-m').innerText = month;
    todaySection.querySelector('.today-day').innerText = day;
    todaySection.querySelector('.today-date').innerText = date; 
  
  }

  todaySection.querySelector(".todayLeft").addEventListener("click", function () {
    todayIndex--; // 어제 날짜로 업데이트
    updateDate(todayIndex);
  });

  todaySection.querySelector(".todayRight").addEventListener("click", function () {
    todayIndex++; // 내일 날짜로 업데이트
    updateDate(todayIndex);
  });


  printFriendScheduleList(currentDay);



});

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function printFriendScheduleList(currentDay){
  // const todoPromise = fetch(todoUrl).then(response => response.json());
  // const schedulePromise = fetch(scheduleUrl).then(response => response.json());
  let date = currentDay;
  
  fetch('/api/follow/followerList')
  .then(response => response.json())
  .then(followerList => {
    console.log(followerList);
    
    followerList.forEach(follower => {
    const userId = follower.id;

    let todoContent;
    let todoStatement;
    let scheduleTitle;
    let scheduleStartDate;


    // Fetch todo list
        fetch(`/api/todos/ourshell/${userId}?date=${date}`)
        .then(response => response.json())
        .then(todoList => {
          console.log(`Todo List for user ${userId}:`, todoList);

          todoContent = todoList.content;
          todoStatement = todoList.statement;


        });
        
    // Fetch schedule list
        fetch(`/api/schedules/${userId}`)
        .then(response => response.json())
        .then(scheduleList => {
          console.log(`Schedule List for user ${userId}:`, scheduleList);
        });


        let profile = `
        <div class="profile-x">
          <img src="/resources/img/${follower.profileImage}">
          <p>${follower.nickname}</p>
        </div>
      `;

      // HTML 추가
      document.querySelector('.friendScheduleList .profile-x').insertAdjacentHTML('beforeend', profile);

      });//forEach end

   })

    


      // <p class="schedule-titles">할 일.</p>
      // <ul class=todoListSection id="mstodoList">
      //   <li class="todoList">
      //       <div class="content">
      //           <input class="todo-checkbox" type="checkbox" disabled>
      //           <p class="todo-content"></p>
      //       </div>
      //   </li>
      // </ul>

      // <p class="schedule-titles">일정.</p>
      // <ul class=scheduleListSection>
      //     <li class="scheduleList" >
      //         <div class="content">
      //             <a class="sche-link>비색의 탄환</a>
      //         </div>
      //         <div class="tag">
      //             <!-- <button></button> -->
      //         </div>
      //     </li>
      // </ul>
      
      // </div>


}
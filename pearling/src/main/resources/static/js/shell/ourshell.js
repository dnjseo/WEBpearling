
window.addEventListener("load", () => {
  let today = new Date(); 
  let osDate = {
    year: today.getFullYear(),
    month: String(today.getMonth() + 1).padStart(2, '0'),
    day: String(today.getDate()).padStart(2, '0')
  };
  
  printFriendScheduleList(osDate);
  changeDate({osDate});

});

//날짜 변경하여 출력.
function changeDate({osDate}){
  const left = document.querySelector('.todayLeft')
  const right = document.querySelector('.todayRight')

  left.onclick = (e) => {
    const { year, month, day } = osDate;
    e.preventDefault();
    let today = new Date(`${year}-${month}-${day}`);
    today.setDate(today.getDate() - 1);
    osDate = {
      year: today.getFullYear(),
      month: String(today.getMonth() + 1).padStart(2, '0'),
      day: String(today.getDate()).padStart(2, '0')
    };
    printFriendScheduleList(osDate);
  };

  right.onclick = (e) => {
    e.preventDefault();
    const { year, month, day } = osDate;
    let today = new Date(`${year}-${month}-${day}`);
    today.setDate(today.getDate() + 1);
    osDate = {
      year: today.getFullYear(),
      month: String(today.getMonth() + 1).padStart(2, '0'),
      day: String(today.getDate()).padStart(2, '0')
    };
    printFriendScheduleList(osDate);
  };

}//changeDate end

// 친구의 일정 출력.
async function printFriendScheduleList(osDate) {
  let date = `${osDate.year}-${osDate.month}-${osDate.day}`;
  document.querySelector('#os-fl').innerHTML = '';

  try {
    const response = await fetch('/api/follow/followerList');
    const followerList = await response.json();

    for (const follower of followerList) {
      const userId = follower.id;

      //투두 리스트
      const todoResponse = await fetch(`/api/todos/ourshell/${userId}?date=${date}`);
      const todoList = await todoResponse.json();
      console.log(`Todo List for user ${userId}:`, todoList);

      let todoItems = '';
      todoList.forEach(todo => {
        todoItems += `
          <li>
            <div class="content">
              <input type="checkbox" ${todo.statement ? 'checked' : ''}  disabled>
              <p>${todo.content}</p> 
            </div>
          </li>
        `;
      });

      // 스케쥴 리스트
      const scheduleResponse = await fetch(`/api/schedules/ourshell/${userId}?date=${date}`);
      const scheduleList = await scheduleResponse.json();
      console.log(`Schedule List for user ${userId}:`, scheduleList);

      let scheduleItems = '';
      scheduleList.forEach(schedule => {
        scheduleItems += `
          <li>
            <div class="content sc-content">
              <p>${schedule.title}</p> 
            </div>
          </li>
        `;
      });

      let profile = `
        <ul class="friendScheduleList">
          <li class="fs1">
            <div class="profile-x">
              <img src="/resources/img/${follower.profileImage}">
              <p>${follower.nickname}</p>
            </div>
            <div class="scheduleContents">
            <p>${todoItems ? '할 일.' : ''}</p>
              <ul>
                ${todoItems}
              </ul>
            </div>
            <div class="scheduleContents">
            <p>${scheduleItems ? '일정.' : ''}</p>
              <ul>
                ${scheduleItems}
              </ul>
            </div>
          </li>
        </ul>
      `;

      // todo 또는 schedule이 있는 경우만 출력
      if (todoList.length > 0 || scheduleList.length > 0) 
      document.querySelector('#os-fl').insertAdjacentHTML('beforeend', profile);
    }
  } catch (error) {
    console.error(error);
  }
}//printFriendScheduleList end


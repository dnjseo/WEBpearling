function diaryListLoad(url) {
    let diaryListBox = document.querySelector(".diary-list-box");
    let diaryList = document.querySelector(".diary-list")
    // let diary = diaryList.querySelector(".diary");

    fetch(url)
        .then(response => response.json())
        .then(list => {
            diaryList.innerHTML = "";

            for (let diary of list) {

                console.log(list);

                let dateObject = new Date(diary.date);
                let day = dateObject.getDate(); // 일자
                let month = dateObject.toLocaleString('default', { month: 'long' }); // 월 (예: "8월")             

                let itemTemplate = `<li class="diary-detail" data-aos="flip-down" data-aos-duration="2000">
                    <a class="diary-href" href="post?id=${diary.id}">
                        <div class="diary-date">
                            <span>${day}</span>
                            <span>${month}</span>
                        </div>
                        <div class="diary-content">
                            <span>${diary.title}</span>
                            <span>${diary.content}</span>
                        </div>
                        <div class="diary-emog">
                            <span>🫧</span>
                        </div>
                    </a>
                </li>`
                ;

                diaryList.insertAdjacentHTML("beforeend", itemTemplate);
            }
        });
}

window.addEventListener('DOMContentLoaded', function(e) {
    // css 파일이 js 파일보다 먼저 로드될 수 있도록 DOMContentLoaded 사용 
    
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        editable: true,
        initialView: 'dayGridMonth',
    });

    calendar.render();
    calendar.setOption('contentHeight', 350);
    
    calendar.on('dateClick', function(info) {
        let clickedDate = info.dateStr; // 클릭한 날짜 정보 가져오기
        console.log(clickedDate);
        diaryListLoad(`http://localhost:8080/api/diary/${clickedDate}`);
    });
});
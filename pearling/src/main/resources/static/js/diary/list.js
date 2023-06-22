function diaryListLoad(url) {
    let diaryListBox = document.querySelector(".diary-list-box");
    let diaryList = document.querySelector(".diary-list")
    // let diary = diaryList.querySelector(".diary");

    let mid = document.querySelector("#input-member-id").value;

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
                <form>
                    <div class="diary-date-content">
                        <div class="diary-date">
                            <span>${day}</span>
                            <span>${month}</span>
                        </div>
                        <div class="diary-content">
                            <a class="diary-href" href="post?id=${diary.id}">
                                <span>${diary.title}</span>
                                <span>${diary.content}</span>
                            </a>
                        </div>
                    </div>
                    <div class="diary-heart-comment">
                        <div class="diary-emog">
                            <svg 
                            data-member-id="${mid}"
                            data-diary-id="${diary.id}"
                            class="icon icon-heart ${diary.like ? 'icon-heart-fill' : ''}"></svg>
                            <span>${diary.likeCount}</span>
                        </div>
                        <div class="diary-comment">
                            <span>🦄</span>
                            <span>1</span>
                        </div>
                    </div>
                </form>
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

    let diaryListSection = document.querySelector(".diary-list-section");
    let diaryList = diaryListSection.querySelector(".diary-list");

    diaryList.onclick = function(e) {
        let el = e.target;
        if(!el.classList.contains('icon-heart'))
            return;

        e.preventDefault();

        let { memberId, diaryId } = el.dataset;

        // LIKE 삭제
		if (el.classList.contains("icon-heart-fill")) {
			fetch(`/api/diarylikes/${diaryId}/members/${memberId}`, {
				method: 'DELETE'
			})
				.then(response=>response.text())
				.then(value=>parseInt(value))
				.then(result=>{
					if (result == 1) { // 결과가 1이면 일어날 일
						el.classList.remove("icon-heart-fill");
						// 현재 업데이트된 좋아요를 불러오기
						fetch(`/api/diarylikes/count?dr=${diaryId}`) // diaryId에 해당하는 diary의 정보를 불러오고
						.then(response=>response.json()) // 정보를 json 형식으로 담아줌
						.then(count=> { // count라는 이름에 json 객체를 담아주고
							el.nextElementSibling.innerText = count;
							console.log(`count is ${count}`);
						});
					}
				});
		}

		// LIKE 추가
		 else {
			let data = `dr=${diaryId}&mb=${memberId}`;

			fetch("/api/diarylikes", { // 보낼 api: POST/diaryLikes
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams(data) // 파라미터로 data 값 넘기기
			})
				.then(response=>response.text())
				.then(value=>parseInt(value)) // value를 정수형으로 변환
				.then(result=> { 
					if (result == 1) { // 결과가 1이면 일어날 일
						el.classList.add("icon-heart-fill");
						// 현재 업데이트된 좋아요를 불러오기
						fetch(`/api/diarylikes/count?dr=${diaryId}`) // diaryId에 해당하는 diary의 정보를 불러오고
						.then(response=>response.json()) // 정보를 json 형식으로 담아줌
						.then(count=> { // count라는 이름에 json 객체를 담아주고
							el.nextElementSibling.innerText = count;
							console.log(`count is ${count}`);
						});
					}
				});

			// catch -> 네트워크 오류에 대한 응답
		}
    }
});
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
                
                let urlParams = new URLSearchParams(window.location.search);
                let uid = urlParams.get('uid');

                if(uid == mid) {
                    userId = mid;
                } else if(uid == null) {
                    userId = mid;                    
                } else {
                    userId = uid;
                }

                console.log("mid 확인" + mid);
                console.log("uid 확인" + userId);

                let itemTemplate = `<li class="diary-detail" data-aos="flip-down" data-aos-duration="2000">
                <form>
                    <div class="diary-date-content">
                        <div class="diary-date">
                            <span>${day}</span>
                            <span>${month}</span>
                        </div>
                        <div class="diary-content">
                            <a class="diary-href" href="post?id=${diary.id}&uid=${userId}">
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
                            <svg 
                            data-member-id="${mid}"
                            data-diary-id="${diary.id}"
                            class="icon icon-comment"  ${diary.comment ? 'icon-comment-fill' : ''}"></svg>
                            <span>${diary.commentCount}</span>
                        </div>
                    </div>
                </form>
                </li>`
                ;

                diaryList.insertAdjacentHTML("beforeend", itemTemplate);

            }
        });
}

function formatDate(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

window.addEventListener('DOMContentLoaded', function(e) {
    // css 파일이 js 파일보다 먼저 로드될 수 있도록 DOMContentLoaded 사용 

    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('uid');
    let loginId = document.querySelector("#input-member-id").value;
    let postAddBtn = document.querySelector(".add-btn");

    if(userId == loginId || urlParams == "") 
        postAddBtn.style.display = "block";
    else
        postAddBtn.style.display = "none";

    // 캘린더 호출
        
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        editable: true,
        initialView: 'dayGridWeek',
    });

    calendar.render();
    calendar.setOption('contentHeight', 350);

    let clickedDate = null;
    let formattedDate = null;
    let nextDateBtn = document.querySelector(".fc-next-button");
    let preDateBtn = document.querySelector(".fc-prev-button");
    let dateBag = document.querySelector('.fc-daygrid-day-frame');
      
    nextDateBtn.addEventListener('click', function(info) {
        clickedDate = calendar.getDate();
        formattedDate = formatDate(clickedDate);
        // calendar.gotoDate( clickedDate );
        document.querySelector('.fc-daygrid-day-frame').style.background = 'rgba(244, 180, 214, 0.609)';
        let id = (userId == null || loginId == userId) ? loginId : userId;
        diaryListLoad(`/api/diary/${formattedDate}/${id}`);
      });
      
      preDateBtn.addEventListener('click', function(info) {
        clickedDate = calendar.getDate();
        formattedDate = formatDate(clickedDate);
        let id = (userId == null || loginId == userId) ? loginId : userId;
        document.querySelector('.fc-daygrid-day-frame').style.background = 'rgba(244, 180, 214, 0.609)';
        // console.log(formattedDate);
        diaryListLoad(`/api/diary/${formattedDate}/${id}`);
      });

    calendar.on('dateClick', function(info) {
        clickedDate = info.dateStr; // 클릭한 날짜 정보 가져오기

        let id = null;

        if(userId == null) {
            id = loginId;
        } else if(loginId == userId) {
            id = loginId;
        } else {
            id = userId;
        }

        console.log(clickedDate);
        document.querySelector('.fc-daygrid-day-frame').style.background = 'none';
        diaryListLoad(`/api/diary/${clickedDate}/${id}`);
    });
    
    let diaryListSection = document.querySelector(".diary-list-section");
    let diaryList = diaryListSection.querySelector(".diary-list");

    diaryList.onclick = function(e) {
        let el = e.target;
        if(!el.classList.contains('icon-heart'))
            return;

        e.preventDefault();

        let { memberId, diaryId } = el.dataset;

        let urlParams = new URLSearchParams(window.location.search);
        let userId = urlParams.get('uid');

        let id;
        if(userId == null) {
            id = memberId;
        } else if(memberId == userId) {
            id = memberId;
        } else {
            id = userId;
        }

        console.log("이것이죠" + userId);
        console.log("이것입니다" + memberId);

        // LIKE 삭제
		if (el.classList.contains("icon-heart-fill")) {
			fetch(`/api/diarylikes/${diaryId}/members/${id}`, {
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
							el.nextElementSibling.innerText = count; // target의 형제 요소 텍스트 변경
							console.log(`count is ${count}`);
						});
					}
				});
		}

		// LIKE 추가
		 else {
			let data = `dr=${diaryId}&mb=${id}`;

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
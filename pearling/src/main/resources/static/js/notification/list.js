function getRelativeTime(dateString) {
    const now = moment(); // 현재 시간
    const date = moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ"); // 등록일시

    const elapsed = now.diff(date);
    const duration = moment.duration(elapsed);

    const seconds = duration.seconds();
    const minutes = duration.minutes();
    const hours = duration.hours();
    const days = duration.days();
    const weeks = duration.weeks();
    const months = duration.months();
    const years = duration.years();

    if (minutes < 1) {
        return `${seconds}초 전`;
    } else if (hours < 1) {
        return `${minutes}분 전`;
    } else if (days < 1) {
        return `${hours}시간 전`;
    } else if (weeks < 1) {
        return `${days}일 전`;
    } else if (months < 1) {
        return `${weeks}주 전`;
    } else if (years < 1) {
        return `${months}개월 전`;
    } else {
        return `${years}년 전`;
    }
}

/* ----------------- 알림 동적으로 조회 불러오기 ----------------- */

function notificationListLoad(url) {
    let notiSection = document.querySelector(".noti-section");
    let notiList = notiSection.querySelector("#noti-container");

    fetch(url)
        .then(response => response.json())
        .then(list => {

            if (list.length === 0) {
                notiList.innerHTML = "<div class='noti-empty'><span>알림이 없습니다.<span></div>";
            } else {
                notiList.innerHTML = "";

                for (let i=0; i<list.length; i++) {
                    let notification = list[i];
                    let delay = 300 * i; 

                    let itemTemplate = `
                        <div class="noti" data-aos="fade-down-right" data-aos-duration="3000" data-aos-delay="${delay}"
                        data-aos-anchor-placement="top-bottom">
                            <div class="noti-box">
                                <div>
                                    <img src="/images/logo/mainlogo.png">
                                    <div class="noti-logo">PEARLING</div>
                                </div>
                                <div class="noti-regdate">
                                    <span>${notification.regDate}</span>
                                </div>
                            </div>
                            <div class="noti-content">${notification.message}</div>
                            <div class="noti-btn-box">
                                <button class="noti-up-btn" value=${notification.id}>keep...</button>
                                <button class="noti-del-btn" value=${notification.id}>delete...</button>
                                <input name="input-isread-value" type="hidden" value="${notification.isRead}">
                            </div>
                            <input id="input-member-id" name="input-user-id" type="hidden">
                        </div>`;

                    notiList.insertAdjacentHTML("beforeend", itemTemplate);
                }
            }

            addClickEventListeners();

            const regDateElements = document.querySelectorAll(".noti-regdate");
            regDateElements.forEach(function (element) {
                const regDateString = element.textContent;
                console.log("regDateString : " + element.textContent)
                const relativeTime = getRelativeTime(regDateString);
                console.log("relativeTime : " + relativeTime)
                element.textContent = relativeTime;

                console.log(element.textContent);
            });

        })
        .catch((error) => {
            console.error('알림 리스트 호출 중 오류가 발생했습니다', error);
        });
}

/* ----------------- PUT 요청 처리 ----------------- */
function handleNotiUpdate(id, jsonData) {
    let notiSection = document.querySelector(".noti-section");
    let notiList = notiSection.querySelector(".noti");

    let userIdInput = document.querySelector("#input-member-id");
    let userId = userIdInput.value;
    console.log("update 할 시" + userId);

    fetch(`/api/notifications/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonData,
    })
        .then((response) => {
            if (response.ok) {
                console.log("성공시 id" + id);
                console.log("성공시 jsondata" + jsonData);
                console.log('알림 업데이트가 완료되었습니다.');
                notiList.innerHTML = "";
                notificationListLoad(`/api/notifications/list/${userId}`);
            } else {
                console.error('알림 업데이트에 실패했습니다.');
            }
        })
        .catch(function (error) {
            console.error('알림 업데이트 중 오류가 발생했습니다.', error);
        });
}

/* ----------------- Delete 요청 처리 ----------------- */
function handleNotiDelete(id) {
    let notiCateBox = document.querySelector(".noti-cate-box");
    let notiSection = document.querySelector(".noti-section");
    let notiList = notiSection.querySelector(".noti");

    let userIdInput = document.querySelector("#input-member-id");
    let userId = userIdInput.value;

    console.log("delete 할 시" + userId);

    fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (response.ok) {
                console.log('알림 삭제가 완료되었습니다.');
                // notiList.innerHTML = "";
                notiList.remove();
                
                // Pre-Noti 버튼을 눌렀을 경우
                if (notiCateBox.querySelector(".pre-noti-list").classList.contains("active")) {
                    notificationListLoad(`/api/notifications/${userId}`);
                } 
                // No-Read Noti 버튼을 눌렀을 경우
                else if (notiCateBox.querySelector(".noread-noti-list").classList.contains("active")) {
                    notificationListLoad(`/api/notifications/list/${userId}`);
                }
                
                // 추가적인 동작이 필요하다면 여기에서 처리합니다.
            } else {
                console.error('알림 삭제에 실패했습니다.');
                // 추가적인 에러 처리 등을 수행합니다.
            }
        })
        .catch((error) => {
            console.error('알림 삭제 중 오류가 발생했습니다.', error);
        });
}

/* ----------------- 클릭 이벤트(DELETE, POST, PUT) ----------------- */

function addClickEventListeners() {
    let notiContainer = document.querySelector("#noti-container");
    let notiList = notiContainer.querySelectorAll(".noti"); // 여러 개의 알림 요소를 선택해야 하므로 querySelectorAll을 사용합니다.
    let isReadInput = document.querySelector('input[name="input-isread-value"]');
    let isReadValue = isReadInput.value;

    notiList.forEach(function (notiItem) {
        notiItem.addEventListener('click', function (e) {
            let notiIdInput = notiItem.querySelector(".noti-up-btn");
            let id = notiIdInput.value;

            if (e.target.classList.contains('noti-up-btn')) {
                isReadValue = true;
                let isRead = isReadValue;
                let formData = { id, isRead };
                let jsonData = JSON.stringify(formData);
                handleNotiUpdate(id, jsonData);
            }

            if (e.target.classList.contains('noti-del-btn')) {
                handleNotiDelete(id);
            }
        });
    });
}


/* ----------------- 윈도우 로드 시 알림 리스트 조회 ----------------- */

window.addEventListener('load', function (e) {

    // const regDateElements = document.querySelectorAll(".noti-regdate");
    // regDateElements.forEach(function (element) {
    //     const regDateString = element.textContent;
    //     const relativeTime = getRelativeTime(regDateString);
    //     element.textContent = relativeTime;
    // });

    let getTitleSpan = document.querySelector('.title');
    getTitleSpan.textContent = "알림 센터";

    let preNotiListBtn = document.querySelector(".pre-noti-list");
    let noReadNotiListBtn = document.querySelector(".noread-noti-list");
    let userIdInput = document.querySelector('input[name="input-user-id"]');
    let loginIdInput = document.querySelector('input[name="input-login-id"]');

    let userId = "";

    if (userIdInput && userIdInput.value !== "") {
        userId = userIdInput.value;
    } else if (loginIdInput && loginIdInput.value !== "") {
        userId = loginIdInput.value;
    }

    notificationListLoad(`/api/notifications/list/${userId}`);

    preNotiListBtn.addEventListener('click', function (e) {
        e.preventDefault();
        notificationListLoad(`/api/notifications/${userId}`);
    });

    noReadNotiListBtn.addEventListener('click', function (e) {
        e.preventDefault();
        notificationListLoad(`/api/notifications/list/${userId}`);
    });

    addClickEventListeners();

});

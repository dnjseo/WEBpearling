function getRelativeTime(dateString) {
    const now = moment(); // 현재 시간
    const date = moment(dateString, "ddd MMM DD HH:mm:ss z YYYY"); // 등록일시

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
            notiList.innerHTML = "";

            for (let notification of list) {

                let itemTemplate = `
                <div class="noti">
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
            
            addClickEventListeners();
            // const regDateElements = document.querySelectorAll(".noti-regdate");
            // regDateElements.forEach(function (regDateElement) {
            //     const regDateString = regDateElement.querySelector("span").textContent;
            //     const relativeTime = getRelativeTime(regDateString);
            //     regDateElement.querySelector("span").textContent = relativeTime;
            // });


        })
        .catch((error) => {
            console.error('알림 리스트 호출 중 오류가 발생했습니다', error);
        });
}

/* ----------------- PUT 요청 처리 ----------------- */
function handleNotiUpdate(id, jsonData, userId) {
    let notiSection = document.querySelector(".noti-section");
    let notiList = notiSection.querySelector(".noti");

    userId = document.querySelector('input[name="input-user-id"]').value;

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
                notiList.innerHTML = "";
                console.log('알림 업데이트가 완료되었습니다.');
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
function handleNotiDelete(id, userId) {
    let notiSection = document.querySelector(".noti-section");
    let notiList = notiSection.querySelector(".noti");

    userId = document.querySelector('input[name="input-user-id"]').value;

    fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (response.ok) {
                notiList.innerHTML = ""
                console.log('알림 삭제가 완료되었습니다.');
                notificationListLoad(`/api/notifications/list/${userId}`);
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

            if (e.target.classList.contains('noti-up-btn')) {
                let notiIdInput = notiItem.querySelector(".noti-up-btn");
                let id = notiIdInput.value;

                isReadValue = true;
                let isRead = isReadValue;
                let formData = { id, isRead };
                let jsonData = JSON.stringify(formData);
                handleNotiUpdate(id, jsonData, userId);
            }

            if (e.target.classList.contains('noti-del-btn')) {
                let notiIdInput = notiItem.querySelector(".noti-del-btn");
                let id = notiIdInput.value;
                handleNotiDelete(id, userId);
            }
        });
    });
}


/* ----------------- 윈도우 로드 시 알림 리스트 조회 ----------------- */

window.addEventListener('load', function (e) {

    const regDateElements = document.querySelectorAll(".noti-regdate");
    regDateElements.forEach(function (element) {
        const regDateString = element.textContent;
        const relativeTime = getRelativeTime(regDateString);
        element.textContent = relativeTime;
    });

    let preNotiListBtn = document.querySelector(".pre-noti-list");
    let noReadNotiListBtn = document.querySelector(".noread-noti-list");
    let userId = document.querySelector('input[name="input-user-id"]').value;

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

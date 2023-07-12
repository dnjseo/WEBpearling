window.addEventListener('DOMContentLoaded', function (e) {
    let subMemberIdInput = document.querySelector("#input-member-id");
    let subMemberId = subMemberIdInput.value; // input 요소의 값 가져오기

    const eventSource = new EventSource(`/api/notifications/sub/${subMemberId}`);
    let alert = document.querySelector(".icon-alert");

    let connected = true; // 서버와의 연결 상태 변수

    eventSource.addEventListener('open', function (e) {
        // SSE 연결이 열린 후 실행할 코드
        // connected = true;
    });

    eventSource.addEventListener("sse", function (event) {
        alert.src = '/images/header/alert-on.svg';

        let message = event.data;

        // 알림 템플릿 문자열
        let template = `
            <div class="notification">
                <div class="notification-box">
                    <img src="/images/logo/mainlogo.png">
                    <div class="notification-logo">PEARLING</div>
                </div>
                <div class="notification-content">${message}</div>
            </div>
        `;

        // 알림 컨테이너에 알림 요소 추가
        let notificationContainer = document.getElementById('notification-container');
        notificationContainer.style.animation = 'slide-left 1s';
        notificationContainer.insertAdjacentHTML('beforeend', template);

        // 일정 시간이 지난 후에 알림을 사라지게 함
        setTimeout(() => {
            let notifications = document.getElementsByClassName('notification');
            if (notifications.length > 0) {
                notifications[0].remove();
            }
            if (notificationContainer.children.length === 0) {
                notificationContainer.classList.remove('show');
            }
        }, 5000); // 5000 밀리초 = 5초
    });


    eventSource.addEventListener("error", function (event) {
        // connected = false;
        eventSource.close();
    });

    eventSource.onerror = function (error) {
        // connected = false;
        console.error('SSE error:', error);
        eventSource.close(); // 에러가 발생하면 SSE 연결 종료
    };

    // 새로고침 시 연결 상태에 따라 알림 아이콘 표시
    // window.addEventListener('beforeunload', function (e) {
    //     if (connected) {
    //         notificationIcon.src = '/images/header/alert-on.svg';
    //     } else {
    //         notificationIcon.src = '/images/header/alert.svg';
    //     }
    // });
});

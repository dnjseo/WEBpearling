// SSE 구독
const eventSource = new EventSource('/notifications/subscribe/1'); // {id}는 사용자 ID

// SSE 이벤트 핸들러
eventSource.addEventListener('sse', function(event) {
    const data = JSON.parse(event.data);
    showNotification(data);
});

// 알림 표시
function showNotification(data) {
    if (Notification.permission === 'granted') {
        // 알림 생성
        const notification = new Notification('새로운 알림', {
            body: data.message,
            icon: 'notification-icon.png' // 알림 아이콘 이미지 URL
        });

        // 알림 클릭 이벤트 핸들러
        notification.onclick = function() {
            // 알림을 클릭했을 때 수행할 동작
            // 예: 알림을 클릭하면 해당 알림과 관련된 페이지로 이동
            window.location.href = '#';
        };
    }
}

// 브라우저에서 알림 권한 요청
if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
            console.log('알림 권한이 허용되었습니다.');
        }
    });
}
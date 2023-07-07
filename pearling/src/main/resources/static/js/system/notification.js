// 알림을 받는 페이지에서 SSE 연결을 수립    
let subMemberIdInput = document.querySelector("#input-member-id");
let subMemberId = 4;
console.log(subMemberId);

const eventSource = new EventSource(`/api/notifications/sub/${subMemberId}`);

eventSource.addEventListener("sse", function(event) {
    let message = event.data;

    // let notificationContent = document.getElementById('notification-content');
    let notificationContent = document.createElement('div');
    let notificationContainer = document.getElementById('notification-container');

    notificationContent.classList.add('notification');
    notificationContent.textContent = message;

    notificationContainer.appendChild(notificationContent);

    notificationContainer.classList.add('show');
    setTimeout(() => {
        notificationContainer.classList.remove('show');
    }, 2000);

});

eventSource.addEventListener("error", function(event) {
    eventSource.close();
});

eventSource.onerror = function(error) {
    console.error('SSE error:', error);
    eventSource.close(); // 에러가 발생하면 SSE 연결 종료
};

// eventSource.addEventListener('message', function(event) {
//     console.log(event.data);
//     const notification = JSON.parse(event.data);
//     showNotification(notification.message);
//     console.log(event.data);
// });

// // 알림을 표시하는 함수
// function showNotification(message) {
//     const container = document.getElementById('notification-container');

//     const notificationElement = document.createElement('div');
//     notificationElement.classList.add('notification');
//     notificationElement.textContent = message;

//     container.appendChild(notificationElement);
// }

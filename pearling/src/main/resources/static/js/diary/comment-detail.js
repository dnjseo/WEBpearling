function commentListLoad(url) {
    let commentSection = document.querySelector(".diary-comment-section");
    let commentList = commentSection.querySelector(".comment-list");

    fetch(url)
        .then(response => response.json())
        .then(list => {
            commentList.innerHTML = "";

            for (let comment of list) {

                let commentDate = new Date(comment.regDate);
                let year = commentDate.getFullYear();
                let month = commentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
                let formattedMonth = month < 10 ? `0${month}` : month;
                let day = commentDate.getDate();
                let formattedDay = day < 10 ? `0${day}` : day;
                let hour = commentDate.getHours();
                let formattedHour = hour < 10 ? `0${hour}` : hour;
                let minute = commentDate.getMinutes();
                let formattedMinute = minute < 10 ? `0${minute}` : minute;
                
                let formattedDate = `${year}/${formattedMonth}/${formattedDay} ${formattedHour}:${formattedMinute}`;

                let itemTemplate = `
                    <div class="comment">
                        <span>${comment.regMemberNickname}</span>
                        <span>${comment.content}</span>
                        <div class="del-box">
                            <span>${formattedDate}</span>
                            <button>x</button>
                        </div>
                    </div>`;

                commentList.insertAdjacentHTML("beforeend", itemTemplate);
            }
        });
}

window.addEventListener('DOMContentLoaded', function (e) {
    let diaryPostIdInput = document.querySelector('input[name="diaryPostId"]');
    let diaryId = diaryPostIdInput.value;
    commentListLoad(`/api/diaryComments/${diaryId}`);
});
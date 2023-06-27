window.addEventListener('DOMContentLoaded', function(e) {
    let form = document.querySelector('.diary-comment-form');
    let commentAddBtn = form.querySelector(".comment-add-btn");
  
    commentAddBtn.addEventListener('click', function (e) {
      console.log("클릭되었습니다.");
      e.preventDefault();
  
      let contentInput = form.querySelector('textarea[name="content"]');
      let diaryPostIdInput = form.querySelector('input[name="diaryPostId"]');
  
      let content = contentInput.value;
      let diaryPostId = diaryPostIdInput.value;
  
      let diaryComment = new URLSearchParams();
      diaryComment.append('content', content);
      diaryComment.append('diaryPostId', diaryPostId);
  
      fetch('/api/diaryComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: diaryComment.toString(),
      })
        .then(function (response) {
          if (response.ok) {
            console.log('다이어리 댓글 등록이 완료되었습니다.');
            location.reload();
          } else {
            console.error('다이어리 댓글 등록에 실패했습니다.');
          }
        })
        .catch(function (error) {
          console.error('다이어리 댓글 등록 중 오류가 발생했습니다.', error);
        });
    });
  });
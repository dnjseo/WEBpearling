window.addEventListener('load', function(e) {
    let form = document.querySelector('.diary-comment-form');
    let commentAddBtn = form.querySelector(".comment-add-btn");
  
    commentAddBtn.addEventListener('click', function (e) {
      console.log("클릭되었습니다.");
      e.preventDefault();

      let form = document.querySelector('.diary-comment-form');
      let inputs = form.elements;
      
      let regMemberId = inputs["reg-member-id"].value;
      let content = inputs["content"].value;
      let diaryPostId = inputs["diary-post-id"].value;
      let regMemberNickname = inputs["reg-member-nickname"].value;

      let formData = { regMemberId, content, diaryPostId, regMemberNickname };
      let jsonData = JSON.stringify(formData);

      console.log(jsonData);
  
      fetch('/api/diaryComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
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
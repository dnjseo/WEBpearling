window.addEventListener('DOMContentLoaded', (event) => {
    const deleteButton = document.getElementById('delete-button');
    const checkboxes = document.querySelectorAll('.list-checkbox');
    
    deleteButton.addEventListener('click', () => {
      const selectedList = [];
  
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          const listId = checkbox.getAttribute('data-id');
          selectedList.push(listId);
        }
      });
  
      if (selectedList.length > 0) {
        console.log(selectedList);
        deleteMembers(selectedList);
      }
    });
  
    function deleteMembers(selectedList) {
      const requestData = { value: selectedList };
  
      fetch('/api/admin/membersList-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.ok) {
            console.log('멤버 삭제 성공');
            // 추가 작업 수행 코드 작성
            location.reload(); // 페이지 새로고침
          } else {
            throw new Error('멤버 삭제에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('오류 발생:', error);
        });
    }
});
  
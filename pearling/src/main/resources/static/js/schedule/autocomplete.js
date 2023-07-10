let matchedFollowers = [];
let followers = [];


document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector("#friend-tag-input");
    const autocompleteList = document.querySelector('#autocomplete-list');
    

    fetch('/api/follow/followingList')
    .then(response => response.json())
    .then(followingList => {
      followers = followingList;
    });
    
  // 입력 이벤트를 감지하여 자동완성 기능 활성화
  input.addEventListener('input', function() {
    document.querySelector('#autocomplete-list').classList.add('active')
    
    // 태그되어 있는 친구 조회.
    let tagednicknames = document.querySelectorAll(".already-taged-nicknames");
    let values = [];

    tagednicknames.forEach(function(element) {
      values.push(element.value);
    });
    
    const inputText = input.value.toLowerCase();
    
    matchedFollowers = followers.filter(follower =>
      follower.nickname.toLowerCase().startsWith(inputText)
      );
      
      // 자동완성 목록 초기화
      autocompleteList.innerHTML = '';
      
      if (matchedFollowers.length > 0) { 

        matchedFollowers.forEach(follower => {

          if(!values.includes(follower.nickname)){
          const option = document.createElement('div');
          option.className = 'autocomplete-item';

          const img = document.createElement('img');
          img.src = `/resources/img/${follower.profileImage}`;
          img.className= "tag-img"
          option.appendChild(img);

          const text = document.createElement('span');
          text.textContent = follower.nickname;
          option.appendChild(text);

          option.addEventListener('click', function() {
            input.value = '@'+follower.nickname;
            input.dataset.friendId = follower.id;
            autocompleteList.innerHTML = '';
            
          })
          autocompleteList.appendChild(option);
          }
      });
      }
  });


    // 친구 태그 - 추가 버튼 클릭     
    document.querySelector('.add-friend-btn').onclick = (e) => {

      const tagInput = document.createElement('input');
      tagInput.className = "taged-id-input"
      tagInput.type = "hidden"
      tagInput.name = "friendId"
      tagInput.value = input.dataset.friendId;
      
      let value = `${input.value} `;
      let taged = `
        <div class="taged-item">
          <input class="complete-tag" type="text" value="${value}" disabled>
          <button class="tag-del-btn" type="button"> x </button>
        </div>
      `;
      
      
      //인풋창의 친구가 유효할 경우
      if (followers.some(follower => follower.nickname.toLowerCase() === input.value.toLowerCase().replace('@', ''))) {

        const completedTagBox = document.querySelector('.completed-tag-box');

        // 추가 된 팔로워 리스트에서 삭제
        const deletedNickname = input.value.toLowerCase().replace('@', '');
        const deletedFollower = followers.find(follower => follower.nickname.toLowerCase() === deletedNickname);
        followers = followers.filter(follower => follower.nickname.toLowerCase() !== deletedNickname);
      
        // taged 요소를 생성하여 completedTagBox에 추가
        const tagedElement = document.createElement('div');
        tagedElement.innerHTML = taged;
        completedTagBox.appendChild(tagedElement);
      
        // tagInput 요소를 생성하여 taged 요소에 추가
        const tagedItem = tagedElement.querySelector('.taged-item');
        tagedItem.appendChild(tagInput);
      
        // 태그 삭제 버튼 
        const tagDelBtn = tagedItem.querySelector('.tag-del-btn');
        
        tagDelBtn.addEventListener('click', () => {
          tagedElement.remove();
          
          // 삭제한 친구를 다시 리스트에 추가
          if (deletedFollower) {
            followers.push(deletedFollower);
          }

          });
        }
          
      // 친구 닉네임 입력창 비우기
      input.value = '';
    };

    // 입력 창에 포커스가 가면 자동완성 기능을 활성화.
    input.addEventListener('focus', function() {
      if(input.value.trim() != '')
      return
        input.dispatchEvent(new Event('input'));
        document.querySelector('#autocomplete-list').classList.add('active')
    });
    
    // 입력 창에서 포커스가 벗어나면 자동완성 목록을 비활성화.
    input.addEventListener('blur', function() {
        setTimeout(function() {
          autocompleteList.innerHTML = '';
          document.querySelector('#autocomplete-list').classList.remove('active')
        }, 200);
      });

  });


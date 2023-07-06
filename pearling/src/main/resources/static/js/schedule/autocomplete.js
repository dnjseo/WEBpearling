document.addEventListener('DOMContentLoaded', function() {
    let followers = [];
    const input = document.querySelector("#friend-tag-input");
    const autocompleteList = document.querySelector('#autocomplete-list');

    fetch('/api/follow/followerList')
    .then(response => response.json())
    .then(followerList => {
      followers = followerList;
    });
    
  // 입력 이벤트를 감지하여 자동완성 기능 활성화
  input.addEventListener('input', function() {
    document.querySelector('#autocomplete-list').classList.add('active')

    const inputText = input.value.toLowerCase();
    const matchedFollowers = followers.filter(follower =>
      follower.nickname.toLowerCase().startsWith(inputText)
    );

    // 자동완성 목록 초기화
    autocompleteList.innerHTML = '';

    if (matchedFollowers.length > 0) { 
        matchedFollowers.forEach(follower => {

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
          input.value = follower.nickname;
          autocompleteList.innerHTML = '';

        // 선택된 팔로워를 matchedFollowers 배열에서 제외
        const index = matchedFollowers.indexOf(follower);
        if (index > -1) {
            matchedFollowers.splice(index, 1);
        }

      });

        autocompleteList.appendChild(option);
      });
    }
  });

    // 자동완성 목록에서 선택 시 입력 창에 추가
    autocompleteList.addEventListener('change', function() {
        input.value = autocompleteList.value;
    });

    // 친구 태그 - 추가 버튼 클릭     
    document.querySelector('.add-friend-btn').onclick = (e) => {
        let value = `@${input.value} `
        let taged = `
            <div class="taged-item">
                <input class="complete-tag" type="text" value=${value}>
                <button class="tag-del-btn" type=button> x </button>
                <input type="hidden" name="">
            <div>
        `
        if(input.value)
        document.querySelector('.completed-tag-box').innerHTML += taged
        
        //친구 닉네임 입력창 비우기
        input.value = ''

        // 태그 삭제 버튼 
        let tagDels = document.querySelectorAll('.tag-del-btn');
        tagDels.forEach (btn => 
            btn.onclick = (e) => {
                let tagedItem = e.target.closest('.taged-item');
                if (tagedItem) {
                    tagedItem.remove();

                    // 삭제된 팔로워를 다시 followers 배열에 추가
                    const deletedFollower = followers.find(follower => follower.nickname === deletedNickname);
                    if (deletedFollower) {
                        followers.push(deletedFollower);
                    }

                }
            }  
        )//tagDels forEach end

    };

    // 입력 창에 포커스가 가면 자동완성 기능을 활성화합니다.
    input.addEventListener('focus', function() {
      if(input.value.trim() != '')
      return
        input.dispatchEvent(new Event('input'));
        document.querySelector('#autocomplete-list').classList.add('active')
    });
    
    // 입력 창에서 포커스가 벗어나면 자동완성 목록을 비활성화합니다.
    input.addEventListener('blur', function() {
        setTimeout(function() {
          autocompleteList.innerHTML = '';
          document.querySelector('#autocomplete-list').classList.remove('active')
        }, 200);
      });

  });
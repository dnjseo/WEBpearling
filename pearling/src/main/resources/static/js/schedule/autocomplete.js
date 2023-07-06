document.addEventListener('DOMContentLoaded', function() {

    let keywords = [];
    let followers = [];
    const input = document.querySelector("#friend-tag-input");
    const autocompleteList = document.querySelector('#autocomplete-list');
    let nowIndex = 0;

    fetch('/api/follow/followerList')
    .then(response => response.json())
    .then(followerList => {
      followers = followerList;
      keywords = followerList.map(follower => follower.nickname);
    });
    

  // 입력 이벤트를 감지하여 자동완성 기능 활성화
  input.addEventListener('input', function() {
    const inputText = input.value.toLowerCase();
    const matchedFollowers = followers.filter(follower =>
      follower.nickname.toLowerCase().startsWith(inputText)
    );

    // 자동완성 목록 초기화
    autocompleteList.innerHTML = '';

    // 일치하는 팔로워가 있는 경우 자동완성 목록에 추가
    if (matchedFollowers.length > 0) {
      matchedFollowers.forEach(follower => {
        const option = document.createElement('div');
        option.className = 'autocomplete-item';

        const img = document.createElement('img');
        img.src = `/resources/img/${follower.profileImage}`; // 팔로워의 이미지 URL을 가져옵니다.
        img.className= "tag-img"
        option.appendChild(img);

        const text = document.createElement('span');
        text.textContent = follower.nickname;
        option.appendChild(text);

        option.addEventListener('click', function() {
          input.value = follower.nickname;
          autocompleteList.innerHTML = '';
        });

        autocompleteList.appendChild(option);
      });
    }
  });

    // 자동완성 목록에서 옵션 선택 시 입력 창에 추가
    autocompleteList.addEventListener('change', function() {
        input.value = autocompleteList.value;
        });

    document.querySelector('.add-friend-btn').onclick = (e) => {
        console.log('추가 클릭!')
        let value = `@${input.value} `
        let taged = `
            <input class="complete-tag" type="text" value=${value}>
            <button type=button> x </button>
        `
        if(input.value)
        document.querySelector('.completed-tag-box').innerHTML += taged
        
        input.value = ''
    };

      // 입력 창에 포커스가 가면 자동완성 기능을 활성화합니다.
    input.addEventListener('focus', function() {
        input.dispatchEvent(new Event('input'));
    });
    
    // 입력 창에서 포커스가 벗어나면 자동완성 목록을 비활성화합니다.
    input.addEventListener('blur', function() {
        setTimeout(function() {
          autocompleteList.innerHTML = '';
        }, 200);
      });

  });
  
let beforeColor; //이전에 선택된 컬러 저장 할 변수

//HTML 로딩이 끝난 후
window.onload = function(){
  init();
}

function init(){
  //2차원 배열 파레트 데이터
  let pallet = [["#F8801359", "#96E97082", "#6AB04899", "#3859AD33", "#A0B5FF", "#BEA3C9CC", "#DE4AA382"]];
  let tag = "";
  for(i=0; i<pallet.length; i++){
    for(j=0; j<pallet[i].length; j++){
      tag += "<div id="+pallet[i][j]+" class='colorBox' onclick='colorSet(this)'></div>";
    }
  }
  //파레트 파싱
  document.getElementById("palletBox").innerHTML = tag;

  //색상 입히기
  let colorBox = document.getElementsByClassName("colorBox");
  for(i=0; i<colorBox.length; i++){
    colorBox[i].style.background = colorBox[i].id;
  }
}

// onclick event
function colorSet(target){
  document.querySelector("body").style.background = target.id;

  if(beforeColor != undefined && beforeColor != null){
    document.getElementById(beforeColor).className = document.getElementById(beforeColor).className.replace(" active", "");
  }
  document.getElementById(target.id).className += " active";
  beforeColor = target.id;
}
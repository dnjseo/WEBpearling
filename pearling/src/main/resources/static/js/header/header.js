window.addEventListener("load", function(e) {
  let header = document.getElementById('header');
  let headerclass = header.querySelector('.bgshow');
  let dmf = document.getElementById('dmf');
  let menu = header.querySelector(".menu");
  let close = header.querySelector('.sub-close')
  let subMenu = document.getElementById('sub-menu');
  
  menu.addEventListener('click', function() {
    subMenu.style.right = "0";
    menu.style.display = "none";
    close.style.display = "block";
    dmf.style.display="none";
    header.classList.remove('bgnone');
    header.classList.add('bgshow');
    console.log("클릭");
  });
  
  close.addEventListener('click', function(){
    subMenu.style.right = "-100%";
    menu.style.display = "block"
    close.style.display = "none";
    dmf.style.display="block";
    header.classList.remove('bgshow');
    header.classList.add('bgnone');


  
  });


  // 오늘 날짜 업데이트
   
  let todayIndex = 0;
  const todaySection = document.querySelector(".paragraph");
  
  updateDate(todayIndex); // 현재 날짜로 업데이트

function updateDate(offset) {
    let today = new Date();
    today.setDate(today.getDate() + offset);
    let month = today.getMonth();
    let day = today.getDate().toString().padStart(2, '0');
  

    switch (month) 
    {
      case 0: month = "01"; break;
      case 1: month = "02"; break;
      case 2: month = "03"; break;
      case 3: month = "04"; break;
      case 4: month = "05"; break;
      case 5: month = "06"; break;
      case 6: month = "07"; break;
      case 7: month = "08"; break;
      case 8: month = "09"; break;
      case 9: month = "10"; break;
      case 10: month = "11"; break;
      case 11: month = "12"; break;
    }

    switch(day)
    {
        case 0 : day = "sun"; break; 
        case 1 : day = "mon"; break;
        case 2 : day = "tue"; break;
        case 3 : day = "wed"; break;
        case 4 : day = "thu"; break;
        case 5 : day = "fri"; break;
        case 6 : day = "sat"; break;
    }
    
    todaySection.querySelector('.todayAside').innerText = month+"월 "+day+"일";
  
}



});
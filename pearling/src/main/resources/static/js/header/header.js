window.addEventListener("load", function(e) {
  let header = document.getElementById('header');
  let dmf = document.getElementById('dmf');
  let menu = header.querySelector(".menu");
  let searchIcon = header.querySelector(".searchIcon")
  let searchInput = header.querySelector(".searchInput")
  let close = header.querySelector('.sub-close')
  let subMenu = document.getElementById('sub-menu');
  let logo = header.querySelector('.logo')
  let searchClose = header.querySelector('.search-close');

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
  
  searchIcon.addEventListener('click', function(){
    searchInput.classList.toggle('searchInputShow');
    // logo.classList.toggle('headerLogoimgNone');
    // logo.style.display="none";
    //searchClose.style.display="block";
  });

  searchClose.addEventListener('click', function(){
    // logo.style.display="block";
    // searchInput.classList.toggle('searchInputShow');
    //searchClose.style.display="none";
  });



  

  // 오늘 날짜 업데이트
   
  let todayIndex = 0;
  const todaySection = document.querySelector(".paragraph");
  
  updateDate(todayIndex); // 현재 날짜로 업데이트

function updateDate(offset) {
    let today = new Date();
    today.setDate(today.getDate() + offset);
    let month = today.getMonth();
    let monthEng = today.getMonth();
    let date = today.getDate().toString().padStart(2, '0');
    let day = today.getDay();

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

    switch (monthEng) 
    {
        case 0: monthEng = "january"; break;
        case 1: monthEng = "february"; break;
        case 2: monthEng = "march"; break;
        case 3: monthEng = "april"; break;
        case 4: monthEng = "may"; break;
        case 5: monthEng = "june"; break;
        case 6: monthEng = "july"; break;
        case 7: monthEng = "august"; break;
        case 8: monthEng = "september"; break;
        case 9: monthEng = "october"; break;
        case 10: monthEng = "november"; break;
        case 11: monthEng = "december"; break;
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
    
    todaySection.querySelector('.todayAside').innerText = month+"월 "+date+"일";
    

    todaySection.querySelector('.today-m').innerText = monthEng;
    todaySection.querySelector('.today-day').innerText = day;
    todaySection.querySelector('.today-date').innerText = date;
}



});
document.addEventListener("DOMContentLoaded", function() {
    let followBtns = document.querySelectorAll(".following-statement");
    let isClicked = false;
  
    followBtns.forEach(function(followBtn) {
      followBtn.addEventListener("click", function() {
        if (isClicked) {
          this.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
          this.style.color = "#797979";
          this.innerText = "팔로잉";
          isClicked = false;
        } else {
          this.style.backgroundColor = "rgba(165, 135, 224, 0.2)";
          this.style.color = "#A587E0";
          this.innerText = "팔로우";
          isClicked = true;
        }
      });
    });
  });
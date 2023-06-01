window.addEventListener("load", function () {
    var wrap = this.document.getElementById("wrap");
    var black = wrap.querySelector(".black");
    var section1 = document.getElementById("setting-calander");
    var categoryAdd = section1.querySelector(".category-add");
    var section2 = this.document.getElementById("category-modal")

    categoryAdd.addEventListener("click", function () {
        section2.style.display = "block";
        black.style.display = "block"; 
    });

    // 카테고리 추가창
    var addbtn = section2.querySelector(".addbtn");
    var modal = this.document.getElementById("confirm-modal");

    addbtn.addEventListener("click", function () {
        section2.style.display = "none";
        modal.style.display = "block";
    });

    // 확인창
    var confirmYes = modal.querySelector(".confirm-yes");

    confirmYes.addEventListener("click", function () {
        black.style.display = "none";
        modal.style.display = "none";
    });

});
window.addEventListener("load", function () {
    var wrap = document.getElementById("wrap");
    var book = document.getElementById("s1");
    var addDelete = wrap.querySelector(".add-delete");
    var black = wrap.querySelector(".black");

    var confirmModal = document.getElementById("confirm-modal");
    var confirmYes = confirmModal.querySelector(".confirm-yes");

    addDelete.addEventListener("click", function () {
        book.style.display = "none";
        confirmModal.style.display = "block";

    });

    confirmYes.addEventListener("click", function () {
        confirmModal.style.display = "none"; 
        black.style.display = "none"; 
    });
});
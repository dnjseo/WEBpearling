
window.addEventListener('load', function () {

    let section = document.querySelector(".diary-view-section");
    let commentBtns = section.querySelectorAll(".comment-btn");
    let commentSections = section.querySelectorAll(".comment-section");

    for (let i = 0; i < commentBtns.length; i++) {

        commentBtns[i].onclick = function (e) {
            e.preventDefault();
            if (commentSections[i].style.display === "block") {
            commentSections[i].style.display = "none";
            } else {
            commentSections[i].style.display = "block";
            }
            }
    }
});

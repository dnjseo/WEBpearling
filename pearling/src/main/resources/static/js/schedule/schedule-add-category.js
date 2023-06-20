window.addEventListener("load", function(e) {
    let pallet = [
        { color: "#F8801359", category: "약속" },
        { color: "#96E97082", category: "기념일" },
        { color: "#6AB04899", category: "카테고리1" },
        { color: "#3859AD33", category: "카테고리2" },
        { color: "#A0B5FF", category: "카테고리3" },
        { color: "#BEA3C9CC", category: "카테고리4" },
        { color: "#DE4AA382", category: "카테고리5" }
    ];

    let colBox = this.document.querySelector(".col-box");
    let colBall = colBox.querySelectorAll(".col-ball");
    let current = colBox.querySelector(".active");

    for (let i = 0; i < pallet.length; i++) {
        colBall[i].style.background = pallet[i].color;
    }

    colBox.onclick = function(e) {
        if (!(e.target.classList.contains("col-ball"))) {
            return;
        }

        if (current != null) {
            current.classList.remove("active");
        }

        e.target.classList.add("active");
        current = e.target;

        let colorIndex = Array.from(colBall).indexOf(e.target);
        let selectedColor = pallet[colorIndex];

        console.log("선택한 색상:", selectedColor.color);
        console.log("선택한 카테고리:", selectedColor.category);
    };
});
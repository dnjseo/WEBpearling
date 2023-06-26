window.addEventListener("load", function(e) {
    let pallet = [
        { color: "white", category: "약속" },
        { color: "#E6E6FA", category: "기념일" },
        { color: "#caefca", category: "카테고리1" },
        { color: "#fbe7f2", category: "카테고리2" },
        { color: "#e8e3e3", category: "카테고리3" },
        { color: "#c6e0f8", category: "카테고리4" },
        { color: "#d7fafd", category: "카테고리5" }
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

        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "backgroundColor";
        input.value = selectedColor.color;
        document.querySelector(".send-form").appendChild(input);

        console.log("선택한 색상:", selectedColor.color);
        console.log("선택한 카테고리:", selectedColor.category);
    };
});
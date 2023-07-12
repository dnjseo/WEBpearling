
window.addEventListener("load", function () {

    const btns = document.querySelector('.error-buttons')
    const btn1 = btns.querySelector('.btn1')
    const btn2 = btns.querySelector('.btn2')


    //이전으로 버튼 클릭 시
    btn1.onclick = (e) => {
        e.preventDefault
        this.history.go(-1);
    }

    //메인으로 버튼 클릭 시 
    btn2.onclick = (e) => {
        e.preventDefault
        window.location.href = "/shell/ourshell";
    }



})
// A -> HTMLElement -> Element -> Node
// ModalAelrt -> -> HTMLElement -> Element -> Node
class ModalAlertElement extends HTMLElement {
	constructor() {
		super();
		
		// this -> 태그 즉 객체라는 말. 따로 태그 속성을 생성해줄 필요가 없다. 

		let style = `
        .modal {
            display: none;
            position: fixed;
            z-index: 2;
            left: 0;
            top: 0%;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }

        .modal-content {
            position: fixed;
            top: 13%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            background-color: white;
            margin: 15% auto;
            padding: 0 10px;
            border: 1px solid #888;
            width: 300px;
            height: 200px;

            justify-content: center;
            align-items: center;
            

            background: #FFFFFF;
            /* REAL 그림자 */

            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 40px;
        }

        .modal-content>p {
            margin-bottom: 30px;
        }

        .confirm-yes, .send-yes, 
        .signup-confirm-yes, .check-yes,
        .nocorrect-yes, .modify-yes{
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 10px 0px;
            
            width: 84px;
            height: 29px;
            
            background: rgba(90, 46, 149, 0.2);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
            border-radius: 30px;
            
            /* Inside auto layout */
            
            color: #797979;
            border: none;
        }

        .confirm-yes:hover {
            opacity: 0.8;
        }`;
		
		let content = "등록이 완료되었습니다.";
		
		if(this.hasAttribute("data-content"))
			content = this.getAttribute("data-content");

		let template = `
                <div class="modal-content">
                    <p>🫧 Message</p>
                    <p>다이어리 등록이 완료되었습니다.</p>
                    <button class="confirm-yes">확인</button>
                </div>`;
				
		const wrapper = document.createElement("div");
		wrapper.className = "modal";
        wrapper.id = "confirm-modal";
		wrapper.innerHTML = template;
		
		let styleEl = document.createElement("style");
		styleEl.textContent = style;
  
        let shadow = this.attachShadow({mode: "open"});	
        shadow.appendChild(styleEl);
        shadow.appendChild(wrapper);

        let diaryAddForm = document.querySelector(".diary-add-form");
        let diaryAddBtn = diaryAddForm.querySelector(".diary-add-btn");
        
        // diaryAddBtn.addEventListener("click", function(e) {
        //     ModalAlertElement.
        // });
		// innerText = 주석도 포함 가능
		// textContent = 순수한 텍스트만 포함, 일반 텍스트 사용 시 권장
		// innerHTML = 태그 사용시 사용
		
		// body의 끝에 


		
		// let btnOk = wrapper.querySelector(".btn-ok");
		// btnOk.onclick = () => {
		// 	this.remove();
		// }
	}
}

customElements.define("modal-alert", ModalAlertElement); 
// 웹 컴포넌트 이름은 기존 태그와의 식별을 위해 '-'를 꼭 붙여야 한다. 
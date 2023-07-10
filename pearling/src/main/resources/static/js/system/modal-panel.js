class ModalPanelElement extends HTMLElement {
    constructor() {
      super();
  
      let style = `
        .d-none {
          display: none;
        }
        
        .screen {
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1300;
          background-color: #000000a0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .content-panel {
          background-color: #fff;
        }
      `;
  
      // 모달 패널 내용을 정의할 때 사용할 제목
      let title = "제목";
  
      if (this.hasAttribute("data-title")) {
        title = this.dataset.title;
      }
  
      let template = `
        <div class="content-panel">
          <div class="content-view">
            <slot name="content"></slot>
          </div>
        </div>
      `;
  
      // 모달 패널의 초기 표시 여부 설정
      let show = true;
      if (this.hasAttribute("data-show")) {
        show = JSON.parse(this.dataset.show);
      }
  
      if (show) {
        this.classList.remove("d-none");
      } else {
        this.classList.add("d-none");
      }
  
      const wrapper = document.createElement("div");
      wrapper.className = "screen";
      wrapper.innerHTML = template;
  
      let styleEl = document.createElement("style");
      styleEl.textContent = style;
  
      let shadow = this.attachShadow({ mode: "open" });
  
      shadow.appendChild(styleEl);
      shadow.appendChild(wrapper);
  
      this.onclick = (e) => {
        if (e.target != e.currentTarget) {
          return;
        }
  
        this.classList.add("d-none");
      };
    }
  
    show(status) {
      if (status) {
        this.classList.remove("d-none");
      } else {
        this.classList.add("d-none");
      }
    }
  }
  
  customElements.define("modal-panel", ModalPanelElement);
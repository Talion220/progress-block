customElements.define(
  "progress-block",
  class extends HTMLElement {
    static get observedAttributes() {
      return ["value", "isAnimate", "isHide"];
    }

    private progressLoader!: SVGPathElement;
    private progressValueInput!: HTMLInputElement;
    private animateCheckbox!: HTMLInputElement;
    private hideCheckbox!: HTMLInputElement;
    private progressContainerLoader!: HTMLElement;

    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `
        <link rel="stylesheet" href="src/style.css">
        <div class="progress-block">
          <p class="progress-p">Progress</p>
          <div class="progress-container">
            <div class="progress-container-loader">
              <svg id="progress" viewBox="0 0 48 48" class="loader">
                <path class="loader-background" d="M24 3 a 21 21 0 0 1 0 42 a 21 21 0 0 1 0 -42" />
                <path id="progress-loader" class="progress-loader" stroke-dasharray="0, 132" d="M24 3 a 21 21 0 0 1 0 42 a 21 21 0 0 1 0 -42" />
              </svg>
            </div>
            <div class="progress-container-api">
              <label>
                <input type="number" id="progress-value" class="progress-input" value="0" min="0" max="100" />Value
              </label>
              <div class="toggle">
                <label class="toggle-label">
                  <input type="checkbox" id="animate" class="toggle-input" />
                  <span class="toggle-slider"></span>
                  Animate
                </label>
              </div>
              <div class="toggle">
                <label class="toggle-label">
                  <input type="checkbox" id="hide" class="toggle-input" />
                  <span class="toggle-slider"></span>
                  Hide
                </label>
              </div>
            </div>
          </div>
        </div>`;

      this.progressLoader = shadow.querySelector("#progress-loader")!;
      this.progressValueInput = shadow.querySelector("#progress-value")!;
      this.animateCheckbox = shadow.querySelector("#animate")!;
      this.hideCheckbox = shadow.querySelector("#hide")!;
      this.progressContainerLoader = shadow.querySelector(
        ".progress-container-loader"
      )!;

      this.updateFromAttributes();

      this.progressValueInput.addEventListener(
        "input",
        this.renderLoaderProgress.bind(this)
      );
      this.animateCheckbox.addEventListener(
        "change",
        this.animateLoader.bind(this)
      );
      this.hideCheckbox.addEventListener("change", this.hideLoader.bind(this));
    }

    updateFromAttributes() {
      const value = this.getAttribute("value");
      if (value !== null) {
        this.progressValueInput.value = value;
        this.renderLoaderProgress();
      }

      const isAnimate = this.getAttribute("isAnimate");
      this.animateCheckbox.checked = isAnimate === "true";
      this.animateLoader();

      const isHide = this.getAttribute("isHide");
      this.hideCheckbox.checked = isHide === "true";
      this.hideLoader();
    }

    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null
    ) {
      if (oldValue === newValue) return;

      switch (name) {
        case "value":
          if (newValue !== null && this.progressValueInput) {
            this.progressValueInput.value = newValue;
            this.renderLoaderProgress();
          }
          break;
        case "isAnimate":
          this.animateCheckbox.checked = newValue === "true";
          this.animateLoader();
          break;
        case "isHide":
          this.hideCheckbox.checked = newValue === "true";
          this.hideLoader();
          break;
      }
    }

    private renderLoaderProgress() {
      const validateValue = this.validateInput();
      const offset = (validateValue / 100) * 132;
      this.progressLoader.style.strokeDasharray = `${offset}, 132`;
    }

    private validateInput(): number {
      let value = this.progressValueInput.value;

      if (Number(value) > 100) {
        value = "100";
      }

      if (value.length > 3 && value[0] !== "0") {
        value = value.slice(0, 3);
      }

      if (value.length > 1 && value[0] === "0") {
        value = value.slice(1);
      }

      value = value || "0";
      this.progressValueInput.value = value;
      return Number(value);
    }

    private animateLoader() {
      if (this.animateCheckbox.checked) {
        this.progressLoader.classList.add("animated");
      } else {
        this.progressLoader.classList.remove("animated");
      }
    }

    private hideLoader() {
      if (this.hideCheckbox.checked) {
        this.progressContainerLoader.classList.add("hidden");
      } else {
        this.progressContainerLoader.classList.remove("hidden");
      }
    }
  }
);

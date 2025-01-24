customElements.define(
  "progress-block",
  class extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `

      <link rel="stylesheet" href="style.css">
      <div class="progress-block">
        <p class="progress-p">Progress</p>
        <div class="progress-container">
          
          <div class="progress-container-loader">
            <svg id="progress" viewBox="0 0 48 48" class="loader">
              <path
                class="loader-background"
                d="M24 3
                  a 21 21 0 0 1 0 42
                  a 21 21 0 0 1 0 -42"
              />
              <path
                id="progress-loader"
                class="progress-loader"
                stroke-dasharray="0, 132"
                d="M24 3
                  a 21 21 0 0 1 0 42
                  a 21 21 0 0 1 0 -42"
              />
            </svg>
          </div>

          <div class="progress-container-api">
          <label>
            <input
              type="number"
              id="progress-value"
              class="progress-input"
              value="0"
              min="0"
              max="100"
            />Value</label
          >
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
        
      </div>`;

      const progressLoader = shadow.querySelector("#progress-loader");
      const progressValueInput = shadow.querySelector("#progress-value");
      const animateCheckbox = shadow.querySelector("#animate");
      const hideCheckbox = shadow.querySelector("#hide");
      const progressContainerLoader = shadow.querySelector(
        ".progress-container-loader"
      );
      let lastInputValue = progressValueInput.value;

      function renderLoaderProgress() {
        const validateValue = validateInput();
        const offset = (validateValue / 100) * 132;
        progressLoader.style.strokeDasharray = `${offset}, 132`;
      }

      function validateInput() {
        let value = progressValueInput.value;

        if (Number(value) > 100) {
          value = lastInputValue;
        }

        if (value.length > 3) {
          value = value.slice(0, 3);
        }

        if (value.length > 1 && value.startsWith("0")) {
          value = value.slice(1);
        }

        lastInputValue = value;
        value = Number(value) || 0;
        progressValueInput.value = value;
        return value;
      }

      function animateLoader() {
        if (animateCheckbox.checked) {
          progressLoader.classList.add("animated");
        } else {
          progressLoader.classList.remove("animated");
        }
      }

      function hideLoader() {
        if (hideCheckbox.checked) {
          progressContainerLoader.classList.add("hidden");
        } else {
          progressContainerLoader.classList.remove("hidden");
        }
      }

      progressValueInput.addEventListener("input", renderLoaderProgress);
      animateCheckbox.addEventListener("change", animateLoader);
      hideCheckbox.addEventListener("change", hideLoader);
    }
  }
);

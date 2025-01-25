import { progressBlockTemplate } from "../templates/progressBlockTemplate";

export class ProgressBlock extends HTMLElement {
  static get observedAttributes() {
    return ["value", "isAnimate", "isHide"];
  }

  private progressLoader: SVGPathElement | null = null;
  private progressValueInput: HTMLInputElement | null = null;
  private animateCheckbox: HTMLInputElement | null = null;
  private hideCheckbox: HTMLInputElement | null = null;
  private progressContainerLoader: HTMLElement | null = null;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = progressBlockTemplate();

    this.progressLoader = shadow.querySelector("#progress-loader");
    this.progressValueInput = shadow.querySelector("#progress-value");
    this.animateCheckbox = shadow.querySelector("#animate");
    this.hideCheckbox = shadow.querySelector("#hide");
    this.progressContainerLoader = shadow.querySelector(
      ".progress-container-loader"
    );

    if (this.progressValueInput) {
      this.updateFromAttributes();
      this.progressValueInput.addEventListener(
        "input",
        this.renderLoaderProgress.bind(this)
      );
    }

    if (this.animateCheckbox) {
      this.animateCheckbox.addEventListener(
        "change",
        this.animateLoader.bind(this)
      );
    }

    if (this.hideCheckbox) {
      this.hideCheckbox.addEventListener("change", this.hideLoader.bind(this));
    }
  }

  updateFromAttributes() {
    const value: string | null = this.getAttribute("value");
    if (value !== null && this.progressValueInput) {
      this.progressValueInput.value = value;
      this.renderLoaderProgress();
    }

    const isAnimate: string | null = this.getAttribute("isAnimate");
    if (this.animateCheckbox) {
      this.animateCheckbox.checked = isAnimate === "true";
      this.animateLoader();
    }

    const isHide: string | null = this.getAttribute("isHide");
    if (this.hideCheckbox) {
      this.hideCheckbox.checked = isHide === "true";
      this.hideLoader();
    }
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
        if (this.animateCheckbox) {
          this.animateCheckbox.checked = newValue === "true";
          this.animateLoader();
        }
        break;
      case "isHide":
        if (this.hideCheckbox) {
          this.hideCheckbox.checked = newValue === "true";
          this.hideLoader();
        }
        break;
    }
  }

  private renderLoaderProgress() {
    const validateValue = this.validateInput();
    const offset = (validateValue / 100) * 132;
    if (this.progressLoader) {
      this.progressLoader.style.strokeDasharray = `${offset}, 132`;
    }
  }

  private validateInput(): number {
    let value = this.progressValueInput ? this.progressValueInput.value : "0";

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
    if (this.progressValueInput) {
      this.progressValueInput.value = value;
    }
    return Number(value);
  }

  private animateLoader() {
    if (this.animateCheckbox && this.progressLoader) {
      if (this.animateCheckbox.checked) {
        this.progressLoader.classList.add("animated");
      } else {
        this.progressLoader.classList.remove("animated");
      }
    }
  }

  private hideLoader() {
    if (this.hideCheckbox && this.progressContainerLoader) {
      if (this.hideCheckbox.checked) {
        this.progressContainerLoader.classList.add("hidden");
      } else {
        this.progressContainerLoader.classList.remove("hidden");
      }
    }
  }
}

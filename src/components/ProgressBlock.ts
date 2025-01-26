import { progressBlockTemplate } from "./template/progressBlockTemplate";
import { initializeElements, addEventListeners } from "./helpers";

export class ProgressBlock extends HTMLElement {
  private progressLoader: SVGCircleElement | null = null;
  private progressValueInput: HTMLInputElement | null = null;
  private animateCheckbox: HTMLInputElement | null = null;
  private hideCheckbox: HTMLInputElement | null = null;
  private progressContainerLoader: HTMLElement | null = null;

  private value: number;
  private isAnimated: boolean;
  private isHidden: boolean;

  constructor() {
    super();
    this.value = 0;
    this.isAnimated = this.getAttribute("isAnimate") === "true";
    this.isHidden = this.getAttribute("isHide") === "true";
  }

  static get observedAttributes() {
    return ["value", "isAnimate", "isHide"];
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = progressBlockTemplate();
    initializeElements(this, shadow);
    this.updateFromAttributes();
    addEventListeners(this);
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === newValue) return;
    this.handleAttributeChange(name, newValue);
  }

  private updateFromAttributes() {
    this.updateValue();
    this.updateAnimation();
    this.updateVisibility();
  }

  private handleAttributeChange(name: string, newValue: string | null) {
    switch (name) {
      case "value":
        this.value = newValue !== null ? Number(newValue) : 0;
        this.updateValue();
        break;
      case "isAnimate":
        this.isAnimated = newValue !== null;
        this.updateAnimation();
        break;
      case "isHide":
        this.isHidden = newValue !== null;
        this.updateVisibility();
        break;
    }
  }

  private updateValue() {
    if (this.progressValueInput) {
      this.progressValueInput.value = String(this.value);
    }
    this.renderLoaderProgress();
  }

  private updateAnimation() {
    if (this.animateCheckbox) {
      this.animateCheckbox.checked = this.isAnimated;
    }
    this.toggleAnimation();
  }

  private updateVisibility() {
    if (this.hideCheckbox) {
      this.hideCheckbox.checked = this.isHidden;
    }
    this.toggleVisibility();
  }

  private renderLoaderProgress() {
    if (this.progressLoader) {
      const radius = this.progressLoader.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const validatedValue = this.validateInput();
      const offset = (validatedValue / 100) * circumference;
      this.progressLoader.style.strokeDasharray = `${offset}, ${circumference}`;
    }
  }

  private validateInput(): number {
    if (!this.progressValueInput) {
      return 0;
    }

    let value: number = Number(this.progressValueInput.value);
    value = isNaN(value) ? 0 : Math.max(0, Math.min(100, value));
    this.progressValueInput.value = String(value);

    return value;
  }

  private toggleAnimation() {
    if (this.progressLoader) {
      this.progressLoader.style.animationPlayState = this.isAnimated
        ? "running"
        : "paused";
    }
  }

  private toggleVisibility() {
    if (this.progressContainerLoader) {
      this.progressContainerLoader.classList.toggle("hidden", this.isHidden);
    }
  }
}

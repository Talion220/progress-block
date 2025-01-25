import { progressBlockTemplate } from "../templates/progressBlockTemplate";

export class ProgressBlock extends HTMLElement {
  private progressLoader: SVGPathElement | null = null;
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

    this.initializeElements(shadow);
    this.updateFromAttributes();

    this.addEventListeners();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === newValue) return;

    switch (name) {
      case "value":
        this.value = newValue !== null ? Number(newValue) : 0;
        break;
      case "isAnimate":
        this.isAnimated = newValue !== null;
        break;
      case "isHide":
        this.isHidden = newValue !== null;
        break;
    }
    this.updateFromAttributes();
  }

  private initializeElements(shadow: ShadowRoot) {
    this.progressLoader = this.getElement<SVGPathElement>(
      shadow,
      "#progress-loader"
    );
    this.progressValueInput = this.getElement<HTMLInputElement>(
      shadow,
      "#progress-value"
    );
    this.animateCheckbox = this.getElement<HTMLInputElement>(
      shadow,
      "#animate"
    );
    this.hideCheckbox = this.getElement<HTMLInputElement>(shadow, "#hide");
    this.progressContainerLoader = this.getElement<HTMLElement>(
      shadow,
      ".progress-container-loader"
    );

    if (
      !this.progressLoader ||
      !this.progressValueInput ||
      !this.animateCheckbox ||
      !this.hideCheckbox ||
      !this.progressContainerLoader
    ) {
      console.error("The shadow DOM is missing some required elements.");
    }
  }

  private addEventListeners() {
    if (this.progressValueInput) {
      this.progressValueInput.addEventListener(
        "input",
        this.renderLoaderProgress.bind(this)
      );
    }
    if (this.animateCheckbox) {
      this.animateCheckbox.addEventListener("change", () => {
        this.isAnimated = this.animateCheckbox!.checked;
        this.toggleAnimation();
      });
    }
    if (this.hideCheckbox) {
      this.hideCheckbox.addEventListener("change", () => {
        this.isHidden = this.hideCheckbox!.checked;
        this.toggleVisibility();
      });
    }
  }

  private updateFromAttributes() {
    this.updateValue();
    this.updateAnimation();
    this.updateVisibility();
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
      const radius = 21;
      const circumference = 2 * Math.PI * radius;
      const validatedValue = this.validateInput();
      const offset = (validatedValue / 100) * circumference;
      this.progressLoader.style.strokeDasharray = `${offset}, ${circumference}`;
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

  private toggleAnimation() {
    if (this.progressLoader) {
      this.progressLoader.classList.toggle("animated", this.isAnimated);
    }
  }

  private toggleVisibility() {
    if (this.progressContainerLoader) {
      this.progressContainerLoader.classList.toggle("hidden", this.isHidden);
    }
  }

  private getElement<T extends Element>(
    root: ShadowRoot,
    selector: string
  ): T | null {
    const element = root.querySelector<T>(selector);
    if (!element) {
      console.error(`Element not found for selector: ${selector}`);
    }
    return element;
  }
}

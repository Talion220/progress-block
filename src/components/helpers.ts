export function initializeElements(context: any, shadow: ShadowRoot): void {
  context.progressLoader = getElement<SVGCircleElement>(
    shadow,
    "#progress-loader"
  );
  context.progressValueInput = getElement<HTMLInputElement>(
    shadow,
    "#progress-value"
  );
  context.animateCheckbox = getElement<HTMLInputElement>(shadow, "#animate");
  context.hideCheckbox = getElement<HTMLInputElement>(shadow, "#hide");
  context.progressContainerLoader = getElement<HTMLElement>(
    shadow,
    ".progress-container-loader"
  );

  if (
    !context.progressLoader ||
    !context.progressValueInput ||
    !context.animateCheckbox ||
    !context.hideCheckbox ||
    !context.progressContainerLoader
  ) {
    console.error("The shadow DOM is missing some required elements.");
  }
}

export function addEventListeners(context: any): void {
  if (context.progressValueInput) {
    context.progressValueInput.addEventListener(
      "input",
      context.renderLoaderProgress.bind(context)
    );
  }
  if (context.animateCheckbox) {
    context.animateCheckbox.addEventListener("change", () => {
      context.isAnimated = context.animateCheckbox!.checked;
      context.toggleAnimation();
    });
  }
  if (context.hideCheckbox) {
    context.hideCheckbox.addEventListener("change", () => {
      context.isHidden = context.hideCheckbox!.checked;
      context.toggleVisibility();
    });
  }
}

function getElement<T extends Element>(
  root: ShadowRoot,
  selector: string
): T | null {
  const element = root.querySelector<T>(selector);
  if (!element) {
    console.error(`Element not found for selector: ${selector}`);
  }
  return element;
}

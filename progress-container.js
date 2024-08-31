function loaderApi(item) {
  const progressLoader = document.querySelector(item.progressLoader);
  const progressValueInput = document.querySelector(item.progressValueInput);
  const animateCheckbox = document.querySelector(item.animateCheckbox);
  const hideCheckbox = document.querySelector(item.hideCheckbox);
  const progressContainerLoader = document.querySelector(
    item.progressContainerLoader
  );

  let lastInputValue = progressValueInput.value;

  function renderLoaderProgress() {
    const validateValue = validateInput();
    const offset = (validateValue / 100) * 132;
    progressLoader.style.strokeDasharray = `${offset}, 132`;
  }

  function validateInput() {
    let value = progressValueInput.value;

    if (parseInt(value) > 100) {
      value = lastInputValue;
    }

    if (value.length > 3) {
      value = value.slice(0, 3);
    }

    if (value.length > 1 && value.startsWith("0")) {
      value = value.slice(1);
    }

    lastInputValue = value;
    value = parseInt(value) || 0;
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

document.addEventListener("DOMContentLoaded", () => {
  loaderApi({
    progressLoader: "#progress-loader",
    progressValueInput: "#progress-value",
    animateCheckbox: "#animate",
    hideCheckbox: "#hide",
    progressContainerLoader: ".progress-container-loader",
  });
});

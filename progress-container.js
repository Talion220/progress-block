document.addEventListener("DOMContentLoaded", function () {
  const progressCircle = document.getElementById("progress-circle");
  const progressValueInput = document.getElementById("progress-value");
  const animateCheckbox = document.getElementById("animate");
  const hideCheckbox = document.getElementById("hide");
  const progressContainerLoader = document.querySelector(
    ".progress-container-loader"
  );

  let lastInputValue = progressValueInput.value;

  progressValueInput.addEventListener("input", function () {
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
    const offset = (value / 100) * 132;
    progressCircle.style.strokeDasharray = `${offset}, 132`;
  });

  animateCheckbox.addEventListener("change", function () {
    if (this.checked) {
      progressCircle.classList.add("animated");
    } else {
      progressCircle.classList.remove("animated");
    }
  });

  hideCheckbox.addEventListener("change", function () {
    if (this.checked) {
      progressContainerLoader.classList.add("hidden");
    } else {
      progressContainerLoader.classList.remove("hidden");
    }
  });
});

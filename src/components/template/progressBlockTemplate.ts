import style from "./progress-block.css?inline";

export function progressBlockTemplate(): string {
  return `
          <style>${style}</style>
          <div class="progress-block">
            <h4 class="progress-h">Progress</h4>
            <div class="progress-container">
              <div class="progress-container-loader">
                <svg id="progress" class="loader">
                  <circle class="loader-background" cx="60" cy="60" r="55" />
                  <circle id="progress-loader" class="progress-loader" cx="60" cy="60" r="55" />
                </svg>
              </div>
              <div class="progress-container-api">
                <label>
                  <input type="number" id="progress-value" class="progress-input" aria-label="Value" min="0" max="100" />Value
                </label>
                <div class="toggle">
                  <label class="toggle-label">
                    <input type="checkbox" id="animate" class="toggle-input" />
                    <span class="toggle-slider" aria-label="Animate"></span>
                    Animate
                  </label>
                </div>
                <div class="toggle">
                  <label class="toggle-label">
                    <input type="checkbox" id="hide" class="toggle-input" />
                    <span class="toggle-slider" aria-label="Hide"></span>
                    Hide
                  </label>
                </div>
              </div>
            </div>
          </div>
    `;
}

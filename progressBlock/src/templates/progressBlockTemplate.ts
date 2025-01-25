export function progressBlockTemplate(): string {
  return `
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
          </div>
    `;
}

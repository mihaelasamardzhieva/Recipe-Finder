export function renderSpinner(parentEl) {
  parentEl.innerHTML = "";

  const markup = `
    <div class="spinner">
        <i class="bi bi-arrow-repeat spinner__icon"></i>
    </div>
  `;

  parentEl.insertAdjacentHTML("afterbegin", markup);
}

export function renderError(parentEl, message) {
  parentEl.innerHTML = "";

  const markup = `
      <div class="error">
        <i class="bi bi-exclamation-circle"></i>
        <p>${message}</p>
      </div>
    `;

  parentEl.insertAdjacentHTML("afterbegin", markup);
}

const toast = document.querySelector(".toast");
let hideTimeout;

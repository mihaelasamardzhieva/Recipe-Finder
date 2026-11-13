export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function safeUrl(url) {
  return /^https?:\/\//i.test(url) ? escapeHtml(url) : "#";
}

const NO_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="636" height="393"><rect width="100%" height="100%" fill="#e9ecef"/></svg>',
  );

export function imageSrc(url) {
  return url ? escapeHtml(url) : NO_IMAGE;
}

export function formatNutrient({ amount, unit }) {
  return amount === null || amount === undefined ? "–" : `${amount} ${unit}`;
}

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
        <p>${escapeHtml(message)}</p>
      </div>
    `;

  parentEl.insertAdjacentHTML("afterbegin", markup);
}

export function generatePreviewMarkup(recipe, listName) {
  const title = escapeHtml(recipe.title);

  return `
    <li class="bookmark-preview" data-id="${recipe.id}">
      <a href="#" class="bookmark-preview__link">
        <figure class="bookmark-preview__figure">
          <img src="${imageSrc(recipe.image)}" alt="${title}">
        </figure>
        <div class="bookmark-preview__content">
          <h3 class="bookmark-preview__title">${title}</h3>
        </div>
      </a>
      <button
        type="button"
        class="bookmark-preview__remove"
        aria-label="Remove ${title} from ${listName}"
      >
        ×
      </button>
    </li>
  `;
}

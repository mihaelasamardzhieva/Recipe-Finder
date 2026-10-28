const bookmarksList = document.querySelector(".bookmarks__list");

function generateBookmarkMarkup(recipe) {
  return `
    <li class="bookmark-preview" data-id="${recipe.id}">
      <a href="#" class="bookmark-preview__link">
        <figure class="bookmark-preview__figure">
          <img src="${recipe.image}" alt="${recipe.title}">
        </figure>
        <div class="bookmark-preview__content">
          <h3 class="bookmark-preview__title">
            ${recipe.title}
          </h3>   
        </div>
      </a>
  <button
        type="button"
        class="bookmark-preview__remove"
        aria-label="Remove ${recipe.title} from bookmarks"
      >
        ×
      </button>
    </li>
  `;
}

export function renderBookmarks(bookmarks) {
  bookmarksList.innerHTML = "";

  if (bookmarks.length === 0) {
    bookmarksList.insertAdjacentHTML(
      "afterbegin",
      `
        <p class="bookmarks__message">
          No bookmarked recipes yet.
        </p>
      `,
    );

    return;
  }

  bookmarks.forEach((bookmark) => {
    bookmarksList.insertAdjacentHTML(
      "beforeend",
      generateBookmarkMarkup(bookmark),
    );
  });
}

export function addHandlerSelectBookmark(handler) {
  bookmarksList.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".bookmark-preview__remove");

    if (removeBtn) {
      e.preventDefault();

      const bookmark = removeBtn.closest(".bookmark-preview");
      const recipeId = bookmark.dataset.id;

      handler("remove", recipeId);
      return;
    }

    const bookmark = e.target.closest(".bookmark-preview__link");
    if (!bookmark) return;

    e.preventDefault();

    const recipeId = bookmark.closest(".bookmark-preview").dataset.id;
    handler("select", recipeId);
  });
}

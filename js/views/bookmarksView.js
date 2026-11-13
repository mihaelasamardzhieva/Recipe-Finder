import { generatePreviewMarkup } from "./ui";

const bookmarksList = document.querySelector(".bookmarks__list");

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
      generatePreviewMarkup(bookmark, "bookmarks"),
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

const bookmarksBtn = document.querySelector(".nav__btn--bookmarks");
const bookmarksDropdown = document.querySelector(".bookmarks-dropdown");
const menuBtn = document.querySelector(".nav__item--menu > .nav__btn");
const menuDropdown = document.querySelector(".nav__item--menu .dropdown");
const myRecipesBtn = document.querySelector(".nav__btn--my-recipes");
const myRecipesDropdown = document.querySelector(".my-recipes-dropdown");

function closeAllDropdowns() {
  bookmarksDropdown.classList.add("hidden");
  myRecipesDropdown.classList.add("hidden");
  menuDropdown.classList.add("hidden");

  bookmarksBtn.setAttribute("aria-expanded", "false");
  myRecipesBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-expanded", "false");
}

export function addHandlerBookmarksDropdown() {
  bookmarksDropdown.classList.add("hidden");

  bookmarksBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    const isOpening = bookmarksDropdown.classList.contains("hidden");

    closeAllDropdowns();

    if (isOpening) {
      bookmarksDropdown.classList.remove("hidden");
      bookmarksBtn.setAttribute("aria-expanded", "true");
    }
  });
}

export function addHandlerMyRecipesDropdown() {
  myRecipesDropdown.classList.add("hidden");

  myRecipesBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    const isOpening = myRecipesDropdown.classList.contains("hidden");

    closeAllDropdowns();

    if (isOpening) {
      myRecipesDropdown.classList.remove("hidden");
      myRecipesBtn.setAttribute("aria-expanded", "true");
    }
  });
}

export function addHandlerMenuDropdown() {
  menuDropdown.classList.add("hidden");

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpening = menuDropdown.classList.contains("hidden");
    closeAllDropdowns();

    if (isOpening) {
      menuDropdown.classList.remove("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
    }
  });
}

export function addHandlerCloseDropdowns() {
  document.addEventListener("click", function (e) {
    if (
      !bookmarksBtn.contains(e.target) &&
      !bookmarksDropdown.contains(e.target) &&
      !myRecipesBtn.contains(e.target) &&
      !myRecipesDropdown.contains(e.target) &&
      !menuBtn.contains(e.target) &&
      !menuDropdown.contains(e.target)
    ) {
      closeAllDropdowns();
    }
  });
}

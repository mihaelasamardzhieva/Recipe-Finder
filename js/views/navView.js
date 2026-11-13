const dropdowns = [
  {
    button: document.querySelector(".nav__btn--bookmarks"),
    menu: document.querySelector(".bookmarks-dropdown"),
  },
  {
    button: document.querySelector(".nav__btn--my-recipes"),
    menu: document.querySelector(".my-recipes-dropdown"),
  },
  {
    button: document.querySelector(".nav__item--menu > .nav__btn"),
    menu: document.querySelector(".nav__item--menu .dropdown"),
  },
];

export function closeAllDropdowns() {
  dropdowns.forEach(({ button, menu }) => {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  });
}

export function addHandlerDropdowns() {
  closeAllDropdowns();

  dropdowns.forEach(({ button, menu }) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();

      const isOpening = menu.classList.contains("hidden");

      closeAllDropdowns();

      if (isOpening) {
        menu.classList.remove("hidden");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function (e) {
    const clickedInside = dropdowns.some(
      ({ button, menu }) =>
        button.contains(e.target) || menu.contains(e.target),
    );

    if (!clickedInside) closeAllDropdowns();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllDropdowns();
  });
}

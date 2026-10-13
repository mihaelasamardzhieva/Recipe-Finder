const myRecipesList = document.querySelector(".my-recipes__list");
const myRecipesBtn = document.querySelector(".nav__btn--my-recipes");
const myRecipesDropdown = document.querySelector(".my-recipes-dropdown");

function generateRecipeMarkup(recipe) {
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
        aria-label="Remove ${recipe.title} from My Recipes"
      >
         ×
      </button>
    </li>
  `;
}

export function renderMyRecipes(recipes) {
  myRecipesList.innerHTML = "";

  if (recipes.length === 0) {
    myRecipesList.innerHTML = `
      <li class="my-recipes__empty">
        No recipes created yet.
      </li>
    `;
    return;
  }

  recipes.forEach((recipe) => {
    myRecipesList.insertAdjacentHTML("beforeend", generateRecipeMarkup(recipe));
  });
}

export function addHandlerSelectRecipe(handler) {
  myRecipesList.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".bookmark-preview__remove");

    if (removeBtn) {
      const recipe = removeBtn.closest(".bookmark-preview");
      handler("remove", recipe.dataset.id);
      return;
    }

    const link = e.target.closest(".bookmark-preview__link");
    if (!link) return;
    e.preventDefault();
    const recipe = link.closest(".bookmark-preview");
    handler("select", recipe.dataset.id);
  });
}

import { generatePreviewMarkup } from "./ui";

const myRecipesList = document.querySelector(".my-recipes__list");

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
    myRecipesList.insertAdjacentHTML(
      "beforeend",
      generatePreviewMarkup(recipe, "My Recipes"),
    );
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

import {
  renderSpinner,
  renderError,
  escapeHtml,
  imageSrc,
  formatNutrient,
} from "./ui";

const resultsList = document.querySelector(".results-list");

export function showSpinner() {
  renderSpinner(resultsList);
}
export function showError(message) {
  renderError(resultsList, message);
}

function generateRecipesMarkup(recipe) {
  return ` 
<li class="results-list__item" data-id="${recipe.id}">
            <a href="#" class="recipe-card">
                      <figure class="recipe-card__figure">
                        <img src="${imageSrc(recipe.image)}" alt="${escapeHtml(recipe.title)}" class="recipe-card__image" />
                      </figure>
                      <div class="recipe-card__content">
                        <h3 class="recipe-card__title">
                         ${escapeHtml(recipe.title)}
                        </h3>
                        <div class="recipe-card__calories">
                         <i class="bi bi-fire calories__icon"></i>
                         <p>${formatNutrient(recipe.nutrition.calories)}</p>
                        </div>
                       
                      </div>
                    </a>
                  </li>
  `;
}

export function renderResults(recipes) {
  resultsList.innerHTML = "";

  recipes.forEach((recipe) => {
    resultsList.insertAdjacentHTML("beforeend", generateRecipesMarkup(recipe));
  });
}

export function addHandlerRecipe(handler) {
  resultsList.addEventListener("click", function (e) {
    const recipeCard = e.target.closest(".results-list__item");

    if (!recipeCard) return;
    e.preventDefault();
    const recipeId = recipeCard.dataset.id;

    handler(recipeId);
  });
}

export function updateActiveRecipe(recipeId) {
  resultsList.querySelector(".selected")?.classList.remove("selected");

  resultsList
    .querySelector(`[data-id="${recipeId}"]`)
    ?.classList.add("selected");
}

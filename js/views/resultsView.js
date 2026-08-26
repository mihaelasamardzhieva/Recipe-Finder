import { renderSpinner, renderError } from "./ui";

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
                        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-card__image" />
                      </figure>
                      <div class="recipe-card__content">
                        <h3 class="recipe-card__title">
                         ${recipe.title}
                        </h3>
                        <div class="recipe-card__calories">
                         <i class="bi bi-fire calories__icon"></i>
                         <p c>${recipe.nutrition.calories.amount} ${recipe.nutrition.calories.unit}</p>
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

    const recipeId = recipeCard.dataset.id;

    handler(recipeId);
  });
}

export function updateActiveRecipe(recipeId) {
  const activeRecipe = document.querySelector(".selected");
  activeRecipe?.classList.remove("selected");

  const updatedActiveRecipe = document.querySelector(`[data-id="${recipeId}"]`);
  updatedActiveRecipe?.classList.add("selected");
}

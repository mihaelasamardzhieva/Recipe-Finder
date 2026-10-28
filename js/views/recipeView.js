import { renderSpinner, renderError } from "./ui";

const recipeView = document.querySelector(".recipe-view");

export function showSpinner() {
  renderSpinner(recipeView);
}

export function showError(message) {
  renderError(recipeView, message);
}

function generateRecipeMarkup(recipe) {
  return ` 

<figure class="recipe-hero">
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe-hero__img" />
          <figcaption class="recipe-hero__caption">
            <h1 class="recipe-hero__title">${recipe.title}</h1>
          </figcaption>
        </figure>

        <section class="recipe-meta">
          <div class="recipe-meta__item">
            <i class="bi bi-clock" aria-hidden="true"></i>
            <span>${recipe.cookingTime} MINUTES</span>
            </div>

            <div class="recipe-meta__item">
            <i class="bi bi-people" aria-hidden="true"></i>
            <span>${recipe.servings} SERVINGS</span>
            </div>

             <button
  type="button"
  class="recipe-meta__bookmark-btn ${
    recipe.bookmarked ? "recipe-meta__bookmark-btn--active" : ""
  }"
  aria-label="${recipe.bookmarked ? "Remove bookmark" : "Bookmark recipe"}"
>
  <i
    class="bi ${recipe.bookmarked ? "bi-bookmark-fill" : "bi-bookmark"}"
    aria-hidden="true"
  ></i>
</button>
              </section>

            <section class='nutrition'>
              <h2 class="section-title">Nutrition data</h2>

              <ul class="nutrition__list">
                <li class="nutrition__item">
            <i class="bi bi-fire calories__icon" aria-hidden="true"></i>
           
            <strong>${recipe.nutrition.calories.amount} ${recipe.nutrition.calories.unit}</strong>
                </li>
             
                <li class="nutrition__item">
                  <i class="bi bi-cake2 carbs__icon" aria-hidden="true"></i>
          
             <strong>${recipe.nutrition.carbs.amount} ${recipe.nutrition.carbs.unit}</strong>
                </li>

                     <li class="nutrition__item">
                    <i class="bi bi-egg protein__icon" aria-hidden="true"></i>
           
             <strong>${recipe.nutrition.protein.amount} ${recipe.nutrition.protein.unit}</strong>
                     </li>

                     <li class="nutrition__item">
                      <i class="bi bi-droplet fat__icon" aria-hidden="true"></i>
           
            <strong>${recipe.nutrition.fat.amount} ${recipe.nutrition.fat.unit}</strong>
                     </li>

                        <li class="nutrition__item">
                        <i class="bi bi-leaf fiber__icon" aria-hidden="true"></i>
        
            <strong>${recipe.nutrition.fiber.amount} ${recipe.nutrition.fiber.unit}</strong>
                        </li>
                      </ul>
                    </section>


          <section class="ingredients">
            <h2 class="section-title">Ingredients</h2>
            
            <ul class="ingredients__list">
               ${recipe.ingredients
                 .map((ing) => generateMarkupIngredient(ing))
                 .join("")}
            </ul>
          </section>

          <section class="directions">
            <h2 class="section-title">How to cook</h2>
            <p class="directions__text"
              >Please check the complete cooking instructions on the original website.</p
            >
            <a class="directions__btn" href="${recipe.sourceUrl}"
              target="_blank"
      rel="noopener noreferrer">View recipe</a>
         
        </section>

        <section class="meal-planner">
          <h2 class="section-title">Add to Meal Planner</h2>

          <form class="meal-planner__form">
            <div class="meal-planner__field">

        <label for="weekday">
          Day
        </label>

        <select id="weekday" required>

          <option value="">
            Select day
          </option>

          <option value="monday">Monday</option>
          <option value="tuesday">Tuesday</option>
          <option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option>
          <option value="friday">Friday</option>
          <option value="saturday">Saturday</option>
          <option value="sunday">Sunday</option>

        </select>

      </div>

      <div class="meal-planner__field">

        <label for="meal">
          Meal
        </label>

        <select id="meal" required>

          <option value="">
            Select meal
          </option>

          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>

        </select>

      </div>
             <button class="btn btn--primary" type="submit">Save to planner</button>
          </form>

            <a href="#" class="meal-planner__link">Open Weekly Planner →</a>
          
        </section>   

`;
}

function generateMarkupIngredient(ingredient) {
  return `
  <li class="ingredients__item">
                <span class="ingredients__quantity">${ingredient.amount}</span>
                <span class="ingredients__unit">${ingredient.unit}</span>
                <span class="ingredients__name">${ingredient.name}</span> 
                  <button class="ingredients__btn" type="button" aria-label="Add to shopping list">
 <i class="bi bi-cart4" aria-hidden="true"></i>
                </button>
              </li>
  `;
}

export function renderRecipe(recipe) {
  recipeView.innerHTML = "";

  recipeView.insertAdjacentHTML("beforeend", generateRecipeMarkup(recipe));
}

export function scrollToRecipe() {
  recipeView.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function addHandlerBookmark(handler) {
  recipeView.addEventListener("click", function (e) {
    const btn = e.target.closest(".recipe-meta__bookmark-btn");

    if (!btn) return;

    handler();
  });
}

export function clearRecipe() {
  recipeView.innerHTML = "";
}

export function addHandlerAddIngredient(handler) {
  recipeView.addEventListener("click", function (e) {
    const btn = e.target.closest(".ingredients__btn");

    if (!btn) return;

    const ingredient = btn.closest(".ingredients__item");

    const item = {
      amount: ingredient
        .querySelector(".ingredients__quantity")
        .textContent.trim(),
      unit: ingredient.querySelector(".ingredients__unit").textContent.trim(),
      name: ingredient.querySelector(".ingredients__name").textContent.trim(),
    };

    handler(item);

    btn.classList.add("ingredients__btn--added");
    btn.dataset.tooltip = "Added to shopping list";

    clearTimeout(btn.successTimeout);

    btn.successTimeout = setTimeout(() => {
      btn.classList.remove("ingredients__btn--added");
      delete btn.dataset.tooltip;
    }, 2000);
  });
}

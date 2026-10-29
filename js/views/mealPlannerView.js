const mealPlannerTable = document.querySelector(".meal-planner__table");

export const addHandlerShowMealPlanner = function (handler) {
  document.addEventListener("click", function (e) {
    const link = e.target.closest("#meal-planner, .meal-planner__link");

    if (!link) return;
    e.preventDefault();
    const dropdown = document.querySelector(".dropdown");
    dropdown?.classList.add("hidden");

    handler();
  });
};

export const renderMealPlanner = function (meals) {
  const cells = mealPlannerTable.querySelectorAll(".meal-planner__cell");

  cells.forEach((cell) => {
    cell.innerHTML = "";
  });

  meals.forEach((meal) => {
    const cell = mealPlannerTable.querySelector(
      `[data-day="${meal.day}"][data-meal-type="${meal.mealType}"]`,
    );

    if (!cell) return;

    cell.innerHTML = `
  <div class="meal-card" data-id="${meal.id}">
    <a
      href="#"
      class="meal-card__link"
      data-recipe-id="${meal.recipeId}"
      aria-label="View recipe: ${meal.title}"
    >
      <img
        class="meal-card__image"
        src="${meal.image}"
        alt=""
      />
      <span class="meal-card__title">${meal.title}</span>
    </a>

    <button
      class="meal-card__delete-btn"
      type="button"
      aria-label="Remove ${meal.title} from meal planner"
    >
      <i class="bi bi-trash" aria-hidden="true"></i>
    </button>
  </div>
`;
  });
};

export const addHandlerSelectMeal = function (handler) {
  mealPlannerTable.addEventListener("click", function (e) {
    const link = e.target.closest(".meal-card__link");

    if (!link) return;

    e.preventDefault();

    handler(link.dataset.recipeId);
  });
};

export const addHandlerDeleteMeal = function (handler) {
  mealPlannerTable.addEventListener("click", function (e) {
    const btn = e.target.closest(".meal-card__delete-btn");

    if (!btn) return;

    const mealCard = btn.closest(".meal-card");
    const mealId = mealCard.dataset.id;

    handler(mealId);
  });
};

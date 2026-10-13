const addRecipeBtn = document.querySelector(".nav__btn--add-recipe");
const addRecipeModal = document.querySelector(".add-recipe-modal");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".btn-close__modal");
const addIngredientBtn = document.querySelector(".ingredient__add-btn");
const ingredientsColumn = addIngredientBtn.closest(".upload-column");
const recipeForm = document.querySelector(".recipe-upload");
const uploadMessage = document.querySelector(".upload-message");

function openModal() {
  addRecipeModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

export function closeModal() {
  addRecipeModal.classList.add("hidden");
  overlay.classList.add("hidden");
}

function addIngredient() {
  const ingredientNumber =
    ingredientsColumn.querySelectorAll(".ingredient-row").length + 1;

  const markup = `
    <div class="ingredient-row">
      <label
        class="visually-hidden"
        for="ingredient${ingredientNumber}-quantity"
      >
        Quantity
      </label>

      <input
        id="ingredient${ingredientNumber}-quantity"
        class="ingredient__quantity"
        type="number"
        placeholder="1"
      />

      <label
        class="visually-hidden"
        for="ingredient${ingredientNumber}-unit"
      >
        Unit
      </label>

      <input
        id="ingredient${ingredientNumber}-unit"
        class="ingredient__unit"
        type="text"
        placeholder="tbsp"
      />

      <label
        class="visually-hidden"
        for="ingredient${ingredientNumber}-name"
      >
        Ingredient
      </label>

      <input
        id="ingredient${ingredientNumber}-name"
        class="ingredient__name"
        type="text"
        placeholder="salt"
      />
    </div>
  `;

  addIngredientBtn.insertAdjacentHTML("beforebegin", markup);
}

export function addHandlerShowModal() {
  addRecipeBtn.addEventListener("click", openModal);
}

export function addHandlerHideModal() {
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

export function addHandlerAddIngredient() {
  addIngredientBtn.addEventListener("click", addIngredient);
}

function showUploadMessage(message) {
  uploadMessage.textContent = message;
  uploadMessage.classList.remove("hidden");
}

function hideUploadMessage() {
  uploadMessage.textContent = "";
  uploadMessage.classList.add("hidden");
}

function getNumberOrNull(value) {
  if (value.trim() === "") return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function getUploadData() {
  const ingredients = [];
  const ingredientRows = [...recipeForm.querySelectorAll(".ingredient-row")];

  for (const row of ingredientRows) {
    const amountInput = row.querySelector(".ingredient__quantity");
    const unitInput = row.querySelector(".ingredient__unit");
    const nameInput = row.querySelector(".ingredient__name");

    const amountValue = amountInput.value.trim();
    const unit = unitInput.value.trim();
    const name = nameInput.value.trim();

    if (!amountValue && !unit && !name) continue;

    if (!amountValue || !unit || !name) {
      showUploadMessage(
        "Please complete the quantity, unit and ingredient for every ingredient row you use.",
      );
      return null;
    }

    const amount = Number(amountValue);

    if (!Number.isFinite(amount) || amount <= 0) {
      showUploadMessage("Ingredient quantities must be greater than zero.");
      return null;
    }

    ingredients.push({ amount, unit, name });
  }

  if (ingredients.length === 0) {
    showUploadMessage("Please add at least one ingredient.");
    return null;
  }

  const calories = getNumberOrNull(recipeForm.querySelector("#calories").value);
  const protein = getNumberOrNull(recipeForm.querySelector("#protein").value);
  const carbs = getNumberOrNull(recipeForm.querySelector("#carbs").value);
  const fat = getNumberOrNull(recipeForm.querySelector("#fat").value);
  const fiber = getNumberOrNull(recipeForm.querySelector("#fiber").value);

  const cookingTime = Number(recipeForm.querySelector("#cookingTime").value);
  const servings = Number(recipeForm.querySelector("#servings").value);

  if (
    !Number.isFinite(cookingTime) ||
    cookingTime <= 0 ||
    !Number.isFinite(servings) ||
    servings <= 0
  ) {
    showUploadMessage("Cooking time and servings must be greater than zero.");
    return null;
  }

  if (
    [calories, protein, carbs, fat, fiber].some(
      (value) => value !== null && value < 0,
    )
  ) {
    showUploadMessage("Nutrition values cannot be negative.");
    return null;
  }

  return {
    id: Date.now(),
    title: recipeForm.querySelector("#title").value.trim(),
    image: recipeForm.querySelector("#image").value.trim(),
    cookingTime,
    servings,
    sourceUrl: recipeForm.querySelector("#url").value.trim(),
    publisher: recipeForm.querySelector("#publisher").value.trim(),
    ingredients,
    nutrition: {
      calories: { amount: calories, unit: "kcal" },
      protein: { amount: protein, unit: "g" },
      carbs: { amount: carbs, unit: "g" },
      fat: { amount: fat, unit: "g" },
      fiber: { amount: fiber, unit: "g" },
    },
    bookmarked: false,
    isUserCreated: true,
  };
}

export function addHandlerUpload(handler) {
  recipeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    hideUploadMessage();

    const recipe = getUploadData();

    if (!recipe) return;

    handler(recipe);
  });
}

export function resetUploadForm() {
  recipeForm.reset();
  hideUploadMessage();

  const ingredientRows = [...recipeForm.querySelectorAll(".ingredient-row")];

  ingredientRows.slice(3).forEach((row) => row.remove());
}

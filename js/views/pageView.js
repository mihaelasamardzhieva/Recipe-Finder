const searchResults = document.querySelector(".search-results");
const recipeView = document.querySelector(".recipe-view");
const mealPlannerView = document.querySelector(".meal-planner-view");
const shoppingListView = document.querySelector(".shopping-list-view");

export function showRecipePage() {
  searchResults.classList.remove("hidden");
  recipeView.classList.remove("hidden");
  mealPlannerView.classList.add("hidden");
  shoppingListView.classList.add("hidden");
}

export function showShoppingListPage() {
  searchResults.classList.add("hidden");
  recipeView.classList.add("hidden");
  mealPlannerView.classList.add("hidden");
  shoppingListView.classList.remove("hidden");
}

export function showMealPlannerPage() {
  searchResults.classList.add("hidden");
  recipeView.classList.add("hidden");
  shoppingListView.classList.add("hidden");
  mealPlannerView.classList.remove("hidden");
}

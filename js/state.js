import { RESULTS_PER_PAGE } from "./config.js";
import { saveBookmarks } from "./localStorage.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
  userRecipes: [],
  shoppingList: [],
  mealPlanner: [],
};

export function setSearchResults(query, recipes) {
  state.search.query = query;
  state.search.results = recipes;
  state.search.page = 1;
}

export function getSearchResultsPage(page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export function addBookmark(recipe) {
  recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  saveBookmarks(state.bookmarks);
}

export function removeBookmark(id) {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);

  if (index === -1) return;
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) {
    state.recipe.bookmarked = false;
  }
  saveBookmarks(state.bookmarks);
}

export function addUserRecipe(recipe) {
  state.userRecipes.push(recipe);
}

export function addShoppingItem(item) {
  const name = item.name.trim();
  const unit = (item.unit || "").trim();

  const existingItem = state.shoppingList.find(
    (shoppingItem) =>
      shoppingItem.name.trim().toLowerCase() === name.toLowerCase() &&
      shoppingItem.unit.trim().toLowerCase() === unit.toLowerCase() &&
      !shoppingItem.checked,
  );

  if (existingItem && item.amount !== null) {
    if (existingItem.amount !== null) {
      existingItem.amount += item.amount;
    } else {
      existingItem.amount = item.amount;
    }

    return existingItem;
  }

  const newItem = {
    id: crypto.randomUUID(),
    name,
    amount: item.amount ?? null,
    unit,
    checked: false,
  };

  state.shoppingList.push(newItem);

  return newItem;
}

export function toggleShoppingItem(id) {
  const item = state.shoppingList.find(
    (shoppingItem) => shoppingItem.id === id,
  );

  if (item) item.checked = !item.checked;
}

export function updateShoppingItem(id, updates) {
  const item = state.shoppingList.find(
    (shoppingItem) => shoppingItem.id === id,
  );

  if (item) Object.assign(item, updates);
}

export function removeShoppingItem(id) {
  state.shoppingList = state.shoppingList.filter((item) => item.id !== id);
}

export function clearCompletedShoppingItems() {
  state.shoppingList = state.shoppingList.filter((item) => !item.checked);
}

export function addMealToPlanner(recipe, day, mealType) {
  const existingMeal = state.mealPlanner.find(
    (meal) => meal.day === day && meal.mealType === mealType,
  );

  const meal = {
    id: existingMeal ? existingMeal.id : crypto.randomUUID(),
    recipeId: recipe.id,
    title: recipe.title,
    image: recipe.image,
    day,
    mealType,
    recipe,
  };

  if (existingMeal) {
    Object.assign(existingMeal, meal);
    return existingMeal;
  }

  state.mealPlanner.push(meal);

  return meal;
}

export function removeMealFromPlanner(id) {
  state.mealPlanner = state.mealPlanner.filter((meal) => meal.id !== id);
}

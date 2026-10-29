import { getQuery, addHandlerSearch } from "./views/searchView";
import {
  state,
  setSearchResults,
  getSearchResultsPage,
  addBookmark,
  removeBookmark,
  addUserRecipe,
  addShoppingItem,
  toggleShoppingItem,
  removeShoppingItem,
  updateShoppingItem,
  clearCompletedShoppingItems,
  addMealToPlanner,
  removeMealFromPlanner,
} from "./state";
import { fetchRecipes } from "./api";
import {
  loadBookmarks,
  saveUserRecipes,
  loadUserRecipes,
  loadShoppingList,
  saveShoppingList,
  loadMealPlanner,
  saveMealPlanner,
} from "./localStorage";

import * as recipeView from "./views/recipeView";
import * as resultsView from "./views/resultsView";
import * as paginationView from "./views/paginationView";
import * as bookmarksView from "./views/bookmarksView";
import * as navView from "./views/navView";
import * as addRecipeView from "./views/addRecipeView";
import * as myRecipesView from "./views/myRecipesView";
import * as shoppingListView from "./views/shoppingListView";
import * as pageView from "./views/pageView";
import * as mealPlannerView from "./views/mealPlannerView";

async function controlSearchResults() {
  const query = getQuery();
  if (!query) return;

  state.recipe = {};
  recipeView.clearRecipe();

  resultsView.showSpinner();
  try {
    const recipes = await fetchRecipes(query);
    setSearchResults(query, recipes);
    resultsView.renderResults(getSearchResultsPage());

    paginationView.renderPagination({
      page: state.search.page,
      totalResults: state.search.results.length,
      resultsPerPage: state.search.resultsPerPage,
    });
  } catch (err) {
    console.log(err);
    resultsView.showError("Something went wrong while loading the results.");
  }
}

addHandlerSearch(controlSearchResults);

function controlRecipe(recipeId) {
  recipeView.showSpinner();

  try {
    const id = Number(recipeId);

    const recipe =
      state.search.results.find((recipe) => recipe.id === id) ||
      state.userRecipes.find((recipe) => recipe.id === id) ||
      state.bookmarks.find((recipe) => recipe.id === id) ||
      state.mealPlanner.find((meal) => Number(meal.recipeId) === id)?.recipe;

    if (!recipe) throw new Error("Recipe not found");

    state.recipe = recipe;

    recipeView.renderRecipe(recipe);
    pageView.showRecipePage();
    resultsView.updateActiveRecipe(id);
    navView.closeAllDropdowns();
  } catch (err) {
    console.log(err);
    recipeView.showError("Something went wrong while loading the recipe.");
  }
}

resultsView.addHandlerRecipe(controlRecipe);

function controlPagination(page) {
  resultsView.renderResults(getSearchResultsPage(page));

  paginationView.renderPagination({
    page: state.search.page,
    totalResults: state.search.results.length,
    resultsPerPage: state.search.resultsPerPage,
  });
}

paginationView.addHandlerPagination(controlPagination);

function controlBookmark() {
  if (!state.recipe.bookmarked) {
    addBookmark(state.recipe);
  } else {
    removeBookmark(state.recipe.id);
  }
  recipeView.renderRecipe(state.recipe);
  bookmarksView.renderBookmarks(state.bookmarks);
}

function controlBookmarkAction(action, recipeId) {
  if (action === "select") {
    controlRecipe(recipeId);
    return;
  }

  if (action === "remove") {
    removeBookmark(Number(recipeId));

    bookmarksView.renderBookmarks(state.bookmarks);

    if (state.recipe.id === Number(recipeId)) {
      recipeView.renderRecipe(state.recipe);
    }
  }
}

function controlUploadRecipe(recipe) {
  addUserRecipe(recipe);

  saveUserRecipes(state.userRecipes);

  state.recipe = recipe;
  recipeView.renderRecipe(recipe);

  myRecipesView.renderMyRecipes(state.userRecipes);

  addRecipeView.closeModal();
  addRecipeView.resetUploadForm();
}

function controlMyRecipeAction(action, recipeId) {
  const id = Number(recipeId);

  if (action === "select") {
    controlRecipe(id);
    return;
  }

  state.userRecipes = state.userRecipes.filter((recipe) => recipe.id !== id);

  saveUserRecipes(state.userRecipes);

  if (state.recipe.id === id && state.recipe.isUserCreated) {
    state.recipe = {};
    recipeView.clearRecipe();
  }

  myRecipesView.renderMyRecipes(state.userRecipes);
}

function controlShowShoppingList() {
  pageView.showShoppingListPage();
  shoppingListView.renderShoppingList(state.shoppingList);
  navView.closeAllDropdowns();
}

function controlAddShoppingItem(item) {
  addShoppingItem({
    ...item,
    amount: item.amount === "" ? null : Number(item.amount),
  });

  shoppingListView.renderShoppingList(state.shoppingList);
  saveShoppingList(state.shoppingList);
}

function controlToggleShoppingItem(id) {
  toggleShoppingItem(id);
  shoppingListView.renderShoppingList(state.shoppingList);
  saveShoppingList(state.shoppingList);
}

function controlRemoveShoppingItem(id) {
  removeShoppingItem(id);
  shoppingListView.renderShoppingList(state.shoppingList);
  saveShoppingList(state.shoppingList);
}

function controlSaveShoppingItem(id, updates) {
  updateShoppingItem(id, updates);

  shoppingListView.renderShoppingList(state.shoppingList);
  saveShoppingList(state.shoppingList);
}

function controlClearCompleted() {
  clearCompletedShoppingItems();
  shoppingListView.renderShoppingList(state.shoppingList);
  saveShoppingList(state.shoppingList);
}

function controlShowMealPlanner() {
  pageView.showMealPlannerPage();
}

state.shoppingList = loadShoppingList();
state.bookmarks = loadBookmarks();
state.userRecipes = loadUserRecipes();
state.mealPlanner = loadMealPlanner();

function controlMealPlanner() {
  mealPlannerView.renderMealPlanner(state.mealPlanner);
}

controlMealPlanner();

function controlAddToMealPlanner(day, mealType) {
  addMealToPlanner(state.recipe, day, mealType);

  mealPlannerView.renderMealPlanner(state.mealPlanner);
  saveMealPlanner(state.mealPlanner);
}

function controlDeleteMeal(mealId) {
  removeMealFromPlanner(mealId);

  mealPlannerView.renderMealPlanner(state.mealPlanner);
  saveMealPlanner(state.mealPlanner);
}

mealPlannerView.addHandlerDeleteMeal(controlDeleteMeal);
mealPlannerView.addHandlerShowMealPlanner(controlShowMealPlanner);
mealPlannerView.addHandlerSelectMeal(controlRecipe);

recipeView.addHandlerAddToMealPlanner(controlAddToMealPlanner);
recipeView.addHandlerAddIngredient(controlAddShoppingItem);
recipeView.addHandlerBookmark(controlBookmark);

shoppingListView.addHandlerEditShoppingItem();
shoppingListView.addHandlerSaveShoppingItem(controlSaveShoppingItem);
shoppingListView.addHandlerToggleCustomForm();
shoppingListView.addHandlerAddCustomItem(controlAddShoppingItem);
shoppingListView.addHandlerClearCompleted(controlClearCompleted);
shoppingListView.addHandlerRemoveShoppingItem(controlRemoveShoppingItem);
shoppingListView.addHandlerShowShoppingList(controlShowShoppingList);
shoppingListView.renderShoppingList(state.shoppingList);
shoppingListView.addHandlerToggleShoppingItem(controlToggleShoppingItem);

bookmarksView.renderBookmarks(state.bookmarks);
myRecipesView.renderMyRecipes(state.userRecipes);
bookmarksView.addHandlerSelectBookmark(controlBookmarkAction);

navView.addHandlerBookmarksDropdown();
navView.addHandlerMenuDropdown();
navView.addHandlerCloseDropdowns();
navView.addHandlerMyRecipesDropdown();

addRecipeView.addHandlerShowModal();
addRecipeView.addHandlerHideModal();
addRecipeView.addHandlerAddIngredient();
addRecipeView.addHandlerUpload(controlUploadRecipe);
myRecipesView.addHandlerSelectRecipe(controlMyRecipeAction);

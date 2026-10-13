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

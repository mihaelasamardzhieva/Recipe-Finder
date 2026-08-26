import { getQuery, addHandlerSearch } from "./views/searchView";
import { state, setSearchResults, getSearchResultsPage } from "./state";
import { fetchRecipes } from "./api";

import * as recipeView from "./views/recipeView";
import * as resultsView from "./views/resultsView";
import * as paginationView from "./views/paginationView";

async function controlSearchResults() {
  const query = getQuery();
  if (!query) return;

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
    const recipe = state.search.results.find(
      (recipe) => recipe.id === Number(recipeId),
    );
    if (!recipe) throw new Error("Recipe not found");

    state.recipe = recipe;

    recipeView.renderRecipe(recipe);
    resultsView.updateActiveRecipe(recipeId);
  } catch (err) {
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

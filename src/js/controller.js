import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  addBookmark,
  deleteBookmark,
  getSearchResultsPage,
  loadRecipe,
  loadSearchResults,
  state,
  updateServings,
  uploadRecipe,
} from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config';

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(getSearchResultsPage());
    bookmarksView.update(state.bookmarks);

    // 1. Loading
    await loadRecipe(id);
    const { recipe } = state;

    // 2. Rendering
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
controlRecipes();

const contorlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await loadSearchResults(query);

    resultsView.render(getSearchResultsPage());
    paginationView.render(state.search);
  } catch (err) {
    recipeView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(getSearchResultsPage(goToPage));

  // Render new buttons
  paginationView.render(state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings
  updateServings(newServings);
  // Update the recipe view
  recipeView.update(state.recipe);
};

const controlAddBookmark = function () {
  // add remove bookmark
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);

  // update view
  recipeView.update(state.recipe);

  // render bookmarks
  bookmarksView.render(state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(state.recipe);

    //display success message
    addRecipeView.renderMessage();

    //render bookmark
    bookmarksView.render(state.bookmarks);

    // change url id
    window.history.pushState(null, '', `#${state.recipe.id}`);

    //close from
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(contorlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

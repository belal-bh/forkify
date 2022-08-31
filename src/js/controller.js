import 'core-js/stable'; // Polyfiling async await
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime'; // Polyfiling others

import * as model from './model';
import reciepeView from './views/reciepeView';
import searchView from './views/searchView';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    reciepeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // 2) Rendering recipe
    reciepeView.render(model.state.recipe);
  } catch (err) {
    reciepeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.err(`${err} 💥💥💥`);
  }
};

const init = function () {
  reciepeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

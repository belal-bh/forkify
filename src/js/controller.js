import 'core-js/stable'; // Polyfiling async await
import 'regenerator-runtime/runtime'; // Polyfiling others

import * as model from './model';
import reciepeView from './views/reciepeView';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    reciepeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Rendering recipe
    reciepeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  reciepeView.addHandlerRender(controlRecipes);
};

init();

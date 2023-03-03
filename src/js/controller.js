const { async } = require("regenerator-runtime");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
import * as model from './model.js'
import RecipeView from './views/recipeView.js'
import SearchView from './views/searchView.js'
import ResultView from './views/ResultView.js';
import PaginationView from './views/paginationView.js'
import addnewrecipe from './views/addnewrecipe.js';
import PreviewBookmark from './views/preview'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import preview from './views/preview';
// if (module.hot) {
//   module.hot.accept();
// }
/**
 * 
 * @returns daaaa
 */
const controlRecipe = async function() {
  try {
    let id = window.location.hash.slice(1) 
    if(!id) return

    RecipeView.loadSpiner()
    /// load api
    await model.loadRecipe(id)

    //Render api
    RecipeView.render(model.sate.recipe)


  } catch (error) {
    RecipeView.renderError(`${error} controlerror`)
  }
}

// control search result
 const controlSearchResult  = async function(){
  try {
    /// get key food
    const key = SearchView.getQuery()
    if(!key) return
  
    // load search results
    await model.loadSearchResults(key)
    // rest page
    model.sate.search.page = 1

    //render search result 
    ResultView.render(model.getSearchResultPage())

    //render paginationView
    PaginationView.render(model.sate.search)

  } catch (error) {
    console.log(error);
  }
 }

const controlPagination = function(numPage){
  console.log(numPage)
  //render newpage by button next and preview
  ResultView.render(model.getSearchResultPage(numPage))

  PaginationView.render(model.sate.search)

}

const controlServing = function(newServ){
  /// update ingredieng
  model.updateSevting(newServ)
  //render 
  RecipeView.render(model.sate.recipe)

}

const loadstoageBookmark = () => {
  model.init()
  preview.render(model.sate.bookMark)
}

const controlBookMark = function(data){

  //add & delet book mark 
  if(!model.sate.recipe.bookMarkSate) model.addBookMark(model.sate.recipe)
  else model.deletBookMark(model.sate.recipe.id)

  // update recipe
  RecipeView.render(model.sate.recipe)

   //add preview book mark
   preview.render(model.sate.bookMark)

}

/// control add new recipe data 
// const controlNewRecipe = function (recipe) {
//    model.uploadrecipe(recipe)
// }

const controlAddRecipe = async function (newRecipe) {
  try {
    addnewrecipe.loadSpiner()

   await model.uploadRecipe(newRecipe) 
   
    RecipeView.render(model.sate.recipe)
   
   // // Show loading spinner
    // addRecipeView.renderSpinner();
  
    // // Upload the new recipe data
    // await model.uploadRecipe(newRecipe);
    // console.log(model.state.recipe);

    // // Render recipe
    // recipeView.render(model.state.recipe);

    // // Success message
    addnewrecipe.renderMessage();

    // // Render bookmark view
    preview.render(model.sate.bookMark)
    

    // Change ID in URL
    window.history.pushState(null, '', `#${model.sate.recipe.id}`);

    // Close form window
    // setTimeout(function () {
    //   addnewrecipe.close()
    //     ();
    // }, 1 * 1000);
  } catch (err) {
    console.error('💥', err);
    // addRecipeView.renderError(err.message);
  }
};
// function listern event

const init = function(){
  RecipeView.addHandlerRender(loadstoageBookmark)
  RecipeView.addHandlerRender(controlRecipe)
  SearchView.addHandlerSearch(controlSearchResult)
  PaginationView.addHandlerClick(controlPagination)
  RecipeView.addHandlerUpdateServing(controlServing)
  RecipeView.addHandlerBookMark(controlBookMark)
  addnewrecipe.addHandlerUpload(controlAddRecipe)
}
init()

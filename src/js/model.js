import { async } from "regenerator-runtime"
import {API_URL} from './config.js'
import {API_KEY, KEY} from './config.js'
import {PER_PAGE} from './config.js'
import { AJAX } from './help.js';
/**
 * sate moule control input recipe, bookmark, search result
 * @module satee
 */

export const sate = {
    recipe : {},
    search: {
        result: {},
        page : 1,
        resultPerPage:PER_PAGE

    },
    bookMark : [],
    
}
export const loadRecipe = async function(id) {

    try {
        const data = await AJAX(`${API_URL}/${id}?key=${KEY}`)
        let {recipe} = data.data
        sate.recipe = {
          cookingtime :recipe.cooking_time,
          id:recipe.id,
          imageurl:recipe.image_url,
          ingredients:recipe.ingredients,
          publisher:recipe.publisher,  
          servings:recipe.servings,
          sourceurl:recipe.source_url,
          title:recipe.title,
          
        }
       /// set sate for bookmark
    if(sate.bookMark.some(a =>  a.id === id )) { sate.recipe.bookMarkSate = true} else  {sate.recipe.bookMarkSate = false}

    } 
    catch (error) {
       console.error(`${error}`);
       throw error
    }
}

export const loadSearchResults = async function(key){
     try {
        const data = await AJAX(`${API_KEY}${key}&key=${KEY}`)
        console.log(`${API_KEY}${key}&?key=${KEY}`);
       sate.search.result =  data.data.recipes.map(rec =>{
    return {id:rec.id,
            imageurl:rec.image_url,
            title:rec.title,
            ingredients:rec.ingredients,
            publisher:rec.publisher,
      ...(rec.key && {key:rec.key})
    }})
     } catch (error) {
        throw error
     }
}

export const getSearchResultPage = function (page = sate.search.page){
    sate.search.page = page
    const start = (page - 1) *PER_PAGE
    const end = page * PER_PAGE
    return sate.search.result.slice(start,end)
}
export const updateSevting =function(seving){
   sate.recipe.ingredients.forEach(ing => ing.quantity = ing.quantity * seving/sate.recipe.servings)
   sate.recipe.servings = seving
   console.log(sate.recipe);
}


const saveBookMark = () => {
    localStorage.setItem('bookmark',JSON.stringify(sate.bookMark))
}

export const addBookMark = function (recipe) {
    // add book mark
    sate.bookMark.push(recipe)

    // mark current recipe as book mark
    if(recipe.id === sate.recipe.id) sate.recipe.bookMarkSate =true
    saveBookMark()
}

export const deletBookMark = function(id){
    const i = sate.bookMark.findIndex(e => e.id = id)
    sate.bookMark.splice(i, 1)
    if(id === sate.recipe.id) sate.recipe.bookMarkSate =false
    saveBookMark()
}

export const init = () => {
    const storage =localStorage.getItem('bookmark')
    if (storage) sate.bookMark = JSON.parse(storage)
}

const clear = () => {
    localStorage.clear('boomark')
}
// clear()

const creatrecipe = function (data){
  const {recipe} = data.data
  console.log(recipe.key);
  return {
      cookingtime :recipe.cooking_time,
      id:recipe.id,
      imageurl:recipe.image_url,
      ingredients:recipe.ingredients,
      publisher:recipe.publisher,  
      servings:recipe.servings,
      sourceurl:recipe.source_url,
      title:recipe.title,
      ...(recipe.key && {key:recipe.key})
  
    }
  }

export const uploadRecipe = async function(newrecipe) {
    try {
      const ingredients = Object.entries(newrecipe)
        .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].split(',').map(el => el.trim());
          // const ingArr = ing[1].replaceAll(' ', '').split(',');
          if (ingArr.length !== 3)
            throw new Error(
              'Wrong ingredient fromat! Please use the correct format :)'
            );
  
          const [quantity, unit, description] = ingArr;
  
          return { quantity: quantity ? +quantity : null, unit, description };
        });
        console.log(sate.recipe);

        const recipe = {
          title: newrecipe.title,
          source_url: newrecipe.sourceUrl,
          image_url: newrecipe.image,
          publisher: newrecipe.publisher,
          cooking_time: +newrecipe.cookingTime,
          servings: +newrecipe.servings,
          ingredients,
        };

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
        console.log(data);
        sate.recipe = creatrecipe(data);
        console.log(sate.recipe);
        addBookMark(sate.recipe);
    } catch (error) {
        throw error
    }
}



const recipe = document.getElementById('category-wrapper')
//const currentRecipe = document.getElementById('current-recipe-container')
const form = document.getElementById('form')
const recipesContainer = document.getElementById('recipes-container')

let recipeArrayFiltered;

const start = (userInput) => {
  const API = `https://api.edamam.com/search?q=${userInput}&app_key=6aec21ec4b520e9694efcadc0c641e29&app_id=94e5ef74&from=0&to=20`
  fetch(API)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      
      const recipeArray = Array.from(
        json.hits, element => element.recipe
      )
      console.log(recipeArray);
      console.log(recipeArray.length)
      console.log(recipeArray[0]);
      console.log(recipeArray[0].ingredientLines);
      console.log(recipeArray[0].ingredientLines.length);
      recipeArrayFiltered = recipeArray.filter ((element) =>{
        return element.ingredientLines.length <= 5; 
      });
      console.log(recipeArrayFiltered);
      
      recipeArrayFiltered = recipeArray.filter((recipe) => {
        return recipe.healthLabels.includes('Alcohol-Free')
      })
      console.log(recipeArrayFiltered);
      
      const recipeTitleArray = Array.from(
        json.hits, element => element.recipe.label
      );
      const recipePictureArray = Array.from(
       json.hits, element => element.recipe.image 
      );
      // const recipePictureArray = Array.from(
      //   json.hits, element = element.recipe.image 
      //  );
      const recipeDietLabelArray = Array.from(
        json.hits, element => element.recipe.healthLabels
      )
      recipeTitleArray.forEach((lable, index) => {
        const picture = recipePictureArray[index];
        const dietLable = recipeDietLabelArray[index];
        recipesContainer.innerHTML += `
        <div class="recipe">
        <img class="recipe-img" src="${picture}" alt="">
        <p class="recipe-name">${lable}</p>
        </div>
        `
        dietLable.forEach(tag =>{
          recipesContainer.innerHTML += `
          <span class="recipe-health">${tag} </span>
          `
        })
      })
      
      
      // currentRecipe.innerHTML = `<img class="recipe-img" src="${json.hits[0].recipe.image}" alt="picture">
      //   <p class="recipe-name">${json.hits[0].recipe.label}</p>
      //   `
      // json.hits[0].recipe.healthLabels.forEach((element) => {
      //   currentRecipe.innerHTML += `<span class="recipe-health">${element}</span>, `
      // })
    })

}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const textInput = document.getElementById('text-input').value;
  start(textInput)

})
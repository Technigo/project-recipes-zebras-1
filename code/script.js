
const recipe = document.getElementById('category-wrapper')
//const currentRecipe = document.getElementById('current-recipe-container')
const form = document.getElementById('form')
const recipesContainer = document.getElementById('recipes-container')
const allCheckboxes = document.querySelectorAll('.checkbox')
const ingredientsFilter = document.getElementById('ingredients')
const healthSelector = document.getElementById('health-selector')

let recipeArrayFiltered;

//Function that updates the Recipes
const updateHTML = (array) =>{
  recipesContainer.innerHTML = "";
  const lableArray = Array.from(
    array, element => element.label
  );
  console.log(lableArray);
  const pictureArray = Array.from(
    array, element => element.image
  );
  const sourseURLArray = Array.from(
    array, element => element.url
  )
  const sourseArray =Array.from(
    array, element => element.source
  )
  lableArray.forEach((lable, index) => {
  const picture = pictureArray[index];
  const sourceURL = sourseURLArray[index];
  const source = sourseArray[index]
  recipesContainer.innerHTML += `
  <div class="recipe">
  <img class="recipe-img" src="${picture}" alt="">
  <p class="recipe-name">${lable}</p>
  <a class="recipe-link" href="${sourceURL}">${source}</a>
  </div>
  `
})
}


const filterByHealthLable = (value) =>{
  console.log(recipeArrayFiltered)  
  const newArray = recipeArrayFiltered.filter((recipe) => {
        return recipe.healthLabels.includes(value)
      });
    updateHTML(newArray)
}
const start = (userInput) => {
    recipesContainer.innerHTML = "";
    const API = `https://api.edamam.com/search?q=${userInput}&app_key=6aec21ec4b520e9694efcadc0c641e29&app_id=94e5ef74&from=0&to=50`
  fetch(API)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      const recipeArray = Array.from(
        json.hits, element => element.recipe
      ); 
      recipeArrayFiltered = recipeArray;
      updateHTML(recipeArrayFiltered)
      
      
      //Filter functions

      const filterByIngredients = (checkbox) => {
        recipeArrayFiltered = recipeArray;
        const newArray = recipeArrayFiltered.filter ((element) =>{   
          return element.ingredientLines.length <= Number(checkbox); 
        });
        updateHTML(newArray)
      }
      //EVENT LISTENER
      ingredientsFilter.addEventListener('change',() =>{
        const value = ingredientsFilter.value;
        filterByIngredients(value);
      })

    })

}

//Event Listeners
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const textInput = document.getElementById('text-input').value;
  start(textInput)
})

allCheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change', ()=>{
        const checkboxValue = checkbox.value
        console.log(checkboxValue)
        start(checkboxValue)
    })
})
// ingredientsFilter.addEventListener('change',() =>{
//   const value = ingredientsFilter.value;
//   filterByIngredients(value);
// })

healthSelector.addEventListener('change', () => {
  const value = healthSelector.value;
  filterByHealthLable(value)
})

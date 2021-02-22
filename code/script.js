const API ="https://api.edamam.com/search?q=chicken&app_key=1d91de9fbaa632b052c4cbd96e6cf9b0&app_id=a8e71c76&from=0&to=15&diet=high-protein&health=peanut-free"
const recipe = document.getElementById('category-wrapper')
const currentRecipe = document.getElementById('current-recipe-container')

fetch(API)
.then((response) => {
    return response.json()
})
.then((json) => {
    console.log(json.hits[0].recipe.label)
    currentRecipe.innerHTML = `<img class="recipe-img" src="${json.hits[0].recipe.image}" alt="picture">
    <p class="recipe-name">${json.hits[0].recipe.label}</p>
    `
    json.hits[0].recipe.healthLabels.forEach((element)=>{
        currentRecipe.innerHTML +=`<span class="recipe-health">${element}</span>, `
    })
})

console.log("hello I am working")
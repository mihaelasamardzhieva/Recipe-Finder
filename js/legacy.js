import { API_KEY, URL } from "./config.js";
// import { JSON } from "./test.js";

const btnSearch = document.querySelector(".btn__search");
const input = document.querySelector(".input__search");
const resultsList = document.querySelector(".results");
const recipeSection = document.querySelector(".recipe");

const model = {
  recipe: {},
  results: [],
};

btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  getRecipes(query);
  input.value = "";
});

const getRecipes = async function (query) {
  // const url = `${URL}?apiKey=${API_KEY}&ingredients=${query}&number=50`;

  const url = `${URL}?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&number=10`;

  try {
    const respone = await fetch(url);
    const data = await respone.json();
    // console.log(JSON);
    // const data = JSON;
    // console.log(data);
    model.results = createRecipesArr(data.results);
    loadRecipes(model.results);
    console.log(model.results);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
};

const createRecipesArr = function (arr) {
  const recipes = arr.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    cookingTime: recipe.readyInMinutes,
    servings: recipe.servings,
    source: recipe.sourceUrl,
    nutritions: {
      ingredients: [...recipe.nutrition.ingredients],
      nutrients: {
        calories: {
          name: recipe.nutrition.nutrients[0].name,
          amount: recipe.nutrition.nutrients[0].amount,
          unit: recipe.nutrition.nutrients[0].unit,
        },
        fat: {
          name: recipe.nutrition.nutrients[1].name,
          amount: recipe.nutrition.nutrients[1].amount,
          unit: recipe.nutrition.nutrients[1].unit,
        },
        carbs: {
          name: recipe.nutrition.nutrients[3].name,
          amount: recipe.nutrition.nutrients[3].amount,
          unit: recipe.nutrition.nutrients[3].unit,
        },
        protein: {
          name: recipe.nutrition.nutrients[10].name,
          amount: recipe.nutrition.nutrients[10].amount,
          unit: recipe.nutrition.nutrients[10].unit,
        },
      },
    },
  }));
  return recipes;
};

const generateMarkup = function (data) {
  const markup = `
         <li class="recipe__result" data-id="${data.id}">
                      <figure class="recipe__img">
                        <img src="${data.image}" alt="${data.title}" />
                      </figure>
                      <div class="recipe__data">
                        <h4 class="recipe__title">
                          ${data.title}
                        </h4>
                        <div class="calories__info">
                        <i class="bi bi-fire calories__icon"></i>
                        <p class="recipe__calories">${data.nutritions.nutrients.calories.amount} ${data.nutritions.nutrients.calories.unit}</p>
                        </div>
                      </div>
                  </li> 
  `;
  resultsList.insertAdjacentHTML("beforeend", markup);
};
const loadRecipes = function (arr) {
  arr.forEach((recipe) => {
    generateMarkup(recipe);
  });
};

resultsList.addEventListener("click", function (e) {
  const recipeEl = e.target.closest(".recipe__result");

  if (!recipeEl) return;
  const recipeId = recipeEl.dataset.id;
  renderRecipe(recipeId);
  // console.log(recipeId);
});

const renderRecipe = function (id) {
  model.recipe = model.results.find((el) => el.id === Number(id));
  // console.log(model.recipe);
  const markup = ` 

  <div class="recipe__view">
          <img src="${model.recipe.image}" alt="${
            model.recipe.title
          }" class="recipe__view--img" />
          <h1 class="recipe__view--title">${model.recipe.title}</h1>
          <div class="recipe__details">
          <div class="recipe_info">
          <i class="bi bi-clock cooking__icon"></i>
            <span class="cooking time">${
              model.recipe.cookingTime
            } minutes </span>
            </div>
            <div class="recipe_info">
            <i class="bi bi-people servings__icon"></i>
            <span class="servings">${model.recipe.servings} servings </span>
            </div>
            <div class="recipe_info">
            <i class="bi bi-cake2 carbs__icon"></i>
            <span class="carbs">${
              model.recipe.nutritions.nutrients.carbs.name
            }: ${model.recipe.nutritions.nutrients.carbs.amount}${
              model.recipe.nutritions.nutrients.carbs.unit
            }</span>
           <i class="bi bi-egg protein__icon"></i>
            <span class="protein">${
              model.recipe.nutritions.nutrients.protein.name
            }: ${model.recipe.nutritions.nutrients.protein.amount}${
              model.recipe.nutritions.nutrients.protein.unit
            }</span>
            <i class="bi bi-droplet fat__icon"></i>
            <span class="fat">${model.recipe.nutritions.nutrients.fat.name}: ${
              model.recipe.nutritions.nutrients.fat.amount
            }${model.recipe.nutritions.nutrients.fat.unit}</span>
  </div>
          </div>
          <div class="ingredients__list">
            <h2>Ingredients</h2>
            <ul class="ingredients">
            ${model.recipe.nutritions.ingredients
              .map((ing) => generateMarkupIngredient(ing))
              .join("")}
            </ul>
          </div>
          <div class="how__to__cook">
            <h2>How to cook</h2>
            <span class="directions"
              >Please check out the directions at the website.</span
            >
            <a class="btn btn__url" href="${
              model.recipe.source
            }">Check out now</a>
          </div>
        </div>

  `;
  recipeSection.innerHTML = "";
  recipeSection.insertAdjacentHTML("beforeend", markup);
};

const generateMarkupIngredient = function (ing) {
  return `
  <li class="ingredient">
    <span class="amount">${ing.amount}</span>
    <span class="unit">${ing.unit}</span>
    <span class="name">${ing.name}</span>
  </li>
  `;
};

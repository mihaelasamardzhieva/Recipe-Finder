// import { JSON } from "../mockRecipes";

import { URL, API_KEY, RESULTS_PER_PAGE } from "./config";

export const fetchRecipes = async function (query) {
  const url = `${URL}?apiKey=${API_KEY}&query=${query}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&number=50`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Couldn't fetch recipes.");

    const data = await response.json();
    console.log(data);

    // const data = JSON;
    return createRecipesArray(data.results);
  } catch (error) {
    console.error("Error fetching: ", error);
    throw error;
  }
};

const createRecipesArray = function (recipes) {
  return recipes.map((recipe) => {
    const nutrients = recipe.nutrition.nutrients;

    const calories = nutrients.find((nutrient) => nutrient.name === "Calories");

    const fat = nutrients.find((nutrient) => nutrient.name === "Fat");

    const carbs = nutrients.find(
      (nutrient) => nutrient.name === "Carbohydrates",
    );

    const protein = nutrients.find((nutrient) => nutrient.name === "Protein");

    const fiber = nutrients.find((nutrient) => nutrient.name === "Fiber");

    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image.replace("-312x231", "-636x393"),
      cookingTime: recipe.readyInMinutes,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      ingredients: recipe.nutrition.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),

      nutrition: {
        calories: {
          amount: calories ? Math.round(calories.amount) : null,
          unit: calories?.unit ?? "",
        },
        fat: {
          amount: fat ? Math.round(fat.amount) : null,
          unit: fat?.unit ?? "",
        },
        carbs: {
          amount: carbs ? Math.round(carbs.amount) : null,
          unit: carbs?.unit ?? "",
        },
        protein: {
          amount: protein ? Math.round(protein.amount) : null,
          unit: protein?.unit ?? "",
        },
        fiber: {
          amount: fiber ? Math.round(fiber.amount) : null,
          unit: fiber?.unit ?? "",
        },
      },
    };
  });
};

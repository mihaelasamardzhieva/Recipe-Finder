import { API_URL, API_KEY } from "./config";

export const fetchRecipes = async function (query) {
  if (!API_KEY) {
    throw new Error(
      "Missing SPOONACULAR_API_KEY. Copy .env.example to .env and add your key.",
    );
  }

  const url = `${API_URL}?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true&number=50`;

  const response = await fetch(url);

  if (!response.ok) {
    // 402 = Spoonacular's daily request limit has been reached
    const error = new Error("Couldn't fetch recipes.");
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  return createRecipesArray(data.results);
};

const round = (number, decimals = 0) => {
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
};

const getNutrient = (nutrients, name) => {
  const nutrient = nutrients.find((item) => item.name === name);

  return {
    amount: nutrient ? round(nutrient.amount) : null,
    unit: nutrient?.unit ?? "",
  };
};

const createRecipesArray = function (recipes) {
  return recipes.map((recipe) => {
    const nutrients = recipe.nutrition.nutrients;

    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image?.replace("-312x231", "-636x393") ?? "",
      cookingTime: recipe.readyInMinutes,
      servings: recipe.servings,
      sourceUrl: recipe.sourceUrl,
      ingredients: recipe.nutrition.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: round(ingredient.amount, 2),
        unit: ingredient.unit,
      })),

      nutrition: {
        calories: getNutrient(nutrients, "Calories"),
        fat: getNutrient(nutrients, "Fat"),
        carbs: getNutrient(nutrients, "Carbohydrates"),
        protein: getNutrient(nutrients, "Protein"),
        fiber: getNutrient(nutrients, "Fiber"),
      },
    };
  });
};

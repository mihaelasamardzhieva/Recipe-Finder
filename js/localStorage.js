function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Could not save "${key}":`, err);
  }
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch (err) {
    console.error(`Could not load "${key}":`, err);
    return [];
  }
}

export const saveBookmarks = (bookmarks) => save("bookmarks", bookmarks);
export const loadBookmarks = () => load("bookmarks");

export const saveUserRecipes = (recipes) => save("userRecipes", recipes);
export const loadUserRecipes = () => load("userRecipes");

export const saveShoppingList = (items) => save("shoppingList", items);
export const loadShoppingList = () => load("shoppingList");

export const saveMealPlanner = (meals) => save("mealPlanner", meals);
export const loadMealPlanner = () => load("mealPlanner");

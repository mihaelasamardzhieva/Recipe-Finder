export function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

export function loadBookmarks() {
  const bookmarks = localStorage.getItem("bookmarks");

  if (!bookmarks) return [];

  return JSON.parse(bookmarks);
}

export function saveUserRecipes(recipes) {
  localStorage.setItem("userRecipes", JSON.stringify(recipes));
}

export function loadUserRecipes() {
  const recipes = localStorage.getItem("userRecipes");

  if (!recipes) return [];

  try {
    return JSON.parse(recipes);
  } catch (err) {
    console.error("Could not load user recipes:", err);
    return [];
  }
}

export function saveShoppingList(items) {
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

export function loadShoppingList() {
  const items = localStorage.getItem("shoppingList");

  if (!items) return [];

  try {
    return JSON.parse(items);
  } catch (err) {
    console.error("Could not load shopping list:", err);
    return [];
  }
}

export const saveMealPlanner = function (meals) {
  localStorage.setItem("mealPlanner", JSON.stringify(meals));
};

export const loadMealPlanner = function () {
  const data = localStorage.getItem("mealPlanner");

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Could not load the meal planner:", err);
    return [];
  }
};

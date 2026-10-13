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

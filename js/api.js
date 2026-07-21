const USE_MOCK_DATA = false;

export async function searchRecipes(query) {
  if (USE_MOCK_DATA) return mockRecipes;
}

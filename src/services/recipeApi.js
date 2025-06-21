// Spoonacular API integration
const API_KEY = "your_spoonacular_api_key_here"; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

export async function searchRecipes(query, filters = {}) {
  const params = new URLSearchParams({
    query: query,
    number: filters.number || 12,
    apiKey: API_KEY,
    ...filters
  });
  
  const res = await fetch(`${BASE_URL}/complexSearch?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return await res.json();
}

export async function getRecipeDetails(id) {
  const res = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch recipe details');
  return await res.json();
}

export async function getRandomRecipes(number = 6, tags = '') {
  const params = new URLSearchParams({
    number: number,
    tags: tags,
    apiKey: API_KEY
  });
  
  const res = await fetch(`${BASE_URL}/random?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch random recipes');
  return await res.json();
}

export async function getRecipeInstructions(id) {
  const res = await fetch(`${BASE_URL}/${id}/analyzedInstructions?apiKey=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch recipe instructions');
  return await res.json();
}

export async function getRecipeIngredients(id) {
  const res = await fetch(`${BASE_URL}/${id}/ingredientWidget.json?apiKey=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch recipe ingredients');
  return await res.json();
}

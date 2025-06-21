// Spoonacular API Integration Service
const API_KEY = "0080419efbce4b14a7838dd891fd7afb"; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com';

// Helper function for API calls
async function callApi(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    apiKey: API_KEY,
    ...params
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  
  return await response.json();
}

// Search recipes by query and optional filters
export async function searchRecipes(query, options = {}) {
  const params = {
    query,
    number: options.number || 12,
    offset: options.offset || 0,
    addRecipeInformation: true,  // Get detailed information in one call
    ...options
  };
  
  try {
    console.log('API call params:', params);
    const data = await callApi('/recipes/complexSearch', params);
    return data;
  } catch (error) {
    console.error('Spoonacular API Error:', error);
    // Return mock data if API fails
    if (options.useMockData) {
      return getMockRecipeData(options.number || 12);
    }
    throw error;
  }
}

// Get detailed recipe information
export async function getRecipeDetails(id) {
  return await callApi(`/recipes/${id}/information`, { includeNutrition: true });
}

// Get random recipes
export async function getTrendingRecipes(count = 4) {
  try {
    const data = await callApi('/recipes/random', { 
      number: count,
      tags: 'popular' 
    });
    
    return data.recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      isNew: isNewRecipe(recipe.createdAt)
    }));
  } catch (error) {
    console.error('Failed to fetch trending recipes:', error);
    // Return mock trending data
    return getMockTrendingRecipes(count);
  }
}

function getMockTrendingRecipes(count = 4) {
  // Use a subset of mock recipes with appropriate fields
  return getMockRecipeData(8).slice(0, count).map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    isNew: Math.random() > 0.7 // 30% chance of being marked as new
  }));
}

function isNewRecipe(date) {
  // If no date provided, return false
  if (!date) return false;
  
  // Consider a recipe "new" if it's less than 30 days old
  const recipeDate = new Date(date);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return recipeDate > thirtyDaysAgo;
}
export async function getRandomRecipes(number = 6, tags = '') {
  return await callApi('/recipes/random', { number, tags });
}

// Get recipe instructions
export async function getRecipeInstructions(id) {
  return await callApi(`/recipes/${id}/analyzedInstructions`);
}

// Get recipe nutrition information
export async function getRecipeNutrition(id) {
  return await callApi(`/recipes/${id}/nutritionWidget.json`);
}

// Search ingredients
export async function searchIngredients(query, number = 10) {
  return await callApi('/food/ingredients/search', { query, number });
}

// Get ingredient information
export async function getIngredientInfo(id, amount = 1, unit = 'piece') {
  return await callApi(`/food/ingredients/${id}/information`, { amount, unit });
}

// Generate shopping list from recipes
export async function generateShoppingList(ids) {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('Recipe IDs must be a non-empty array');
  }
  
  return await callApi('/recipes/shopping-list', { ids: ids.join(',') });
}

// Provide mock data when API fails or for testing
function getMockRecipeData(count = 12) {
  const mockRecipes = [
    {
      id: 1001,
      title: "Classic Caesar Salad",
      image: "https://spoonacular.com/recipeImages/caesar-salad.jpg",
      summary: "A delicious classic Caesar salad with homemade dressing and crispy croutons.",
      spoonacularScore: 85,
      dishTypes: ["salad", "lunch"],
      readyInMinutes: 20,
      servings: 2
    },
    {
      id: 1002,
      title: "Homemade Margherita Pizza",
      image: "https://spoonacular.com/recipeImages/margherita-pizza.jpg",
      summary: "Simple and delicious Margherita pizza with fresh basil, tomatoes, and mozzarella.",
      spoonacularScore: 90,
      dishTypes: ["main course", "dinner"],
      readyInMinutes: 35,
      servings: 4
    },
    {
      id: 1003,
      title: "Chicken Alfredo Pasta",
      image: "https://spoonacular.com/recipeImages/chicken-alfredo.jpg",
      summary: "Creamy Alfredo sauce with grilled chicken over fettuccine pasta.",
      spoonacularScore: 88,
      dishTypes: ["main course", "dinner"],
      readyInMinutes: 30,
      servings: 4
    },
    {
      id: 1004,
      title: "Vegetable Stir Fry",
      image: "https://spoonacular.com/recipeImages/vegetable-stir-fry.jpg",
      summary: "Quick and healthy vegetable stir fry with a savory sauce.",
      spoonacularScore: 82,
      dishTypes: ["main course", "lunch"],
      readyInMinutes: 25,
      servings: 3
    },
    {
      id: 1005,
      title: "Chocolate Chip Cookies",
      image: "https://spoonacular.com/recipeImages/chocolate-chip-cookies.jpg",
      summary: "Classic homemade chocolate chip cookies, soft and chewy in the center.",
      spoonacularScore: 95,
      dishTypes: ["dessert"],
      readyInMinutes: 45,
      servings: 24
    },
    {
      id: 1006,
      title: "Grilled Salmon with Lemon",
      image: "https://spoonacular.com/recipeImages/grilled-salmon.jpg",
      summary: "Perfectly grilled salmon with fresh lemon and herbs.",
      spoonacularScore: 92,
      dishTypes: ["main course", "dinner"],
      readyInMinutes: 22,
      servings: 2
    }
  ];
  
  // Create more mock recipes by varying the existing ones
  const allMockRecipes = [...mockRecipes];
  while (allMockRecipes.length < count) {
    const original = mockRecipes[allMockRecipes.length % mockRecipes.length];
    allMockRecipes.push({
      ...original,
      id: original.id + allMockRecipes.length,
      title: `${original.title} (Variation ${allMockRecipes.length})`,
    });
  }
  
  // Return in the same format as the API
  return {
    results: allMockRecipes.slice(0, count),
    totalResults: 100,
    offset: 0,
    number: count
  };
}

export default {
  searchRecipes,
  getRecipeDetails,
  getRandomRecipes,
  getRecipeInstructions,
  getRecipeNutrition,
  searchIngredients,
  getIngredientInfo,
  generateShoppingList
};
/**
 * TheMealDB API Integration Service
 * Free API with no rate limits or API key required
 * Base URL: https://www.themealdb.com/api/json/v1/1
 */
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Helper function for API calls
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - JSON response
 */
async function callApi(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} - ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Search recipes by query
 * @param {string} query - Search query
 * @param {Object} options - Optional parameters for search
 * @returns {Promise} - Search results
 */
export async function searchRecipes(query, options = {}) {
  try {
    console.log('=== SEARCH RECIPES STARTED ===');
    console.log('Query:', query);
    console.log('Options:', options);
    
    let meals = [];
    
    if (!query) {
      console.log('No query provided, fetching random recipes...');
      // If no query provided, use our enhanced fetch strategy to get more variety
      
      // Strategy 1: Get some random recipes
      const randomData = await getRandomRecipes(10);
      meals = randomData.results || [];
      console.log('Random recipes fetched:', meals.length);
      
      // Strategy 2: Get recipes from popular categories
      const categories = ['Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian', 'Breakfast', 'Side'];
      const fetchPromises = categories.map(category => fetchCategoryRecipes(category, 3));
      
      const categoryResults = await Promise.all(fetchPromises);
      categoryResults.forEach(results => {
        meals = [...meals, ...results];
      });
      
    } else {
      console.log('Searching with query:', query);
      // Search by name
      const data = await callApi(`/search.php?s=${encodeURIComponent(query)}`);
      console.log('API response for name search:', data);
      
      const nameResults = formatMealResults(data.meals || []);
      console.log('Formatted name results:', nameResults.length, 'recipes');
      
      // Also search by first letter if the search term is short
      if (query.length === 1) {
        console.log('Single letter search, also searching by first letter...');
        const letterData = await callApi(`/search.php?f=${encodeURIComponent(query)}`);
        const letterResults = formatMealResults(letterData.meals || []);
        
        // Combine and deduplicate results
        const combinedResults = [...nameResults, ...letterResults];
        const uniqueMeals = Array.from(new Map(combinedResults.map(meal => [meal.id, meal])).values());
        meals = uniqueMeals;
        console.log('Combined letter+name results:', meals.length, 'recipes');
      } else {
        meals = nameResults;
      }
      
      // If we found very few results, get recipes from related category or area
      if (meals.length < 5) {
        console.log('Found few results, searching for related categories/areas...');
        // Try to find relevant categories or cuisines
        let relatedCategory = null;
        let relatedCuisine = null;
        
        // Get all categories and areas for better matching
        const allCategories = await getAllCategories();
        const allAreas = await getAllAreas();
        
        // Find best matching category and cuisine based on query
        relatedCategory = findBestMatch(query, allCategories);
        relatedCuisine = findBestMatch(query, allAreas);
        
        console.log('Related category found:', relatedCategory);
        console.log('Related cuisine found:', relatedCuisine);
        
        let additionalMeals = [];
        
        // Get by category
        if (relatedCategory) {
          const categoryResults = await fetchCategoryRecipes(relatedCategory, 8);
          additionalMeals = [...additionalMeals, ...categoryResults];
        }
        
        // Get by cuisine
        if (relatedCuisine) {
          const cuisineResults = await fetchAreaRecipes(relatedCuisine, 8);
          additionalMeals = [...additionalMeals, ...cuisineResults];
        }
        
        // Try to search for ingredient-based results
        try {
          console.log('Searching by ingredient:', query);
          const ingredientData = await callApi(`/filter.php?i=${encodeURIComponent(query)}`);
          if (ingredientData.meals && ingredientData.meals.length > 0) {
            console.log('Found ingredient-based results:', ingredientData.meals.length);
            // Fetch full details for each meal
            const detailPromises = ingredientData.meals.slice(0, 8).map(meal => 
              callApi(`/lookup.php?i=${meal.idMeal}`)
            );
            
            const detailResults = await Promise.all(detailPromises);
            const detailedIngredientMeals = detailResults
              .filter(r => r.meals && r.meals.length > 0)
              .map(r => r.meals[0]);
            
            const formattedIngredientMeals = formatMealResults(detailedIngredientMeals);
            additionalMeals = [...additionalMeals, ...formattedIngredientMeals];
          }
        } catch (ingredientError) {
          console.warn('Error searching by ingredient:', ingredientError);
          // Continue without ingredient results
        }
        
        // Combine results while removing duplicates
        const combinedResults = [...meals, ...additionalMeals];
        meals = Array.from(new Map(combinedResults.map(meal => [meal.id, meal])).values());
        console.log('After additional searches, total results:', meals.length);
      }
    }
    
    // If we STILL don't have enough meals, add some random ones as fallback
    if (meals.length < 12) {
      console.log('Still need more results, adding random recipes...');
      const remainingCount = 12 - meals.length;
      const randomData = await getRandomRecipes(remainingCount);
      const randomMeals = randomData.results || [];
      
      // Combine while avoiding duplicates
      const combinedResults = [...meals, ...randomMeals];
      meals = Array.from(new Map(combinedResults.map(meal => [meal.id, meal])).values());
      console.log('Final results with random recipes:', meals.length);
    }
    
    // Sort by relevance if search query provided
    if (query) {
      meals = sortByRelevance(meals, query);
      console.log('Results sorted by relevance');
    }
    
    console.log('=== SEARCH RECIPES COMPLETED ===');
    console.log('Final result count:', meals.length);
    
    // Add totalResults for pagination
    return {
      results: meals,
      totalResults: meals.length
    };
  } catch (error) {
    console.error('Error in searchRecipes:', error);
    console.error('Error details:', error.message, error.stack);
    throw error;
  }
}

/**
 * Find the best matching string from an array based on query
 * @param {string} query - Search query
 * @param {Array} items - Array of strings to match against
 * @returns {string|null} - Best matching string or null
 */
function findBestMatch(query, items) {
  if (!query || !items || items.length === 0) return null;
  
  const lowerQuery = query.toLowerCase();
  
  // First try exact match
  const exactMatch = items.find(item => 
    item.toLowerCase() === lowerQuery
  );
  if (exactMatch) return exactMatch;
  
  // Then try starts with
  const startsWithMatch = items.find(item => 
    item.toLowerCase().startsWith(lowerQuery)
  );
  if (startsWithMatch) return startsWithMatch;
  
  // Then try includes
  const includesMatch = items.find(item => 
    item.toLowerCase().includes(lowerQuery)
  );
  if (includesMatch) return includesMatch;
  
  // Then try partial word match (query words in item)
  const queryWords = lowerQuery.split(/\s+/);
  for (const word of queryWords) {
    if (word.length < 3) continue; // Skip very short words
    
    const wordMatch = items.find(item => 
      item.toLowerCase().includes(word)
    );
    if (wordMatch) return wordMatch;
  }
  
  return null;
}

/**
 * Sort results by relevance to search query
 * @param {Array} meals - Array of meal objects
 * @param {string} query - Search query
 * @returns {Array} - Sorted array of meals
 */
function sortByRelevance(meals, query) {
  if (!query) return meals;
  
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  // Calculate relevance score for each recipe
  const scoredMeals = meals.map(meal => {
    let score = 0;
    
    // Exact title match is highest priority
    if (meal.title.toLowerCase() === lowerQuery) {
      score += 100;
    }
    // Title starts with query
    else if (meal.title.toLowerCase().startsWith(lowerQuery)) {
      score += 50;
    }
    // Title contains query
    else if (meal.title.toLowerCase().includes(lowerQuery)) {
      score += 30;
    }
    
    // Check for individual words in title
    for (const word of queryWords) {
      if (meal.title.toLowerCase().includes(word)) {
        score += 10;
      }
    }
    
    // Category matches
    if (meal.category && meal.category.toLowerCase().includes(lowerQuery)) {
      score += 20;
    }
    
    // Area/cuisine matches
    if (meal.area && meal.area.toLowerCase().includes(lowerQuery)) {
      score += 20;
    }
    
    // Check ingredient matches (if any)
    if (meal.ingredients) {
      const matchedIngredients = meal.ingredients.filter(ing => 
        ing.toLowerCase().includes(lowerQuery)
      );
      score += matchedIngredients.length * 15;
    }
    
    return { meal, score };
  });
  
  // Sort by score (descending)
  scoredMeals.sort((a, b) => b.score - a.score);
  
  // Return sorted meals
  return scoredMeals.map(item => item.meal);
}

/**
 * Helper function to fetch recipes by category
 * @param {string} category - Category to fetch
 * @param {number} limit - Maximum number of recipes to fetch
 * @returns {Array} - Array of formatted recipes
 */
async function fetchCategoryRecipes(category, limit = 5) {
  try {
    const data = await callApi(`/filter.php?c=${encodeURIComponent(category)}`);
    
    if (!data.meals) return [];
    
    // Get a random subset of the meals
    const selectedMeals = data.meals
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
    
    // Fetch details for each meal
    const detailsPromises = selectedMeals.map(meal => 
      callApi(`/lookup.php?i=${meal.idMeal}`)
    );
    
    const detailsResults = await Promise.all(detailsPromises);
    const detailedMeals = detailsResults
      .map(r => r.meals && r.meals.length > 0 ? r.meals[0] : null)
      .filter(Boolean);
    
    return formatMealResults(detailedMeals);
  } catch (error) {
    console.error(`Error fetching ${category} recipes:`, error);
    return [];
  }
}

/**
 * Helper function to fetch recipes by area/cuisine
 * @param {string} area - Area/cuisine to fetch
 * @param {number} limit - Maximum number of recipes to fetch
 * @returns {Array} - Array of formatted recipes
 */
async function fetchAreaRecipes(area, limit = 5) {
  try {
    const data = await callApi(`/filter.php?a=${encodeURIComponent(area)}`);
    
    if (!data.meals) return [];
    
    // Get a random subset of the meals
    const selectedMeals = data.meals
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
    
    // Fetch details for each meal
    const detailsPromises = selectedMeals.map(meal => 
      callApi(`/lookup.php?i=${meal.idMeal}`)
    );
    
    const detailsResults = await Promise.all(detailsPromises);
    const detailedMeals = detailsResults
      .map(r => r.meals && r.meals.length > 0 ? r.meals[0] : null)
      .filter(Boolean);
    
    return formatMealResults(detailedMeals);
  } catch (error) {
    console.error(`Error fetching ${area} recipes:`, error);
    return [];
  }
}

/**
 * Get recipes by ingredient
 * @param {string} ingredient - Main ingredient
 * @returns {Promise} - Recipes with ingredient
 */
export async function getRecipesByIngredient(ingredient) {
  try {
    const data = await callApi(`/filter.php?i=${encodeURIComponent(ingredient)}`);
    
    if (!data.meals) return { results: [] };
    
    // Fetch full details for the first 25 recipes (to avoid too many API calls)
    const detailsPromises = data.meals.slice(0, 25).map(meal => 
      callApi(`/lookup.php?i=${meal.idMeal}`)
    );
    
    const detailsResults = await Promise.all(detailsPromises);
    const detailedMeals = detailsResults
      .map(r => r.meals && r.meals.length > 0 ? r.meals[0] : null)
      .filter(Boolean);
    
    return {
      results: formatMealResults(detailedMeals)
    };
  } catch (error) {
    console.error(`Error fetching recipes with ingredient ${ingredient}:`, error);
    return { results: [] };
  }
}

/**
 * Get random recipes
 * @param {number} count - Number of recipes to get (maximum 10)
 * @returns {Promise} - Random recipes
 */
export async function getRandomRecipes(count = 4) {
  // TheMealDB only returns 1 random meal per API call
  // So we need to make multiple requests to get more
  const meals = [];
  const maxCount = Math.min(count, 10); // Limit to 10 to avoid excessive API calls
  
  // Execute the requests in parallel
  const requests = [];
  for (let i = 0; i < maxCount; i++) {
    requests.push(callApi('/random.php'));
  }
  
  const results = await Promise.all(requests);
  
  // Combine and remove duplicates
  results.forEach(result => {
    if (result.meals && result.meals.length > 0) {
      meals.push(result.meals[0]);
    }
  });
  
  // Remove duplicates by ID
  const uniqueMeals = Array.from(new Map(meals.map(meal => [meal.idMeal, meal])).values());
  
  return {
    results: formatMealResults(uniqueMeals)
  };
}

/**
 * Get recipe details by ID
 * @param {string} id - Recipe ID
 * @returns {Promise} - Recipe details
 */
export async function getRecipeDetails(id) {
  const data = await callApi(`/lookup.php?i=${id}`);
  
  if (!data.meals || data.meals.length === 0) {
    throw new Error('Recipe not found');
  }
  
  return formatMealDetails(data.meals[0]);
}

/**
 * Get recommended recipes based on main ingredients or cuisine
 * @param {Object} recipeDetails - Current recipe details
 * @param {number} count - Number of recommendations to get
 * @returns {Promise} - Recommended recipes
 */
export async function getRecommendedRecipes(recipeDetails, count = 3) {
  try {
    if (!recipeDetails) {
      return getRandomRecipes(count);
    }
    
    let recommendedMeals = [];
    
    // Strategy 1: Try to get recipes from the same cuisine
    if (recipeDetails.cuisines && recipeDetails.cuisines.length > 0) {
      const cuisine = recipeDetails.cuisines[0];
      const cuisineData = await fetchAreaRecipes(cuisine, count);
      
      if (cuisineData.length > 0) {
        recommendedMeals = [...recommendedMeals, ...cuisineData];
      }
    }
    
    // Strategy 2: Try to get recipes from the same category
    if (recommendedMeals.length < count && recipeDetails.dishTypes && recipeDetails.dishTypes.length > 0) {
      const category = recipeDetails.dishTypes[0];
      const matchedCategory = mapCategoryToTheMealDBCategory(category);
      
      if (matchedCategory) {
        const categoryData = await fetchCategoryRecipes(matchedCategory, count - recommendedMeals.length);
        recommendedMeals = [...recommendedMeals, ...categoryData];
      }
    }
    
    // Strategy 3: Try to get recipes with similar main ingredient
    if (recommendedMeals.length < count && recipeDetails.extendedIngredients && recipeDetails.extendedIngredients.length > 0) {
      // Get first main ingredient
      const mainIngredient = recipeDetails.extendedIngredients[0].name;
      
      try {
        const ingredientData = await getRecipesByIngredient(mainIngredient);
        if (ingredientData.results && ingredientData.results.length > 0) {
          recommendedMeals = [...recommendedMeals, ...ingredientData.results];
        }
      } catch (ingredientError) {
        console.warn('Error getting recipes by main ingredient:', ingredientError);
        // Continue without ingredient results
      }
    }
    
    // Strategy 4: If we still need more, get random recipes
    if (recommendedMeals.length < count) {
      const randomData = await getRandomRecipes(count - recommendedMeals.length);
      recommendedMeals = [...recommendedMeals, ...randomData.results];
    }
    
    // Remove duplicates and the original recipe
    const uniqueMeals = Array.from(
      new Map(
        recommendedMeals
          .filter(meal => meal.id !== recipeDetails.id)
          .map(meal => [meal.id, meal])
      ).values()
    );
    
    // Return only the requested count
    return {
      results: uniqueMeals.slice(0, count)
    };
  } catch (error) {
    console.error('Error getting recommended recipes:', error);
    // Fallback to random recipes
    return getRandomRecipes(count);
  }
}

/**
 * Get all available categories (helper function)
 */
async function getAllCategories() {
  try {
    const data = await callApi('/categories.php');
    return data.categories ? data.categories.map(cat => cat.strCategory) : [];
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}

/**
 * Get all available areas/cuisines (helper function)
 */
async function getAllAreas() {
  try {
    const data = await callApi('/list.php?a=list');
    return data.meals ? data.meals.map(area => area.strArea) : [];
  } catch (error) {
    console.error('Error fetching all areas:', error);
    return [];
  }
}

/**
 * Map category from recipe to TheMealDB category for better searching
 * @param {string} category - Category from recipe
 * @returns {string} - TheMealDB category
 */
function mapCategoryToTheMealDBCategory(category) {
  if (!category) return null;
  
  const categoryMap = {
    'breakfast': 'Breakfast',
    'lunch': 'Miscellaneous',
    'dinner': 'Miscellaneous',
    'dessert': 'Dessert',
    'appetizer': 'Starter',
    'salad': 'Side',
    'main course': 'Main Course',
    'side dish': 'Side'
  };
  
  const lowerCategory = category.toLowerCase();
  return categoryMap[lowerCategory] || null;
}

/**
 * Get recipes by category
 * @param {string} category - Recipe category
 * @returns {Promise} - Recipes in category
 */
export async function getRecipesByCategory(category) {
  const data = await callApi(`/filter.php?c=${encodeURIComponent(category)}`);
  
  if (!data.meals) {
    return { results: [] };
  }
  
  // Fetch full details for the first 25 recipes (to avoid too many API calls)
  const detailsPromises = data.meals.slice(0, 25).map(meal => 
    callApi(`/lookup.php?i=${meal.idMeal}`)
  );
  
  const detailsResults = await Promise.all(detailsPromises);
  const detailedMeals = detailsResults
    .map(r => r.meals && r.meals.length > 0 ? r.meals[0] : null)
    .filter(Boolean);
  
  return {
    results: formatMealResults(detailedMeals)
  };
}

/**
 * Get recipes by area/cuisine
 * @param {string} area - Recipe area/cuisine
 * @returns {Promise} - Recipes in area
 */
export async function getRecipesByArea(area) {
  const data = await callApi(`/filter.php?a=${encodeURIComponent(area)}`);
  
  if (!data.meals) {
    return { results: [] };
  }
  
  // Fetch full details for the first 25 recipes (to avoid too many API calls)
  const detailsPromises = data.meals.slice(0, 25).map(meal => 
    callApi(`/lookup.php?i=${meal.idMeal}`)
  );
  
  const detailsResults = await Promise.all(detailsPromises);
  const detailedMeals = detailsResults
    .map(r => r.meals && r.meals.length > 0 ? r.meals[0] : null)
    .filter(Boolean);
  
  return {
    results: formatMealResults(detailedMeals)
  };
}

/**
 * Get all available categories
 * @returns {Promise} - List of categories
 */
export async function getCategories() {
  const data = await callApi('/categories.php');
  return data.categories || [];
}

/**
 * Get all available areas/cuisines
 * @returns {Promise} - List of areas
 */
export async function getAreas() {
  const data = await callApi('/list.php?a=list');
  return data.meals || [];
}

/**
 * Get all available ingredients
 * @returns {Promise} - List of ingredients
 */
export async function getIngredients() {
  const data = await callApi('/list.php?i=list');
  return data.meals || [];
}

/**
 * Parse ingredients from meal object
 * @param {Object} meal - TheMealDB meal object
 * @returns {Array} - Array of ingredients with amounts
 */
function parseIngredients(meal) {
  const ingredients = [];
  
  // TheMealDB provides up to 20 ingredients
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    // Add only if ingredient exists and is not empty
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient.trim(),
        amount: measure ? measure.trim() : '',
        fullText: `${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`
      });
    }
  }
  
  return ingredients;
}

/**
 * Format meal results for consistent app usage
 * @param {Array} meals - TheMealDB meals
 * @returns {Array} - Formatted meals
 */
function formatMealResults(meals) {
  if (!meals) return [];
  
  return meals.map(meal => {
    // Extract ingredients for better search matching
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredientsList.push(ingredient.trim());
      }
    }
    
    return {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      category: meal.strCategory,
      area: meal.strArea,
      dishTypes: meal.strCategory ? [meal.strCategory.toLowerCase()] : [],
      cuisines: meal.strArea ? [meal.strArea] : [],
      readyInMinutes: 30, // TheMealDB doesn't provide cooking time, default to 30
      servings: 4, // TheMealDB doesn't provide servings, default to 4
      summary: meal.strInstructions ? meal.strInstructions.substring(0, 150) + '...' : '',
      spoonacularScore: 80, // TheMealDB doesn't provide score, default to 80
      ingredients: ingredientsList, // Add ingredients list for better searching
      rating: parseFloat((Math.random() * 1 + 4).toFixed(1)) // Generate rating between 4 and 5 for UI purposes
    };
  });
}

/**
 * Format detailed meal object for recipe details
 * @param {Object} meal - TheMealDB meal object
 * @returns {Object} - Formatted meal details
 */
function formatMealDetails(meal) {
  const ingredients = parseIngredients(meal);
  
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    sourceName: 'TheMealDB',
    dishTypes: meal.strCategory ? [meal.strCategory.toLowerCase()] : [],
    cuisines: meal.strArea ? [meal.strArea] : [],
    readyInMinutes: 30, // TheMealDB doesn't provide cooking time, default to 30    
    servings: 4, // TheMealDB doesn't provide servings, default to 4
    instructions: meal.strInstructions,
    summary: meal.strInstructions ? meal.strInstructions.substring(0, 200) + '...' : '',
    spoonacularScore: 80, // TheMealDB doesn't provide score, default to 80,
    extendedIngredients: ingredients.map(ing => ({
      name: ing.name,
      amount: 1,
      unit: ing.amount,
      original: ing.fullText
    })),
    nutrition: {
      nutrients: [
        {
          name: 'Calories',
          amount: 'N/A' // TheMealDB doesn't provide nutrition info
        }
      ]
    },
    sourceUrl: meal.strSource || null,
    videoUrl: meal.strYoutube || null,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [],
    winePairing: {
      pairingText: meal.strTags ? `Try pairing with: ${meal.strTags}` : null
    }
  };
}

/**
 * Get the recipe type based on category
 * @param {string} category - Recipe category
 * @returns {string} - Recipe type for UI display
 */
export function getRecipeTypeFromCategory(category) {
  if (!category) return 'MAIN_COURSE';
  
  const lowerCategory = category.toLowerCase();
  
  if (lowerCategory.includes('breakfast')) return 'BREAKFAST';
  if (lowerCategory.includes('dessert')) return 'DESSERT';
  if (lowerCategory.includes('starter') || lowerCategory.includes('appetizer')) return 'APPETIZER';
  if (lowerCategory.includes('side')) return 'SIDE_DISH';
  if (lowerCategory.includes('salad')) return 'SALAD';
  if (lowerCategory.includes('soup')) return 'SOUP';
  
  return 'MAIN_COURSE';
}

// Export all functions
export default {
  searchRecipes,
  getRandomRecipes,
  getRecipeDetails,
  getRecipesByCategory,
  getRecipesByArea,
  getRecipesByIngredient,
  getCategories,
  getAreas,
  getIngredients,
  getRecommendedRecipes,
  getRecipeTypeFromCategory
};

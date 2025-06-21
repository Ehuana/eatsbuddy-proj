/**
 * Recipe utility functions
 */

/**
 * Sort recipes by relevance to search query
 * @param {Array} recipes - List of recipes to sort
 * @param {string} query - Search query
 * @returns {Array} - Sorted recipes by relevance
 */
export function sortByRelevance(recipes, query) {
  if (!query || !recipes || recipes.length === 0) return recipes;
  
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  // Calculate relevance score for each recipe
  const scoredRecipes = recipes.map(recipe => {
    let relevanceScore = 0;
    
    // Exact title match is highest priority
    if (recipe.title.toLowerCase() === lowerQuery) {
      relevanceScore += 100;
    }
    // Title starts with query
    else if (recipe.title.toLowerCase().startsWith(lowerQuery)) {
      relevanceScore += 50;
    }
    // Title contains query
    else if (recipe.title.toLowerCase().includes(lowerQuery)) {
      relevanceScore += 30;
    }
    
    // Check for individual words in title
    if (queryWords.length > 0) {
      for (const word of queryWords) {
        if (recipe.title.toLowerCase().includes(word)) {
          relevanceScore += 10;
        }
      }
    }
    
    // Category matches
    if (recipe.category && recipe.category.toLowerCase().includes(lowerQuery)) {
      relevanceScore += 20;
    } else if (queryWords.length > 0 && recipe.category) {
      // Check for category matches with individual words
      for (const word of queryWords) {
        if (recipe.category.toLowerCase().includes(word)) {
          relevanceScore += 15;
        }
      }
    }
    
    // Cuisine/area matches
    if (recipe.area && recipe.area.toLowerCase().includes(lowerQuery)) {
      relevanceScore += 20;
    } else if (queryWords.length > 0 && recipe.area) {
      // Check for area matches with individual words
      for (const word of queryWords) {
        if (recipe.area.toLowerCase().includes(word)) {
          relevanceScore += 15;
        }
      }
    }
    
    // Summary contains query
    if (recipe.summary && recipe.summary.toLowerCase().includes(lowerQuery)) {
      relevanceScore += 10;
    } else if (queryWords.length > 0 && recipe.summary) {
      // Check for summary matches with individual words
      for (const word of queryWords) {
        if (recipe.summary.toLowerCase().includes(word)) {
          relevanceScore += 5;
        }
      }
    }
    
    // Check for ingredients if available
    if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      for (const ingredient of recipe.ingredients) {
        if (ingredient.toLowerCase().includes(lowerQuery)) {
          relevanceScore += 25; // High score for ingredient match
          break;
        } else if (queryWords.length > 0) {
          for (const word of queryWords) {
            if (ingredient.toLowerCase().includes(word)) {
              relevanceScore += 15; // Lower score for partial match
              break;
            }
          }
        }
      }
    }
    
    return { recipe, relevanceScore };
  });
  
  // Sort by relevance score (highest first)
  scoredRecipes.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Return sorted recipes
  return scoredRecipes.map(item => item.recipe);
}

/**
 * Apply various sorts to recipe list
 * @param {Array} recipes - List of recipes to sort
 * @param {string} sortType - Type of sort to apply (name, popularity, time, random, relevance)
 * @param {string} searchQuery - Search query (used for relevance sorting)
 * @returns {Array} - Sorted recipes
 */
export function sortRecipes(recipes, sortType, searchQuery = '') {
  if (!recipes || recipes.length === 0) return [];
  
  const sortedRecipes = [...recipes];
  
  switch (sortType) {
    case 'relevance':
      // Only apply relevance sorting if there's a search query
      if (searchQuery) {
        return sortByRelevance(sortedRecipes, searchQuery);
      } else {
        // Fall back to popularity if no search query
        sortedRecipes.sort((a, b) => b.rating - a.rating);
      }
      break;
    case 'name':
      // Sort alphabetically by title
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'popularity':
      // Sort by rating (descending)
      sortedRecipes.sort((a, b) => b.rating - a.rating);
      break;
    case 'time':
      // Sort by cooking time (ascending)
      sortedRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
      break;
    case 'random':
      // Shuffle the array
      for (let i = sortedRecipes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sortedRecipes[i], sortedRecipes[j]] = [sortedRecipes[j], sortedRecipes[i]];
      }
      break;
    default:
      // Default to popularity
      sortedRecipes.sort((a, b) => b.rating - a.rating);
  }
  
  return sortedRecipes;
}

/**
 * Generate mock recipes for testing or fallback
 * @param {number} count - Number of mock recipes to generate
 * @returns {Array} - Array of mock recipes
 */
export function generateMockRecipes(count) {
  const mockRecipes = [];
  
  const categories = ['Main Course', 'Dessert', 'Appetizer', 'Breakfast', 'Lunch', 'Dinner', 'Side Dish', 'Salad', 'Soup'];
  const cuisines = ['Italian', 'Asian', 'Mexican', 'American', 'French', 'Indian', 'Thai', 'Japanese', 'Greek', 'Spanish', 'Mediterranean'];
  
  const recipeNames = [
    'Creamy Pasta Primavera', 'Spicy Chicken Curry', 'Classic Beef Burger', 'Garden Fresh Salad',
    'Chocolate Lava Cake', 'Vegetable Stir-Fry', 'Baked Salmon with Herbs', 'Homemade Pizza',
    'Garlic Butter Shrimp', 'Beef Tacos', 'Avocado Toast', 'French Toast with Berries',
    'Mushroom Risotto', 'Greek Yogurt Parfait', 'Grilled Cheese Sandwich', 'Tomato Soup',
    'BBQ Pulled Pork', 'Vegetable Lasagna', 'Honey Glazed Chicken', 'Apple Pie',
    'Caesar Salad', 'Beef Stroganoff', 'Pancakes with Maple Syrup', 'Vegetable Curry'
  ];
  
  // Create more interesting mock images with food-related placeholders
  const mockImageTypes = ['food', 'meal', 'dish', 'recipe', 'dinner', 'lunch', 'breakfast', 'dessert'];
  
  for (let i = 1; i <= count; i++) {
    const id = `mock-${i}`;
    const recipeIndex = (i - 1) % recipeNames.length;
    const categoryIndex = i % categories.length;
    const cuisineIndex = i % cuisines.length;
    const imageType = mockImageTypes[i % mockImageTypes.length];
    
    mockRecipes.push({
      id: id,
      title: recipeNames[recipeIndex],
      image: `https://source.unsplash.com/300x200/?${imageType},${recipeNames[recipeIndex].replace(/\s+/g, ',')}`,
      summary: `This ${categories[categoryIndex].toLowerCase()} is perfect for any occasion. Made with fresh ingredients and inspired by ${cuisines[cuisineIndex]} cuisine, it's sure to delight your taste buds.`,
      readyInMinutes: Math.floor(Math.random() * 50) + 10,
      servings: Math.floor(Math.random() * 4) + 2,
      category: categories[categoryIndex],
      area: cuisines[cuisineIndex],
      dishTypes: [categories[categoryIndex].toLowerCase()],
      cuisines: [cuisines[cuisineIndex]],
      rating: (Math.random() * 1 + 4).toFixed(1), // Generate rating between 4 and 5
      ingredients: [
        'Garlic', 'Onion', 'Olive Oil', 
        categoryIndex % 2 === 0 ? 'Chicken' : 'Beef', 
        'Salt', 'Pepper', 
        categoryIndex % 3 === 0 ? 'Rice' : 'Pasta'
      ]
    });
  }
  
  return mockRecipes;
}

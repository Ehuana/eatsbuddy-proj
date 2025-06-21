/**
 * Grocery List Service
 * Handles operations related to grocery lists
 */

import { useFirestore } from '@/composables/useFirestore';

const { addToCollection, queryByField, deleteDocument, updateDocument } = useFirestore();

/**
 * Add ingredients from a recipe to a user's grocery list
 * @param {Object} recipe - The recipe containing ingredients
 * @param {string} userId - The user ID
 * @param {string} listId - Optional existing grocery list ID
 * @returns {Promise<string>} - ID of the grocery list
 */
export const addIngredientsToGroceryList = async (recipe, userId, listId = null) => {
  try {
    let groceryList;
    const date = new Date().toISOString().split('T')[0];

    // If listId is provided, get the existing list, otherwise create a new one
    if (listId) {
      const lists = await queryByField('groceryLists', 'id', listId);
      groceryList = lists[0];
    } else {
      // Create a new grocery list
      groceryList = {
        userId,
        name: `Ingredients for ${recipe.title}`,
        date,
        items: [],
        createdAt: new Date().toISOString()
      };
    }

    // Process ingredients from recipe
    if (recipe.extendedIngredients && Array.isArray(recipe.extendedIngredients)) {
      recipe.extendedIngredients.forEach(ingredient => {
        // Check if ingredient already exists in the list
        const existingItem = groceryList.items?.find(item => 
          item.name.toLowerCase() === ingredient.name.toLowerCase()
        );

        if (existingItem) {
          // Update quantity if ingredient already exists
          existingItem.quantity += ingredient.amount || 1;
        } else {
          // Add new ingredient to the list
          groceryList.items = [...(groceryList.items || []), {
            name: ingredient.name,
            quantity: ingredient.amount || 1,
            unit: ingredient.unit || '',
            checked: false
          }];
        }
      });
    } else if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      // Fallback for recipes with simple ingredients array
      recipe.ingredients.forEach(ingredient => {
        const existingItem = groceryList.items?.find(item => 
          item.name.toLowerCase() === ingredient.toLowerCase()
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          groceryList.items = [...(groceryList.items || []), {
            name: ingredient,
            quantity: 1,
            unit: '',
            checked: false
          }];
        }
      });
    }

    // Save the grocery list
    if (listId) {
      await updateDocument('groceryLists', listId, groceryList);
      return listId;
    } else {
      return await addToCollection('groceryLists', groceryList);
    }
  } catch (error) {
    console.error('Error adding ingredients to grocery list:', error);
    throw error;
  }
};

/**
 * Get all grocery lists for a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of grocery lists
 */
export const getUserGroceryLists = async (userId) => {
  try {
    return await queryByField('groceryLists', 'userId', userId);
  } catch (error) {
    console.error('Error getting user grocery lists:', error);
    throw error;
  }
};

/**
 * Update a grocery list item
 * @param {string} listId - The grocery list ID
 * @param {Object} updates - The fields to update
 * @returns {Promise<void>}
 */
export const updateGroceryList = async (listId, updates) => {
  try {
    await updateDocument('groceryLists', listId, updates);
  } catch (error) {
    console.error('Error updating grocery list:', error);
    throw error;
  }
};

/**
 * Delete a grocery list
 * @param {string} listId - The grocery list ID
 * @returns {Promise<void>}
 */
export const deleteGroceryList = async (listId) => {
  try {
    await deleteDocument('groceryLists', listId);
  } catch (error) {
    console.error('Error deleting grocery list:', error);
    throw error;
  }
};

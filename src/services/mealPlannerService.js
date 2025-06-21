/**
 * Meal Planner Service
 * Handles operations related to meal planning
 */

import { useFirestore } from '@/composables/useFirestore';

const { addToCollection, queryByField, deleteDocument, updateDocument } = useFirestore();

/**
 * Add a recipe to a user's meal plan
 * @param {Object} recipe - The recipe to add
 * @param {string} userId - The user ID
 * @param {string} date - The planned date for the meal (ISO string format)
 * @param {string} mealType - The meal type (e.g., 'breakfast', 'lunch', 'dinner')
 * @returns {Promise<string>} - ID of the created meal plan entry
 */
export const addRecipeToMealPlan = async (recipe, userId, date, mealType) => {
  try {
    // Create a simplified version of the recipe for the meal plan
    const mealPlanItem = {
      userId,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      recipeImage: recipe.image,
      date: date || new Date().toISOString().split('T')[0], // Default to today if no date provided
      mealType: mealType || 'dinner', // Default to dinner if no meal type provided
      servings: recipe.servings || 1,
      createdAt: new Date().toISOString(),
    };

    const docId = await addToCollection('mealPlans', mealPlanItem);
    return docId;
  } catch (error) {
    console.error('Error adding recipe to meal plan:', error);
    throw error;
  }
};

/**
 * Get all meal plans for a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of meal plan entries
 */
export const getUserMealPlans = async (userId) => {
  try {
    return await queryByField('mealPlans', 'userId', userId);
  } catch (error) {
    console.error('Error getting user meal plans:', error);
    throw error;
  }
};

/**
 * Remove a recipe from the meal plan
 * @param {string} mealPlanId - The ID of the meal plan entry
 * @returns {Promise<void>}
 */
export const removeFromMealPlan = async (mealPlanId) => {
  try {
    await deleteDocument('mealPlans', mealPlanId);
  } catch (error) {
    console.error('Error removing recipe from meal plan:', error);
    throw error;
  }
};

/**
 * Update a meal plan entry
 * @param {string} mealPlanId - The ID of the meal plan entry
 * @param {Object} updates - The fields to update
 * @returns {Promise<void>}
 */
export const updateMealPlan = async (mealPlanId, updates) => {
  try {
    await updateDocument('mealPlans', mealPlanId, updates);
  } catch (error) {
    console.error('Error updating meal plan:', error);
    throw error;
  }
};

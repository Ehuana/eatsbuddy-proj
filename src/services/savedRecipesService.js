// Service for managing saved recipes functionality
import { db } from '@/firebase/config';
import { 
  collection,
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

export const savedRecipesService = {
  // Save a recipe for a user
  async saveRecipe(userId, recipeData) {
    try {
      console.log('SaveRecipe service called with:', { userId, recipeData });
      
      // Ensure we have the required recipe data
      if (!recipeData || !recipeData.id) {
        console.error('Invalid recipe data provided:', recipeData);
        throw new Error('Invalid recipe data. Recipe ID is required.');
      }
      
      // Extract the recipeId safely
      const recipeId = String(recipeData.id || recipeData.idMeal || '');
      console.log('Extracted recipeId:', recipeId);
      
      if (!recipeId) {
        throw new Error('Recipe ID is missing or invalid');
      }
      
      // Prepare recipe data with fallbacks for all fields
      const recipe = {
        userId,
        recipeId: recipeId,
        title: recipeData.title || recipeData.strMeal || 'Untitled Recipe',
        image: recipeData.image || recipeData.strMealThumb || '',
        cuisine: recipeData.cuisine || recipeData.strArea || 'Unknown',
        savedAt: serverTimestamp()
      };
      
      console.log('Prepared recipe object:', recipe);
      
      // Check if already saved first
      const existingQuery = query(
        collection(db, 'recipes'),
        where('userId', '==', userId),
        where('recipeId', '==', recipe.recipeId)
      );
      
      console.log('Checking if recipe already exists...');
      const existingDocs = await getDocs(existingQuery);
      
      if (!existingDocs.empty) {
        // Already saved, no need to save again
        console.log('Recipe already saved, returning existing ID:', existingDocs.docs[0].id);
        return { id: existingDocs.docs[0].id, status: 'existing' };
      }
      
      console.log('Recipe not found, saving new recipe to Firestore');
      // Save to Firestore
      const docRef = await addDoc(collection(db, 'recipes'), recipe);
      console.log('Recipe saved successfully with ID:', docRef.id);
      return { id: docRef.id, status: 'new' };
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  },

  // Get all saved recipes for a user
  async getSavedRecipes(userId) {
    try {
      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const recipes = [];
      
      querySnapshot.forEach((doc) => {
        recipes.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return recipes;
    } catch (error) {
      console.error('Error getting saved recipes:', error);
      throw error;
    }
  },
  // Check if a recipe is saved by the user
  async isRecipeSaved(userId, recipeId) {
    try {
      console.log('Checking if recipe is saved:', { userId, recipeId });
      
      // Ensure recipeId is a string
      const recipeIdStr = String(recipeId);
      
      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', userId),
        where('recipeId', '==', recipeIdStr)
      );
      
      console.log('Query parameters:', { userId, recipeIdStr });
      const querySnapshot = await getDocs(q);
      
      const isSaved = !querySnapshot.empty;
      console.log('Is recipe saved?', isSaved, 'Matching docs:', querySnapshot.size);
      
      return isSaved;
    } catch (error) {
      console.error('Error checking if recipe is saved:', error);
      throw error;
    }
  },
  // Remove a saved recipe
  async unsaveRecipe(userId, recipeId) {
    try {
      console.log('Unsaving recipe:', { userId, recipeId });
      
      // Ensure recipeId is a string
      const recipeIdStr = String(recipeId);
      
      // First find the document with matching userId and recipeId
      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', userId),
        where('recipeId', '==', recipeIdStr)
      );
      
      console.log('Query parameters for deletion:', { userId, recipeIdStr });
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('Recipe not found in saved collection');
        return false;
      }
      
      console.log('Found recipe to delete, doc ID:', querySnapshot.docs[0].id);
      
      // Delete the document
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'recipes', docToDelete.id));
      console.log('Recipe successfully deleted');
      
      return true;
    } catch (error) {
      console.error('Error removing saved recipe:', error);
      throw error;
    }
  },

  // Count saved recipes for a user
  async getSavedRecipesCount(userId) {
    try {
      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error counting saved recipes:', error);
      throw error;
    }
  }
};

export default savedRecipesService;

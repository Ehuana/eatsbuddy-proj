<template>
  <div class="saved-recipes-page EG-Default">
    <div class="container py-5">
      <div class="page-header mb-4">
        <h1 class="page-title">My Saved Recipes</h1>
        <p class="text-muted">Your favorite recipes in one place</p>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading your saved recipes...</p>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="savedRecipes.length === 0" class="empty-state text-center py-5">
        <div class="empty-icon mb-3">
          <i class="ri-bookmark-line"></i>
        </div>
        <h3>No Recipes Yet</h3>
        <p class="text-muted mb-4">You haven't saved any recipes yet.</p>
        <router-link to="/recipes" class="btn btn-primary">
          <i class="ri-search-line me-2"></i>Browse Recipes
        </router-link>
      </div>
      
      <!-- Recipe List -->
      <div v-else>
        <div class="row g-4">
          <div v-for="recipe in savedRecipes" :key="recipe.id" class="col-lg-4 col-md-6">
            <div class="saved-recipe-card card h-100 shadow-sm hover-grow overflow-hidden">
              <!-- Recipe Image -->
              <div class="card-img-container position-relative">
                <img :src="recipe.image" :alt="recipe.title" class="card-img-top card-img-cover">
                <div class="card-badge">{{ formatDate(recipe.savedAt) }}</div>
                <!-- Unsave Button -->
                <button 
                  @click.prevent="unsaveRecipe(recipe.id)"
                  class="btn-unsave"
                  title="Remove from saved recipes"
                >
                  <i class="ri-close-line"></i>
                </button>
              </div>
              
              <!-- Card Body -->
              <div class="card-body d-flex flex-column">
                <h5 class="card-title text-truncate">{{ recipe.title }}</h5>
                <p class="card-text text-muted small" v-if="recipe.cuisine">
                  <i class="ri-map-pin-line me-1"></i>{{ recipe.cuisine }}
                </p>

                <div class="mt-auto pt-3">
                  <router-link :to="`/recipes/${recipe.recipeId}`" class="btn btn-outline-success w-100">
                    <i class="ri-eye-line me-2"></i>View Recipe
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { savedRecipesService } from '@/services/savedRecipesService';
import { useToast } from '@/composables/useToast';

export default {
  name: 'SavedRecipesPage',
  setup() {
    const { user } = useAuth();
    const router = useRouter();
    const { showToast } = useToast();
    
    const savedRecipes = ref([]);
    const loading = ref(true);
    const error = ref(null);
    
    // Load user's saved recipes
    const loadSavedRecipes = async () => {
      try {
        loading.value = true;
        
        if (!user.value) {
          // Redirect to login if not authenticated
          router.push('/login');
          return;
        }

        // Get saved recipes from service
        const recipes = await savedRecipesService.getSavedRecipes(user.value.uid);
        
        // Sort by saved date (newest first)
        savedRecipes.value = recipes.sort((a, b) => {
          if (!a.savedAt || !b.savedAt) return 0;
          return b.savedAt.seconds - a.savedAt.seconds;
        });
        
      } catch (err) {
        console.error('Error loading saved recipes:', err);
        error.value = err.message;
        showToast('Failed to load your saved recipes', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    // Remove a recipe from saved recipes
    const unsaveRecipe = async (id) => {
      try {
        // Show confirmation dialog
        if (!confirm('Are you sure you want to remove this recipe from your saved recipes?')) {
          return;
        }
        
        const recipeToRemove = savedRecipes.value.find(recipe => recipe.id === id);
        if (!recipeToRemove) return;
        
        // Delete using the service
        await savedRecipesService.unsaveRecipe(user.value.uid, recipeToRemove.recipeId);
        
        // Remove from local state
        savedRecipes.value = savedRecipes.value.filter(recipe => recipe.id !== id);
        showToast('Recipe removed from your saved recipes', 'success');
        
      } catch (err) {
        console.error('Error removing saved recipe:', err);
        error.value = err.message;
        showToast('Failed to remove recipe', 'error');
      }
    };
    
    // Format saved date
    const formatDate = (timestamp) => {
      if (!timestamp) return '';
      
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      
      // If saved today, show "Today"
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        return 'Today';
      }
      
      // If saved yesterday, show "Yesterday"
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      }
      
      // Otherwise, return formatted date
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    };
    
    // Load recipes on component mount
    onMounted(() => {
      loadSavedRecipes();
    });
    
    return {
      savedRecipes,
      loading,
      error,
      unsaveRecipe,
      formatDate
    };
  }
};
</script>

<style scoped>
.saved-recipes-page {
  padding-top: 70px;
}

.page-title {
  font-weight: 700;
  color: var(--eg-primary);
  margin-bottom: 0.5rem;
}

/* Empty state styles */
.empty-state {
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 64px;
  color: #ddd;
}

/* Card styles */
.hover-grow {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-grow:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.card-img-container {
  height: 180px;
  overflow: hidden;
}

.card-img-cover {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.card-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-top-right-radius: 4px;
}

.btn-unsave {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0.8;
  transition: opacity 0.3s ease;
  color: #dc3545;
}

.btn-unsave:hover {
  opacity: 1;
}
</style>

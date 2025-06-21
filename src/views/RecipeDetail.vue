<template>
  <div class="recipe-detail-page EG-Default">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner-container">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 loading-text">Preparing your recipe...</p>
      </div>
    </div>

    <!-- Error State -->    <div v-else-if="!recipe && !loading" class="error-container container">
      <div class="text-center py-5">
        <i class="ri-error-warning-line display-1 text-danger"></i>
        <h2 class="mt-3">Recipe Not Found</h2>
        <p class="text-muted">We couldn't find the recipe you're looking for.</p>        <p v-if="error === 'Failed to load recipe details'" class="alert alert-warning">
          <i class="ri-information-line me-2"></i>
          Unable to fetch recipe data from TheMealDB API.
          The app is using sample recipes instead.
        </p>
        <button @click="goBack" class="btn btn-primary mt-3">
          <i class="ri-arrow-left-line me-2"></i>Go Back to Recipes
        </button>
      </div>
    </div>    <!-- Recipe Content -->
    <div v-else class="recipe-content">      <!-- API Status Banner -->
      <div v-if="error === 'Failed to load recipe details'" class="api-status-banner">
        <div class="container">
          <div class="alert alert-warning mb-0 d-flex align-items-center">
            <i class="ri-information-line me-2 fs-5"></i>
            <div>
              <strong>Note:</strong> Unable to fetch recipe data from TheMealDB API.
              Showing sample recipe data instead.
            </div>
            <button type="button" class="btn-close ms-auto" @click="dismissApiBanner"></button>
          </div>
        </div>
      </div>
      <!-- Hero Section with Image Background -->
      <div class="recipe-hero" :style="{ backgroundImage: `url(${recipe.image})` }">
        <div class="recipe-hero-overlay">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-xl-10 col-lg-11 col-md-12">
                <div class="recipe-hero-content">
                  <!-- Navigation -->
                  <div class="recipe-breadcrumb">
                    <router-link to="/recipes" class="recipe-back-btn">
                      <i class="ri-arrow-left-line"></i> Back to Recipes
                    </router-link>                    <div class="recipe-actions">
                      <button class="recipe-action-btn" @click="shareRecipe">
                        <i class="ri-share-line"></i>
                        <span>Share</span>
                      </button>
                      <button class="recipe-action-btn" @click="printRecipe">
                        <i class="ri-printer-line"></i>
                        <span>Print</span>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Recipe Title and Meta -->
                  <div class="recipe-header-content text-center">
                    <div class="recipe-tag">{{ recipe.type.toLowerCase().replace('_', ' ') }}</div>
                    <h1 class="recipe-title">{{ recipe.title }}</h1>
                    <div class="recipe-meta">
                      <div class="recipe-author">
                        <span class="by">By</span> {{ recipe.author }}
                      </div>
                      <div class="recipe-date">{{ recipe.date }}</div>
                      <div class="recipe-rating">
                        <div class="stars">
                          <i v-for="n in 5" :key="n" :class="n <= Math.floor(recipe.rating) ? 'ri-star-fill' : n <= Math.floor(recipe.rating) + 0.5 ? 'ri-star-half-fill' : 'ri-star-line'"></i>
                        </div>
                        <span>{{ recipe.rating }}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      <!-- Main Recipe Content -->
      <div class="recipe-main-content">
        <div class="container py-5">
          <div class="row">
            <!-- Left Content Column -->
            <div class="col-lg-8">
              <!-- Recipe Overview Section -->
              <div class="recipe-overview">
                <div class="recipe-category mb-3">
                  <span>
                    <i class="ri-restaurant-line"></i> {{ recipe.course }}
                  </span>
                  <span>
                    <i class="ri-globe-line"></i> {{ recipe.cuisine }}
                  </span>
                  <span>
                    <i class="ri-dashboard-3-line"></i> {{ recipe.difficulty }}
                  </span>
                </div>
                
                <!-- Recipe Stats Cards -->                <div class="recipe-stats-grid">
                  <div class="recipe-stat-card">
                    <div class="recipe-stat-icon">
                      <i class="ri-timer-line"></i>
                    </div>
                    <div class="recipe-stat-data">
                      <div class="recipe-stat-value">{{ recipe.prepTime || "N/A" }}</div>
                      <div class="recipe-stat-label">Prep Time</div>
                    </div>
                  </div>
                  <div class="recipe-stat-card">
                    <div class="recipe-stat-icon">
                      <i class="ri-fire-line"></i>
                    </div>
                    <div class="recipe-stat-data">
                      <div class="recipe-stat-value">{{ recipe.cookingTime || "N/A" }}</div>
                      <div class="recipe-stat-label">Cook Time</div>
                    </div>
                  </div>
                  <div class="recipe-stat-card">
                    <div class="recipe-stat-icon">
                      <i class="ri-restaurant-2-line"></i>
                    </div>
                    <div class="recipe-stat-data">
                      <div class="recipe-stat-value">{{ recipe.servings || "N/A" }}</div>
                      <div class="recipe-stat-label">Servings</div>
                    </div>
                  </div>
                  <div class="recipe-stat-card">
                    <div class="recipe-stat-icon">
                      <i class="ri-scales-3-line"></i>
                    </div>
                    <div class="recipe-stat-data">
                      <div class="recipe-stat-value">{{ recipe.calories || "N/A" }}</div>
                      <div class="recipe-stat-label">Calories</div>
                    </div>
                  </div>
                </div><!-- Ingredients Section -->
                <div class="recipe-section recipe-ingredients">
                  <div class="recipe-section-header">
                    <h3 class="recipe-section-title">
                      <i class="ri-list-check"></i> Ingredients
                    </h3>                    <div class="recipe-section-actions">
                      <button class="btn btn-sm btn-outline-success" title="Add all to grocery list" @click="addToGrocery" style="display: none;">
                        <i class="ri-shopping-cart-line me-1"></i> Add to Grocery List
                      </button>
                    </div>
                  </div>
                  <div class="ingredients-list">
                    <div class="ingredient-item" v-for="(ingredient, index) in recipe.ingredients" :key="index">
                      <div class="ingredient-checkbox">
                        <input type="checkbox" :id="'ingredient-' + index" class="ingredient-input" />
                        <label :for="'ingredient-' + index" class="ingredient-label"></label>
                      </div>
                      <span class="ingredient-text">{{ ingredient }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Instructions Section -->
                <div class="recipe-section recipe-instructions">
                  <div class="recipe-section-header">
                    <h3 class="recipe-section-title">
                      <i class="ri-file-list-3-line"></i> Directions
                    </h3>
                  </div>
                  <div class="instructions-content">
                    <div v-if="formattedInstructions.length > 0" class="instructions-list">
                      <div v-for="(step, index) in formattedInstructions" :key="index" class="instruction-step">
                        <div class="step-number">{{ index + 1 }}</div>
                        <div class="step-content">{{ step }}</div>
                      </div>
                    </div>
                    <div v-else class="instructions-text">
                      <p>{{ recipe.instructions }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Chef's Tips Section -->
                <div v-if="recipe.chefsTips" class="recipe-section recipe-tips">
                  <div class="recipe-section-header">
                    <h3 class="recipe-section-title">
                      <i class="ri-lightbulb-flash-line"></i> Chef's Tips
                    </h3>
                  </div>
                  <div class="tips-content">
                    <div class="chef-tip">
                      <p>{{ recipe.chefsTips }}</p>
                    </div>
                  </div>
                </div>
                
                <!-- Notes Section -->
                <div v-if="recipe.notes && recipe.notes.length > 0" class="recipe-section recipe-notes">
                  <div class="recipe-section-header">
                    <h3 class="recipe-section-title">
                      <i class="ri-sticky-note-line"></i> Recipe Notes
                    </h3>
                  </div>
                  <div class="notes-list">
                    <div v-for="(note, index) in recipe.notes" :key="index" class="note-item">
                      <i class="ri-information-fill"></i>
                      <p>{{ note }}</p>
                    </div>
                  </div>
                </div>              </div><!-- End of Recipe Overview -->

              <!-- Reviews Section -->
              <div class="recipe-section recipe-reviews">
                <div class="recipe-section-header">
                  <h3 class="recipe-section-title">
                    <i class="ri-message-2-line"></i> Reviews
                  </h3>
                </div>                <div class="reviews-container">
                  <!-- Hidden as requested - users can't leave reviews -->
                  <RecipeReviewForm style="display: none;" />
                  <RecipeReviews :recipeId="recipe.id" />
                </div>
              </div>
            </div><!-- End of Left Column -->

            <!-- Right Sidebar -->
            <div class="col-lg-4">
              <div class="recipe-sidebar">
                <!-- Recipe Actions for Desktop -->                <div class="sidebar-section desktop-recipe-actions">
                  <h4 class="sidebar-heading">Recipe Actions</h4>                  <div class="recipe-actions-list">
                    <button class="sidebar-action-btn" @click="addToMealPlan" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to your weekly meal planner" style="display: none;">
                      <i class="ri-calendar-check-line"></i>
                      <span>Add to Meal Plan</span>
                    </button>
                    <button class="sidebar-action-btn" @click="addToGrocery" data-bs-toggle="tooltip" data-bs-placement="left" title="Add all ingredients to your grocery list" style="display: none;">
                      <i class="ri-shopping-basket-line"></i>
                      <span>Add to Grocery List</span>
                    </button>
                    <button class="sidebar-action-btn" @click="printRecipe" data-bs-toggle="tooltip" data-bs-placement="left" title="Print this recipe">
                      <i class="ri-printer-line"></i>
                      <span>Print Recipe</span>
                    </button>
                    <button class="sidebar-action-btn" @click="shareRecipe" data-bs-toggle="tooltip" data-bs-placement="left" title="Share this recipe with friends">
                      <i class="ri-share-line"></i>
                      <span>Share Recipe</span>
                    </button>
                    <div class="recipe-actions-divider">Coming Soon</div>
                    <button class="sidebar-action-btn secondary-action" @click="goToMealPlanner">
                      <i class="ri-calendar-line"></i>
                      <span>Go to Meal Planner</span>
                    </button>
                    <button class="sidebar-action-btn secondary-action" @click="goToGroceryList">
                      <i class="ri-shopping-cart-line"></i>
                      <span>View Grocery Lists</span>
                    </button>
                  </div>
                </div>

                <!-- Similar Recipes -->
                <div class="sidebar-section">
                  <h4 class="sidebar-heading">You Might Also Like</h4>
                  <div class="recommended-recipes">
                    <div v-if="suggestedRecipes.length === 0" class="no-suggestions">
                      <i class="ri-search-line"></i>
                      <p>Finding similar recipes for you...</p>
                    </div>
                    <div v-else v-for="recipe in suggestedRecipes" :key="recipe.id" class="recommended-recipe-card">
                      <div class="recommended-recipe-img">
                        <img :src="recipe.image" :alt="recipe.title" />
                      </div>
                      <div class="recommended-recipe-content">
                        <h5 class="recommended-recipe-title">{{ recipe.title }}</h5>
                        <div class="recommended-recipe-meta">
                          <span><i class="ri-time-line"></i> {{ recipe.cookingTime }} min</span>
                          <span><i class="ri-user-line"></i> {{ recipe.servings }}</span>
                        </div>
                        <router-link :to="'/recipes/' + recipe.id" class="recommended-recipe-link">
                          View Recipe
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>                <!-- Nutrition Facts Teaser -->
                <div class="sidebar-section nutrition-facts">
                  <h4 class="sidebar-heading">Nutrition Facts</h4>
                  
                  <div v-if="hasNutritionData" class="nutrition-data">
                    <div class="nutrition-fact">
                      <span class="nutrition-label">Calories</span>
                      <span class="nutrition-value">{{ recipe.calories }}</span>
                    </div>
                    <div class="nutrition-fact">
                      <span class="nutrition-label">Protein</span>
                      <span class="nutrition-value">{{ recipe.protein }}g</span>
                    </div>
                    <div class="nutrition-fact">
                      <span class="nutrition-label">Carbs</span>
                      <span class="nutrition-value">{{ recipe.carbohydrates }}g</span>
                    </div>
                    <div class="nutrition-fact">
                      <span class="nutrition-label">Fat</span>
                      <span class="nutrition-value">{{ recipe.fat }}g</span>
                    </div>
                  </div>
                  
                  <div v-else class="nutrition-unavailable">
                    <div class="text-center py-3">
                      <i class="ri-heart-pulse-line nutrition-icon"></i>
                      <p class="nutrition-message">Nutrition information coming soon!</p>
                      <p class="nutrition-submessage">We're working on adding detailed nutrition facts to all recipes.</p>
                    </div>
                  </div>
                  
                  <button class="btn btn-sm btn-outline-success w-100 mt-3">
                    <i class="ri-information-line me-1"></i> {{ hasNutritionData ? 'View Full Nutrition Facts' : 'Learn About Healthy Eating' }}
                  </button>
                </div>
              </div>
            </div><!-- End of Right Sidebar -->
          </div>
        </div>
      </div>      <!-- Additional Recipe Content -->
      <div class="container pb-5">
        <div class="more-recipes-section">
          <h2 class="section-title">More Recipes You'll Love</h2>
          <div class="related-recipes row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div class="col" v-for="moreRecipe in moreRecipes" :key="moreRecipe.id">
              <div class="card h-100 border-0 shadow-sm recipe-card">
                <img :src="moreRecipe.image" class="card-img-top object-cover" alt="Recipe">
                <div class="card-body d-flex flex-column">
                  <span class="badge bg-success mb-2">{{ moreRecipe.type }}</span>
                  <h5 class="card-title mb-2">{{ moreRecipe.title }}</h5>
                  <p class="card-text text-muted small mb-3">{{ moreRecipe.description }}</p>
                  <div class="mt-auto">
                    <div class="d-flex align-items-center mb-3">
                      <i class="ri-time-line me-2"></i>
                      <small class="text-muted">{{ moreRecipe.cookTime }} mins</small>
                    </div>
                    <router-link :to="`/recipes/${moreRecipe.id}`" class="btn btn-outline-success w-100">View Recipe</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    </div><!-- End of Recipe Content -->

    <!-- Meal Planner Modal -->
    <PlannerModal 
      modalId="mealPlannerModal" 
      type="meal" 
      :recipeName="recipe?.title" 
      @confirm="confirmAddToMealPlan" 
    />
    
    <!-- Grocery List Modal -->
    <PlannerModal 
      modalId="groceryListModal" 
      type="grocery" 
      :recipeName="recipe?.title" 
      @confirm="confirmAddToGrocery" 
    />
  </div>
</template>

<script>
import { getRecipeDetails, getRandomRecipes, searchRecipes, getRecommendedRecipes } from "@/services/mealApi";
import RecipeReviewForm from '@/components/RecipeReviewForm.vue';
import RecipeReviews from '@/components/RecipeReviews.vue';
import PlannerModal from '@/components/PlannerModal.vue';
import { useAuth } from '@/composables/useAuth';
import { useFirestore } from '@/composables/useFirestore';
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { addRecipeToMealPlan } from '@/services/mealPlannerService';
import { addIngredientsToGroceryList } from '@/services/groceryListService';
import { useToast } from '@/composables/useToast';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'RecipeDetail',
  components: {
    RecipeReviewForm,
    RecipeReviews
  },
  props: ['id'],
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const { user } = useAuth();
    const { addToCollection, queryByField, deleteDocument } = useFirestore();
    const { showToast } = useToast();    const recipe = ref(null);
    const suggestedRecipes = ref([]);
    const moreRecipes = ref([]);
    const loading = ref(true); // Changed to true by default
    const error = ref(null);
    const recommendedRecipes = ref([]);
    const showApiBanner = ref(true);
    
    const formattedInstructions = computed(() => {
      if (!recipe.value || !recipe.value.instructions) return [];
      
      // Try to format instructions into steps if it seems like a block of text
      const text = recipe.value.instructions.replace(/<[^>]*>/g, ''); // Remove HTML tags
      
      // Pattern 1: Look for numbered steps like "1. Step One 2. Step Two"
      const numberedPattern = /(\d+)\.\s+([^.0-9][^.]*\.)/g;
      const numberedSteps = [...text.matchAll(numberedPattern)].map(match => match[2].trim());
      
      if (numberedSteps.length > 1) return numberedSteps;
      
      // Pattern 2: Look for sentences as steps
      const sentencePattern = /([^.!?]+[.!?]+)/g;
      const sentences = [...text.matchAll(sentencePattern)].map(match => match[1].trim());
      
      // Only use sentences if there are a reasonable number
      if (sentences.length >= 2 && sentences.length <= 20) return sentences;
      
      return [];
    });
    
    // Check if nutrition data is available
    const hasNutritionData = computed(() => {
      return recipe.value && 
             recipe.value.calories !== null && 
             recipe.value.protein !== null && 
             recipe.value.carbohydrates !== null && 
             recipe.value.fat !== null;
    });    const fetchRecipeData = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        console.log('Fetching recipe details for ID:', props.id);
        const recipeData = await getRecipeDetails(props.id);
        console.log('Recipe data received:', recipeData);
        
        // Ensure recipeId is always a string and matches props.id for consistency
        const recipeId = props.id.toString();
        
        // Map the TheMealDB data to our application format
        recipe.value = {
          id: recipeId, // Use props.id as the consistent identifier
          title: recipeData.title || 'Untitled Recipe',
          image: recipeData.image || 'https://via.placeholder.com/500?text=No+Image',
          author: recipeData.sourceName || 'TheMealDB',
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          course: recipeData.dishTypes?.length > 0 ? recipeData.dishTypes[0] : 'Main Course',
          cuisine: recipeData.cuisines?.length > 0 ? recipeData.cuisines[0] : 'International',
          difficulty: getDifficultyLevel(recipeData.readyInMinutes || 30),
          rating: '4.5', // TheMealDB doesn't provide ratings, so use a default
          servings: recipeData.servings || 4,
          prepTime: Math.floor((recipeData.readyInMinutes || 30) * 0.4),
          cookingTime: Math.ceil((recipeData.readyInMinutes || 30) * 0.6),
          calories: null, // TheMealDB doesn't provide nutrition info
          protein: null,
          carbohydrates: null,
          fat: null,
          ingredients: recipeData.extendedIngredients?.map(ing => ing.original) || [],
          instructions: recipeData.instructions || recipeData.summary || 'No instructions available',
          type: recipeData.dishTypes?.length > 0 ? 
            recipeData.dishTypes[0].toUpperCase().replace(' ', '_') : 
            'MAIN_COURSE',
          notes: [],
          chefsTips: recipeData.winePairing?.pairingText || null
        };
          // Log the processed recipe data
        console.log('Recipe processed successfully:', {
          id: recipe.value.id,
          title: recipe.value.title
        });
        
        // Load similar recipes
        fetchSuggestedRecipes();
        
        // Load more recipes
        fetchMoreRecipes();
      } catch (err) {
        console.error('Error fetching recipe:', err);
        
        // Generate a mock recipe based on the ID if there's an error
        const mockId = parseInt(props.id);
        const mockRecipe = generateMockRecipe(mockId);
        
        recipe.value = mockRecipe;
        
        // Load sample recommended recipes
        fetchSampleRecommendedRecipes();
        
        // Load sample more recipes
        fetchSampleMoreRecipes();
        
        error.value = 'Failed to load recipe details';
      } finally {
        loading.value = false;
      }
    };
    
    const fetchMoreRecipes = async () => {
      try {
        let data = null;
        
        // Try to get recipes by cuisine first
        if (recipe.value?.cuisine) {
          data = await searchRecipes(recipe.value.cuisine);
        } 
        
        // If we got no results or cuisine was unavailable, try category
        if (!data || !data.results || data.results.length === 0) {
          const category = recipe.value?.type?.toLowerCase().replace('_', ' ') || '';
          if (category) {
            data = await searchRecipes(category);
          }
        }
        
        // If we still don't have results, use random recipes
        if (!data || !data.results || data.results.length === 0) {
          data = await getRandomRecipes(8);
        }
        
        // Map the data to our format
        if (data && data.results && data.results.length > 0) {
          moreRecipes.value = data.results.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            type: getRecipeType(recipe.dishTypes),
            cookTime: recipe.readyInMinutes,
            description: recipe.summary ? recipe.summary.substring(0, 100).replace(/<[^>]*>?/gm, '') + '...' : 'Delicious recipe to try.'
          }));
        } else {
          throw new Error('No additional recipes found');
        }
      } catch (err) {
        console.error('Failed to fetch more recipes', err);
        
        // Fallback to mock data
        fetchSampleMoreRecipes();
      }
    };
    
    // Helper function to determine recipe type
    const getRecipeType = (dishTypes) => {
      if (!dishTypes || dishTypes.length === 0) return 'MAIN_COURSE';
      
      if (dishTypes.includes('breakfast')) return 'BREAKFAST';
      if (dishTypes.includes('lunch')) return 'LUNCH';
      if (dishTypes.includes('dinner')) return 'DINNER';
      if (dishTypes.includes('dessert')) return 'DESSERT';
      
      return dishTypes[0].toUpperCase();
    };

    const getDifficultyLevel = (readyInMinutes) => {
      if (readyInMinutes <= 20) return 'Easy';
      if (readyInMinutes <= 45) return 'Medium';
      return 'Hard';
    };
    
    const fetchSuggestedRecipes = async () => {
      try {
        // Get recommended recipes based on the current recipe
        const data = await getRecommendedRecipes(recipe.value, 4);
        
        // Format the data if we have results
        if (data && data.results && data.results.length > 0) {
          suggestedRecipes.value = data.results.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            cookingTime: recipe.readyInMinutes,
            servings: recipe.servings
          }));
        } else {
          // If no recommendations, try random recipes
          const randomData = await getRandomRecipes(4);
          
          if (randomData && randomData.results && randomData.results.length > 0) {
            suggestedRecipes.value = randomData.results.map(recipe => ({
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              cookingTime: recipe.readyInMinutes,
              servings: recipe.servings
            }));
          } else {
            throw new Error('No suggested recipes returned');
          }
        }
      } catch (err) {
        console.error('Failed to fetch suggested recipes', err);
        
        // Always provide fallback data
        fetchSampleRecommendedRecipes();
      }
    };    // Save/favorite functionality has been removed

    const goToLogin = () => {
      router.push('/login');
    };

    const dismissApiBanner = () => {
      error.value = null;
    };
    
    const goBack = () => {
      router.go(-1);
    };
    
    const printRecipe = () => {
      // Add a small delay to ensure all content is loaded
      setTimeout(() => {
        window.print();
      }, 300);
      
      // Log this action
      console.log('Printing recipe:', recipe.value?.title);
      
      // Show a success toast
      showToast('Opening print dialog...', 'success');
    };

    const shareRecipe = () => {
      if (!recipe.value) return;
      
      const title = recipe.value.title || 'Check out this recipe';
      const text = `Check out this delicious ${recipe.value.title} recipe I found on EatsBuddy!`;
      const url = window.location.href;
      
      // Use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: title,
          text: text,
          url: url
        }).catch(err => {
          console.error('Share failed:', err);
          // Fallback if share fails
          copyToClipboard(url);
        });
      } else {
        // Fallback: copy to clipboard
        copyToClipboard(url);
      }
    };
    
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text)
        .then(() => {
          showToast('Link copied to clipboard!', 'success');
        })
        .catch(err => {
          console.error('Failed to copy URL:', err);
          showToast('Could not copy the link.', 'error');
        });
    };    // For showing modals
    const modal = { meal: null, grocery: null };
    
    // Initialize Bootstrap modals
    const initModals = () => {
      if (typeof bootstrap !== 'undefined') {
        // Initialize the meal planner modal
        const mealPlannerModalElement = document.getElementById('mealPlannerModal');
        if (mealPlannerModalElement) {
          modal.meal = new bootstrap.Modal(mealPlannerModalElement);
        }
        
        // Initialize the grocery list modal
        const groceryListModalElement = document.getElementById('groceryListModal');
        if (groceryListModalElement) {
          modal.grocery = new bootstrap.Modal(groceryListModalElement);
        }
      }
    };

    // Initialize all modals whenever Bootstrap is loaded or on component mount
    const initializeUI = () => {
      // Wait for bootstrap to be available
      if (typeof bootstrap !== 'undefined') {
        initModals();
      } else {
        // If bootstrap isn't immediately available, try once more after a delay
        setTimeout(() => {
          if (typeof bootstrap !== 'undefined') {
            initModals();
          }
        }, 1000);
      }
    };

    // Navigate to meal planner page after adding to meal plan (optional, can be connected to confirmAddToMealPlan)
    const goToMealPlanner = () => {
      router.push('/meal-planner');
    };
    
    // Navigate to grocery list page after adding ingredients (optional, can be connected to confirmAddToGrocery)
    const goToGroceryList = () => {
      router.push('/grocery-list');
    };
    
    // Handle click on recipe ingredients to check them off
    const toggleIngredientCheck = (index) => {
      // You could keep track of checked ingredients in state if needed
      // For now, just toggle the class on the element
      const ingredientText = document.querySelector(`#ingredient-${index} ~ .ingredient-text`);
      if (ingredientText) {
        ingredientText.classList.toggle('checked');
        
        // Optional: Store checked state in localStorage for persistence
        const checkedIngredients = JSON.parse(localStorage.getItem(`recipe-${props.id}-ingredients`) || '[]');
        
        if (ingredientText.classList.contains('checked')) {
          if (!checkedIngredients.includes(index)) {
            checkedIngredients.push(index);
          }
        } else {
          const indexToRemove = checkedIngredients.indexOf(index);
          if (indexToRemove > -1) {
            checkedIngredients.splice(indexToRemove, 1);
          }
        }
        
        localStorage.setItem(`recipe-${props.id}-ingredients`, JSON.stringify(checkedIngredients));
      }
    };
      // Call initialization functions after component is mounted
    onMounted(() => {
      // Initialize modals
      initModals();
      
      // Set up UI initialization with a slight delay to ensure DOM is ready
      setTimeout(() => {
        initializeUI();
      }, 500);
      
      // Add event listener for print event
      window.addEventListener('beforeprint', () => {
        console.log('Print requested for recipe:', recipe.value?.title);
      });
    });
    
    const addToMealPlan = () => {
      if (!user.value) {
        // Show toast asking user to login
        showToast('Please login to add this recipe to your meal plan', 'error');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 1500);
        return;
      }
      
      // Check if recipe is valid
      if (!recipe.value) {
        showToast('Cannot add recipe to meal plan: Recipe not loaded', 'error');
        return;
      }
      
      // Show the meal planner modal
      if (modal.meal) {
        modal.meal.show();
      } else {
        console.error('Meal planner modal not initialized');
        showToast('Could not open meal planner. Please try again.', 'error');
      }
    };
    
    const confirmAddToMealPlan = async (data) => {
      try {
        if (!user.value || !recipe.value) {
          showToast('Cannot add to meal plan: Missing user or recipe data', 'error');
          return;
        }
        
        // Show loading toast
        showToast('Adding to meal plan...', 'success');
        
        // Add the recipe to the meal plan with the selected date and meal type
        const mealPlanId = await addRecipeToMealPlan(
          recipe.value,
          user.value.uid,
          data.date,
          data.mealType
        );
        
        // Close the modal
        if (modal.meal) {
          modal.meal.hide();
        }
        
        // Format the date for display
        const date = new Date(data.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
          weekday: 'long',
          month: 'short', 
          day: 'numeric' 
        });
        
        // Show success message
        showToast(`Recipe added to your meal plan for ${data.mealType} on ${formattedDate}!`, 'success');
        
        console.log('Added recipe to meal plan:', {
          recipe: recipe.value.title,
          date: data.date,
          mealType: data.mealType,
          mealPlanId
        });
        
        // Optional: Navigate to meal planner page
        goToMealPlanner();
      } catch (error) {
        console.error('Error adding to meal plan:', error);
        showToast('Failed to add recipe to meal plan. Please try again.', 'error');
      }
    };const addToGrocery = () => {
      if (!user.value) {
        // Show toast asking user to login
        showToast('Please login to add ingredients to your grocery list', 'error');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push('/login');
        }, 1500);
        return;
      }
      
      // Verify recipe has ingredients
      if (!recipe.value || !recipe.value.ingredients || recipe.value.ingredients.length === 0) {
        showToast('This recipe has no ingredients to add to grocery list', 'error');
        return;
      }
      
      // Show the grocery list modal
      if (modal.grocery) {
        modal.grocery.show();
      } else {
        console.error('Grocery list modal not initialized');
        showToast('Could not open grocery list. Please try again.', 'error');
      }
    };
      const confirmAddToGrocery = async (data) => {
      try {
        if (!user.value || !recipe.value) {
          showToast('Cannot add ingredients: Missing user or recipe data', 'error');
          return;
        }
        
        // Verify we have ingredients
        if (!recipe.value.ingredients || recipe.value.ingredients.length === 0) {
          showToast('This recipe has no ingredients to add', 'error');
          
          // Close the modal
          if (modal.grocery) {
            modal.grocery.hide();
          }
          return;
        }
        
        // Show loading toast
        showToast('Adding ingredients to grocery list...', 'success');
        
        // Add the ingredients to the grocery list
        const listId = await addIngredientsToGroceryList(
          recipe.value,
          user.value.uid,
          data.listId
        );
        
        // Close the modal
        if (modal.grocery) {
          modal.grocery.hide();
        }
        
        // Determine message based on whether we added to existing list or created a new one
        const message = data.listId 
          ? 'Ingredients added to your existing grocery list!' 
          : `New grocery list "${data.listName}" created with ingredients!`;
        
        // Show success message
        showToast(message, 'success');
        
        // Log addition
        console.log('Added ingredients to grocery list:', {
          recipe: recipe.value.title,
          ingredientCount: recipe.value.ingredients.length,
          listId: listId,
          isNewList: !data.listId
        });
        
        // Optional: Navigate to grocery list page
        goToGroceryList();      } catch (error) {
        console.error('Error adding to grocery list:', error);
        showToast('Failed to add ingredients to grocery list. Please try again.', 'error');
      }
    };
    
    // Generate mock recipe data for testing or when API is unavailable
    // Utility to generate a detailed mock recipe for the main recipe display
    const generateMockRecipe = (id) => {
      // Sample mock recipes for detail view
      const mockRecipes = [
        {
          id: id.toString(),
          title: "Chicken Stir Fry",
          image: "https://source.unsplash.com/featured/800x600/?chicken,stir,fry",
          author: "TheMealDB",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          course: "Main Course",
          cuisine: "Asian",
          difficulty: "Medium",
          rating: "4.5",          servings: 4,
          prepTime: 15,
          cookingTime: 15,
          calories: null,
          protein: null,
          carbohydrates: null,
          fat: null,
          ingredients: [
            "500g chicken breast, sliced",
            "2 bell peppers, sliced",
            "1 onion, sliced",
            "2 tbsp soy sauce",
            "1 tbsp olive oil",
            "2 cloves garlic, minced",
            "1 tsp ginger, grated",
            "1 tbsp sesame seeds"
          ],
          instructions: "1. Heat oil in a large pan or wok.\n2. Add chicken and stir-fry until golden.\n3. Add vegetables and stir-fry for 5 minutes.\n4. Add garlic and ginger, cook for 1 minute.\n5. Pour in soy sauce and stir well.\n6. Serve hot sprinkled with sesame seeds.",
          type: "MAIN_COURSE",
          notes: ["For extra flavor, add a dash of oyster sauce", "Can be served with rice or noodles"],
          chefsTips: "For the best results, make sure your pan is very hot before adding ingredients."
        },
        {
          id: id.toString(),
          title: "Fresh Berry Smoothie Bowl",
          image: "https://www.themealdb.com/images/media/meals/xxtsvx1511452222.jpg",
          author: "TheMealDB",
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          course: "Breakfast",
          cuisine: "International",
          difficulty: "Easy",
          rating: "4.8",          servings: 1,
          prepTime: 10,
          cookingTime: 0,
          calories: null,
          protein: null,
          carbohydrates: null,
          fat: null,
          ingredients: [
            "1 banana, frozen",
            "1 cup mixed berries, frozen",
            "1/4 cup Greek yogurt",
            "1/4 cup almond milk",
            "1 tbsp honey",
            "Toppings: granola, fresh berries, chia seeds"
          ],
          instructions: "1. Add banana, berries, yogurt, milk and honey to a blender.\n2. Blend until smooth and creamy.\n3. Pour into a bowl.\n4. Add toppings and enjoy immediately.",
          type: "BREAKFAST",
          notes: ["Use any milk alternative you prefer", "Add protein powder for extra nutrition"],
          chefsTips: "Freeze the banana the night before for the best texture."
        }
      ];
      
      return mockRecipes[id % mockRecipes.length];
    };    // Function was renamed to avoid duplicate declaration
    const generateSimpleMockRecipe = (customId, customTitle = null) => {
      const categories = ['Main Course', 'Dessert', 'Appetizer', 'Breakfast', 'Lunch', 'Dinner', 'Side Dish', 'Salad'];
      const cuisines = ['Italian', 'Asian', 'Mexican', 'American', 'French', 'Indian', 'Thai', 'Japanese'];
      const recipes = [
        'Spaghetti Carbonara', 'Chicken Tikka Masala', 'Beef Tacos', 'Caprese Salad',
        'Chocolate Lava Cake', 'Vegetable Stir-Fry', 'Baked Salmon', 'Margherita Pizza',
        'Garlic Shrimp', 'Vegetarian Burrito', 'Avocado Toast', 'Belgian Waffles',
        'Mushroom Risotto', 'Greek Yogurt Parfait', 'Grilled Cheese', 'Tomato Soup',
        'BBQ Ribs', 'Vegetable Lasagna', 'Glazed Chicken', 'Apple Pie'
      ];
      
      const randomIndex = Math.floor(Math.random() * recipes.length);
      const title = customTitle || recipes[randomIndex];
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const cuisineIndex = Math.floor(Math.random() * cuisines.length);
      
      // Create a food-related image from unsplash
      const imageKeywords = title.split(' ').join(',');
      const imageUrl = `https://source.unsplash.com/featured/300x200/?food,${imageKeywords}`;
      
      return {
        id: customId.toString(),
        title: title,
        image: imageUrl,
        cookingTime: Math.floor(Math.random() * 40) + 10,
        servings: Math.floor(Math.random() * 3) + 2,
        readyInMinutes: Math.floor(Math.random() * 40) + 10,
        category: categories[categoryIndex],
        cuisine: cuisines[cuisineIndex],
        type: categories[categoryIndex].toUpperCase().replace(' ', '_'),
        description: `Delicious ${title.toLowerCase()} with a ${cuisines[cuisineIndex].toLowerCase()} twist. Perfect for a quick and satisfying meal.`,
        summary: `Delicious ${title.toLowerCase()} with a ${cuisines[cuisineIndex].toLowerCase()} twist. Perfect for a quick and satisfying meal.`
      };
    };
    
    const fetchSampleRecommendedRecipes = () => {
      // Generate better mock recommended recipes
      const recommendationTitles = [
        'Creamy Mushroom Pasta',
        'Garlic Butter Shrimp',
        'Baked Lemon Chicken',
        'Spicy Vegetable Curry',
        'Honey Glazed Salmon'
      ];
      
      const mockRecommendations = [];
      
      for (let i = 0; i < 4; i++) {
        const mockId = `rec-${i + 1}`;
        const title = recommendationTitles[i % recommendationTitles.length];
        
        // Create simplified mock recipe
        const mockRecipe = generateSimpleMockRecipe(mockId, title);
        
        mockRecommendations.push({
          id: mockRecipe.id,
          title: mockRecipe.title,
          image: mockRecipe.image,
          cookingTime: Math.floor(Math.random() * 30) + 10,
          servings: Math.floor(Math.random() * 3) + 2
        });
      }
      
      suggestedRecipes.value = mockRecommendations;
    };
    
    const fetchSampleMoreRecipes = () => {
      // Generate 8 more related recipes for a better grid view
      const moreTitles = [
        'Vegetable Curry',
        'Seafood Paella',
        'Mushroom Risotto',
        'Thai Green Curry',
        'Classic Beef Burger',
        'Mediterranean Salad',
        'Apple Cinnamon Pie',
        'BBQ Chicken Wings'
      ];
      
      const mockMoreRecipes = [];
      
      for (let i = 0; i < 8; i++) {
        const mockId = `more-${i + 1}`;
        const title = moreTitles[i % moreTitles.length];
        
        // Create simplified mock recipe
        const mockRecipe = generateSimpleMockRecipe(mockId, title);
        
        mockMoreRecipes.push({
          id: mockRecipe.id,
          title: mockRecipe.title,
          image: mockRecipe.image,
          type: mockRecipe.type,
          cookTime: mockRecipe.cookingTime,
          description: mockRecipe.description.substring(0, 100) + '...'
        });
      }
      
      moreRecipes.value = mockMoreRecipes;
    };    // Load data when component is mounted  
    onMounted(async () => {
      console.log('=== RECIPE DETAIL COMPONENT MOUNTED ===');
      console.log('Recipe ID from route params:', props.id);
      
      try {
        // First, fetch recipe data
        await fetchRecipeData();
        console.log('Recipe data fetched successfully');
      } catch (error) {
        console.error('Error during component initialization:', error);
      }
      
      // Initialize AOS animations
      setTimeout(() => {
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
        });
      }, 100);
      
      console.log('=== RECIPE DETAIL COMPONENT MOUNT COMPLETED ===');
    });    return {
      user,
      recipe,
      suggestedRecipes,
      moreRecipes,      loading,
      error,
      formattedInstructions,
      goToLogin,
      goBack,
      printRecipe,
      shareRecipe,
      addToMealPlan,
      confirmAddToMealPlan,
      addToGrocery,
      confirmAddToGrocery,
      dismissApiBanner,
      toggleIngredientCheck,
      copyToClipboard,
      goToMealPlanner,
      goToGroceryList,
      initializeUI,
      hasNutritionData
    };
  }
};
</script>

<style scoped>
/* Main layout styles */
.recipe-detail-page {
  padding-top: 60px;
  background-color: #fafafa;
}

/* API Status Banner */
.api-status-banner {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.loading-container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-container {
  text-align: center;
}

.loading-text {
  color: #666;
  font-size: 1.1rem;
}

.error-container {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Hero section styles */
.recipe-hero {
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 40px;
}

.recipe-hero-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  color: white;
  padding-bottom: 40px;
}

.recipe-hero-content {
  width: 100%;
}

.recipe-breadcrumb {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.recipe-back-btn {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  background-color: rgba(255,255,255,0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.recipe-back-btn:hover {
  background-color: rgba(255,255,255,0.3);
}

.recipe-actions {
  display: flex;
  gap: 10px;
}

.recipe-action-btn {
  background-color: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.recipe-action-btn:hover {
  background-color: rgba(255,255,255,0.3);
}

.recipe-header-content {
  text-align: center;
}

.recipe-tag {
  display: inline-block;
  background-color: #17B97A;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.recipe-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
}

.recipe-meta {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.recipe-author, .recipe-date {
  font-size: 0.9rem;
  opacity: 0.9;
}

.recipe-author .by {
  opacity: 0.7;
  margin-right: 4px;
}

.recipe-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stars {
  color: #FFD700;
  letter-spacing: -2px;
}

/* Main content styles */
.recipe-main-content {
  background-color: white;
  border-radius: 12px 12px 0 0;
  margin-top: -40px;
  position: relative;
  box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
}

.recipe-category {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.recipe-category span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: #f1f8f4;
  color: #17B97A;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.recipe-category span i {
  font-size: 1.1rem;
}

.recipe-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 30px 0;
}

.recipe-stat-card {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
}

.recipe-stat-card:hover {
  background-color: #f1f8f4;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.recipe-stat-icon {
  background-color: #17B97A;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.recipe-stat-data {
  flex: 1;
}

.recipe-stat-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
}

.recipe-stat-label {
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 4px;
}

/* Section styles */
.recipe-section {
  margin-bottom: 40px;
  padding-top: 20px;
}

.recipe-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #f1f8f4;
  padding-bottom: 10px;
}

.recipe-section-title {
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: #2c3e50;
}

.recipe-section-title i {
  color: #17B97A;
}

.recipe-section-actions {
  display: flex;
  gap: 10px;
}

/* Ingredients styles */
.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px dashed #e9ecef;
}

.ingredient-checkbox {
  position: relative;
}

.ingredient-input {
  position: absolute;
  opacity: 0;
}

.ingredient-label {
  width: 24px;
  height: 24px;
  border: 2px solid #17B97A;
  border-radius: 4px;
  display: inline-block;
  cursor: pointer;
  position: relative;
}

.ingredient-input:checked + .ingredient-label::after {
  content: '';
  position: absolute;
  left: 8px;
  top: 4px;
  width: 6px;
  height: 10px;
  border: solid #17B97A;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.ingredient-input:checked ~ .ingredient-text {
  text-decoration: line-through;
  color: #6c757d;
}

.ingredient-text {
  flex: 1;
  transition: all 0.3s ease;
  text-align: left;
}

/* Instructions styles */
.instruction-step {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
}

.step-number {
  background-color: #17B97A;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  padding-top: 5px;
  line-height: 1.6;
}

.instructions-text {
  line-height: 1.8;
  white-space: pre-line;
  text-align: left;
}

.step-content {
  flex: 1;
  padding-top: 5px;
  line-height: 1.6;
  text-align: left;
}

/* Chef's Tips and Notes styles */
.chef-tip, .note-item {
  background-color: #f1f8f4;
  border-left: 4px solid #17B97A;
  padding: 15px 20px;
  border-radius: 0 8px 8px 0;
  margin-bottom: 15px;
}

.note-item {
  background-color: #fff8e6;
  border-left-color: #ffc107;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.note-item i {
  color: #ffc107;
  font-size: 1.2rem;
  margin-top: 5px;
}

.note-item p {
  margin: 0;
}

/* Sidebar styles */
.recipe-sidebar {
  position: sticky;
  top: 90px;
}

.sidebar-section {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.sidebar-heading {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 10px;
}

.sidebar-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #17B97A;
}

.recipe-actions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f8f9fa;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
  color: #2c3e50;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.sidebar-action-btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 100%;
  height: 100%;
  background-color: rgba(23, 185, 122, 0.1);
  transition: all 0.3s ease;
}

.sidebar-action-btn:hover {
  background-color: #f1f8f4;
  color: #17B97A;
  transform: translateX(5px);
}

.sidebar-action-btn:hover::after {
  right: 0;
}

.sidebar-action-btn:active {
  transform: translateX(5px) scale(0.98);
}

.sidebar-action-btn i {
  color: #17B97A;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.sidebar-action-btn:hover i {
  transform: scale(1.2);
}

.sidebar-action-btn i {
  color: #17B97A;
  font-size: 1.2rem;
}

/* Recommended recipes */
.recommended-recipes {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.no-suggestions {
  text-align: center;
  padding: 20px;
  color: #6c757d;
}

.no-suggestions i {
  font-size: 2rem;
  margin-bottom: 10px;
  opacity: 0.7;
}

.recommended-recipe-card {
  display: flex;
  gap: 12px;
  transition: all 0.3s ease;
}

.recommended-recipe-card:hover {
  transform: translateX(5px);
}

.recommended-recipe-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.recommended-recipe-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recommended-recipe-content {
  flex: 1;
}

.recommended-recipe-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recommended-recipe-meta {
  display: flex;
  gap: 10px;
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 6px;
}

.recommended-recipe-link {
  font-size: 0.85rem;
  color: #17B97A;
  font-weight: 500;
  text-decoration: none;
}

/* Nutrition facts */
.nutrition-facts {
  background-color: #f1f8f4;
}

.nutrition-fact {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #d1e7dd;
}

.nutrition-label {
  color: #2c3e50;
  font-weight: 500;
}

.nutrition-value {
  font-weight: 700;
  color: #17B97A;
}

/* Nutrition facts unavailable styles */
.nutrition-unavailable {
  padding: 10px 0;
  text-align: center;
}

.nutrition-icon {
  font-size: 2.5rem;
  color: #17B97A;
  margin-bottom: 10px;
  display: block;
}

.nutrition-message {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 5px;
}

.nutrition-submessage {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.nutrition-data {
  margin-bottom: 15px;
}

/* More recipes section */
.more-recipes-section {
  margin: 60px 0 30px;
}

.section-title {
  text-align: center;
  font-weight: 700;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #17B97A;
}

/* Card styles */
.recipe-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.recipe-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.recipe-card:hover .card-img-top {
  transform: scale(1.05);
}

.card-img-top {
  height: 180px;
  transition: transform 0.3s ease;
}

.object-cover {
  object-fit: cover;
}

.badge {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.35em 0.65em;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Toast notifications */
.toast-container {
  z-index: 1050;
}

.toast {
  opacity: 1 !important;
  border-radius: 8px;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.toast.bg-success {
  background-color: #17B97A !important;
}

.toast.bg-danger {
  background-color: #dc3545 !important;
}

.toast-body {
  padding: 0.75rem 1.25rem;
  font-weight: 500;
}

/* Print styles */
@media print {
  .recipe-hero-overlay {
    background: none !important;
    color: black;
  }
  
  .sidebar-section, .more-recipes-section, .recipe-action-btn, .recipe-back-btn {
    display: none !important;
  }
  
  .recipe-title {
    font-size: 24pt;
    color: black;
  }
  
  .recipe-hero {
    height: auto;
    margin-bottom: 20px;
  }
  
  .recipe-main-content {
    box-shadow: none;
    margin-top: 0;
  }
  
  .col-lg-8 {
    width: 100%;
  }
}

/* Responsive styles */
@media (max-width: 991.98px) {
  .recipe-hero {
    height: 400px;
  }
  
  .recipe-title {
    font-size: 2.5rem;
  }
  
  .recipe-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .desktop-recipe-actions {
    display: none;
  }
}

@media (max-width: 767.98px) {
  .recipe-hero {
    height: 300px;
  }
  
  .recipe-title {
    font-size: 2rem;
  }
  
  .recipe-actions {
    display: none;
  }
  
  .recipe-breadcrumb {
    justify-content: flex-start;
  }
  
  .instruction-step {
    gap: 15px;
  }
}

@media (max-width: 575.98px) {
  .recipe-hero {
    height: 250px;
  }
  
  .recipe-title {
    font-size: 1.5rem;
  }
  
  .recipe-stats-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .step-number {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
  
  .card-img-top {
    height: 150px;
  }
}

/* Enhanced Recipe Actions section */
.recipe-actions-divider {
  font-size: 0.85rem;
  color: #999;
  text-align: center;
  margin: 10px 0;
  position: relative;
}

.recipe-actions-divider::before,
.recipe-actions-divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: rgba(0,0,0,0.1);
}

.recipe-actions-divider::before {
  left: 0;
}

.recipe-actions-divider::after {
  right: 0;
}

.secondary-action {
  background-color: transparent;
  border: 1px solid rgba(0,0,0,0.1);
}

.secondary-action i {
  color: #6c757d;
}

.secondary-action:hover i {
  color: #17B97A;
}

.ingredient-text.checked {
  text-decoration: line-through;
  color: #6c757d;
}

/* Enhanced tooltip */
.tooltip .tooltip-inner {
  background-color: #17B97A;
  padding: 8px 12px;
  font-weight: 500;
}

.tooltip .tooltip-arrow::before {
  border-top-color: #17B97A;
  border-bottom-color: #17B97A;
}
</style>

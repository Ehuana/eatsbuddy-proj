<template>
  <div class="meal-planner">
    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3>Weekly Meal Planner</h3>
              <div>
                <button @click="prevWeek" class="btn btn-outline-secondary me-2">
                  <i class="ri-arrow-left-s-line"></i> Previous Week
                </button>
                <button @click="nextWeek" class="btn btn-outline-secondary">
                  Next Week <i class="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
            
            <div v-if="loading" class="text-center my-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            
            <div v-else class="meal-calendar">
              <div class="row mb-3 day-header">
                <div class="col"></div>
                <div class="col-md text-center" v-for="day in weekDays" :key="day.date">
                  <strong>{{ day.name }}</strong>
                  <div class="small text-muted">{{ formatDate(day.date) }}</div>
                </div>
              </div>
              
              <div class="meal-row row mb-4" v-for="mealType in mealTypes" :key="mealType">
                <div class="col meal-type-label">
                  <span class="badge bg-light text-dark p-2">{{ mealType }}</span>
                </div>
                
                <div class="col-md" v-for="day in weekDays" :key="`${mealType}-${day.date}`">
                  <div 
                    @click="openMealSelector(mealType, day.date)" 
                    class="meal-slot"
                    :class="{ 'has-meal': getMeal(mealType, day.date) }"
                  >
                    <div v-if="getMeal(mealType, day.date)" class="meal-item">
                      <img 
                        v-if="getMeal(mealType, day.date).image" 
                        :src="getMeal(mealType, day.date).image" 
                        :alt="getMeal(mealType, day.date).title"
                        class="meal-image"
                      >
                      <div class="meal-details">
                        <div class="meal-title">{{ getMeal(mealType, day.date).title }}</div>
                        <div class="meal-actions">
                          <button @click.stop="viewRecipe(getMeal(mealType, day.date).id)" class="btn btn-sm btn-link">
                            <i class="ri-eye-line"></i>
                          </button>
                          <button @click.stop="removeMeal(mealType, day.date)" class="btn btn-sm btn-link text-danger">
                            <i class="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-else class="meal-placeholder">
                      <i class="ri-add-line"></i> Add meal
                    </div>
                  </div>
                </div>
              </div>
                <!-- <div class="text-end mt-4">
                <button @click="generateGroceryList" class="btn btn-success" :disabled="generatingGroceryList">
                  <span v-if="generatingGroceryList" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i v-else class="ri-shopping-cart-line me-2"></i> 
                  {{ generatingGroceryList ? 'Generating...' : 'Generate Grocery List' }}
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Meal Selector Modal -->
    <div class="modal fade" id="mealSelectorModal" tabindex="-1" aria-hidden="true" ref="mealModal">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select a Recipe for {{ currentMealType }} on {{ formatDate(currentDate) }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">            <div class="mb-3">
              <input 
                type="text" 
                class="form-control" 
                placeholder="Search for recipes" 
                v-model="searchQuery"
                @keyup.enter="searchRecipesAction"
              >
              <button 
                type="button" 
                class="btn btn-primary mt-2" 
                @click="searchRecipesAction"
                :disabled="!searchQuery.trim() || searchLoading"
              >
                <span v-if="searchLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                Search Recipes
              </button>
            </div>
            
            <div v-if="searchLoading" class="text-center my-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            
            <div v-else-if="searchResults.length" class="row row-cols-1 row-cols-md-3 g-3">
              <div v-for="recipe in searchResults" :key="recipe.id" class="col">
                <div class="card h-100" @click="selectMeal(recipe)">
                  <img 
                    :src="recipe.image" 
                    class="card-img-top" 
                    :alt="recipe.title"
                    style="height: 150px; object-fit: cover;"
                  >
                  <div class="card-body">
                    <h6 class="card-title mb-0">{{ recipe.title }}</h6>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else-if="searchPerformed" class="text-center my-4">
              <p>No recipes found. Try a different search term.</p>
            </div>
            
            <div v-else class="text-center my-4">
              <p>Search for recipes or select from your favorites.</p>
              
              <div v-if="favoriteRecipes.length" class="mt-4">
                <h6 class="mb-3">Your Favorite Recipes</h6>
                <div class="row row-cols-1 row-cols-md-3 g-3">
                  <div v-for="recipe in favoriteRecipes" :key="recipe.id" class="col">
                    <div class="card h-100" @click="selectMeal(recipe)">
                      <img 
                        :src="recipe.image" 
                        class="card-img-top" 
                        :alt="recipe.title"
                        style="height: 150px; object-fit: cover;"
                      >
                      <div class="card-body">
                        <h6 class="card-title mb-0">{{ recipe.title }}</h6>
                      </div>
                    </div>
                  </div>
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
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useFirestore } from '@/composables/useFirestore';
import { searchRecipes, getRecipeDetails } from '@/services/mealApi';

// Check if Bootstrap is available, if not provide fallback
let Modal;
try {
  Modal = require('bootstrap').Modal;
} catch (error) {
  console.warn('Bootstrap not found, using fallback modal implementation');
  // Simple fallback modal implementation
  Modal = class {
    constructor(element) {
      this.element = element;
    }
    show() {
      if (this.element) {
        this.element.style.display = 'block';
        this.element.classList.add('show');
        document.body.classList.add('modal-open');
      }
    }
    hide() {
      if (this.element) {
        this.element.style.display = 'none';
        this.element.classList.remove('show');
        document.body.classList.remove('modal-open');
      }
    }
    static getInstance(element) {
      return element._modalInstance || null;
    }
  };
}

export default {
  setup() {
    const router = useRouter();
    const { user } = useAuth();
    const { addToCollection, queryByField, updateDocument } = useFirestore();
    
    // Current week setup
    const currentWeekStart = ref(getMonday(new Date()));
    const loading = ref(false);
    const mealPlan = ref({});
    const mealPlanId = ref(null);
    
    // Modal and recipe search
    const mealModal = ref(null);
    const currentMealType = ref('');
    const currentDate = ref(null);
    const searchQuery = ref('');    const searchResults = ref([]);
    const searchLoading = ref(false);
    const searchPerformed = ref(false);
    const favoriteRecipes = ref([]);
    const generatingGroceryList = ref(false);
    
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    
    const weekDays = computed(() => {
      const days = [];
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart.value);
        date.setDate(date.getDate() + i);
        days.push({
          name: dayNames[i],
          date: formatDateToString(date)
        });
      }
      
      return days;
    });
    
    // Helper functions
    function getMonday(d) {
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    }
    
    function formatDateToString(date) {
      return date.toISOString().split('T')[0];
    }
    
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }    // Load meal plan data
    onMounted(async () => {
      if (user.value) {
        await loadMealPlan();
        await loadFavoriteRecipes();
        
        // Initialize Bootstrap modal after DOM is ready
        await nextTick();
        setTimeout(() => {
          try {
            const modalElement = document.getElementById('mealSelectorModal');
            if (modalElement) {
              mealModal.value = new Modal(modalElement);
              modalElement._modalInstance = mealModal.value; // Store reference for fallback
              console.log('Modal initialized successfully');
            } else {
              console.error('Modal element not found');
            }
          } catch (error) {
            console.error('Error initializing modal:', error);
          }
        }, 100); // Reduced delay
        
        // Test API connection
        console.log('Testing API connection...');
        try {
          const testResult = await searchRecipes('chicken');
          console.log('API test successful, found recipes:', testResult.results?.length || 0);
        } catch (error) {
          console.error('API test failed:', error);
        }
      }
    });
    
    const loadMealPlan = async () => {
      if (!user.value) return;
      
      try {
        loading.value = true;
        
        const weekStart = formatDateToString(currentWeekStart.value);
        const plans = await queryByField('mealPlans', 'userId', user.value.uid);
        
        // Find plan for current week or create new
        const existingPlan = plans.find(p => p.weekStart === weekStart);
        
        if (existingPlan) {
          mealPlan.value = existingPlan.meals || {};
          mealPlanId.value = existingPlan.id;
        } else {
          mealPlan.value = {};
          mealPlanId.value = null;
        }
      } catch (err) {
        console.error('Failed to load meal plan', err);
      } finally {
        loading.value = false;
      }
    };
    
const loadFavoriteRecipes = async () => {
  if (!user.value) return;
  
  try {
    const recipes = await queryByField('recipes', 'userId', user.value.uid);
    favoriteRecipes.value = recipes;
    
    // Add debugging logs here instead of at the end
    console.log("User UID:", user.value.uid);
    console.log("Week start:", formatDateToString(currentWeekStart.value));
    console.log("Favorite recipes loaded:", recipes.length);
  } catch (err) {
    console.error('Failed to load favorite recipes', err);
  }
};
    
const saveMealPlan = async () => {
  
  // 1. Verify user exists and get UID
  if (!user.value || !user.value.uid) {
    console.error("User not authenticated");
    return;
  }
  
  try {
    const weekStart = formatDateToString(currentWeekStart.value);
    
    // 2. Create properly structured document
    const newPlan = {
      userId: user.value.uid, // Verified UID
      weekStart: weekStart,
      meals: mealPlan.value,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // 3. Debug output
    console.log("Saving meal plan:", JSON.stringify(newPlan, null, 2));
    
    if (mealPlanId.value) {
      await updateDocument('mealPlans', mealPlanId.value, newPlan);
    } else {
      const docRef = await addToCollection('mealPlans', newPlan);
      mealPlanId.value = docRef.id;
    }
    
    console.log("Meal plan saved successfully");
  } catch (err) {
  console.error('Failed to save meal plan', err);
  // Add specific error message
  alert(`Save failed: ${err.message || 'Check console for details'}`);
}
};
    
    // Navigation
    const prevWeek = async () => {
      const newDate = new Date(currentWeekStart.value);
      newDate.setDate(newDate.getDate() - 7);
      currentWeekStart.value = newDate;
      await loadMealPlan();
    };
    
    const nextWeek = async () => {
      const newDate = new Date(currentWeekStart.value);
      newDate.setDate(newDate.getDate() + 7);
      currentWeekStart.value = newDate;
      await loadMealPlan();
    };
    
    // Meal management
    const getMeal = (mealType, date) => {
      if (!mealPlan.value[date]) return null;
      return mealPlan.value[date][mealType] || null;
    };    const openMealSelector = (mealType, date) => {
      console.log('=== OPENING MEAL SELECTOR ===');
      console.log('Meal type:', mealType);
      console.log('Date:', date);
      
      currentMealType.value = mealType;
      currentDate.value = date;
      
      // Clear previous search results
      searchResults.value = [];
      searchPerformed.value = false;
      searchQuery.value = '';
      
      // Try multiple approaches to show the modal
      const modalElement = document.getElementById('mealSelectorModal');
      if (!modalElement) {
        console.error('Modal element not found');
        return;
      }
      
      console.log('Modal element found:', modalElement);
      
      // Approach 1: Use the stored modal instance
      if (mealModal.value && typeof mealModal.value.show === 'function') {
        try {
          mealModal.value.show();
          return;
        } catch (error) {
          console.error('Error using stored modal instance:', error);
        }
      }
      
      // Approach 2: Try to get existing Bootstrap modal instance
      try {
        const existingModal = Modal.getInstance(modalElement);
        if (existingModal) {
          existingModal.show();
          return;
        }
      } catch (error) {
        console.error('Error getting existing modal instance:', error);
      }
      
      // Approach 3: Create new modal instance
      try {
        console.log('Creating new modal instance...');
        mealModal.value = new Modal(modalElement);
        modalElement._modalInstance = mealModal.value;
        mealModal.value.show();
      } catch (error) {
        console.error('Error creating new modal instance:', error);
        
        // Approach 4: Fallback - show modal manually
        console.log('Using fallback modal display...');
        modalElement.style.display = 'block';
        modalElement.classList.add('show');
        document.body.classList.add('modal-open');
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.id = 'meal-modal-backdrop';
        document.body.appendChild(backdrop);
        
        // Add close event listener
        const closeModal = () => {
          modalElement.style.display = 'none';
          modalElement.classList.remove('show');
          document.body.classList.remove('modal-open');
          const backdrop = document.getElementById('meal-modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        };
        
        // Close on backdrop click
        backdrop.addEventListener('click', closeModal);
        
        // Close on close button click
        const closeButton = modalElement.querySelector('.btn-close');
        if (closeButton) {
          closeButton.addEventListener('click', closeModal);
        }
      }
    };
const searchRecipesAction = async () => {
  console.log('=== SEARCH BUTTON CLICKED ===');
  console.log('Search query:', searchQuery.value);
  console.log('Search query trimmed:', searchQuery.value.trim());
  
  if (!searchQuery.value.trim()) {
    console.log('Empty search query, returning early');
    return;
  }
  
  try {
    console.log('Starting search...');
    searchLoading.value = true;
    searchPerformed.value = true;
    
    console.log('Calling searchRecipes API with query:', searchQuery.value);
    const response = await searchRecipes(searchQuery.value, 10);
    console.log('API response received:', response);
    
    // Handle different API response structures
    searchResults.value = response?.results || 
                          response?.data?.results || 
                          [];
    
    console.log('Search results set:', searchResults.value.length, 'recipes');
    
    if (searchResults.value.length === 0) {
      console.log('No recipes found for search term:', searchQuery.value);
    } else {
      console.log('Found recipes:', searchResults.value.map(r => r.title || r.strMeal));
    }
  } catch (err) {
    console.error('Search failed with error:', err);
    console.error('Error details:', err.message, err.stack);
    searchResults.value = [];
    // Show user-friendly error
    alert(`Search failed: ${err.message || 'Please try again later'}`);
  } finally {
    console.log('Search completed, setting loading to false');
    searchLoading.value = false;
  }
};        const selectMeal = async (recipe) => {
      if (!currentDate.value || !currentMealType.value) return;
      
      try {
        // Try to get detailed recipe information for better grocery list generation
        let detailedRecipe = recipe;
        if (recipe.id) {
          console.log('Fetching detailed recipe information for:', recipe.title);
          try {
            const details = await getRecipeDetails(recipe.id);
            if (details && details.ingredients) {
              detailedRecipe = { ...recipe, ...details };
              console.log('Enhanced recipe with details:', detailedRecipe);
            }
          } catch (error) {
            console.log('Could not fetch detailed recipe, using basic info:', error);
            // Continue with original recipe if details fetch fails
          }
        }
        
        if (!mealPlan.value[currentDate.value]) {
          mealPlan.value[currentDate.value] = {};
        }
        
        mealPlan.value[currentDate.value][currentMealType.value] = {
          id: detailedRecipe.id,
          title: detailedRecipe.title,
          image: detailedRecipe.image,
          // Enhanced ingredients for better grocery list generation
          ingredients: detailedRecipe.ingredients || detailedRecipe.extendedIngredients || [],
          servings: detailedRecipe.servings || 1,
          // Keep original recipe data as backup
          originalRecipe: recipe        };
        
        // Close modal with multiple fallbacks
        const modalElement = document.getElementById('mealSelectorModal');
        
        try {
          // Try stored modal instance first
          if (mealModal.value && typeof mealModal.value.hide === 'function') {
            mealModal.value.hide();
          } else {
            // Try Bootstrap getInstance
            const modal = Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            } else {
              // Manual fallback
              if (modalElement) {
                modalElement.style.display = 'none';
                modalElement.classList.remove('show');
                document.body.classList.remove('modal-open');
                
                // Remove backdrop
                const backdrop = document.getElementById('meal-modal-backdrop');
                if (backdrop) {
                  backdrop.remove();
                }
              }
            }
          }
        } catch (error) {
          console.error('Error closing modal:', error);
          // Force close as last resort
          if (modalElement) {
            modalElement.style.display = 'none';
            modalElement.classList.remove('show');
            document.body.classList.remove('modal-open');
            const backdrop = document.getElementById('meal-modal-backdrop');
            if (backdrop) {
              backdrop.remove();
            }
          }
        }
        
        saveMealPlan();
        
      } catch (error) {
        console.error('Error selecting meal:', error);
        // Still save the basic recipe info if detailed fetch fails
        if (!mealPlan.value[currentDate.value]) {
          mealPlan.value[currentDate.value] = {};
        }
        
        mealPlan.value[currentDate.value][currentMealType.value] = {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          ingredients: recipe.extendedIngredients || [],
          servings: recipe.servings || 1
        };
        
        saveMealPlan();
      }
    };
    
    const removeMeal = (mealType, date) => {
      if (mealPlan.value[date]) {
        delete mealPlan.value[date][mealType];
        
        // Clean up empty date objects
        if (Object.keys(mealPlan.value[date]).length === 0) {
          delete mealPlan.value[date];
        }
        
        saveMealPlan();
      }
    };
    
    const viewRecipe = (id) => {
      router.push(`/recipes/${id}`);
    };
      // Generate grocery list from meal plan
    const generateGroceryList = async () => {
      if (!user.value) {
        alert('Please log in to generate a grocery list');
        return;
      }
      
      if (Object.keys(mealPlan.value).length === 0) {
        alert('No meals planned for this week. Add some recipes to your meal plan first!');
        return;
      }
      
      try {
        generatingGroceryList.value = true;
        console.log('Generating grocery list from meal plan...');
        
        // Show confirmation dialog
        const confirmGenerate = confirm(
          `Generate grocery list from ${Object.keys(mealPlan.value).length} planned meal days? This will create a new grocery list with ingredients from all your planned meals.`
        );
        
        if (!confirmGenerate) return;
        
        // Collect all ingredients from planned meals
        const allIngredients = [];
        const ingredientMap = new Map(); // To consolidate duplicates
        
        // Loop through each date in the meal plan
        Object.entries(mealPlan.value).forEach(([date, dayMeals]) => {
          Object.entries(dayMeals).forEach(([mealType, meal]) => {
            if (meal && meal.ingredients) {
              // Add each ingredient with context
              meal.ingredients.forEach(ingredient => {
                const ingredientName = ingredient.name || ingredient.original || ingredient;
                const key = ingredientName.toLowerCase().trim();
                
                if (ingredientMap.has(key)) {
                  // Ingredient already exists, increase quantity
                  const existing = ingredientMap.get(key);
                  existing.amount = (existing.amount || 1) + (ingredient.amount || 1);
                  existing.recipes.push(`${meal.title} (${mealType}, ${formatDate(date)})`);
                } else {
                  // New ingredient
                  ingredientMap.set(key, {
                    name: ingredientName,
                    amount: ingredient.amount || 1,
                    unit: ingredient.unit || '',
                    recipes: [`${meal.title} (${mealType}, ${formatDate(date)})`]
                  });
                }
              });
            } else {
              // If no detailed ingredients, add a generic item for the whole recipe
              const key = `ingredients-for-${meal.title}`.toLowerCase();
              if (!ingredientMap.has(key)) {
                ingredientMap.set(key, {
                  name: `Ingredients for ${meal.title}`,
                  amount: 1,
                  unit: 'recipe',
                  recipes: [`${meal.title} (${mealType}, ${formatDate(date)})`]
                });
              }
            }
          });
        });
        
        // Convert map to array with proper format for grocery list
        ingredientMap.forEach(ingredient => {
          allIngredients.push({
            name: ingredient.amount > 1 && ingredient.unit ? 
              `${ingredient.amount} ${ingredient.unit} ${ingredient.name}` : 
              ingredient.name,
            notes: `From: ${ingredient.recipes.join(', ')}`,
            checked: false
          });
        });
        
        console.log('Collected and consolidated ingredients:', allIngredients);          // Save grocery list to Firestore
        const groceryListData = {
          name: `Meal Plan Groceries - Week of ${formatDate(formatDateToString(currentWeekStart.value))}`,
          date: formatDateToString(currentWeekStart.value),
          userId: user.value.uid,
          items: allIngredients,
          createdAt: new Date(),
          updatedAt: new Date(),
          fromMealPlan: true
        };
        
        await addToCollection('grocery_lists', groceryListData);
        
        console.log('Grocery list saved successfully');
        
        // Navigate to the correct grocery list page
        router.push('/grocery-list');
        
        // Show success message
        setTimeout(() => {
          alert(`Grocery list generated with ${allIngredients.length} items from your meal plan!`);
        }, 500);
          } catch (error) {
        console.error('Failed to generate grocery list:', error);
        alert('Failed to generate grocery list. Please try again.');
      } finally {
        generatingGroceryList.value = false;
      }
    };
    
    return {
      weekDays,
      mealTypes,
      loading,
      
      // Navigation
      prevWeek,
      nextWeek,
      
      // Format functions
      formatDate,
      
      // Meal management
      getMeal,
      openMealSelector,
      removeMeal,
      viewRecipe,
        // Modal and search
      mealModal,
      currentMealType,
      currentDate,
      searchQuery,      searchResults,
      searchLoading,
      searchPerformed,
      favoriteRecipes,
      generatingGroceryList,
      searchRecipesAction,
      searchRecipes: searchRecipesAction,
      selectMeal,
      
      // Grocery list
      generateGroceryList
    };
  }
};
</script>

<style scoped>
.meal-planner {
  margin: 20px 0;
}

.meal-row {
  min-height: 100px;
}

.meal-type-label {
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-header .col-md {
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
}

.meal-slot {
  height: 100%;
  min-height: 100px;
  border: 1px dashed #dee2e6;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.meal-slot:hover {
  border-color: #6c757d;
  background-color: #f8f9fa;
}

.meal-slot.has-meal {
  border-style: solid;
  border-color: #28a745;
}

.meal-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.meal-item {
  display: flex;
  height: 100%;
}

.meal-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.meal-details {
  flex: 1;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
}

.meal-title {
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1;
}

.meal-actions {
  display: flex;
  justify-content: flex-end;
}

.badge {
  font-weight: 500;
}

/* Modal styles */
.card {
  cursor: pointer;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>

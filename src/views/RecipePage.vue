<!-- RecipePage.vue -->
<template>
  <div class="EG-Default bg-white py-5">
    <div class="bg-white py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-10 col-12">
            <div class="text-center" data-aos="fade-down" data-aos-duration="1300">
              <nav>
                <ol class="breadcrumb justify-content-center">
                  <li class="breadcrumb-item"><router-link to="/" class="text-success">HOME</router-link></li>
                  <li class="breadcrumb-item link-secondary active" aria-current="page">RECIPES</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Hero Section -->
    <div class="container hero" data-aos="fade-up">
      <h1>Choose from thousands of recipes</h1>
      <p>Find your perfect meal with our advanced filtering and search options</p>
    </div>

    <div class="container mt-4">
      <div class="row">
        <!-- Filters Section -->
        <aside class="col-lg-3" data-aos="fade-right">
          <div class="filters p-4 mb-4 shadow-sm rounded">
            <h4 class="mb-3">Filter Recipes</h4>
            
            <!-- Ingredient Filter -->
            <div class="mb-3">
              <label for="ingredientFilter" class="form-label fw-bold">Main Ingredient</label>
              <div class="input-group mb-2">
                <input 
                  type="text" 
                  class="form-control" 
                  id="ingredientFilter" 
                  v-model="ingredientInput" 
                  placeholder="e.g. chicken"
                  @keyup.enter="applyIngredientFilter"
                  list="ingredientSuggestions"
                />
                <button 
                  class="btn btn-outline-success" 
                  type="button"
                  @click="applyIngredientFilter"
                >
                  <i class="ri-filter-line"></i>
                </button>
              </div>
              <datalist id="ingredientSuggestions">
                <option v-for="ingredient in topIngredients" :key="ingredient" :value="ingredient"></option>
              </datalist>
              <small class="text-muted" v-if="ingredientSuggestions.length > 0">
                Suggestions: 
                <span v-for="(suggestion, index) in ingredientSuggestions.slice(0, 3)" :key="index" 
                  class="badge bg-light text-dark me-1 cursor-pointer" @click="selectIngredientSuggestion(suggestion)">
                  {{ suggestion }}
                </span>
              </small>
            </div>
            
            <!-- Category Filter -->
            <div class="mb-3">
              <label for="categoryFilter" class="form-label fw-bold">Category</label>
              <select 
                class="form-select" 
                id="categoryFilter" 
                v-model="filters.category"
                @change="applyFilters('category')"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            
            <!-- Cuisine/Area Filter -->
            <div class="mb-3">
              <label for="areaFilter" class="form-label fw-bold">Cuisine</label>
              <select 
                class="form-select" 
                id="areaFilter" 
                v-model="filters.area"
                @change="applyFilters('area')"
              >
                <option value="">All Cuisines</option>
                <option v-for="area in areas" :key="area" :value="area">
                  {{ area }}
                </option>
              </select>
            </div>
            
            <!-- Clear Filters Button -->
            <button 
              class="btn btn-success w-100 mt-2" 
              @click="clearFilters"
              :disabled="!isFiltered"
            >
              Clear All Filters
            </button>
          </div>
          
          <!-- Sort Options Card -->
          <div class="sort-options p-4 shadow-sm rounded">
            <h4 class="mb-3">Sort By</h4>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="sortOption" id="sortRelevance" value="relevance" v-model="sortOption">
              <label class="form-check-label" for="sortRelevance">
                Most Relevant
              </label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="sortOption" id="sortName" value="name" v-model="sortOption">
              <label class="form-check-label" for="sortName">
                Name (A-Z)
              </label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="sortOption" id="sortPopularity" value="popularity" v-model="sortOption">
              <label class="form-check-label" for="sortPopularity">
                Most Popular
              </label>
            </div>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="sortOption" id="sortTime" value="time" v-model="sortOption">
              <label class="form-check-label" for="sortTime">
                Preparation Time
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sortOption" id="sortRandom" value="random" v-model="sortOption">
              <label class="form-check-label" for="sortRandom">
                Random
              </label>
            </div>
          </div>
          
          <!-- Recent Searches Card -->
          <div v-if="recentSearches.length > 0" class="recent-searches p-4 mt-4 shadow-sm rounded">
            <h4 class="mb-3">Recent Searches</h4>
            <div class="d-flex flex-wrap gap-2">
              <span 
                v-for="(search, index) in recentSearches" 
                :key="index" 
                class="badge bg-light text-dark p-2 cursor-pointer"
                @click="applyRecentSearch(search)"
              >
                {{ search }}
              </span>
            </div>
          </div>
        </aside>

        <!-- Recipe Cards Section -->
        <main class="col-lg-9" data-aos="fade-left">
          <RecipeList 
            :selectedFilters="filters" 
            :sortOption="sortOption"
            ref="recipeList" 
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeList from '@/components/recipes/RecipeList.vue';
import { getCategories, getAreas, getIngredients } from '@/services/mealApi';
import { ref, computed, watch, onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  components: {
    RecipeList,
  },
  setup() {
    // State for filters
    const filters = ref({
      ingredient: '',
      category: '',
      area: ''
    });
    
    const sortOption = ref('popularity');
    const categories = ref([]);
    const areas = ref([]);
    const loading = ref(false);
    const ingredientInput = ref('');
    const ingredientsList = ref([]);
    const recentSearches = ref([]);
    
    // Popular ingredients for quicker filtering
    const topIngredients = ref([
      'Chicken', 'Beef', 'Pork', 'Salmon', 'Rice', 
      'Potato', 'Pasta', 'Tomato', 'Garlic', 'Onion',
      'Cheese', 'Eggs', 'Avocado', 'Lemon', 'Chocolate'
    ]);
    
    // Generate ingredient suggestions based on user input
    const ingredientSuggestions = computed(() => {
      if (!ingredientInput.value) return [];
      
      const input = ingredientInput.value.toLowerCase();
      // Search for matches in both the full ingredients list and top ingredients
      const allIngredientsList = [...ingredientsList.value, ...topIngredients.value];
      
      return allIngredientsList
        .filter(ing => 
          ing.toLowerCase().includes(input) && 
          ing.toLowerCase() !== input
        )
        .slice(0, 5); // Limit to 5 suggestions
    });
    
    // Computed property to check if any filters are applied
    const isFiltered = computed(() => {
      return filters.value.ingredient || filters.value.category || filters.value.area;
    });
    
    // Select a suggestion
    const selectIngredientSuggestion = (suggestion) => {
      ingredientInput.value = suggestion;
      applyIngredientFilter();
    };
    
    // Apply ingredient filter
    const applyIngredientFilter = () => {
      if (!ingredientInput.value.trim()) return;
      
      filters.value.ingredient = ingredientInput.value.trim();
      filters.value.category = '';
      filters.value.area = '';
      
      // Add to recent searches
      addToRecentSearches(ingredientInput.value.trim());
    };
    
    // Add to recent searches
    const addToRecentSearches = (term) => {
      // Don't add duplicates
      if (!recentSearches.value.includes(term)) {
        recentSearches.value.unshift(term);
        // Limit to 5 recent searches
        if (recentSearches.value.length > 5) {
          recentSearches.value.pop();
        }
        
        // Save to localStorage for persistence
        try {
          localStorage.setItem('recentRecipeSearches', JSON.stringify(recentSearches.value));
        } catch (e) {
          console.warn('Could not save recent searches to localStorage', e);
        }
      }
    };
    
    // Apply a recent search
    const applyRecentSearch = (term) => {
      if (term.includes(':')) {
        // Handle category or area filters
        const [type, value] = term.split(':');
        
        if (type === 'Category') {
          filters.value = {
            ingredient: '',
            category: value,
            area: ''
          };
        } else if (type === 'Cuisine') {
          filters.value = {
            ingredient: '',
            category: '',
            area: value
          };
        }
      } else {
        // Treat as ingredient or general search
        ingredientInput.value = term;
        filters.value = {
          ingredient: term,
          category: '',
          area: ''
        };
      }
    };
    
    // Load recent searches from localStorage
    const loadRecentSearches = () => {
      try {
        const saved = localStorage.getItem('recentRecipeSearches');
        if (saved) {
          recentSearches.value = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Could not load recent searches from localStorage', e);
      }
    };
    
    // Fetch categories and areas from API
    const fetchFilterOptions = async () => {
      try {
        loading.value = true;
        
        // Get categories
        const categoriesData = await getCategories();
        if (categoriesData && categoriesData.length > 0) {
          categories.value = categoriesData.map(cat => cat.strCategory);
        } else {
          // Fallback categories if API fails
          categories.value = [
            'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous',
            'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'
          ];
        }
        
        // Get areas (cuisines)
        const areasData = await getAreas();
        if (areasData && areasData.length > 0) {
          areas.value = areasData.map(area => area.strArea);
        } else {
          // Fallback areas if API fails
          areas.value = [
            'American', 'British', 'Canadian', 'Chinese', 'Dutch', 'Egyptian', 'French', 'Greek', 'Indian', 
            'Irish', 'Italian', 'Japanese', 'Kenyan', 'Malaysian', 'Mexican', 'Moroccan', 'Russian', 
            'Spanish', 'Thai', 'Turkish', 'Vietnamese'
          ];
        }
        
        // Get ingredients for autocomplete
        try {
          const ingredientsData = await getIngredients();
          if (ingredientsData && ingredientsData.length > 0) {
            // Extract unique ingredient names and sort alphabetically
            ingredientsList.value = ingredientsData
              .map(ing => ing.strIngredient)
              .filter((ing, index, self) => 
                ing && ing.trim() !== '' && self.indexOf(ing) === index
              )
              .sort();
          }
        } catch (ingredientsError) {
          console.warn('Could not fetch ingredients list:', ingredientsError);
        }
        
      } catch (error) {
        console.error('Error fetching filter options:', error);
        // Use fallbacks defined above
      } finally {
        loading.value = false;
      }
    };
    
    // Apply filters method
    const applyFilters = (type) => {
      if (type === 'ingredient' && !filters.value.ingredient) {
        return; // Don't apply empty ingredient filter
      }
      
      // Reset other filters when one is selected for clearer UX
      if (type === 'ingredient') {
        filters.value.category = '';
        filters.value.area = '';
        
        // Add to recent searches
        if (filters.value.ingredient) {
          addToRecentSearches(filters.value.ingredient);
        }
      } else if (type === 'category') {
        filters.value.ingredient = '';
        ingredientInput.value = '';
        filters.value.area = '';
        
        // Add to recent searches
        if (filters.value.category) {
          addToRecentSearches(`Category:${filters.value.category}`);
        }
      } else if (type === 'area') {
        filters.value.ingredient = '';
        ingredientInput.value = '';
        filters.value.category = '';
        
        // Add to recent searches
        if (filters.value.area) {
          addToRecentSearches(`Cuisine:${filters.value.area}`);
        }
      }
      
      // Child component will handle the actual filtering
    };
    
    // Clear all filters
    const clearFilters = () => {
      filters.value = {
        ingredient: '',
        category: '',
        area: ''
      };
      ingredientInput.value = '';
      
      // Reset sort option back to default
      sortOption.value = 'popularity';
    };
    
    // Watch for sort option changes
    watch(sortOption, (newValue) => {
      console.log(`Sort option changed to: ${newValue}`);
    });
    
    onMounted(() => {
      AOS.init();
      fetchFilterOptions();
      loadRecentSearches();
    });
    
    return {
      filters,
      categories,
      areas,
      sortOption,
      isFiltered,
      applyFilters,
      clearFilters,
      ingredientInput,
      topIngredients,
      ingredientSuggestions,
      applyIngredientFilter,
      selectIngredientSuggestion,
      recentSearches,
      applyRecentSearch
    };
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #fffbea;
  color: #2c3e50;
}

.hero {
  background: url('../assets/img/Food-1.png') no-repeat center center/cover;
  color: white;
  text-align: center;
  padding: 50px 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.hero h1 {
  font-size: 3rem;
}

.filters, .sort-options, .recent-searches {
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.filters:hover, .sort-options:hover, .recent-searches:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08) !important;
}

.recipe-card {
  transition: transform 0.3s ease-in-out;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.pagination {
  justify-content: center;
}

.cursor-pointer {
  cursor: pointer;
}

.badge {
  transition: all 0.2s ease;
}

.badge:hover {
  background-color: #e9ecef !important;
  transform: scale(1.05);
}

/* Animation for filter changes */
.filters, .sort-options {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.form-check-input:checked {
  background-color: #28a745;
  border-color: #28a745;
}
</style>

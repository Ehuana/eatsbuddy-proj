<template>
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="input-group w-75">
                <input type="text" v-model="searchQuery" class="form-control" placeholder="Search for recipes...">
                <button class="btn btn-success" @click="searchRecipes">Search</button>
            </div>
            
            <!-- This sort dropdown will only be visible on mobile -->
            <select v-if="isMobile" v-model="internalSortOption" class="form-select w-auto d-block d-lg-none" @change="handleSortChange">
                <option value="name">Sort by Name</option>
                <option value="popularity">Sort by Popularity</option>
                <option value="time">Sort by Preparation Time</option>
                <option value="random">Random Order</option>
            </select>
        </div>
        
        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="active-filters mb-3">
            <div class="d-flex flex-wrap gap-2 align-items-center">
                <span class="text-muted me-2">Active Filters:</span>
                <span v-if="activeFilters.ingredient" class="badge bg-light text-dark">
                    Ingredient: {{ activeFilters.ingredient }}
                    <button class="btn-close btn-close-sm ms-1" @click="removeFilter('ingredient')"></button>
                </span>
                <span v-if="activeFilters.category" class="badge bg-light text-dark">
                    Category: {{ activeFilters.category }}
                    <button class="btn-close btn-close-sm ms-1" @click="removeFilter('category')"></button>
                </span>
                <span v-if="activeFilters.area" class="badge bg-light text-dark">
                    Cuisine: {{ activeFilters.area }}
                    <button class="btn-close btn-close-sm ms-1" @click="removeFilter('area')"></button>
                </span>
                <button v-if="hasActiveFilters" class="btn btn-sm btn-outline-danger ms-2" @click="clearAllFilters">
                    Clear All
                </button>
            </div>
        </div>
        
        <div v-if="loading" class="text-center my-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Searching for delicious recipes...</p>
        </div>        <div v-else-if="error" class="alert" :class="error.includes('TheMealDB') ? 'alert-warning' : 'alert-danger'" role="alert">
            <i class="ri-error-warning-line me-2"></i> {{ error }}
            <button v-if="error.includes('TheMealDB')" class="btn btn-outline-secondary btn-sm ms-2" @click="fetchRecipeData">
                Try Again
            </button>
        </div>
        
        <div v-else-if="recipes.length === 0" class="text-center my-5">
            <p>No recipes found. Try a different search term.</p>
        </div>
        
        <div v-else class="row g-4">
            <RecipeItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
        </div>        <nav v-if="recipes.length > 0 && totalResults > pageSize" aria-label="Page navigation" class="mt-4">
            <div v-if="loading" class="text-center mb-2">
                <small class="text-muted">Loading page {{ currentPage }}...</small>
                <div class="progress" style="height: 4px;">
                    <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width: 100%"></div>
                </div>
            </div>
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 || loading }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                        <i class="ri-arrow-left-s-line"></i> Previous
                    </a>
                </li>
                <li class="page-item" v-if="displayedPages[0] > 1">
                    <a class="page-link" href="#" @click.prevent="changePage(1)">1</a>
                </li>
                <li class="page-item disabled" v-if="displayedPages[0] > 2">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item" v-for="page in displayedPages" :key="page" :class="{ active: currentPage === page, disabled: loading }">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item disabled" v-if="displayedPages[displayedPages.length - 1] < totalPages - 1">
                    <span class="page-link">...</span>
                </li>
                <li class="page-item" v-if="displayedPages[displayedPages.length - 1] < totalPages">
                    <a class="page-link" href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages || loading }">
                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                        Next <i class="ri-arrow-right-s-line"></i>
                    </a>
                </li>
            </ul>
            <div class="text-center mt-2">
                <small class="text-muted">
                    Showing page {{ currentPage }} of {{ totalPages }} 
                    ({{ totalResults }} total recipes)
                </small>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import RecipeItem from './RecipeItem.vue';
import { searchRecipes as fetchRecipes, getRecipesByCategory, getRecipesByArea, getRecipesByIngredient } from '@/services/mealApi';
import { sortByRelevance, sortRecipes, generateMockRecipes } from '@/utils/recipeUtils';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
    components: {
        RecipeItem,
    },
    props: {
        selectedFilters: {
            type: Object,
            default: () => ({
                ingredient: '',
                category: '',
                area: ''
            })
        },
        sortOption: {
            type: String,
            default: 'popularity'
        }
    },
    setup(props) {
        const searchQuery = ref('');
        const internalSortOption = ref('');
        const currentPage = ref(1);
        const recipes = ref([]);
        const loading = ref(false);
        const error = ref('');
        const totalResults = ref(0);
        const pageSize = 12; // Number of recipes per page
        const activeFilters = ref({
            ingredient: '',
            category: '',
            area: ''
        });
        const allRecipes = ref([]); // Store all fetched recipes for client-side filtering/sorting
          
        // Computed properties
        const totalPages = computed(() => {
            // Limit total pages to avoid excessive API calls
            const calculatedPages = Math.min(Math.ceil(totalResults.value / pageSize), 20);
            return calculatedPages;
        });
        
        const displayedPages = computed(() => {
            const pages = [];
            // Show a smaller window on mobile, wider on desktop
            const windowSize = window.innerWidth < 768 ? 1 : 2;
            
            let startPage = Math.max(1, currentPage.value - windowSize);
            let endPage = Math.min(totalPages.value, currentPage.value + windowSize);
            
            // Adjust start/end to always show the same number of page links when possible
            if (endPage - startPage < windowSize * 2 && totalPages.value > windowSize * 2 + 1) {
                if (startPage === 1) {
                    endPage = Math.min(totalPages.value, windowSize * 2 + 1);
                } else if (endPage === totalPages.value) {
                    startPage = Math.max(1, totalPages.value - windowSize * 2);
                }
            }
            
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            return pages;
        });
        
        // Computed property for checking if we're on mobile
        const isMobile = computed(() => {
            // Will be updated on window resize
            return window.innerWidth < 992;
        });
        
        // Check if there are any active filters
        const hasActiveFilters = computed(() => {
            return activeFilters.value.ingredient || 
                   activeFilters.value.category || 
                   activeFilters.value.area;
        });
        
        // Helper function to process recipes
        const processRecipes = (recipesList) => {
            if (!Array.isArray(recipesList)) {
                throw new Error('Invalid recipe data format: expected array');
            }
            
            recipes.value = recipesList.map(recipe => ({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image || 'https://via.placeholder.com/556x370?text=No+Image+Available',
                description: recipe.summary ? recipe.summary.substring(0, 100) + '...' : 'Delicious recipe',
                rating: 4.5, // TheMealDB doesn't provide ratings, using default
                category: recipe.category || 'Main Course',
                cookingTime: recipe.readyInMinutes || 30,
                servings: recipe.servings || 4,
                author: 'TheMealDB',
                type: recipe.dishTypes && recipe.dishTypes.length > 0 ? 
                    recipe.dishTypes[0].toUpperCase().replace(' ', '_') : 'MAIN_COURSE'
            }));
        };
        
        // Sync active filters with props
        const updateActiveFilters = () => {
            activeFilters.value = {
                ingredient: props.selectedFilters.ingredient || '',
                category: props.selectedFilters.category || '',
                area: props.selectedFilters.area || ''
            };
        };
        
        // Remove a specific filter
        const removeFilter = (type) => {
            activeFilters.value[type] = '';
            currentPage.value = 1;
            fetchRecipeData();
        };
        
        // Clear all active filters
        const clearAllFilters = () => {
            activeFilters.value = {
                ingredient: '',
                category: '',
                area: ''
            };
            currentPage.value = 1;
            fetchRecipeData();
        };
        
        // Handler for internal sort option changes
        const handleSortChange = () => {
            // When sort option changes, re-fetch with new sorting
            currentPage.value = 1;
            fetchRecipeData();
        };
        
        // Main fetch function that gets recipes from TheMealDB API
        const fetchRecipeData = async () => {
            try {
                loading.value = true;
                error.value = '';
                
                // Sync active filters with props
                updateActiveFilters();
                
                // Used for debug - helps track which filter/search is being used
                if (searchQuery.value) {
                    console.log(`Searching for: "${searchQuery.value}"`);
                } else if (activeFilters.value.ingredient) {
                    console.log(`Filtering by ingredient: "${activeFilters.value.ingredient}"`);
                } else if (activeFilters.value.category) {
                    console.log(`Filtering by category: "${activeFilters.value.category}"`);
                } else if (activeFilters.value.area) {
                    console.log(`Filtering by cuisine: "${activeFilters.value.area}"`);
                } else {
                    console.log("Loading default recipes");
                }
                
                try {
                    let data;
                    
                    // Apply API filters based on active filters
                    if (activeFilters.value.ingredient) {
                        // Filter by main ingredient
                        data = await getRecipesByIngredient(activeFilters.value.ingredient);
                    } else if (activeFilters.value.category) {
                        // Filter by category
                        data = await getRecipesByCategory(activeFilters.value.category);
                    } else if (activeFilters.value.area) {
                        // Filter by area/cuisine
                        data = await getRecipesByArea(activeFilters.value.area);
                    } else {
                        // Regular search or default recipes
                        const options = {
                            page: currentPage.value,
                            pageSize: pageSize,
                            sort: internalSortOption.value || props.sortOption
                        };
                        
                        data = await fetchRecipes(searchQuery.value || '', options);
                    }
                    
                    // Check if we got valid results from TheMealDB API
                    if (data && data.results && Array.isArray(data.results)) {
                        // Store all recipes for client-side operations
                        allRecipes.value = data.results;
                        
                        // If there's a search query, prioritize exact matches
                        if (searchQuery.value) {
                            // Apply relevance sorting - bring most relevant results to the top
                            allRecipes.value = sortByRelevance(allRecipes.value, searchQuery.value);
                            
                            // Force sort option to relevance when searching for better UX
                            // But only if the user hasn't explicitly set another sort
                            if (!internalSortOption.value) {
                                internalSortOption.value = 'relevance';
                            }
                        }
                        
                        // Update total count for pagination
                        totalResults.value = allRecipes.value.length || 0;
                        
                        // Show a message if very few results were found, but don't block display
                        if (allRecipes.value.length < 5 && (searchQuery.value || hasActiveFilters.value)) {
                            error.value = `Found only ${allRecipes.value.length} results. TheMealDB has limited search capabilities.`;
                        } else {
                            error.value = '';
                        }
                        
                        // Apply sorting client-side (using props.sortOption if no internal override)
                        const effectiveSortOption = internalSortOption.value || props.sortOption;
                        allRecipes.value = sortRecipes(allRecipes.value, effectiveSortOption, searchQuery.value);
                        
                        // Handle client-side pagination
                        const start = (currentPage.value - 1) * pageSize;
                        const end = start + pageSize;
                        
                        // Get recipes for the current page
                        const pagedResults = allRecipes.value.slice(start, end);
                        
                        if (pagedResults.length > 0) {
                            // Format recipes for display
                            recipes.value = pagedResults.map(recipe => ({
                                id: recipe.id,
                                title: recipe.title,
                                image: recipe.image || 'https://via.placeholder.com/556x370?text=No+Image+Available',
                                description: recipe.summary ? recipe.summary.substring(0, 100).replace(/<[^>]*>/g, '') + '...' : 'Delicious recipe',
                                rating: recipe.rating || 4.5, // TheMealDB doesn't provide ratings, using default
                                category: recipe.category || 'Main Course',
                                cookingTime: recipe.readyInMinutes || 30,
                                servings: recipe.servings || 4,
                                author: 'TheMealDB',
                                type: recipe.dishTypes && recipe.dishTypes.length > 0 ? 
                                    recipe.dishTypes[0].toUpperCase().replace(' ', '_') : 'MAIN_COURSE'
                            }));
                        } else {
                            recipes.value = [];
                            
                            if (currentPage.value > 1) {
                                // If no results on current page but there are earlier pages,
                                // go back to first page
                                currentPage.value = 1;
                                fetchRecipeData();
                                return;
                            }
                        }
                    } else {
                        throw new Error('No recipes found from TheMealDB API');
                    }
                } catch (apiError) {
                    console.error('API call failed, using mock data', apiError);
                    
                    // Generate a good amount of mock data
                    const mockCount = searchQuery.value || hasActiveFilters.value ? 8 : 24; // More variety if not searching
                    const mockRecipes = generateMockRecipes(mockCount);
                    
                    // Store all mock recipes for client-side operations
                    allRecipes.value = mockRecipes;
                    
                    if (searchQuery.value) {
                        // Filter mock recipes by search term for more realistic results
                        allRecipes.value = mockRecipes.filter(recipe => 
                            recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            recipe.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                            recipe.area.toLowerCase().includes(searchQuery.value.toLowerCase())
                        );
                        
                        // If no results, show all mock recipes
                        if (allRecipes.value.length === 0) {
                            allRecipes.value = mockRecipes;
                        }
                    }
                    
                    // Apply sorting
                    const effectiveSortOption = internalSortOption.value || props.sortOption;
                    allRecipes.value = sortRecipes(allRecipes.value, effectiveSortOption, searchQuery.value);
                    
                    // Apply pagination to mock data
                    const start = (currentPage.value - 1) * pageSize;
                    const end = start + pageSize;
                    recipes.value = allRecipes.value.slice(start, end);
                    
                    totalResults.value = allRecipes.value.length;
                    error.value = 'Unable to fetch from TheMealDB API. Using sample recipes instead.';
                }
            } catch (err) {
                console.error('Error fetching recipes:', err);
                error.value = 'Failed to load recipes. Please try again later.';
                recipes.value = [];
                totalResults.value = 0;
            } finally {
                loading.value = false;
            }
        };
        
        // Methods
        const searchRecipes = () => {
            // Reset page to 1 when searching
            currentPage.value = 1;
            
            // Force sort by relevance when searching for better results
            internalSortOption.value = 'relevance';
            
            // Trim input to avoid whitespace issues
            searchQuery.value = searchQuery.value.trim();
            
            // Clear any active filters when searching
            activeFilters.value = {
                ingredient: '',
                category: '',
                area: ''
            };
            
            fetchRecipeData();
        };
        
        const changePage = (page) => {
            if (page >= 1 && page <= totalPages.value && !loading.value) {
                // Scroll to top of recipe list for better UX
                window.scrollTo({ top: 0, behavior: 'smooth' });
                currentPage.value = page;
                fetchRecipeData();
            }
        };
        
        // Initial data load and watchers
        onMounted(() => {
            AOS.init();
            fetchRecipeData();
        });
        
        watch([() => props.sortOption], () => {
            currentPage.value = 1;
            fetchRecipeData();
        });
        
        // Add watcher for page changes
        watch(currentPage, () => {
            fetchRecipeData();
        });
        
        // Watch for changes in the selected filters
        watch(() => props.selectedFilters, () => {
            currentPage.value = 1;
            fetchRecipeData();
        }, { deep: true });
        
        return {
            searchQuery,
            internalSortOption,
            currentPage,
            recipes,
            loading,
            error,
            totalResults,
            pageSize,
            totalPages,
            displayedPages,
            isMobile,
            activeFilters,
            hasActiveFilters,
            searchRecipes,
            changePage,
            fetchRecipeData,
            removeFilter,
            clearAllFilters,
            handleSortChange
        };
    }
};
</script>

<style scoped>
.page-link {
    color: #28a745;
    transition: all 0.2s ease-in-out;
    font-weight: 500;
}

.page-item.active .page-link {
    background-color: #28a745;
    border-color: #28a745;
    color: white;
    font-weight: bold;
    transform: scale(1.05);
}

.page-link:hover:not(.disabled) {
    background-color: #e9f9f0;
    color: #218838;
}

.page-link:focus {
    box-shadow: 0 0 0 0.25rem rgba(40, 167, 69, 0.25);
}

.pagination {
    margin-top: 30px;
    padding: 10px 0;
}
</style>
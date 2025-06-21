<template>
  <div class="recipe-search mb-5">
    <div class="search-container mb-4">
      <div class="input-group">
        <input 
          type="text" 
          class="form-control form-control-lg" 
          placeholder="Search for recipes..." 
          v-model="searchQuery"
          @keyup.enter="searchRecipes"
        >
        <button class="btn btn-primary" type="button" @click="searchRecipes">
          <i class="ri-search-line me-2"></i>Search
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else-if="recipes.length > 0" class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
      <div v-for="recipe in recipes" :key="recipe.id" class="col">
        <div class="card h-100 shadow-sm">
          <img 
            :src="recipe.image" 
            class="card-img-top" 
            :alt="recipe.title"
            style="height: 200px; object-fit: cover;"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <button 
                @click="viewRecipe(recipe.id)" 
                class="btn btn-sm btn-outline-primary"
              >
                View Recipe
              </button>
              <button 
                @click="saveRecipe(recipe)" 
                class="btn btn-sm"
                :class="isSaved(recipe.id) ? 'btn-danger' : 'btn-outline-danger'"
                title="Save to favorites"
              >
                <i class="ri-heart-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="searchPerformed" class="text-center my-5">
      <p class="lead">No recipes found. Try a different search term.</p>
    </div>

    <div v-else class="text-center my-5">
      <p class="lead">Search for recipes above to get started.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useFirestore } from '@/composables/useFirestore';
import { searchRecipes as searchMealDbRecipes, getRandomRecipes } from '@/services/mealApi';

export default {
  setup() {
    const router = useRouter();
    const { user } = useAuth();
    const { addToCollection, queryByField } = useFirestore();
    
    const searchQuery = ref('');
    const recipes = ref([]);
    const savedRecipes = ref([]);
    const loading = ref(false);
    const error = ref('');
    const searchPerformed = ref(false);
    
    // Load random recipes on mount
    onMounted(async () => {
      try {
        loading.value = true;
        const response = await getRandomRecipes();
        recipes.value = response.recipes;
        loadSavedRecipes();
      } catch (err) {
        error.value = 'Failed to load recommended recipes';
        console.error(err);
      } finally {
        loading.value = false;
      }
    });
    
    const loadSavedRecipes = async () => {
      if (user.value) {
        try {
          const saved = await queryByField('recipes', 'userId', user.value.uid);
          savedRecipes.value = saved;
        } catch (err) {
          console.error('Failed to load saved recipes', err);
        }
      }
    };
    
    const searchRecipes = async () => {
      if (!searchQuery.value.trim()) return;
      
      try {
        loading.value = true;
        error.value = '';
        searchPerformed.value = true;
        
        const response = await searchMealDbRecipes(searchQuery.value);
        recipes.value = response.results;
      } catch (err) {
        error.value = 'Failed to search recipes';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
    
    const viewRecipe = (id) => {
      router.push(`/recipes/${id}`);
    };
    
    const saveRecipe = async (recipe) => {
      if (!user.value) {
        router.push('/login');
        return;
      }
      
      try {
        if (isSaved(recipe.id)) {
          // Remove from favorites
          const savedRecipe = savedRecipes.value.find(r => r.recipeId === recipe.id);
          // Code to remove from Firestore would go here
        } else {
          // Add to favorites
          await addToCollection('recipes', {
            userId: user.value.uid,
            recipeId: recipe.id,
            title: recipe.title,
            image: recipe.image,
            savedAt: new Date()
          });
          
          await loadSavedRecipes();
        }
      } catch (err) {
        console.error('Failed to save recipe', err);
      }
    };
    
    const isSaved = (id) => {
      return savedRecipes.value.some(recipe => recipe.recipeId === id);
    };
    
    return {
      searchQuery,
      recipes,
      loading,
      error,
      searchPerformed,
      searchRecipes,
      viewRecipe,
      saveRecipe,
      isSaved
    };
  }
};
</script>

<style scoped>
.search-container {
  max-width: 700px;
  margin: 0 auto;
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1rem;
  height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

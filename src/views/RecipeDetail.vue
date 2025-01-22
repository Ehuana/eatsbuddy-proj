<template>
  <div class="recipe-detail-page container EG-Default" data-aos="fade-up" style="background-color: white;">
    <div class="bg-white py-5" v-if="recipe">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-10 col-12">
            <div class="text-center" data-aos="fade-up" data-aos-duration="1300">
              <a href="#" class="badge text-bg-success rounded-pill px-3 py-2 text-decoration-none">{{ recipe.type
                }}</a>
              <h1 class="fw-bold pb-2 display-1 text-black">
                {{ recipe.title }}
              </h1>
              <h6 class="d-flex align-items-center justify-content-center gap-2">
                <a class="text-decoration-none text-dark" href="#">{{
                  recipe.author
                }}</a>
                <span>/</span>
                {{ recipe.date }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="back-button-container">
      <button @click="goBack" class="btn btn-secondary mb-3">Go Back</button>
    </div>
    <div v-if="recipe" class="pb-5">
      <div class="container pb-5">
        <div data-aos="zoom-out" data-aos-duration="2000" class="row justify-content-center">
          <div class="col-lg-10 col-md-10 col-12">
            <img :src="recipe.image" class="card-img-top rounded-5" :alt="recipe.title" />
          </div>
          <div class="col-xl-7 col-lg-8 col-md-10 col-12">
            <div class="mt-5">
              <div class="p-0">
                <div class="border-bottom py-3">
                  <h3 class="card-title fw-bold">{{ recipe.title }}</h3>
                  <p class="card-text fst-italic">
                    Recipe by {{ recipe.author }}
                  </p>
                  <h3 class="card-title fw-bold">User Ratings: {{ recipe.rating }}/5</h3>
                </div>
                <p class="text-muted py-2">
                  Course: <span class="text-dark">{{ recipe.course }}</span><span class="mx-2">/</span> Cuisine:
                  <span class="text-dark">{{ recipe.cuisine }}</span><span class="mx-2">/</span> Difficulty:
                  <span class="text-dark">{{ recipe.difficulty }}</span>
                </p>
                <div class="row row-cols-4 g-0 border mb-4 rounded-4">
                  <div class="col border-end">
                    <div class="text-center p-4">
                      <i class="ri-restaurant-fill ri-2x text-secondary-emphasis"></i>
                      <p class="fw-bold mb-0">Servings</p>
                      <small class="text-muted"><span class="text-dark me-1">{{
                        recipe.servings || "N/A"
                          }}</span>
                        servings</small>
                    </div>
                  </div>
                  <div class="col border-end">
                    <div class="text-center p-4">
                      <i class="ri-alarm-fill ri-2x text-secondary-emphasis"></i>
                      <p class="fw-bold mb-0">Prep time</p>
                      <small class="text-muted"><span class="text-dark me-1">{{
                        recipe.prepTime || "N/A"
                          }}</span>
                        minutes</small>
                    </div>
                  </div>
                  <div class="col border-end">
                    <div class="text-center p-4">
                      <i class="ri-cup-fill ri-2x text-secondary-emphasis"></i>
                      <p class="fw-bold mb-0">Cooking time</p>
                      <small class="text-muted"><span class="text-dark me-1">{{
                        recipe.cookingTime || "N/A"
                          }}</span>
                        minutes</small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="text-center p-4">
                      <i class="ri-fire-fill ri-2x text-secondary-emphasis"></i>
                      <p class="fw-bold mb-0">Calories</p>
                      <small class="text-muted"><span class="text-dark me-1">{{
                        recipe.calories || "N/A"
                          }}</span>
                        Kcal</small>
                    </div>
                  </div>
                </div>
                <div class="bg-warning-subtle rounded-4 p-4 mb-4">
                  <h5 class="fw-bold">INGREDIENTS</h5>
                  <div class="form-check border-bottom border-dark border-opacity-10 py-3 text-start"
                    v-for="(ingredient, index) in recipe.ingredients" :key="index">
                    <input class="form-check-input border-secondary-subtle rounded-circle" type="checkbox"
                      :value="ingredient" :id="'flexCheckDefault' + index" />
                    <label class="form-check-label ps-1" :for="'flexCheckDefault' + index">{{ ingredient }}</label>
                  </div>
                </div>
                <div class="border-bottom py-2">
                  <h5 class="fw-bold pb-1">DIRECTIONS</h5>
                  <ol class="px-3 d-grid gap-2">
                    <p>{{ recipe.instructions }}</p>
                  </ol>
                </div>
                <div class="py-4" v-if="recipe.notes">
                  <h5 class="fw-bold pb-2">NOTES</h5>
                  <div class="bg-warning-subtle rounded-4 d-flex align-items-start gap-3 p-4 mb-4"
                    v-for="(note, index) in recipe.notes" :key="index">
                    <i class="ri-information-fill text-danger ri-lg pt-1"></i>
                    <p class="text-muted mb-0">{{ note }}</p>
                  </div>
                </div>
                <div class="pb-5 pt-2" v-if="recipe.chefsTips">
                  <h4>Chef's Tips</h4>
                  <p>{{ recipe.chefsTips }}</p>
                </div>
                <div class="pb-5" v-if="recipe">
                  <h4 class="mb-4 text-center display-6">You Might Also Like</h4>
                  <div class="related-recipes row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    <div class="col" v-for="relatedRecipe in suggestedRecipes" :key="relatedRecipe.id">
                      <div class="card h-100 border-0 shadow-sm">
                        <img :src="relatedRecipe.image" class="card-img-top object-cover" :alt="relatedRecipe.title"
                          style="height: 150px;">
                        <div class="card-body d-flex flex-column text-start">
                          <span class="badge bg-success mb-2 text-uppercase" style="width: fit-content;">
                            {{ relatedRecipe.type.toLowerCase().replace('_', ' ') }}
                          </span>
                          <h5 class="card-title mb-2">{{ relatedRecipe.title }}</h5>
                          <p class="card-text text-muted small mb-3">{{ relatedRecipe.description }}</p>
                          <div class="mt-auto">
                            <div class="d-flex align-items-center mb-3">
                              <i class="ri-time-line me-2"></i>
                              <small class="text-muted">{{ relatedRecipe.cookingTime }} mins</small>
                            </div>
                            <router-link :to="'/recipes/' + relatedRecipe.id" class="btn btn-outline-success w-100">
                              View Recipe
                            </router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <RecipeReviewForm />
                <RecipeReviews :recipeId="recipe.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No recipe data found for the given ID.</p>
    </div>
  </div>
</template>

<script>
import { fetchRecipe } from "@/services/recipeService";
import RecipeReviewForm from '@/components/RecipeReviewForm.vue';
import RecipeReviews from '@/components/RecipeReviews.vue'

export default {
  components: {
    RecipeReviewForm,
    RecipeReviews,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      recipe: null,
      suggestedRecipes: [],
    };
  },

  watch: {
    // Add this watcher
    id: {
      immediate: true,
      handler: async function(newId) {
        // Reset the current recipe
        this.recipe = null;
        
        // Fetch new recipe
        this.recipe = await fetchRecipe(newId);

        // Get suggested recipes
        const allRecipes = await Promise.all(
          Array.from({ length: 20 }, (_, i) => fetchRecipe((i + 1).toString()))
        );

        // Filter out current recipe and get suggestions
        this.suggestedRecipes = allRecipes
          .filter(r => r.id !== newId) // Remove current recipe
          .filter(r =>
            r.type === this.recipe.type || // Same type
            r.course === this.recipe.course // Or same course
          )
          .sort(() => Math.random() - 0.5) // Shuffle
          .slice(0, 4); // Get first 4

        // If we don't have enough suggestions, add random recipes
        if (this.suggestedRecipes.length < 4) {
          const remainingRecipes = allRecipes
            .filter(r => r.id !== newId)
            .filter(r => !this.suggestedRecipes.find(sr => sr.id === r.id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 4 - this.suggestedRecipes.length);

          this.suggestedRecipes = [...this.suggestedRecipes, ...remainingRecipes];
        }
      }
    }
  },

  // Remove the mounted hook since we're using the watcher now
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.recipe-detail-page {
  margin-top: 80px;
}

.back-button-container {
  position: absolute;
  top: 10px;
  left: 20px;
}

.text-start {
  text-align: left;
}

.related-recipes {
  margin-top: 20px;
}

.related-recipe-item {
  margin-right: 15px;
  text-align: center;
  width: 150px;
}

.list-group-item {
  border: none;
  padding-left: 0;
}

.card {
  transition: all 0.3s ease;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}

.badge {
  font-size: 0.75rem;
  padding: 0.5em 1em;
  letter-spacing: 0.5px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text{
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-outline-primary {
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-outline-primary:hover {
  transform: translateY(-1px);
}

.object-cover {
  object-fit: cover;
}
</style>

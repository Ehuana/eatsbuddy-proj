<template>
    <footer class="text-center EG-Default text-lg-start bg-body-tertiary text-muted">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <!-- Left -->
            <div class="me-5 d-none d-lg-block">
                <span>Get connected with us on social networks:</span>
            </div>
            <!-- Left -->

            <!-- Right -->
            <div>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-google"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="" class="me-4 text-reset">
                    <i class="fab fa-github"></i>
                </a>
            </div>
            <!-- Right -->
        </section>
        <!-- Section: Social media -->

        <!-- Section: Links  -->
        <section class="">
            <div class="container text-center text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <!-- Content -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            <i class="fas fa-gem me-3"></i>EatsBuddy
                        </h6>
                        <p>
                            Simplify your meals and grocery shopping effortlessly. Explore recipes, plan meals, and
                            manage grocery lists, all in one place.
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 class="text-uppercase fw-bold mb-4">
                            Trending Recipes
                        </h6>
                        <p v-for="recipe in trendingRecipes" :key="recipe.id">
                            <router-link :to="'/recipes/' + recipe.id" class="text-reset nav-link">
                                {{ recipe.title }}
                                <i v-if="recipe.isNew" class="fa-solid fa-fire" style="color: #ed840c;"></i>
                            </router-link>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">
                            Useful links
                        </h6>
                        <p>
                            <router-link to="/meal-planner" class="nav-link">Meal Planner</router-link>
                        </p>
                        <p>
                            <router-link to="/grocery-list" class="nav-link">Grocery List</router-link>
                        </p>
                        <p>
                            <router-link to="/about" class="nav-link">About Us</router-link>
                        </p>
                        <p>
                            <router-link to="/about" class="nav-link">Terms</router-link>
                        </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                        <p><i class="fas fa-home me-3"></i> Phnom Penh 120201, Cambodia</p>
                        <p>
                            <i class="fas fa-envelope me-3"></i>
                            info@eatsbuddy.com
                        </p>
                        <p><i class="fas fa-phone me-3"></i> +855 080 586 824</p>
                        <p><i class="fas fa-print me-3"></i> +855 088 822 8279</p>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="text-white text-center p-4 greenbgs">
            © 2024 EatsBuddy. All Rights Reserved.
        </div>
        <!-- Copyright -->
    </footer>
</template>

<script>
import { getTrendingRecipes } from '@/services/recipeService';

export default {
  name: "Footer",
  data() {
    return {
      trendingRecipes: []
    };
  },
  created() {
    // Get trending recipes when component is created
    this.trendingRecipes = getTrendingRecipes(4).map(recipe => ({
      ...recipe,
      isNew: this.isNewRecipe(recipe.date) // Add logic to check if recipe is new
    }));
  },
  methods: {
    isNewRecipe(date) {
      // Consider a recipe "new" if it's less than 30 days old
      const recipeDate = new Date(date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return recipeDate > thirtyDaysAgo;
    }
  }
};
</script>

<style>
.greengoods {
    color: #17B97A;
}

.greenbgs {
    background-color: #17B97A;
}

footer ul {
    padding: 0;
    list-style: none;
}

footer ul li {
    margin-bottom: 5px;
}

footer ul li a:hover {
    text-decoration: underline;
}

footer i:hover {
    color: #28a745;
}

/* .footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 114px;
} */
</style>
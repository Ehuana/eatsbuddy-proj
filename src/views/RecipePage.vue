<!-- RecipePage.vue -->
<template>
  <div class="EG-Default" style="margin-top: 80px;">
    <div class="bg-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-10 col-12">
            <div class="text-center" data-aos="fade-down" data-aos-duration="1300">
              <nav>
                <ol class="breadcrumb justify-content-center">
                  <li class="breadcrumb-item"><a href="#" class="text-success">HOME</a></li>
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
      <p>Appropriately integrate technically sound value with scalable infomediaries.</p>
    </div>

    <div class="container mt-4">
      <div class="row">
        <!-- Filters Section -->
        <!-- <Filters /> -->

        <!-- Recipe Cards Section -->
        <main class="col-lg-9 m-auto" data-aos="fade-left">
          <RecipeList />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '@/components/recipes/Filters.vue';
import RecipeList from '@/components/recipes/RecipeList.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  components: {
    Filters,
    RecipeList,
  },
  mounted() {
    AOS.init();
  },
};
</script>

<style>
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

.filters {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
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

.text-primary {
  color: #ff5733 !important;
}
</style>

<template>
  <div class="container-fluid text-center EG-Default bg-white">
    <div class="bg-white py-5">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-10 col-12">
            <div class="text-center" data-aos="fade-down" data-aos-duration="1300">
              <nav>
                <ol class="breadcrumb justify-content-center">
                  <li class="breadcrumb-item"><a href="#" class="text-success">HOME</a></li>
                  <li class="breadcrumb-item link-secondary active" aria-current="page">MEAL PLANNER</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="fw-bold display-4 mb-4" data-aos="fade-down">Plan Your Meals</h1>
    <p class="lead text-muted mb-5" data-aos="fade-up">Organize meals by date and time to streamline your planning!</p>

    <div v-if="!user" class="text-center my-5">
      <div class="card shadow p-5 mx-auto col-lg-6">
        <h3 class="mb-4">Sign in to use Meal Planner</h3>
        <p class="text-muted mb-4">You need to be logged in to save your meal plans.</p>
        <router-link to="/login" class="btn btn-primary">Sign In</router-link>
      </div>
    </div>

    <div v-else class="container">
      <MealPlanner />
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import MealPlanner from '@/components/MealPlanner.vue';
import { useAuth } from '@/composables/useAuth';

export default {
  name: "MealPlannerPage",
  components: {
    MealPlanner
  },
  setup() {
    const { user } = useAuth();
    return { user };
  },
  mounted() {
    AOS.init();
  }
}
</script>

<style scoped>
.EG-Default {
  margin-top: 80px;
}
</style>

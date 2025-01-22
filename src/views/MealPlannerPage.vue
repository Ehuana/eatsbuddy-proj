<template>
  <div class="container-fluid text-center EG-Default py-5" style="margin-top: 80px;">
    <div class="bg-white">
      <div class="container">
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

    <!-- Meal Planner Form -->
    <div class="card shadow-lg p-4 mx-auto col-lg-8 col-md-10 col-sm-12" data-aos="zoom-in">
      <h3 class="mb-3 text-success fw-bold">Add a Meal</h3>
      <form @submit.prevent="addMeal">
        <div class="mb-3">
          <label for="mealName" class="form-label">Meal Name</label>
          <input type="text" id="mealName" v-model="newMeal.name" class="form-control" placeholder="Enter meal name" required />
        </div>
        <div class="mb-3">
          <label for="mealTime" class="form-label">Meal Time</label>
          <select id="mealTime" v-model="newMeal.time" class="form-select" required>
            <option disabled value="">Select a time</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="mealDate" class="form-label">Date</label>
          <input type="date" id="mealDate" v-model="newMeal.date" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success w-100">Add Meal</button>
      </form>
    </div>

    <!-- Planned Meals Section -->
    <div class="mt-5">
      <h3 class="fw-bold mb-4" data-aos="fade-left">Your Meal Plan</h3>
      <div v-if="meals.length > 0">
        <div v-for="(meals, date) in groupedMeals" :key="date" class="mb-5" data-aos="fade-up">
          <h4 class="fw-bold text-primary mb-4">{{ date }}</h4>
          <div class="row justify-content-center">
            <div v-for="(meal, index) in meals" :key="index" class="col-lg-4 col-md-6 mb-4" data-aos="flip-left">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <h5 class="card-title fw-bold">{{ meal.name }}</h5>
                  <p class="card-text text-muted">Time: {{ meal.time }}</p>
                  <button class="btn btn-danger btn-sm" @click="removeMeal(date, index)">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-muted" data-aos="fade-up">No meals planned yet. Unless “winging it” is your new diet plan, you might want to start adding meals here. 🍽️</p>
      </div>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "MealPlanner",
  data() {
    return {
      newMeal: {
        name: "",
        time: "",
        date: "",
      },
      meals: [],
    };
  },
  computed: {
    groupedMeals() {
      return this.meals.reduce((group, meal) => {
        if (!group[meal.date]) group[meal.date] = [];
        group[meal.date].push(meal);
        return group;
      }, {});
    },
  },
  methods: {
    addMeal() {
      if (this.newMeal.name && this.newMeal.time && this.newMeal.date) {
        this.meals.push({ ...this.newMeal });
        this.newMeal = { name: "", time: "", date: "" };
      }
    },
    removeMeal(date, index) {
      this.groupedMeals[date].splice(index, 1);
      this.meals = Object.values(this.groupedMeals).flat();
    },
  },
  mounted() {
    AOS.init({ duration: 1000 });
  },
};
</script>

<style scoped>
/* Style for the meal plan cards */
.card {
  border: none;
  border-radius: 10px;
}

.card-title {
  font-size: 1.25rem;
}

.card-body {
  text-align: center;
}

/* Centering section headers */
h4 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>

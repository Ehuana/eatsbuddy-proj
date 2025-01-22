<!-- Filters.vue -->
<template>
    <aside class="col-lg-3" data-aos="fade-right">
      <div class="accordion" id="filtersAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingDishType">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDishType" aria-expanded="false" aria-controls="collapseDishType">
              Dish Type
            </button>
          </h2>
          <div id="collapseDishType" class="accordion-collapse collapse" aria-labelledby="headingDishType" data-bs-parent="#filtersAccordion">
            <div class="accordion-body">
              <ul class="list-unstyled">
                <li><a href="#">Appetizers & Snacks</a></li>
                <li><a href="#">Bread Recipes</a></li>
                <li><a href="#">Cambodian Amok</a></li>
                <li><a href="#">Beef Lok Lak</a></li>
                <li><a href="#">Khmer Noodles (Num Banh Chok)</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingMealType">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMealType" aria-expanded="false" aria-controls="collapseMealType">
              Meal Type
            </button>
          </h2>
          <div id="collapseMealType" class="accordion-collapse collapse" aria-labelledby="headingMealType" data-bs-parent="#filtersAccordion">
            <div class="accordion-body">
              <ul class="list-unstyled">
                <li><a href="#">Breakfast</a></li>
                <li><a href="#">Lunch</a></li>
                <li><a href="#">Dinner</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Filters',
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles for the Filters component here */
  </style>
  
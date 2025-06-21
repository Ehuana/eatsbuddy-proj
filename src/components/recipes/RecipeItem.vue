<!-- RecipeItem.vue -->
<template>
  <div class="col-lg-4 col-md-6 col-12" data-aos="zoom-in">
    <router-link :to="{ name: 'RecipeDetail', params: { id: recipe.id } }" class="recipe-card-link">
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 recipe-card">
        <div class="position-relative">
          <img :src="recipe.image" class="card-img-top object-cover" :alt="recipe.title" style="height: 180px;">
          <span class="badge bg-success position-absolute recipe-badge text-uppercase">{{ recipe.type.toLowerCase().replace('_', ' ') }}</span>
        </div>
        <div class="card-body text-start px-3 py-3">
          <div class="d-flex align-items-center justify-content-between mb-1">
            <div class="rating">
              <span v-for="star in fullStars" :key="'full-'+star" class="fa fa-star checked"></span>
              <span v-if="hasHalfStar" class="fa fa-star-half-alt checked"></span>
              <span v-for="star in emptyStars" :key="'empty-'+star" class="fa fa-star"></span>
              <span class="ms-1 text-muted small">{{ recipe.rating }}</span>
            </div>
            <div class="d-flex align-items-center recipe-time">
              <i class="ri-time-line me-1"></i>
              <small>{{ recipe.cookingTime }} min</small>
            </div>
          </div>
          
          <h5 class="card-title fw-bold mt-2 recipe-title" :title="recipe.title">{{ recipe.title }}</h5>
          
          <p class="card-text text-muted description-text mb-3" v-html="truncatedDescription"></p>
          
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <small class="text-muted"><i class="ri-user-line me-1"></i>{{ recipe.servings }} servings</small>
            <span class="btn btn-sm btn-success view-btn">View Recipe</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fullStars() {
      return Math.floor(this.recipe.rating);
    },
    hasHalfStar() {
      return this.recipe.rating % 1 >= 0.1 && this.recipe.rating % 1 < 0.7;
    },
    emptyStars() {
      return 5 - Math.ceil(this.recipe.rating);
    },
    truncatedDescription() {
      if (!this.recipe.description) return '';
      // Remove HTML tags
      const plainText = this.recipe.description.replace(/<\/?[^>]+(>|$)/g, "");
      return plainText.length > 80 ? plainText.substring(0, 80) + '...' : plainText;
    }
  },
};
</script>

<style scoped>
/* Remove link decorations for router-link */
.recipe-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.recipe-card-link:hover {
  color: inherit;
}

/* Updated styles */
.recipe-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

.recipe-card:hover .card-img-top {
  transform: scale(1.05);
}

.card-img-top {
  transition: transform 0.3s ease;
}

.object-cover {
  object-fit: cover;
}

.recipe-badge {
  top: 10px;
  right: 10px;
  font-size: 0.7rem;
  padding: 0.35rem 0.65rem;
}

.recipe-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  height: 1.4em;
}

.description-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  min-height: 2.7em;
}

.checked {
  color: #ffc107;
}

.rating {
  font-size: 0.8rem;
}

.recipe-time {
  font-size: 0.8rem;
  color: #6c757d;
}

.view-btn {
  transition: all 0.3s ease;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
}

.view-btn:hover {
  background-color: #28a745;
  transform: scale(1.05);
}

.card-title {
  font-size: 1.1rem;  line-height: 1.3;
  height: 1.4rem; /* Height for single line */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Removed multi-line clamp properties */
}

.description-text {
  font-size: 0.875rem;
  height: 3.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* Styles for the rating stars */
.rating {
  color: #ffd700;
  font-size: 0.8rem;
}

.fa-star, .fa-star-half-alt {
  margin-right: 2px;
}

.checked {
  color: #ffdf00;
}

.badge {
  font-size: 0.70rem;
  font-weight: 500;
  padding: 0.35em 0.65em;
}

.btn-outline-success:hover {
  color: #fff;
}

.ri-time-line {
  color: #6c757d;
}
</style>

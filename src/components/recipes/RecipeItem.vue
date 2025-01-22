<!-- RecipeItem.vue -->
<template>
  <div class="col-lg-4 col-md-6 col-12" data-aos="zoom-in">
    <router-link :to="{ name: 'RecipeDetail', params: { id: recipe.id } }" class="no-link-decoration">
      <div class="card border-0 shadow-sm rounded-5 overflow-hidden h-100 recipe-card">
        <img :src="recipe.image" class="card-img-top" :alt="recipe.title">
        <div class="card-body text-center px-4 pt-4">
          <a href="#" class="badge text-bg-success rounded-pill px-3 py-2 text-decoration-none">{{ recipe.category }}</a>
          <h5 class="card-title truncate-text fw-bold pt-3">{{ recipe.title }}</h5>
          <p class="card-text text-muted truncate-text">{{ recipe.description }}</p>
          <div class="rating">
            <span v-for="star in fullStars" :key="star" class="fa fa-star checked"></span>
            <span v-if="hasHalfStar" class="fa fa-star-half-alt checked"></span>
            <span v-for="star in emptyStars" :key="star" class="fa fa-star"></span>
          </div>
        </div>
        <div class="card-footer bg-transparent border-0 px-4 pb-4">
          <small class="d-flex align-items-center gap-2">
            <a href="#"><img :src="recipe.authorImage" alt="post-profile" class="img-fluid rounded-circle post-profile"></a>
            <a class="text-decoration-none text-dark" href="#">{{ recipe.author }}</a>
            <span>/</span> {{ recipe.date }}
          </small>
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
  },
};
</script>

<style scoped>
/* Remove link decorations for router-link */
.no-link-decoration {
  text-decoration: none;
  color: inherit;
}

.no-link-decoration:hover {
  color: #ff5733;
}

/* Updated styles */
.recipe-card {
  transition: transform 0.3s ease-in-out;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-profile {
  width: 30px;
  height: 30px;
}

/* Styles for the rating stars */
.rating {
  color: #ffd700;
}

.fa-star, .fa-star-half-alt {
  font-size: 20px;
  margin-right: 5px;
}

.checked {
  color: #ffdf00;
}
</style>

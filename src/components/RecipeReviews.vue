<template>
    <div class="recipe-reviews my-5" data-aos="fade-up">
      <h3 class="fw-bold mb-4">Customer Reviews ({{ totalReviews }})</h3>
      
      <!-- Reviews List -->
      <div v-if="reviews.length > 0">
        <div class="review-card mb-4 p-4 bg-white rounded-4 shadow-sm" v-for="review in reviews" :key="review.id">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 class="mb-1">{{ review.name }}</h5>
              <div class="text-muted small">
                {{ formatDate(review.date) }}
              </div>
            </div>
            <div class="rating bg-success text-white px-3 py-1 rounded-pill">
              {{ review.rating }}/5
            </div>
          </div>
          <p class="mb-0">{{ review.comment }}</p>
        </div>
  
        <!-- Pagination -->
        <nav v-if="totalPages > 1" aria-label="Review pagination">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
                Previous
              </button>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
  
      <!-- No Reviews Message -->
      <div v-else class="text-center py-5">
        <i class="ri-chat-3-line ri-3x mb-3 text-muted"></i>
        <p class="text-muted">No reviews yet. Be the first to review this recipe!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipeReviews',
    props: {
      recipeId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        reviews: [
          // Mock data - replace with actual API calls later
          {
            id: 1,
            name: "John Doe",
            rating: 5,
            comment: "This recipe was amazing! My whole family loved it. The instructions were clear and easy to follow. Will definitely make it again!",
            date: "2024-01-15"
          },
          {
            id: 2,
            name: "Jane Smith",
            rating: 4,
            comment: "Great recipe! I made a few modifications to suit my taste but the base recipe is solid. Would recommend.",
            date: "2024-01-14"
          },
          {
            id: 3,
            name: "Mike Johnson",
            rating: 5,
            comment: "Perfect recipe! Turned out exactly as shown in the pictures. The timing was spot on.",
            date: "2024-01-13"
          }
        ],
        currentPage: 1,
        reviewsPerPage: 5
      }
    },
    computed: {
      totalReviews() {
        return this.reviews.length;
      },
      totalPages() {
        return Math.ceil(this.reviews.length / this.reviewsPerPage);
      }
    },
    methods: {
      formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      },
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      async fetchReviews() {
        // In a real application, you would fetch reviews from your API here
        // Example:
        // try {
        //   const response = await axios.get(`/api/recipes/${this.recipeId}/reviews`);
        //   this.reviews = response.data;
        // } catch (error) {
        //   console.error('Error fetching reviews:', error);
        // }
      }
    },
    created() {
      this.fetchReviews();
    }
  }
  </script>
  
  <style scoped>
  .review-card {
    transition: transform 0.2s ease;
  }
  
  .review-card:hover {
    transform: translateY(-2px);
  }
  
  .page-link {
    color: #198754;
    cursor: pointer;
  }
  
  .page-link:hover {
    color: #146c43;
  }
  
  .page-item.active .page-link {
    background-color: #198754;
    border-color: #198754;
    color: white;
  }
  </style>
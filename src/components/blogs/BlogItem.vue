<!-- <template>
  <div class="col-lg-4 col-md-6 col-12" data-aos="zoom-in">
    <router-link :to="{ name: 'BlogDetail', params: { id: blog.id } }" class="no-link-decoration">
      <div class="card border-0 shadow-sm rounded-5 overflow-hidden h-100 blog-card">
        <img :src="blog.image" class="card-img-top" :alt="blog.title">
        <div class="card-body text-center px-4 pt-4">
          <div class="mb-3 text-muted small">
            <i class="fas fa-calendar-alt me-2"></i>{{ blog.date }} {{ blog.month }} <span class="mx-2">|</span>
            <i class="fas fa-user me-2"></i>{{ blog.author }} <span class="mx-2">|</span>
            <i class="fas fa-comments me-2"></i>{{ blog.comments }} Comments
          </div>
          <h5 class="card-title truncate-text fw-bold pt-3">{{ blog.title }}</h5>
          <p class="card-text text-muted truncate-text">{{ blog.excerpt }}</p>
          <a class="btn btn-primary mt-auto">Read more</a>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "BlogItem",
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #6c757d;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-primary {
  align-self: flex-start;
}
</style> -->

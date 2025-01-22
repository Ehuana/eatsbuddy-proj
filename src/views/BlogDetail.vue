<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-12">
            <article class="card border-0 shadow-lg rounded-lg overflow-hidden mb-5">
              <img :src="blog.image" class="card-img-top" :alt="blog.title">
              <div class="card-body p-4">
                <ul class="list-unstyled mb-3">
                  <li class="d-inline-block me-3">
                    <span class="text-muted"><i class="fas fa-calendar-alt me-2 text-primary"></i>{{ blog.date }} {{ blog.month }}</span>
                  </li>
                  <li class="d-inline-block me-3">
                    <span class="text-muted"><i class="fas fa-user me-2 text-primary"></i>{{ blog.author }}</span>
                  </li>
                  <li class="d-inline-block">
                    <span class="text-muted"><i class="fas fa-comments me-2 text-primary"></i>{{ blog.comments }} Comments</span>
                  </li>
                </ul>
                <h2 class="card-title display-4">{{ blog.title }}</h2>
                <p class="card-text mb-4">{{ blog.content }}</p>
                <blockquote class="bg-light p-4 rounded mb-4">
                  <i class="fas fa-quote-left display-3 text-primary opacity-7"></i>
                  <p class="lead mt-2">Your restaurant is truly upstanding and is behind its product 100%. It's all good. I wish I would have thought of it first.</p>
                  <footer class="blockquote-footer">Yoeri Geense</footer>
                </blockquote>
                <h3>Our Personal Approach</h3>
                <p class="mb-4">#</p>
                <div class="row">
                  <div class="col-sm-6">
                    <img src="#" alt="..." class="img-fluid rounded mb-4">
                  </div>
                  <div class="col-sm-6">
                    <img src="#" alt="..." class="img-fluid rounded mb-4">
                  </div>
                </div>
                <p>#</p>
                <div class="row border-top pt-4 mt-4">
                  <div class="col-sm-8">
                    <h5 class="mb-3">Related Tags:</h5>
                    <div class="d-flex">
                      <a href="#" class="badge bg-secondary text-white me-2">Food</a>
                      <a href="#" class="badge bg-secondary text-white">Drink</a>
                    </div>
                  </div>
                  <div class="col-sm-4 text-end">
                    <h5 class="mb-3">Share:</h5>
                    <ul class="list-unstyled d-flex m-0">
                      <li class="me-3"><a href="#"><i class="fab fa-facebook-f text-primary"></i></a></li>
                      <li class="me-3"><a href="#"><i class="fab fa-twitter text-primary"></i></a></li>
                      <li class="me-3"><a href="#"><i class="fab fa-dribbble text-primary"></i></a></li>
                      <li class="me-3"><a href="#"><i class="fab fa-youtube text-primary"></i></a></li>
                      <li><a href="#"><i class="fab fa-linkedin-in text-primary"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Comments Section -->
          <div class="col-12">
            <div class="comments">
              <h3 class="h4 mb-4">Comments</h3>
              <div v-for="(comment, index) in blog.commentsData" :key="index" class="d-flex border-bottom pb-4 mb-4">
                <div class="flex-shrink-0">
                  <img src="https://placehold.co/50x50" alt="Avatar" class="rounded-circle">
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="mb-2">{{ comment.author }}</h6>
                  <p>{{ comment.content }}</p>
                  <a href="#" class="text-primary">Reply</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Leave a Reply Form -->
          <div class="col-12">
            <h3 class="h4 mb-4">Leave a Reply</h3>
            <form>
              <div class="mb-3">
                <textarea name="reply" rows="6" class="form-control" placeholder="Your Reply"></textarea>
              </div>
              <div class="row">
                <div class="col-sm-6 mb-3">
                  <input type="text" class="form-control" name="name" placeholder="Your Name">
                </div>
                <div class="col-sm-6 mb-3">
                  <input type="email" class="form-control" name="email" placeholder="Email Address">
                </div>
              </div>
              <button class="btn btn-primary" type="submit">Leave a Reply</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Sidebar (if needed) -->
      <div class="col-lg-4">
        <!-- Add any sidebar content here -->
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogById } from '@/services/blogService';

export default {
  name: 'BlogDetail',
  data() {
    return {
      blog: null,
    };
  },
  created() {
    const blogId = this.$route.params.id;
    this.blog = getBlogById(parseInt(blogId));
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.card {
  margin-bottom: 1.5rem;
}

.card-title {
  color: #343a40;
}

.comments .card {
  border: 1px solid #e0e0e0;
}

.comments h3 {
  margin-bottom: 1rem;
  color: #343a40;
}

.comments .card-body {
  background: #f8f9fa;
  border-radius: 5px;
}

blockquote {
  border-left: 5px solid #17a2b8;
  padding-left: 1rem;
}

ul.list-unstyled {
  padding-left: 0;
}

ul.list-unstyled li {
  display: inline-block;
  margin-right: 10px;
}

ul.list-unstyled li a {
  color: #17a2b8;
}

ul.list-unstyled li a:hover {
  color: #0d6efd;
}

.page-navigation .prev-page,
.page-navigation .next-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-navigation .prev-page .page-info,
.page-navigation .next-page .page-info {
  display: flex;
  align-items: center;
}

.page-navigation .prev-page .page-info a,
.page-navigation .next-page .page-info a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.page-navigation .prev-page .page-info .image-prev,
.page-navigation .next-page .page-info .image-next {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.page-navigation .prev-page .page-info .prev-title,
.page-navigation .next-page .page-info .next-title {
  font-size: 18px;
  color: #343a40;
}

.page-navigation .prev-page .page-info .prev-title:hover,
.page-navigation .next-page .page-info .next-title:hover {
  color: #0d6efd;
}

.page-navigation .prev-page .page-info .date-details,
.page-navigation .next-page .page-info .date-details {
  font-size: 14px;
  color: #6c757d;
}

.page-navigation .prev-page .page-info .date-details span.create-date,
.page-navigation .next-page .page-info .date-details span.create-date {
  font-weight: 500;
}
</style>

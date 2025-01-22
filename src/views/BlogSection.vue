<template>
    <div class="EG-Default py-5" style="margin-top: 80px;">
      <!-- Breadcrumb Navigation -->
      <div class="bg-white py-4 mb-5">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-7 col-lg-8 col-md-10 col-12">
              <div class="text-center" data-aos="fade-down" data-aos-duration="1300">
                <nav>
                  <ol class="breadcrumb justify-content-center">
                    <li class="breadcrumb-item"><a href="#" class="text-success">HOME</a></li>
                    <li class="breadcrumb-item link-secondary active" aria-current="page">BLOG</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 class="fw-bold display-4 mb-4" data-aos="fade-down">Our Blog</h1>
      <p class="lead text-muted mb-5" data-aos="fade-up">Discover helpful tips, delicious recipes, and more to enhance your meal planning and grocery shopping experience!</p>
  
      <!-- Blog Section -->
      <BlogList :blogs="blogs" />
    </div>
  </template>
  
  <script>
  import BlogList from '@/components/blogs/BlogList.vue';
  import { getBlogs } from '@/services/blogService';
  
  export default {
    name: "BlogSection",
    components: {
      BlogList,
    },
    data() {
      return {
        blogs: getBlogs(),
      };
    },
  };
  </script>
  
  <style scoped>
  .breadcrumb {
    background: transparent;
    padding: 0;
    margin-bottom: 0;
  }
  
  .breadcrumb-item.active {
    color: #6c757d;
  }
  
  .breadcrumb a {
    color: #17a2b8;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
  }
  
  .bg-white {
    background-color: #ffffff !important;
  }
  </style>
  
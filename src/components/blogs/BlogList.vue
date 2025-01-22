<!-- <template>
    <div class="container">
      <div class="row g-4">
        <BlogItem v-for="(blog, index) in blogs" :key="index" :blog="blog" />
      </div>
    </div>
  </template>
  
  <script>
  import BlogItem from './BlogItem.vue';
  
  export default {
    name: "BlogList",
    components: {
      BlogItem,
    },
    props: {
      blogs: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .row {
    margin-left: 0;
    margin-right: 0;
  }
  
  .col-lg-4, .col-md-6, .col-12 {
    padding-left: 15px;
    padding-right: 15px;
  }
  </style>
   -->
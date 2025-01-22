<template>
  <div class="container-fluid text-center py-5 EG-Default" style="margin-top: 80px;">
    <div class="bg-white">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-8 col-md-10 col-12">
            <div class="text-center" data-aos="fade-down" data-aos-duration="1300">
              <nav>
                <ol class="breadcrumb justify-content-center">
                  <li class="breadcrumb-item"><a href="#" class="text-success">HOME</a></li>
                  <li class="breadcrumb-item link-secondary active" aria-current="page">GROCERY LISTS</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 class="fw-bold display-4 mb-4" data-aos="fade-down">Manage Your Grocery Lists</h1>
    <p class="lead text-muted mb-5" data-aos="fade-up">Create and manage your grocery lists with ease!</p>

    <!-- Add New Grocery List Form -->
    <div class="card shadow-lg p-4 mx-auto col-lg-8 col-md-10 col-sm-12" data-aos="zoom-in">
      <h3 class="mb-3 text-success fw-bold">Add a Grocery List</h3>
      <form @submit.prevent="addNewList">
        <div class="mb-3">
          <label for="listName" class="form-label">List Name</label>
          <input type="text" v-model="newListName" class="form-control" id="listName" placeholder="Enter list name">
        </div>
        <div class="mb-3">
          <label for="listDate" class="form-label">Date</label>
          <input type="datetime-local" v-model="newListDate" class="form-control" id="listDate">
        </div>
        <button type="submit" class="btn btn-success w-100">Add List</button>
      </form>
    </div>

    <!-- Grocery Lists Section -->
    <div class="mt-5">
      <h3 class="fw-bold mb-4" data-aos="fade-left">Your Grocery Lists</h3>
      <div v-if="groceryLists.length > 0">
        <div class="row">
          <GroceryList v-for="(list, index) in groceryLists" :key="index" :list="list" class="col-lg-6 col-md-8 col-sm-12 mb-4" @remove-list="removeList(index)"/>
        </div>
      </div>
      <div v-else>
        <p class="text-muted" data-aos="fade-up">No grocery lists yet. Time to get cracking, or you might end up having cereal for dinner...again. 🥣</p>
      </div>
    </div>
  </div>
</template>

<script>
import GroceryList from '@/components/GroceryList.vue';

export default {
  components: {
    GroceryList,
  },
  data() {
    return {
      newListName: '',
      newListDate: '',
      groceryLists: [],
    };
  },
  methods: {
    addNewList() {
      if (this.newListName && this.newListDate) {
        this.groceryLists.push({
          name: this.newListName,
          date: this.newListDate,
          items: [],
        });
        this.newListName = '';
        this.newListDate = '';
      }
    },
    removeList(index) {
      this.groceryLists.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.grocery-list-container {
  margin-bottom: 2rem;
}

template{
  padding-bottom: 150px;
}
</style>

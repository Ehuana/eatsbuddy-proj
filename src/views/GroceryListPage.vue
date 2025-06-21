<template>
  <div class="container-fluid text-center EG-Default bg-white">
    <div class="bg-white py-5">
      <div class="container py-5">
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

    <div v-if="!user" class="text-center my-5">
      <div class="card shadow p-5 mx-auto col-lg-6">
        <h3 class="mb-4">Sign in to use Grocery Lists</h3>
        <p class="text-muted mb-4">You need to be logged in to save your grocery lists.</p>
        <router-link to="/login" class="btn btn-primary">Sign In</router-link>
      </div>
    </div>

    <div v-else>
      <!-- Add New Grocery List Form -->
      <div class="card shadow-lg p-4 mx-auto col-lg-8 col-md-10 col-sm-12 mb-5" data-aos="zoom-in">
        <h3 class="mb-3 text-success fw-bold">Add a Grocery List</h3>
        <form @submit.prevent="addNewList">
          <div class="mb-3">
            <label for="listName" class="form-label">List Name</label>
            <input 
              type="text" 
              v-model="newListName" 
              class="form-control" 
              id="listName" 
              placeholder="Enter list name"
              required
            >
          </div>
          <div class="mb-3">
            <label for="listDate" class="form-label">Date</label>
            <input 
              type="date" 
              v-model="newListDate" 
              class="form-control" 
              id="listDate"
              required
            >
          </div>
          <button type="submit" class="btn btn-success w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            Add List
          </button>
        </form>
      </div>

      <!-- Grocery Lists Section -->
      <div class="mt-5" v-if="!loading">
        <h3 class="fw-bold mb-4" data-aos="fade-left">Your Grocery Lists</h3>
        
        <div v-if="loadingLists" class="text-center my-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        
        <div v-else-if="groceryLists.length > 0" class="row justify-content-center">
          <div class="col-lg-8 col-md-10 col-sm-12">
            <GroceryList 
              v-for="list in groceryLists" 
              :key="list.id" 
              :list="list" 
              class="mb-4" 
              @remove-list="removeList(list.id)"
            />
          </div>
        </div>
        
        <div v-else>
          <p class="text-muted" data-aos="fade-up">
            No grocery lists yet. Time to get cracking, or you might end up having cereal for dinner...again. 🥣
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroceryList from '@/components/GroceryList.vue';
import { useAuth } from '@/composables/useAuth';
import { useFirestore } from '@/composables/useFirestore';
import { ref, onMounted } from 'vue';
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: {
    GroceryList,
  },
  setup() {
    const { user } = useAuth();
    const { addToCollection, queryByField, deleteDocument } = useFirestore();
    
    const newListName = ref('');
    const newListDate = ref('');
    const groceryLists = ref([]);
    const loading = ref(false);
    const loadingLists = ref(false);
    
    onMounted(() => {
      AOS.init();
      if (user.value) {
        loadGroceryLists();
      }
    });
    
    const loadGroceryLists = async () => {
      try {
        loadingLists.value = true;
        const lists = await queryByField('grocery_lists', 'userId', user.value.uid);
        groceryLists.value = lists.sort((a, b) => 
          new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate())
        );
      } catch (err) {
        console.error('Failed to load grocery lists', err);
      } finally {
        loadingLists.value = false;
      }
    };
    
    const addNewList = async () => {
      if (!newListName.value || !newListDate.value || !user.value) return;
      
      try {
        loading.value = true;
        
        const newList = {
          name: newListName.value,
          date: newListDate.value,
          items: [],
          userId: user.value.uid,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await addToCollection('grocery_lists', newList);
        newListName.value = '';
        newListDate.value = '';
        
        await loadGroceryLists();
      } catch (err) {
        console.error('Failed to create grocery list', err);
      } finally {
        loading.value = false;
      }
    };
    
    const removeList = async (id) => {
      if (confirm('Are you sure you want to delete this grocery list?')) {
        try {
          await deleteDocument('grocery_lists', id);
          await loadGroceryLists();
        } catch (err) {
          console.error('Failed to delete grocery list', err);
        }
      }
    };
    
    return {
      user,
      newListName,
      newListDate,
      groceryLists,
      loading,
      loadingLists,
      addNewList,
      removeList
    };
  }
};
</script>

<style scoped>
.EG-Default {
  margin-top: 80px;
}

.grocery-list-container {
  margin-bottom: 2rem;
}
</style>

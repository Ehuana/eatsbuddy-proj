<template>
  <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="mealPlanModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="mealPlanModalLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div v-if="showDate" class="mb-3">
              <label for="meal-date" class="form-label">Date</label>
              <input type="date" class="form-control" id="meal-date" v-model="selectedDate" :min="todayFormatted">
            </div>
            <div v-if="showMealType" class="mb-3">
              <label for="meal-type" class="form-label">Meal Type</label>
              <select class="form-select" id="meal-type" v-model="selectedMealType">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div v-if="showServings" class="mb-3">
              <label for="servings" class="form-label">Servings</label>
              <input type="number" class="form-control" id="servings" v-model="servings" min="1" max="20">
            </div>
            <div v-if="showListSelection && groceryLists.length > 0" class="mb-3">
              <label for="grocery-list" class="form-label">Add to existing list</label>
              <select class="form-select" id="grocery-list" v-model="selectedListId">
                <option value="">Create new list</option>
                <option v-for="list in groceryLists" :key="list.id" :value="list.id">{{ list.name }}</option>
              </select>
            </div>
            <div v-if="type === 'grocery' && !selectedListId" class="mb-3">
              <label for="list-name" class="form-label">List Name</label>
              <input type="text" class="form-control" id="list-name" v-model="listName" placeholder="Enter list name">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-success" @click="confirm" :disabled="isConfirmDisabled">{{ confirmButtonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { getUserGroceryLists } from '@/services/groceryListService';
import { useAuth } from '@/composables/useAuth';

export default {
  name: 'PlannerModal',
  props: {
    modalId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'meal', // 'meal' or 'grocery'
      validator: (value) => ['meal', 'grocery'].includes(value)
    },
    recipeName: {
      type: String,
      default: ''
    }
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    const { user } = useAuth();
    const selectedDate = ref(new Date().toISOString().split('T')[0]);
    const selectedMealType = ref('dinner');
    const servings = ref(2);
    const groceryLists = ref([]);
    const selectedListId = ref('');
    const listName = ref('');
    
    const todayFormatted = computed(() => {
      return new Date().toISOString().split('T')[0];
    });
    
    const title = computed(() => {
      if (props.type === 'meal') {
        return 'Add to Meal Plan';
      } else {
        return 'Add to Grocery List';
      }
    });
    
    const confirmButtonText = computed(() => {
      if (props.type === 'meal') {
        return 'Add to Meal Plan';
      } else {
        return 'Add to Grocery List';
      }
    });
    
    const showDate = computed(() => props.type === 'meal');
    const showMealType = computed(() => props.type === 'meal');
    const showServings = computed(() => props.type === 'meal');
    const showListSelection = computed(() => props.type === 'grocery');
    
    const isConfirmDisabled = computed(() => {
      if (props.type === 'grocery' && !selectedListId.value && !listName.value) {
        return true;
      }
      return false;
    });
    
    const fetchGroceryLists = async () => {
      if (user.value && props.type === 'grocery') {
        try {
          groceryLists.value = await getUserGroceryLists(user.value.uid);
        } catch (error) {
          console.error('Error fetching grocery lists:', error);
          groceryLists.value = [];
        }
      }
    };
    
    const confirm = () => {
      if (props.type === 'meal') {
        emit('confirm', {
          date: selectedDate.value,
          mealType: selectedMealType.value,
          servings: servings.value
        });
      } else {
        emit('confirm', {
          listId: selectedListId.value,
          listName: listName.value || `Ingredients for ${props.recipeName}`
        });
      }
    };
    
    // Set default list name when recipe name changes
    if (props.recipeName) {
      listName.value = `Ingredients for ${props.recipeName}`;
    }
    
    onMounted(() => {
      fetchGroceryLists();
    });
    
    return {
      selectedDate,
      selectedMealType,
      servings,
      groceryLists,
      selectedListId,
      listName,
      todayFormatted,
      title,
      confirmButtonText,
      showDate,
      showMealType,
      showServings,
      showListSelection,
      isConfirmDisabled,
      confirm
    };
  }
};
</script>

<style scoped>
.modal-body {
  padding: 1.5rem;
}

.form-label {
  font-weight: 600;
  color: #333;
}

.form-control, .form-select {
  padding: 0.75rem;
  border-radius: 8px;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eaeaea;
}

.btn-success {
  background-color: #17B97A;
  border-color: #17B97A;
}

.btn-success:hover {
  background-color: #149c67;
  border-color: #149c67;
}

.btn-secondary {
  background-color: #f5f5f5;
  border-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
  border-color: #d0d0d0;
  color: #333;
}
</style>

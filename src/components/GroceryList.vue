<template>
    <div class="grocery-list-container mb-4" data-aos="fade-up">
      <div class="card shadow-lg">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <h3 class="mb-0">{{ list.name }} - {{ list.date }}</h3>
            <button @click="toggleRename" class="btn btn-secondary btn-sm ms-3">Rename</button>
            <button @click="removeList" class="btn btn-danger btn-sm ms-2">Delete</button>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="selectAll" @change="toggleAllItems">
            <label class="form-check-label">Mark all as shopped</label>
          </div>
        </div>
        <div v-if="isRenaming" class="card-body">
          <input v-model="newListName" class="form-control" placeholder="Rename list" />
          <button @click="renameList" class="btn btn-primary mt-2">Rename</button>
        </div>
        <div class="card-body">
          <div class="input-group mb-3">
            <input type="text" v-model="newItem" class="form-control" placeholder="Add new item" @keyup.enter="addItem">
            <input type="number" v-model="newQuantity" class="form-control" placeholder="Quantity" min="1" @keyup.enter="addItem">
            <select v-model="newUnit" class="form-select">
              <option disabled value="">Select Unit</option>
              <option>kg</option>
              <option>lb</option>
              <option>pcs</option>
            </select>
            <button @click="addItem" class="btn btn-success">Add Item</button>
          </div>
          <ul class="list-group">
            <li v-for="(item, index) in list.items" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input class="form-check-input me-2" type="checkbox" v-model="item.checked" @change="updateItemStatus(item)">
                <span :class="{ 'text-danger': item.checked, 'text-decoration-line-through': item.checked }">
                  {{ item.name }} - {{ item.quantity }} {{ item.unit }}
                </span>
              </div>
              <button @click="removeItem(index)" class="btn btn-danger btn-sm">Remove</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      list: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        newItem: '',
        newQuantity: 1,
        newUnit: '',
        selectAll: false,
        isRenaming: false,
        newListName: '',
      };
    },
    methods: {
      addItem() {
        if (this.newItem && this.newQuantity > 0 && this.newUnit) {
          this.list.items.push({ name: this.newItem, quantity: this.newQuantity, unit: this.newUnit, checked: false });
          this.newItem = '';
          this.newQuantity = 1;
          this.newUnit = '';
        }
      },
      removeItem(index) {
        this.list.items.splice(index, 1);
      },
      updateItemStatus(item) {
        if (!item.checked) {
          this.selectAll = false;
        }
      },
      toggleAllItems() {
        this.list.items.forEach(item => (item.checked = this.selectAll));
      },
      toggleRename() {
        this.isRenaming = !this.isRenaming;
      },
      renameList() {
        if (this.newListName) {
          this.list.name = this.newListName;
          this.newListName = '';
          this.isRenaming = false;
        }
      },
      removeList() {
        this.$emit('remove-list');
      },
    },
  };
  </script>
  
  <style scoped>
  .text-decoration-line-through {
    text-decoration: line-through;
  }
  </style>
  
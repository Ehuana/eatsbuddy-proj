<template>
    <div class="bg-light p-5 rounded-5" data-aos="fade-up">
      <div v-if="showAlert" class="alert alert-success mb-4" role="alert">
        Thank you for your review! Your feedback has been submitted successfully.
      </div>
      
      <h5 class="fw-bold">Leave a Review</h5>
      <p class="small mb-4">Required fields are marked *</p>
  
      <form @submit.prevent="handleSubmit">
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <input 
              type="text" 
              class="form-control" 
              :class="{ 'is-invalid': errors.name }"
              v-model="formData.name"
              placeholder="Name *" 
            />
            <div class="invalid-feedback" v-if="errors.name">
              {{ errors.name }}
            </div>
          </div>
          <div class="col-md-6">
            <input 
              type="email" 
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              v-model="formData.email"
              placeholder="Email *" 
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email }}
            </div>
          </div>
        </div>
  
        <div class="mb-4">
          <label class="fw-bold d-block mb-2">Your Rating *</label>
          <select 
            class="form-select w-auto m-auto"
            :class="{ 'is-invalid': errors.rating }"
            v-model="formData.rating"
          >
            <option value="0">Select a rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
          <div class="invalid-feedback" v-if="errors.rating">
            {{ errors.rating }}
          </div>
        </div>
  
        <div class="mb-4">
          <textarea 
            class="form-control"
            :class="{ 'is-invalid': errors.review }"
            v-model="formData.review"
            rows="6"
            placeholder="Your Review *"
          ></textarea>
          <div class="invalid-feedback" v-if="errors.review">
            {{ errors.review }}
          </div>
        </div>
  
        <div class="form-check mb-4 text-start">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="saveInfo"
            v-model="formData.saveInfo"
          />
          <label class="form-check-label small" for="saveInfo">
            Save my name and email in this browser for the next time I comment.
          </label>
        </div>
  
        <button type="submit" class="btn btn-success">Post Review</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RecipeReviewForm',
    data() {
      return {
        formData: {
          name: '',
          email: '',
          review: '',
          rating: 0,
          saveInfo: false
        },
        showAlert: false,
        errors: {}
      }
    },
    methods: {
      validateForm() {
        const errors = {};
        
        if (!this.formData.name.trim()) {
          errors.name = 'Name is required';
        }
        
        if (!this.formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(this.formData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        
        if (!this.formData.review.trim()) {
          errors.review = 'Review is required';
        }
        
        if (this.formData.rating === 0) {
          errors.rating = 'Please select a rating';
        }
        
        this.errors = errors;
        return Object.keys(errors).length === 0;
      },
      
      handleSubmit() {
        if (this.validateForm()) {
          // Note: For use with backend later, for now just mockup!!!
          this.showAlert = true;
          
          // Reset form
          this.formData = {
            name: '',
            email: '',
            review: '',
            rating: 0,
            saveInfo: this.formData.saveInfo // Preserve the saveInfo preference
          };
          
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-control, .form-select {
    background-color: transparent;
  }
  
  .form-select {
    min-width: 150px;
  }
  </style>
// Composable for showing toast notifications
import { ref } from 'vue';

// Toast object structure to keep track of all active toasts
const toasts = ref([]);
let nextId = 0;

export function useToast() {
  // Show a new toast
  const showToast = (message, type = 'success', duration = 3000) => {
    const id = nextId++;
    const toast = { id, message, type, show: true };
    
    // Add to toasts array
    toasts.value.push(toast);
    
    // Auto-hide after duration
    setTimeout(() => {
      hideToast(id);
    }, duration);
    
    return id;
  };
  
  // Hide a specific toast
  const hideToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index !== -1) {
      // Mark as hidden first (for animation)
      toasts.value[index].show = false;
      
      // Remove after animation
      setTimeout(() => {
        toasts.value = toasts.value.filter(toast => toast.id !== id);
      }, 300);
    }
  };
  
  return {
    toasts,
    showToast,
    hideToast
  };
}

// Create a Vue component for displaying toasts
export const ToastContainer = {
  name: 'ToastContainer',
  setup() {
    const { toasts, hideToast } = useToast();
    
    return {
      toasts,
      hideToast
    };
  },
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div v-for="toast in toasts" :key="toast.id" 
        class="toast show"
        :class="[toast.show ? 'fade-in' : 'fade-out', 
          toast.type === 'success' ? 'bg-success text-white' : 
          toast.type === 'error' ? 'bg-danger text-white' : 
          toast.type === 'warning' ? 'bg-warning' : 'bg-light']"
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true">
        <div class="toast-header" :class="toast.type === 'success' ? 'bg-success text-white' : 
          toast.type === 'error' ? 'bg-danger text-white' : 
          toast.type === 'warning' ? 'bg-warning' : 'bg-light'">
          <strong class="me-auto">
            {{ toast.type === 'success' ? 'Success' : 
               toast.type === 'error' ? 'Error' : 
               toast.type === 'warning' ? 'Warning' : 'Notification' }}
          </strong>
          <button type="button" class="btn-close" 
            :class="['success', 'error'].includes(toast.type) ? 'btn-close-white' : ''"
            @click="hideToast(toast.id)" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          {{ toast.message }}
        </div>
      </div>
    </div>
  `
};

export default useToast;

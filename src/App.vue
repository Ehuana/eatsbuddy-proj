<template>
  <div>
    <!-- Loading Overlay -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin fa-3x greengoods"></i>
        <p class="mt-3 greengoods">Loading...</p>
      </div>
    </div>

    <Navbar />
    <router-view />
    <Footer />
    
    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { onMounted, ref, watch } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { ToastContainer } from '@/composables/useToast';

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'aos/dist/aos.css';
import AOS from 'aos';

export default {
  components: {
    Navbar,
    Footer,
    ToastContainer
  },
  setup() {
    const { user } = useAuth();
    const isLoading = ref(true);
    
    onMounted(() => {
      console.log("App component mounted, checking auth status");
      
      // Initialize AOS
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
      
      // Hide loading after initial page load
      window.addEventListener('load', () => {
        setTimeout(() => {
          isLoading.value = false;
          console.log("App loaded, loading state disabled");
        }, 800); // shorter delay for better UX
      });
      
      // Fallback in case 'load' event already fired
      setTimeout(() => {
        isLoading.value = false;
        console.log("App loading timeout reached, loading state disabled");
      }, 1500); // shorter timeout
      
      // Set up watcher for auth state
      watch(user, (newUser) => {
        console.log("Auth state changed in App:", newUser ? "User logged in" : "No user");
      });
    });
    
    return {
      isLoading,
      user
    };
  },
  watch: {
    $route() {
      // Show loading on route change
      this.isLoading = true;
      // Hide loading after a short delay
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.3s ease-out;
}

.loading-spinner {
  text-align: center;
}

.greengoods {
  color: #17B97A;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}

/* Add icons via Remixicon CDN */
@import url("https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css");
</style>
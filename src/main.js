import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/style.css'

// Import fallback icon styles in case Remixicon is not installed
import './assets/fallback-icons.css'

// Try to import Remixicon if available
try {
  require('remixicon/fonts/remixicon.css');
  console.log('Remixicon loaded successfully');
} catch (e) {
  console.warn('Remixicon package not found, using fallback icons');
}

// Firebase setup
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

// Handle authentication state
let app;

onAuthStateChanged(auth, (user) => {
  // Only initialize the app once
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount('#app');
    console.log('App mounted with user:', user ? 'Logged In' : 'Not Logged In');
  }
});

// If auth initialization is taking too long, create the app anyway
setTimeout(() => {
  if (!app) {
    console.log('Auth initialization timed out, mounting app anyway');
    app = createApp(App);
    app.use(router);
    app.mount('#app');
  }
}, 1000);
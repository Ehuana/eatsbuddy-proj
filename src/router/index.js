import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RecipePage from '../views/RecipePage.vue';
import MealPlannerPage from '../views/MealPlannerPage.vue';
import GroceryListPage from '../views/GroceryListPage.vue';
import RecipeDetail from '../views/RecipeDetail.vue';
import ContactPage from '../views/ContactPage.vue';
import AboutPage from '../views/AboutPage.vue';
import FaqPage from '@/views/FaqPage.vue';
import Login from '@/views/Login.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import PrivacyPage from '@/views/PrivacyPage.vue';
import TermsPage from '@/views/TermsPage.vue';
import { auth } from '@/firebase/config';
// import BlogPage from '@/views/BlogSection.vue';
// import BlogDetail from '@/views/BlogDetail.vue';

const routes = [
  { path: '/', redirect: '/home-page' },
  { path: '/home-page', name: 'Home', component: HomePage },
  { path: '/recipes', name: 'Recipes', component: RecipePage },
  { 
    path: '/meal-planner', 
    name: 'MealPlanner', 
    component: MealPlannerPage, 
    meta: { requiresAuth: true } 
  },
  { 
    path: '/grocery-list', 
    name: 'GroceryList', 
    component: GroceryListPage, 
    meta: { requiresAuth: true } 
  },
  { path: '/recipes/:id', name: 'RecipeDetail', component: RecipeDetail, props: true },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/faq', name: 'Faq', component: FaqPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/privacy', name: 'Privacy', component: PrivacyPage },
  { path: '/terms', name: 'Terms', component: TermsPage },
  { 
    path: '/profile', 
    name: 'Profile', 
    component: ProfilePage, 
    meta: { requiresAuth: true } 
  },
  // { path: '/blog', name: 'Blog', component: BlogPage },
  // { path: '/blog/:id', name: 'BlogDetail', component: BlogDetail, props: true },
  //{ path: '/:catchAll(.*)', redirect: '/home-page' }, // catch all routes and redirect to home page.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Use the current state of authentication
  const currentUser = auth.currentUser;
  
  // If the route requires authentication and user is not logged in
  if (requiresAuth && !currentUser) {
    console.log('Protected route accessed without auth, redirecting to login');
    next('/login');
  } else {
    // If going to login page but already authenticated, redirect to home
    if (to.path === '/login' && currentUser) {
      next('/home-page');
    } else {
      next();
    }
  }
});

export default router;

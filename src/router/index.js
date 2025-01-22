import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RecipePage from '../views/RecipePage.vue';
import MealPlannerPage from '../views/MealPlannerPage.vue';
import GroceryListPage from '../views/GroceryListPage.vue';
import RecipeDetail from '../views/RecipeDetail.vue';
import ContactPage from '../views/ContactPage.vue';
import AboutPage from '../views/AboutPage.vue';
import FaqPage from '@/views/FaqPage.vue';
// import BlogPage from '@/views/BlogSection.vue';
// import BlogDetail from '@/views/BlogDetail.vue';

const routes = [
  { path: '/', redirect: '/home-page' },
  { path: '/home-page', name: 'Home', component: HomePage },
  { path: '/recipes', name: 'Recipes', component: RecipePage },
  { path: '/meal-planner', name: 'MealPlanner', component: MealPlannerPage },
  { path: '/grocery-list', name: 'GroceryList', component: GroceryListPage },
  { path: '/recipes/:id', name: 'RecipeDetail', component: RecipeDetail, props: true },
  { path: '/contact', name: 'Contact', component: ContactPage },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/faq', name: 'Faq', component: FaqPage },
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

export default router;

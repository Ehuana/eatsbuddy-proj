<template>
  <nav class="navbar navbar-expand-xl EG-Default navbar-light fixed-top" id="mainNav">
    <div class="container px-3 px-lg-5">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand">
        <div class="d-flex align-items-center">
          <div class="brand-icon me-2">
            <i class="ri-restaurant-2-fill"></i>
          </div>
          <div class="brand-text">
            <span class="brand-name">EatsBuddy</span>
            <span class="brand-slogan d-none d-sm-inline">Your Kitchen Companion</span>
          </div>
        </div>
      </router-link>

      <!-- Mobile Toggle Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" aria-expanded="false"
        aria-label="Toggle navigation">
        <i class="ri-menu-line"></i>
      </button>

      <!-- Mobile Offcanvas Menu -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel" class="d-flex align-items-center">
            <i class="ri-restaurant-2-fill me-2"></i> EatsBuddy Menu
          </h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/home-page" class="nav-link menu-link">
                <i class="ri-home-4-line menu-icon"></i>Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recipes" class="nav-link menu-link">
                <i class="ri-book-2-line menu-icon"></i>Recipes
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/meal-planner" class="nav-link menu-link">
                <i class="ri-calendar-todo-line menu-icon"></i>Planner
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/grocery-list" class="nav-link menu-link">
                <i class="ri-shopping-basket-2-line menu-icon"></i>List
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle menu-link" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="ri-apps-line menu-icon"></i>More
              </a>
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/faq" class="dropdown-item">
                    <i class="ri-question-line me-2"></i>FAQ
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact" class="dropdown-item">
                    <i class="ri-mail-line me-2"></i>Contact
                  </router-link>
                </li>
                <li>
                  <router-link to="/about" class="dropdown-item">
                    <i class="ri-information-line me-2"></i>About Us
                  </router-link>
                </li>
              </ul>
            </li>
            
            <div class="nav-divider"></div>            <!-- User Not Logged In -->
            <li class="nav-item" v-if="!user">
              <router-link to="/login" class="nav-link btn-login me-2">
                <i class="ri-login-box-line me-1"></i>Login
              </router-link>
            </li>
            <li class="nav-item" v-if="!user">
              <router-link to="/login" class="nav-link btn-register">
                <i class="ri-user-add-line me-1"></i>Register
              </router-link>
            </li>

            <!-- User Logged In -->
            <li class="nav-item dropdown" v-else>
              <a class="nav-link dropdown-toggle user-dropdown" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <div class="user-avatar">{{ getUserInitials() }}</div>
                <span class="user-email d-none d-lg-inline">{{ getUserDisplayName() }}</span>
              </a>
              <ul class="dropdown-menu user-dropdown-menu">
                <li class="dropdown-user-info">
                  <div class="dropdown-user-name">{{ getUserDisplayName() }}</div>
                  <div class="dropdown-user-email">{{ user.email }}</div>
                </li>
                <li><hr class="dropdown-divider"></li>                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="ri-user-settings-line me-2"></i>My Profile
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                    <i class="ri-logout-box-r-line me-2"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import * as bootstrap from 'bootstrap'
import { useAuth } from '@/composables/useAuth';
import { useFirestore } from '@/composables/useFirestore';
import { ref, onMounted, watch } from 'vue';

export default {
  name: "Navbar",
  setup() {
    const { user, logout } = useAuth();
    const { queryByField } = useFirestore();
    const userDisplayName = ref('');
      const handleLogout = async () => {
      try {
        console.log('Logging out user...');
        await logout();
        
        // Clear any cached user data
        userDisplayName.value = '';
        
        console.log('User logged out successfully');
          // Force redirect to home page and reload to ensure clean state
        setTimeout(() => {
          window.location.href = '/';
          window.location.reload();
        }, 100);
      } catch (err) {
        console.error('Failed to logout', err);
      }
    };
    
    // Load user's display name from Firestore
    const loadUserDisplayName = async () => {
      if (!user.value || !user.value.uid) return;
      
      try {
        console.log('Loading user display name for:', user.value.email);
        const profiles = await queryByField('userProfiles', 'userId', user.value.uid);
        
        if (profiles.length > 0 && profiles[0].displayName) {
          console.log('Found display name in profile:', profiles[0].displayName);
          userDisplayName.value = profiles[0].displayName;
        }
      } catch (err) {
        console.error('Failed to load user display name:', err);
      }
    };
      // Load display name on mount and when user changes
    onMounted(() => {
      console.log('Navbar mounted. User state:', user.value);
      if (user.value) {
        loadUserDisplayName();
      }
    });
    
    watch(user, (newUser) => {
      console.log('User state changed:', newUser);
      if (newUser) {
        loadUserDisplayName();
      } else {
        userDisplayName.value = '';
      }
    });    return {
      user,
      handleLogout,
      userDisplayName
    };
  },
  methods: {
    getUserInitials() {
      if (!this.user || !this.user.email) return '?';
      
      // Extract first letter of email (before the @)
      const name = this.user.email.split('@')[0];
      if (name.length > 0) {
        return name.charAt(0).toUpperCase();
      }
      return '?';
    },    getUserDisplayName() {
      // First check if we have a Firestore display name
      if (this.userDisplayName) {
        return this.userDisplayName;
      }
      
      if (!this.user || !this.user.email) return 'User';
      
      // Use part of email before @ sign as display name
      const name = this.user.email.split('@')[0];
      // Capitalize first letter of each word
      return name
        .split(/[-_.]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  },
  mounted() {
    // Navbar shrink function
    const navbarShrink = () => {
      const navbarCollapsible = document.body.querySelector("#mainNav");
      if (!navbarCollapsible) return;

      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove("navbar-shrink");
      } else {
        navbarCollapsible.classList.add("navbar-shrink");
      }
    };

    // Shrink navbar on page load
    navbarShrink();

    // Shrink navbar when page is scrolled
    document.addEventListener("scroll", navbarShrink);

    // Collapse responsive navbar on link click
    const navbarToggler = document.body.querySelector(".navbar-toggler");
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll(".offcanvas-body .nav-link")
    );

    responsiveNavItems.forEach((responsiveNavItem) =>
      responsiveNavItem.addEventListener("click", () => {
        if (window.getComputedStyle(navbarToggler).display !== "none") {
          const offcanvasMenu = document.querySelector("#offcanvasRight");
          const bootstrapOffcanvas =
            bootstrap.Offcanvas.getInstance(offcanvasMenu);
          if (bootstrapOffcanvas) {
            bootstrapOffcanvas.hide();
          }
        }
      })
    );
  },
};
</script>

<style>
/* Default navbar */
#mainNav {
  transition: all 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 0;
}

/* Navbar shrink */
.navbar-shrink {
  background-color: white !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

/* Brand styling */
.navbar-brand {
  padding: 0;
  margin-right: 2rem;
  text-decoration: none;
}

.brand-icon {
  font-size: 1.8rem;
  color: #17B97A;
  display: flex;
  align-items: center;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1.1;
}

.brand-slogan {
  font-size: 0.7rem;
  color: #6c757d;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* Navigation items */
.navbar-nav {
  align-items: center;
}

.nav-item {
  position: relative;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.menu-link {
  display: flex;
  align-items: center;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.menu-link:hover, 
.router-link-active.menu-link {
  color: #17B97A;
  background-color: rgba(23, 185, 122, 0.1);
}

.menu-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

/* Login button */
.btn-login {
  background-color: #17B97A !important;
  color: white !important;
  border-radius: 20px;
  padding: 0.4rem 1.2rem !important;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: none;
  border: 2px solid #17B97A;
}

.btn-login:hover {
  background-color: #149e68 !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(23, 185, 122, 0.3);
  border-color: #149e68;
}

/* Register button */
.btn-register {
  background-color: transparent !important;
  color: #17B97A !important;
  border-radius: 20px;
  padding: 0.4rem 1.2rem !important;
  transition: all 0.3s ease;
  font-weight: 500;
  text-decoration: none;
  border: 2px solid #17B97A;
}

.btn-register:hover {
  background-color: #17B97A !important;
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(23, 185, 122, 0.3);
}

/* User dropdown */
.user-dropdown {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.6rem;
  border-radius: 20px;
  background-color: rgba(44, 62, 80, 0.05);
}

.user-dropdown:hover {
  background-color: rgba(44, 62, 80, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #17B97A;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: 0.5rem;
}

.user-email {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-user-info {
  padding: 0.5rem 1rem;
}

.dropdown-user-name {
  font-weight: 600;
  color: #2c3e50;
}

.dropdown-user-email {
  font-size: 0.8rem;
  color: #6c757d;
}

/* Dropdown styling */
.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
  animation: fadeIn 0.2s ease-in-out;
}

.dropdown-menu {
  display: none;
  position: absolute;
  z-index: 1000;
  background-color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  padding: 0.5rem 0;
}

.dropdown-item {
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background-color: rgba(23, 185, 122, 0.1);
  color: #17B97A;
}

.user-dropdown-menu {
  min-width: 240px;
}

/* Mobile menu */
.navbar-toggler {
  border: none;
  color: #2c3e50;
  font-size: 1.5rem;
  padding: 0.25rem 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.offcanvas-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 0.5rem 0;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 1199.98px) {
  .offcanvas-body .nav-item {
    margin: 0.25rem 0;
  }
  
  .offcanvas-body .menu-link {
    padding: 0.7rem 1rem;
  }
    .btn-login {
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .btn-register {
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .user-dropdown {
    width: 100%;
    border-radius: 6px;
    justify-content: start;
    margin-top: 0.5rem;
  }
}
</style>

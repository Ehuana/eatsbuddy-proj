<template>
  <nav class="navbar navbar-expand-xl EG-Default navbar-light fixed-top" id="mainNav">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand fs-4 fw-bold" href="#">EatsBuddy</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" aria-expanded="false"
        aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Menu</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav ms-auto fs-5">
            <li class="nav-item mx-lg-2">
              <router-link to="/home-page" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link to="/recipes" class="nav-link">Recipes</router-link>
            </li>

            <li class="nav-item mx-lg-2">
              <router-link to="/meal-planner" class="nav-link">Meal Planner</router-link>
            </li>
            <li class="nav-item mx-lg-2">
              <router-link to="/grocery-list" class="nav-link">Grocery List</router-link>
            </li>
            <li class="nav-item mx-lg-2 dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Others
              </a>
              <ul class="dropdown-menu">
                <!-- <li>
                  <router-link to="/blog" class="dropdown-item">Blog</router-link>
                </li> -->
                <li>
                  <router-link to="/faq" class="dropdown-item">FAQ</router-link>
                </li>
                <!-- <li>
                  <router-link to="/grocery-list" class="dropdown-item">Events</router-link>
                </li> -->
                <li>
                  <router-link to="/contact" class="dropdown-item">Contact</router-link>
                </li>
                <li>
                  <router-link to="/about" class="dropdown-item">About Us</router-link>
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

export default {
  name: "Navbar",
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
          bootstrapOffcanvas.hide();
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
  background-color: transparent;
}

/* Navbar shrink */
.navbar-shrink {
  background-color: white !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dropdown on Hover */
.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
  /* Remove unwanted spacing */
}

.dropdown-menu {
  display: none;
  /* Hide dropdown initially */
  position: absolute;
  z-index: 1000;
  background-color: white;
  /* Matches theme */
  border: none;
  /* Optional: cleaner look */
}
</style>

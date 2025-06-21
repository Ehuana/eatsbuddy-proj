<template>
    <footer class="EG-Default footer-area">
        <!-- Subscribe Section -->
        <div class="subscribe-section">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <h3 class="text-white mb-3">Subscribe to Our Newsletter</h3>
                        <p class="text-white-50">Get weekly recipes, meal planning tips, and special offers.</p>
                    </div>
                    <div class="col-lg-6">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Your email address">
                            <button class="btn btn-success" type="button">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>        <!-- Main Footer Content -->
        <div class="footer-main">
            <div class="container">
                <div class="row">
                    <!-- About Column -->
                    <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <div class="footer-logo mb-3 text-start">
                            <h2>EatsBuddy</h2>
                        </div>
                        <p class="footer-desc text-start">
                            Simplify your meals and grocery shopping effortlessly. Explore recipes, plan meals, and
                            manage grocery lists, all in one place.
                        </p>
                        <div class="social-links mt-4">
                            <a href="#" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
                            <a href="#" aria-label="Twitter"><i class="ri-twitter-fill"></i></a>
                            <a href="#" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
                            <a href="#" aria-label="Pinterest"><i class="ri-pinterest-fill"></i></a>
                            <a href="#" aria-label="Youtube"><i class="ri-youtube-fill"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links Column -->
                    <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <h5 class="footer-heading text-start">Quick Links</h5>
                        <ul class="footer-links text-start">
                            <li><router-link to="/">Home</router-link></li>
                            <li><router-link to="/recipes">Recipes</router-link></li>
                            <li><router-link to="/meal-planner">Meal Planner</router-link></li>
                            <li><router-link to="/grocery-list">Grocery List</router-link></li>
                            <li><router-link to="/about">About Us</router-link></li>
                            <li><router-link to="/contact">Contact</router-link></li>
                        </ul>
                    </div>

                    <!-- Contact Column -->
                    <div class="col-lg-4 col-md-6">
                        <h5 class="footer-heading text-start">Contact Info</h5>
                        <ul class="footer-contact text-start">
                            <li>
                                <i class="ri-map-pin-line"></i>
                                <div>
                                    <span>Phnom Penh 120201, Cambodia</span>
                                </div>
                            </li>
                            <li>
                                <i class="ri-mail-line"></i>
                                <div>
                                    <a href="mailto:info@eatsbuddy.com">info@eatsbuddy.com</a>
                                </div>
                            </li>
                            <li>
                                <i class="ri-phone-line"></i>
                                <div>
                                    <a href="tel:+85508058682">+855 080 586 824</a>
                                </div>
                            </li>
                            <li>
                                <i class="ri-time-line"></i>
                                <div>
                                    <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Copyright Section -->
        <div class="copyright">
            <div class="container">                <div class="row align-items-center">
                    <div class="col-md-6">
                        <p class="mb-md-0">© {{ currentYear }} EatsBuddy. All Rights Reserved.</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <ul class="policy-links">
                            <li><router-link to="/privacy">Privacy Policy</router-link></li>
                            <li><router-link to="/terms">Terms of Service</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
/* Subscribe section */
.subscribe-section {
  background-color: #17B97A;
  padding: 2.5rem 0;
}

/* Main footer section */
.footer-main {
  background-color: #2c3e50;
  color: #fff;
  padding: 4rem 0 3rem;
}

.footer-logo h2 {
  color: white;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0;
}

.footer-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

.footer-heading {
  color: white;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 10px;
  text-align: left;
}

.footer-heading::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: #17B97A;
}

/* Social links */
.social-links {
  display: flex;
  gap: 0.8rem;
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: #17B97A;
  transform: translateY(-3px);
}

/* Footer links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.7rem;
}

.footer-links li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: left;
}

.footer-links li a:hover {
  color: #17B97A;
  padding-left: 5px;
}

/* Footer contact */
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-contact li {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: flex-start;
  text-align: left;
}

.footer-contact li i {
  color: #17B97A;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.footer-contact li div {
  flex: 1;
}

.footer-contact li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contact li a:hover {
  color: #17B97A;
}

/* Copyright section */
.copyright {
  background-color: #243141;
  color: rgba(255, 255, 255, 0.7);
  padding: 1.2rem 0;
}

.policy-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
  justify-content: flex-end;
}

.policy-links li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.policy-links li a:hover {
  color: #17B97A;
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .footer-heading {
    margin-top: 1.5rem;
  }
  
  .policy-links {
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>
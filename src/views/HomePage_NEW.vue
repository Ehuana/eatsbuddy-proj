<template>
  <div class="container-fluid text-center EG-Default p-0">
    <!-- Hero Section -->
    <section class="hero-section position-relative">
      <div class="hero-background"></div>
      <div class="hero-overlay"></div>
      <div class="container-fluid h-100 d-flex align-items-center justify-content-center">
        <div class="hero-content text-center text-white position-relative z-3" data-aos="fade-up" data-aos-duration="1300">
          <div class="hero-badge mb-4">
            <span class="badge bg-success-subtle text-success px-4 py-2 rounded-pill fs-6">
              <i class="ri-restaurant-line me-2"></i>Your Ultimate Cooking Companion
            </span>
          </div>
          <h1 class="display-1 fw-bold mb-4 hero-title">
            Welcome to <span class="text-gradient">EatsBuddy</span>
          </h1>
          <p class="lead fs-3 mb-4 hero-subtitle">
            Simplify your meals, amplify your life with smart planning
          </p>
          <p class="fs-5 mb-5 text-white-75">
            Discover thousands of recipes, plan your meals effortlessly, and create smart grocery lists 
            with our modern web application powered by Vue.js and TheMealDB API.
          </p>
          <div class="hero-cta d-flex flex-wrap justify-content-center gap-3">
            <router-link to="/recipes" class="btn btn-success btn-lg px-5 py-3 rounded-pill hero-btn-primary">
              <i class="ri-search-line me-2"></i>Explore Recipes
            </router-link>
            <router-link to="/meal-planner" class="btn btn-outline-light btn-lg px-5 py-3 rounded-pill hero-btn-secondary">
              <i class="ri-calendar-line me-2"></i>Start Planning
            </router-link>
          </div>
        </div>
      </div>
      
      <!-- Floating Stats -->
      <div class="floating-stats position-absolute bottom-0 start-50 translate-middle-x mb-4">
        <div class="row g-4 text-center">
          <div class="col-4" data-aos="fade-up" data-aos-delay="100">
            <div class="stat-card">
              <div class="stat-number text-success fw-bold">1000+</div>
              <div class="stat-label text-white-75">Recipes</div>
            </div>
          </div>
          <div class="col-4" data-aos="fade-up" data-aos-delay="200">
            <div class="stat-card">
              <div class="stat-number text-success fw-bold">1.2K+</div>
              <div class="stat-label text-white-75">Active Users</div>
            </div>
          </div>
          <div class="col-4" data-aos="fade-up" data-aos-delay="300">
            <div class="stat-card">
              <div class="stat-number text-success fw-bold">4.8★</div>
              <div class="stat-label text-white-75">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features/Services Section -->
    <section class="features-section py-5 bg-light">
      <div class="container py-5">
        <div class="row justify-content-center mb-5">
          <div class="col-xl-8 col-lg-9">
            <div class="text-center" data-aos="fade-up">
              <div class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
                <i class="ri-service-line me-2"></i>OUR SERVICES
              </div>
              <h2 class="fw-bold mb-4 display-5">Everything You Need for Perfect Meals</h2>
              <p class="lead text-muted">
                From discovering recipes to planning meals and creating grocery lists - 
                we've got your culinary journey covered with modern technology.
              </p>
            </div>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-lg-4 col-md-6" v-for="(item, index) in items" :key="index" 
               :data-aos="'fade-up'" :data-aos-delay="index * 100">
            <div class="feature-card h-100">
              <div class="feature-card-inner p-4 text-center">
                <div class="feature-icon mb-4">
                  <img :src="require(`@/assets/img/${item.imgSrc}`)" :alt="item.title" class="feature-img">
                </div>
                <h4 class="fw-bold mb-3">{{ item.title }}</h4>
                <p class="text-muted mb-4">{{ item.text }}</p>
                <router-link :to="item.destinationpage" class="btn btn-success rounded-pill px-4 py-2">
                  <i :class="item.icon + ' me-2'"></i>{{ item.text2 }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Stack Preview -->
    <section class="tech-preview-section py-5 bg-white">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="tech-content">
              <div class="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                <i class="ri-code-line me-2"></i>POWERED BY MODERN TECH
              </div>
              <h2 class="fw-bold mb-4 display-5">
                Built with <span class="text-success">Cutting-Edge</span> Technology
              </h2>
              <p class="lead mb-4">
                EatsBuddy leverages the latest web technologies to deliver a fast, 
                reliable, and user-friendly experience that makes meal planning effortless.
              </p>
              
              <div class="tech-highlights">
                <div class="tech-item d-flex align-items-center mb-3">
                  <div class="tech-item-icon me-3">
                    <i class="ri-vuejs-line text-success fs-4"></i>
                  </div>
                  <div>
                    <h6 class="mb-1 fw-bold">Vue.js 3 Framework</h6>
                    <small class="text-muted">Modern reactive frontend development</small>
                  </div>
                </div>
                <div class="tech-item d-flex align-items-center mb-3">
                  <div class="tech-item-icon me-3">
                    <i class="ri-firebase-line text-warning fs-4"></i>
                  </div>
                  <div>
                    <h6 class="mb-1 fw-bold">Firebase Backend</h6>
                    <small class="text-muted">Real-time database & authentication</small>
                  </div>
                </div>
                <div class="tech-item d-flex align-items-center mb-3">
                  <div class="tech-item-icon me-3">
                    <i class="ri-restaurant-2-line text-danger fs-4"></i>
                  </div>
                  <div>
                    <h6 class="mb-1 fw-bold">TheMealDB API</h6>
                    <small class="text-muted">1000+ recipes and meal data</small>
                  </div>
                </div>
              </div>
              
              <router-link to="/about" class="btn btn-outline-success rounded-pill px-4 py-2 mt-3">
                <i class="ri-information-line me-2"></i>Learn More About Our Tech
              </router-link>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="tech-visual">
              <div class="tech-cards-stack">
                <div class="tech-card-stack vue-card">
                  <i class="ri-vuejs-line"></i>
                  <span>Vue.js</span>
                </div>
                <div class="tech-card-stack firebase-card">
                  <i class="ri-firebase-line"></i>
                  <span>Firebase</span>
                </div>
                <div class="tech-card-stack api-card">
                  <i class="ri-restaurant-2-line"></i>
                  <span>TheMealDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </section>

    <!-- Mission Section -->
    <section class="mission-section position-relative">
      <div class="mission-background"></div>
      <div class="mission-overlay"></div>
      <div class="container py-5 position-relative">
        <div class="row align-items-center">
          <div class="col-lg-6 text-white" data-aos="fade-right">
            <h2 class="display-5 fw-bold mb-4">
              Eat <span class="text-success">Well</span>, Live <span class="text-success">Better</span>
            </h2>
            <p class="lead mb-4">
              At EatsBuddy, we believe in making every meal smarter and every day simpler. 
              Plan your meals and groceries effortlessly with our intelligent tools.
            </p>
            <p class="mb-4">
              Join thousands of users who have already transformed their cooking experience 
              with our comprehensive meal planning platform.
            </p>
            <div class="mission-cta">
              <router-link to="/recipes" class="btn btn-success btn-lg rounded-pill px-5 py-3 me-3">
                Get Started Today
              </router-link>
              <router-link to="/about" class="btn btn-outline-light btn-lg rounded-pill px-5 py-3">
                Our Story
              </router-link>
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="row g-3">
              <div class="col-6" v-for="(stat, index) in abouts" :key="index" 
                   :data-aos="'zoom-in'" :data-aos-delay="index * 100">
                <div class="mission-stat-card text-center">
                  <div class="stat-number display-4 fw-bold text-success mb-2">{{ stat.title }}</div>
                  <div class="stat-description text-white">{{ stat.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-section py-5 bg-light">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6" data-aos="fade-right">
            <div class="why-choose-image">
              <img src="../assets/img/WCU-2.png" alt="Why Choose EatsBuddy" 
                   class="img-fluid rounded-4 shadow-lg">
            </div>
          </div>
          <div class="col-lg-6" data-aos="fade-left">
            <div class="why-choose-content">
              <div class="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill mb-3">
                <i class="ri-star-line me-2"></i>WHY CHOOSE US
              </div>
              <h2 class="fw-bold mb-4 display-5">
                Why Choose <span class="text-success">EatsBuddy</span>?
              </h2>
              <div class="why-choose-list">
                <div class="why-choose-item d-flex align-items-start mb-4" 
                     v-for="(reason, index) in whyChooseReasons" :key="index"
                     :data-aos="'fade-up'" :data-aos-delay="index * 100">
                  <div class="why-choose-icon me-3">
                    <i class="ri-check-double-line text-success fs-3"></i>
                  </div>
                  <div class="why-choose-text">
                    <h6 class="fw-bold mb-2">{{ reason.title }}</h6>
                    <p class="text-muted mb-0">{{ reason.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section position-relative">
      <div class="testimonials-background"></div>
      <div class="testimonials-overlay"></div>
      <div class="container py-5 text-center text-white position-relative" data-aos="fade-up">
        <div class="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill mb-3">
          <i class="ri-chat-quote-line me-2"></i>CUSTOMER TESTIMONIALS
        </div>
        <h2 class="display-5 fw-bold mb-4">What Our Users Say</h2>
        <p class="lead mb-4">
          Join thousands of satisfied customers who have transformed their cooking experience with EatsBuddy.
        </p>

        <!-- Star Rating -->
        <div class="rating-display mb-4">
          <div class="stars-large mb-3">
            <i class="ri-star-fill text-warning fs-2 me-1"></i>
            <i class="ri-star-fill text-warning fs-2 me-1"></i>
            <i class="ri-star-fill text-warning fs-2 me-1"></i>
            <i class="ri-star-fill text-warning fs-2 me-1"></i>
            <i class="ri-star-half-fill text-warning fs-2"></i>
          </div>
          <p class="fs-4 mb-0">
            Rated <span class="fw-bold text-warning">4.8/5</span> by 18,000+ happy customers
          </p>
        </div>

        <div class="testimonials-cta">
          <router-link to="/about" class="btn btn-success btn-lg rounded-pill px-5 py-3 me-3">
            <i class="ri-team-line me-2"></i>Meet Our Team
          </router-link>
          <router-link to="/contact" class="btn btn-outline-light btn-lg rounded-pill px-5 py-3">
            <i class="ri-message-line me-2"></i>Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomePage',
  data() {
    return {
      items: [
        {
          imgSrc: 'Recipe-1.png',
          title: 'Recipe Discovery',
          text: 'Explore over 1000 diverse recipes from TheMealDB API, featuring cuisines from around the world with detailed instructions and ingredients.',
          text2: 'Browse Recipes',
          destinationpage: '/recipes',
          icon: 'ri-search-line'
        },
        {
          imgSrc: 'MPlan-1.png',
          title: 'Smart Meal Planning',
          text: 'Create intelligent weekly meal plans with our intuitive planner. Organize breakfast, lunch, and dinner with automated suggestions.',
          text2: 'Start Planning',
          destinationpage: '/meal-planner',
          icon: 'ri-calendar-check-line'
        },
        {
          imgSrc: 'Groc-1.png',
          title: 'Grocery Management',
          text: 'Generate smart grocery lists automatically from your meal plans. Add, organize, and track your shopping with ease.',
          text2: 'Manage Lists',
          destinationpage: '/grocery-list',
          icon: 'ri-shopping-basket-line'
        }
      ],
      abouts: [
        {
          title: '1000+',
          description: 'Available Recipes'
        },
        {
          title: '1.2K+',
          description: 'Active Members'
        },
        {
          title: '18K+',
          description: 'Happy Customers'
        },
        {
          title: '4.8★',
          description: 'User Rating'
        }
      ],
      whyChooseReasons: [
        {
          title: 'Time-Saving Technology',
          description: 'Save hours with our automated meal planning and smart grocery list generation powered by modern algorithms.'
        },
        {
          title: 'Personalized Experience',
          description: 'Get recipe recommendations tailored to your preferences, dietary needs, and cooking skill level.'
        },
        {
          title: 'Budget-Friendly Planning',
          description: 'Stay within budget with smart grocery lists that help you avoid food waste and unnecessary purchases.'
        },
        {
          title: 'Community Driven',
          description: 'Join a thriving community of food lovers sharing tips, reviews, and culinary experiences.'
        }
      ]
    };
  },
  mounted() {
    // Initialize AOS animations
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #17B97A 0%, #0d8f5f 50%, #0a6b47 100%);
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/img/Food-1.png');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
}

.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-white-75 {
  color: rgba(255,255,255,0.85);
}

.hero-btn-primary {
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(23, 185, 122, 0.3);
}

.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(23, 185, 122, 0.4);
}

.hero-btn-secondary {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background-color: rgba(255,255,255,0.1);
}

.hero-btn-secondary:hover {
  transform: translateY(-2px);
  background-color: rgba(255,255,255,0.2);
}

/* Floating Stats */
.floating-stats {
  backdrop-filter: blur(20px);
  background: rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.2);
}

.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: scale(1.05);
}

.stat-number {
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

/* Features Section */
.feature-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
  overflow: hidden;
  position: relative;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #17B97A, #0d8f5f);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.feature-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-img {
  transform: scale(1.1);
}

/* Tech Preview Section */
.tech-visual {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tech-cards-stack {
  position: relative;
  width: 300px;
  height: 300px;
}

.tech-card-stack {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.vue-card {
  background: linear-gradient(135deg, #4FC08D, #42b883);
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: float 3s ease-in-out infinite;
}

.firebase-card {
  background: linear-gradient(135deg, #FFA000, #FF8F00);
  bottom: 50px;
  left: 0;
  animation: float 3s ease-in-out infinite 1s;
}

.api-card {
  background: linear-gradient(135deg, #E53E3E, #C53030);
  bottom: 50px;
  right: 0;
  animation: float 3s ease-in-out infinite 2s;
}

.tech-card-stack i {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.tech-card-stack:hover {
  transform: translateY(-5px) scale(1.05);
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Mission Section */
.mission-section {
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
}

.mission-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/img/Food-2.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.mission-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
}

.mission-stat-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
}

.mission-stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255,255,255,0.15);
}

/* Why Choose Section */
.why-choose-section {
  position: relative;
}

.why-choose-image img {
  max-width: 400px;
  width: 100%;
  height: auto;
}

.why-choose-item {
  transition: transform 0.3s ease;
}

.why-choose-item:hover {
  transform: translateX(10px);
}

.why-choose-icon {
  width: 50px;
  height: 50px;
  background: rgba(23, 185, 122, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Testimonials Section */
.testimonials-section {
  min-height: 50vh;
  display: flex;
  align-items: center;
  position: relative;
}

.testimonials-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/img/Food-2.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.testimonials-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
}

.stars-large i {
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: transform 0.2s ease;
}

.stars-large i:hover {
  transform: scale(1.2);
}

/* Tech Item Styling */
.tech-item {
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateX(10px);
}

.tech-item-icon {
  width: 50px;
  height: 50px;
  background: rgba(23, 185, 122, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Badge Styling */
.badge {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    min-height: 80vh;
  }
  
  .display-1 {
    font-size: 2.5rem;
  }
  
  .display-5 {
    font-size: 2rem;
  }
  
  .hero-cta {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-cta .btn {
    width: 100%;
    max-width: 300px;
  }
  
  .floating-stats {
    position: relative;
    margin-top: 2rem;
  }
  
  .tech-cards-stack {
    width: 250px;
    height: 250px;
  }
  
  .tech-card-stack {
    width: 100px;
    height: 100px;
    font-size: 0.8rem;
  }
  
  .tech-card-stack i {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-section {
    min-height: 70vh;
  }
  
  .display-1 {
    font-size: 2rem;
  }
  
  .fs-3 {
    font-size: 1.2rem !important;
  }
  
  .fs-5 {
    font-size: 1rem !important;
  }
  
  .feature-card {
    margin-bottom: 2rem;
  }
}

/* Animation Enhancements */
.feature-card,
.mission-stat-card,
.why-choose-item {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #17B97A, #0d8f5f);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0d8f5f, #17B97A);
}
</style>

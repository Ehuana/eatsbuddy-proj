<template>
    <div class="EG-Default">
        <!-- Hero Section -->
        <div class="hero-section position-relative overflow-hidden">
            <div class="hero-background"></div>
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-9 col-md-10 col-12">
                        <div class="text-center text-white" data-aos="fade-up" data-aos-duration="1300">
                            <nav>
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item">
                                        <router-link to="/" class="nav-link text-white-50">Home</router-link>
                                    </li>
                                    <li class="breadcrumb-item text-white active" aria-current="page">ABOUT</li>
                                </ol>
                            </nav>
                            <h1 class="fw-bold pb-3 display-2">About EatsBuddy</h1>
                            <p class="lead mb-4 fs-4">Revolutionizing meal planning with modern technology</p>
                            <p class="fs-5 mb-0 opacity-75">
                                We combine the power of Vue.js, Firebase, and TheMealDB API to create 
                                the ultimate cooking companion for food enthusiasts everywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>        <!-- Mission & Story Section -->
        <div class="py-5 bg-light">
            <div class="container py-5">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6 col-12" data-aos="fade-right" data-aos-duration="1300">
                        <div class="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                            <i class="ri-heart-line me-2"></i>OUR MISSION
                        </div>
                        <h2 class="fw-bold mb-4 display-5 text-dark">
                            Making Meal Planning <span class="text-success">Effortless</span> for Everyone
                        </h2>
                        <p class="lead mb-4">
                            EatsBuddy transforms the way you approach cooking by combining powerful technology 
                            with an intuitive user experience. We believe everyone deserves access to delicious, 
                            well-planned meals without the hassle.
                        </p>
                        <div class="row g-3">
                            <div class="col-6">
                                <div class="d-flex align-items-center">
                                    <div class="bg-success rounded-circle p-2 me-3">
                                        <i class="ri-restaurant-line text-white fs-5"></i>
                                    </div>
                                    <div>
                                        <h6 class="mb-1 fw-bold">1000+ Recipes</h6>
                                        <small class="text-muted">From TheMealDB</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="d-flex align-items-center">
                                    <div class="bg-success rounded-circle p-2 me-3">
                                        <i class="ri-calendar-check-line text-white fs-5"></i>
                                    </div>
                                    <div>
                                        <h6 class="mb-1 fw-bold">Smart Planning</h6>
                                        <small class="text-muted">AI-powered suggestions</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12" data-aos="fade-left" data-aos-duration="1300">
                        <div class="position-relative">
                            <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                 alt="Modern Kitchen" class="img-fluid rounded-4 shadow-lg">
                            <!-- <div class="position-absolute top-50 start-50 translate-middle">
                                <div class="bg-white rounded-circle p-4 shadow-lg">
                                    <i class="ri-play-fill text-success display-6"></i>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Technology Stack Section -->
        <div class="py-5 bg-white">
            <div class="container py-5">
                <div class="row justify-content-center mb-5">
                    <div class="col-xl-8 col-lg-9">
                        <div class="text-center" data-aos="fade-up" data-aos-duration="1000">
                            <div class="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
                                <i class="ri-code-line me-2"></i>BUILT WITH MODERN TECH
                            </div>
                            <h2 class="fw-bold mb-4 display-5">Powered by Cutting-Edge Technology</h2>
                            <p class="lead text-muted">
                                Our platform leverages the latest web technologies and APIs to deliver 
                                a seamless, fast, and reliable cooking experience.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="row g-4 mb-5">
                    <!-- Frontend Technologies -->
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                        <div class="tech-card h-100 p-4 rounded-4 border-0 shadow-sm">
                            <div class="tech-icon mb-3">
                                <i class="ri-vuejs-line text-success display-4"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Vue.js 3</h5>
                            <p class="text-muted mb-3">
                                Modern reactive framework for building dynamic and responsive user interfaces 
                                with composition API and advanced state management.
                            </p>
                            <div class="tech-features">
                                <span class="badge bg-success-subtle text-success me-2 mb-2">Reactive</span>
                                <span class="badge bg-success-subtle text-success me-2 mb-2">Component-based</span>
                                <span class="badge bg-success-subtle text-success me-2 mb-2">Performance</span>
                            </div>
                        </div>
                    </div>

                    <!-- Backend & Database -->
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                        <div class="tech-card h-100 p-4 rounded-4 border-0 shadow-sm">
                            <div class="tech-icon mb-3">
                                <i class="ri-firebase-line text-warning display-4"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Firebase</h5>
                            <p class="text-muted mb-3">
                                Google's comprehensive app development platform providing authentication, 
                                real-time database, and cloud storage solutions.
                            </p>
                            <div class="tech-features">
                                <span class="badge bg-warning-subtle text-warning me-2 mb-2">Authentication</span>
                                <span class="badge bg-warning-subtle text-warning me-2 mb-2">Firestore</span>
                                <span class="badge bg-warning-subtle text-warning me-2 mb-2">Real-time</span>
                            </div>
                        </div>
                    </div>

                    <!-- Recipe API -->
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <div class="tech-card h-100 p-4 rounded-4 border-0 shadow-sm">
                            <div class="tech-icon mb-3">
                                <i class="ri-restaurant-2-line text-danger display-4"></i>
                            </div>
                            <h5 class="fw-bold mb-3">TheMealDB API</h5>
                            <p class="text-muted mb-3">
                                Comprehensive recipe database providing thousands of meals with detailed 
                                ingredients, instructions, and high-quality images.
                            </p>
                            <div class="tech-features">
                                <span class="badge bg-danger-subtle text-danger me-2 mb-2">1000+ Recipes</span>
                                <span class="badge bg-danger-subtle text-danger me-2 mb-2">Categories</span>
                                <span class="badge bg-danger-subtle text-danger me-2 mb-2">Search</span>
                            </div>
                        </div>
                    </div>

                    <!-- UI Framework -->
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                        <div class="tech-card h-100 p-4 rounded-4 border-0 shadow-sm">
                            <div class="tech-icon mb-3">
                                <i class="ri-bootstrap-line text-primary display-4"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Bootstrap 5</h5>
                            <p class="text-muted mb-3">
                                World's most popular CSS framework for building responsive, 
                                mobile-first websites with beautiful components.
                            </p>
                            <div class="tech-features">
                                <span class="badge bg-primary-subtle text-primary me-2 mb-2">Responsive</span>
                                <span class="badge bg-primary-subtle text-primary me-2 mb-2">Mobile-first</span>
                                <span class="badge bg-primary-subtle text-primary me-2 mb-2">Flexible</span>
                            </div>
                        </div>
                    </div>

                    <!-- Routing -->
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
                        <div class="tech-card h-100 p-4 rounded-4 border-0 shadow-sm">
                            <div class="tech-icon mb-3">
                                <i class="ri-route-line text-info display-4"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Vue Router</h5>
                            <p class="text-muted mb-3">
                                Official router for Vue.js providing seamless navigation between 
                                pages with dynamic routing and navigation guards.
                            </p>
                            <div class="tech-features">
                                <span class="badge bg-info-subtle text-info me-2 mb-2">SPA</span>
                                <span class="badge bg-info-subtle text-info me-2 mb-2">Dynamic</span>
                                <span class="badge bg-info-subtle text-info me-2 mb-2">Protected Routes</span>
                            </div>
                        </div>
                    </div>

                    <!-- Build Tools -->
                    <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
                        <div class="tech-card h-100 p-4 rounded-4 border-0 shadow-sm">
                            <div class="tech-icon mb-3">
                                <i class="ri-tools-line text-secondary display-4"></i>
                            </div>
                            <h5 class="fw-bold mb-3">Modern Tooling</h5>
                            <p class="text-muted mb-3">
                                Powered by Vite for lightning-fast development, ESLint for code quality, 
                                and modern JavaScript features.
                            </p>
                            <div class="tech-features">
                                <span class="badge bg-secondary-subtle text-secondary me-2 mb-2">Vite</span>
                                <span class="badge bg-secondary-subtle text-secondary me-2 mb-2">ESLint</span>
                                <span class="badge bg-secondary-subtle text-secondary me-2 mb-2">ES6+</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Architecture Overview -->
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        <div class="architecture-section p-5 rounded-4 bg-gradient-primary text-white text-center" data-aos="zoom-in">
                            <h3 class="fw-bold mb-4">Application Architecture</h3>
                            <div class="row g-4">
                                <div class="col-md-3">
                                    <div class="architecture-layer p-3 rounded-3 bg-white bg-opacity-10">
                                        <i class="ri-smartphone-line display-6 mb-2"></i>
                                        <h6 class="fw-bold">Frontend</h6>
                                        <small>Vue.js SPA</small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="architecture-layer p-3 rounded-3 bg-white bg-opacity-10">
                                        <i class="ri-cloud-line display-6 mb-2"></i>
                                        <h6 class="fw-bold">Authentication</h6>
                                        <small>Firebase Auth</small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="architecture-layer p-3 rounded-3 bg-white bg-opacity-10">
                                        <i class="ri-database-2-line display-6 mb-2"></i>
                                        <h6 class="fw-bold">Database</h6>
                                        <small>Firestore</small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="architecture-layer p-3 rounded-3 bg-white bg-opacity-10">
                                        <i class="ri-cloud-line display-6 mb-2"></i>
                                        <h6 class="fw-bold">Recipes</h6>
                                        <small>TheMealDB</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        <!-- Team Section -->
        <div class="py-5 bg-light">
            <div class="container py-5">
                <div class="row justify-content-center mb-5">
                    <div class="col-xl-8 col-lg-9">
                        <div class="text-center" data-aos="fade-up" data-aos-duration="1000">
                            <div class="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
                                <i class="ri-team-line me-2"></i>MEET THE TEAM
                            </div>
                            <h2 class="fw-bold mb-4 display-5">The Minds Behind EatsBuddy</h2>
                            <p class="lead text-muted">
                                Our passionate team of developers and designers working together to revolutionize 
                                your cooking experience with innovative technology solutions.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="row g-4 justify-content-center">
                    <div class="col-lg-4 col-md-6" v-for="(chef, index) in chefs" :key="chef.name" 
                         :data-aos="'fade-up'" :data-aos-delay="index * 100">
                        <div class="team-card h-100 text-center">
                            <div class="team-card-inner p-4">
                                <div class="team-avatar mb-4 position-relative">
                                    <img :src="chef.img" :alt="chef.name" class="team-img">
                                    <div class="team-overlay">
                                        <div class="team-social">
                                            <a v-for="social in chef.social" :key="social.platform" 
                                               :href="social.url" class="social-link">
                                                <i :class="'ri-' + social.platform + '-fill'"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="team-info">
                                    <h5 class="fw-bold mb-2">{{ chef.name }}</h5>
                                    <p class="text-success fw-semibold mb-3">{{ chef.role }}</p>
                                    <p class="text-muted small">{{ chef.description }}</p>
                                    <div class="team-skills">
                                        <span v-for="skill in chef.skills" :key="skill" 
                                              class="badge bg-light text-dark me-1 mb-1">{{ skill }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Team Stats -->
                <div class="row mt-5 pt-5 border-top">
                    <div class="col-md-3 col-6 text-center mb-4" data-aos="fade-up" data-aos-delay="100">
                        <div class="stat-item">
                            <div class="stat-number display-4 fw-bold text-success mb-2">3</div>
                            <div class="stat-label text-muted">Team Members</div>
                        </div>
                    </div>
                    <div class="col-md-3 col-6 text-center mb-4" data-aos="fade-up" data-aos-delay="200">
                        <div class="stat-item">
                            <div class="stat-number display-4 fw-bold text-success mb-2">4</div>
                            <div class="stat-label text-muted">Major Project</div>
                        </div>
                    </div>
                    <div class="col-md-3 col-6 text-center mb-4" data-aos="fade-up" data-aos-delay="300">
                        <div class="stat-item">
                            <div class="stat-number display-4 fw-bold text-success mb-2">6+</div>
                            <div class="stat-label text-muted">Technologies Used</div>
                        </div>
                    </div>
                    <div class="col-md-3 col-6 text-center mb-4" data-aos="fade-up" data-aos-delay="400">
                        <div class="stat-item">
                            <div class="stat-number display-4 fw-bold text-success mb-2">100%</div>
                            <div class="stat-label text-muted">Dedication</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'AboutPage',
  data() {
    return {
      chefs: [
        {
          name: "Tang Elite",
          role: "Lead Developer & UI/UX Designer",
          description: "Passionate full-stack developer specializing in modern web technologies. Designs intuitive user experiences and architectures scalable applications.",
          img: require('@/assets/img/person-e.png'),
          skills: ["Vue.js", "JavaScript", "UI/UX", "Firebase", "Bootstrap"],
          social: [
            { platform: "facebook", url: "https://www.facebook.com/elite.tang/" },
            { platform: "twitter", url: "#" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/elite-tang-24b98a360/" },
          ],
        },
        {
          name: "Tang Piseth",
          role: "Quality Assurance & Testing Specialist",
          description: "Meticulous quality overseer ensuring every feature works flawlessly. Expert in testing methodologies and user experience validation.",
          img: require('@/assets/img/person-p.png'),
          skills: ["Testing", "QA", "Debugging", "User Research", "Analytics"],
          social: [
            { platform: "facebook", url: "https://www.facebook.com/SethDaikon" },
            { platform: "twitter", url: "#" },
            { platform: "linkedin", url: "#" },
          ],
        },
        {
          name: "Chum Veasna",
          role: "Frontend Developer & Presentation Expert",
          description: "Creative frontend developer focused on creating engaging presentations and polished user interfaces. Specializes in responsive design and animations.",
          img: require('@/assets/img/person-v.png'),
          skills: ["CSS", "Animations", "Responsive Design", "Presentations", "Bootstrap"],
          social: [
            { platform: "facebook", url: "https://www.facebook.com/sokchumNatazul" },
            { platform: "twitter", url: "#" },
            { platform: "linkedin", url: "#" },
          ],
        },
      ],
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
  min-height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #17B97A 0%, #0d8f5f 50%, #0a6b47 100%);
  opacity: 0.95;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
  background-size: cover;
  background-position: center;
  opacity: 0.1;
}

/* Technology Cards */
.tech-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(23, 185, 122, 0.05), transparent);
  transition: left 0.5s ease;
}

.tech-card:hover::before {
  left: 100%;
}

.tech-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  border-color: rgba(23, 185, 122, 0.2);
}

.tech-icon {
  transition: transform 0.3s ease;
}

.tech-card:hover .tech-icon {
  transform: scale(1.1);
}

.tech-features .badge {
  transition: all 0.2s ease;
}

.tech-features .badge:hover {
  transform: scale(1.05);
}

/* Architecture Section */
.bg-gradient-primary {
  background: linear-gradient(135deg, #17B97A 0%, #0d8f5f 100%);
}

.architecture-layer {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.architecture-layer:hover {
  transform: translateY(-5px);
  background-color: rgba(255,255,255,0.2) !important;
}

/* Team Section */
.team-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.team-card::before {
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

.team-card:hover::before {
  transform: scaleX(1);
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.team-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
}

.team-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.team-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(23, 185, 122, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 50%;
}

.team-card:hover .team-overlay {
  opacity: 1;
}

.team-card:hover .team-img {
  transform: scale(1.1);
}

.team-social {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 35px;
  height: 35px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: white;
  color: #17B97A;
  transform: scale(1.1);
}

.team-skills .badge {
  font-size: 0.75rem;
  padding: 0.4em 0.8em;
  transition: all 0.2s ease;
}

.team-skills .badge:hover {
  background-color: #17B97A !important;
  color: white !important;
  transform: scale(1.05);
}

/* Stats Section */
.stat-item {
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: scale(1.05);
}

.stat-number {
  background: linear-gradient(135deg, #17B97A, #0d8f5f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Mission Section Enhancements */
.badge {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    min-height: 60vh;
  }
  
  .display-2 {
    font-size: 2.5rem;
  }
  
  .display-5 {
    font-size: 2rem;
  }
  
  .tech-card {
    margin-bottom: 2rem;
  }
  
  .team-avatar {
    width: 100px;
    height: 100px;
  }
  
  .architecture-section {
    padding: 2rem !important;
  }
}

@media (max-width: 576px) {
  .hero-section {
    min-height: 50vh;
  }
  
  .display-2 {
    font-size: 2rem;
  }
  
  .fs-4 {
    font-size: 1.1rem !important;
  }
  
  .fs-5 {
    font-size: 1rem !important;
  }
}

/* Animation Enhancements */
.tech-card,
.team-card,
.architecture-layer {
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

/* Custom Scrollbar for better aesthetics */
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
<template>
    <div class="EG-Default">
        <div class="bg-white py-5">
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-xl-7 col-lg-8 col-md-10 col-12">
                        <div class="text-center" data-aos="fade-up" data-aos-duration="1300">
                            <nav>
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><router-link to="../home-page"
                                            class="nav-link text-success">Home</router-link></li>
                                    <li class="breadcrumb-item link-secondary active" aria-current="page">ABOUT</li>
                                </ol>
                            </nav>
                            <h1 class="fw-bold pb-2 display-1 text-black">About Us</h1>
                            <p class="text-muted lead">At EatsBuddy, we're here to simplify your cooking experience with
                                our Recipe Viewer, Meal Planner, and Grocery List Creation service. Join us in making
                                meal preparation easy and enjoyable!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-5 bg-light">
            <div class="container py-5">
                <div class="row align-items-center g-5 g-md-5 text-start">
                    <div class="col-lg-6 col-12" data-aos="fade-right" data-aos-duration="1300">
                        <h6 class="text-success">OUR STORY</h6>
                        <h1 class="fw-bold py-3 display-4 text-black">Cooking Up Convenience and Joy, One Meal at a
                            Time.</h1>
                        <p class="lead">EatsBuddy was born from a love for food and a desire to make meal planning and
                            preparation effortless for everyone. What began as a small project to help friends and
                            family organize their cooking has grown into a comprehensive platform loved by food
                            enthusiasts everywhere.</p>
                        <p>We at EatsBuddy believes everyone should enjoy creating and savoring delicious meals. We
                            provide
                            curated recipes, personalized meal plans, and simple grocery lists to simplify your kitchen
                            experience. Our commitment is to empower you to easily create memorable meals, fostering
                            innovation and expanding our offerings.
                        </p>
                    </div>
                    <div class="col-lg-6 col-12">
                        <img src="https://wiodiet.com/cdn/shop/articles/meal-planning-and-preparation-tips-tips-for-planning-and-preparing-healthy-meals-262604.jpg?v=1707782959" alt="our-store" class="img-fluid rounded-4"
                            data-aos="fade-left" data-aos-duration="1300">
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white py-5">
            <div class="container py-5">
                <div class="row justify-content-center mb-5">
                    <div class="col-xl-7 col-lg-8 col-md-10 col-12">
                        <div class="text-center">
                            <h1 class="fw-bold pb-2 text-black display-5">Our Qualified Chefs</h1>
                            <p class="text-muted lead">Meet the minds behind EatsBuddy! Our talented trio blends
                                creativity and expertise to bring you the best in cooking convenience.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center justify-content-center g-4" id="chef-container">
                    <div class="col-lg-4 col-md-6 col-12" v-for="chef in chefs" :key="chef.name">
                        <div class="card bg-transparent border-0 rounded-0 text-center">
                            <img :src="chef.img" class="card-img-top rounded-circle osahan-profile-pic" :alt="chef.name"
                                data-aos="zoom-in-up" data-aos-duration="1000">
                            <div class="card-body">
                                <h5 class="card-title fw-bold">{{ chef.name }}</h5>
                                <p class="card-text text-danger mb-0">{{ chef.role }}</p>
                            </div>
                            <div
                                class="card-footer bg-transparent border-0 d-flex align-items-center justify-content-center gap-2">
                                <a v-for="social in chef.social" :key="social.platform" :href="social.url"
                                    class="bg-danger rounded-circle icon">
                                    <i :class="'ri-' + social.platform + '-fill ri-lg text-white'"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        chefs: [
          {
            name: "Tang Elite",
            role: "Developer & Designer",
            img: require('@/assets/img/person-e.png'),
            social: [
              { platform: "facebook", url: "#" },
              { platform: "twitter", url: "#" },
              { platform: "linkedin", url: "#" },
            ],
          },
          {
            name: "Tang Piseth",
            role: "Quality Overseer",
            img: require('@/assets/img/person-p.png'),
            social: [
              { platform: "facebook", url: "#" },
              { platform: "twitter", url: "#" },
              { platform: "linkedin", url: "#" },
            ],
          },
          {
            name: "Chum Veasna",
            role: "Presentation Specialist",
            img: require('@/assets/img/person-v.png'),
            social: [
              { platform: "facebook", url: "#" },
              { platform: "twitter", url: "#" },
              { platform: "linkedin", url: "#" },
            ],
          },
        ],
      };
    },
  };
  </script>
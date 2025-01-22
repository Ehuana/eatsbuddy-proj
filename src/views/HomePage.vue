<template>
  <div class="container-fluid text-center EG-Default p-0 bg-light">
    <!-- Uncomment this if you have a logo -->
    <!-- <img src="@/assets/logo.png" alt="Food Planner Logo" /> -->
    <section class="bg-light">
      <div class="headmast position-relative d-flex align-items-center justify-content-center text-white vh-100 mb-5">
        <img src="../assets/img/Food-1.png" class="position-absolute w-100 h-100" alt="" style="opacity: 0.6;">
        <div class="banner-txt position-relative z-3 text-center col-lg-8 col-md-10 col-sm-12 px-3" data-aos="flip-down"
          data-aos-duration="1300">
          <h2 class="display-4 py-3 fw-bolder fs-1" style="text-shadow: #000 1px 0 10px;">Welcome to</h2>
          <hr class="text-white mx-auto" style="width: 50%;">
          <h1 class="display-2 pb-3 fw-bold pt-3" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">EatsBuddy</h1>
          <hr class="text-white mx-auto" style="width: 50%;">
          <p class="fs-5 mt-4" style="text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);">“Simplify your meals, amplify your
            life.”</p>
        </div>
      </div>
    </section>

    <section class="bg-light">
      <div class="container">
        <div class="text-center mb-2">
          <h1 class="fw-bold display-5 text-black">Services We Offer</h1>
          <p class="text-muted lead">Explore our diverse range of services designed to make <br> your culinary experience
            seamless and enjoyable.</p>
        </div>
        <div class="col-12 d-flex flex-wrap">
          <div v-for="(item, index) in items" :key="index" class="col-4 p-5">
            <img :src="require(`@/assets/img/${item.imgSrc}`)" alt="" style="width: 150px; height: 150px;">
            <div class="card-body mt-3">
              <h1>{{ item.title }}</h1>
              <p class="card-text">{{ item.text }}</p>
              <router-link :to="item.destinationpage"><button class="btn btn-outline-success btn-simple btn-round" type="button">{{ item.text2
                  }}</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="fixed-bg-section text-white">
      <div class="container d-flex align-items-center justify-content-start h-100">
        <div class="content col-lg-6">
          <h2 class="display-5 fw-bold">Eat <span style="color: #17B97A;">Well</span>, Live <span
              style="color: #17B97A;">Better</span></h2>
          <p class="lead mt-3">
            <i class="fa-solid fa-bacon"></i><i class="fa-solid fa-bacon"></i><i class="fa-solid fa-bacon"></i>
          </p>
          <p class="lead mt-3">
            At EatsBuddy, we believe in making every meal smarter and every day simpler. Plan your meals and groceries
            effortlessly with our tools.
          </p>
          <div class="row mt-3">
            <div v-for="(att1, index) in abouts" :key="index" class="col-4 mb-4">
              <div class="card-body">
                <h3 class="card-title fw-bold fs-1" style="color: #17B97A;">{{ att1.title }}</h3>
                <p class="card-text">{{ att1.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us py-5 bg-light">
      <div class="container col-12 d-flex flex-wrap align-items-center">
        <!-- Left Side: Image -->
        <div class="col-6 text-center">
          <img src="../assets/img/WCU-2.png" alt="Why Choose Us" class="img-fluid rounded shadow-lg"
            style="width: 400px; height: 400px; object-fit: contain;">
        </div>
        <!-- Right Side: Text Content -->
        <div class="col-6">
          <h2 class="display-5 fw-bold mb-4 yellowtxt">Why Choose <span class="greengoods">EatsBuddy</span>?</h2>
          <ul class="list-unstyled fs-5">
            <li class="mb-3 d-flex align-items-start">
              <i class="fa-solid fa-check-circle text-success fs-3 me-3"></i>
              <span>Save time with seamless meal and grocery planning tools.</span>
            </li>
            <li class="mb-3 d-flex align-items-start">
              <i class="fa-solid fa-check-circle text-success fs-3 me-3"></i>
              <span>Enjoy personalized recipes tailored to your taste and needs.</span>
            </li>
            <li class="mb-3 d-flex align-items-start">
              <i class="fa-solid fa-check-circle text-success fs-3 me-3"></i>
              <span>Stay on budget with smart grocery lists and offers.</span>
            </li>
            <li class="mb-3 d-flex align-items-start">
              <i class="fa-solid fa-check-circle text-success fs-3 me-3"></i>
              <span>Join a thriving community of food lovers and planners.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Customer Rating Section -->
    <section class="customer-rating py-5 text-white text-center">
      <div class="container" data-aos="flip-down" data-aos-duration="1300">
        <!-- Tiny Description -->
        <h2 class="display-5 fw-bold mb-3">Customer Testimonials</h2>
        <p class="fs-5 mb-4">
          "We take pride in delivering exceptional service and experiences to our users. Here's what they think!"
        </p>

        <!-- Star Rating -->
        <div class="d-flex justify-content-center align-items-center mb-4">
          <i class="fa-solid fa-star text-warning fs-3 me-1"></i>
          <i class="fa-solid fa-star text-warning fs-3 me-1"></i>
          <i class="fa-solid fa-star text-warning fs-3 me-1"></i>
          <i class="fa-solid fa-star text-warning fs-3 me-1"></i>
          <i class="fa-solid fa-star-half-alt text-warning fs-3"></i>
        </div>

        <!-- Call to Action -->
        <p class="fs-5 mb-4">
          Rated <span class="fw-bold yellowtxt">4.8/5</span> by thousands of satisfied customers.
        </p>
        <router-link to="/about" class="btn btn-success px-4 py-2 fw-bold">Learn More</router-link>
      </div>
    </section>


    <!-- Newsletter Section -->
    <section class="py-5 bg-light border-bottom">
      <div class="container p-5">
        <!-- <h2 class="text-center mb-4 fw-bold">Special Offers For You</h2>
        <div class="row">
          <div v-for="(offer, index) in offers" :key="index" class="col-lg-4 col-md-6 mb-4">
            <div class="card shadow border-0 rounded">
              <img :src="require(`@/assets/img/${offer.imgSrc}`)" class="card-img-top p-3" :alt="offer.title" />
              <div class="card-body">
                <h5 class="card-title fw-bold">{{ offer.title }}</h5>
                <p class="card-text">{{ offer.description }}</p>
                <button class="btn btn-success w-100">{{ offer.cta }}</button>
              </div>
            </div>
          </div>
        </div> -->
        <div class="row justify-content-center">
          <div class="col-xl-9 col-lg-10 col-md-11 col-12">
            <div data-aos="flip-down" data-aos-duration="1300">
              <div class="row justify-content-center">
                <div class="col-xl-8 col-lg-9 col-md-10 col-12">
                  <div class="text-center mb-5">
                    <h1 class="fw-bold display-5 text-black">Newsletter Updates</h1>
                    <p class="text-muted lead">Enter your email address below to subscribe to our tasty newsletter</p>
                  </div>
                  <div class="input-group gap-3">
                    <input type="email" class="form-control rounded-pill py-3 px-3" placeholder="Your email address"
                      aria-label="Your email address" aria-describedby="Email">
                    <button class="btn btn-success rounded-pill py-2 px-4" type="button" id="Email">Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      items: [
        {
          imgSrc: 'Recipe-1.png',
          title: 'Recipes',
          text: 'Explore diverse recipes for every occasion, from quick dinners to gourmet meals',
          text2: 'View Recipes',
          destinationpage: '/recipes'
        },
        {
          imgSrc: 'MPlan-1.png',
          title: 'Meal Planner',
          text: 'Organize weekly menus and ensure balanced meals with our intuitive meal planner',
          text2: 'Create a Plan',
          destinationpage: '/meal-planner'
        },
        {
          imgSrc: 'Groc-1.png',
          title: 'Grocery List',
          text: 'Create smart grocery lists, add ingredients, and streamline your shopping experience',
          text2: 'Create a List',
          destinationpage: '/grocery-list'
        }
      ],
      abouts: [
        {
          title: '1.2K+',
          description: 'Members Active'
        },
        {
          title: '18K+',
          description: 'Happy Clients'
        },
        {
          title: '15+',
          description: 'Award Winning'
        }
      ],
      offers: [
        {
          imgSrc: 'Promo-1.png',
          title: '50% Off Meal Plans',
          description: 'Sign up today and enjoy half-price on all meal plans for your first month.',
          cta: 'Claim Offer'
        },
        {
          imgSrc: 'Promo-2.png',
          title: 'Free Recipe Book',
          description: 'Sign up today to also get a free recipe book delivered to your doorstep.',
          cta: 'Claim Offer'
        },
        {
          imgSrc: 'Promo-3.png',
          title: 'Grocery List Rewards',
          description: 'Earn points and get discounts on your favorite groceries with our rewards program.',
          cta: 'Learn More'
        }
      ]
    };
  }
};
</script>

<style>
.yellowtxt {
  color: #FFA33D;
}

.greengoods {
  color: #17B97A;
}

/* Fixed Background Section */
.fixed-bg-section {
  height: 60vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../assets/img/Food-2.jpg');
  /* Replace with your background image */
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
  align-items: center;
}

.fixed-bg-section .content {
  padding: 20px;
}

.fixed-bg-section h2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.fixed-bg-section p {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
}

/* Headmast Section Image Fade */
.headmast img {
  filter: brightness(80%);
}

/* Special Offers */
.card img {
  height: 200px;
  object-fit: contain;
}

.why-choose-us {
  background: #fff;
  /* Clean white background for contrast */
}

.why-choose-us h2 {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.why-choose-us ul li {
  color: #555;
  line-height: 1.6;
}

.why-choose-us img {
  object-fit: cover;
}

.customer-rating {
  background: url('../assets/img/Food-2.jpg') no-repeat center center fixed;
  background-size: cover;
  background-attachment: fixed;
  padding: 60px 0;
  position: relative;
}

.customer-rating::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  /* Dark overlay */
  z-index: 1;
}

.customer-rating .container {
  position: relative;
  z-index: 2;
}

.customer-rating h2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.customer-rating .fa-star,
.customer-rating .fa-star-half-alt {
  color: #ffc107;
  /* Star color */
}
</style>

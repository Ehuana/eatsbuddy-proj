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
                                    <li class="breadcrumb-item link-secondary active" aria-current="page">FAQ</li>
                                </ol>
                            </nav>
                            <h1 class="fw-bold pb-2 display-1 text-black">FAQ Page</h1>
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
                <div class="row align-items-center g-5 g-md-5 text-center">
                    <div class="col-12" data-aos="fade-right" data-aos-duration="1300">
                        <div class="mb-5">
                            <h2 class="fw-bold pb-2">Have any questions?</h2>
                            <p class="text-muted">Feel free to contact us for any inquiries or support. We're here to help!</p>
                        </div>
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                        aria-expanded="false" aria-controls="flush-collapseOne">
                                        How do I use the Recipe Viewer?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">To use the Recipe Viewer, simply browse through our collection of recipes, click on a recipe you like, and follow the step-by-step instructions provided.</div>
                                </div>
                            </div>
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false" aria-controls="flush-collapseTwo">
                                        How can I create a meal plan?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">
                                        Creating a meal plan is easy! Go to the Meal Planner section, select your desired recipes, and organize them into a weekly meal plan.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                        aria-expanded="false" aria-controls="flush-collapseThree">
                                        How do I generate a grocery list?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">
                                        To generate a grocery list, use our Grocery List Creation service. Add items manually or based on your selected recipes, and get a complete, organized list for shopping.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour"
                                        aria-expanded="false" aria-controls="flush-collapseFour">
                                        Is EatsBuddy available on mobile devices?
                                    </button>
                                </h2>
                                <div id="flush-collapseFour" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">
                                        Yes, EatsBuddy is fully responsive and can be accessed on both desktop and mobile devices for your convenience.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive"
                                        aria-expanded="false" aria-controls="flush-collapseFive">
                                        How can I contact customer support?
                                    </button>
                                </h2>
                                <div id="flush-collapseFive" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">You can reach our customer support via email at support@eatsbuddy.com or call us at +855-080-586-824.</div>
                                </div>
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
  name: 'FaqPage',
}
</script>

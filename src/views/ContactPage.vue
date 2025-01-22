<template>
    <div class="EG-Default">
        <!-- Breadcrumb section -->
        <div class="bg-white py-5">
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-xl-7 col-lg-8 col-md-10 col-12">
                        <div class="text-center" data-aos="fade-up" data-aos-duration="1300">
                            <nav>
                                <ol class="breadcrumb justify-content-center">
                                    <li class="breadcrumb-item"><a href="#" class="text-success">HOME</a></li>
                                    <li class="breadcrumb-item link-secondary active" aria-current="page">CONTACT</li>
                                </ol>
                            </nav>
                            <h1 class="fw-bold pb-2 display-1 text-black">Contact</h1>
                            <p class="text-muted lead">Reach out to us for any inquiries or support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Information section -->
        <div class="pb-5">
            <div class="container pb-5">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <ContactCard iconClass="fa-solid fa-location-dot" title="Physical Address"
                            content="AH1, Phnom Penh 120201" animation="flip-left" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <ContactCard iconClass="fa-solid fa-paper-plane" title="Email Address"
                            content="info@eatsbuddy.com" animation="flip-right" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <ContactCard iconClass="fa-solid fa-phone" title="Phone Numbers" content="+855 080 586 824"
                            animation="flip-left" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Message section -->
        <div class="py-5 bg-light">
            <div class="container py-5">
                <div class="row g-5 align-items-center">
                    <div class="col-lg-6 col-12" data-aos="fade-right" data-aos-duration="1300">
                        <div class="mb-5">
                            <h2 class="fw-bold pb-2">Have any questions?</h2>
                            <p class="text-muted">Feel free to contact us for any inquiries or support. We're here to
                                help!</p>
                        </div>
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                        aria-expanded="false" aria-controls="flush-collapseOne">
                                        How can I reach customer support?
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">You can reach our customer support via email
                                        at info@eatsbuddy.com or call us at +855 080 586 824.</div>
                                </div>
                            </div>
                            <div class="accordion-item rounded-3 border-0 shadow-sm mb-4">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false" aria-controls="flush-collapseTwo">
                                        What are your business hours?
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">
                                        Our business hours are Monday to Friday, 9 AM to 6 PM EST.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item rounded-3 border-0 shadow-sm">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed bg-white shadow-none rounded-3 text-dark"
                                        type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                        aria-expanded="false" aria-controls="flush-collapseThree">
                                        Where is your office located?
                                    </button>
                                </h2>
                                <div id="flush-collapseThree" class="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body border-top">
                                        Our office is located at 123 Main Street, Richmond Hill, New York 11419.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12">
                        <div class="bg-white rounded-5 shadow p-5" data-aos="flip-left" data-aos-duration="1300">
                            <div class="mb-5">
                                <h1 class="fw-bold">Get In Touch</h1>
                                <p class="text-muted">Please fill out the form below and we'll get back to you as soon
                                    as possible.</p>
                            </div>
                            <form class="row g-4" @submit.prevent="handleSubmit">
                                <div class="col-12">
                                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }"
                                        v-model="formData.name" id="name" placeholder="Enter your name">
                                    <div class="invalid-feedback" v-if="errors.name">
                                        {{ errors.name }}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                                        v-model="formData.email" id="email" placeholder="name@example.com">
                                    <div class="invalid-feedback" v-if="errors.email">
                                        {{ errors.email }}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.subject }"
                                        v-model="formData.subject" id="subject" placeholder="Enter your subject">
                                    <div class="invalid-feedback" v-if="errors.subject">
                                        {{ errors.subject }}
                                    </div>
                                </div>
                                <div class="col-12">
                                    <textarea class="form-control" :class="{ 'is-invalid': errors.message }"
                                        v-model="formData.message" id="message" rows="6"
                                        placeholder="Enter your comment"></textarea>
                                    <div class="invalid-feedback" v-if="errors.message">
                                        {{ errors.message }}
                                    </div>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-success btn-lg">Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Success Modal -->
        <div class="modal fade" id="successModal" tabindex="-1" ref="successModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Message Sent Successfully!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Thank you for contacting us. We will get back to you soon!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal } from 'bootstrap';
import ContactCard from '../components/ContactCard.vue';

export default {
    components: {
        ContactCard,
    },
    data() {
        return {
            formData: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            errors: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
            modal: null
        }
    },
    mounted() {
        AOS.init();
        this.modal = new Modal(this.$refs.successModal);
    },
    methods: {
        validateForm() {
            let isValid = true;
            this.errors = {
                name: '',
                email: '',
                subject: '',
                message: ''
            };

            if (!this.formData.name.trim()) {
                this.errors.name = 'Name is required';
                isValid = false;
            }

            if (!this.formData.email.trim()) {
                this.errors.email = 'Email is required';
                isValid = false;
            } else if (!this.validateEmail(this.formData.email)) {
                this.errors.email = 'Please enter a valid email address';
                isValid = false;
            }

            if (!this.formData.subject.trim()) {
                this.errors.subject = 'Subject is required';
                isValid = false;
            }

            if (!this.formData.message.trim()) {
                this.errors.message = 'Message is required';
                isValid = false;
            }

            return isValid;
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        handleSubmit() {
            if (this.validateForm()) {
                // Here you would typically send the data to a server
                console.log('Form submitted:', this.formData);

                // Show success modal
                this.modal.show();

                // Reset form
                this.formData = {
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                };
            }
        }
    }
};
</script>

<style scoped>
.shadow-none {
    box-shadow: none !important;
}

.modal-content {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
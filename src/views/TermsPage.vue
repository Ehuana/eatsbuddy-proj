<template>
  <div class="terms-page">
    <!-- Header Section -->
    <section class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="header-content text-center">
              <i class="ri-file-text-line header-icon"></i>
              <h1 class="page-title">Terms of Service</h1>
              <p class="page-subtitle">Terms and conditions for using EatsBuddy</p>
              <div class="breadcrumb-nav">
                <router-link to="/" class="breadcrumb-link">Home</router-link>
                <span class="breadcrumb-separator">•</span>
                <span class="breadcrumb-current">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terms Content Section -->
    <section class="terms-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-8">
            <div class="content-wrapper">
              <!-- Last Updated -->
              <div class="update-notice">
                <i class="ri-calendar-line me-2"></i>
                <span>Last updated: {{ lastUpdated }}</span>
              </div>

              <!-- Introduction -->
              <div class="section-block">
                <h2>Agreement to Terms</h2>
                <p>
                  Welcome to EatsBuddy! These Terms of Service ("Terms") govern your use of our meal planning and recipe application. By accessing or using EatsBuddy, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our service.
                </p>
                <div class="highlight-box">
                  <i class="ri-information-line"></i>
                  <p><strong>Important:</strong> Please read these Terms carefully before using our service. Your continued use of EatsBuddy constitutes acceptance of these Terms.</p>
                </div>
              </div>

              <!-- Service Description -->
              <div class="section-block">
                <h2>Description of Service</h2>
                <p>EatsBuddy is a meal planning and recipe management application that provides:</p>
                <ul class="terms-list">
                  <li>Access to a database of recipes and cooking instructions</li>
                  <li>Meal planning and calendar functionality</li>
                  <li>Grocery list generation and management</li>
                  <li>User account creation and profile management</li>
                  <li>Recipe saving and organization features</li>
                  <li>Nutritional information and dietary preferences</li>
                </ul>
              </div>

              <!-- User Accounts -->
              <div class="section-block">
                <h2>User Accounts and Registration</h2>
                
                <h3>Account Creation</h3>
                <p>To access certain features of EatsBuddy, you must create an account. When creating an account, you agree to:</p>
                <ul class="terms-list">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>

                <h3>Account Responsibilities</h3>
                <p>You are responsible for:</p>
                <ul class="terms-list">
                  <li>Keeping your login information confidential</li>
                  <li>All activities that occur under your account</li>
                  <li>Ensuring your account information remains current</li>
                  <li>Complying with all applicable laws and regulations</li>
                </ul>
              </div>

              <!-- Acceptable Use -->
              <div class="section-block">
                <h2>Acceptable Use Policy</h2>
                <p>When using EatsBuddy, you agree not to:</p>
                
                <div class="prohibited-activities">
                  <div class="prohibited-item">
                    <i class="ri-close-circle-line"></i>
                    <div>
                      <strong>Violate Laws:</strong> Use the service for any illegal or unauthorized purpose
                    </div>
                  </div>
                  <div class="prohibited-item">
                    <i class="ri-close-circle-line"></i>
                    <div>
                      <strong>Harm Others:</strong> Harass, abuse, or harm other users
                    </div>
                  </div>
                  <div class="prohibited-item">
                    <i class="ri-close-circle-line"></i>
                    <div>
                      <strong>Spam or Abuse:</strong> Send unsolicited communications or abuse the service
                    </div>
                  </div>
                  <div class="prohibited-item">
                    <i class="ri-close-circle-line"></i>
                    <div>
                      <strong>Intellectual Property:</strong> Infringe on copyrights, trademarks, or other IP rights
                    </div>
                  </div>
                  <div class="prohibited-item">
                    <i class="ri-close-circle-line"></i>
                    <div>
                      <strong>System Interference:</strong> Attempt to disrupt or interfere with our systems
                    </div>
                  </div>
                  <div class="prohibited-item">
                    <i class="ri-close-circle-line"></i>
                    <div>
                      <strong>Unauthorized Access:</strong> Attempt to gain unauthorized access to accounts or systems
                    </div>
                  </div>
                </div>
              </div>

              <!-- Content and Intellectual Property -->
              <div class="section-block">
                <h2>Content and Intellectual Property</h2>
                
                <h3>Our Content</h3>
                <p>All content provided by EatsBuddy, including recipes, images, text, and software, is protected by intellectual property laws. You may use our content for personal, non-commercial purposes only.</p>

                <h3>User-Generated Content</h3>
                <p>When you submit content to EatsBuddy (such as reviews, meal plans, or recipes), you:</p>
                <ul class="terms-list">
                  <li>Retain ownership of your original content</li>
                  <li>Grant us a license to use, display, and distribute your content</li>
                  <li>Represent that you have the right to share the content</li>
                  <li>Agree that your content does not violate any laws or rights</li>
                </ul>

                <h3>Third-Party Content</h3>
                <p>EatsBuddy may include content from third-party sources. We do not endorse or assume responsibility for third-party content, and your use of such content is at your own risk.</p>
              </div>

              <!-- Privacy and Data -->
              <div class="section-block">
                <h2>Privacy and Data Protection</h2>
                <p>
                  Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using EatsBuddy, you consent to the collection and use of your information as described in our Privacy Policy.
                </p>
                <div class="privacy-link-box m-auto col-6">
                  
                  <div>
                    <i class="ri-shield-check-line"></i> <strong>Privacy Policy</strong>
                    <p>Learn more about how we protect your data</p>
                    <router-link to="/privacy" class="privacy-link">View Privacy Policy →</router-link>
                  </div>
                </div>
              </div>

              <!-- Service Availability -->
              <div class="section-block">
                <h2>Service Availability</h2>
                <p>
                  We strive to provide reliable service, but we cannot guarantee that EatsBuddy will be available 100% of the time. Service may be interrupted for maintenance, updates, or due to circumstances beyond our control.
                </p>
                <p>We reserve the right to:</p>
                <ul class="terms-list">
                  <li>Modify or discontinue any part of the service</li>
                  <li>Suspend or terminate accounts that violate these Terms</li>
                  <li>Update these Terms from time to time</li>
                  <li>Implement new features or remove existing ones</li>
                </ul>
              </div>

              <!-- Disclaimers -->
              <div class="section-block">
                <h2>Disclaimers and Limitations</h2>
                
                <h3>Health and Safety</h3>
                <div class="warning-box">
                  <div>
                  <i class="ri-alert-line"></i> <strong>Important Health Notice:</strong>
                    <p>EatsBuddy provides general cooking and meal planning information. We are not responsible for food safety, dietary suitability, or health outcomes. Always verify food safety practices and consult healthcare professionals for dietary advice.</p>
                  </div>
                </div>

                <h3>Service Disclaimer</h3>
                <p>EatsBuddy is provided "as is" without warranties of any kind. We disclaim all warranties, express or implied, including but not limited to:</p>
                <ul class="terms-list">
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Accuracy, completeness, or reliability of content</li>
                  <li>Uninterrupted or error-free service</li>
                  <li>Security of data transmission or storage</li>
                </ul>
              </div>

              <!-- Limitation of Liability -->
              <div class="section-block">
                <h2>Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, EatsBuddy and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, profits, or business interruption.
                </p>
                <p>
                  Our total liability for any claims arising from your use of EatsBuddy shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </div>

              <!-- Termination -->
              <div class="section-block">
                <h2>Termination</h2>
                <p>You may terminate your account at any time by contacting us or using the account deletion feature in your profile settings.</p>
                <p>We may suspend or terminate your account if you:</p>
                <ul class="terms-list">
                  <li>Violate these Terms of Service</li>
                  <li>Engage in fraudulent or harmful activities</li>
                  <li>Fail to pay any applicable fees</li>
                  <li>Request account deletion</li>
                </ul>
                <p>Upon termination, your access to EatsBuddy will cease, and we may delete your account data in accordance with our Privacy Policy.</p>
              </div>

              <!-- Governing Law -->
              <div class="section-block">
                <h2>Governing Law and Disputes</h2>
                <p>
                  These Terms are governed by the laws of Cambodia. Any disputes arising from these Terms or your use of EatsBuddy will be resolved through binding arbitration or in the courts of Cambodia.
                </p>
              </div>

              <!-- Changes to Terms -->
              <div class="section-block">
                <h2>Changes to Terms</h2>
                <p>
                  We may update these Terms from time to time. When we make changes, we will post the updated Terms on this page and update the "Last updated" date. Continued use of EatsBuddy after changes constitutes acceptance of the new Terms.
                </p>
              </div>

              <!-- Contact Information -->
              <div class="section-block contact-section">
                <h2>Contact Us</h2>
                <p>If you have questions about these Terms of Service, please contact us:</p>
                <div class="contact-info">
                  <div class="contact-item">
                    <i class="ri-mail-line"></i>
                    <div>
                      <strong>Email:</strong>
                      <a href="mailto:legal@eatsbuddy.com">legal@eatsbuddy.com</a>
                    </div>
                  </div>
                  <div class="contact-item">
                    <i class="ri-map-pin-line"></i>
                    <div>
                      <strong>Address:</strong>
                      <span>Phnom Penh 120201, Cambodia</span>
                    </div>
                  </div>
                  <div class="contact-item">
                    <i class="ri-phone-line"></i>
                    <div>
                      <strong>Phone:</strong>
                      <a href="tel:+85508058682">+855 080 586 824</a>
                    </div>
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
  name: 'TermsPage',
  data() {
    return {
      lastUpdated: 'June 21, 2025'
    };
  },
  mounted() {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.terms-page {
  padding-top: 80px;
}

/* Header Section */
.page-header {
  background: linear-gradient(135deg, #17B97A 0%, #0e8358 100%);
  color: white;
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="20" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.header-content {
  position: relative;
  z-index: 2;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.breadcrumb-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: white;
}

.breadcrumb-separator {
  opacity: 0.6;
}

.breadcrumb-current {
  color: white;
  font-weight: 500;
}

/* Content Section */
.terms-content {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.content-wrapper {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.update-notice {
  background-color: #e8f5e8;
  color: #2d5a2d;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  font-weight: 500;
}

.section-block {
  margin-bottom: 2.5rem;
}

.section-block h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #17B97A;
  display: inline-block;
}

.section-block h3 {
  color: #34495e;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 1.5rem 0 0.8rem 0;
}

.section-block p {
  color: #5a6c7d;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.terms-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.terms-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #5a6c7d;
  line-height: 1.6;
}

.terms-list li::before {
  content: '•';
  color: #17B97A;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
  line-height: 1.6;
}

.highlight-box {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.highlight-box i {
  color: #856404;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.highlight-box p {
  margin: 0;
  color: #856404;
}

.warning-box {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.warning-box i {
  color: #721c24;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.warning-box p {
  margin: 0;
  color: #721c24;
}

.privacy-link-box {
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.privacy-link-box i {
  color: #0c5460;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.privacy-link-box p {
  margin: 0.5rem 0;
  color: #0c5460;
}

.privacy-link {
  color: #17B97A;
  text-decoration: none;
  font-weight: 500;
}

.privacy-link:hover {
  text-decoration: underline;
}

.prohibited-activities {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
}

.prohibited-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #dc3545;
}

.prohibited-item i {
  color: #dc3545;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.prohibited-item strong {
  color: #2c3e50;
}

.contact-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact-item i {
  color: #17B97A;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.contact-item a {
  color: #17B97A;
  text-decoration: none;
}

.contact-item a:hover {
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.2rem;
  }
  
  .page-subtitle {
    font-size: 1rem;
  }
  
  .content-wrapper {
    padding: 2rem 1.5rem;
  }
  
  .prohibited-activities {
    grid-template-columns: 1fr;
  }
  
  .breadcrumb-nav {
    flex-direction: column;
    gap: 0.25rem;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 1.8rem;
  }
  
  .content-wrapper {
    padding: 1.5rem 1rem;
  }
  
  .section-block h2 {
    font-size: 1.5rem;
  }
  
  .highlight-box,
  .warning-box,
  .privacy-link-box {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .prohibited-item {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

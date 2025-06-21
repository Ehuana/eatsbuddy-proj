<template>
  <div class="privacy-page">
    <!-- Header Section -->
    <section class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="header-content text-center">
              <i class="ri-shield-check-line header-icon"></i>
              <h1 class="page-title">Privacy Policy</h1>
              <p class="page-subtitle">How we collect, use, and protect your information</p>
              <div class="breadcrumb-nav">
                <router-link to="/" class="breadcrumb-link">Home</router-link>
                <span class="breadcrumb-separator">•</span>
                <span class="breadcrumb-current">Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Privacy Content Section -->
    <section class="privacy-content">
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
                <h2>Introduction</h2>
                <p>
                  Welcome to EatsBuddy! This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our meal planning and recipe application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                </p>
              </div>

              <!-- Information We Collect -->
              <div class="section-block">
                <h2>Information We Collect</h2>
                
                <h3>Personal Information</h3>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul class="policy-list">
                  <li>Register for an account</li>
                  <li>Create meal plans or save recipes</li>
                  <li>Contact us for support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in surveys or promotions</li>
                </ul>

                <p>This information may include:</p>
                <ul class="policy-list">
                  <li>Name and email address</li>
                  <li>Profile information and preferences</li>
                  <li>Dietary restrictions and preferences</li>
                  <li>Meal plans and grocery lists</li>
                  <li>Communication preferences</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <p>When you use our application, we may automatically collect certain information about your device and usage patterns:</p>
                <ul class="policy-list">
                  <li>Device information (type, operating system, browser)</li>
                  <li>IP address and location data</li>
                  <li>Usage statistics and app performance data</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <!-- How We Use Information -->
              <div class="section-block">
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul class="policy-list">
                  <li>Provide and maintain our services</li>
                  <li>Create and manage your account</li>
                  <li>Personalize your experience and recommendations</li>
                  <li>Send you updates, newsletters, and promotional materials</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to improve our service</li>
                  <li>Detect and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <!-- Information Sharing -->
              <div class="section-block">
                <h2>How We Share Your Information</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:</p>
                
                <h3>Service Providers</h3>
                <p>We may share your information with trusted third-party service providers who assist us in operating our application, conducting our business, or serving our users.</p>

                <h3>Legal Requirements</h3>
                <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities.</p>

                <h3>Business Transfers</h3>
                <p>In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</p>
              </div>

              <!-- Data Security -->
              <div class="section-block">
                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                </p>
                <div class="security-features">
                  <div class="security-item">
                    <i class="ri-lock-line"></i>
                    <span>Encrypted data transmission</span>
                  </div>
                  <div class="security-item">
                    <i class="ri-shield-check-line"></i>
                    <span>Secure data storage</span>
                  </div>
                  <div class="security-item">
                    <i class="ri-user-settings-line"></i>
                    <span>Access controls and authentication</span>
                  </div>
                </div>
              </div>

              <!-- Your Rights -->
              <div class="section-block">
                <h2>Your Privacy Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul class="policy-list">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent where processing is based on consent</li>
                </ul>
              </div>

              <!-- Cookies -->
              <div class="section-block">
                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our application. Cookies are small data files stored on your device that help us provide personalized content and analyze usage patterns.
                </p>
                <p>You can control cookie settings through your browser preferences, but please note that disabling cookies may affect the functionality of our application.</p>
              </div>

              <!-- Children's Privacy -->
              <div class="section-block">
                <h2>Children's Privacy</h2>
                <p>
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </div>

              <!-- Changes to Policy -->
              <div class="section-block">
                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>

              <!-- Contact Information -->
              <div class="section-block contact-section">
                <h2>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div class="contact-info">
                  <div class="contact-item">
                    <i class="ri-mail-line"></i>
                    <div>
                      <strong>Email:</strong>
                      <a href="mailto:privacy@eatsbuddy.com">privacy@eatsbuddy.com</a>
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
  name: 'PrivacyPage',
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
.privacy-page {
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
.privacy-content {
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

.policy-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.policy-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #5a6c7d;
  line-height: 1.6;
}

.policy-list li::before {
  content: '•';
  color: #17B97A;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
  line-height: 1.6;
}

.security-features {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f8f9fa;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  flex: 1;
  min-width: 200px;
}

.security-item i {
  color: #17B97A;
  font-size: 1.2rem;
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
  
  .security-features {
    flex-direction: column;
  }
  
  .security-item {
    min-width: auto;
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
}
</style>

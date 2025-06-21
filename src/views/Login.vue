<template>
  <div class="auth-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="auth-card">
            <div class="auth-header text-center mb-4">
              <i class="ri-restaurant-2-line auth-logo"></i>
              <h2 class="auth-title">Food Planner</h2>
              <p class="auth-subtitle">Plan your meals, simplify your life</p>
            </div>

            <!-- Tab Navigation -->
            <div class="auth-tabs mb-4">
              <div class="row g-0">
                <div class="col-6">
                  <button
                    @click="activeTab = 'login'"
                    :class="['auth-tab-btn', { active: activeTab === 'login' }]"
                  >
                    <i class="ri-login-circle-line me-2"></i>Login
                  </button>
                </div>
                <div class="col-6">
                  <button
                    @click="activeTab = 'register'"
                    :class="['auth-tab-btn', { active: activeTab === 'register' }]"
                  >
                    <i class="ri-user-add-line me-2"></i>Register
                  </button>
                </div>
              </div>
            </div>

            <!-- Error Alert -->
            <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
              <i class="ri-error-warning-line me-2"></i>{{ error }}
              <button 
                type="button" 
                class="btn-close" 
                @click="error = ''"
                aria-label="Close"
              ></button>
            </div>

            <!-- Login Form -->
            <form v-if="activeTab === 'login'" @submit.prevent="submitForm" class="auth-form">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="loginEmail"
                  placeholder="name@example.com"
                  v-model="email"
                  :class="{ 'is-invalid': emailError }"
                  required
                  @input="validateEmail"
                >
                <label for="loginEmail"><i class="ri-mail-line me-2"></i>Email address</label>
                <div class="invalid-feedback">{{ emailError }}</div>
              </div>

              <div class="form-floating mb-3 password-field">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="loginPassword"
                  placeholder="Password"
                  v-model="password"
                  :class="{ 'is-invalid': passwordError }"
                  required
                  @input="validatePassword"
                >
                <label for="loginPassword"><i class="ri-lock-2-line me-2"></i>Password</label>
                <button 
                  type="button" 
                  class="btn btn-link password-toggle" 
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
                </button>
                <div class="invalid-feedback">{{ passwordError }}</div>
              </div>

              <div class="d-flex justify-content-between mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rememberMe" v-model="rememberMe">
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <div>
                  <a href="#" class="forgot-password">Forgot password?</a>
                </div>
              </div>

              <button type="submit" class="btn btn-primary w-100 btn-lg" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                Log In
              </button>

              <div class="social-login-divider">
                <span>or continue with</span>
              </div>

              <div class="social-login-buttons">
                <button type="button" class="btn btn-outline-secondary social-btn">
                  <i class="ri-google-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-secondary social-btn">
                  <i class="ri-facebook-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-secondary social-btn">
                  <i class="ri-apple-fill"></i>
                </button>
              </div>
            </form>

            <!-- Register Form -->
            <form v-else @submit.prevent="submitForm" class="auth-form">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="registerEmail"
                  placeholder="name@example.com"
                  v-model="email"
                  :class="{ 'is-invalid': emailError }"
                  required
                  @input="validateEmail"
                >
                <label for="registerEmail"><i class="ri-mail-line me-2"></i>Email address</label>
                <div class="invalid-feedback">{{ emailError }}</div>
              </div>

              <div class="form-floating mb-3 password-field">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="registerPassword"
                  placeholder="Password"
                  v-model="password"
                  :class="{ 'is-invalid': passwordError }"
                  required
                  @input="validatePassword"
                >
                <label for="registerPassword"><i class="ri-lock-2-line me-2"></i>Password</label>
                <button 
                  type="button" 
                  class="btn btn-link password-toggle" 
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
                </button>
                <div class="invalid-feedback">{{ passwordError }}</div>
              </div>

              <div class="form-floating mb-4 password-field">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  v-model="confirmPassword"
                  :class="{ 'is-invalid': confirmPasswordError }"
                  required
                  @input="validateConfirmPassword"
                >
                <label for="confirmPassword"><i class="ri-shield-check-line me-2"></i>Confirm Password</label>
                <button 
                  type="button" 
                  class="btn btn-link password-toggle" 
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"></i>
                </button>
                <div class="invalid-feedback">{{ confirmPasswordError }}</div>
              </div>

              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="agreeTerms" v-model="agreeTerms">
                <label class="form-check-label" for="agreeTerms">
                  I agree to the <a href="#" class="terms-link">Terms of Service</a> and <a href="#" class="terms-link">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" class="btn btn-primary w-100 btn-lg" :disabled="loading || !agreeTerms">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                Create Account
              </button>

              <div class="social-login-divider">
                <span>or register with</span>
              </div>

              <div class="social-login-buttons">
                <button type="button" class="btn btn-outline-secondary social-btn">
                  <i class="ri-google-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-secondary social-btn">
                  <i class="ri-facebook-fill"></i>
                </button>
                <button type="button" class="btn btn-outline-secondary social-btn">
                  <i class="ri-apple-fill"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

export default {
  setup() {
    const router = useRouter();
    const { register, login } = useAuth();
    
    const activeTab = ref('login');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const error = ref('');
    const loading = ref(false);
    const showPassword = ref(false);
    const rememberMe = ref(false);
    const agreeTerms = ref(false);
    
    const emailError = ref('');
    const passwordError = ref('');
    const confirmPasswordError = ref('');

    const isLogin = computed(() => activeTab.value === 'login');
    
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value) {
        emailError.value = 'Email is required';
      } else if (!emailRegex.test(email.value)) {
        emailError.value = 'Please enter a valid email address';
      } else {
        emailError.value = '';
      }
    };
    
    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = 'Password is required';
      } else if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters';
      } else {
        passwordError.value = '';
      }
    };
    
    const validateConfirmPassword = () => {
      if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = 'Passwords do not match';
      } else {
        confirmPasswordError.value = '';
      }
    };
    
    const submitForm = async () => {
      // Validate form
      validateEmail();
      validatePassword();
      if (!isLogin.value) {
        validateConfirmPassword();
      }
      
      // Check for validation errors
      if (emailError.value || passwordError.value || (!isLogin.value && confirmPasswordError.value)) {
        return;
      }
      
      loading.value = true;
      error.value = '';
      
      try {
        if (isLogin.value) {
          await login(email.value, password.value);
        } else {
          await register(email.value, password.value);
        }
        router.push('/');
      } catch (err) {
        // Handle Firebase error messages more user-friendly
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          error.value = 'Invalid email or password';
        } else if (err.code === 'auth/email-already-in-use') {
          error.value = 'Email already in use. Please try logging in.';
        } else if (err.code === 'auth/weak-password') {
          error.value = 'Password is too weak. Choose a stronger password.';
        } else {
          error.value = err.message;
        }
      } finally {
        loading.value = false;
      }
    };
    
    return {
      activeTab,
      email,
      password,
      confirmPassword,
      rememberMe,
      agreeTerms,
      error,
      loading,
      showPassword,
      emailError,
      passwordError,
      confirmPasswordError,
      isLogin,
      submitForm,
      validateEmail,
      validatePassword,
      validateConfirmPassword
    };
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  display: flex;
  align-items: center;
}

.auth-card {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  transition: all 0.3s ease;
}

.auth-logo {
  font-size: 48px;
  color: #17B97A;
  margin-bottom: 10px;
}

.auth-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
}

.auth-subtitle {
  color: #777;
  font-size: 16px;
}

.auth-tabs {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eee;
}

.auth-tab-btn {
  width: 100%;
  background: #f8f9fa;
  border: none;
  padding: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #666;
}

.auth-tab-btn.active {
  background-color: #17B97A;
  color: white;
  font-weight: 500;
}

.auth-form {
  animation: fadeIn 0.5s;
}

.form-floating label {
  color: #6c757d;
}

.password-field {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  color: #6c757d;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
}

.forgot-password {
  color: #17B97A;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.forgot-password:hover {
  color: #0e8358;
  text-decoration: underline;
}

.social-login-divider {
  position: relative;
  text-align: center;
  margin: 25px 0;
}

.social-login-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e0e0e0;
}

.social-login-divider span {
  position: relative;
  background-color: white;
  padding: 0 15px;
  color: #777;
  font-size: 14px;
}

.social-login-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  padding: 0;
}

.btn-primary {
  background-color: #17B97A;
  border-color: #17B97A;
}

.btn-primary:hover, .btn-primary:focus {
  background-color: #0e8358;
  border-color: #0e8358;
}

.btn-primary:disabled {
  background-color: #17B97A;
  border-color: #17B97A;
  opacity: 0.7;
}

.terms-link {
  color: #17B97A;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .auth-card {
    padding: 25px;
  }
}
</style>

<template>
  <div class="profile-page EG-Default">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="profile-header">
            <h1 class="page-title">My Profile</h1>
            <p class="text-muted mb-4">Manage your account settings and profile information</p>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading your profile...</p>
          </div>          <!-- Content -->
          <div v-else class="card shadow-sm border-0 rounded-3 overflow-hidden">
            <!-- Success/Error Messages -->
            <div v-if="message.text" class="alert" :class="message.type === 'success' ? 'alert-success' : 'alert-danger'" role="alert">
              <div class="d-flex align-items-center">
                <i :class="message.type === 'success' ? 'ri-check-circle-line' : 'ri-error-warning-line'" class="me-2"></i>
                {{ message.text }}
              </div>
            </div>
            
            <div class="card-body p-0">
              <div class="row g-0">
                <!-- Left sidebar with avatar and actions -->
                <div class="col-md-3 bg-light border-end">
                  <div class="p-4 text-center">
                    <div class="user-avatar mx-auto mb-3">
                      {{ getUserInitials() }}
                    </div>
                    
                    <h5 class="mb-1">{{ getUserDisplayName() }}</h5>
                    <p class="text-muted small">{{ user.email }}</p>
                      <div class="profile-stats">
                      <div class="stat-item">
                        <div class="stat-value">{{ mealPlansCount }}</div>
                        <div class="stat-label">Meal Plans</div>
                      </div>
                    </div>
                      <div class="mt-4">
                      <button @click="handleLogout" class="btn btn-outline-danger btn-sm w-100">
                        <i class="ri-logout-box-r-line me-1"></i> Log Out
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Right content area with tabs -->
                <div class="col-md-9">
                  <div class="p-4">
                    <!-- Profile Tabs -->
                    <ul class="nav nav-tabs mb-4" id="profileTabs" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="account-tab" data-bs-toggle="tab" data-bs-target="#account" 
                          type="button" role="tab" aria-controls="account" aria-selected="true">
                          Account Settings
                        </button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link" id="preferences-tab" data-bs-toggle="tab" data-bs-target="#preferences" 
                          type="button" role="tab" aria-controls="preferences" aria-selected="false">
                          Preferences
                        </button>
                      </li>
                    </ul>
                    
                    <!-- Tab Content -->
                    <div class="tab-content" id="profileTabContent">
                      <!-- Account Settings Tab -->
                      <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                        <h5 class="mb-3">Account Information</h5>
                        
                        <form @submit.prevent="updateProfile">
                          <div class="mb-3">
                            <label for="displayName" class="form-label">Display Name</label>
                            <input 
                              type="text" 
                              class="form-control" 
                              id="displayName" 
                              v-model="profileForm.displayName"
                              placeholder="Your display name">
                          </div>
                          
                          <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input 
                              type="email" 
                              class="form-control" 
                              id="email" 
                              v-model="profileForm.email"
                              disabled>
                            <div class="form-text">Email cannot be changed</div>
                          </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" class="btn btn-success" :disabled="!hasChanges || savingProfile">
                              <span v-if="savingProfile" class="spinner-border spinner-border-sm me-2" role="status"></span>
                              <i v-else class="ri-save-line me-1"></i> 
                              {{ savingProfile ? 'Saving...' : 'Save Changes' }}
                            </button>
                          </div>
                        </form>
                        
                        <hr class="my-4">
                        
                        <h5 class="mb-3">Change Password</h5>
                        <form @submit.prevent="changePassword">
                          <div class="mb-3">
                            <label for="currentPassword" class="form-label">Current Password</label>
                            <input 
                              type="password" 
                              class="form-control" 
                              id="currentPassword"
                              v-model="passwordForm.currentPassword">
                          </div>
                          
                          <div class="mb-3">
                            <label for="newPassword" class="form-label">New Password</label>
                            <input 
                              type="password" 
                              class="form-control" 
                              id="newPassword"
                              v-model="passwordForm.newPassword">
                          </div>
                          
                          <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm New Password</label>
                            <input 
                              type="password" 
                              class="form-control" 
                              id="confirmPassword"
                              v-model="passwordForm.confirmPassword">
                            <div class="form-text" v-if="passwordMismatch">Passwords do not match</div>
                          </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" class="btn btn-primary" :disabled="!canChangePassword || changingPassword">
                              <span v-if="changingPassword" class="spinner-border spinner-border-sm me-2" role="status"></span>
                              <i v-else class="ri-lock-password-line me-1"></i> 
                              {{ changingPassword ? 'Changing...' : 'Change Password' }}
                            </button>
                          </div>
                        </form>
                      </div>
                      
                      <!-- Preferences Tab -->
                      <div class="tab-pane fade" id="preferences" role="tabpanel" aria-labelledby="preferences-tab">
                        <h5 class="mb-3">Recipe Preferences</h5>
                        
                        <div class="mb-3">
                          <label class="form-label">Dietary Preferences</label>
                          <div class="d-flex flex-wrap gap-2">
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="vegetarian" v-model="preferences.vegetarian">
                              <label class="form-check-label" for="vegetarian">Vegetarian</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="vegan" v-model="preferences.vegan">
                              <label class="form-check-label" for="vegan">Vegan</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="glutenFree" v-model="preferences.glutenFree">
                              <label class="form-check-label" for="glutenFree">Gluten Free</label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input class="form-check-input" type="checkbox" id="dairyFree" v-model="preferences.dairyFree">
                              <label class="form-check-label" for="dairyFree">Dairy Free</label>
                            </div>
                          </div>
                        </div>
                        
                        <div class="mb-3">
                          <label for="servingSize" class="form-label">Default Serving Size</label>
                          <select class="form-select" id="servingSize" v-model="preferences.servingSize">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                          <button class="btn btn-success" @click="savePreferences" :disabled="savingPreferences">
                            <span v-if="savingPreferences" class="spinner-border spinner-border-sm me-2" role="status"></span>
                            <i v-else class="ri-save-line me-1"></i> 
                            {{ savingPreferences ? 'Saving...' : 'Save Preferences' }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useFirestore } from '@/composables/useFirestore';
import { useRouter } from 'vue-router';
import { useToast } from '@/composables/useToast';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default {
  name: 'ProfilePage',  
  setup() {
    const { user, logout } = useAuth();
    const { queryByField, updateDocument, addToCollection, getCollection } = useFirestore();
    const router = useRouter();
    const { showToast } = useToast();    const loading = ref(true);
    const savingProfile = ref(false);
    const changingPassword = ref(false);
    const savingPreferences = ref(false);
    const mealPlansCount = ref(0);
    const message = ref({ text: '', type: '' });
    
    // Form data
    const profileForm = reactive({
      displayName: '',
      email: ''
    });
    
    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    const preferences = reactive({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      servingSize: '2'
    });
    
    // Computed properties
    const hasChanges = computed(() => {
      // Check if displayName has changed
      const originalName = getUserDisplayName();
      return profileForm.displayName !== originalName && profileForm.displayName.trim() !== '';
    });
    
    const passwordMismatch = computed(() => {
      return passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword !== '';
    });
    
    const canChangePassword = computed(() => {
      return (
        passwordForm.currentPassword !== '' &&
        passwordForm.newPassword !== '' &&
        passwordForm.confirmPassword !== '' &&
        passwordForm.newPassword === passwordForm.confirmPassword &&
        passwordForm.newPassword.length >= 6
      );
    });
      // Methods
    const clearMessage = () => {
      message.value = { text: '', type: '' };
    };
    
    const getUserInitials = () => {
      if (!user.value || !user.value.email) return '?';
      
      // Extract first letter of email (before the @)
      const name = user.value.email.split('@')[0];
      if (name.length > 0) {
        return name.charAt(0).toUpperCase();
      }
      return '?';
    };
    const storedDisplayName = ref('');
  
  const getUserDisplayName = () => {
      // If we have a stored display name from Firestore, use that instead
      if (storedDisplayName.value) {
        console.log('Using stored display name:', storedDisplayName.value);
        return storedDisplayName.value;
      }
      
      if (!user.value || !user.value.email) return 'User';
      
      // Use part of email before @ sign as display name
      const name = user.value.email.split('@')[0];
      // Capitalize first letter of each word
      const displayName = name
        .split(/[-_.]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
        
      console.log('Generated display name from email:', displayName);
      return displayName;
    };
    
    const handleLogout = async () => {
      try {
        await logout();
        router.push('/login');
      } catch (err) {
        console.error('Failed to logout', err);
        message.value = { text: 'Failed to logout. Please try again.', type: 'error' };
      }
    };    const updateProfile = async () => {
      if (!user.value) return;
      
      try {
        savingProfile.value = true;
        
        // Get existing user profile or create a new one
        const profiles = await queryByField('userProfiles', 'userId', user.value.uid);
        
        if (profiles.length > 0) {
          // Update existing profile
          await updateDocument('userProfiles', profiles[0].id, {
            displayName: profileForm.displayName,
            updatedAt: new Date()
          });
        } else {
          // Create new profile
          await addToCollection('userProfiles', {
            userId: user.value.uid,
            displayName: profileForm.displayName,
            email: user.value.email,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
        
        // Update the stored display name immediately
        storedDisplayName.value = profileForm.displayName;
          message.value = { text: 'Profile updated successfully', type: 'success' };
        showToast('Profile updated successfully');
        
        // Clear message after 3 seconds
        setTimeout(clearMessage, 3000);
        
        // Reload user data to reflect changes
        console.log('Reloading user data after profile update...');
        await loadUserData();
        
        // Optional: Force a small delay to ensure UI updates
        setTimeout(() => {
          console.log('Profile update completed and data refreshed');
        }, 500);
        
      } catch (err) {
        console.error('Failed to update profile:', err);
        message.value = { text: 'Failed to update profile. Please try again.', type: 'error' };
        showToast('Failed to update profile', 'error');
      } finally {
        savingProfile.value = false;
      }
    };    const changePassword = async () => {
      if (!user.value) return;
      
      try {
        changingPassword.value = true;
        
        // Re-authenticate user before changing password
        const credential = EmailAuthProvider.credential(
          user.value.email,
          passwordForm.currentPassword
        );
        
        await reauthenticateWithCredential(user.value, credential);
        
        // Change password
        await updatePassword(user.value, passwordForm.newPassword);
        
        // Clear form
        passwordForm.currentPassword = '';
        passwordForm.newPassword = '';
        passwordForm.confirmPassword = '';
          message.value = { text: 'Password changed successfully', type: 'success' };
        showToast('Password changed successfully');
        
        // Clear message after 3 seconds
        setTimeout(clearMessage, 3000);
        
        // Reload user data to ensure everything is fresh
        console.log('Reloading user data after password change...');
        await loadUserData();
        
        // Optional: Show a brief confirmation message
        setTimeout(() => {
          console.log('Password change completed and data refreshed');
          showToast('Password updated - you may need to log in again on other devices', 'info');
        }, 500);
        
      } catch (err) {
        console.error('Failed to change password:', err);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to change password. Please check your current password.';
        if (err.code === 'auth/wrong-password') {
          errorMessage = 'Current password is incorrect.';
        } else if (err.code === 'auth/weak-password') {
          errorMessage = 'New password is too weak. Please use at least 6 characters.';
        } else if (err.code === 'auth/requires-recent-login') {
          errorMessage = 'Please log out and log back in, then try changing your password.';
        }
        
        message.value = { text: errorMessage, type: 'error' };
        showToast(errorMessage, 'error');
      } finally {
        changingPassword.value = false;
      }
    };    const savePreferences = async () => {
      if (!user.value) return;
      
      try {
        savingPreferences.value = true;
        
        // Get existing preferences or create new
        const userPrefs = await queryByField('userPreferences', 'userId', user.value.uid);
        
        if (userPrefs.length > 0) {
          // Update existing preferences
          await updateDocument('userPreferences', userPrefs[0].id, {
            ...preferences,
            updatedAt: new Date()
          });
        } else {
          // Create new preferences
          await addToCollection('userPreferences', {
            userId: user.value.uid,
            ...preferences,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
          message.value = { text: 'Preferences saved successfully', type: 'success' };
        showToast('Preferences saved successfully');
        
        // Clear message after 3 seconds
        setTimeout(clearMessage, 3000);
        
        // Reload user data to ensure preferences are reflected
        console.log('Reloading user data after preferences update...');
        await loadUserData();
        
        setTimeout(() => {
          console.log('Preferences update completed and data refreshed');
        }, 500);
        
      } catch (err) {
        console.error('Failed to save preferences:', err);
        message.value = { text: 'Failed to save preferences. Please try again.', type: 'error' };
        showToast('Failed to save preferences', 'error');
      } finally {
        savingPreferences.value = false;
      }
    };
      // Toast functionality is now provided by the useToast composable
      // Load user data
    const loadUserData = async () => {      console.log("Loading user data...");
      
      if (!user.value) {
        console.error("No user available for loadUserData");
        loading.value = false;
        return;
      }
      
      try {
        loading.value = true;
        console.log("User:", user.value.email, "Loading profile data");
        
        // Set email from user auth object
        profileForm.email = user.value.email;
        
        // Default display name from email
        const emailBasedName = user.value.email.split('@')[0]
          .split(/[-_.]/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        console.log("Default name generated from email:", emailBasedName);
        
        // Load user profile if exists
        console.log("Checking for existing user profile");
        const profiles = await queryByField('userProfiles', 'userId', user.value.uid);
        if (profiles.length > 0) {
          console.log("Found existing profile:", profiles[0]);
          
          if (profiles[0].displayName) {
            console.log("Setting display name from profile:", profiles[0].displayName);
            profileForm.displayName = profiles[0].displayName;
            // Store this in our ref so the Navbar component can use it
            storedDisplayName.value = profiles[0].displayName;
          } else {
            console.log("No display name in profile, using email-based name:", emailBasedName);
            profileForm.displayName = emailBasedName;
          }
        } else {
          console.log("No profile found, using email-based name:", emailBasedName);
          profileForm.displayName = emailBasedName;
        }
        
        // Load user preferences
        console.log("Loading user preferences");
        const userPrefs = await queryByField('userPreferences', 'userId', user.value.uid);
        if (userPrefs.length > 0) {
          console.log("Found preferences:", userPrefs[0]);
          // Only copy specific preference fields to avoid copying database fields
          preferences.vegetarian = !!userPrefs[0].vegetarian;
          preferences.vegan = !!userPrefs[0].vegan;
          preferences.glutenFree = !!userPrefs[0].glutenFree;
          preferences.dairyFree = !!userPrefs[0].dairyFree;
          preferences.servingSize = userPrefs[0].servingSize || '2';
        }
          // Count meal plans
        console.log("Counting meal plans");
        const mealPlans = await queryByField('mealPlans', 'userId', user.value.uid);
        mealPlansCount.value = mealPlans.length;
        console.log("Meal plans count:", mealPlansCount.value);
        
        console.log("User data loaded successfully");
        showToast('Profile loaded successfully');
      } catch (err) {
        console.error('Failed to load user data:', err);
        message.value = { text: 'Failed to load user data. Please refresh the page.', type: 'error' };
        showToast('Failed to load profile data', 'error');
      } finally {
        loading.value = false;
      }
    };
    
    onMounted(() => {
      console.log("ProfilePage mounted, user:", user.value);
      
      if (user.value) {
        // If user is already available, load data immediately
        loadUserData();
      } else {
        // Set up a watcher for the user in case it loads after mount
        const unwatch = watch(user, (newUser) => {
          console.log("User state changed in ProfilePage:", newUser);
          if (newUser) {
            loadUserData();
            unwatch(); // Stop watching once we have a user
          } else {
            // If still no user after a short delay, redirect
            setTimeout(() => {
              if (!user.value) {
                console.log("No user available, redirecting to login");
                router.push('/login');
              }
            }, 1000);
          }
        });
        
        // Fallback - if no auth state change after 2 seconds, redirect
        setTimeout(() => {
          if (!user.value) {
            console.log("Timeout - no user available, redirecting to login");
            router.push('/login');
          }
        }, 2000);
      }
    });      return {
      user,
      loading,
      savingProfile,
      changingPassword,
      savingPreferences,
      profileForm,
      passwordForm,
      preferences,
      mealPlansCount,
      message,
      hasChanges,
      passwordMismatch,
      canChangePassword,
      clearMessage,
      getUserInitials,
      getUserDisplayName,
      handleLogout,
      updateProfile,
      changePassword,
      savePreferences
    };
  }
};
</script>

<style scoped>
.profile-page {
  padding-top: 60px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.profile-header {
  margin-bottom: 2rem;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #17B97A;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
}

.profile-stats {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.stat-item {
  padding: 0.5rem;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #17B97A;
}

.stat-label {
  font-size: 0.8rem;
  color: #6c757d;
}

.nav-tabs .nav-link {
  color: #6c757d;
  font-weight: 500;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.5rem 1rem;
}

.nav-tabs .nav-link.active {
  color: #17B97A;
  border-bottom: 2px solid #17B97A;
}

.nav-tabs .nav-link:hover {
  border-color: transparent;
  color: #17B97A;
}

.form-control:focus, .form-select:focus {
  border-color: #17B97A;
  box-shadow: 0 0 0 0.25rem rgba(23, 185, 122, 0.25);
}

.btn-success {
  background-color: #17B97A;
  border-color: #17B97A;
}

.btn-success:hover {
  background-color: #149c67;
  border-color: #149c67;
}

.btn-outline-success {
  color: #17B97A;
  border-color: #17B97A;
}

.btn-outline-success:hover {
  background-color: #17B97A;
  border-color: #17B97A;
}

.btn-outline-success:hover {
  background-color: #17B97A;
  border-color: #17B97A;
}

/* Alert messages */
.alert {
  margin: 0;
  border-radius: 0;
  border: none;
  font-weight: 500;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border-left: 4px solid #17B97A;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border-left: 4px solid #dc3545;
}

/* Toast notifications */
.toast-container {
  z-index: 1050;
}

.toast {
  opacity: 1 !important;
  border-radius: 8px;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.toast.bg-success {
  background-color: #17B97A !important;
}

.toast.bg-danger {
  background-color: #dc3545 !important;
}

/* Responsive adjustments */
@media (max-width: 767px) {
  .user-avatar {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .profile-stats {
    margin-bottom: 1.5rem;
  }
}
</style>

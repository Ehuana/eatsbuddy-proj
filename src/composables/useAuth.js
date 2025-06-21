// Composable for Firebase Authentication
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// Create a reactive user reference
const user = ref(null);
let authUnsubscribe = null;

// Set up the auth state listener
function setupAuthListener() {
  if (authUnsubscribe) return; // Prevent multiple listeners
  
  authUnsubscribe = onAuthStateChanged(auth, (u) => {
    console.log('Auth state changed:', u ? `User: ${u.email}` : 'No user');
    user.value = u;
  });
}

// Setup auth listener immediately
setupAuthListener();

const register = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  await signOut(auth);
};

export function useAuth() {
  return { user, register, login, logout };
}

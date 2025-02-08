import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHqkFmOgKRS1c6msmkvxAgS6EsvEPNE9Y",
  authDomain: "eventgenie-69f86.firebaseapp.com",
  databaseURL: "https://eventgenie-69f86-default-rtdb.firebaseio.com",
  projectId: "eventgenie-69f86",
  storageBucket: "eventgenie-69f86.firebasestorage.app",
  messagingSenderId: "895023626007",
  appId: "1:895023626007:web:2955f3699d16775f1aa952"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize user in database after login
export const initializeUserInDatabase = async (user: any) => {
  if (!user) return;
  
  try {
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      lastLogin: new Date().toISOString(),
    });
    console.log("User initialized in database");
  } catch (error) {
    console.error("Error initializing user in database:", error);
  }
};

// Add scopes for additional user info
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email'); 
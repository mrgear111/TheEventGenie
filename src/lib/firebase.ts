import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

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
export const initializeUserInDatabase = async (user: any, isArtist: boolean = false) => {
  if (!user) return;
  
  try {
    // If artist, store in Artists collection
    if (isArtist) {
      // Create a safe key by removing invalid characters
      const safeKey = user.email
        .replace(/[.#$[\]]/g, '_') // Replace invalid characters with underscore
        .replace('@', 'AT'); // Replace @ with AT
      
      console.log('Creating artist with key:', safeKey);
      
      // Create reference to existing artist to check if it exists
      const artistRef = ref(database, `Artists/${safeKey}`);
      
      // Always update/create the artist entry
      await set(artistRef, {
        approvalStatus: true,
        bookingCount: 0,
        busyDays: {},
        details: {
          email: user.email
        },
        email: user.email,
        photoUrl: user.photoURL || '',
        posts: {},
        profileViews: 0
      });
      console.log('Artist profile created/updated:', user.email);
    }
    
    // Store in users collection
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || '',
      lastLogin: new Date().toISOString(),
      isArtist: isArtist
    });
    console.log("User data saved:", user.email);
  } catch (error) {
    console.error("Error in database operation:", error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
};

// Add scopes for additional user info
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email'); 
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
    const safeKey = user.email
      .replace(/[.#$[\]]/g, '_')
      .replace('@', 'AT');
    
    if (isArtist) {
      // If artist, only store in Artists collection
      const artistRef = ref(database, `Artists/${safeKey}`);
      
      // Check if artist data already exists
      const snapshot = await get(artistRef);
      
      if (!snapshot.exists()) {
        await set(artistRef, {
          userId: user.uid,
          approvalStatus: true,
          bookingCount: 0,
          busyDays: {},
          details: {
            email: user.email,
            displayName: user.displayName
          },
          email: user.email,
          photoUrl: user.photoURL || '',
          posts: {},
          profileViews: 0,
          createdAt: new Date().toISOString()
        });
      }
    } else {
      // If regular user, store in users collection
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || '',
        lastLogin: new Date().toISOString(),
        role: 'user'
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
  } catch (error) {
    console.error("Error in database operation:", error);
    throw error;
  }
};

// Add scopes for additional user info
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email'); 
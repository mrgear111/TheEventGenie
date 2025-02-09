import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize user in database after login
export const initializeUserInDatabase = async (
  user: {
    email: string | null;
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  },
  isArtist: boolean = false
) => {
  if (!user?.email) {
    console.error('User email is required');
    return;
  }
  
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
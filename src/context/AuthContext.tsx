'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, database } from '../lib/firebase'
import { ref, get } from 'firebase/database'

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isArtist: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isArtist: false,
  signIn: async () => {},
  signOut: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isArtist, setIsArtist] = useState(false)

  const checkUserStatus = async (user: User) => {
    try {
      const safeKey = user.email?.replace(/[.#$[\]]/g, '_').replace('@', 'AT');
      const artistRef = ref(database, `Artists/${safeKey}`);
      const snapshot = await get(artistRef);
      
      setIsArtist(snapshot.exists());
      setUser(user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return

      if (!user) {
        setUser(null)
        setLoading(false)
        return
      }

      await checkUserStatus(user)
    })

    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  // Add a method to force refresh the auth state
  const refreshAuthState = async () => {
    if (user) {
      setLoading(true)
      await checkUserStatus(user)
    }
  }

  const signIn = async () => {
    // Implementation of signIn method
  }

  const signOut = async () => {
    // Implementation of signOut method
  }

  return (
    <AuthContext.Provider value={{ user, loading, isArtist, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 
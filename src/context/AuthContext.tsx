'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, database } from '../lib/firebase'
import { ref, get } from 'firebase/database'

interface AuthContextType {
  user: User | null
  loading: boolean
  isArtist: boolean
  refreshAuthState: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isArtist: false,
  refreshAuthState: async () => {}
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
      
      setUser(user);
      setIsArtist(snapshot.exists());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsArtist(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return

      if (!user) {
        setUser(null)
        setIsArtist(false)
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

  return (
    <AuthContext.Provider value={{ user, loading, isArtist, refreshAuthState }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 
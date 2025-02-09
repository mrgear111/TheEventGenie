'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { auth, googleProvider, initializeUserInDatabase } from '../lib/firebase'
import { signInWithPopup, User } from 'firebase/auth'
import Image from 'next/image'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const GoogleIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path
        fill="#4285F4"
        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
      />
      <path
        fill="#34A853"
        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
      />
      <path
        fill="#FBBC05"
        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
      />
      <path
        fill="#EA4335"
        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
      />
    </g>
  </svg>
);

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [error, setError] = useState<string | null>(null)
  const [isArtist, setIsArtist] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setError(null)
      
      const result = await signInWithPopup(auth, googleProvider)
      
      if (!result.user.email) {
        throw new Error('No email associated with this account');
      }
      
      // Initialize user in database and wait for it to complete
      await initializeUserInDatabase(result.user, isArtist)
      
      // Small delay to ensure database writes are complete
      await new Promise(resolve => setTimeout(resolve, 500))
      
      onClose()
    } catch (error) {
      console.error('Error signing in with Google:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-[500px] bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
                alt="Background"
                fill
                className="object-cover opacity-10"
              />
            </div>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Welcome to EventGenie
                </h2>
                <p className="text-gray-500 mt-2">
                  Your gateway to amazing events
                </p>
              </div>

              {/* User Type Selection */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setIsArtist(false)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                    !isArtist 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  User
                </button>
                <button
                  onClick={() => setIsArtist(true)}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                    isArtist 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Artist
                </button>
              </div>

              {/* Google Sign In Button */}
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-6 h-6">
                  <GoogleIcon />
                </div>
                <span className="text-[15px] font-medium">
                  Continue with Google as {isArtist ? 'Artist' : 'User'}
                </span>
              </button>

              {/* Error Message */}
              {error && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Footer */}
              <p className="mt-6 text-xs text-center text-gray-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 
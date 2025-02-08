'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { auth, googleProvider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import Image from 'next/image'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Signed in:', result.user.email)
      onClose()
    } catch (error: any) {
      console.error('Error signing in with Google:', error)
      setError(error.message)
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

              {/* Google Sign In Button */}
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-[#18191B] hover:bg-[#18191B]/90 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#18191B] text-sm font-medium">G</span>
                </div>
                <span className="text-white text-base">Continue with Google</span>
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
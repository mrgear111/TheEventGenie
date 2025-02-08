'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { auth, googleProvider } from '../lib/firebase'
import { signInWithPopup } from 'firebase/auth'

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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Welcome to EventGenie</h2>
                  <button 
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Google Sign In */}
                <button 
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#18191B] text-white rounded-lg hover:bg-[#18191B]/90 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-[#18191B] text-sm font-medium">G</span>
                    </div>
                    <span className="text-sm">Continue with Google</span>
                  </div>
                </button>

                {/* Error Message */}
                {error && (
                  <p className="mt-4 text-sm text-red-500 text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 
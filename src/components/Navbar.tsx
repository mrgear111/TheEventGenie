'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, Menu, Bell, LogOut, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import LoginModal from './LoginModal'

export default function Navbar() {
  const { user, isArtist, loading } = useAuth()
  const [showBanner, setShowBanner] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only render client-specific content after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const LoadingButton = () => (
    <div className="flex items-center gap-4">
      <motion.div 
        className="relative h-9 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full overflow-hidden"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300 animate-pulse" />
          <div className="h-3 w-20 bg-gray-300 rounded-full" />
        </div>
      </motion.div>
    </div>
  )

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100"
      >
        {/* Top Banner */}
        <AnimatePresence>
          {showBanner && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden"
            >
              <div className="max-w-7xl mx-auto py-1 px-4 text-center text-sm">
                <div className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 animate-pulse">🎵</span>
                  Launching Soon! Join our waitlist to get early access and exclusive benefits
                  <Link href="#" className="text-red-300 hover:text-red-200 ml-2 relative group">
                    Join Now
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-300 group-hover:w-full transition-all duration-300" />
                  </Link>
                  <button 
                    onClick={() => setShowBanner(false)}
                    className="absolute right-4 text-white/80 hover:text-white hover:scale-110 transition-all"
                  >
                    ×
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left Section */}
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:from-indigo-600 hover:to-pink-600 transition-all"
              >
                EventGenie
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link 
                  href="/artists" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Artists
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Link 
                  href="/search"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-600" />
                </Link>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
              </div>

              <div className="h-6 w-px bg-gray-200" />

              <div className="flex items-center gap-4">
                {mounted ? (
                  !loading ? (
                    user ? (
                      <div className="flex items-center gap-4">
                        {/* Artist Dashboard Button */}
                        {isArtist && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.5,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                          >
                            <Link 
                              href="/dashboard/artist" 
                              className="relative px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 flex items-center gap-2 text-sm font-medium group overflow-hidden"
                            >
                              <motion.span 
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                              />
                              <span className="relative flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                Artist Dashboard
                                <motion.span
                                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "100%" }}
                                  transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    repeatDelay: 1,
                                    ease: "linear"
                                  }}
                                />
                              </span>
                            </Link>
                          </motion.div>
                        )}
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={user.photoURL || '/default-avatar.png'}
                              alt="Profile"
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <button
                            onClick={handleSignOut}
                            className="text-sm text-gray-600 hover:text-gray-900"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsLoginModalOpen(true)} 
                        className="px-5 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                      >
                        Login/Sign Up
                      </button>
                    )
                  ) : (
                    <LoadingButton />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg"
          >
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, artists, or venues..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* City Selector */}

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
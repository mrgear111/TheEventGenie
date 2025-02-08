'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, Menu, Bell, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import CitySelector from './CitySelector'
import LoginModal from './LoginModal'

export default function Navbar() {
  const { user } = useAuth()
  const [showBanner, setShowBanner] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

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

              <div className="hidden md:flex items-center gap-4">
                {['Feeds', 'Events'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-gray-900 relative group py-1"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCitySelectorOpen(true)}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 bg-gray-50 px-3 py-1 rounded-full text-sm"
              >
                <MapPin className="w-3 h-3" />
                <span>{selectedCity || "Select your city"}</span>
              </motion.button>

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
                {user ? (
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
                ) : (
                  <button 
                    onClick={() => setIsLoginModalOpen(true)} 
                    className="px-5 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                  >
                    Login/Sign Up
                  </button>
                )}
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
      <CitySelector
        isOpen={isCitySelectorOpen}
        onClose={() => setIsCitySelectorOpen(false)}
        onSelect={setSelectedCity}
        currentCity={selectedCity || ""}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
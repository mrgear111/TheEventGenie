'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold text-white"
          >
            EventGenie
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/events" 
              className="text-gray-300 hover:text-white transition"
            >
              Events
            </Link>
            <Link 
              href="/artists" 
              className="text-gray-300 hover:text-white transition"
            >
              Artists
            </Link>
            <Link 
              href="/venues" 
              className="text-gray-300 hover:text-white transition"
            >
              Venues
            </Link>
            <button className="px-4 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
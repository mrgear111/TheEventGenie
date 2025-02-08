'use client'

import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute w-full h-full object-cover opacity-50"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-bold text-white"
          >
            Find Your Next Event
          </motion.h1>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search events, artists, or venues..."
                className="w-full py-4 pl-12 pr-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </motion.div>

          {/* Trending Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {['Music', 'Comedy', 'Theatre', 'Sports', 'Art'].map((tag) => (
              <span 
                key={tag}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg text-sm text-white hover:bg-white/20 transition cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-yellow-500" />
              Featured Events
            </h2>
            <button className="text-white hover:text-gray-300 transition">
              View all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Cards */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-xl overflow-hidden bg-gray-900 hover:transform hover:scale-105 transition duration-300"
              >
                <Image
                  src={`/images/event-${i}.jpg`}
                  alt="Event"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-0 p-6 w-full">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-sm text-white mb-3 inline-block">
                    Mar 25
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Summer Music Festival
                  </h3>
                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <span>Central Park</span>
                    <span>7:00 PM</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
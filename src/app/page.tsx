'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ParticleBackground from '../components/ParticleBackground'

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center pt-64 pb-8 bg-gradient-to-b from-gray-50 to-white">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-6xl md:text-7xl font-bold text-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Book Amazing Artists
                  </span>
                  <br />
                  <span className="text-gray-800">For Your Events</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 text-xl text-center max-w-3xl mx-auto mb-6"
              >
                Discover and book the perfect artists for your events. From live bands to DJs, 
                we&apos;ve got the talent you need to make your event unforgettable.
              </motion.p>



              {/* Popular Tags */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {['Live Band', 'DJ', 'Classical', 'Rock', 'Jazz'].map((tag, i) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-full text-gray-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  >
                    {tag}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Event Cards Stack */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[600px] hidden lg:block"
            >
              {[1, 2, 3].map((i) => {
                const position = (i - 1 - activeIndex + 3) % 3
                
                return (
                  <motion.div
                    key={i}
                    animate={{ 
                      zIndex: position === 0 ? 3 : position === 1 ? 2 : 1,
                      x: position * 30,
                      y: position * 30,
                      rotate: (position - 1) * 8,
                      scale: 1 - (position * 0.1),
                      opacity: 1 - (position * 0.2),
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      rotate: 0,
                      transition: { 
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    className={`absolute top-0 left-0 right-0 h-[500px] rounded-3xl overflow-hidden shadow-2xl
                      ${position === 0 ? 'shadow-indigo-500/20 hover:shadow-indigo-500/30' : ''}`}
                    style={{ 
                      transformOrigin: 'center bottom',
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.95))',
                    }}
                  >
                    <Image
                      src={`/images/events/event-${i}.webp`}
                      alt={`Event ${i}`}
                      fill
                      className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                      priority={i === 1}
                      onError={(e) => {
                        console.error(`Error loading image event-${i}.webp:`, e);
                      }}
                    />
                    
                    {/* Content overlay with improved styling */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 hover:translate-y-0 transition-transform duration-300">
                        <div className="space-y-4">
                          <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm inline-block"
                          >
                            Live Music
                          </motion.span>
                          
                          <motion.h3 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-bold text-white"
                          >
                            Summer Festival 2024
                          </motion.h3>
                          
                          <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/70 text-lg"
                          >
                            New York • 25 Mar
                          </motion.p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>




      {/* How EventGenie Works */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent" />
          <ParticleBackground />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              How EventGenie Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Your journey from booking to performance, simplified
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "Discover Artists & Venues",
                description: "Browse through our curated selection of top artists and premium venues across India",
                features: ["Verified profiles", "Real reviews", "Portfolio showcase"],
                color: "from-indigo-500/20"
              },
              {
                icon: "🤝",
                title: "Book with Confidence",
                description: "Secure your bookings with our transparent and hassle-free process",
                features: ["Instant booking", "Secure payments", "Clear pricing"],
                color: "from-purple-500/20"
              },
              {
                icon: "✨",
                title: "Create Memories",
                description: "Experience seamless events with our end-to-end support",
                features: ["Event support", "Quality guarantee", "Memorable experiences"],
                color: "from-pink-500/20"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl transform group-hover:-translate-y-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl transform group-hover:translate-y-2 transition-transform duration-300 opacity-50" />
                <div className={`relative bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-300`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-5xl mb-6">{step.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-400 group-hover:text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 mt-16"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-0.5">
              Get Started
            </button>
            <button className="px-8 py-3 bg-white/10 text-white rounded-full text-lg font-medium hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Add a subtle footer gradient */}
      <div className="h-32 bg-gradient-to-t from-blue-900/20 to-transparent relative">
        {/* Copyright Text */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EventGenie. All rights reserved.
        </div>
      </div>
    </main>
  )
}
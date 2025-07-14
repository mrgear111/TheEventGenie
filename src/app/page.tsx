'use client'

import { motion } from 'framer-motion'
import { MapPin, Star } from 'lucide-react'
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
      <section className="relative flex flex-col items-center pt-48 pb-8 bg-gradient-to-b from-gray-50 to-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
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
                Discover and book the perfect artists for your events. From live bands to DJs, we&apos;ve got the talent you need to make your event unforgettable.
              </motion.p>
            </motion.div>

            {/* Event Cards */}
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
                      scale: 1 - position * 0.1,
                      opacity: 1 - position * 0.2,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -10,
                      rotate: 0,
                      transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                    className={`absolute top-0 left-0 right-0 h-[500px] rounded-3xl overflow-hidden shadow-2xl ${position === 0 ? 'shadow-indigo-500/20 hover:shadow-indigo-500/30' : ''}`}
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
                    />
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

      {/* Featured Artists */}
      <section className="relative bg-black py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent" />
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Artists</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Discover exceptional talent for your next event</p>
          </motion.div>

          {/* Marquee */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
            <div className="flex overflow-x-hidden relative">
              <motion.div
                className="flex gap-6 py-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 30,
                    ease: 'linear',
                  },
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-[300px] group"
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800">
                      <div className="relative h-48">
                        <Image
                          src={`/images/events/event-${(i % 3) + 1}.webp`}
                          alt={`Artist ${i + 1}`}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between text-white">
                            <span className="font-medium">₹{(i + 1) * 10000}/night</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 stroke-yellow-500" />
                              <span>{(4.5 + (i % 5) / 10).toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-indigo-400 mb-2">
                          {['Rock Band', 'Classical', 'DJ', 'Jazz', 'Pop', 'Folk', 'Fusion', 'Blues'][i]}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-indigo-300 transition-colors">
                          {['The Vibes', 'Rhythm Express', 'DJ Nova', 'Jazz Quartet', 'Echo Band', 'Folk Tales', 'Fusion Flow', 'Blues Bros'][i]}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                          <MapPin className="w-4 h-4" />
                          {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur'][i]}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs border border-indigo-500/20">
                            {['Live', 'Trending', 'Featured'][i % 3]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300">
              Explore All Artists
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer Gradient */}
      <div className="h-32 bg-gradient-to-t from-blue-900/20 to-transparent relative">
        <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EventGenie. All rights reserved.
        </div>
      </div>
    </main>
  )
}

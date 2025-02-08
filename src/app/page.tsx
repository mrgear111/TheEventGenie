'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Search, Calendar, MapPin, ArrowRight, Star, Music } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-100/40 via-purple-100/40 to-transparent blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-screen">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center"
              >
                <span className="relative inline-block px-6 py-2 rounded-full border border-blue-100 bg-blue-50/50 text-blue-600 text-sm font-medium">
                  <span className="relative z-10">#1 Artist Booking Platform</span>
                  <motion.span 
                    className="absolute inset-0 rounded-full bg-blue-100/50"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  className="text-6xl lg:text-7xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Find & Book the
                  <div className="relative mt-2">
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                      Perfect Artist
                    </span>
                    <motion.div 
                      className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-100/30 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </div>
                </motion.h1>
              </div>

              {/* Search Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative max-w-xl"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-30 blur group-hover:opacity-50 transition duration-300" />
                  <div className="relative flex items-center bg-white rounded-2xl shadow-lg p-2">
                    <Search className="w-6 h-6 text-gray-400 ml-4" />
                    <input
                      type="text"
                      placeholder="Search artists or events..."
                      className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      Search
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2"
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
                      ${position === 0 ? 'shadow-blue-500/20 hover:shadow-blue-500/30' : ''}`}
                    style={{ 
                      transformOrigin: 'center bottom',
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.95))',
                    }}
                  >
                    <Image
                      src={`/images/events/event-${i}.jpeg`}
                      alt={`Event ${i}`}
                      fill
                      className="object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                      priority={i === 1}
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

      {/* Featured Artists Section */}
      <section className="py-20 relative">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-purple-900/10 to-transparent" />
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2}px`,
                  height: `${Math.random() * 2}px`,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header with Animated Line */}
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-8"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-white mb-4"
            >
              Featured Artists
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl"
            >
              Discover and book exceptional talent for your next event
            </motion.p>
          </div>

          {/* Artists Grid with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "The F16s",
                image: "/images/events/event-1.jpeg",
                genre: "Rock Band",
                location: "BENGALURU",
                rating: 4.9,
                priceRange: "$500-1000",
                endorsedBy: "Jack Daniel's",
                bookings: "50+ shows",
                color: "from-blue-500/20"
              },
              {
                name: "DJ Shadow",
                image: "/images/events/event-2.jpeg",
                genre: "Electronic",
                location: "Mumbai",
                rating: 4.8,
                priceRange: "$300-800",
                endorsedBy: "Red Bull",
                bookings: "100+ shows",
                color: "from-purple-500/20"
              },
              {
                name: "Jazz Quartet",
                image: "/images/events/event-3.jpeg",
                genre: "Jazz",
                location: "Delhi",
                rating: 4.9,
                priceRange: "$600-1200",
                endorsedBy: "Yamaha",
                bookings: "30+ shows",
                color: "from-pink-500/20"
              }
            ].map((artist, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="group relative"
              >
                {/* Card with Hover Effects */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative rounded-3xl overflow-hidden"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
                    <div className={`absolute inset-0 bg-gradient-to-b ${artist.color} to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                  </div>

                  {/* Artist Image Container */}
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Animated Endorsement Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 group-hover:-translate-y-1 transition-transform duration-300"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full" />
                        <div className="relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm rounded-full shadow-lg backdrop-blur-sm">
                          Endorsed by {artist.endorsedBy}
                        </div>
                      </div>
                    </motion.div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content with Animated Elements */}
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm"
                      >
                        <span className="text-white/90 text-sm">{artist.genre}</span>
                      </motion.div>
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg"
                            >
                              <Star className="w-3 h-3 text-white" />
                            </div>
                          ))}
                        </div>
                        <span className="text-white font-medium ml-2">{artist.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {artist.name}
                    </h3>

                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-white/5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{artist.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-white/5">
                          <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-sm">{artist.bookings}</span>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <motion.div 
                      className="flex items-center justify-between pt-4 border-t border-white/10"
                    >
                      <div className="group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white font-medium">
                          {artist.priceRange}
                        </div>
                        <div className="text-gray-400 text-sm">per event</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Book Now
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add a subtle footer gradient */}
      <div className="h-32 bg-gradient-to-t from-blue-900/20 to-transparent" />
    </main>
  )
}
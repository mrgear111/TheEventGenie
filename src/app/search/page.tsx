'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'

// Sample data
const events = [
  {
    id: 1,
    title: "The Paper Kites Live in Delhi NCR",
    location: "New Delhi | India",
    date: "18 Mar | Tuesday",
    time: "07:00 pm",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80" // Concert stage
  },
  {
    id: 2,
    title: "7 years of Kai Room - 2 Days Anniversary",
    location: "Gurugram | India",
    date: "14 Feb | Friday",
    time: "11:30 pm",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80" // DJ event
  },
  {
    id: 3,
    title: "KAI ROOM presents DOTDAT, POOJA B & MORE",
    location: "Gurugram | India",
    date: "08 Feb | Saturday",
    time: "11:30 pm",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80" // Music festival
  },
  {
    id: 4,
    title: "The Barrel Room with The F16s | Bangalore",
    location: "Bangalore | India",
    date: "08 Feb | Saturday",
    time: "07:00 pm",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80" // Live band
  }
]

const topArtists = [
  {
    id: 1,
    name: "GUTSLIT",
    category: "Musician/Band",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80" // Rock band
  },
  {
    id: 2,
    name: "Bloodywood",
    category: "Musician/Band",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&q=80" // Metal musician
  },
  {
    id: 3,
    name: "Parvaaz",
    category: "Musician/Band",
    image: "https://images.unsplash.com/photo-1529518969858-8baa65152fc8?w=400&q=80" // Band performing
  },
  {
    id: 4,
    name: "Chaar Diwaari",
    category: "Musician/Band",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400&q=80" // Acoustic performer
  }
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-12 mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search events, artists or celebrities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 bg-gray-100 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Events</h2>
          <Link href="/events" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600">
                {event.location}
              </p>
              <p className="text-sm text-gray-600">
                {event.date} | {event.time}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Artists Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Top Artist</h2>
          <Link href="/artists" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topArtists.map((artist) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer"
            >
              <div className="relative h-48 w-48 mx-auto mb-4">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                  {artist.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {artist.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
} 
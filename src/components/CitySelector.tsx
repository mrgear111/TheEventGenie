'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface CitySelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (city: string) => void
  currentCity: string
}

const cities = [
  {
    name: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=60', // India Gate
    monument: 'India Gate'
  },
  {
    name: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&auto=format&fit=crop&q=60', // Vidhana Soudha
    monument: 'Vidhana Soudha'
  },
  {
    name: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&auto=format&fit=crop&q=60', // Gateway of India
    monument: 'Gateway of India'
  },
  {
    name: 'Navi Mumbai',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&auto=format&fit=crop&q=60', // City skyline
    monument: 'City Center'
  },
  {
    name: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1572638207014-c05f7a991d05?w=800&auto=format&fit=crop&q=60', // Charminar at night
    monument: 'Charminar'
  },
  {
    name: 'Guwahati',
    image: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=800&auto=format&fit=crop&q=60', // Kamakhya Temple
    monument: 'Temple'
  },
  {
    name: 'Chandigarh',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&auto=format&fit=crop&q=60', // Rock Garden
    monument: 'Rock Garden'
  },
  {
    name: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60', // Beach
    monument: 'Beach'
  }
]

export default function CitySelector({ isOpen, onClose, onSelect }: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCities, setFilteredCities] = useState(cities)

  useEffect(() => {
    const filtered = cities.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCities(filtered)
  }, [searchQuery])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="bg-white rounded-lg w-full max-w-3xl">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-8">
                Explore pop culture based events around you
              </h2>

              {/* Search Bar */}
              <div className="relative mb-12">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                <input
                  type="text"
                  placeholder="Search city of your choice"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-6 pr-32 py-4 text-lg border-none focus:outline-none shadow-sm"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-black text-white rounded-lg">
                  Use location
                </button>
              </div>

              {/* Cities Grid */}
              <div className="grid grid-cols-4 md:grid-cols-8 gap-8">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      onSelect(city.name)
                      onClose()
                    }}
                    className="flex flex-col items-center group"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-2 group-hover:ring-2 ring-blue-500 transition-all">
                      <Image
                        src={city.image}
                        alt={city.monument}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-900 text-sm text-center">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* City Skyline */}
              <div className="mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1598633919327-67d9b63e5ed6?w=1200&auto=format&fit=crop&q=60"
                  alt="Indian Cities Skyline"
                  width={1200}
                  height={200}
                  className="w-full h-32 object-cover opacity-80"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
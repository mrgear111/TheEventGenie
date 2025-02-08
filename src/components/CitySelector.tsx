'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Sun, Building2, Mountain, Landmark, Coffee, Building } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CitySelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (city: string) => void
  currentCity: string
}

// Added icons and colors for each city
const cities = [
  { 
    name: 'Jaipur', 
    state: 'Rajasthan',
    icon: Sun,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  { 
    name: 'Bangalore', 
    state: 'Karnataka',
    icon: Coffee,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  { 
    name: 'Pune', 
    state: 'Maharashtra',
    icon: Mountain,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  { 
    name: 'Delhi', 
    state: 'Delhi',
    icon: Landmark,
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  { 
    name: 'Hyderabad', 
    state: 'Telangana',
    icon: Building2,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }
]

export default function CitySelector({ isOpen, onClose, onSelect, currentCity }: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCities, setFilteredCities] = useState(cities)
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    const filtered = cities.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCities(filtered)
    setNoResults(searchQuery.length > 0 && filtered.length === 0)
  }, [searchQuery])

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
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 9998 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ zIndex: 9999 }}
            className="fixed top-[72px] left-1/2 -translate-x-1/2 w-[400px] bg-white rounded-2xl shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl">
              <h2 className="text-lg font-medium text-white">Select Your City</h2>
              <button 
                onClick={onClose}
                className="text-white/80 hover:text-white transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-gray-900 placeholder:text-gray-500 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Cities List */}
            <div className="max-h-[320px] overflow-y-auto">
              {noResults ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                    <Building className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    We're Expanding!
                  </h3>
                  <p className="text-gray-500 mb-4">
                    We haven't reached {searchQuery} yet, but we're growing fast! We'll be there soon.
                  </p>
                  <div className="text-sm text-gray-400">
                    Currently available in {cities.length} cities across India
                  </div>
                </motion.div>
              ) : (
                filteredCities.map((city) => {
                  const Icon = city.icon
                  return (
                    <button
                      key={city.name}
                      onClick={() => {
                        onSelect(city.name)
                        onClose()
                      }}
                      className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-full ${city.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-5 h-5 ${city.color}`} />
                      </div>
                      <div className="text-left">
                        <div className="text-gray-900 font-medium">{city.name}</div>
                        <div className="text-sm text-gray-500">{city.state}</div>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 
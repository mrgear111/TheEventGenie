'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Building2 } from 'lucide-react'

const cities = [
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Bangalore', state: 'Karnataka' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Delhi', state: 'Delhi' },
  { name: 'Hyderabad', state: 'Telangana' }
]

interface CitySelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (city: string) => void
  currentCity: string
}

export default function CitySelector({ isOpen, onClose, onSelect, currentCity }: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCities, setFilteredCities] = useState(cities)
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    const filtered = cities.filter(city => 
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Select Your City</h2>
                  <button 
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    autoFocus
                  />
                </div>
              </div>

              {/* Cities List with Coming Soon Message */}
              <div className="max-h-[300px] overflow-y-auto">
                {filteredCities.map((city) => (
                  <motion.button
                    key={city.name}
                    onClick={() => {
                      onSelect(city.name)
                      onClose()
                    }}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-colors
                      ${currentCity === city.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                    `}
                  >
                    <MapPin className={`w-5 h-5 ${currentCity === city.name ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className="text-left">
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </div>
                    {currentCity === city.name && (
                      <div className="ml-auto px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                        Selected
                      </div>
                    )}
                  </motion.button>
                ))}

                {/* Coming Soon Message */}
                {noResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                      <Building2 className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      We're Expanding!
                    </h3>
                    <p className="text-gray-500 mb-4">
                      We haven't reached {searchQuery} yet, but we're growing fast! We'll be there soon.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSearchQuery('')
                        // You could also implement a waitlist feature here
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm hover:shadow-lg transition-shadow"
                    >
                      Notify Me When Available
                    </motion.button>
                    <div className="mt-4 text-sm text-gray-400">
                      Currently available in {cities.length} cities across India
                    </div>
                  </motion.div>
                )}

                {/* When no search query but showing available cities */}
                {!searchQuery && (
                  <div className="px-4 py-3 bg-gray-50">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      Available Cities
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 
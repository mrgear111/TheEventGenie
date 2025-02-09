'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { database } from '../../../lib/firebase'
import { ref, get } from 'firebase/database'
import Image from 'next/image'
import { Calendar, Users, Eye, Star, Music, Settings, Clock } from 'lucide-react'

interface ArtistData {
  approvalStatus: boolean
  bookingCount: number
  busyDays: {
    [key: string]: string
  }
  details: {
    email: string
    // Add other fields as needed
  }
  email: string
  photoUrl: string
  profileViews: number
}

function ArtistDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [artistData, setArtistData] = useState<ArtistData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.email) {
      router.push('/')
      return
    }

    const fetchArtistData = async () => {
      try {
        const safeKey = user.email.replace(/[.#$[\]]/g, '_').replace('@', 'AT')
        const artistRef = ref(database, `Artists/${safeKey}`)
        const snapshot = await get(artistRef)
        
        if (snapshot.exists()) {
          setArtistData(snapshot.val())
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching artist data:', error)
        setLoading(false)
      }
    }

    fetchArtistData()
  }, [user, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!artistData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-4">Artist Dashboard</h1>
          <p className="text-gray-600">No artist data found.</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Profile Views', value: artistData.profileViews, icon: Eye, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Bookings', value: artistData.bookingCount, icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Busy Days', value: Object.keys(artistData.busyDays || {}).length, icon: Clock, color: 'from-pink-500 to-pink-600' },
    { label: 'Approval Status', value: artistData.approvalStatus ? 'Approved' : 'Pending', icon: Star, color: 'from-green-500 to-green-600' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={artistData.photoUrl || '/default-avatar.png'}
                alt="Artist"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Artist Dashboard</h1>
              <p className="text-gray-600">{artistData.email}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity & Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {/* Add your recent activity items here */}
                <p className="text-gray-600">No recent activity to show.</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Music className="w-5 h-5 text-purple-500" />
                  <span>Update Portfolio</span>
                </button>
                <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span>Manage Schedule</span>
                </button>
                <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>View Requests</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtistDashboard 
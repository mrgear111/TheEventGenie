'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import { database, storage } from '../../../lib/firebase'
import { ref, get, set } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import Image from 'next/image'
import { Calendar, Users, Star, Music, Clock, Camera, Edit, X, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import ScheduleModal from '../../../components/ScheduleModal'
import CreatePostModal from '../../../components/CreatePostModal'

interface ArtistData {
  approvalStatus: boolean
  bookingCount: number
  busyDays: {
    [key: string]: string
  }
  details: {
    artForm: string
    description: string
    facebookLink: string
    fullName: string
    instagramLink: string
    isProfileVisible: boolean
    pricing45: string
    pricing60: string
    pricing90: string
    profileImage: string
    stageName: string
    twitterLink: string
    youtubeLink: string
    email: string
  }
  email: string
  photoUrl: string
  profileViews: number
}

const artistQuotes = [
  {
    quote: "Every performance is a canvas waiting for your colors.",
    author: "EventGenie",
    gradient: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80" // Concert stage with colorful lights
  },
  {
    quote: "Your art has the power to change someone's entire day.",
    author: "EventGenie",
    gradient: "from-blue-500 to-indigo-500",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80" // Music studio setup
  },
  {
    quote: "The stage is yours, make it memorable.",
    author: "EventGenie",
    gradient: "from-green-500 to-emerald-500",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80" // Live performance moment
  },
  {
    quote: "Create moments that become memories.",
    author: "EventGenie",
    gradient: "from-rose-500 to-red-500",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80" // Festival crowd
  },
  {
    quote: "Your passion is your signature. Make it count.",
    author: "EventGenie",
    gradient: "from-amber-500 to-orange-500",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80" // DJ performance
  },
  {
    quote: "Let your music paint the night sky.",
    author: "EventGenie",
    gradient: "from-violet-600 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" // Vibrant concert
  },
  {
    quote: "Every beat tells your story.",
    author: "EventGenie",
    gradient: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80" // Colorful DJ setup
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

interface FormFieldProps {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ElementType;
  multiline?: boolean;
}

const FormField = ({ label, value, onChange, type = "text", placeholder = "", icon: Icon, multiline = false }: FormFieldProps) => (
  <div className="group">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-white rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'px-4'} py-3 bg-white rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300`}
        />
      )}
    </div>
  </div>
);

interface PricingFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ElementType;
}

const PricingField = ({ label, value, onChange, type = "text", placeholder = "0", icon: Icon }: PricingFieldProps) => (
  <div className="group">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {`${label} Minutes Price (₹)`}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 ${
          Icon ? 'pl-10' : 'pl-4'
        }`}
      />
    </div>
  </div>
);

function ArtistDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [artistData, setArtistData] = useState<ArtistData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<Partial<ArtistData['details']>>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [updating, setUpdating] = useState(false)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)

  useEffect(() => {
    if (!user?.email) {
      router.push('/')
      return
    }

    const fetchArtistData = async () => {
      try {
        if (!user?.email) {
          console.error('No user email found');
          return;
        }

        const safeKey = user.email.replace(/[.#$[\]]/g, '_').replace('@', 'AT');
        const artistRef = ref(database, `Artists/${safeKey}`);
        const snapshot = await get(artistRef);
        
        if (snapshot.exists()) {
          setArtistData(snapshot.val());
        } else {
          console.error('No artist data found');
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching artist data:', error)
        setLoading(false)
      }
    }

    fetchArtistData()
  }, [user, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % artistQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleProfileUpdate = async () => {
    if (!user?.email) return;
    
    try {
      setUpdating(true);
      const safeKey = user.email.replace(/[.#$[\]]/g, '_').replace('@', 'AT');
      const artistRef = ref(database, `Artists/${safeKey}`);
      
      // Keep existing data that shouldn't be modified
      const updatedData = {
        ...artistData,
        details: {
          ...artistData?.details,
          ...editedData, // Spread editedData to update all changed fields
          email: user.email // Keep email in sync
        },
        email: user.email,
      };

      // Update in database
      await set(artistRef, updatedData);

      // Refresh the data
      const snapshot = await get(artistRef);
      if (snapshot.exists()) {
        setArtistData(snapshot.val());
      }
      
      setIsEditing(false);
      setEditedData({}); // Clear edited data after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleBlockDate = async (date: string, reason: string) => {
    if (!user?.email) return;
    
    try {
      const safeKey = user.email.replace(/[.#$[\]]/g, '_').replace('@', 'AT');
      const artistRef = ref(database, `Artists/${safeKey}`);
      
      const updatedBusyDays = {
        ...artistData?.busyDays,
        [date]: reason
      };
      
      await set(artistRef, {
        ...artistData,
        busyDays: updatedBusyDays
      });
      
      // Refresh artist data
      const snapshot = await get(artistRef);
      if (snapshot.exists()) {
        setArtistData(snapshot.val());
      }
    } catch (error) {
      console.error('Error blocking date:', error);
    }
  };

  const handleUnblockDate = async (date: string) => {
    if (!user?.email) return;
    
    try {
      const safeKey = user.email.replace(/[.#$[\]]/g, '_').replace('@', 'AT');
      const artistRef = ref(database, `Artists/${safeKey}`);
      
      const updatedBusyDays = { ...artistData?.busyDays };
      delete updatedBusyDays[date];
      
      await set(artistRef, {
        ...artistData,
        busyDays: updatedBusyDays
      });
      
      // Refresh artist data
      const snapshot = await get(artistRef);
      if (snapshot.exists()) {
        setArtistData(snapshot.val());
      }
    } catch (error) {
      console.error('Error unblocking date:', error);
    }
  };

  const handleCreatePost = async (postData: {
    content: string
    mediaUrl?: string
    mediaType?: 'image' | 'video' | 'audio'
    mediaFile?: File | null
  }) => {
    if (!user?.email) return
    
    try {
      const safeKey = user.email.replace(/[.#$[\]]/g, '_').replace('@', 'AT')
      const postRef = ref(database, `posts/${Date.now()}`)
      
      let mediaUrl = undefined
      let mediaType = undefined

      // If there's a media file, upload it first
      if (postData.mediaFile) {
        const fileRef = storageRef(storage, `posts/${safeKey}/${Date.now()}-${postData.mediaFile.name}`)
        await uploadBytes(fileRef, postData.mediaFile)
        mediaUrl = await getDownloadURL(fileRef)
        mediaType = postData.mediaFile.type.split('/')[0]
      }

      // Create post object with only defined values
      const post = {
        artistId: safeKey,
        content: postData.content,
        ...(mediaUrl && { mediaUrl }),
        ...(mediaType && { mediaType }),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      }

      await set(postRef, post)
    } catch (error) {
      console.error('Error creating post:', error)
      throw error // Re-throw to handle in the modal
    }
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-8 mb-8 border border-white hover:shadow-xl transition-all duration-500"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative w-24 h-24"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-lg opacity-20" />
                <Image
                  src={artistData?.photoUrl || '/default-avatar.png'}
                  alt="Profile"
                  fill
                  className="object-cover rounded-full ring-4 ring-white relative z-10"
                />
                {isEditing && (
                  <motion.label 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors z-20"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Camera className="w-5 h-5 text-gray-600" />
                  </motion.label>
                )}
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  {artistData?.details.stageName || artistData?.details.fullName}
                </motion.h1>
                <p className="text-gray-500">{artistData?.details.artForm || 'Artist'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                      Verified Artist
                    </span>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      {artistData?.bookingCount || 0} Bookings
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Reset editedData to current values when starting to edit
                setEditedData({
                  stageName: artistData?.details.stageName || '',
                  artForm: artistData?.details.artForm || '',
                  description: artistData?.details.description || '',
                  pricing45: artistData?.details.pricing45 || '',
                  pricing60: artistData?.details.pricing60 || '',
                  pricing90: artistData?.details.pricing90 || '',
                  facebookLink: artistData?.details.facebookLink || '',
                  instagramLink: artistData?.details.instagramLink || '',
                  twitterLink: artistData?.details.twitterLink || '',
                  youtubeLink: artistData?.details.youtubeLink || '',
                  isProfileVisible: artistData?.details.isProfileVisible || false,
                });
                setIsEditing(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="relative h-64 flex items-center justify-center"> {/* Increased height */}
            {artistQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: currentQuoteIndex === index ? 1 : 0,
                  scale: currentQuoteIndex === index ? 1 : 0.9,
                  rotateY: currentQuoteIndex === index ? 0 : -30
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`absolute inset-0 ${
                  currentQuoteIndex === index ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <Image
                    src={quote.image}
                    alt="Background"
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-2000"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${quote.gradient} opacity-80 group-hover:opacity-75 transition-opacity duration-500`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl md:text-3xl font-medium text-white text-center shadow-text"
                    >
                      "{quote.quote}"
                    </motion.p>
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm mt-4 text-white/90"
                    >
                      — {quote.author}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Today's Motivation</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {artistData?.bookingCount ? 
                    "You&apos;ve inspired " + artistData.bookingCount + " events so far!" : 
                    "Start your journey to inspire events!"
                  }
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden md:block"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-sm">
                  Keep Creating Magic! ✨
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content with staggered animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 border border-white"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Details</h2>
              {isEditing ? (
                <div className="space-y-8">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Full Name"
                      value={editedData.fullName || artistData?.details.fullName || ''}
                      onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
                      placeholder="Your full name"
                    />
                    <FormField
                      label="Stage Name"
                      value={editedData.stageName || artistData?.details.stageName || ''}
                      onChange={(e) => setEditedData({ ...editedData, stageName: e.target.value })}
                      placeholder="Your stage name"
                      icon={Music}
                    />
                    <FormField
                      label="Art Form"
                      value={editedData.artForm || artistData?.details.artForm || ''}
                      onChange={(e) => setEditedData({ ...editedData, artForm: e.target.value })}
                      placeholder="e.g., Musician, Dancer"
                      icon={Star}
                    />
                    <div className="col-span-2">
                      <FormField
                        label="Description"
                        value={editedData.description || artistData?.details.description || ''}
                        onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                        placeholder="Tell us about yourself and your art..."
                        multiline
                      />
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <PricingField
                        label="45"
                        value={editedData.pricing45 || artistData?.details.pricing45 || ''}
                        onChange={(e) => setEditedData({ ...editedData, pricing45: e.target.value })}
                      />
                      <PricingField
                        label="60"
                        value={editedData.pricing60 || artistData?.details.pricing60 || ''}
                        onChange={(e) => setEditedData({ ...editedData, pricing60: e.target.value })}
                      />
                      <PricingField
                        label="90"
                        value={editedData.pricing90 || artistData?.details.pricing90 || ''}
                        onChange={(e) => setEditedData({ ...editedData, pricing90: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Social Media Links */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        label="Instagram"
                        value={editedData.instagramLink || artistData?.details.instagramLink || ''}
                        onChange={(e) => setEditedData({ ...editedData, instagramLink: e.target.value })}
                        placeholder="Instagram profile URL"
                        icon={Instagram}
                      />
                      <FormField
                        label="Facebook"
                        value={editedData.facebookLink || artistData?.details.facebookLink || ''}
                        onChange={(e) => setEditedData({ ...editedData, facebookLink: e.target.value })}
                        placeholder="Facebook profile URL"
                        icon={Facebook}
                      />
                      <FormField
                        label="Twitter"
                        value={editedData.twitterLink || artistData?.details.twitterLink || ''}
                        onChange={(e) => setEditedData({ ...editedData, twitterLink: e.target.value })}
                        placeholder="Twitter profile URL"
                        icon={Twitter}
                      />
                      <FormField
                        label="YouTube"
                        value={editedData.youtubeLink || artistData?.details.youtubeLink || ''}
                        onChange={(e) => setEditedData({ ...editedData, youtubeLink: e.target.value })}
                        placeholder="YouTube channel URL"
                        icon={Youtube}
                      />
                    </div>
                  </div>

                  {/* Profile Visibility */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Profile Visibility</h3>
                        <p className="text-sm text-gray-500">Make your profile visible to potential clients</p>
                      </div>
                      <div className="relative inline-block w-12 h-6">
                        <input
                          type="checkbox"
                          checked={editedData.isProfileVisible ?? artistData?.details.isProfileVisible ?? false}
                          onChange={(e) => setEditedData({ ...editedData, isProfileVisible: e.target.checked })}
                          className="sr-only"
                        />
                        <div
                          onClick={() => setEditedData({ 
                            ...editedData, 
                            isProfileVisible: !(editedData.isProfileVisible ?? artistData?.details.isProfileVisible ?? false) 
                          })}
                          className={`block w-12 h-6 rounded-full transition-colors duration-300 ease-in-out cursor-pointer ${
                            editedData.isProfileVisible ? 'bg-purple-500' : 'bg-gray-200'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ease-in-out transform ${
                              editedData.isProfileVisible ? 'translate-x-7' : 'translate-x-1'
                            } mt-1`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsEditing(false);
                        setEditedData({}); // Clear edited data when canceling
                      }}
                      className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleProfileUpdate}
                      disabled={updating}
                      className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300"
                    >
                      {updating ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving...</span>
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Stage Name</h3>
                      <p className="mt-1 text-sm text-gray-900">{artistData?.details.stageName || 'Not set'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Art Form</h3>
                      <p className="mt-1 text-sm text-gray-900">{artistData?.details.artForm || 'Not set'}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Description</h3>
                      <p className="mt-1 text-sm text-gray-900">{artistData?.details.description || 'No description added'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Price per Hour</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {artistData?.details.pricing45 ? '₹' + artistData.details.pricing45 : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 border border-white"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Social Media</h2>
              <div className="flex flex-wrap gap-4">
                {/* Instagram */}
                {artistData?.details.instagramLink && (
                  <motion.a
                    href={artistData.details.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white hover:shadow-lg transition-all duration-300"
                  >
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                )}

                {/* Facebook */}
                {artistData?.details.facebookLink && (
                  <motion.a
                    href={artistData.details.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg text-white hover:shadow-lg transition-all duration-300"
                  >
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                )}

                {/* Twitter */}
                {artistData?.details.twitterLink && (
                  <motion.a
                    href={artistData.details.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg text-white hover:shadow-lg transition-all duration-300"
                  >
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                )}

                {/* YouTube */}
                {artistData?.details.youtubeLink && (
                  <motion.a
                    href={artistData.details.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg text-white hover:shadow-lg transition-all duration-300"
                  >
                    <Youtube className="w-6 h-6" />
                  </motion.a>
                )}

                {/* Show message if no social media links */}
                {!artistData?.details.instagramLink && 
                 !artistData?.details.facebookLink && 
                 !artistData?.details.twitterLink && 
                 !artistData?.details.youtubeLink && (
                  <p className="text-gray-500 text-sm italic">
                    No social media links added yet. Edit your profile to add them.
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Enhanced Quick Actions */}
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { 
                    label: 'Update Portfolio', 
                    icon: Music, 
                    gradient: 'from-purple-500 to-pink-500',
                    hoverGradient: 'hover:from-purple-600 hover:to-pink-600',
                    onClick: () => {}
                  },
                  { 
                    label: 'Manage Schedule', 
                    icon: Calendar, 
                    gradient: 'from-blue-500 to-cyan-500',
                    hoverGradient: 'hover:from-blue-600 hover:to-cyan-600',
                    onClick: () => setIsScheduleModalOpen(true)
                  },
                  { 
                    label: 'View Requests', 
                    icon: Users, 
                    gradient: 'from-green-500 to-emerald-500',
                    hoverGradient: 'hover:from-green-600 hover:to-emerald-600',
                    onClick: () => {}
                  },
                  {
                    label: 'Create Post',
                    icon: Camera,
                    gradient: 'from-orange-500 to-red-500',
                    hoverGradient: 'hover:from-orange-600 hover:to-red-600',
                    onClick: () => setIsCreatePostModalOpen(true)
                  }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r ${action.gradient} ${action.hoverGradient} rounded-lg transition-all duration-300 hover:shadow-lg shadow-md`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Add the Schedule Modal */}
        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          busyDays={artistData?.busyDays || {}}
          onBlockDate={handleBlockDate}
          onUnblockDate={handleUnblockDate}
        />

        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          onCreatePost={handleCreatePost}
        />
      </div>
    </div>
  )
}

export default ArtistDashboard 
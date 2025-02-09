'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { database } from '../../lib/firebase'
import { ref, get, query, orderByChild, onValue } from 'firebase/database'
import Image from 'next/image'
import { Heart, MessageCircle, Share2, Play } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  artistId: string
  content: string
  mediaUrl?: string
  mediaType?: 'image' | 'video' | 'audio'
  createdAt: string
  likes: number
  comments: number
  artistData: {
    stageName: string
    photoUrl: string
    artForm: string
  }
}

export default function FeedsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const postsRef = ref(database, 'posts')
    const postsQuery = query(postsRef, orderByChild('createdAt'))

    // Set up real-time listener
    const unsubscribe = onValue(postsQuery, async (snapshot) => {
      try {
        if (snapshot.exists()) {
          const postsData = snapshot.val()
          const postsArray = await Promise.all(
            Object.entries(postsData).map(async ([id, post]: [string, any]) => {
              try {
                const artistRef = ref(database, `Artists/${post.artistId}`)
                const artistSnapshot = await get(artistRef)
                const artistData = artistSnapshot.val()

                if (!artistData) {
                  console.error(`No artist data found for ID: ${post.artistId}`)
                  return null
                }

                return {
                  id,
                  ...post,
                  artistData: {
                    stageName: artistData.details.stageName || 'Unknown Artist',
                    photoUrl: artistData.photoUrl || '/default-avatar.png',
                    artForm: artistData.details.artForm || 'Artist'
                  }
                }
              } catch (error) {
                console.error(`Error fetching artist data for post ${id}:`, error)
                return null
              }
            })
          )
          
          // Filter out any null values and reverse to show newest first
          setPosts(postsArray.filter(Boolean).reverse())
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Artist Feeds
        </h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center space-x-4">
                <Link href={`/artist/${post.artistId}`}>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.artistData.photoUrl || '/default-avatar.png'}
                      alt={post.artistData.stageName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div>
                  <Link href={`/artist/${post.artistId}`}>
                    <h3 className="font-semibold text-gray-900">
                      {post.artistData.stageName}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500">{post.artistData.artForm}</p>
                </div>
              </div>

              {/* Post Content */}
              {post.content && (
                <p className="px-4 py-2 text-gray-700">{post.content}</p>
              )}

              {/* Media */}
              {post.mediaUrl && (
                <div className="relative aspect-video bg-gray-100">
                  {post.mediaType === 'image' && (
                    <Image
                      src={post.mediaUrl}
                      alt="Post media"
                      fill
                      className="object-cover"
                    />
                  )}
                  {post.mediaType === 'video' && (
                    <video src={post.mediaUrl} className="w-full" controls />
                  )}
                  {post.mediaType === 'audio' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                      <audio src={post.mediaUrl} className="w-full px-4" controls />
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="p-4 flex items-center space-x-6 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{post.likes || 0}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments || 0}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 
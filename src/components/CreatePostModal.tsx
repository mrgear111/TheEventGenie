'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon, Video, Music, Send } from 'lucide-react'
import Image from 'next/image'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePost: (post: {
    content: string
    mediaUrl?: string
    mediaType?: 'image' | 'video' | 'audio'
    mediaFile?: File | null
  }) => Promise<void>
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onCreatePost
}: CreatePostModalProps) {
  const [content, setContent] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string>('')
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | null>(null)
  const [loading, setLoading] = useState(false)

  const handleMediaSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const type = file.type.split('/')[0] as 'image' | 'video' | 'audio'
    setMediaType(type)
    setMediaFile(file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setMediaPreview(previewUrl)
  }

  const handleSubmit = async () => {
    if (!content && !mediaFile) return
    
    setLoading(true)
    try {
      await onCreatePost({
        content,
        mediaFile: mediaFile
      })
      
      // Reset form
      setContent('')
      setMediaFile(null)
      setMediaPreview('')
      setMediaType(null)
      onClose()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-lg w-full"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create Post</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />

              {mediaPreview && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  {mediaType === 'image' && (
                    <Image
                      src={mediaPreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  )}
                  {mediaType === 'video' && (
                    <video src={mediaPreview} className="w-full h-full" controls />
                  )}
                  {mediaType === 'audio' && (
                    <audio src={mediaPreview} className="w-full mt-4" controls />
                  )}
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/*,audio/*"
                    className="hidden"
                    onChange={handleMediaSelect}
                  />
                  <ImageIcon className="w-6 h-6 text-gray-500" />
                </label>
                <button
                  onClick={handleSubmit}
                  disabled={loading || (!content && !mediaFile)}
                  className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
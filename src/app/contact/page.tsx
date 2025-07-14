'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-purple-900/20 to-transparent" />
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

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-6"
          />
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
            Let&apos;s Create Something
            <br />
            Amazing Together
          </h1>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re an artist looking to perform, a venue seeking talent, or just
            excited about what we&apos;re building - we&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-gray-700"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Send us a message
              </h2>
              <p className="text-gray-400">
                We&apos;re currently in beta, building something special. Your feedback helps shape our platform!
              </p>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition h-32 text-white placeholder-gray-400"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/90 backdrop-blur-xl p-8 rounded-2xl border border-gray-700"
            >
              <h3 className="font-semibold mb-6 text-white">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-full">
                    <Mail className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-gray-400">mrgear111@gmail.com</p>
                        <p className="text-gray-400">mudit292005@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-full">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Phone</h3>
                    <p className="text-gray-400">+91 89553 88304</p>
                        <p className="text-gray-400">+91 96724 67580</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-pink-500/10 rounded-full">
                    <MapPin className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Location</h3>
                    <p className="text-gray-400">Jaipur</p>
                    <p className="text-sm text-gray-500">India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-2xl text-white"
            >
              <h3 className="font-semibold mb-4">Follow Our Journey</h3>
              <div className="flex gap-4">
                <Link href="https://www.instagram.com/youreventgenie/" target="_blank" rel="noopener" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="h-32 bg-gradient-to-t from-blue-900/20 to-transparent relative mt-20">
        {/* Copyright Text */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EventGenie. All rights reserved.
        </div>
      </div>
    </div>
  )
} 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com', // For Google profile photos
      'firebasestorage.googleapis.com' // For Firebase Storage
    ],
    formats: ['image/webp'],
    remotePatterns: [],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Recommended settings for production
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig 
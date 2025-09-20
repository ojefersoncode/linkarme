/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  
  // Optimize for redirects
  async rewrites() {
    return [
      {
        source: '/:domain/:slug',
        destination: '/r/:domain/:slug',
        has: [
          {
            type: 'host',
            value: '(?!localhost|127\\.0\\.0\\.1|.*\\.vercel\\.app$).*',
          },
        ],
      },
    ]
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/r/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Images configuration
  images: {
    unoptimized: true,
  },
}

export default nextConfig

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  output: 'standalone', // Enable standalone output for Docker
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
  // Redirects for old URLs (if needed)
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/fnb',
        permanent: true,
      },
      {
        source: '/product/:path*',
        destination: '/fnb/:path*',
        permanent: true,
      },
      {
        source: '/foods',
        destination: 'https://foods.tasteiq.in',
        permanent: true,
      },
      {
        source: '/foods/:path*',
        destination: 'https://foods.tasteiq.in/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = withMDX(nextConfig)


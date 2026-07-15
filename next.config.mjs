const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/collection-stories',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/collection-stories/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

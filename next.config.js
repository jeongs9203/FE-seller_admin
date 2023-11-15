/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        // port: '',
        // pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/isomorphic-furyroad/public/**',
      },
      {
        protocol: 'https',
        hostname: 'isomorphic-furyroad.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'lp2.hm.com',
      },
      {
        protocol: 'https',
        hostname: 'gentledog-bucket.s3.ap-northeast-2.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'lp2.hm.com'
      },
      {
        protocol: 'https',
        hostname: 'gentledog.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_API_URL: process.env.BASE_API_URL,
  },
};
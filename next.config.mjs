/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      // Dalle image generation configuration
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'oaidalleapiprodscus.blob.core.windows.net',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during build
  },
  output: 'standalone',
  // Add this to prevent static page generation
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;

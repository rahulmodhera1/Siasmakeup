/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All photography is served from the local /public folder, so no remote
    // patterns are required. Formats kept modern for crisp, light delivery.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

export default {
  experimental: {
    ppr: true,
    // inlineCss breaks next/font woff2 URLs in production (relative ../media paths 404 when CSS is inlined in HTML).
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

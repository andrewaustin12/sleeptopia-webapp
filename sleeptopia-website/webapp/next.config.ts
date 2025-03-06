import createMDX from '@next/mdx';

/**
 * Next.js Configuration File
 * This file configures various Next.js project settings and features.
 * 
 * Key uses:
 * 1. Configure image domains for Next.js Image component
 * 2. Set up redirects, rewrites
 * 3. Enable/disable Next.js features
 * 4. Configure build settings
 */
const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Configure allowed external image domains for next/image
    // Without this, external images won't load with next/image component
    // Usage example: <Image src="https://images.unsplash.com/photo-123" />
    remotePatterns: [
      // NextJS <Image> component needs to whitelist domains for src={}
      {
        protocol: 'https' as const,
        hostname: 'lh3.googleusercontent.com', // Google OAuth profile pictures
      },
      {
        protocol: 'https' as const,
        hostname: 'pbs.twimg.com', // Twitter profile pictures and media
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com', // Unsplash image library
      },
      {
        protocol: 'https' as const,
        hostname: 'logos-world.net', // Logo images
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          }
        ],
      },
    ];
  },
  // Other common config options (currently not used):
  // - rewrites(): Modify incoming request paths
  // - redirects(): Set up URL redirects
  // - webpack: Custom webpack config
  // - env: Environment variables
  // - i18n: Internationalization settings
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);
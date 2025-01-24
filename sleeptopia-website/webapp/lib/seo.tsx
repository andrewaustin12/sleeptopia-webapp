import type { Metadata } from "next";
import config from "@/config";

/**
 * Generates SEO metadata for Next.js pages
 * This function centralizes all SEO-related configurations
 * Import and use in layout.tsx as: export const metadata = getSEOTags();
 */
export const getSEOTags = (): Metadata => ({
  // Basic metadata
  title: {
    // Main title for your app - appears in search results and browser tabs
    default: `${config.appName} - Stop Snoring & Sleep Apnea Exercises`,
    // Template for other pages: "Page Name | Your App Name"
    template: `%s | ${config.appName}`
  },
  // Main description used for search results and social sharing
  description: "Reduce snoring and sleep apnea with proven exercises. Strengthen your airway muscles for better breathing and peaceful nights. Science-backed exercises to help you and your partner sleep better.",
  // Favicon and other icons
  icons: {
    icon: config.appIcon,
  },
  // Keywords help with SEO - add or remove based on your specific features
  keywords: [
    "stop snoring exercises",
    "anti-snoring exercises",
    "sleep apnea exercises",
    "snoring exercises",
    "stop snoring",
    "snoring",
    "snoring treatment",
    "sleep apnea treatment",
    "mouth exercises for sleep apnea",
    "throat exercises for snoring",
    "reduce snoring naturally",
    "sleep breathing exercises",
    "airway strengthening",
    "snoring solutions",
    "sleep apnea relief",
    "better sleep exercises",
    "stop sleep apnea",
    "sleep apnea",
    "sleep apnea treatment",
  ],
  // Author and creator information
  authors: [{ name: "Andy Oz" }],
  creator: "Andy Oz",
  // Base URL for all metadata - IMPORTANT: Update with your production domain
  metadataBase: new URL(`https://${config.domainName}`),

  // OpenGraph metadata (for social media sharing - Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${config.domainName}`,
    siteName: config.appName,
    title: `${config.appName} - Stop Snoring with Simple Daily  apnea relief",
    "sleep apnea relief",Exercises`,
    description: "Transform your sleep with proven exercises that reduce snoring and sleep apnea. Track your progress, follow guided exercises, and enjoy peaceful nights.",
    // OG Image should be 1200x630px for best display on social platforms
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${config.appName} - Anti-Snoring & Sleep Apnea Exercise Program`,
      },
    ],
  },

  // Twitter card metadata (for Twitter sharing)
  twitter: {
    card: 'summary_large_image',
    title: `${config.appName} - Stop Snoring & Sleep Better Tonight`,
    description: "Science-backed exercises to reduce snoring and sleep apnea. Start your journey to quieter, more restful sleep.",
    images: ['/og-image.png'],
    // Update with your Twitter handle in config
    creator: config.social.x,
  },

  // Search engine crawler settings
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Search engine verification codes
  // Get these from Google Search Console, Bing Webmaster Tools, etc.
  verification: {
    google: 'your-google-verification-code',
  },
});

/**
 * Renders Schema.org structured data
 * This helps search engines better understand your content
 * Import and use in layout.tsx within the <body> tag: {renderSchemaTags()}
 */
export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "SoftwareApplication",
          name: config.appName,
          description: "Anti-snoring and sleep apnea exercise app with guided routines, progress tracking, and daily reminders to help reduce snoring and improve sleep quality.",
          image: `https://${config.domainName}/SleeptopiaAppIcon.ico`,
          url: `https://${config.domainName}/`,
          author: {
            "@type": "Person",
            name: "Andy Oz",
          },
          // Update these values based on your application
          datePublished: "2025-01-24",
          applicationCategory: "HealthApplication",
          // Update or remove if not applicable
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            ratingCount: "120",
          },
          // Update or remove if not applicable
          offers: [
            {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "USD",
            },
          ],
          keywords: "stop snoring, sleep apnea exercises, anti-snoring exercises, better sleep, snoring solution",
        }),
      }}
    ></script>
  );
};

const config = {
  // REQUIRED: This shows what the name of the app. It shows up in the name in the browser tab.
  //           It is showing up in all places where the app name is to be shown.
  appName: "Sleeptopia",
  appIcon: "/SleeptopiaAppIcon.ico",
  appLogoTransparent: "/app-logo-transparent.png",
  // Optional - The theme of your app. Can be "light" or "dark". Defaults to "dark".
  theme: {
    mode: "light",               
    // "light" or "dark"
    colors: {
      // Primary color used for main buttons, links, and highlights
      primary: "#8ca5f8",           
      
      
      // Optional: Different shades of the primary color
      primaryLight: "#ffb84d",      
      // Lighter shade for hover states
      primaryDark: "#948fe6",      
      // Darker shade for active states

      // Optional: Secondary colors for different UI elements
      secondary: "#212121",        
      // Current dark background color
      // Optional: Accent colors for special elements
      accentPositive: "#22c55e",          
      // Success/green color (currently used in promotion badges)
      accentNegative: "#f43f5e",         
      // Error/red color (currently used in promotion badges)
    }
  },
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Reduce sleep apnea symptoms with guided exercises. Strengthen your airway muscles for better breathing and restful nights. Enjoy improved sleep and vitality!",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "sleeptopia.app",

  // REQUIRED: Update with your social media links
  social: {
    bluesky: "@neoprenecowboy",
    github: "https://github.com/andrew-austin-dev/mvpfast-convex",
    linkedin: "https://www.linkedin.com/in/andrew-austin-dev/",
    x: "https://x.com/andrew_austin_dev",
  },
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Starter",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "",
        // The price you want to display, the one user will be charged on Stripe.
        price: 79,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 179,
        currency: "USD",
        features: [
          { name: "NextJS boilerplate", included: true },
          { name: "SEO & Blog", included: true },
          { name: "Stripe payments", included: true },
          { name: "Clerk authentication", included: true },
          { name: "Convex database / Supabase", included: true },
          { name: "Resend emails", included: true },
          { name: "Components library", included: true },
          { name: "ChatGPT prompts for terms & privacy", included: true },
          { name: "Discord Community & leaderboard", included: false },
          { name: "24/7 support", included: false },
          { name: "Lifetime updates", included: false },
        ],
      },
      {
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        name: "All-In",
        description: "",
        price: 99,
        priceAnchor: 199,
        currency: "USD",
        features: [
          { name: "NextJS boilerplate", included: true },
          { name: "SEO & Blog", included: true },
          { name: "Stripe payments", included: true },
          { name: "Clerk authentication", included: true },
          { name: "Convex database / Supabase", included: true },
          { name: "Resend emails", included: true },
          { name: "Components library", included: true },
          { name: "ChatGPT prompts for terms & privacy", included: true },
          { name: "Discord Community & leaderboard", included: true },
          { name: "24/7 support", included: true },
          { name: "Lifetime updates", included: true },

        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `MVP Fast <noreply@mg.mvpfa.st>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `MVP Fast <andy@mvpfa.st>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "andy@mvpfa.st",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "andrew@mvpfa.st",
  },
  resend: {
    // REQUIRED - Resend API key from your dashboard
    apiKey: process.env.RESEND_API_KEY,
    // REQUIRED - Email 'From' field for magic login links
    fromNoReply: `Sleeptopia <noreply@sleeptopia.app>`,
    // REQUIRED - Email 'From' field for administrative emails
    fromAdmin: `Sleeptopia <andy@sleeptopia.app>`,
    // Optional - Support email address shown to customers
    supportEmail: "andy@sleeptopia.app",
  },
  auth: {
    // REQUIRED — the path to log in users via Clerk. It's used to protect private routes (like /dashboard) and for redirecting users when authentication is needed
    loginUrl: "/sign-in",
    // REQUIRED — the path to redirect users after successful login. This is normally a private page for users to manage their accounts
    callbackUrl: "/dashboard",
  },
  landingPage: {
    // REQUIRED - Hero section configuration
    hero: {
      badge: "🌙 Better Sleep Starts Here",
      title: "Transform Your Sleep with Guided Exercises",
      description: "Our app provides a variety of guided exercises specifically designed to strengthen your airway muscles, promoting easier breathing and reducing sleep apnea symptoms. Whether you're new to managing sleep apnea or looking to enhance your current routine, our exercises cater to all levels and needs.",
      cta: "Start Your Journey",
      image: {
        src: "/mockup-hero.png",
        alt: "Sleeptopia App Preview"
      },
      promotion: {
        discount: "30% off",
        remainingCount: 50,
        totalCount: 100
      }
    },
    // OPTIONAL - Problem section configuration
    problem: {
      title: "The Impact of Sleep Apnea",
      description: "Understanding the daily challenges of untreated sleep apnea",
      problems: [
        { value: "30+", metric: "breathing pauses per hour", color: "accentNegative" },
        { value: "70", metric: "decibels of snoring (as loud as a vacuum)", color: "accentNegative" },
        { value: "3x", metric: "increased risk of car accidents", color: "accentNegative" },
        { value: "4x", metric: "higher risk of heart problems", color: "accentNegative" },
        { value: "50%", metric: "reduction in daily productivity", color: "accentNegative" },
        { value: "5x", metric: "increased risk of depression", color: "accentNegative" },
        { value: "7hrs", metric: "of disrupted sleep per night", color: "accentNegative" },
        { value: "80%", metric: "of cases remain undiagnosed", color: "accentNegative" }
      ],
      badge: "Why It Matters",
      badgeColor: "rgba(255, 51, 51, 0.2)",
      badgeTextColor: "accentNegative",
      summary: "of people affected worldwide struggle with sleep apnea",
      summaryValue: "936M"
    },
    // OPTIONAL - Frequently Asked Questions shown on the landing page
    faq: [
      {
        question: "What is Sleeptopia?",
        answer: "Sleeptopia is a specialized app designed to help reduce sleep apnea symptoms through guided exercises that strengthen your airway muscles. Our comprehensive approach includes exercise tracking, progress monitoring, and personalized journaling."
      },
      {
        question: "How do the exercises help with sleep apnea?",
        answer: "The exercises in our app are specifically designed to strengthen the muscles in your airway, which can help reduce sleep apnea symptoms. Regular practice of these exercises can lead to improved breathing during sleep and better sleep quality."
      },
      {
        question: "Is this app a replacement for medical treatment?",
        answer: "No, Sleeptopia is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with your healthcare provider before beginning any new exercise regimen, especially if you have sleep apnea or other health conditions."
      },
      {
        question: "How long before I see results?",
        answer: "While individual results may vary, many users report improvements in their sleep quality within a few weeks of consistent exercise practice. Our six-week training program is designed to help you progressively build strength and see measurable improvements."
      }
    ],
    // OPTIONAL - How it Works section configuration
    howItWorks: {
      title: "Launch Your SaaS in 3 Simple Steps",
      steps: [
        {
          title: "Clone the Repository",
          description: "Start with our production-ready codebase. One command to get everything you need:",
          code: "git clone https://github.com/shipfast/saas-template.git"    // Optional: code snippet to display
        },
        {
          title: "Make It Yours",
          description: "Customize the template to match your needs. All components are modular and well-documented:",
          bullets: [                                      // Optional: bullet points to display
            "Modify the UI with 30+ pre-built components",
            "Configure Clerk, Stripe and Convex or Supabase authentication and payment settings",
            "Add your business logic and features"
          ]
        },
        {
          title: "Ship to Production",
          description: "Deploy with confidence using our production-ready infrastructure:",
          bullets: [
            "Change to production in Clerk, Stripe and Convex or Supabase",
            "Push to deploy to Vercel",
          ]
        }
      ]
    },
    // OPTIONAL - Newsletter section configuration
    newsletter: {
      title: "Join the Community",
      description: "Get notified about updates, new features, and our developer community.",
      buttonText: "Subscribe",
      inputPlaceholder: "you@example.com"
    },
    // OPTIONAL - Features section configuration
    features: {
      badge: "Features",
      title: "Your Complete Sleep Apnea Exercise Solution",
      description: "Discover our comprehensive suite of tools designed to help you strengthen your airway muscles and improve your sleep quality.",
      sections: [
        {
          title: "Comprehensive Exercise Plans",
          description: "Access detailed exercise programs with flexible viewing options and thorough instructions for optimal results.",
          features: [
            "Daily, weekly, and monthly plan views",
            "Detailed exercise instructions",
            "Free training resources",
            "Six-week structured program"
          ],
          imageSrc: "/mockup-weekly.png",
          imageAlt: "Exercise program interface mockup"
        },
        {
          title: "Progress Tracking and Motivation",
          description: "Stay motivated and monitor your journey with comprehensive tracking tools and achievement metrics.",
          features: [
            "Exercise streak tracking",
            "Weekly and monthly progress views",
            "Achievement milestones",
            "Long-term progress analytics"
          ],
          imageSrc: "/mockup-progress.png",
          imageAlt: "Progress tracking interface mockup"
        },
        {
          title: "Personalized Sleep Journal",
          description: "Track your sleep journey with detailed journaling features and comprehensive analytics.",
          features: [
            "Exercise effectiveness tracking",
            "Daily sleep insights",
            "Personal note-taking",
            "Sleep quality analytics"
          ],
          imageSrc: "/mockup-journal.png",
          imageAlt: "Sleep journal interface mockup"
        },
        {
          title: "Customizable Experience",
          description: "Personalize your app experience with customizable settings and features to match your needs.",
          features: [
            "Daily exercise reminders",
            "Feature request system",
            "Custom theme options",
            "iCloud sync support"
          ],
          imageSrc: "/mockup-timer.png",
          imageAlt: "Settings interface mockup"
        },
        {
          title: "Educational Resources",
          description: "Access valuable information and research to understand the science behind your exercises.",
          features: [
            "Research studies access",
            "Exercise effectiveness data",
            "Educational content",
            "Regular content updates"
          ],
          imageSrc: "/mockup-community.png",
          imageAlt: "Educational resources interface mockup"
        }
      ]
    },
  },
};

export default config;

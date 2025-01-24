/**
 * Hero Component - MVPFast Boilerplate
 * 
 * 👋 Welcome to MVPFast! This is your main hero section component.
 * 
 * 🎯 Features:
 * - Responsive design
 * - Background image with gradient overlay
 * - Integrated search functionality
 * - Customizable content sections
 * 
 * 🎨 Customization:
 * 1. Update background image in style prop
 * 2. Modify text content
 * 3. Adjust height (currently 650px)
 * 4. Customize gradient overlay colors
 * 
 * 💡 Optional Features:
 * - Uncomment <TrustedBy /> component to add social proof
 * - Modify SearchBar placeholder text
 * - Add additional CTAs or content sections
 * 
 * @copyright MVPFast Boilerplate 2024
 */

'use client';

import SearchBar from "@/components/SearchBar";
// import TrustedBy from "@/components/TrustedBy"; // Uncomment to add social proof

interface HeroProps {
  onSearch?: (searchTerm: string) => void;
  /** Override default heading text */
  heading?: {
    main: string;
    highlight: string;
    subheading: string;
  };
  /** Override default background image */
  backgroundImage?: string;
  /** Override default search placeholder */
  searchPlaceholder?: string;
}

export default function Hero({ 
  onSearch,
  heading = {
    main: "Build Your MVP",
    highlight: "in Days",
    subheading: "The fastest way to turn your idea into a production-ready application. Start building with MVPFast today."
  },
  backgroundImage = '/hero-bg-1.jpg',
  searchPlaceholder = "Search features..."
}: HeroProps) {
  return (
    <section 
      className="relative h-[650px] bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url('${backgroundImage}')`
      }}
    >
      {/* Content */}
      <div className="relative container px-4 h-full flex flex-col justify-center">
        <div className="text-center space-y-12 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-[3rem] md:text-[4rem] font-bold tracking-tight leading-[1.1] text-white">
              {heading.main}
            </h1>
            <h1 className="text-[3rem] md:text-[4rem] font-bold tracking-tight leading-[1.1] text-white">
              <span className="inline-block bg-white px-6 py-2 -skew-x-12 text-gray-900">
                {heading.highlight}
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-100 mt-12 max-w-2xl mx-auto">
              {heading.subheading}
            </h2>
          </div>
          
          {/* Search Form */}
          <div className="max-w-2xl mx-auto mt-12">
            <SearchBar 
              onSearch={onSearch}
              placeholder={searchPlaceholder}
            />
          </div>

          {/* Uncomment to add social proof section */}
          {/* <TrustedBy /> */}
        </div>
      </div>
    </section>
  );
}

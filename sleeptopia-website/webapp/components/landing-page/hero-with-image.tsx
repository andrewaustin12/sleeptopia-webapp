import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import config from "@/config";
import PricingButton from "../pricing-button";
import TestimonialsAvatars from "./testimonial-avatars";

export default function Hero() {
  const { badge, title, description, image } = config.landingPage.hero;
  const { colors } = config.theme;

  return (
    <section className="relative py-12 lg:min-h-[90vh] flex items-center bg-secondary/95">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left">
            <Badge 
              variant="secondary" 
              className="mb-3 lg:mb-4" 
              style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
            >
              {badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 lg:mb-6">
              {title}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-6 lg:mb-8">
              {description}
            </p>
            
            {/* CTA Button and Testimonials */}
            <div className="flex flex-col gap-6 items-start">
              <div>
                <PricingButton 
                  text="Start Your Sleep Journey"
                  icon={
                    <svg 
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-5 h-5"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                />
              </div>
              <div className="w-full">
                <TestimonialsAvatars />
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative mt-8 lg:mt-0 h-[400px] sm:h-[500px] lg:h-[600px] w-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover scale-110 px-4"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 
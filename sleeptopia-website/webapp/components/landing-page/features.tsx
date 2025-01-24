"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import config from "@/config";

interface FeatureProps {
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
}

function Feature({ title, description, features, imageSrc, imageAlt, isReversed }: FeatureProps) {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center py-16`}>
      {/* Content Side */}
      <div className="flex-1 space-y-6">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="text-lg text-muted-foreground">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-primary text-lg">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Image Side */}
      <div className="flex-1">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={900}
          className="w-full h-auto scale-125"
          priority
        />
      </div>
    </div>
  );
}

export default function Features() {
  const { features } = config.landingPage;

  return (
    <section id="features" className="py-20 bg-secondary/95">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge 
            className="mb-4" 
            variant="outline"
            style={{ 
              borderColor: config.theme.colors.primary,
              color: config.theme.colors.primary,
              backgroundColor: `${config.theme.colors.primary}10`
            }}
          >
            {features.badge}
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            {features.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {features.description}
          </p>
        </div>

        <div className="space-y-8">
          {features.sections.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
              isReversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
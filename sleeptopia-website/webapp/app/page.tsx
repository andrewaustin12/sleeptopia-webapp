'use client';

import HeroWithImage from "@/components/landing-page/hero-with-image";
import Footer from "@/components/footer";
import CTA from "@/components/landing-page/cta-section";
import Problem from "@/components/landing-page/problem";
import Features from "@/components/landing-page/features";
import FAQ from "@/components/landing-page/faq";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HeroWithImage />
      <Problem /> 
      <Features />
      <FAQ />
      <CTA />
      <Footer/>
    </div>
  );
}
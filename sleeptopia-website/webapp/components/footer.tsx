'use client'

import Link from "next/link";
import Image from "next/image";
import Config from "@/config";
import { Button } from "@/components/ui/button";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.resend.supportEmail, the link won't be displayed.

// Define link types for type safety
type LinkType = {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Centralized link configuration
const footerLinks = {
  Links: [
    { label: 'Features', href: '/#features' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Support', href: 'https://www.ideasandbugz.com/feedback/sleeptopia', isExternal: true },
    { label: 'Instagram', href: 'https://www.instagram.com/sleeptopia_app/', isExternal: true },
  ],
  Boring: [
    { label: 'Privacy Policy', href: '/privacypolicy' },
    { label: 'Terms of Service', href: '/termsofservice' },
  ],
  'By the Maker': [
    { label: 'Apnea Manager', href: 'https://apps.apple.com/us/app/apnea-freedive-stamina-trainer/id6477821385', isExternal: true },
    { label: 'Scuba Desk', href: 'https://apps.apple.com/us/app/scuba-desk-for-padi-ssi-raid/id6535681866', isExternal: true },
    { label: 'Ideas & Bugz', href: 'https://ideasandbugz.com', isExternal: true },
    { label: 'ScreenFast', href: 'https://screenfa.st', isExternal: true },
    { label: 'Dirmap', href: 'https://dirmap.vercel.app/', isExternal: true },
    { label: 'Spotlightz', href: 'https://spotlightz.app', isExternal: true },
    
  ]
} as const;

// Helper component for consistent link rendering
const FooterLink = ({ link }: { link: LinkType }) => {
  if (link.isExternal) {
    return (
      <a 
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-800 transition-colors text-sm"
      >
        {link.label}
      </a>
    );
  }
  
  // Handle smooth scrolling for internal hash links
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (link.href.startsWith('/#')) {
      e.preventDefault();
      const element = document.querySelector(link.href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <Link 
      href={link.href}
      className="text-gray-500 hover:text-gray-800 transition-colors text-sm"
      onClick={handleClick}
    >
      {link.label}
    </Link>
  );
};

export default function Footer() {
  return (
    <footer className="mt-12 border-t ">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Main content wrapper */}
        <div className="flex flex-col md:flex-row md:gap-12 lg:gap-24">
          {/* Brand section */}
          <div className="mb-8 md:mb-0 md:w-64">
            {/* Logo and tagline */}
            <div>
              <Link 
                href="/" 
                className="flex text-2xl items-center font-bold"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Image 
                  src={Config.appIcon}
                  alt={`${Config.appName} logo`}
                  width={40}
                  height={40}
                  className="object-contain mr-2"
                />
                <span>{Config.appName}</span>
              </Link>
              <p className="text-sm text-gray-500 mt-2">{Config.appDescription}</p>
            </div>

            {/* Copyright notice */}
            <p className="text-sm text-gray-400 mt-4">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>

            {/* Built by section */}
            <div className="mt-4">
              <Button
                variant="outline"
                className="inline-flex items-center gap-2 border-border"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className="text-md ">Built with</span>
                <Image 
                  src= "/app-logo-transparent.png"
                  alt={`${Config.appName} logo`}
                  width={30}
                  height={30}
                  className="object-contain"
                />
                <span className="text-md font-bold text-foreground">MvpFast</span>
              </Button>
            </div>
          </div>

          {/* Navigation grid */}
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:mt-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold mb-4 text-gray-600 uppercase tracking-wider">
                  {title}
                </h3>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
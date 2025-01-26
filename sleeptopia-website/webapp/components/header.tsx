'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth, UserButton } from "@clerk/clerk-react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import config from "@/config";
//import { ModeToggle } from "./themetoggle";

// This header component handles both logged-in and logged-out states
// It uses Clerk for authentication and shows different navigation options based on auth status
// The logged-out view includes smooth scrolling to landing page sections
// The logged-in view provides access to the dashboard and documentation

// LoggedInHeader component shows navigation options for authenticated users
const LoggedInHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center font-semibold">
          <Image 
            src={config.appIcon} 
            alt={`${config.appName} logo`}
            width={40}
            height={40}
            className="object-contain mr-2"
          />
          <span className="text-xl">{config.appName}</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <UserButton/>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b">
            <nav className="flex flex-col p-4">
              <Link 
                href="/dashboard" 
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="py-2">
                <UserButton/>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

const LoggedOutHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center font-semibold">
          <Image 
            src={config.appIcon} 
            alt={`${config.appName} logo`}
            width={40}
            height={40}
            className="object-contain mr-2"
          />
          <span className="text-xl">{config.appName}</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link 
            href="/#features" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={(e) => scrollToSection(e, 'features')}
          >
            Features
          </Link>
          <Link 
            href="/#faq" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            onClick={(e) => scrollToSection(e, 'faq')}
          >
            FAQ
          </Link>
          {/* <Link 
            href="/blog" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </Link> */}
          <Link 
            href="https://www.ideasandbugz.com/feedback/sleeptopia" 
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Feature Request
          </Link>
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden lg:flex gap-4">
          <SignInButton mode="modal">
            <Button size="lg" className="font-semibold" variant="outline">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button 
              size="lg" 
              className="font-semibold text-white" 
              style={{ backgroundColor: config.theme.colors.primary }}
            >
              Sign Up
            </Button>
          </SignUpButton>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b">
            <nav className="flex flex-col p-4">
              <Link 
                href="/#features" 
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={(e) => scrollToSection(e, 'features')}
              >
                Features
              </Link>
              <Link 
                href="/#faq" 
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={(e) => scrollToSection(e, 'faq')}
              >
                FAQ
              </Link>
              {/* <Link 
                href="/blog" 
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </Link> */}
              <Link 
                href="https://www.ideasandbugz.com/feedback/sleeptopia" 
                className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Feature Request
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <SignInButton mode="modal">
                  <Button size="lg" className="w-full font-semibold" variant="outline">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="w-full font-semibold text-white"
                    style={{ backgroundColor: config.theme.colors.primary }}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Header() {
  const { userId } = useAuth();
  return userId ? <LoggedInHeader /> : <LoggedOutHeader />;
} 
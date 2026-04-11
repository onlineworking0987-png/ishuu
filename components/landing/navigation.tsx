"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chewy } from "@/lib/font-chewy";

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Track if scrolled past hero
      setIsScrolled(currentScrollY > 50);
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "#problem", label: "Problem" },
    { href: "#responsibility", label: "What We Do" },
    { href: "#pricing", label: "Pricing" },
    { href: "#process", label: "Process" },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div 
        className={`relative rounded-full px-4 py-2.5 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/50" 
            : "bg-white/60 backdrop-blur-md border border-white/30"
        }`}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-red/5 via-transparent to-brand-pink/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center pl-2 group">
            <span
              className={`${chewy.className} text-2xl text-brand-pink transition-all duration-300 group-hover:scale-105`}
            >
              ishuu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-full bg-gray-100 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              size="sm"
              className="relative bg-brand-red hover:bg-brand-red/90 text-white rounded-full px-5 overflow-hidden group btn-ripple"
            >
              <Link href="#cta" className="flex items-center gap-2">
                <span>Book a Call</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} 
              />
              <X 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-white/50 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 max-h-80' : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all px-4 py-3 rounded-xl"
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            className="bg-brand-red hover:bg-brand-red/90 text-white rounded-full w-full mt-3"
          >
            <Link href="#cta" className="flex items-center justify-center gap-2">
              Book a Call
              <ArrowRight size={14} />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

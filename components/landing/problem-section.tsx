"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const testimonials = [
  {
    quote: "The other thing nobody talks about is decision fatigue. When you are solo every single choice lands on you. Even tiny ones. After a while it genuinely wears you down. Having even one person to bounce ideas off (friend, mentor, partner, community) makes a huge difference.",
    author: "LongjumpingUse7193",
    role: "CTO",
    company: "Meridian Labs",
    rating: 4.9,
    date: "12 Mar, 2026",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: `Time, focus, loneliness, stress.
The buck stops with you> Oh you fail? It's on you.`,
    author: "Dabidoe",
    role: "Head of Research",
    company: "Flux Systems",
    rating: 5.0,
    date: "28 Feb, 2026",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "If you literally do every aspect of a business you need more time for all of it. You're already using all your time for all of it. You need 36 hours in a day. Everything takes too long or at least too much of your time.",
    author: "cassiuswright",
    role: "VP Engineering",
    company: "Beacon AI",
    rating: 4.8,
    date: "15 Jan, 2026",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The biggest headache for me was realizing I couldn't clone myself and my work ethic. I had to completely flip my approach and focus on systems that could run without me hovering.",
    author: "Sea-Map-5763",
    role: "CISO",
    company: "Prism Analytics",
    rating: 4.9,
    date: "02 Jan, 2026",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Work on your business, not in it. Begin hiring people. Don't just hire for technical skills, hire for the things you can't teach. You should be focusing on growth strategies, not the day to day. Take this from someone who has tried and failed so many times.",
    author: "Skill2scale",
    role: "Data Lead",
    company: "Nova Dynamics",
    rating: 4.7,
    date: "18 Dec, 2025",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Really it's planning ahead knowing what bigger tasks you have to do, whilst keeping on with the weekly scale stuff. Having someone else to run these would be ideal but I'm not in that position at the moment.",
    author: "Craggzoid",
    role: "Lead Engineer",
    company: "Vertex Labs",
    rating: 5.0,
    date: "05 Dec, 2025",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "I have an endless amount of opportunity and can only make my body function for 12-15 hours a day, 30 days in a row usually before having to just die for a day or 2 to recover. So estimating what amount of time everything will take has been a long acclimation period, and realizing that other people can actually do what I do for pretty cheap was a big life saver.",
    author: "Onlionli32",
    role: "Operations Director",
    company: "Streamline Co",
    rating: 4.8,
    date: "22 Nov, 2025",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: `Just because you can do it, doesn't mean you should.
If you were to outsource it, could you spend your time on something else that would bring in more money than you are paying the outsourced programmer?
`,
    author: "Raethril",
    role: "Customer Success VP",
    company: "Horizon Tech",
    rating: 4.9,
    date: "10 Nov, 2025",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: `Being patient with myself and growing the business at a pace that's mentally, physically, and emotionally healthy for me. Sure, I know exactly what I need to do to achieve 5x sales of my flagship product. But, that also means 5x customer service, 5x picking and packing, 5x influx of social media engagement, 5x the storage space/workspace and most importantly 5x more capacitated myself.
`,
    author: "The_fitertainer",
    role: "Product Manager",
    company: "Synapse AI",
    rating: 5.0,
    date: "28 Oct, 2025",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: `Once you've got the spider in the glass and the cardboard underneath, it's always annoying getting to the window and finding it shut, simply put "you need more hands"`,
    author: "Watchkeys",
    role: "CIO",
    company: "Atlas Ventures",
    rating: 4.8,
    date: "15 Oct, 2025",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "I was a solo business owner for several years, it is almost impossible to grow. I partnered with a few trusted friends, and my business has grown substantially. Being solo is great, but working with people that have different specialties really makes life a lot better.",
    author: "Boohight",
    role: "VP Infrastructure",
    company: "CoreStack",
    rating: 4.9,
    date: "01 Oct, 2025",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
];

export function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation();
  const autoRotateTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const anglePerProfile = 37.5; // degrees between each profile (50% more than 25)
  const totalProfiles = testimonials.length;
  
  // Calculate rotation angle from activeIndex
  const rotationAngle = activeIndex * anglePerProfile;

  // Handle clicking on a navigation dot
  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoRotating(false);
    
    // Resume auto-rotation after 5 seconds
    if (autoRotateTimerRef.current) {
      clearTimeout(autoRotateTimerRef.current);
    }
    autoRotateTimerRef.current = setTimeout(() => {
      setIsAutoRotating(true);
    }, 5000);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalProfiles);
    }, 4000); // Rotate every 4 seconds
    
    return () => clearInterval(interval);
  }, [isAutoRotating, totalProfiles]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoRotateTimerRef.current) {
        clearTimeout(autoRotateTimerRef.current);
      }
    };
  }, []);

  // Calculate position on semi-circle arc for each profile
  const getArcPosition = (profileIndex: number) => {
    // Calculate the angle for this profile based on current rotation
    const baseAngle = profileIndex * anglePerProfile;
    const angle = baseAngle - rotationAngle;
    
    // Normalize angle to be within visible range (-90 to 90)
    let normalizedAngle = angle % (totalProfiles * anglePerProfile);
    if (normalizedAngle > (totalProfiles * anglePerProfile) / 2) {
      normalizedAngle -= totalProfiles * anglePerProfile;
    }
    if (normalizedAngle < -(totalProfiles * anglePerProfile) / 2) {
      normalizedAngle += totalProfiles * anglePerProfile;
    }
    
    const rad = (normalizedAngle * Math.PI) / 180;
    
    // Radius adjusted so profiles appear nicely in viewport
    const radius = 280;
    
    // Center of rotation is at the right edge, offset outside
    const centerOffsetX = 320;
    const x = centerOffsetX - Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    
    // Calculate scale and opacity based on proximity to center (angle = 0)
    const distanceFromCenter = Math.abs(normalizedAngle);
    const scale = Math.max(0.3, 1 - (distanceFromCenter / 80) * 0.7);
    const opacity = Math.max(0, 1 - (distanceFromCenter / 70) * 0.8);
    
    // Only visible within a certain range
    const isVisible = Math.abs(normalizedAngle) < 80;
    
    return { x, y, angle: normalizedAngle, scale, opacity, isVisible };
  };

  return (
    <section id="problem" className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div 
        ref={sectionRef}
        className={`relative max-w-6xl mx-auto px-6 transition-all duration-700 ${
          sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Title */}
        <div className="sm:mb-6 mb-10">
          <div className="w-12 h-1 bg-brand-red mb-4" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-balance text-foreground">
            <span className="block font-serif italic text-foreground">
              A business that depends on you for everything
            </span>
            <span className="mt-1 block font-sans font-bold text-brand-red">
              <span className="font-serif font-normal italic text-foreground">allows</span> you freedom for nothing
            </span>
          </h2>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Side - Testimonial Quote */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="relative">
              {/* Large quotation mark */}
              <span className="absolute -top-4 -left-4 text-6xl text-brand-red/20 font-serif leading-none">
                {`"`}
              </span>
              
              {/* Quote Text */}
              <blockquote 
                key={activeIndex}
                className="relative z-10 animate-fade-in"
              >
                <p className="text-xl md:text-2xl lg:text-2xl font-serif italic text-foreground leading-relaxed">
                  <span className="text-brand-red text-3xl">{testimonials[activeIndex].quote.charAt(0)}</span>
                  {testimonials[activeIndex].quote.slice(1)}
                </p>
                <footer className="mt-6">
                  <p className="text-lg font-semibold text-foreground">{testimonials[activeIndex].author}</p>

                </footer>
              </blockquote>

              {/* Navigation dots */}
              <div className="flex gap-2 ">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-6 bg-brand-red' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Rotating Semi-Circle Wheel */}
          <div className="relative w-full lg:w-[500px] h-[450px] flex-shrink-0 order-1 lg:order-2 flex items-center justify-center">
            {/* The curved arc line */}
            <svg 
              className="absolute pointer-events-none opacity-20"
              width="400"
              height="450"
              viewBox="0 0 400 450"
            >
              <path
                d="M 400 225 A 600 600 0 0 0 400 -175"
                stroke="#EF3A2F"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Rotating profiles container */}
            <div className="absolute inset-0">
              {testimonials.map((testimonial, index) => {
                const { x, y, angle, scale, opacity, isVisible } = getArcPosition(index);
                
                if (!isVisible) return null;
                
                const isActive = Math.abs(angle) < anglePerProfile / 2;
                
                // Calculate size based on scale
                const size = 64 + scale * 48; // Range from 64px to 112px
                
                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x - 40}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: Math.round(scale * 30),
                    }}
                  >
                    {/* Avatar with smooth scaling and opacity */}
                    <div 
                      className="relative rounded-full overflow-hidden"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        opacity: opacity,
                        filter: isActive ? 'grayscale(0)' : `grayscale(${1 - scale})`,
                        boxShadow: isActive 
                          ? '0 0 30px rgba(239, 58, 47, 0.3)' 
                          : 'none',
                        border: isActive 
                          ? '4px solid rgb(239, 58, 47)' 
                          : '2px solid rgba(229, 231, 235, 0.5)',
                      }}
                    >
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Decorative elements */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-bl from-brand-red/5 to-transparent rounded-full blur-2xl" />
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-tl from-brand-red/5 to-transparent rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video - no blur, no overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/ishuu_hero_video.mp4"
          type="video/mp4"
        />
      </video>
      
      {/* Gradient overlay - stronger at bottom for transition to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-white" />
      
      {/* Decorative side elements */}
      <div className="absolute top-1/4 left-0 w-32 h-96 bg-gradient-to-r from-brand-pink/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-32 h-96 bg-gradient-to-l from-brand-red/20 to-transparent blur-3xl pointer-events-none" />
      
      {/* Hero Text - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-center text-balance max-w-5xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-serif italic text-white">Your digital operations,</span>{" "}
          <span className="font-sans font-bold text-brand-pink drop-shadow-lg">entirely off your plate.</span>
        </h1>
      </div>
    </section>
  );
}

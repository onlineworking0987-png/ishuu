"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section id="cta" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gemini_generated_video_94136ba3-ylccLOZROTnkUVs9k4tnfLhdGeJ5ch.mp4"
          type="video/mp4"
        />
      </video>

      {/* Top gradient - transitions FROM white/gray content TO video */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />

      {/* Dark Overlay with gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />

      {/* Content - Split Layout */}
      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-24">
          {/* Left Side - Headline + CTA */}
          <div className="lg:w-1/3 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight text-balance mb-8">
              <span className="font-serif italic text-white">Take one step.</span>{" "}
              <span className="font-sans font-bold text-brand-pink drop-shadow-lg">We handle the rest.</span>
            </h2>

            <Button
              asChild
              size="lg"
              className="bg-brand-pink hover:bg-brand-pink/90 text-white rounded-full px-10 py-6 text-lg group"
            >
              <Link href="https://cal.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Book the Intake Call
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
          </div>

          {/* Center - Empty to show video */}
          <div className="hidden lg:block lg:w-1/3" />

          {/* Right Side - Description */}
          <div className="lg:w-1/3 text-center lg:text-right">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              We only partner with founders when we can guarantee a considerable
              return to their investment. This conversation is purely to stress-test
              the fit. We value your time as much as our own, no chasing, just a
              mutual decision on the path forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

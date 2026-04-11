"use client";

import { Calendar, FileText } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";
import { PlexusSphere } from "./plexus-sphere";

export function CollaborationSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: cardsRef, isInView: cardsInView, getDelay } = useStaggeredAnimation(2, 200);

  return (
    <section className="relative py-16 lg:py-20 bg-white noise">
      {/* 3D Plexus Sphere Background */}
      <PlexusSphere />
      
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-radial-pink opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] gradient-radial-red opacity-15 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl text-balance transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-serif italic text-foreground">You stay in the loop,</span>{" "}
            <span className="font-sans font-bold text-brand-red">we stay in the weeds.</span>
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Weekly Check-in */}
          <div
            className={`group relative rounded-3xl p-8 transition-all duration-700 hover-lift ${
              cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getDelay(0)}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/5 via-brand-red/10 to-brand-pink/5 border border-brand-red/10 group-hover:border-brand-red/20 transition-all duration-500" />
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl shadow-brand-red/10" />
            
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-red/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:bg-brand-pink/20 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-red/10 group-hover:shadow-brand-pink/30">
                <Calendar size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-brand-red transition-colors duration-300">
                Weekly Check-in
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Progress, Decisions, Focus.
              </p>
              <div className="pt-6 border-t border-gray-200/50">
                <p className="text-sm text-muted-foreground">
                  Quick syncs to keep you informed without overwhelming your schedule
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Review */}
          <div
            className={`group relative rounded-3xl p-8 transition-all duration-700 hover-lift ${
              cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={getDelay(1)}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-pink/5 via-brand-pink/10 to-brand-red/5 border border-brand-pink/10 group-hover:border-brand-pink/20 transition-all duration-500" />
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl shadow-brand-pink/10" />
            
            {/* Decorative glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-brand-pink/10 flex items-center justify-center mb-6 group-hover:bg-brand-red/20 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-pink/10 group-hover:shadow-brand-red/30">
                <FileText size={28} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-brand-pink transition-colors duration-300">
                Monthly Review
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Strategy, Billing, Performance.
              </p>
              <div className="pt-6 border-t border-gray-200/50">
                <p className="text-sm text-muted-foreground">
                  Deep dives into metrics, strategy alignment, and roadmap planning
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

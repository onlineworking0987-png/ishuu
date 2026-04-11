"use client";

import { Wrench, Settings, TrendingUp } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const responsibilities = [
  {
    icon: Wrench,
    title: "Build",
    description:
      "We construct the systems, tools, and infrastructure your operations require.",
  },
  {
    icon: Settings,
    title: "Maintain",
    description:
      "We keep everything stable, monitored, and functioning without your intervention.",
  },
  {
    icon: TrendingUp,
    title: "Improve",
    description:
      "We proactively identify and implement improvements aligned with your growth.",
  },
];

export function ResponsibilitySection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: cardsRef, isInView: cardsInView, getDelay } = useStaggeredAnimation(responsibilities.length, 150);

  return (
    <section id="responsibility" className="relative py-16 lg:py-20 bg-white overflow-hidden noise">
      {/* Background elements */}
      <div className="absolute inset-0 pattern-dots opacity-30" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] gradient-radial-red opacity-20 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] gradient-radial-pink opacity-15 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl text-balance transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-serif italic text-foreground">We take</span>{" "}
            <span className="font-sans font-bold text-brand-red">responsibility</span>{" "}
            <span className="font-serif italic text-foreground">for</span>
          </h2>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {responsibilities.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl p-8 transition-all duration-700 hover-lift hover-glow ${
                cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={getDelay(index)}
            >
              {/* Card background with glass effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-gray-50/80 border border-gray-100/80 shadow-lg shadow-black/[0.03] group-hover:shadow-xl group-hover:shadow-brand-red/10 transition-all duration-500" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/[0.02] to-brand-pink/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative">
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-red/10 flex items-center justify-center group-hover:bg-brand-pink/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-brand-red/10 group-hover:shadow-brand-pink/30">
                    <item.icon size={28} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-brand-red transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

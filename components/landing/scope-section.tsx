"use client";

import { Shield, Expand, Zap, BarChart3 } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const scopes = [
  {
    icon: Shield,
    title: "Stability",
    description: "Maintenance, fixes",
    color: "brand-red",
  },
  {
    icon: Expand,
    title: "Expansion",
    description: "Features, integrations",
    color: "brand-pink",
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Automation, tools",
    color: "brand-red",
  },
  {
    icon: BarChart3,
    title: "Insight",
    description: "Dashboards, reporting",
    color: "brand-pink",
  },
];

export function ScopeSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView, getDelay } = useStaggeredAnimation(scopes.length, 100);

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 pattern-grid opacity-50" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] gradient-radial-pink opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] gradient-radial-red opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl text-balance transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="font-serif italic text-foreground">Everything you worry about is</span>{" "}
            <span className="font-sans font-bold text-brand-red">covered here.</span>
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopes.map((scope, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl p-8 text-center transition-all duration-700 hover-lift ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={getDelay(index)}
            >
              {/* Glass card background */}
              <div className="absolute inset-0 rounded-3xl glass shadow-lg shadow-black/[0.03] group-hover:shadow-xl transition-all duration-500" />
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${scope.color === 'brand-pink' ? 'bg-gradient-to-br from-brand-pink/5 to-transparent' : 'bg-gradient-to-br from-brand-red/5 to-transparent'
                  }`}
              />

              {/* Content */}
              <div className="relative">
                <div
                  className={`w-18 h-18 w-[72px] h-[72px] rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${scope.color === 'brand-pink'
                      ? 'bg-brand-pink/10 group-hover:bg-brand-red/20 group-hover:shadow-lg group-hover:shadow-brand-pink/30'
                      : 'bg-brand-red/10 group-hover:bg-brand-pink/20 group-hover:shadow-lg group-hover:shadow-brand-red/30'
                    }`}
                >
                  <scope.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-brand-red transition-colors duration-300">
                  {scope.title}
                </h3>
                <p className="text-muted-foreground text-sm">{scope.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

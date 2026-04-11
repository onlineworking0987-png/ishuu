"use client";

import { Users, Rocket, ShieldCheck, Clock } from "lucide-react";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const capacities = [
  {
    icon: Users,
    title: "Team size per client",
    value: "2-5",
    unit: "developers",
    description: "Plus AI agents, scaled to real-time needs",
  },
  {
    icon: Rocket,
    title: "Delivery pace",
    value: "1-2",
    unit: "cycles/week",
    description: "For features and experiments",
  },
  {
    icon: ShieldCheck,
    title: "Stability",
    value: "24/7",
    unit: "monitoring",
    description: "Incidents handled without waiting for your input",
  },
  {
    icon: Clock,
    title: "Availability",
    value: "Round-the-clock",
    unit: "support",
    description: "For bugs and maintenance emergencies",
  },
];

export function CapacitySection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: gridRef, isInView: gridInView, getDelay } = useStaggeredAnimation(capacities.length, 100);

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background with gradient and subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      <div className="absolute inset-0 pattern-dots opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] gradient-radial-red opacity-15 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl text-balance transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-serif italic text-foreground">Capacity that</span>{" "}
            <span className="font-sans font-bold text-brand-red">breathes with your business.</span>
          </h2>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capacities.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl p-6 transition-all duration-700 hover-lift ${
                gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={getDelay(index)}
            >
              {/* Card background */}
              <div className="absolute inset-0 rounded-3xl glass shadow-lg shadow-black/[0.03] group-hover:shadow-xl transition-all duration-500" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/[0.02] to-brand-pink/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-pink/20 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-brand-red/10 group-hover:shadow-brand-pink/30">
                  <item.icon size={24} />
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {item.title}
                </p>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-foreground group-hover:text-brand-red transition-colors duration-300">
                    {item.value}
                  </span>{" "}
                  <span className="text-muted-foreground">{item.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

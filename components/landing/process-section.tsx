"use client";

import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    number: "01",
    title: "Intake call",
    description:
      "A direct conversation to understand your operations, your current systems, and your situation.",
  },
  {
    number: "02",
    title: "Fit assessment",
    description:
      "We determine whether our model is the right match for your business. We will tell you plainly if it is not.",
  },
  {
    number: "03",
    title: "Quick Start",
    description:
      "We document what we are taking on, what the boundaries are, and what success looks like.",
  },
];

export function ProcessSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: stepsRef, isInView: stepsInView, getDelay } = useStaggeredAnimation(steps.length, 200);

  return (
    <section id="process" className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="absolute inset-0 pattern-dots opacity-40" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] gradient-radial-pink opacity-25 -translate-y-1/2 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl text-balance transition-all duration-700 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="font-serif italic text-foreground">What happens</span>{" "}
            <span className="font-sans font-bold text-brand-red">next</span>
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line with gradient */}
            <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-brand-red via-brand-pink to-brand-pink/20 hidden md:block" />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex gap-6 md:gap-8 transition-all duration-700 ${
                    stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={getDelay(index)}
                >
                  {/* Number circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-brand-red flex items-center justify-center shadow-xl shadow-brand-red/20 z-10 group-hover:scale-110 transition-all duration-500 hover:scale-110 hover:border-brand-pink">
                    <span className="text-xl font-bold text-brand-red">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="group relative flex-1 rounded-3xl transition-all duration-500 hover-lift">
                    {/* Card background */}
                    <div className="absolute inset-0 rounded-3xl glass shadow-lg shadow-black/[0.03] group-hover:shadow-xl transition-all duration-500" />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/[0.02] to-brand-pink/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative p-6 md:p-8">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-brand-red transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

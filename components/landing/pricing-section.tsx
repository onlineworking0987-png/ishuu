"use client";

import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/use-scroll-animation";

const plans = [
  {
    name: "Support",
    price: "$1,014",
    period: "/ month",
    description:
      "Ongoing system stability and maintenance. The foundation that keeps digital operations running.",
    features: [
      "System monitoring and health checks",
      "Routine maintenance",
      "Small adjustments",
      "Recurring Operations",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$298",
    period: "/ week",
    description:
      "Development and improvement beyond routine maintenance. For when the business needs to move forward.",
    features: [
      "Experiments and prototypes",
      "Third-party integrations",
      "Workflow automations",
      "Process improvements",
    ],
    highlighted: true,
  },
];

export function PricingSection() {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();
  const { ref: cardsRef, isInView: cardsInView, getDelay } = useStaggeredAnimation(plans.length, 200);

  return (
    <section id="pricing" className="relative pt-10 lg:pt-10 pb-16 lg:pb-20 bg-white overflow-hidden noise">
      {/* Background elements */}
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] gradient-radial-pink opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] gradient-radial-red opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl mb-3 text-balance transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="font-serif italic text-foreground">Two clear</span>{" "}
            <span className="font-sans font-bold text-brand-red">plans</span>
          </h2>
          <p
            className={`text-xl text-muted-foreground font-serif italic transition-all duration-700 delay-100 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            No hidden complexity
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl p-8 flex flex-col transition-all duration-700 hover-lift ${cardsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={getDelay(index)}
            >
              {/* Background */}
              {plan.highlighted ? (
                <>
                  <div className="absolute inset-0 rounded-3xl gradient-brand shadow-2xl shadow-brand-red/25" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent" />
                  {/* Glow effect */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-brand-red to-brand-pink opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-3xl glass border border-gray-100/80 shadow-lg shadow-black/[0.03] group-hover:shadow-xl transition-all duration-500" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-red/[0.02] to-brand-pink/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              )}



              <div className="relative flex flex-col flex-1">
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.highlighted ? "text-white" : "text-foreground"
                    }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-foreground"
                      }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-lg ${plan.highlighted ? "text-white/70" : "text-muted-foreground"
                      }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`mb-8 ${plan.highlighted ? "text-white/85" : "text-muted-foreground"
                    }`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110 ${plan.highlighted ? "bg-white/20" : "bg-brand-red/10"
                          }`}
                      >
                        <Check
                          size={14}
                          className={
                            plan.highlighted ? "text-white" : "text-brand-red"
                          }
                        />
                      </div>
                      <span
                        className={`text-sm ${plan.highlighted ? "text-white/90" : "text-muted-foreground"
                          }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full rounded-full py-6 text-base font-medium btn-ripple group/btn ${plan.highlighted
                      ? "bg-white text-brand-red hover:bg-white/90 shadow-lg"
                      : "bg-brand-red text-white hover:bg-brand-red/90"
                    }`}
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    Get Started
                    {!plan.highlighted && (
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    )}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

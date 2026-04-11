import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { ResponsibilitySection } from "@/components/landing/responsibility-section";
import { ScopeSection } from "@/components/landing/scope-section";
import { CollaborationSection } from "@/components/landing/collaboration-section";
import { CapacitySection } from "@/components/landing/capacity-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProcessSection } from "@/components/landing/process-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-white">
      <Navigation />
      <HeroSection />
      
      {/* Content flows seamlessly from hero video */}
      <ProblemSection />
      <ResponsibilitySection />
      <ScopeSection />
      <CollaborationSection />
      <CapacitySection />
      <PricingSection />
      <ProcessSection />
      
      {/* CTA Section - gradient transitions into video */}
      <CtaSection />
      <FooterSection />
    </main>
  );
}

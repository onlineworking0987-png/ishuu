"use client";

import Link from "next/link";
import { Linkedin, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { chewy } from "@/lib/font-chewy";

export function FooterSection() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <footer ref={ref} className="relative pt-14 pb-0 overflow-hidden">
      {/* Background — preserved from original */}
      <div className="absolute inset-0 bg-brand-pink" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink via-brand-pink to-brand-red/50" />

      {/* Subtle top-right glow only */}
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1.4fr] gap-10 lg:gap-16 pb-12 border-b border-white/15 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Col 1 — Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className={`${chewy.className} text-4xl text-white`}>
                ishuu
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-[260px]">
              We design, build, and operate the digital backbone of logistics, distribution, and field service businesses, so you can focus on the core of your business.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div className="space-y-5">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/45">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "#problem", label: "Problem" },
                { href: "#responsibility", label: "What We Do" },
                { href: "#pricing", label: "Pricing" },
                { href: "#cta", label: "Book a call" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex items-center gap-1 text-sm text-white/75 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                  <ArrowUpRight
                    size={11}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Contact */}
          <div className="space-y-5 md:col-span-1">
            <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/45">
              Get in touch
            </p>
            <div className="grid grid-cols-2 gap-4">

              {/* Email */}
              <a
                href="mailto:hello@ishuuglobal.it.com"
                className="group flex items-start gap-2.5 text-white/75 hover:text-white transition-colors"
              >
                <div className="icon-white w-[34px] h-[34px] shrink-0 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Mail size={14} />
                </div>
                <span className="text-[13.5px] leading-snug pt-1 ">
                hello@ishuuglobal.it.com
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+923026914619"
                className="group flex items-start gap-2.5 text-white/75 hover:text-white transition-colors"
              >
                <div className="icon-white w-[34px] h-[34px] shrink-0 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Phone size={14} />
                </div>
                <span className="text-[13.5px] leading-snug pt-1">
                  +92 302 6914619        </span>
              </a>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-white/75">
                <div className="icon-white w-[34px] h-[34px] shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin size={14} />
                </div>
                <span className="text-[13.5px] leading-snug pt-1">

                  NSTP - National Science and Technology Park, NUST Islamabad
                </span>
              </div>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ishuu/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-white/75 hover:text-white transition-colors"
              >
                <div className="icon-white w-[34px] h-[34px] shrink-0 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <Linkedin size={14} />
                </div>
                <span className="text-[13.5px] leading-snug pt-1">
                  LinkedIn
                </span>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5 transition-all duration-1000 delay-200 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
        >
          <p className="text-[13px] text-white/50">
            &copy; {new Date().getFullYear()} ishuu. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-[13px] text-white/50 hover:text-white/85 transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="text-[13px] text-white/50 hover:text-white/85 transition-colors"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </div>

      {/* Tagline — flex centers the line box so overflow clips evenly left/right */}
      <div
        className={`mt-1 flex w-full min-w-0 justify-center overflow-x-clip px-4 sm:px-8 md:px-12 transition-all duration-1000 delay-400 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <p
          className="inline-block mb-2 shrink-0 whitespace-nowrap text-center font-black leading-[0.92] tracking-tight text-white/[0.08] select-none"
          style={{
            fontSize: "clamp(1rem, calc((100vw - 2rem) / 10.5), 9.5rem)",
          }}
        >
          LetUsHandleTheRest
        </p>
      </div>
    </footer>
  );
}

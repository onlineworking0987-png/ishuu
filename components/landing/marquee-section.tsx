"use client";

const capabilities = [
  "AI-powered dispatch & scheduling optimization",
  "Predictive maintenance from live equipment data",
  "Digital twins of operations",
  "End-to-end supply chain visibility",
  "Autonomous reporting & decision dashboards",
  "Workflow automation across field + back office",
  "Fleet intelligence",
  "Voice & chat interfaces for field teams",
  "Exception-based operations",
  "Integrated vendor & distributor ecosystems",
];

export function MarqueeSection() {
  return (
    <section className="relative w-full overflow-hidden py-6 md:py-8 bg-white">
      {/* Marquee container with edge fade */}
      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        {/* First track */}
        <div className="flex items-center shrink-0 animate-marquee">
          {capabilities.map((item, index) => (
            <span
              key={`track1-${index}`}
              className="flex items-center text-gray-800 text-sm md:text-base lg:text-lg font-semibold tracking-wide whitespace-nowrap"
            >
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500 mx-6 md:mx-10 shrink-0" />
              {item}
            </span>
          ))}
        </div>
        {/* Duplicate track for seamless loop */}
        <div className="flex items-center shrink-0 animate-marquee">
          {capabilities.map((item, index) => (
            <span
              key={`track2-${index}`}
              className="flex items-center text-gray-800 text-sm md:text-base lg:text-lg font-semibold tracking-wide whitespace-nowrap"
            >
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500 mx-6 md:mx-10 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

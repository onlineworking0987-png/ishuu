"use client";

import Image from "next/image";

const companies = [
  {
    name: "Mind View Media",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-56-33-154-Picsart-BackgroundRemover-m09VzScWZYW3JozenTe0NONgW6YUri.png",
  },
  {
    name: "Iceage Industries",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-40-41-713-Picsart-BackgroundRemover-0cCDisJNSkzS7qEyxJAvIt0lTCsAzs.png",
  },
  {
    name: "Lillyhome",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-36-43-273-Picsart-BackgroundRemover-5X4ejdEk6iZWrkadmjaSxfoekLWqPD.png",
  },
  {
    name: "IndexEdge",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-36-53-138-Picsart-BackgroundRemover-ywE4rx8DBBwqv55JBsTuhCcgF7q7qW.png",
  },
  {
    name: "Greenwood International School",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_18-00-53-351%2Cjpg-Picsart-BackgroundRemover.jpeg-ia7pqqbsqT2JvhBY3u2sCKzSsQvcCC.png",
  },
  {
    name: "Azerion",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_18-03-37-025%2Cjpg-Picsart-BackgroundRemover.jpeg-tBuzKaA4idoa0eANPPrz7zZ8Hqy7rH.png",
  },
  {
    name: "Vettedge",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-onlinepngtools%20%285%29-C2aFjzN4oEDOfxp1hByFMyZSGrT2W2.png",
  },
  {
    name: "CHANCE",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_18-02-11-731%2Cjpg-Picsart-BackgroundRemover.jpeg-Vg8CY15AhIGhWQZedqyrz14neExipt.png",
  },
  {
    name: "Fatima Group",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-49-57-666-Picsart-BackgroundRemover-w5dHUqeBxw88cLX8onfcLc50JgQfFJ.png",
  },
  {
    name: "National",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-51-35-657-Picsart-BackgroundRemover-1Eged5OC7uPIBc6L4JKRvh0QK1ZLYN.png",
  },
  {
    name: "Vistar",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_18-02-52-006%2Cjpg-Picsart-BackgroundRemover.jpeg-UP8AFUWqeBj3Wm75uJ41ZrjdoCLnXO.png",
  },
  {
    name: "Toddlers World",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Picsart_26-04-25_17-57-30-492-Picsart-BackgroundRemover-reuZ8XLowJelg6bQMmHZowXZkEJqk3.png",
  },
  {
    name: "Fatima Fertilizer",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/output-onlinepngtools%20%284%29-BUW4V43cDQ3gAw1R6dEhOCqNLzvffb.png",
  },
];

export function TrustedBySection() {
  const items = companies.map((company) => (
    <div
      key={company.name}
      className="flex items-center justify-center rounded-xl border border-transparent bg-white/60 px-6 backdrop-blur transition will-change-transform
                 hover:border-red-100 hover:bg-white hover:shadow-sm"
      title={company.name}
    >
      <div className="relative h-30 w-[340px] md:h-40 md:w-[400px]">
        <Image
          src={company.logo}
          alt={company.name}
          fill
          className="object-contain opacity-80 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
          unoptimized
          sizes="(min-width: 768px) 190px, 140px"
        />
      </div>
    </div>
  ));

  return (
    <section className="relative w-full bg-white py-14 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase font-bold tracking-[0.28em] text-red-600">Trusted by</p>
        </div>

        <div className="mt-10">
          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="trustedby-marquee">
              <div className="trustedby-marquee__track">{items}</div>
              <div className="trustedby-marquee__track" aria-hidden="true">
                {items}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .trustedby-marquee {
          --duration: 28s;
          display: flex;
          width: max-content;
          will-change: transform;
          animation: trustedby-scroll var(--duration) linear infinite;
        }
        .trustedby-marquee__track {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-right: 16px;
        }
        @media (min-width: 768px) {
          .trustedby-marquee__track {
            gap: 22px;
            padding-right: 22px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .trustedby-marquee {
            animation: none;
            transform: none;
          }
        }
        @keyframes trustedby-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

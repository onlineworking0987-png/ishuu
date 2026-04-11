"use client";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle" | "dots";
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
}

export function SectionDivider({ 
  variant = "wave", 
  fromColor = "white", 
  toColor = "gray-50",
  flip = false 
}: SectionDividerProps) {
  const colorMap: Record<string, string> = {
    "white": "#ffffff",
    "gray-50": "#f9fafb",
    "brand-pink": "rgb(237, 79, 140)",
    "brand-red": "rgb(239, 58, 47)",
  };

  const from = colorMap[fromColor] || fromColor;
  const to = colorMap[toColor] || toColor;

  if (variant === "wave") {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""}`} style={{ marginTop: "-1px", marginBottom: "-1px" }}>
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30C240 50 480 10 720 30C960 50 1200 10 1440 30V60H0V30Z"
            fill={to}
          />
          <path
            d="M0 0V30C240 50 480 10 720 30C960 50 1200 10 1440 30V0H0Z"
            fill={from}
          />
        </svg>
      </div>
    );
  }

  if (variant === "curve") {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""}`} style={{ marginTop: "-1px", marginBottom: "-1px" }}>
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80V40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0Z"
            fill={to}
          />
          <path
            d="M0 0V40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V0H0Z"
            fill={from}
          />
        </svg>
      </div>
    );
  }

  if (variant === "angle") {
    return (
      <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""}`} style={{ marginTop: "-1px", marginBottom: "-1px" }}>
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <polygon points="0,0 1440,40 1440,40 0,40" fill={to} />
          <polygon points="0,0 1440,40 1440,0 0,0" fill={from} />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="relative w-full h-16 overflow-hidden flex items-center justify-center">
        <div className="flex gap-3 items-center">
          <div className="w-2 h-2 rounded-full bg-brand-pink/30 animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-brand-pink/50 animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="w-4 h-4 rounded-full bg-brand-pink animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="w-3 h-3 rounded-full bg-brand-pink/50 animate-pulse" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-brand-pink/30 animate-pulse" style={{ animationDelay: "0ms" }} />
        </div>
      </div>
    );
  }

  return null;
}

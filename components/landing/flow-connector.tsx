"use client";

import { useEffect, useState } from "react";

export function FlowConnector() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageHeight, setPageHeight] = useState(1000);

  useEffect(() => {
    const updatePageHeight = () => {
      setPageHeight(document.documentElement.scrollHeight);
    };
    
    updatePageHeight();
    window.addEventListener("resize", updatePageHeight);
    
    // Also update after a short delay to account for dynamic content
    const timeout = setTimeout(updatePageHeight, 500);
    
    return () => {
      window.removeEventListener("resize", updatePageHeight);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
    };

    handleScroll(); // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate a curvy path that spans the full page height
  const generateCurvyPath = (side: "left" | "right", segments: number = 8) => {
    const baseX = side === "left" ? 40 : 60;
    const amplitude = side === "left" ? 15 : 15;
    const segmentHeight = 100 / segments;
    
    let path = `M ${baseX} 0`;
    
    for (let i = 0; i < segments; i++) {
      const y1 = i * segmentHeight + segmentHeight * 0.5;
      const y2 = (i + 1) * segmentHeight;
      const direction = i % 2 === 0 ? 1 : -1;
      const xOffset = direction * amplitude * (side === "left" ? 1 : -1);
      
      path += ` Q ${baseX + xOffset} ${y1}, ${baseX} ${y2}`;
    }
    
    return path;
  };

  const leftPath = generateCurvyPath("left", 10);
  const rightPath = generateCurvyPath("right", 10);

  // Calculate dot positions based on scroll
  const leftDotY = scrollProgress * 100;
  const rightDotY = scrollProgress * 100;

  return (
    <div 
      className="absolute left-0 right-0 top-0 pointer-events-none z-0 overflow-visible hidden lg:block"
      style={{ height: pageHeight }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* LEFT SIDE - Pink flowing line */}
        {/* Background path (always visible, faded) */}
        <path
          d={leftPath}
          stroke="url(#leftFlowGradientBg)"
          strokeWidth="0.3"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Main visible path - Left Pink */}
        <path
          d={leftPath}
          stroke="url(#leftFlowGradient)"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Glow effect - Left */}
        <path
          d={leftPath}
          stroke="url(#leftFlowGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.15"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "blur(4px)" }}
        />

        {/* RIGHT SIDE - Red flowing line */}
        {/* Background path (always visible, faded) */}
        <path
          d={rightPath}
          stroke="url(#rightFlowGradientBg)"
          strokeWidth="0.3"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Main visible path - Right Red */}
        <path
          d={rightPath}
          stroke="url(#rightFlowGradient)"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Glow effect - Right */}
        <path
          d={rightPath}
          stroke="url(#rightFlowGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.15"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "blur(4px)" }}
        />
        
        {/* Animated dot that follows the left path */}
        <circle
          cx="40"
          cy={leftDotY}
          r="0.8"
          fill="rgb(237, 79, 140)"
          style={{
            filter: "drop-shadow(0 0 3px rgb(237, 79, 140))",
            transition: "cy 0.1s ease-out",
          }}
        />
        
        {/* Animated dot that follows the right path */}
        <circle
          cx="60"
          cy={rightDotY}
          r="0.8"
          fill="rgb(239, 58, 47)"
          style={{
            filter: "drop-shadow(0 0 3px rgb(239, 58, 47))",
            transition: "cy 0.1s ease-out",
          }}
        />
        
        <defs>
          {/* Left side - Pink gradient */}
          <linearGradient id="leftFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(237, 79, 140)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="rgb(237, 79, 140)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(237, 79, 140)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="leftFlowGradientBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(237, 79, 140)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="rgb(237, 79, 140)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(237, 79, 140)" stopOpacity="0.15" />
          </linearGradient>
          
          {/* Right side - Red gradient */}
          <linearGradient id="rightFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(239, 58, 47)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="rgb(239, 58, 47)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(239, 58, 47)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="rightFlowGradientBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(239, 58, 47)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="rgb(239, 58, 47)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(239, 58, 47)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

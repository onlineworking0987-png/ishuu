"use client";

import { useEffect, useState } from "react";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "circle" | "ring" | "dot";
  color: "pink" | "red";
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = (): FloatingElement[] => {
      const els: FloatingElement[] = [];
      for (let i = 0; i < 12; i++) {
        els.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 10,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 15,
          type: ["circle", "ring", "dot"][Math.floor(Math.random() * 3)] as FloatingElement["type"],
          color: Math.random() > 0.5 ? "pink" : "red",
        });
      }
      return els;
    };
    setElements(generateElements());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        >
          {el.type === "circle" && (
            <div
              className={`rounded-full ${el.color === "pink" ? "bg-brand-pink/5" : "bg-brand-red/5"}`}
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === "ring" && (
            <div
              className={`rounded-full border-2 ${el.color === "pink" ? "border-brand-pink/10" : "border-brand-red/10"}`}
              style={{ width: el.size, height: el.size }}
            />
          )}
          {el.type === "dot" && (
            <div
              className={`rounded-full ${el.color === "pink" ? "bg-brand-pink/20" : "bg-brand-red/20"}`}
              style={{ width: el.size / 3, height: el.size / 3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

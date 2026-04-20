"use client";
import { useEffect, useRef } from "react";

export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const symbols = ["✿", "❀", "✦", "❋", "♡", "✧"];
    const particles = [];

    for (let i = 0; i < 12; i++) {
      const el = document.createElement("div");
      el.className = "particle fixed pointer-events-none select-none z-0";
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      const size = Math.random() * 14 + 8;
      el.style.cssText = `
        left: ${Math.random() * 100}vw;
        font-size: ${size}px;
        color: ${Math.random() > 0.5 ? "#D4AF37" : "#E5989B"};
        opacity: ${Math.random() * 0.4 + 0.1};
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        will-change: transform;
      `;
      container.appendChild(el);
      particles.push(el);
    }

    return () => particles.forEach((p) => p.remove());
  }, []);

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0" />;
}

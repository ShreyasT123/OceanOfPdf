"use client";

import React from "react";

interface NoiseProps {
  className?: string;
  opacity?: number;
}

export function Noise({ className = "absolute inset-0", opacity = 0.018 }: NoiseProps) {
  return (
    <div
      className={`${className} w-full h-full pointer-events-none z-0`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface DevExpertiseProps {
  // Kept skills prop so it doesn't break your parent page imports, 
  // but we are using a text string for this specific layout.
  skills?: { title: string; description: string; index: string }[];
  text?: string;
}

const defaultText =
  "HI, I’M LUMEN — A PHOTOGRAPHER BASED IN THE USA, PASSIONATE ABOUT CHASING LIGHT AND TELLING AUTHENTIC STORIES THROUGH IMAGERY.";

// Sub-component to handle splitting words into characters for the animation
const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: number[];
}) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="inline-block mr-[2vw] lg:mr-[1.2vw] mt-2">
      {characters.map((char, i) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);
        return (
          <Char key={i} progress={progress} range={[start, end]}>
            {char}
          </Char>
        );
      })}
    </span>
  );
};

// Sub-component to animate the individual character colors
const Char = ({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: any;
  range: number[];
}) => {
  // Animates from zinc-700 to white
  const color = useTransform(progress, range, ["#3f3f46", "#fefefe"]);

  return (
    <motion.span style={{ color }} className="transition-colors duration-100">
      {children}
    </motion.span>
  );
};

const DevExpertise: React.FC<DevExpertiseProps> = ({ text = defaultText }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <section className="relative w-full bg-[#080808] text-[#fefefe] py-24 md:py-32 lg:py-40 font-sans">
      <div className="max-w-[95rem] mx-auto px-8 lg:px-12">

        {/* Top Header Row */}
        <div className="flex justify-between items-center border-b border-white/20 pb-6 mb-16 lg:mb-20">
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-300">
            + ABOUT ME
          </span>
          <span className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-zinc-300">
            {`{ 01 }`}
          </span>
        </div>

        {/* Scrolling Text Reveal */}
        <div ref={containerRef} className="w-full">
          <p className="text-[9vw] md:text-[7vw] lg:text-[5.5vw] leading-[1.1] font-medium tracking-tight uppercase flex flex-wrap">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>

        {/* Bottom Link Row */}
        <div className="flex justify-end mt-20 lg:mt-32">
          <div className="flex items-center gap-3 cursor-pointer group">
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-zinc-300 transition-colors">
              MORE ABOUT ME
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DevExpertise;
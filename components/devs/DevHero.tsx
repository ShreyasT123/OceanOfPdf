"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface DevHeroProps {
  name: string;
  role: string;
  location: string;
  time: string;
  bio: string;
  images: string[];
}

const DevHero: React.FC<DevHeroProps> = ({
  name,
  role,
  location,
  time,
  bio,
  images,
}) => {
  const { scrollY } = useScroll();
  // Adjusted scroll parallax values for smoother stack effect
  const y1 = useTransform(scrollY, [0, 500], [0, -30]);
  const y2 = useTransform(scrollY, [0, 500], [0, -60]);
  const y3 = useTransform(scrollY, [0, 500], [0, -90]);

  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const nameParts = name.split(" ");

  return (
    <section className="relative h-[100svh] w-full bg-[#080808] text-[#fefefe] overflow-hidden flex flex-col font-sans">
      {/* Top Navigation Overlay */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 lg:px-12 py-8 z-50">
        <div className="flex items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M20 5L22.5 15L32.5 15L24.5 21L27.5 31L20 25L12.5 31L15.5 21L7.5 15L17.5 15L20 5Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-xl font-semibold tracking-widest uppercase">
            OceanOfPDF
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.15em] uppercase text-zinc-300">
          <a href="/" className="hover:text-white transition-colors">
            HOME
          </a>
          <a href="#" className="hover:text-white transition-colors">
            PROJECTS
          </a>
          <a href="#" className="hover:text-white transition-colors">
            ABOUT
          </a>
          <a href="#" className="hover:text-white transition-colors">
            INSIGHTS
          </a>
          <div className="flex items-center gap-2 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <a href="#" className="hover:text-zinc-300 transition-colors">
              CONTACT
            </a>
          </div>
        </div>
      </nav>

      {/* Location & Time */}
      <div className="absolute top-28 lg:top-36 left-8 lg:left-12 z-20">
        <span className="text-xs md:text-sm font-medium tracking-[0.15em] uppercase text-zinc-400">
          {location} • {currentTime}
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center">
        {/* Left Side: Huge Typography overlaying everything */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-8 lg:left-12 z-20 pointer-events-none w-full top-1/2 -translate-y-1/2 mt-8 lg:mt-0"
        >
          {/* Removed drop shadow for better blend effect */}
          <h1 className="text-[14vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tight uppercase text-white m-0 mix-blend-difference">
            {nameParts.map((part, i) => {
              // Calculate specific padding based on user request:
              // - Last should have least
              // - Second should have most
              // - First should have more than last, less than second
              let padding = 4; // default least
              if (i === 0) padding = 8; // first
              if (i === 1) padding = 16; // second
              
              return (
                <span 
                  key={i} 
                  className="block"
                  style={{ paddingLeft: `${padding}vw` }}
                >
                  {part}
                </span>
              );
            })}
            <span 
              className="block" 
              style={{ paddingLeft: "2vw" }} // Last line (role) always least
            >
              {role}
            </span>
          </h1>
        </motion.div>

        {/* Right Side: Fanned Out Stacked Photos */}
        <div className="absolute right-[-10%] lg:right-[5%] top-1/2 -translate-y-1/2 w-[80vw] lg:w-[45vw] h-[60vh] lg:h-[80vh] z-0 pointer-events-none">
          <div className="relative w-full h-full">
            {images.map((img, i) => {
              const yValues = [y1, y2, y3];
              // Fixed transforms to create the beautiful fanned out card layout 
              const rotations = [-8, 2, 12];
              const leftPositions = ["10%", "30%", "50%"];
              const topPositions = ["15%", "5%", "10%"];

              return (
                <motion.div
                  key={i}
                  style={{
                    y: yValues[i % 3],
                    zIndex: 1 + i,
                    left: leftPositions[i % 3],
                    top: topPositions[i % 3],
                  }}
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: rotations[i % 3] }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute w-[220px] h-[320px] lg:w-[360px] lg:h-[500px] bg-zinc-900 shadow-2xl overflow-hidden pointer-events-auto"
                >
                  <img
                    src={img}
                    alt={`Work ${i}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer Section: Bio & Scroll Arc */}
      <div className="absolute bottom-10 lg:bottom-16 left-8 lg:left-12 w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] flex justify-between items-end z-40">

        {/* Left Side: Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="max-w-[260px] lg:max-w-sm text-zinc-400 text-sm lg:text-[17px] font-normal leading-relaxed"
        >
          {bio}
        </motion.p>

        {/* Right Side: SEE MY WORK Circle */}
        <div className="relative flex items-center justify-center w-28 h-28 lg:w-36 lg:h-36 mr-4 lg:mr-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path
                id="circlePath"
                d="M 50, 50 m -38, 0 a 38,38 0 0,1 76,0 a 38,38 0 0,1 -76,0"
                fill="none"
              />
              <text className="text-[10.5px] uppercase font-bold tracking-[0.25em] fill-zinc-300">
                <textPath xlinkHref="#circlePath" startOffset="0%">
                  SEE MY WORK • SEE MY WORK • SEE MY WORK •
                </textPath>
              </text>
            </svg>
          </motion.div>
          {/* Central Button */}
          <div className="w-16 h-16 lg:w-[72px] lg:h-[72px] bg-white rounded-full flex items-center justify-center z-10 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <ArrowDown className="w-6 h-6 lg:w-7 lg:h-7 text-black" strokeWidth={1.5} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default DevHero;
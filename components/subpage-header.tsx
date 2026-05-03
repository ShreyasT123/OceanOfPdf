"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SubpageHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  theme?: "dark" | "light";
}

export function SubpageHeader({ isMenuOpen, setIsMenuOpen, theme = "dark" }: SubpageHeaderProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black";
  const barColor = isDark ? "bg-white" : "bg-black";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 lg:px-16"
    >
      <Link
        href="/"
        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] transition-colors ${textColor}`}
      >
        <ArrowLeft className="h-4 w-4" />
        Home
      </Link>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex flex-col cursor-pointer group pointer-events-auto relative w-12 h-8 justify-center items-center"
        aria-label="Toggle menu"
        style={{ zIndex: 111 }}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -5 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className={`w-12 h-[3px] transition-all origin-center absolute ${barColor}`}
        />
        <motion.div
          animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 5 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className={`w-12 h-[3px] transition-all origin-center absolute ${barColor}`}
        />
      </button>
    </motion.header>
  );
}

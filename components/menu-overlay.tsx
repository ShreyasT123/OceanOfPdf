"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/devs", label: "Our Team" },
  { href: "/contact", label: "Contact" },
  { href: "/upload", label: "Upload" },
  { href: "/donate", label: "Donate" },
];

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: isOpen ? 0 : 0.3 }}
          className="fixed inset-0 z-[105] overflow-hidden"
          style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', backgroundColor: 'rgba(254,254,254,0.4)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5" />
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: isOpen ? 0.3 : 0 }}
            className="relative h-full w-full flex items-center justify-end px-8 lg:px-16 overflow-hidden"
          >
            <nav className="flex flex-col items-end gap-4 lg:gap-6 max-w-full">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: isOpen ? 0.4 + index * 0.05 : 0, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900/90 hover:text-zinc-900 transition-all duration-300 tracking-tight leading-none block whitespace-nowrap"
                    style={{ textShadow: '0 0 40px rgba(255,95,31,0.2)' }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
          <div className="absolute inset-0 -z-10" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

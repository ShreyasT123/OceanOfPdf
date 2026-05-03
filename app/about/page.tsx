"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";

import { Noise } from "@/components/noise";

import { CharByCharReveal, WordByWordFade } from "@/components/text-animations";
import { MenuOverlay } from "@/components/menu-overlay";
import { SubpageHeader } from "@/components/subpage-header";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom cursor tracking
  const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.remove("hide-default-cursor");
    } else {
      document.body.classList.add("hide-default-cursor");
    }
  }, [isMenuOpen]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#0C0A00]">
      <Noise />

      {/* Global Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[150] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: 1,
          opacity: isMenuOpen ? 0 : 1,
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </motion.div>

      {/* Shared Nav Components */}
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SubpageHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Content */}
      <div className="relative pt-32 pb-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[70vh] flex items-center justify-center px-8 lg:px-16"
        >
          <div className="max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Our Story
              </p>
            </motion.div>

            <div className="space-y-6 mt-6">
              <CharByCharReveal 
                text="Building the future of reading." 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
              />
              <WordByWordFade 
                text="OceanOfPDF is dedicated to preserving, organizing, and making knowledge accessible to everyone. We believe in the democratization of information." 
                className="text-base lg:text-lg text-white/60 max-w-3xl leading-relaxed"
              />
            </div>
          </div>
        </motion.section>

        <div className="mx-auto max-w-6xl px-8 lg:px-16 space-y-24">
          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Mission
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Making Knowledge Universal.
              </h2>
              <p className="text-white/60 leading-relaxed">
                We're building the largest searchable PDF library on the internet. Our mission is to connect readers with knowledge, preserve digital archives, and create a sustainable system for book discovery and sharing.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur"
            >
              <div className="text-4xl font-bold text-white mb-2">100M+</div>
              <p className="text-white/60">Books indexed and searchable</p>
            </motion.div>
          </motion.section>

          {/* Vision Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 backdrop-blur order-last md:order-first"
            >
              <div className="text-4xl font-bold text-white mb-2">10M+</div>
              <p className="text-white/60">Monthly active readers</p>
            </motion.div>
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Vision
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                A World Without Information Barriers.
              </h2>
              <p className="text-white/60 leading-relaxed">
                Imagine a world where any book ever published is instantly searchable and accessible. Where readers from any background can explore ideas and knowledge freely. That's the future we're building.
              </p>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Core Values
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">What We Stand For</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  title: "Accessibility",
                  description: "Knowledge should be free from barriers. We make books searchable and accessible to all."
                },
                {
                  title: "Preservation",
                  description: "Digital information is fragile. We ensure that books and knowledge survive for future generations."
                },
                {
                  title: "Innovation",
                  description: "We leverage cutting-edge search and indexing technology to reimagine book discovery."
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500" />
                  <div className="relative p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500">
                      <span className="text-white/40 group-hover:text-white transition-colors">0{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:translate-x-1 transition-transform duration-500">{value.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl p-12 text-center backdrop-blur"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Join Us on This Journey</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you're a reader seeking knowledge or a contributor wanting to share books, OceanOfPDF welcomes you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/upload"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all"
              >
                Upload a Book
              </motion.a>
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-white/50 text-white font-bold rounded-lg hover:border-white transition-all"
              >
                Browse Library
              </motion.a>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

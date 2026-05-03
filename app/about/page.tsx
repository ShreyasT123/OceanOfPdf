"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft } from "lucide-react";

function Noise() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.018] z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function CharByCharReveal({ text, className }: { text: string; className: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, filter: "saturate(0%) brightness(0.5)" }}
          whileInView={{ opacity: 1, filter: "saturate(100%) brightness(1)" }}
          viewport={{ once: false, amount: 0.95 }}
          transition={{ duration: 0.1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block will-change-transform"
        >
          {char === "\n" ? <br /> : char}
        </motion.span>
      ))}
    </span>
  );
}

function WordByWordFade({ text, className }: { text: string; className: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.75, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.28em] will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

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

      {/* Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: isMenuOpen ? 0 : 0.3 }}
            className="fixed inset-0 z-[105] overflow-hidden"
            style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', backgroundColor: 'rgba(254,254,254,0.4)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5" />
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: isMenuOpen ? 0.3 : 0 }}
              className="relative h-full w-full flex items-center justify-end px-8 lg:px-16 overflow-hidden"
            >
              <nav className="flex flex-col items-end gap-4 lg:gap-6 max-w-full">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/work", label: "Work" },
                  { href: "/devs", label: "Our Team" },
                  { href: "/contact", label: "Contact" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.4, delay: isMenuOpen ? 0.4 + index * 0.05 : 0, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900/90 hover:text-zinc-900 transition-all duration-300 tracking-tight leading-none block whitespace-nowrap"
                      style={{ textShadow: '0 0 40px rgba(255,95,31,0.2)' }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
            <div className="absolute inset-0 -z-10" onClick={() => setIsMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 lg:px-16"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </motion.header>

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

            <div className="grid md:grid-cols-3 gap-6">
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white/5 border border-white/20 rounded-xl p-6 backdrop-blur hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
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

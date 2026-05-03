"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft, BookOpen, Users, TrendingUp } from "lucide-react";

import { Noise } from "@/components/noise";

import { CharByCharReveal, WordByWordFade } from "@/components/text-animations";
import { MenuOverlay } from "@/components/menu-overlay";
import { SubpageHeader } from "@/components/subpage-header";

export default function WorkPage() {
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

  const projects = [
    {
      title: "Academic Collection",
      description: "Comprehensive library of peer-reviewed research papers and academic texts.",
      icon: BookOpen,
      stat: "50K+",
      statLabel: "Academic papers"
    },
    {
      title: "Fiction Archive",
      description: "Curated collection of classic and contemporary literature from around the world.",
      icon: Users,
      stat: "200K+",
      statLabel: "Fiction titles"
    },
    {
      title: "Knowledge Hub",
      description: "Educational resources covering science, technology, history, and more.",
      icon: TrendingUp,
      stat: "100K+",
      statLabel: "Topics covered"
    }
  ];

  const milestones = [
    { year: "2020", title: "The Beginning", description: "OceanOfPDF launches with 10K books" },
    { year: "2021", title: "Rapid Growth", description: "Reach 1M books indexed in our catalog" },
    { year: "2022", title: "Global Reach", description: "Expand to support 50+ languages" },
    { year: "2023", title: "Scale", description: "Hit 100M+ books with 10M+ monthly readers" },
  ];

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
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Header */}
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
                Our Collections
              </p>
            </motion.div>

            <div className="space-y-6 mt-6">
              <CharByCharReveal 
                text="Curated knowledge at scale." 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
              />
              <WordByWordFade 
                text="From academic research to timeless fiction, we organize the world's literature into a searchable, accessible archive." 
                className="text-base lg:text-lg text-white/60 max-w-3xl leading-relaxed"
              />
            </div>
          </div>
        </motion.section>

        <div className="mx-auto max-w-6xl px-8 lg:px-16 space-y-24">
          {/* Featured Projects */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Featured Collections
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">What We&apos;ve Built</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
                    whileHover={{ y: -10 }}
                    className="relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[2rem] border border-white/10 group-hover:border-white/20 transition-colors" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.08)_0%,transparent_50%)]" />
                    <div className="relative p-10 flex flex-col h-full">
                      <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-500">
                          <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-500">{project.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-10 group-hover:text-white/60 transition-colors">{project.description}</p>
                      
                      <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="text-4xl font-serif italic text-white/90 group-hover:text-white transition-colors">{project.stat}</div>
                        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{project.statLabel}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Our Journey
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">Milestones</h2>
            </div>

            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="grid md:grid-cols-[200px_1fr] gap-8 pb-6 border-b border-white/10 last:border-b-0"
                >
                  <div>
                    <p className="text-3xl font-bold text-white">{milestone.year}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-white/60">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Statistics */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { number: "100M+", label: "Books Indexed" },
              { number: "10M+", label: "Monthly Readers" },
              { number: "50+", label: "Languages" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 border border-white/20 rounded-lg p-6 text-center backdrop-blur"
              >
                <p className="text-4xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl p-12 text-center backdrop-blur"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Explore Our Collections</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover thousands of books across dozens of categories. From the classics to cutting-edge research.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all"
            >
              Start Browsing
            </motion.a>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

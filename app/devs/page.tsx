"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft, Github, Linkedin, Mail } from "lucide-react";

import { Noise } from "@/components/noise";
import { CharByCharReveal, WordByWordFade } from "@/components/text-animations";
import { MenuOverlay } from "@/components/menu-overlay";
import { SubpageHeader } from "@/components/subpage-header";

export default function DevsPage() {
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

  const team = [
    {
      name: "Shreyas Thale",
      role: "Full-Stack Developer",
      bio: "Building the core infrastructure and APIs that power OceanOfPdf.",
      skills: ["Backend", "Database", "APIs"]
    },
    {
      name: "Aarushi Sontakke",
      role: "Frontend Engineer",
      bio: "Crafting intuitive interfaces and smooth user experiences.",
      skills: ["React", "UI/UX", "Frontend"]
    },
    {
      name: "Shone Thomas",
      role: "Full-Stack Developer",
      bio: "Developing scalable solutions for document processing and search.",
      skills: ["Backend", "Frontend", "Infrastructure"]
    },
    {
      name: "John Prince",
      role: "Lead Developer",
      bio: "Architecting the entire platform and ensuring code quality.",
      skills: ["Architecture", "DevOps", "Leadership"]
    }
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
                Talented Minds
              </p>
            </motion.div>

            <div className="space-y-6 mt-6">
              <CharByCharReveal
                text="Meet the team."
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
              />
              <WordByWordFade
                text="Diverse backgrounds, unified by a mission to democratize access to knowledge."
                className="text-base lg:text-lg text-white/60 max-w-3xl leading-relaxed"
              />
            </div>
          </div>
        </motion.section>

        <div className="mx-auto max-w-6xl px-8 lg:px-16 space-y-24">
          {/* Team Grid */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50">
                Leadership
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">Our Crew</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-8 backdrop-blur hover:from-white/15 hover:to-white/8 transition-all"
                >
                  {/* Avatar Placeholder */}
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-white/20 to-white/5 border border-white/20 mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 rounded bg-white/10" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-white/60 text-sm font-medium mb-4">{member.role}</p>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed">{member.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-block bg-white/10 border border-white/20 px-3 py-1 rounded text-xs text-white/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white/60 hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white/60 hover:text-white"
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white/60 hover:text-white"
                    >
                      <Mail className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Join Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-2xl p-12 text-center backdrop-blur"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">We&apos;re Hiring</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
              Join our mission to democratize access to knowledge. We&apos;re looking for talented engineers, designers, and content specialists.
            </p>
            <motion.a
              href="mailto:careers@oceanofpdf.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all"
            >
              Get in Touch
            </motion.a>
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
                Our Culture
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4">What We Value</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Innovation", desc: "We constantly push boundaries and explore new ideas." },
                { title: "Collaboration", desc: "Great work comes from diverse teams working together." },
                { title: "Impact", desc: "We measure success by the positive change we create." }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white/5 border border-white/20 rounded-xl p-6 backdrop-blur"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/60">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

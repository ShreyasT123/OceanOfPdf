"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ArrowLeft, Mail, MessageSquare, MapPin, Phone } from "lucide-react";

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

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@oceanofpdf.com",
      link: "mailto:hello@oceanofpdf.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Office",
      value: "San Francisco, CA",
      link: "#"
    },
    {
      icon: MessageSquare,
      label: "Discord",
      value: "Join our community",
      link: "#"
    }
  ];

  const faqs = [
    {
      question: "How do I upload a book?",
      answer: "Visit our upload page and follow the simple form. You'll need a PDF file and some basic metadata about the book."
    },
    {
      question: "Is there a fee to use OceanOfPDF?",
      answer: "No, OceanOfPDF is completely free to use. We believe knowledge should be accessible to everyone."
    },
    {
      question: "Can I download books?",
      answer: "Yes, you can search for and read books on our platform. Some books may have restrictions based on copyright."
    },
    {
      question: "How is the search indexed?",
      answer: "We use advanced indexing technology to make every PDF fully searchable. Our system extracts text and metadata."
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
                  { href: "/upload", label: "Upload" },
                  { href: "/donate", label: "Donate" },
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
                Get in Touch
              </p>
            </motion.div>

            <div className="space-y-6 mt-6">
              <CharByCharReveal 
                text="We&apos;d love to hear from you." 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight"
              />
              <WordByWordFade 
                text="Have questions about OceanOfPDF? Want to contribute? Reach out to us anytime." 
                className="text-base lg:text-lg text-white/60 max-w-3xl leading-relaxed"
              />
            </div>
          </div>
        </motion.section>

        <div className="mx-auto max-w-6xl px-8 lg:px-16 space-y-24">
          {/* Contact Methods */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.label}
                  href={method.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/20 rounded-lg p-6 backdrop-blur hover:bg-white/10 transition-colors"
                >
                  <Icon className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide mb-2">{method.label}</h3>
                  <p className="text-white font-medium">{method.value}</p>
                </motion.a>
              );
            })}
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50 mb-3">Quick Contact</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-white">Send us a Message</h2>
              </div>
              <p className="text-white/60 leading-relaxed">
                Whether you have feedback, want to contribute, or need support, we&apos;re here to help. Fill out the form and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-white placeholder-white/40 rounded-lg focus:border-white/40 outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-white placeholder-white/40 rounded-lg focus:border-white/40 outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full h-12 border border-white/20 bg-white/10 backdrop-blur px-4 text-white placeholder-white/40 rounded-lg focus:border-white/40 outline-none transition-colors"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-white/20 bg-white/10 backdrop-blur px-4 py-3 text-white placeholder-white/40 rounded-lg focus:border-white/40 outline-none transition-colors resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-all"
              >
                {submitted ? "Message Sent!" : "Send Message"}
              </motion.button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-400 text-sm text-center"
                  >
                    Thanks for reaching out! We&apos;ll be in touch soon.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/50 mb-3">Common Questions</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-white">Frequently Asked</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group border border-white/20 rounded-lg p-6 backdrop-blur hover:border-white/30 transition-colors cursor-pointer"
                >
                  <summary className="flex justify-between items-center font-bold text-white outline-none">
                    {faq.question}
                    <motion.span
                      animate={{ rotate: 0 }}
                      className="group-open:rotate-180 transition-transform"
                    >
                      ▼
                    </motion.span>
                  </summary>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-white/60 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                </motion.details>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}

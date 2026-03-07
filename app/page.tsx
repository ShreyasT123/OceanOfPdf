"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CardsParallax from "../components/cards-parallax";
import { MoveUpRight } from "lucide-react";
import SearchBar from "../components/search-bar";
import ShowcaseCarousel from "../components/showcase-carousel";
import { Footer } from "../components/footer";

function WordByWordFade({ text, className }: { text: string; className: string }) {
  const words = text.trim().split(/\s+/);

  return (
    <h2 className={className}>
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
    </h2>
  );
}

export default function OceanOfPDFHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [isOverHero1, setIsOverHero1] = useState(false);

  // keep the browser's default cursor visible when the user is hovering the
  // first hero.  We used to hide the OS cursor globally, so the hero would
  // render "no cursor" at all once the custom cursor opacity dropped to zero.
  useEffect(() => {
    if (isOverHero1) {
      document.body.classList.remove("hide-default-cursor");
    } else {
      document.body.classList.add("hide-default-cursor");
    }
  }, [isOverHero1]);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Track global mouse position with spring for premium feel
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollYProgress: sheetProgress } = useScroll({
    target: sheetRef,
    offset: ["start end", "end start"],
  });

  const sheetCircle = useTransform(sheetProgress, [0, 0.45, 0.8], [8, 55, 160]);
  const sheetClip = useTransform(sheetCircle, (r) => `circle(${r}% at 50% 110%)`);
  const sheetContentY = useTransform(sheetProgress, [0, 1], ["0px", "0px"]);
  const sheetFullOpacity = useTransform(sheetProgress, [0.3, 0.55, 0.8], [0, 1, 1]);

  const { scrollYProgress: footerProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"],
  });
  const footerTitleY = useTransform(footerProgress, [0, 1], ["40px", "-40px"]);
  const footerInfoY = useTransform(footerProgress, [0, 1], ["20px", "-20px"]);
  const footerSlideY = useTransform(footerProgress, [0, 0.35, 1], ["100vh", "0vh", "0vh"]);
  const STATEMENTS = [
    { line1: "attention isnt lost.", line2: "its stolen." },
    { line1: "page by page.", line2: "thought by thought." },
    { line1: "feeds werent built for learning.", line2: "they were built for addiction" },
  ];

  // Search bar motion keeps the same logo-to-navbar timing.
  const searchY = useTransform(smoothProgress, [0, 0.075], ["20vh", "2.15rem"]);
  const searchScale = useTransform(smoothProgress, [0, 0.075], [1.75, 1]);
  // allow typing immediately rather than waiting for scroll animation
  const searchPointerEvents = "auto";

  // --- SECTION 1 (Blue) ---
  // Shrinks 4x and pulls up. 
  // IMPORTANT: Moves up exactly 100% to match Video entering 100% to 0%, ensuring NO GAP.
  const hero1Scale = useTransform(smoothProgress, [0, 0.15], [1, 0.25]);
  const hero1Y = useTransform(smoothProgress, [0, 0.15], ["0%", "-100%"]);
  const hero1Radius = useTransform(smoothProgress, [0, 0.075], ["0px", "0px"]);

  // --- SECTION 2 (Video - 90% width) ---
  // Slides up faster to "chase" Section 1
  const hero2Y = useTransform(smoothProgress, [0, 0.15], ["100vh", "0vh"]);
  // Scale: Enters [0.8 -> 1]. Holds. Then Shrinks [1 -> 0.5] starting at 0.25 until end (0.75).
  const hero2Scale = useTransform(smoothProgress, [0.035, 0.15, 0.12, 0.75], [0.8, 1, 1, 0.5]);

  // Text grows as video shrinks (Net effect: Visual growth on screen)
  const hero2TextScale = useTransform(smoothProgress, [0.12, 0.75], [1, 3]);

  // --- SECTION 4 (New Image Hero) ---
  // Slides up over the shrinking video
  const hero4Y = useTransform(smoothProgress, [0.64, 0.75], ["100vh", "0vh"]);

  // --- SECTION 5 (Global Reach - New) ---
  // Slides up over Section 4. [0.75, 0.85]
  const hero5Y = useTransform(smoothProgress, [0.75, 0.85], ["100vh", "0vh"]);
  const hero5Scale = useTransform(smoothProgress, [0.75, 0.85], [1.5, 1]);

  // --- SECTION 6 (Third Hero Card) ---
  // Slides up over Section 5. [0.85, 1.0]
  const hero6Y = useTransform(smoothProgress, [0.85, 1.0], ["100vh", "0vh"]);
  const hero6Scale = useTransform(smoothProgress, [0.85, 1.0], [1.2, 1]);

  return (
    <main className="relative">
      <div className="fixed inset-0 bg-[#0C0A00] -z-10" />

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
          scale: showCustomCursor ? 1 : 1, // Keep scale stable but change content
          opacity: isOverHero1 ? 0 : 1, // Hide custom cursor when over first hero
        }}
      >
        <AnimatePresence mode="wait">
          {!showCustomCursor ? (
            <motion.div
              key="default-cursor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          ) : (
            <motion.div
              key="visit-cursor"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl"
            >
              <MoveUpRight className="w-6 h-6 text-black mb-0.5" strokeWidth={2.5} />
              <span className="text-black font-bold text-[10px] uppercase tracking-widest leading-none">Visit</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>





      {/* Fullscreen Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
              delay: isMenuOpen ? 0 : 0.3, // Delay exit so text can disappear first
            }}
            className="fixed inset-0 z-[105] overflow-hidden"
            style={{
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              backgroundColor: 'rgba(254,254,254,0.4)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                delay: isMenuOpen ? 0.3 : 0, // Appear after menu slides down, disappear immediately on close
              }}
              className="relative h-full w-full flex items-center justify-end px-8 lg:px-16 overflow-hidden"
            >
              <nav className="flex flex-col items-end gap-4 lg:gap-6 max-w-full">
                {[
                  { href: "/", label: "Home" },
                  { href: "/about", label: "About" },
                  { href: "/work", label: "Work" },
                  { href: "/membership", label: "Membership" },
                  { href: "/journal", label: "Journal" },
                  { href: "/contact", label: "Contact" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      duration: 0.4,
                      delay: isMenuOpen ? 0.4 + index * 0.05 : 0, // Stagger in, exit immediately
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900/90 hover:text-zinc-900 transition-all duration-300 tracking-tight leading-none block whitespace-nowrap"
                      style={{
                        textShadow: '0 0 40px rgba(255,95,31,0.2)',
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Close area - click outside to close */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setIsMenuOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SCROLLABLE CONTAINER (h-1200vh to give space for animation) */}
      <div ref={containerRef} className="relative h-[1200vh]">
        {/* SECTION 1: HERO */}
        <div
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 cursor-auto"
          style={{ cursor: "auto !important" }}
          onMouseEnter={() => setIsOverHero1(true)}
          onMouseLeave={() => setIsOverHero1(false)}
        >
          <motion.section
            style={{
              y: hero1Y,
              scale: hero1Scale,
              borderRadius: hero1Radius,
              backgroundImage: "url('/download.png')",
            }}
            className="relative h-screen w-full bg-[#ffffff] bg-cover bg-center flex flex-col p-10 lg:p-16 origin-center overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{ background: "rgba(46, 204, 113, 0.12)" }}
            />

            {/* Headlines */}
            <div className="flex-1 flex flex-col justify-center relative z-40">
              <div className="grid grid-cols-12 w-full items-center -mt-28">
                <div className="col-span-12 lg:col-span-7">
                  <h1 className="
            text-transparent bg-clip-text 
            bg-gradient-to-br from-[#737373] via-[#d9d9d9] to-[#a8a8a8]
            drop-shadow-[0_1px_6px_rgba(255,255,255,0.15)]
            text-4xl lg:text-6xl font-medium leading-[1] tracking-tight max-w-2xl
          ">
                    One doorway.<br />
                    A universe of books.
                  </h1>

                  <div className="mt-10 flex items-center gap-5">
                    <div className="w-6 h-6 rounded-full border-[5px] border-[#737373] flex-shrink-0" />
                    <p className="
              text-transparent bg-clip-text 
              bg-gradient-to-br from-[#737373] via-[#d9d9d9] to-[#a8a8a8]
              text-lg font-medium max-w-[280px] leading-tight
            ">
                      Access without boundaries.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:block lg:col-span-5 text-right">
                  <p className="
            text-transparent bg-clip-text 
            bg-gradient-to-br from-[#737373] via-[#d9d9d9] to-[#a8a8a8]
            font-serif italic text-4xl lg:text-5xl leading-[0.85]
          ">
                    A Reader's <br /> last stop—
                  </p>
                </div>
              </div>
            </div>

            {/* Model Image - Z-index 10 (Logo is z-120 so it stays on top) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              {/* <img
                src="/model-image.png"
                className="h-[95%] w-auto object-contain mix-blend-overlay opacity-90 brightness-110"
                alt="Model Hero"
              /> */}
            </div>

          </motion.section>
        </div>

        {/* SECTION 2: VIDEO HERO & SECTION 4 (Stacked) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20 pointer-events-none">

          {/* VIDEO HERO (Layer Z-20) */}
          <motion.div
            style={{ y: hero2Y, scale: hero2Scale }}
            className="relative h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-[0_-50px_150px_rgba(0,0,0,0.08)] pointer-events-auto"
          >
            <div className="absolute inset-0" style={{ backgroundColor: 'transparent' }}>
              <img
                src="/download (3).jpg"
                alt="People reading books"
                className="w-full h-full object-cover opacity-100"
              />
            </div>

            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-10">

              <motion.h2
                style={{ scale: hero2TextScale }}
                className="text-[#fefefe] text-5xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[0.9] origin-center"
              >
                Reading that  <br /> shapes today <br /> & sharpens  <br /> tommorow.
              </motion.h2>

            </div>
          </motion.div>

          {/* 4th IMAGE HERO (Layer Z-25, slides over video, under cards) */}
          <motion.div
            style={{ y: hero4Y }}
            className="absolute h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-2xl z-25 flex items-center justify-center cursor-none pointer-events-auto"
          >
            <div className="relative z-20 px-8 text-center text-zinc-900">
              <h3 className="text-xs md:text-sm font-extralight tracking-[0.35em] uppercase text-zinc-900/80">
                {STATEMENTS[0].line1}
              </h3>
              <div className="mx-auto my-4 h-px w-20 bg-zinc-900/20" />
              <WordByWordFade
                text={STATEMENTS[0].line2}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-zinc-900"
              />
            </div>
          </motion.div>

          {/* 5th IMAGE HERO (Layer Z-26, slides over 4th Hero) */}
          <motion.div
            style={{ y: hero5Y }}
            className="absolute h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-2xl z-26 flex items-center justify-center cursor-none pointer-events-auto"
          >
            <motion.div style={{ scale: hero5Scale }} className="relative z-20 px-8 text-center text-zinc-900">
              <h3 className="text-xs md:text-sm font-extralight tracking-[0.35em] uppercase text-zinc-900/80">
                {STATEMENTS[1].line1}
              </h3>
              <div className="mx-auto my-4 h-px w-20 bg-zinc-900/20" />
              <WordByWordFade
                text={STATEMENTS[1].line2}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-zinc-900"
              />
            </motion.div>
          </motion.div>

          {/* 6th IMAGE HERO (Layer Z-27, slides over 5th Hero) */}
          <motion.div
            style={{ y: hero6Y }}
            className="absolute h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-2xl z-27 flex items-center justify-center cursor-none pointer-events-auto"
          >
            <motion.div style={{ scale: hero6Scale }} className="relative z-20 px-8 text-center text-zinc-900">
              <h3 className="text-xs md:text-sm font-extralight tracking-[0.35em] uppercase text-zinc-900/80">
                {STATEMENTS[2].line1}
              </h3>
              <div className="mx-auto my-4 h-px w-20 bg-zinc-900/20" />
              <WordByWordFade
                text={STATEMENTS[2].line2}
                className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] max-w-4xl text-zinc-900"
              />
            </motion.div>
          </motion.div>

          {/* CARDS PARALLAX OVERLAY (Layer Z-30) */}
          <CardsParallax
            scrollProgress={smoothProgress}
            inputRange={[0.12, 0.72]}
            onHoverChange={setShowCustomCursor}
          />
        </div>

      </div >

      {/* ACHIEVEMENTS SECTION (After Innovation) */}
      < section className="relative min-h-screen w-full bg-[#fefefe] flex items-center" >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="w-full px-8 lg:px-16"
        >
          <div className="flex items-center gap-6 text-zinc-900/70 uppercase tracking-[0.2em] text-xs">
            <span className="w-2 h-2 rounded-full bg-[#737373]" />
            <span className="text-zinc-900">Our Impact</span>
            <span className="h-px w-12 bg-zinc-900/20" />
            <span className="text-zinc-900/50">What We’ve Built</span>
          </div>

          <div className="mt-10 border-t border-zinc-900/10" />

          <h2 className="mt-12 text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.35em] uppercase text-zinc-900 leading-[1.02] max-w-5xl">
            Every number reflects a reader, a moment, a spark of change.
          </h2>
          <p className="mt-6 text-zinc-900/60 text-lg md:text-xl">
            Shaping minds, page by purposeful page
          </p>
        </motion.div>
      </section >


      {/* SHEET REVEAL SECTION */}
      < section ref={sheetRef} className="relative h-[360vh] w-full bg-black" >
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <motion.div
            style={{ clipPath: sheetClip }}
            className="absolute inset-0 bg-white text-black"
          >
            {/* Full-sheet content */}
            <motion.div
              style={{ opacity: sheetFullOpacity, y: sheetContentY }}
              className="h-full w-full px-8 py-16 md:px-16 lg:px-20"
            >
              <div className="max-w-6xl w-full">
                <h3 className="text-[20vw] md:text-[14vw] leading-[0.9] font-black tracking-[0.35em] uppercase text-zinc-900">
                  What we do
                </h3>
                <p className="mt-6 text-[8vw] md:text-[5vw] lg:text-[3.8vw] text-zinc-500 leading-tight max-w-5xl">
                  Bringing stories, ideas, and knowledge together — without distraction.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section >

      <ShowcaseCarousel onHoverChange={setShowCustomCursor} />

      {/* CTA HERO SECTION */}
      <section className="relative h-[200vh] w-full bg-black z-10">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))' }} />
          </div>

          <div className="relative z-10 h-full flex items-center justify-center px-8 lg:px-16">
            <div className="text-center max-w-5xl">
              <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.2 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3 className="mt-4 text-[#fefefe] text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
                  Discover millions of <br />books, research, <br />and ideas
                </h3>
              </motion.div>

              <p className="mt-8 text-[#fefefe]/80 text-lg md:text-xl">
                Explore, read, and share knowledge —
                <br />
                all in one place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-[#fefefe] text-lg">
                <button className="relative font-semibold">
                  start exploring
                  <span className="absolute left-0 -bottom-2 h-0.5 w-8 bg-[#737373]" />
                </button>
                <button className="relative font-semibold">
                  upload & share
                  <span className="absolute left-0 -bottom-2 h-0.5 w-8 bg-[#737373]" />
                </button>
              </div>

              <p className="mt-12 text-[#fefefe]/70 text-sm">
                Trusted by students, researchers, and educators worldwide
              </p>
              <div className="mt-6 flex items-center justify-center gap-10 text-[#fefefe]/70 text-lg">
                <span>Students</span>
                <span>Researchers</span>
                <span>Educators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER PARALLAX SECTION */}
      <section ref={footerRef} className="relative h-[200vh] w-full -mt-[100vh] z-30 bg-[#050505]">
        <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-auto bg-[#050505]">
          <motion.div
            style={{ y: footerSlideY }}
            className="absolute inset-0 bg-[#050505] text-white"
          >
            <Footer />
          </motion.div>
        </div>
      </section>




      {/* 1. FIXED SEARCH BAR - Layered on top of everything (z-120) */}
      <motion.div
        style={{
          y: searchY,
          scale: searchScale,
          x: "-50%",
          pointerEvents: searchPointerEvents,
          zIndex: isMenuOpen ? 100 : 120,
        }}
        transition={{ duration: 0.1 }}
        className="fixed left-1/2 top-0 origin-top w-[min(86vw,30rem)]"
      >
        <SearchBar value={searchValue} onChange={setSearchValue} />
      </motion.div>

      {/* 2. FIXED NAVBAR (Socials/Menu - z-110) */}
      <nav className="fixed top-0 left-0 w-full z-[110] flex justify-between items-center p-8 lg:p-10 pointer-events-none mix-blend-difference">
        <div className="flex items-center gap-6 text-white text-[16px] tracking-[0.12em] pointer-events-auto">
          {[
            { label: "OceanOfPDF", className: "font-[family-name:var(--font-carattere)] text-3xl tracking-normal normal-case" },
            { label: "Discover", className: "font-[family-name:var(--font-instrument-serif)] italic normal-case" },
            { label: "Donate", className: "font-[family-name:var(--font-instrument-serif)] italic normal-case" },
          ].map((link) => (
            <span
              key={link.label}
              className={`cursor-pointer hover:opacity-60 transition-opacity ${link.className}`}
            >
              {link.label}
            </span>
          ))}
        </div>

        {/* Landing slot for centered animated search bar */}
        <div className="w-[min(30rem,42vw)] hidden lg:block" />

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col cursor-pointer group pointer-events-auto relative w-12 h-8 justify-center items-center"
          aria-label="Toggle menu"
          style={{ zIndex: 111 }}
        >
          <motion.div
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 0 : -5,
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-12 h-[3px] bg-white transition-all origin-center absolute"
          />
          <motion.div
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? 0 : 5,
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="w-12 h-[3px] bg-white transition-all origin-center absolute"
          />
        </button>
      </nav>

    </main>
  );
}

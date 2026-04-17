// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import CardsParallax from "../components/cards-parallax";
// import { MoveUpRight } from "lucide-react";
// import SearchBar from "../components/search-bar";
// import ScrollCarouselParallax from "@/components/stick_carousel"; // Added Import from File 2

// // ─── NEW COMPONENTS FROM FILE 2 ──────────────────────────────────────────────

// function Noise() {
//   return (
//     <div
//       className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.018] z-0"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//       }}
//     />
//   );
// }

// function CharByCharReveal({ text, className }: { text: string; className: string }) {
//   return (
//     <span className={className}>
//       {text.split("").map((char, index) => (
//         <motion.span
//           key={`${char}-${index}`}
//           initial={{ opacity: 0, filter: "saturate(0%) brightness(0.5)" }}
//           whileInView={{ opacity: 1, filter: "saturate(100%) brightness(1)" }}
//           viewport={{ once: false, amount: 0.95 }}
//           transition={{ duration: 0.1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
//           className="inline-block will-change-transform"
//         >
//           {char === "\n" ? <br /> : char}
//         </motion.span>
//       ))}
//     </span>
//   );
// }

// // ─── EXISTING COMPONENTS ─────────────────────────────────────────────────────

// function WordByWordFade({ text, className }: { text: string; className: string }) {
//   const words = text.trim().split(/\s+/);

//   return (
//     <h2 className={className}>
//       {words.map((word, index) => (
//         <motion.span
//           key={`${word}-${index}`}
//           initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
//           whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           viewport={{ once: false, amount: 0.8 }}
//           transition={{ duration: 0.75, delay: index * 0.16, ease: [0.22, 1, 0.36, 1] }}
//           className="inline-block mr-[0.28em] will-change-transform"
//         >
//           {word}
//         </motion.span>
//       ))}
//     </h2>
//   );
// }

// export default function OceanOfPDFHero() {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showCustomCursor, setShowCustomCursor] = useState(false);
//   const [isOverHero1, setIsOverHero1] = useState(false);

//   useEffect(() => {
//     const checkUser = () => {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         setUser(null);
//       }
//     };
    
//     checkUser();
    
//     // Listen for storage changes (e.g. from other tabs or same tab updates)
//     window.addEventListener("storage", checkUser);
//     return () => window.removeEventListener("storage", checkUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     // Clear cookie
//     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
//     setUser(null);
//     router.refresh();
//   };
  
//   // New State for Hovered Images in Archive section
//   const [hoveredImage, setHoveredImage] = useState<string | null>(null);
//   const [searchValue, setSearchValue] = useState("");

//   const containerRef = useRef<HTMLDivElement>(null);
//   const sheetRef = useRef<HTMLDivElement>(null);
//   const finaleRef = useRef<HTMLDivElement>(null); // New Ref for the Replacement section

//   useEffect(() => {
//     if (isOverHero1 || isMenuOpen) {
//       document.body.classList.remove("hide-default-cursor");
//     } else {
//       document.body.classList.add("hide-default-cursor");
//     }
//   }, [isOverHero1, isMenuOpen]);

//   // Track global mouse position with spring for premium feel
//   const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };
//   const cursorX = useSpring(0, springConfig);
//   const cursorY = useSpring(0, springConfig);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       cursorX.set(e.clientX);
//       cursorY.set(e.clientY);
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, [cursorX, cursorY]);

//   // ─── ORIGINAL SCROLL LOGIC (Remains Unchanged) ─────────────────────────────
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 30, restDelta: 0.001 });

//   const { scrollYProgress: sheetProgress } = useScroll({
//     target: sheetRef,
//     offset: ["start end", "end start"],
//   });

//   const sheetCircle = useTransform(sheetProgress, [0, 0.45, 0.8], [8, 55, 160]);
//   const sheetClip = useTransform(sheetCircle, (r) => `circle(${r}% at 50% 110%)`);
//   const sheetContentY = useTransform(sheetProgress, [0, 1], ["0px", "0px"]);
//   const sheetFullOpacity = useTransform(sheetProgress, [0.3, 0.55, 0.8], [0, 1, 1]);

//   const STATEMENTS = [
//     { line1: "attention isnt lost.", line2: "its stolen." },
//     { line1: "page by page.", line2: "thought by thought." },
//     { line1: "feeds werent built for learning.", line2: "they were built for addiction" },
//   ];

//   const searchY = useTransform(smoothProgress, [0, 0.075], ["20vh", "2.15rem"]);
//   const searchScale = useTransform(smoothProgress, [0, 0.075], [1.75, 1]);
//   const searchPointerEvents = "auto";

//   const hero1Scale = useTransform(smoothProgress, [0, 0.15], [1, 0.25]);
//   const hero1Y = useTransform(smoothProgress, [0, 0.15], ["0%", "-100%"]);
//   const hero1Radius = useTransform(smoothProgress, [0, 0.075], ["0px", "0px"]);
//   const hero2Y = useTransform(smoothProgress, [0, 0.15], ["100vh", "0vh"]);
//   const hero2Scale = useTransform(smoothProgress, [0.035, 0.15, 0.12, 0.75], [0.8, 1, 1, 0.5]);
//   const hero2TextScale = useTransform(smoothProgress, [0.12, 0.75], [1, 3]);
//   const hero4Y = useTransform(smoothProgress, [0.64, 0.75], ["100vh", "0vh"]);
//   const hero5Y = useTransform(smoothProgress, [0.75, 0.85], ["100vh", "0vh"]);
//   const hero5Scale = useTransform(smoothProgress, [0.75, 0.85], [1.5, 1]);
//   const hero6Y = useTransform(smoothProgress, [0.85, 1.0], ["100vh", "0vh"]);
//   const hero6Scale = useTransform(smoothProgress, [0.85, 1.0], [1.2, 1]);

//   // ─── NEW FINALE SCROLL LOGIC ───────────────────────────────────────────────
//   // This maps perfectly to the replacement section without breaking top animations
//   const { scrollYProgress: finaleProgress } = useScroll({
//     target: finaleRef,
//     offset: ["start start", "end end"],
//   });

//   // Manifesto slides up [0 to 0.1]
//   const hero8Y = useTransform(finaleProgress, [0, 0.1], ["100vh", "0vh"]);
//   // Carousel Container slides up [0.1 to 0.15]
//   const heroCarouselY = useTransform(finaleProgress, [0.1, 0.15], ["100vh", "0vh"]);
//   // Carousel Internal Animation Progress [0.15 to 0.65]
//   const carouselScrollProg = useTransform(finaleProgress, [0.15, 0.65], [0, 1]);
//   // Big Finale slides up, hits 0, then scrolls content up to -350vh to show footer [0.65 to 1]
//   const hero3Y = useTransform(finaleProgress, [0.65, 0.75, 1], ["100vh", "0vh", "-350vh"]);

//   return (
//     <main className="relative bg-[#0C0A00]">
//       <div className="fixed inset-0 bg-[#0C0A00] -z-10" />

//       {/* Global Custom Cursor */}
//       <motion.div
//         className="fixed pointer-events-none z-[150] mix-blend-difference"
//         style={{
//           x: cursorX,
//           y: cursorY,
//           translateX: "-50%",
//           translateY: "-50%",
//         }}
//         animate={{
//           scale: 1,
//           opacity: isOverHero1 || isMenuOpen ? 0 : 1,
//         }}
//       >
//         <AnimatePresence mode="wait">
//           {!showCustomCursor ? (
//             <motion.div
//               key="default-cursor"
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0, opacity: 0 }}
//               className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
//             />
//           ) : (
//             <motion.div
//               key="visit-cursor"
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.5, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl"
//             >
//               <MoveUpRight className="w-6 h-6 text-black mb-0.5" strokeWidth={2.5} />
//               <span className="text-black font-bold text-[10px] uppercase tracking-widest leading-none">Visit</span>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Hover Image Overlay for Archive rows */}
//       <AnimatePresence>
//         {hoveredImage && (
//           <motion.div
//             key={hoveredImage}
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, transition: { delay: 1.2, duration: 0.2 } }}
//             transition={{
//               scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
//               opacity: { duration: 0.6 }
//             }}
//             style={{
//               x: cursorX,
//               y: cursorY,
//               left: "60px",
//               top: "-150px",
//               pointerEvents: "none"
//             }}
//             className="fixed z-[140] w-52 h-80 shadow-[0_30px_90px_rgba(0,0,0,0.9)] rounded-none overflow-hidden border border-white/20 bg-zinc-950"
//           >
//             <img src={`/books/${hoveredImage}`} alt="Preview" className="w-full h-full object-cover" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Fullscreen Menu Overlay */}
//       <AnimatePresence mode="wait">
//         {isMenuOpen && (
//           <motion.div
//             initial={{ y: "-100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "-100%" }}
//             transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: isMenuOpen ? 0 : 0.3 }}
//             className="fixed inset-0 z-[105] overflow-hidden"
//             style={{ backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', backgroundColor: 'rgba(254,254,254,0.4)' }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5" />
//             <motion.div
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               transition={{ duration: 0.3, delay: isMenuOpen ? 0.3 : 0 }}
//               className="relative h-full w-full flex items-center justify-end px-8 lg:px-16 overflow-hidden"
//             >
//               <nav className="flex flex-col items-end gap-4 lg:gap-6 max-w-full">
//                 {[
//                   { href: "/", label: "Home" },
//                   { href: "/about", label: "About" },
//                   { href: "/work", label: "Work" },
//                   { href: "/devs", label: "Our Team" },
//                   { href: "/contact", label: "Contact" },
//                 ].map((item, index) => (
//                   <motion.div
//                     key={item.href}
//                     initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
//                     transition={{ duration: 0.4, delay: isMenuOpen ? 0.4 + index * 0.05 : 0, ease: [0.23, 1, 0.32, 1] }}
//                   >
//                     <Link
//                       href={item.href}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-zinc-900/90 hover:text-zinc-900 transition-all duration-300 tracking-tight leading-none block whitespace-nowrap"
//                       style={{ textShadow: '0 0 40px rgba(255,95,31,0.2)' }}
//                     >
//                       {item.label}
//                     </Link>
//                   </motion.div>
//                 ))}
//               </nav>
//             </motion.div>
//             <div className="absolute inset-0 -z-10" onClick={() => setIsMenuOpen(false)} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 3. SCROLLABLE CONTAINER (First sequence) */}
//       <div ref={containerRef} className="relative h-[1200vh]">
//         {/* SECTION 1: HERO */}
//         <div
//           className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10 cursor-auto"
//           style={{ cursor: "auto !important" }}
//           onMouseEnter={() => setIsOverHero1(true)}
//           onMouseLeave={() => setIsOverHero1(false)}
//         >
//           <motion.section
//             style={{ y: hero1Y, scale: hero1Scale, borderRadius: hero1Radius, backgroundImage: "url('/hero.jpeg')" }}
//             className="relative h-screen w-full bg-[#ffffff] bg-cover bg-center flex flex-col p-10 lg:p-16 origin-center overflow-hidden shadow-2xl"
//           >
//             <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "rgba(46, 204, 113, 0.12)" }} />

//             <div className="flex-1 flex flex-col justify-center relative z-40">
//               <div className="grid grid-cols-12 w-full items-center -mt-28">
//                 <div className="col-span-12 lg:col-span-7">
//                   <h1 className="text-transparent bg-clip-text bg-gradient-to-br from-[#737373] via-[#d9d9d9] to-[#a8a8a8] drop-shadow-[0_1px_6px_rgba(255,255,255,0.15)] text-4xl lg:text-6xl font-medium leading-[1] tracking-tight max-w-2xl">
//                     One doorway.<br />
//                     A universe of books.
//                   </h1>

//                   <div className="mt-10 flex items-center gap-5">
//                     <div className="w-6 h-6 rounded-full border-[5px] border-[#737373] flex-shrink-0" />
//                   </div>
//                 </div>

//                 <div className="hidden lg:block lg:col-span-5 text-right">
//                   <p className="text-transparent bg-clip-text bg-gradient-to-br from-[#737373] via-[#d9d9d9] to-[#a8a8a8] font-serif italic text-4xl lg:text-5xl leading-[0.85]">
//                     A Reader's <br /> last stop—
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </motion.section>
//         </div>

//         {/* SECTION 2: VIDEO HERO & SECTION 4 (Stacked) */}
//         <div className="sticky top-0 h-screen w-full flex items-center justify-center z-20 pointer-events-none">

//           <motion.div
//             style={{ y: hero2Y, scale: hero2Scale }}
//             className="relative h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-[0_-50px_150px_rgba(0,0,0,0.08)] pointer-events-auto"
//           >
//             <div className="absolute inset-0" style={{ backgroundColor: 'transparent' }}>
//               <img src="/download (3).jpg" alt="People reading books" className="w-full h-full object-cover opacity-100" />
//             </div>

//             <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-10">
//               <motion.h2 style={{ scale: hero2TextScale }} className="text-[#fefefe] text-5xl lg:text-8xl font-bold tracking-tight max-w-5xl leading-[0.9] origin-center">
//                 Reading that  <br /> shapes today <br /> & sharpens  <br /> tommorow.
//               </motion.h2>
//             </div>
//           </motion.div>

//           <motion.div
//             style={{ y: hero4Y }}
//             className="absolute h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-2xl z-25 flex items-center justify-center cursor-none pointer-events-auto"
//           >
//             <div className="relative z-20 px-8 text-center text-zinc-900">
//               <h3 className="text-xs md:text-sm font-extralight tracking-[0.35em] uppercase text-zinc-900/80">
//                 {STATEMENTS[0].line1}
//               </h3>
//               <div className="mx-auto my-4 h-px w-20 bg-zinc-900/20" />
//               <WordByWordFade text={STATEMENTS[0].line2} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-zinc-900" />
//             </div>
//           </motion.div>

//           <motion.div
//             style={{ y: hero5Y }}
//             className="absolute h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-2xl z-26 flex items-center justify-center cursor-none pointer-events-auto"
//           >
//             <motion.div style={{ scale: hero5Scale }} className="relative z-20 px-8 text-center text-zinc-900">
//               <h3 className="text-xs md:text-sm font-extralight tracking-[0.35em] uppercase text-zinc-900/80">
//                 {STATEMENTS[1].line1}
//               </h3>
//               <div className="mx-auto my-4 h-px w-20 bg-zinc-900/20" />
//               <WordByWordFade text={STATEMENTS[1].line2} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] text-zinc-900" />
//             </motion.div>
//           </motion.div>

//           <motion.div
//             style={{ y: hero6Y }}
//             className="absolute h-screen w-full bg-[#fefefe] rounded-none overflow-hidden shadow-2xl z-27 flex items-center justify-center cursor-none pointer-events-auto"
//           >
//             <motion.div style={{ scale: hero6Scale }} className="relative z-20 px-8 text-center text-zinc-900">
//               <h3 className="text-xs md:text-sm font-extralight tracking-[0.35em] uppercase text-zinc-900/80">
//                 {STATEMENTS[2].line1}
//               </h3>
//               <div className="mx-auto my-4 h-px w-20 bg-zinc-900/20" />
//               <WordByWordFade text={STATEMENTS[2].line2} className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] max-w-4xl text-zinc-900" />
//             </motion.div>
//           </motion.div>

//           <CardsParallax scrollProgress={smoothProgress} inputRange={[0.12, 0.72]} onHoverChange={setShowCustomCursor} />
//         </div>
//       </div >

//       {/* ACHIEVEMENTS SECTION (Normal Flow) */}
//       <section className="relative min-h-screen w-full bg-[#fefefe] flex items-center">
//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
//           className="w-full px-8 lg:px-16"
//         >
//           <div className="flex items-center gap-6 text-zinc-900/70 uppercase tracking-[0.2em] text-xs">
//             <span className="w-2 h-2 rounded-full bg-[#737373]" />
//             <span className="text-zinc-900">Our Impact</span>
//             <span className="h-px w-12 bg-zinc-900/20" />
//             <span className="text-zinc-900/50">What We’ve Built</span>
//           </div>
//           <div className="mt-10 border-t border-zinc-900/10" />
//           <h2 className="mt-12 text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.35em] uppercase text-zinc-900 leading-[1.02] max-w-5xl">
//             Every number reflects a reader, a moment, a spark of change.
//           </h2>
//           <p className="mt-6 text-zinc-900/60 text-lg md:text-xl">
//             Shaping minds, page by purposeful page
//           </p>
//         </motion.div>
//       </section>

//       {/* SHEET REVEAL SECTION */}
//       <section ref={sheetRef} className="relative h-[360vh] w-full bg-black">
//         <div className="sticky top-0 h-screen w-screen overflow-hidden">
//           <motion.div style={{ clipPath: sheetClip }} className="absolute inset-0 bg-white text-black">
//             <motion.div style={{ opacity: sheetFullOpacity, y: sheetContentY }} className="h-full w-full px-8 py-16 md:px-16 lg:px-20">
//               <div className="max-w-6xl w-full">
//                 <h3 className="text-[20vw] md:text-[14vw] leading-[0.9] font-black tracking-[0.35em] uppercase text-zinc-900">
//                   What we do
//                 </h3>
//                 <p className="mt-6 text-[8vw] md:text-[5vw] lg:text-[3.8vw] text-zinc-500 leading-tight max-w-5xl">
//                   Bringing stories, ideas, and knowledge together — without distraction.
//                 </p>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* ─── NEW REPLACEMENT AREA: FINALE SEQUENCE ──────────────────────────────── */}
//       {/* 800vh container dedicated to scrolling the replacement code cleanly */}
//       <div ref={finaleRef} className="relative h-[800vh] bg-black">
//         <div className="sticky top-0 h-screen w-full z-20 pointer-events-none overflow-hidden">
          
//           {/* 1. Manifesto */}
//           <motion.div style={{ y: hero8Y, willChange: "transform" }} className="absolute inset-0 z-[26] bg-[#0C0A00] flex items-center justify-center pointer-events-auto px-8 transform-gpu">
//             <Noise />
//             <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[140px_1fr] gap-x-8 gap-y-12 text-white relative z-10">
//               <div className="text-zinc-500 font-medium text-xs uppercase tracking-widest">(©25)</div>
//               <h4 className="text-xl md:text-3xl font-medium leading-[1.2] tracking-tight lg:text-4xl">We bring books within reach — timeless classics, hidden gems, and modern reads — creating a space where curious minds wander, discover, and return for the next story waiting to be opened.</h4>
//               <div className="md:col-span-2 relative py-4">
//                 <div className="h-px w-full bg-zinc-800" />
//                 <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 text-zinc-600 text-[10px]">+</div>
//                 <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 text-zinc-600 text-[10px]">+</div>
//               </div>
//               <div className="text-zinc-500 font-medium text-xs uppercase tracking-widest">(Today)</div>
//               <h4 className="text-xl md:text-3xl font-medium leading-[1.2] tracking-tight lg:text-4xl">A quiet corner of the internet for readers — where novels, ideas, and forgotten classics find their way back into curious hands.</h4>
//             </div>
//           </motion.div>

//           {/* 2. Carousel Layer */}
//           <motion.div
//             style={{ y: heroCarouselY, willChange: "transform" }}
//             className="absolute inset-0 z-[27] bg-[#080808] overflow-hidden pointer-events-auto transform-gpu"
//           >
//             <ScrollCarouselParallax scrollProgress={carouselScrollProg} />
//           </motion.div>

//           {/* 3. Finale (Unveiled + Archive + Footer) */}
//           <motion.div
//             style={{ y: hero3Y, willChange: "transform" }}
//             className="absolute inset-x-0 top-0 min-h-[450vh] z-[28] bg-[#0C0A00] flex flex-col items-center justify-start py-[12vh] pointer-events-auto overflow-hidden transform-gpu"
//           >
//             <Noise />

//             {/* Unveiled */}
//             <div className="w-full max-w-7xl flex flex-col gap-6 px-8 lg:px-24 relative z-10">
//               <div className="w-full flex items-end justify-between">
//                 <div className="text-zinc-600 font-semibold text-xs uppercase tracking-[0.3em] pb-4">(Framed)</div>
//                 <h2 className="text-[12vw] md:text-[10vw] lg:text-[12vh] font-black tracking-tighter uppercase text-white leading-[0.8] text-right">
//                   Unveiled <br /> The Stories
//                 </h2>
//               </div>
//               <div className="w-full relative py-8"><div className="h-px w-full bg-zinc-900" /></div>
//               <div className="w-full flex justify-end">
//                 <p className="max-w-xl text-lg md:text-2xl font-medium text-right leading-tight text-zinc-400">
//                   Our collection reflects the beauty of words and imagination. We embrace contrast — silence and discovery, curiosity and knowledge — where every book reveals something new.
//                 </p>
//               </div>
//             </div>

//             {/* Reading Archives */}
//             <div className="w-full max-w-7xl flex flex-col items-start gap-4 px-8 lg:px-24 mt-40">
//               <motion.div
//                 initial={{ opacity: 0, x: 100 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//                 className="w-full flex flex-col gap-4"
//               >
//                 <div className="text-zinc-600 font-bold text-[10px] tracking-[0.4em] uppercase">(Archive)</div>
//                 <h2 className="text-[12vw] md:text-[10vw] lg:text-[12vh] font-black tracking-tighter uppercase text-white leading-[0.8]">
//                   <CharByCharReveal text="Reading Archives" className="inline" />
//                 </h2>
//               </motion.div>

//               <div className="w-full relative py-8">
//                 <div className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">+</div>
//                 <div className="h-px w-full bg-zinc-900" />
//                 <div className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 text-xs">+</div>
//               </div>

//               <motion.div
//                 initial={{ opacity: 0, x: 100 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//                 className="w-full flex justify-end text-zinc-500 pb-2"
//               >
//                 <p className="max-w-2xl text-lg md:text-2xl font-medium text-right leading-tight tracking-tight uppercase">
//                   A carefully gathered collection of stories, ideas, and knowledge. From thought-provoking nonfiction to immersive fiction, each book adds another world waiting to be explored.
//                 </p>
//               </motion.div>

//               <div className="w-full mt-16 pb-40">
//                 {[
//                   { label: "MODERN FICTION", num: "01", img: "goodgirlbadblood.jpg" },
//                   { label: "TIMELESS CLASSICS", num: "02", img: "greatgatsby.jpg" },
//                   { label: "SCIENCE & TECHNOLOGY", num: "03", img: "the-great-adventures-of-sherlock-holmes-1.jpg" },
//                   { label: "PERSONAL GROWTH", num: "04", img: "TheAlchemistcover.jpg" },
//                   { label: "RARE DISCOVERIES", num: "05", img: "silentpatient.jpg" },
//                 ].map((item, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, x: 100 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true, amount: 0.3 }}
//                     transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
//                     onMouseEnter={() => setHoveredImage(item.img)}
//                     onMouseLeave={() => setHoveredImage(null)}
//                     onClick={() => router.push(`/search?q=${encodeURIComponent(item.label)}`)}
//                     className="group w-full cursor-pointer hover:bg-white/[0.01] transition-all"
//                   >
//                     <div className="ml-[40vw] flex justify-between items-center py-5 md:py-6 border-b border-zinc-900 pr-8">
//                       <span className="text-lg md:text-2xl font-medium text-zinc-500 group-hover:text-white transition-colors uppercase tracking-tighter">
//                         <CharByCharReveal text={item.label} className="inline" />
//                       </span>
//                       <span className="text-[10px] md:text-xs font-bold font-mono text-zinc-700 tracking-widest">{item.num}</span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="w-full max-w-7xl px-8 lg:px-24 pb-20 mt-auto border-t border-zinc-900 pt-10 flex justify-between items-center text-zinc-600">
//               <div className="flex flex-col gap-1 text-[10px] uppercase tracking-widest font-bold">
//                 <span>©2026 Archive</span>
//                 <span className="opacity-30">Sonance Studio</span>
//               </div>
//               <a
//                 href="#"
//                 onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
//                 className="hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em] flex items-center gap-4"
//               >
//                 <div className="w-8 h-px bg-zinc-800" /> Back to Top ↑
//               </a>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//       {/* ─── END REPLACEMENT AREA ──────────────────────────────────────────────── */}

//       {/* FIXED UI ELEMENTS (Search Bar & Nav Menu) */}
//       <motion.div
//         style={{
//           y: searchY,
//           scale: searchScale,
//           x: "-50%",
//           pointerEvents: searchPointerEvents,
//           zIndex: isMenuOpen ? 100 : 120,
//         }}
//         transition={{ duration: 0.1 }}
//         className="fixed left-1/2 top-0 origin-top w-[min(86vw,30rem)]"
//       >
//         <SearchBar 
//           value={searchValue} 
//           onChange={setSearchValue} 
//           onSubmit={() => {
//             if (searchValue.trim()) {
//               router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
//             }
//           }}
//         />
//       </motion.div>

//       <nav className="fixed top-0 left-0 w-full z-[110] flex justify-between items-center p-8 lg:p-10 pointer-events-none mix-blend-difference">
//         <div className="flex items-center gap-6 text-white text-[16px] tracking-[0.12em] pointer-events-auto">
//           {[
//             { label: "OceanOfPDF", className: "font-[family-name:var(--font-carattere)] text-3xl tracking-normal normal-case" },
//             { label: "Discover", className: "font-[family-name:var(--font-instrument-serif)] italic normal-case" },
//             { label: "Donate", className: "font-[family-name:var(--font-instrument-serif)] italic normal-case" },
//             ].map((link) => (
//             <span
//               key={link.label}
//               className={`cursor-pointer hover:opacity-60 transition-opacity ${link.className}`}
//             >
//               {link.label}
//             </span>
//             ))}
//             {user ? (
//             <button
//               onClick={handleLogout}
//               className="font-[family-name:var(--font-instrument-serif)] italic normal-case cursor-pointer hover:opacity-60 transition-opacity pointer-events-auto"
//             >
//               Logout
//             </button>
//             ) : (
//             <Link
//               href="/login"
//               className="font-[family-name:var(--font-instrument-serif)] italic normal-case cursor-pointer hover:opacity-60 transition-opacity pointer-events-auto"
//             >
//               Login
//             </Link>
//             )}
//             </div>

//         <div className="w-[min(30rem,42vw)] hidden lg:block" />

//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="flex flex-col cursor-pointer group pointer-events-auto relative w-12 h-8 justify-center items-center"
//           aria-label="Toggle menu"
//           style={{ zIndex: 111 }}
//         >
//           <motion.div
//             animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -5 }}
//             transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
//             className="w-12 h-[3px] bg-white transition-all origin-center absolute"
//           />
//           <motion.div
//             animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 5 }}
//             transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
//             className="w-12 h-[3px] bg-white transition-all origin-center absolute"
//           />
//         </button>
//       </nav>
//     </main>
//   );
// }
// SerumUI.tsx  —  React + Tailwind + Bun API
// Install: bun add react react-dom @types/react @types/react-dom
// Run API:  bun run server.ts
// Run UI:   any vite/bun dev server pointing at this file
"use client"
import React, {
  useState, useRef, useEffect, useCallback, createContext, useContext,
} from "react";

// ── API layer ────────────────────────────────────────────────────────────────
const BASE = "http://localhost:3001";

async function apiFetch<T>(path: string, method = "GET", body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const api = {
  getState:        ()                       => apiFetch<SynthState>("/state"),
  getPresets:      ()                       => apiFetch<{ current: string; presets: string[] }>("/presets"),
  loadPreset:      (name: string)           => apiFetch<{ state: SynthState }>(`/presets/${encodeURIComponent(name)}`, "POST"),
  patchOsc:        (id: "a"|"b", p: Partial<OscState>)   => apiFetch(`/osc/${id}`, "PATCH", p),
  patchFilter:     (p: Partial<FilterState>)              => apiFetch("/filter", "PATCH", p),
  patchEnv:        (id: 1|2, p: Partial<EnvState>)        => apiFetch(`/env/${id}`, "PATCH", p),
  patchLfo:        (id: 1|2, p: Partial<LfoState>)        => apiFetch(`/lfo/${id}`, "PATCH", p),
  patchVoice:      (p: Partial<VoiceState>)               => apiFetch("/voice", "PATCH", p),
  patchMaster:     (p: Partial<MasterState>)              => apiFetch("/master", "PATCH", p),
  patchMatrix:     (m: ModEntry[])                        => apiFetch("/matrix", "PATCH", m),
};

// ── Types ────────────────────────────────────────────────────────────────────
interface OscState { enabled:boolean; waveType:string; wtPos:number; fine:number; semi:number; oct:number; level:number; pan:number; phase:number; rand:number; uni:number; det:number; blend:number }
interface FilterState { enabled:boolean; type:string; slope:string; cutoff:number; res:number; drive:number; mix:number }
interface EnvState  { atk:number; dec:number; sus:number; rel:number; lvl:number; mode:string }
interface LfoState  { rate:number; amt:number; phase:number; rise:number; mode:string }
interface VoiceState{ glide:number; det:number; voices:number; legato:boolean; retrig:boolean }
interface MasterState { volume:number; pan:number; tune:number }
interface ModEntry  { src:string; dst:string; amount:number }
interface SynthState { oscA:OscState; oscB:OscState; sub:any; noise:any; filter:FilterState; env1:EnvState; env2:EnvState; lfo1:LfoState; lfo2:LfoState; voice:VoiceState; master:MasterState; matrix:ModEntry[]; preset:string }

// ── Global synth context ─────────────────────────────────────────────────────
type SynthCtx = { s: SynthState; set: (s: SynthState) => void; status: string };
const Ctx = createContext<SynthCtx>(null!);
const useSynth = () => useContext(Ctx);

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:"#060a10", panel:"#0b1219", panelAlt:"#0e1722",
  border:"#192638", borderB:"#1e3048",
  cyan:"#00cce8", cyanB:"#00eeff", cyanD:"#0099bb",
  orange:"#ff5f00", orangeB:"#ff8800",
  green:"#00bb55", purple:"#7744ee",
  yellow:"#ccaa00", red:"#ee4444",
  txt:"#aabdcc", txtD:"#5e7d94", txtM:"#324d62",
  kBg:"#060c14", kTr:"#112030", iBg:"#09121c",
};

// ── Debounce ──────────────────────────────────────────────────────────────────
function useDebounce<T>(val: T, ms: number): T {
  const [dv, setDv] = useState(val);
  useEffect(() => { const t = setTimeout(() => setDv(val), ms); return () => clearTimeout(t); }, [val, ms]);
  return dv;
}

// ── Knob ─────────────────────────────────────────────────────────────────────
interface KnobProps { value: number; onChange: (v: number) => void; color?: string; sz?: number; label?: string }
function Knob({ value, onChange, color=C.cyan, sz=34, label }: KnobProps) {
  const drag = useRef<{ sy: number; sv: number }>({ sy:0, sv:0 });
  const R = sz/2 - 3.5, cx = sz/2, cy = sz/2;
  const circ = 2*Math.PI*R;
  const tLen = circ*0.75, vLen = value*tLen;
  const iAng = 135 + value*270;
  const onMD = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    drag.current = { sy: e.clientY, sv: value };
    const mv = (e2: MouseEvent) => onChange(Math.max(0, Math.min(1, drag.current.sv + (drag.current.sy - e2.clientY)/110)));
    const mu = () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", mu); };
    window.addEventListener("mousemove", mv);
    window.addEventListener("mouseup", mu);
  }, [value, onChange]);
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"ns-resize",userSelect:"none",flexShrink:0}} onMouseDown={onMD}>
      <svg width={sz} height={sz}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.kTr} strokeWidth={2.5}
          strokeDasharray={`${tLen} ${circ-tLen}`} transform={`rotate(135,${cx},${cy})`} strokeLinecap="round"/>
        {value>0.01&&<circle cx={cx} cy={cy} r={R} fill="none" stroke={color} strokeWidth={2.5}
          strokeDasharray={`${vLen} ${circ-vLen}`} transform={`rotate(135,${cx},${cy})`} strokeLinecap="round"/>}
        <circle cx={cx} cy={cy} r={R-3.5} fill="#08131e" stroke="#0d1e2e" strokeWidth={0.8}/>
        <line x1={cx} y1={cy-1} x2={cx} y2={cy-R+4} stroke="rgba(255,255,255,0.82)" strokeWidth={1.5} strokeLinecap="round"
          transform={`rotate(${iAng},${cx},${cy})`}/>
      </svg>
      {label&&<span style={{fontSize:7,color:C.txtD,letterSpacing:"0.08em",textTransform:"uppercase",fontFamily:"monospace",whiteSpace:"nowrap"}}>{label}</span>}
    </div>
  );
}

// ── Segment button strip ──────────────────────────────────────────────────────
function SegBtn({ opts, value, onChange, color }: { opts:string[]; value:string; onChange:(v:string)=>void; color:string }) {
  return (
    <div style={{display:"flex",gap:2}}>
      {opts.map(o => (
        <div key={o} onClick={()=>onChange(o)} style={{
          padding:"2px 5px", fontSize:7,
          background:o===value?`${color}20`:C.iBg,
          border:`0.5px solid ${o===value?color:C.border}`,
          color:o===value?color:C.txtM, borderRadius:2, cursor:"pointer",
          letterSpacing:"0.04em", userSelect:"none", textTransform:"uppercase", fontFamily:"monospace",
        }}>{o}</div>
      ))}
    </div>
  );
}

// ── LED button ────────────────────────────────────────────────────────────────
function LedBtn({ label, on, onChange, color=C.cyan, sm=false }: { label:string; on:boolean; onChange:(v:boolean)=>void; color?:string; sm?:boolean }) {
  return (
    <div onClick={()=>onChange(!on)} style={{
      padding:sm?"2px 5px":"3px 8px",
      background:on?`${color}18`:C.iBg,
      border:`0.5px solid ${on?color:C.border}`,
      borderRadius:2, cursor:"pointer", userSelect:"none",
      display:"flex", alignItems:"center", gap:3, flexShrink:0,
    }}>
      <div style={{width:4,height:4,borderRadius:"50%",background:on?color:C.txtM,flexShrink:0}}/>
      <span style={{fontSize:7.5,color:on?color:C.txtD,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"monospace"}}>{label}</span>
    </div>
  );
}

function SectionDot({ color }: { color:string }) {
  return <div style={{width:7,height:7,borderRadius:"50%",background:color,boxShadow:`0 0 6px ${color}88`,flexShrink:0}}/>;
}

// ── Wave canvas (OscA/B display) ──────────────────────────────────────────────
function WaveCanvas({ color, h=88 }: { color:string; h?:number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H); ctx.fillStyle="#030710"; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle=`${color}14`; ctx.lineWidth=0.5;
    for (let x=0;x<W;x+=W/8){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for (let y=0;y<H;y+=H/4){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    const getY=(t:number)=>Math.sin(t*Math.PI*8)*0.48+Math.sin(t*Math.PI*16+0.55)*0.24+Math.sin(t*Math.PI*24+1.1)*0.13;
    ctx.beginPath();
    for(let i=0;i<=W;i++){const py=H/2-getY(i/W)*(H*0.42);i===0?ctx.moveTo(i,py):ctx.lineTo(i,py);}
    ctx.strokeStyle=color; ctx.lineWidth=1.6; ctx.shadowColor=color; ctx.shadowBlur=10; ctx.stroke(); ctx.shadowBlur=0;
    const grad=ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,`${color}22`); grad.addColorStop(1,"transparent");
    ctx.beginPath();
    for(let i=0;i<=W;i++){const py=H/2-getY(i/W)*(H*0.42);i===0?ctx.moveTo(i,py):ctx.lineTo(i,py);}
    ctx.lineTo(W,H/2);ctx.lineTo(0,H/2);ctx.closePath();ctx.fillStyle=grad;ctx.fill();
  }, [color]);
  return <canvas ref={ref} width={480} height={h} style={{display:"block",width:"100%",height:"auto",border:`1px solid ${C.border}`,borderRadius:2}}/>;
}

// ── Filter canvas ─────────────────────────────────────────────────────────────
function FilterCanvas({ cutoff, res }: { cutoff:number; res:number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);ctx.fillStyle="#030710";ctx.fillRect(0,0,W,H);
    ctx.strokeStyle=`${C.purple}18`;ctx.lineWidth=0.5;
    for(let x=0;x<=W;x+=W/5){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    const pad=5,fh=H-pad*2;
    ctx.beginPath();
    for(let i=0;i<=W;i++){
      const f=i/W,d=f-cutoff;
      let m=d<-0.06?1:d<0?1+res*3.2*Math.exp(-d*d/0.0006):Math.exp(-8.5*d)*(1+res*2.2*Math.exp(-d*d/0.002));
      const y=H-pad-m*fh;i===0?ctx.moveTo(i,y):ctx.lineTo(i,y);
    }
    ctx.strokeStyle=C.purple;ctx.lineWidth=1.6;ctx.shadowColor=C.purple;ctx.shadowBlur=7;ctx.stroke();ctx.shadowBlur=0;
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,`${C.purple}28`);g.addColorStop(1,"transparent");
    ctx.beginPath();
    for(let i=0;i<=W;i++){const f=i/W,d=f-cutoff;let m=d<-0.06?1:d<0?1+res*3.2*Math.exp(-d*d/0.0006):Math.exp(-8.5*d);const y=H-pad-m*fh;i===0?ctx.moveTo(i,y):ctx.lineTo(i,y);}
    ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=g;ctx.fill();
  }, [cutoff, res]);
  return <canvas ref={ref} width={206} height={58} style={{display:"block",width:"100%",height:"auto",border:`1px solid ${C.border}`,borderRadius:2}}/>;
}

// ── Envelope canvas ───────────────────────────────────────────────────────────
function EnvCanvas({ env, color }: { env:EnvState; color:string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);ctx.fillStyle="#030710";ctx.fillRect(0,0,W,H);
    const p=5,w2=W-p*2,h2=H-p*2;
    const a=env.atk*w2*0.18,d=(env.dec*w2*0.22),s=env.sus,r=(env.rel*w2*0.28);
    const x0=p,x1=p+a,x2=p+a+d,x3=p+w2-r,x4=p+w2;
    const yBot=p+h2,yTop=p,yS=p+h2*(1-s);
    ctx.beginPath();ctx.moveTo(x0,yBot);ctx.lineTo(x1,yTop);ctx.bezierCurveTo(x1+6,yTop+10,x2-4,yS-4,x2,yS);ctx.lineTo(x3,yS);ctx.lineTo(x4,yBot);
    ctx.strokeStyle=color;ctx.lineWidth=1.6;ctx.shadowColor=color;ctx.shadowBlur=6;ctx.stroke();ctx.shadowBlur=0;
    const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,`${color}20`);g.addColorStop(1,"transparent");
    ctx.beginPath();ctx.moveTo(x0,yBot);ctx.lineTo(x1,yTop);ctx.bezierCurveTo(x1+6,yTop+10,x2-4,yS-4,x2,yS);ctx.lineTo(x3,yS);ctx.lineTo(x4,yBot);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fillStyle=g;ctx.fill();
  }, [env, color]);
  return <canvas ref={ref} width={206} height={54} style={{display:"block",width:"100%",height:"auto",border:`1px solid ${C.border}`,borderRadius:2}}/>;
}

// ── LFO canvas ────────────────────────────────────────────────────────────────
function LfoCanvas({ rate, color }: { rate:number; color:string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);ctx.fillStyle="#030710";ctx.fillRect(0,0,W,H);
    ctx.strokeStyle=`${color}18`;ctx.lineWidth=0.7;ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();
    const freq=1+rate*5;
    ctx.beginPath();
    for(let i=0;i<=W;i++){const y=H/2-Math.sin((i/W)*Math.PI*2*freq*2)*(H*0.40);i===0?ctx.moveTo(i,y):ctx.lineTo(i,y);}
    ctx.strokeStyle=color;ctx.lineWidth=1.6;ctx.shadowColor=color;ctx.shadowBlur=7;ctx.stroke();ctx.shadowBlur=0;
  }, [rate, color]);
  return <canvas ref={ref} width={206} height={52} style={{display:"block",width:"100%",height:"auto",border:`1px solid ${C.border}`,borderRadius:2}}/>;
}

// ── Piano ─────────────────────────────────────────────────────────────────────
function Piano() {
  const [pressed,setPressed]=useState(new Set<number>());
  const wW=22,wH=48,bW=13,bH=30,octs=3;
  const wPat=[0,2,4,5,7,9,11],bPat=[1,3,null,6,8,10,null];
  const whites: {x:number;n:number}[]=[], blacks: {x:number;n:number}[]=[];
  let wi=0;
  for(let o=0;o<octs;o++){for(let w=0;w<7;w++){const n=o*12+wPat[w];whites.push({x:wi*wW,n});if(bPat[w]!=null)blacks.push({x:wi*wW+wW*0.66,n:o*12+(bPat[w] as number)});wi++;}}
  const press=(n:number)=>setPressed(p=>new Set([...p,n]));
  const release=(n:number)=>setPressed(p=>{const s=new Set(p);s.delete(n);return s;});
  return(
    <div style={{position:"relative",height:wH+4,width:wi*wW}}>
      {whites.map(({x,n})=><div key={n} onMouseDown={()=>press(n)} onMouseUp={()=>release(n)} onMouseLeave={()=>release(n)} style={{position:"absolute",left:x,top:2,width:wW-1,height:wH,background:pressed.has(n)?C.cyan:"#c8d8e0",border:"0.5px solid #889aaa",borderRadius:"0 0 3px 3px",cursor:"pointer"}}/>)}
      {blacks.map(({x,n})=><div key={n} onMouseDown={()=>press(n)} onMouseUp={()=>release(n)} onMouseLeave={()=>release(n)} style={{position:"absolute",left:x,top:2,width:bW,height:bH,background:pressed.has(n)?C.cyanB:"#0c1520",border:"0.5px solid #1e3040",borderRadius:"0 0 3px 3px",cursor:"pointer",zIndex:1}}/>)}
    </div>
  );
}

// ── Mod Matrix ────────────────────────────────────────────────────────────────
function MatrixGrid() {
  const { s, set } = useSynth();
  const srcs=["ENV 1","ENV 2","LFO 1","LFO 2","VEL","NOTE"];
  const dsts=["CUTOFF","RES","OSC A","OSC B","VOL","PAN"];
  const sCol: Record<string,string>={"ENV 1":C.yellow,"ENV 2":C.yellow,"LFO 1":C.red,"LFO 2":C.red,"VEL":"#5599ff","NOTE":"#5599ff"};
  const getVal=(src:string,dst:string)=>s.matrix.find(m=>m.src===src&&m.dst===dst)?.amount??0;
  const setVal=(src:string,dst:string,amount:number)=>{
    const next=s.matrix.filter(m=>!(m.src===src&&m.dst===dst));
    if(amount>0)next.push({src,dst,amount});
    const ns={...s,matrix:next};set(ns);api.patchMatrix(ns.matrix);
  };
  return(
    <div style={{overflowX:"auto",fontSize:7}}>
      <div style={{display:"flex",gap:2,marginBottom:3,paddingLeft:42}}>
        {dsts.map(d=><div key={d} style={{minWidth:44,textAlign:"center",color:C.txtM,letterSpacing:"0.03em"}}>{d}</div>)}
      </div>
      {srcs.map(src=>(
        <div key={src} style={{display:"flex",gap:2,marginBottom:2,alignItems:"center"}}>
          <div style={{minWidth:42,color:C.txtD,letterSpacing:"0.03em",fontSize:7}}>{src}</div>
          {dsts.map(dst=>{
            const v=getVal(src,dst);
            return(
              <div key={dst} title={`${src} → ${dst}: ${(v*100).toFixed(0)}%`} onClick={()=>{const nv=v>=0.8?0:+(v+0.2).toFixed(1);setVal(src,dst,nv);}} style={{minWidth:44,height:14,background:C.kBg,border:`0.5px solid ${C.border}`,borderRadius:2,display:"flex",alignItems:"center",padding:"0 2px",cursor:"pointer"}}>
                {v>0&&<div style={{height:3,width:`${v*100}%`,background:sCol[src]||C.cyan,borderRadius:1}}/>}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{fontSize:6.5,color:C.txtM,marginTop:3}}>click cells to cycle amount</div>
    </div>
  );
}

// ── Status bar ────────────────────────────────────────────────────────────────
function StatusBar() {
  const { status } = useSynth();
  return (
    <div style={{fontSize:7,color:status.startsWith("ERR")?C.red:C.txtM,letterSpacing:"0.06em",fontFamily:"monospace"}}>
      {status}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function SerumUI() {
  const [s, setS] = useState<SynthState | null>(null);
  const [presets, setPresets] = useState<string[]>([]);
  const [status, setStatus] = useState("connecting…");

  useEffect(() => {
    api.getState().then(data => { setS(data); setStatus("connected ✓"); }).catch(() => setStatus("ERR: API offline — run server.ts"));
    api.getPresets().then(d => setPresets(d.presets)).catch(()=>{});
  }, []);

  const upd = useCallback((ns: SynthState) => setS(ns), []);

  const loadPreset = async (name: string) => {
    try { const r = await api.loadPreset(name); setS(r.state); setStatus(`loaded "${name}"`); }
    catch { setStatus("ERR: preset load failed"); }
  };

  if (!s) return (
    <div style={{background:C.bg,color:C.txtD,fontFamily:"monospace",padding:20,border:`1px solid ${C.border}`,borderRadius:6,minWidth:820}}>
      {status}
    </div>
  );

  // helpers that write local state + debounce-patched API
  const pOscA = (p: Partial<OscState>) => { setS({...s,oscA:{...s.oscA,...p}}); api.patchOsc("a",p); };
  const pOscB = (p: Partial<OscState>) => { setS({...s,oscB:{...s.oscB,...p}}); api.patchOsc("b",p); };
  const pFilt = (p: Partial<FilterState>) => { const nf={...s.filter,...p}; setS({...s,filter:nf}); api.patchFilter(p); };
  const pEnv1 = (p: Partial<EnvState>) => { setS({...s,env1:{...s.env1,...p}}); api.patchEnv(1,p); };
  const pEnv2 = (p: Partial<EnvState>) => { setS({...s,env2:{...s.env2,...p}}); api.patchEnv(2,p); };
  const pLfo1 = (p: Partial<LfoState>) => { setS({...s,lfo1:{...s.lfo1,...p}}); api.patchLfo(1,p); };
  const pMast = (p: Partial<MasterState>) => { setS({...s,master:{...s.master,...p}}); api.patchMaster(p); };
  const pVoice= (p: Partial<VoiceState>) => { setS({...s,voice:{...s.voice,...p}}); api.patchVoice(p); };

  const D = { width:1, height:18, background:C.border, flexShrink:0 };

  return (
    <Ctx.Provider value={{ s, set: upd, status }}>
      <div style={{background:C.bg,color:C.txt,fontFamily:"'Courier New',monospace",border:`1px solid ${C.borderB}`,borderRadius:6,overflow:"hidden",minWidth:820}}>

        {/* ── HEADER ── */}
        <div style={{display:"flex",alignItems:"center",gap:7,padding:"5px 10px",background:C.panel,borderBottom:`1px solid ${C.border}`,flexWrap:"wrap"}}>
          <span style={{fontSize:18,fontWeight:"bold",color:C.cyan,letterSpacing:"0.22em",fontFamily:"monospace",marginRight:2,textShadow:`0 0 12px ${C.cyan}66`}}>SERUM</span>
          <div style={D}/>

          {/* preset selector */}
          <select value={s.preset} onChange={e=>loadPreset(e.target.value)}
            style={{background:C.iBg,border:`0.5px solid ${C.border}`,color:C.txtD,fontSize:7.5,padding:"2px 6px",borderRadius:2,fontFamily:"monospace",letterSpacing:"0.05em",minWidth:130,cursor:"pointer"}}>
            {presets.map(p=><option key={p}>{p}</option>)}
          </select>

          <div style={{flex:1}}/>
          <StatusBar/>
          <div style={{flex:1}}/>

          <Knob value={s.master.volume} onChange={v=>pMast({volume:v})} color={C.cyan} sz={26} label="VOL"/>
          <Knob value={s.master.pan}    onChange={v=>pMast({pan:v})}    color={C.cyan} sz={26} label="PAN"/>
          <Knob value={s.master.tune}   onChange={v=>pMast({tune:v})}   color={C.yellow} sz={26} label="TUNE"/>
        </div>

        {/* ── BODY ── */}
        <div style={{display:"flex"}}>

          {/* LEFT */}
          <div style={{flex:1,padding:"7px",display:"flex",flexDirection:"column",gap:5,minWidth:0}}>

            {/* OSC A */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.borderB}`,borderRadius:4,padding:"6px"}}>
              <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}>
                <SectionDot color={C.cyan}/>
                <span style={{fontSize:8.5,color:C.cyan,letterSpacing:"0.12em"}}>OSC A</span>
                <div style={{flex:1}}/>
                <LedBtn label="ON" on={s.oscA.enabled} onChange={v=>pOscA({enabled:v})} color={C.cyan} sm/>
                <div style={D}/>
                <SegBtn opts={["INIT","SIN","TRI","SAW","SQR","WT"]} value={s.oscA.waveType} onChange={v=>pOscA({waveType:v})} color={C.cyan}/>
              </div>
              <WaveCanvas color={C.cyan} h={88}/>
              <div style={{display:"flex",gap:6,marginTop:6,alignItems:"flex-end",flexWrap:"wrap"}}>
                <Knob value={s.oscA.wtPos}  onChange={v=>pOscA({wtPos:v})}  color={C.cyan}  sz={30} label="WT POS"/>
                <Knob value={s.oscA.fine}   onChange={v=>pOscA({fine:v})}   color={C.cyan}  sz={30} label="FINE"/>
                <Knob value={s.oscA.semi}   onChange={v=>pOscA({semi:v})}   color={C.cyan}  sz={30} label="SEMI"/>
                <Knob value={s.oscA.oct}    onChange={v=>pOscA({oct:v})}    color={C.cyan}  sz={30} label="OCT"/>
                <div style={{...D,height:38}}/>
                <Knob value={s.oscA.level}  onChange={v=>pOscA({level:v})}  color={C.cyanB} sz={40} label="LEVEL"/>
                <Knob value={s.oscA.pan}    onChange={v=>pOscA({pan:v})}    color={C.cyan}  sz={30} label="PAN"/>
                <div style={{...D,height:38}}/>
                <Knob value={s.oscA.phase}  onChange={v=>pOscA({phase:v})}  color={C.cyan}  sz={30} label="PHASE"/>
                <Knob value={s.oscA.rand}   onChange={v=>pOscA({rand:v})}   color={C.cyan}  sz={30} label="RAND"/>
                <Knob value={s.oscA.uni}    onChange={v=>pOscA({uni:v})}    color={C.cyanD} sz={30} label="UNI"/>
                <Knob value={s.oscA.det}    onChange={v=>pOscA({det:v})}    color={C.cyan}  sz={30} label="DET"/>
                <Knob value={s.oscA.blend}  onChange={v=>pOscA({blend:v})}  color={C.cyan}  sz={30} label="BLEND"/>
              </div>
            </div>

            {/* OSC B + Sub + Noise */}
            <div style={{display:"flex",gap:5}}>
              <div style={{flex:5,background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"6px"}}>
                <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
                  <SectionDot color={C.orange}/>
                  <span style={{fontSize:8,color:C.orange,letterSpacing:"0.1em"}}>OSC B</span>
                  <div style={{flex:1}}/>
                  <LedBtn label="ON" on={s.oscB.enabled} onChange={v=>pOscB({enabled:v})} color={C.orange} sm/>
                  <SegBtn opts={["SAW","SQR","TRI","SIN","WT"]} value={s.oscB.waveType} onChange={v=>pOscB({waveType:v})} color={C.orange}/>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <div style={{flex:3,minWidth:0}}><WaveCanvas color={C.orange} h={60}/></div>
                  <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"flex-end",flex:4}}>
                    <Knob value={s.oscB.wtPos} onChange={v=>pOscB({wtPos:v})} color={C.orange} sz={27} label="WT POS"/>
                    <Knob value={s.oscB.fine}  onChange={v=>pOscB({fine:v})}  color={C.orange} sz={27} label="FINE"/>
                    <Knob value={s.oscB.semi}  onChange={v=>pOscB({semi:v})}  color={C.orange} sz={27} label="SEMI"/>
                    <Knob value={s.oscB.level} onChange={v=>pOscB({level:v})} color={C.orangeB} sz={33} label="LEVEL"/>
                    <Knob value={s.oscB.pan}   onChange={v=>pOscB({pan:v})}   color={C.orange} sz={27} label="PAN"/>
                    <Knob value={s.oscB.uni}   onChange={v=>pOscB({uni:v})}   color={C.orange} sz={27} label="UNI"/>
                    <Knob value={s.oscB.det}   onChange={v=>pOscB({det:v})}   color={C.orange} sz={27} label="DET"/>
                  </div>
                </div>
              </div>
              <div style={{flex:2,background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"5px"}}>
                <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:4}}><SectionDot color={C.green}/><span style={{fontSize:8,color:C.green,letterSpacing:"0.09em"}}>SUB</span></div>
                <SegBtn opts={["SIN","TRI","SQR","PLS"]} value={s.sub.wave} onChange={v=>{setS({...s,sub:{...s.sub,wave:v}});}} color={C.green}/>
                <div style={{display:"flex",gap:4,marginTop:5}}>
                  <Knob value={s.sub.level} onChange={v=>{setS({...s,sub:{...s.sub,level:v}});api.patchMaster({});}} color={C.green} sz={28} label="LEVEL"/>
                  <Knob value={s.sub.pan}   onChange={v=>{setS({...s,sub:{...s.sub,pan:v}});}} color={C.green} sz={28} label="PAN"/>
                </div>
              </div>
              <div style={{flex:2,background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"5px"}}>
                <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:8}}><SectionDot color={C.txtD}/><span style={{fontSize:8,color:C.txtD,letterSpacing:"0.09em"}}>NOISE</span></div>
                <div style={{display:"flex",gap:4}}>
                  <Knob value={s.noise.pitch} onChange={v=>{setS({...s,noise:{...s.noise,pitch:v}});}} color={C.txtD} sz={28} label="PITCH"/>
                  <Knob value={s.noise.level} onChange={v=>{setS({...s,noise:{...s.noise,level:v}});}} color={C.txtD} sz={28} label="LEVEL"/>
                  <Knob value={s.noise.pan}   onChange={v=>{setS({...s,noise:{...s.noise,pan:v}});}}   color={C.txtD} sz={28} label="PAN"/>
                </div>
              </div>
            </div>

            {/* Mod Matrix */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"6px"}}>
              <div style={{marginBottom:4}}><span style={{fontSize:7.5,color:C.txtM,letterSpacing:"0.1em",textTransform:"uppercase"}}>MOD MATRIX</span></div>
              <MatrixGrid/>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{width:228,background:C.panel,borderLeft:`1px solid ${C.border}`,padding:"7px",display:"flex",flexDirection:"column",gap:5,flexShrink:0}}>

            {/* FILTER */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"6px"}}>
              <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
                <SectionDot color={C.purple}/>
                <span style={{fontSize:8.5,color:C.purple,letterSpacing:"0.1em"}}>FILTER</span>
                <div style={{flex:1}}/>
                <LedBtn label="ON" on={s.filter.enabled} onChange={v=>pFilt({enabled:v})} color={C.purple} sm/>
              </div>
              <div style={{display:"flex",gap:2,marginBottom:4}}>
                <SegBtn opts={["LP","HP","BP","BR","AP"]} value={s.filter.type}  onChange={v=>pFilt({type:v})}  color={C.purple}/>
                <div style={{flex:1}}/>
                <SegBtn opts={["12","24","OS"]}           value={s.filter.slope} onChange={v=>pFilt({slope:v})} color={C.purple}/>
              </div>
              <FilterCanvas cutoff={s.filter.cutoff} res={s.filter.res}/>
              <div style={{display:"flex",gap:5,marginTop:5,justifyContent:"space-around"}}>
                <Knob value={s.filter.cutoff} onChange={v=>pFilt({cutoff:v})} color={C.purple} sz={33} label="CUTOFF"/>
                <Knob value={s.filter.res}    onChange={v=>pFilt({res:v})}    color={C.purple} sz={33} label="RES"/>
                <Knob value={s.filter.drive}  onChange={v=>pFilt({drive:v})}  color={C.purple} sz={33} label="DRIVE"/>
                <Knob value={s.filter.mix}    onChange={v=>pFilt({mix:v})}    color={C.purple} sz={33} label="MIX"/>
              </div>
            </div>

            {/* ENV 1 */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"5px"}}>
              <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
                <SectionDot color={C.yellow}/>
                <span style={{fontSize:8,color:C.yellow,letterSpacing:"0.1em"}}>ENV 1</span>
                <div style={{flex:1}}/>
                <SegBtn opts={["LIN","EXP","SUS"]} value={s.env1.mode} onChange={v=>pEnv1({mode:v})} color={C.yellow}/>
              </div>
              <EnvCanvas env={s.env1} color={C.yellow}/>
              <div style={{display:"flex",gap:3,marginTop:4,justifyContent:"space-around"}}>
                <Knob value={s.env1.atk} onChange={v=>pEnv1({atk:v})} color={C.yellow} sz={27} label="ATK"/>
                <Knob value={s.env1.dec} onChange={v=>pEnv1({dec:v})} color={C.yellow} sz={27} label="DEC"/>
                <Knob value={s.env1.sus} onChange={v=>pEnv1({sus:v})} color={C.yellow} sz={27} label="SUS"/>
                <Knob value={s.env1.rel} onChange={v=>pEnv1({rel:v})} color={C.yellow} sz={27} label="REL"/>
                <Knob value={s.env1.lvl} onChange={v=>pEnv1({lvl:v})} color={C.yellow} sz={27} label="LVL"/>
              </div>
            </div>

            {/* ENV 2 */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"5px"}}>
              <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
                <SectionDot color="#dd9900"/>
                <span style={{fontSize:8,color:"#dd9900",letterSpacing:"0.1em"}}>ENV 2</span>
                <div style={{flex:1}}/>
                <SegBtn opts={["LIN","EXP","SUS"]} value={s.env2.mode} onChange={v=>pEnv2({mode:v})} color="#dd9900"/>
              </div>
              <EnvCanvas env={s.env2} color="#dd9900"/>
              <div style={{display:"flex",gap:3,marginTop:4,justifyContent:"space-around"}}>
                <Knob value={s.env2.atk} onChange={v=>pEnv2({atk:v})} color="#dd9900" sz={27} label="ATK"/>
                <Knob value={s.env2.dec} onChange={v=>pEnv2({dec:v})} color="#dd9900" sz={27} label="DEC"/>
                <Knob value={s.env2.sus} onChange={v=>pEnv2({sus:v})} color="#dd9900" sz={27} label="SUS"/>
                <Knob value={s.env2.rel} onChange={v=>pEnv2({rel:v})} color="#dd9900" sz={27} label="REL"/>
              </div>
            </div>

            {/* LFO 1 */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"5px"}}>
              <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
                <SectionDot color={C.red}/>
                <span style={{fontSize:8,color:C.red,letterSpacing:"0.1em"}}>LFO 1</span>
                <div style={{flex:1}}/>
                <SegBtn opts={["SYNC","TRIG","ENV"]} value={s.lfo1.mode} onChange={v=>pLfo1({mode:v})} color={C.red}/>
              </div>
              <LfoCanvas rate={s.lfo1.rate} color={C.red}/>
              <div style={{display:"flex",gap:3,marginTop:4,justifyContent:"space-around"}}>
                <Knob value={s.lfo1.rate}  onChange={v=>pLfo1({rate:v})}  color={C.red} sz={27} label="RATE"/>
                <Knob value={s.lfo1.amt}   onChange={v=>pLfo1({amt:v})}   color={C.red} sz={27} label="AMT"/>
                <Knob value={s.lfo1.phase} onChange={v=>pLfo1({phase:v})} color={C.red} sz={27} label="PHASE"/>
                <Knob value={s.lfo1.rise}  onChange={v=>pLfo1({rise:v})}  color={C.red} sz={27} label="RISE"/>
              </div>
            </div>

            {/* Voice */}
            <div style={{background:C.panelAlt,border:`1px solid ${C.border}`,borderRadius:4,padding:"5px",display:"flex",gap:5,alignItems:"center",justifyContent:"center"}}>
              <Knob value={s.voice.glide}  onChange={v=>pVoice({glide:v})}  color={C.cyan} sz={26} label="GLIDE"/>
              <Knob value={s.voice.det}    onChange={v=>pVoice({det:v})}    color={C.cyan} sz={26} label="DET"/>
              <Knob value={s.voice.voices} onChange={v=>pVoice({voices:v})} color={C.cyan} sz={26} label="VOICES"/>
              <div style={{flex:1}}/>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <LedBtn label="LEGATO" on={s.voice.legato} onChange={v=>pVoice({legato:v})} sm/>
                <LedBtn label="RETRIG" on={s.voice.retrig} onChange={v=>pVoice({retrig:v})} sm/>
              </div>
            </div>
          </div>
        </div>

        {/* KEYBOARD */}
        <div style={{borderTop:`1px solid ${C.border}`,background:"#040810",padding:"4px 6px",display:"flex",justifyContent:"center",overflowX:"auto"}}>
          <Piano/>
        </div>
      </div>
    </Ctx.Provider>
  );
}
// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";

// // ─── Data ────────────────────────────────────────────────────────────────────

// const ROW_1 = [
//   "/books/deathnote.jpg",
//   "/books/deathonthenile.jpg",
//   "/books/goodgirlbadblood.jpg",
//   "/books/greatgatsby.jpg",
//   "/books/harrypotteraskaban.jpg",
//   "/books/percyjackson.jpg",
// ];

// const ROW_2 = [
//   "/books/powerless.jpg",
//   "/books/perskofbeingwallflower.jpg",
//   "/books/shadonandbone.jpg",
//   "/books/silentpatient.jpg",
//   "/books/the-great-adventures-of-sherlock-holmes-1.jpg",
//   "/books/TheAlchemistcover.jpg",
// ];

// const STACK = [
//   { src: "/books/powerless.jpg",                                   glow: "#FF6B35", tag: "I"   },
//   { src: "/books/perskofbeingwallflower.jpg",                      glow: "#7B2FBE", tag: "II"  },
//   { src: "/books/shadonandbone.jpg",                               glow: "#F72585", tag: "III" },
//   { src: "/books/silentpatient.jpg",                               glow: "#4CC9F0", tag: "IV"  },
//   { src: "/books/the-great-adventures-of-sherlock-holmes-1.jpg",   glow: "#FF9F1C", tag: "V"   },
//   { src: "/books/TheAlchemistcover.jpg",                           glow: "#2EC4B6", tag: "VI"  },
// ];

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// const clamp      = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
// const lerp       = (a: number, b: number, t: number)   => a + (b - a) * t;
// const easeInOut3 = (t: number) =>
//   t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// // ─── Card — proper book-cover 2:3 portrait ratio ─────────────────────────────

// function Card({ src }: { src: string }) {
//   return (
//     <div
//       style={{
//         flexShrink: 0,
//         width: 300,
//         height: 450,
//         background: "#101010",
//         border: "1px solid #1c1c1c",
//         borderRadius: 8,
//         overflow: "hidden",
//         userSelect: "none",
//       }}
//     >
//       <img
//         src={src}
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         draggable={false}
//       />
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export default function ScrollCarouselParallax() {
//   const containerRef = useRef<HTMLElement | null>(null);

//   // Only start counting scroll progress once the section is actually on-screen.
//   // Without this gate the component reads its real DOM position (way offscreen
//   // inside the sticky parent) and instantly jumps to progress = 1.
//   const [active,   setActive]   = useState(false);
//   const [progress, setProgress] = useState(0);

//   // ── IntersectionObserver — flip `active` when section enters viewport ─────
//   useEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => setActive(entry.isIntersecting),
//       { threshold: 0.05 } // fire as soon as 5 % is visible
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, []);

//   // ── Scroll handler — only runs while active ───────────────────────────────
//   const handleScroll = useCallback(() => {
//     if (!active) return;
//     const el = containerRef.current;
//     if (!el) return;

//     const rect  = el.getBoundingClientRect();
//     const total = el.offsetHeight - window.innerHeight;

//     // rect.top turns negative as we scroll into the section
//     setProgress(clamp(-rect.top / total, 0, 1));
//   }, [active]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // ── Phase split ───────────────────────────────────────────────────────────
//   const ROW_PHASE   = 0.35;
//   const STACK_PHASE = 1 - ROW_PHASE;

//   // ── Phase 1: rows ─────────────────────────────────────────────────────────
//   const rowP       = easeInOut3(clamp(progress / ROW_PHASE, 0, 1));
//   const row1X      = lerp(0, -720, rowP);
//   const row2X      = lerp(0,  720, rowP);
//   const rowOpacity = clamp(1 - (progress - ROW_PHASE) / 0.12, 0.1, 1);

//   // ── Phase 2: stack ────────────────────────────────────────────────────────
//   const stackP    = clamp((progress - ROW_PHASE) / STACK_PHASE, 0, 1);
//   const sliceSize = 1 / STACK.length;

//   // Portrait dims matching 2:3 ratio
//   const MAX_W    = 400;
//   const MAX_H    = 600;
//   const MIN_SIZE = 5;

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
//       `}</style>

//       <section
//         ref={containerRef}
//         style={{ position: "relative", width: "100%", height: "950vh" }}
//       >
//         <div
//           style={{
//             position: "sticky",
//             top: 0,
//             height: "100vh",
//             width: "100%",
//             background: "#080808",
//             overflow: "hidden",
//           }}
//         >
//           {/* Grain */}
//           <svg
//             style={{
//               position: "absolute", inset: 0,
//               width: "100%", height: "100%",
//               opacity: 0.035, pointerEvents: "none", zIndex: 0,
//             }}
//           >
//             <filter id="sc-grain">
//               <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
//             </filter>
//             <rect width="100%" height="100%" filter="url(#sc-grain)" />
//           </svg>

//           {/* Vignette */}
//           <div
//             style={{
//               position: "absolute", inset: 0,
//               background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #080808 100%)",
//               pointerEvents: "none", zIndex: 2,
//             }}
//           />

//           {/* ── Rows ─────────────────────────────────────────────────── */}
//           <div
//             style={{
//               position: "absolute", inset: 0,
//               display: "flex", flexDirection: "column",
//               justifyContent: "center", alignItems: "center",
//               gap: 20, zIndex: 1,
//               opacity: rowOpacity,
//               transition: "opacity 0.05s linear",
//             }}
//           >
//             {[
//               { items: ROW_1, offset: row1X },
//               { items: ROW_2, offset: row2X },
//             ].map((row, ri) => (
//               <div key={ri} style={{ overflow: "hidden", width: "100vw" }}>
//                 <div
//                   style={{
//                     display: "flex", gap: 20,
//                     width: "max-content",
//                     transform: `translateX(calc(-50% + 50vw + ${row.offset}px))`,
//                     willChange: "transform",
//                   }}
//                 >
//                   {[...row.items, ...row.items, ...row.items, ...row.items, ...row.items].map(
//                     (src, i) => <Card key={i} src={src} />
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── Stack ────────────────────────────────────────────────── */}
//           <div
//             style={{
//               position: "absolute", inset: 0,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               zIndex: 10, pointerEvents: "none",
//             }}
//           >
//             {STACK.map((img, i) => {
//               const local = easeInOut3(
//                 clamp((stackP - i * sliceSize) / sliceSize, 0, 1)
//               );
//               if (local === 0) return null;

//               const w  = lerp(MIN_SIZE, MAX_W, local);
//               const h  = lerp(MIN_SIZE, MAX_H, local);
//               const br = lerp(2, 8, local);

//               return (
//                 <div
//                   key={i}
//                   style={{
//                     position: "absolute",
//                     width: w, height: h,
//                     background: "#0b0b0b",
//                     borderRadius: br,
//                     zIndex: 10 + i,
//                     boxShadow:
//                       local > 0.2
//                         ? `0 0 ${local * 120}px ${img.glow}55, 0 0 ${local * 40}px ${img.glow}33`
//                         : "none",
//                     overflow: "hidden",
//                     willChange: "width, height",
//                   }}
//                 >
//                   <img
//                     src={img.src}
//                     alt={img.tag}
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                   <div
//                     style={{
//                       position: "absolute", top: 0, left: 0, right: 0, height: "40%",
//                       background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)",
//                     }}
//                   />
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── HUD ──────────────────────────────────────────────────── */}
//           <div
//             style={{
//               position: "absolute", bottom: 32, left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex", flexDirection: "column", alignItems: "center",
//               gap: 8, zIndex: 30,
//             }}
//           >
//             <div style={{ display: "flex", gap: 4 }}>
//               {STACK.map((img, i) => {
//                 const segLen   = STACK_PHASE / STACK.length;
//                 const segStart = ROW_PHASE + i * segLen;
//                 const segFill  = clamp((progress - segStart) / segLen, 0, 1);
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       width: 28, height: 2,
//                       background: "#1a1a1a", borderRadius: 1, overflow: "hidden",
//                     }}
//                   >
//                     <div
//                       style={{
//                         height: "100%",
//                         width: `${segFill * 100}%`,
//                         background: img.glow,
//                         borderRadius: 1,
//                         transition: "width 0.05s linear",
//                       }}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//             <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#2a2a2a", letterSpacing: "0.25em" }}>
//               {Math.round(progress * 100).toString().padStart(3, "0")}
//             </span>
//           </div>

//           {/* Phase label */}
//           <div style={{ position: "absolute", top: 32, right: 36, zIndex: 30 }}>
//             <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#252525", letterSpacing: "0.3em" }}>
//               {progress < ROW_PHASE ? "PHASE · 01" : "PHASE · 02"}
//             </span>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { type MotionValue, useMotionValueEvent } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const ROW_1 = [
  "/books/deathnote.jpg",
  "/books/deathonthenile.jpg",
  "/books/goodgirlbadblood.jpg",
  "/books/greatgatsby.jpg",
  "/books/harrypotteraskaban.jpg",
  "/books/percyjackson.jpg",
];

const ROW_2 = [
  "/books/powerless.jpg",
  "/books/perskofbeingwallflower.jpg",
  "/books/shadonandbone.jpg",
  "/books/silentpatient.jpg",
  "/books/the-great-adventures-of-sherlock-holmes-1.jpg",
  "/books/TheAlchemistcover.jpg",
];

const STACK = [
  { src: "/books/powerless.jpg",                                 glow: "#FF6B35", tag: "I"   },
  { src: "/books/perskofbeingwallflower.jpg",                    glow: "#7B2FBE", tag: "II"  },
  { src: "/books/shadonandbone.jpg",                             glow: "#F72585", tag: "III" },
  { src: "/books/silentpatient.jpg",                             glow: "#4CC9F0", tag: "IV"  },
  { src: "/books/the-great-adventures-of-sherlock-holmes-1.jpg", glow: "#FF9F1C", tag: "V"   },
  { src: "/books/TheAlchemistcover.jpg",                         glow: "#2EC4B6", tag: "VI"  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const clamp      = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp       = (a: number, b: number, t: number)   => a + (b - a) * t;
const easeInOut3 = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ src }: { src: string }) {
  return (
    <div style={{
      flexShrink: 0, width: 300, height: 450,
      background: "#101010", border: "1px solid #1c1c1c",
      borderRadius: 8, overflow: "hidden", userSelect: "none",
    }}>
      <img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} draggable={false} />
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────
// progress is a MotionValue<number> (0→1) provided by the parent page.
// The component renders purely based on this value — no internal scroll tracking.
// This is necessary because position:sticky breaks inside any transformed ancestor.

interface Props {
  scrollProgress: MotionValue<number>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ScrollCarouselParallax({ scrollProgress }: Props) {
  const [progress, setProgress] = useState(0);

  // Sync MotionValue → React state for render
  useMotionValueEvent(scrollProgress, "change", (v) => setProgress(v));

  // ── Phase split ──────────────────────────────────────────────────────────
  const ROW_PHASE   = 0.35;
  const STACK_PHASE = 1 - ROW_PHASE;

  // ── Phase 1: rows ────────────────────────────────────────────────────────
  const rowP       = easeInOut3(clamp(progress / ROW_PHASE, 0, 1));
  const row1X      = lerp(0, -720, rowP);
  const row2X      = lerp(0,  720, rowP);
  const rowOpacity = clamp(1 - (progress - ROW_PHASE) / 0.12, 0.1, 1);

  // ── Phase 2: stack ───────────────────────────────────────────────────────
  const stackP    = clamp((progress - ROW_PHASE) / STACK_PHASE, 0, 1);
  const sliceSize = 1 / STACK.length;

  const MAX_W = 400, MAX_H = 600, MIN_SIZE = 5;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');`}</style>

      {/*
        Renders as a plain full-screen div — no <section>, no position:sticky.
        The parent page's sticky block is what keeps this on screen.
        The parent also controls the 0→1 progress range and scroll space.
      */}
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>

        {/* Grain */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.035,pointerEvents:"none",zIndex:0 }}>
          <filter id="sc-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sc-grain)" />
        </svg>

        {/* Vignette */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
          background:"radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #080808 100%)",
        }} />

        {/* ── Rows ───────────────────────────────────────────────────── */}
        <div style={{
          position:"absolute",inset:0,display:"flex",flexDirection:"column",
          justifyContent:"center",alignItems:"center",gap:20,zIndex:1,
          opacity: rowOpacity, transition:"opacity 0.05s linear",
        }}>
          {[{ items: ROW_1, offset: row1X }, { items: ROW_2, offset: row2X }].map((row, ri) => (
            <div key={ri} style={{ overflow:"hidden", width:"100vw" }}>
              <div style={{
                display:"flex", gap:20, width:"max-content", willChange:"transform",
                transform:`translateX(calc(-50% + 50vw + ${row.offset}px))`,
              }}>
                {[...row.items,...row.items,...row.items,...row.items,...row.items].map((src, i) => (
                  <Card key={i} src={src} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Stack ──────────────────────────────────────────────────── */}
        <div style={{
          position:"absolute",inset:0,display:"flex",
          alignItems:"center",justifyContent:"center",
          zIndex:10,pointerEvents:"none",
        }}>
          {STACK.map((img, i) => {
            const local = easeInOut3(clamp((stackP - i * sliceSize) / sliceSize, 0, 1));
            if (local === 0) return null;
            const w  = lerp(MIN_SIZE, MAX_W, local);
            const h  = lerp(MIN_SIZE, MAX_H, local);
            const br = lerp(2, 8, local);
            return (
              <div key={i} style={{
                position:"absolute", width:w, height:h,
                background:"#0b0b0b", borderRadius:br, zIndex:10+i,
                overflow:"hidden", willChange:"width, height",
                boxShadow: local > 0.2
                  ? `0 0 ${local*120}px ${img.glow}55, 0 0 ${local*40}px ${img.glow}33`
                  : "none",
              }}>
                <img src={img.src} alt={img.tag} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                <div style={{
                  position:"absolute",top:0,left:0,right:0,height:"40%",
                  background:"linear-gradient(180deg,rgba(255,255,255,0.07) 0%,transparent 100%)",
                }} />
              </div>
            );
          })}
        </div>

        {/* ── HUD ────────────────────────────────────────────────────── */}
        <div style={{
          position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:8,zIndex:30,
        }}>
          <div style={{ display:"flex",gap:4 }}>
            {STACK.map((img, i) => {
              const segLen   = STACK_PHASE / STACK.length;
              const segStart = ROW_PHASE + i * segLen;
              const segFill  = clamp((progress - segStart) / segLen, 0, 1);
              return (
                <div key={i} style={{ width:28,height:2,background:"#1a1a1a",borderRadius:1,overflow:"hidden" }}>
                  <div style={{ height:"100%",width:`${segFill*100}%`,background:img.glow,transition:"width 0.05s linear" }} />
                </div>
              );
            })}
          </div>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#2a2a2a",letterSpacing:"0.25em" }}>
            {Math.round(progress * 100).toString().padStart(3,"0")}
          </span>
        </div>

        {/* Phase label */}
        <div style={{ position:"absolute",top:32,right:36,zIndex:30 }}>
          <span style={{ fontFamily:"'Space Mono',monospace",fontSize:9,color:"#252525",letterSpacing:"0.3em" }}>
            {progress < ROW_PHASE ? "PHASE · 01" : "PHASE · 02"}
          </span>
        </div>

      </div>
    </>
  );
}
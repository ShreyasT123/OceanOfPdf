"use client";

import { motion } from "framer-motion";

type MethodCard = {
  title: string;
  body: string;
  index: string;
};

const CARDS: MethodCard[] = [
  {
    title: "INITIAL\nSTRATEGY",
    body:
      "We start with a conversation to understand your goals, challenges, and creative direction. This is where we explore the heart of the project and ensure we're aligned from the start. Whether it's a one-time campaign or a long-term vision, we begin by listening.",
    index: "01",
  },
  {
    title: "CREATIVE\nPLANNING",
    body:
      "This phase is where strategy meets imagination. We create concepts, moodboards, storyboards, and timelines. Every creative element is planned out — from shot lists to production logistics — ensuring we're fully prepared for what comes next.",
    index: "02",
  },
  {
    title: "ACTION\nTIME",
    body:
      "Lights on. Cameras ready. We execute the plan with precision and energy — capturing moments, motion, and emotion exactly as envisioned. Our team ensures everything runs smoothly, whether it's on set, on location, or behind the scenes.",
    index: "03",
  },
];

export default function StudioMethodCards() {
  return (
    <section className="relative w-full bg-[#0b0b0b] text-zinc-200 pb-28 md:pb-36">
      {/* Continuation grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.index}
              initial={{ opacity: 0, y: 60, rotateY: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 1.4,
                delay: i * 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg border border-[#2a2a2a] bg-[#141414] backdrop-blur-sm p-7 md:p-8 min-h-[420px] md:min-h-[520px] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.55)]"
              style={{ transformPerspective: 1200 }}
            >
              <h3 className="text-[12vw] md:text-[3.8vw] leading-[0.9] font-black tracking-tight text-zinc-200">
                {card.title.split("\n").map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <p className="mt-6 text-zinc-400 leading-relaxed text-base md:text-lg">
                {card.body}
              </p>

              <div className="mt-10 text-right text-xs font-semibold tracking-[0.25em] text-zinc-500">
                /{card.index}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  text: string;
  className: string;
  as?: React.ElementType;
}

export function CharByCharReveal({ text, className, as: Component = "span" }: AnimationProps) {
  return (
    <Component className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, filter: "saturate(0%) brightness(0.5)" }}
          whileInView={{ opacity: 1, filter: "saturate(100%) brightness(1)" }}
          viewport={{ once: false, amount: 0.95 }}
          transition={{ duration: 0.1, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block will-change-transform"
        >
          {char === " " ? "\u00A0" : char === "\n" ? <br /> : char}
        </motion.span>
      ))}
    </Component>
  );
}

export function WordByWordFade({ text, className, as: Component = "div" }: AnimationProps) {
  const words = text.trim().split(/\s+/);

  return (
    <Component className={className}>
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
    </Component>
  );
}

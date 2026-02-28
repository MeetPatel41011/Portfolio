"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
    },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-3 overflow-hidden"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <div key={index} className="overflow-hidden">
          <motion.span variants={child} className={`inline-block ${className}`}>
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}
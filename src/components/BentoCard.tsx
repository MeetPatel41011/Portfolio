"use client";

import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 0 : 60,
        scale: shouldReduceMotion ? 1 : 0.95
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ 
        y: { type: "spring", bounce: 0, duration: 0.8, delay },
        scale: { type: "spring", bounce: 0, duration: 0.8, delay },
        opacity: { duration: 0.4, delay, ease: "easeOut" }
      }}
      style={{ willChange: "transform, opacity" }}
      className={cn(
        "relative overflow-hidden p-8 liquid-glass group",
        "transition-shadow duration-500",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

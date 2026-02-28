"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BentoCard({ children, className, delay = 0 }: BentoCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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

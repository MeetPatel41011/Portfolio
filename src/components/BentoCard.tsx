"use client";

import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rect = card.getBoundingClientRect();

    const handleResize = () => {
      rect = card.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

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
      viewport={{ once: true, margin: "-15%" }}
      transition={{ 
        y: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
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

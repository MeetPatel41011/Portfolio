"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface Metric {
  label: string;
  desc: string;
}

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  metrics: Metric[];
}

export function TimelineItem({ role, company, period, metrics }: TimelineItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative pl-8 pb-12 last:pb-0 group"
    >
      {/* Parallax Background Glow */}
      {!shouldReduceMotion && (
        <motion.div 
          style={{ y: bgY }}
          className="absolute -left-10 top-0 w-32 h-32 bg-blue-500/5 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        />
      )}

      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 group-last:h-2 group-hover:bg-blue-400/50 dark:group-hover:bg-emerald-400/50 transition-colors" />
      
      {/* Timeline Dot */}
      <div className="absolute left-[-4.5px] top-2 w-[10px] h-[10px] rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-black group-hover:bg-blue-600 dark:group-hover:bg-emerald-400 group-hover:border-blue-400/20 dark:group-hover:border-emerald-400/20 transition-all shadow-[0_0_0_4px_rgba(241,245,249,0.5)] dark:shadow-[0_0_0_4px_rgba(30,41,59,0.5)] group-hover:shadow-[0_0_12px_rgba(37,99,235,0.4)] dark:group-hover:shadow-[0_0_12px_rgba(52,211,153,0.4)]" />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2 relative z-10">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
          {role} <span className="text-slate-500 dark:text-slate-500 font-medium">@ {company}</span>
        </h3>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-500 tracking-tight uppercase shrink-0">
          {period}
        </span>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 relative z-10">
        {metrics.map((metric, i) => (
          <div key={i} className="flex flex-col gap-1.5 max-w-[280px]">
            <span className="inline-block px-2 py-1 text-[10px] font-mono font-bold text-blue-700 bg-blue-100 border-blue-200 dark:text-emerald-400 dark:bg-emerald-900/20 border dark:border-emerald-500/20 rounded self-start uppercase tracking-wider transition-colors">
              [ {metric.label} ]
            </span>
            <p className="text-slate-600 dark:text-slate-500 text-xs leading-relaxed italic transition-colors">
              {metric.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
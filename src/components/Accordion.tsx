"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MagneticButton } from './MagneticButton';

interface AccordionProps {
  title: string;
  summary: string;
  tags: string[];
  details: React.ReactNode;
  githubUrl?: string;
  type?: 'project' | 'publication';
}

export function Accordion({ title, summary, tags, details, githubUrl, type = 'project' }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <article className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 rounded-xl overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full text-left p-6 md:p-8 focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-emerald-400 outline-none group"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
             <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
              {title}
            </h3>
            {githubUrl && (
              <MagneticButton 
                as="a"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="text-slate-500 hover:text-blue-600 dark:hover:text-emerald-400 p-1 transition-colors z-10"
                aria-label="View source on GitHub"
              >
                <Github size={18} />
              </MagneticButton>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-blue-700 bg-blue-100 border-blue-200 dark:text-emerald-300 dark:bg-emerald-950/30 border dark:border-emerald-900/50 rounded transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-6 transition-colors">
          {summary}
        </p>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
          <ChevronDown 
            size={16} 
            className={cn("transition-transform duration-300", isOpen && "rotate-180")} 
          />
          {isOpen ? "Collapse Details" : type === 'project' ? "View Architecture" : "Read Abstract"}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 border-t border-slate-200 dark:border-slate-800/50 bg-slate-100/50 dark:bg-slate-900/40 transition-colors">
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {details}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
"use client";

import React from 'react';
import { Github } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
}

export function ProjectCard({ title, description, tags, githubUrl }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <motion.article 
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="p-6 md:p-8 flex flex-col h-full liquid-glass group"
    >
      <div className="flex justify-between items-start mb-4 gap-4">
        <h3 className="text-xl font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        {githubUrl && (
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} source code on GitHub`}
            className="text-slate-400 hover:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md p-1 outline-none transition-colors shrink-0"
          >
            <Github size={22} />
          </a>
        )}
      </div>
      <p className="text-slate-400 mb-8 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, i) => (
          <span 
            key={i} 
            className="px-3 py-1.5 text-xs font-mono text-blue-300 bg-blue-950/40 border border-blue-900/50 rounded-md shadow-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

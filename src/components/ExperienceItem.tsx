import React from 'react';

interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export function ExperienceItem({ role, company, period, description }: ExperienceItemProps) {
  return (
    <article className="mb-12 relative group liquid-glass p-8 transition-all hover:scale-[1.01]">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-2 sm:gap-4">
        <h3 className="text-xl font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
          {role} <span className="text-slate-400 font-normal">at {company}</span>
        </h3>
        <span className="text-sm font-mono text-slate-400 shrink-0 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          {period}
        </span>
      </div>
      <ul className="list-none space-y-3">
        {description.map((item, i) => (
          <li 
            key={i} 
            className="text-slate-400 text-base leading-relaxed relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-blue-400/50 before:rounded-full group-hover:before:bg-blue-400 before:transition-colors"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

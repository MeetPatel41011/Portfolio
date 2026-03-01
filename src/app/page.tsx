"use client";

import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, ChevronRight, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NeuronBackground } from '@/components/NeuronBackground';

export default function Home() {
  const contactRef = useRef(null);
  
  // Create a scroll-linked animation tied to the Contact section
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });

  // Highlight expands as you scroll into the contact section
  // It starts at 10% into the scroll margin and finishes by 45%
  const highlightWidth = useTransform(scrollYProgress, [0.1, 0.45], ["0%", "100%"]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.liquid-glass');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-slate-950 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 min-h-screen relative">
      
      {/* Interactive Neuron Background */}
      <NeuronBackground />
      
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-40 pointer-events-none">
        <div className="lg:flex lg:justify-between lg:gap-10 pointer-events-auto">
          
          {/* LEFT COLUMN - STICKY */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg relative inline-block">
                <motion.span 
                  style={{ width: highlightWidth }}
                  className="absolute inset-y-0 left-0 bg-[#298f88] -z-10"
                />
                <span>
                  Meet Patel
                </span>
              </h1>
              <h2 className="mt-4 text-xl font-medium tracking-tight text-slate-200 sm:text-2xl drop-shadow-md">
                Machine Learning Engineer
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-slate-300 drop-shadow-sm font-medium">
                I specialize in high-performance inference, hardware-aware optimization, and deploying complex AI architectures natively on edge devices.
              </p>
              
              {/* Navigation */}
              <nav className="nav hidden lg:block mt-16">
                <ul className="mt-8 w-max space-y-4">
                  <li>
                    <a className="group flex items-center" href="#about">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors">About</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center" href="#projects">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors">Selected Projects</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center" href="#experience">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors">Experience</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center" href="#contact">
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors">Contact Me</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Socials */}
            <ul className="ml-1 mt-12 flex items-center gap-6">
              {/* <li className="text-xs">
                <a className="block text-slate-400 hover:text-white transition-all hover:scale-110 drop-shadow-md" href="https://github.com/meetpatel" target="_blank" rel="noreferrer">
                  <span className="sr-only">GitHub</span><Github size={26} />
                </a>
              </li> */}
              <li className="text-xs">
                <a className="block text-slate-400 hover:text-white transition-all hover:scale-110 drop-shadow-md" href="https://www.linkedin.com/in/meetpatel5" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">LinkedIn</span><Linkedin size={26} />
                </a>
              </li>
              <li className="text-xs">
                <a className="block text-slate-400 hover:text-white transition-all hover:scale-110 drop-shadow-md" href="mailto:m.patel6@student.fdu.edu" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Email</span><Mail size={26} />
                </a>
              </li>
            </ul>
          </header>

          {/* RIGHT COLUMN - SCROLLABLE */}
          <main className="pt-24 lg:w-[55%] lg:py-24 space-y-32">
            
            {/* ABOUT */}
            <section id="about" className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-4">
                  <span className="h-px w-8 bg-teal-400/50"></span> About
                </h2>
              </div>
              
              <div className="liquid-glass p-8 md:p-10 space-y-6 group">
                 <div className="flex items-center gap-3 text-teal-300 font-mono text-sm font-bold tracking-widest mb-4 glass-text">
                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   TL;DR
                 </div>
                 <p className="text-xl md:text-2xl text-white font-medium leading-snug tracking-tight glass-text">
                   I build high-performance ML systems that bridge the gap between theoretical models and <span className="text-teal-300">latency-constrained edge environments</span>.
                 </p>
                 <p className="text-slate-300 leading-relaxed font-medium glass-text">
                   My expertise lies in hardware-aware machine learning and on-device computation. I specialize in deploying models directly to edge devices utilizing Apple Silicon (Core ML / ANE), implementing rigorous INT8 quantization, optimizing complex Vision-Language Models (VLMs), and building scalable multi-agent frameworks. My research actively focuses on maximizing inference throughput while strictly maintaining data privacy through localized compute.
                 </p>
              </div>
            </section>

            {/* PROJECTS */}
            <section id="projects" className="scroll-mt-24">
               <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-4">
                  <span className="h-px w-8 bg-teal-400/50"></span> Selected Projects
                </h2>
              </div>
              
              <div className="space-y-6">
                
                {/* Proj 1 */}
                <div /* href="#" target="_blank" rel="noreferrer" */ className="block liquid-glass p-8 group relative">
                  <div className="z-10">
                    <h3 className="font-bold text-xl text-white flex items-center gap-2 glass-text">
                      Real-Time Multimodal Q&A System
                      {/* <ArrowUpRight className="inline-block h-5 w-5 text-slate-500 group-hover:text-teal-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" /> */}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Built a live multimodal question-answering pipeline using Qwen2-0.5B-Instruct and Apple&apos;s FastVLM, achieving a Time To First Token (TTFT) of under 100ms. Engineered an INT8 quantization and ONNX-based deployment pipeline, leveraging NPU acceleration via Core ML to achieve a total 4x reduction in inference latency.
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">Core ML</span></li>
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">FastVLM</span></li>
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">Quantization</span></li>
                       <li><span className="flex items-center rounded-full bg-teal-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">&lt;100ms TTFT</span></li>
                    </ul>
                  </div>
                </div>

                {/* Proj 2 */}
                <div /* href="#" target="_blank" rel="noreferrer" */ className="block liquid-glass p-8 group relative">
                  <div className="z-10">
                    <h3 className="font-bold text-xl text-white flex items-center gap-2 glass-text">
                      Privacy-Preserving Edge ML (Yoga)
                      {/* <ArrowUpRight className="inline-block h-5 w-5 text-slate-500 group-hover:text-teal-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" /> */}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Architected a privacy-centric AI pipeline using 100% on-device computation to ensure data isolation. Engineered a Knowledge Graph of 190+ poses and optimized a Graph Neural Network (GNN) via knowledge distillation into a lightweight Core ML model specifically optimized for the Apple Neural Engine (ANE).
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">GNN</span></li>
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">Knowledge Distillation Pipeline</span></li>
                       <li><span className="flex items-center rounded-full bg-teal-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">100% On-Device</span></li>
                    </ul>
                  </div>
                </div>

                 {/* Proj 3 */}
                <div /* href="#" target="_blank" rel="noreferrer" */ className="block liquid-glass p-8 group relative">
                  <div className="z-10">
                    <h3 className="font-bold text-xl text-white flex items-center gap-2 glass-text">
                      Neuromorphic vs. Transformer Benchmarking
                      {/* <ArrowUpRight className="inline-block h-5 w-5 text-slate-500 group-hover:text-teal-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" /> */}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Conducted accurate performance benchmarking comparing a pre-trained DistilBERT and a custom-built Spiking Neural Network (SNN) on a 20,000-sample NLP classification task. Fine-tuned the SNN to balance the accuracy/compute trade-off, achieving 81% of BERT&apos;s accuracy while being 48x more computationally efficient.
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">SNNTorch</span></li>
                       <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">DistilBERT</span></li>
                       <li><span className="flex items-center rounded-full bg-teal-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">48x Efficiency</span></li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* EXPERIENCE */}
            <section id="experience" className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-4">
                  <span className="h-px w-8 bg-teal-400/50"></span> Experience
                </h2>
              </div>
              
              <div className="space-y-6">
                
                {/* Exp 1 */}
                <div className="liquid-glass p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="2025 to Present">
                    Jan 2025 — Present
                    <div className="mt-2 text-[10px] text-slate-500 font-medium">1 year 1 month 28 days</div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>Research Assistant</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">FDU</div>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Led research to resolve complex spatial dependencies in computer vision models using Graph Neural Networks (GNNs) and hybrid Vision Transformers (ViT), resulting in a paper acceptance at the IEEE ISEC&apos;26 conference. In another research benchmark, evaluated SOTA models across 10,000+ patient records, improving inference precision from 81.00% to 97.75%.
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Computer Vision</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">ViT</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">GNN</span></li>
                    </ul>
                  </div>
                </div>

                {/* Exp 2 */}
                <div className="liquid-glass p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="2025 to Present">
                    Sep 2025 — Present
                    <div className="mt-2 text-[10px] text-slate-500 font-medium">5 months 28 days</div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>Teaching Assistant</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">FDU</div>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Evaluated coursework for 150+ students, focusing on the reinforcement of Machine Learning concepts and practical application. Responsible for the detailed assessment of 85+ academic projects, fostering an environment of continuous architectural improvement.
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">ML Theory</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Mentorship</span></li>
                    </ul>
                  </div>
                </div>

                {/* Exp 3 */}
                <div className="liquid-glass p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="2023">
                    Jan 2023 — Apr 2023
                    <div className="mt-2 text-[10px] text-slate-500 font-medium">4 months</div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>ML Intern</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">Tri State Technologies</div>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Developed and deployed ML inference APIs using FastAPI, establishing seamless integration with frontend interfaces. Streamlined complex data preprocessing pipelines to normalize datasets, significantly reducing model noise and improving training quality.
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">FastAPI</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Data Pipelines</span></li>
                    </ul>
                  </div>
                </div>

                 {/* Exp 4 */}
                <div className="liquid-glass p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="2024">
                    Sep 2024 — Dec 2024
                    <div className="mt-2 text-[10px] text-slate-500 font-medium">4 months</div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>Frontend Engineer</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">Vikartr Technologies</div>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      Architected high-performance, dynamic user interfaces leveraging React.js and Tailwind CSS to significantly accelerate page rendering. Overhauled legacy codebases by implementing advanced React Hooks, ensuring robust state management and efficient API integrations.
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">React</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Performance</span></li>
                    </ul>
                  </div>
                </div>

              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" ref={contactRef} className="scroll-mt-24 pb-32">
               <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-4">
                  <span className="h-px w-8 bg-teal-400/50"></span> Contact
                </h2>
              </div>
              
              <div className="liquid-glass p-12 md:p-16 text-center relative overflow-hidden group">
                 <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                   Let&apos;s build the <span className="relative inline-block px-2 overflow-hidden">
                     <motion.span 
                       style={{ width: highlightWidth }}
                       className="absolute inset-y-0 left-0 bg-[#44ebd4] -z-10"
                     />
                     <span>
                       future.
                     </span>
                   </span>
                 </h3>
                 <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto mb-12 px-4">
                   Currently open to opportunities bridging complex mathematical theory and high-performance system engineering.
                 </p>
                 
                 <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 sm:gap-10">
                   <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
                     <a 
                       href="mailto:m.patel6@student.fdu.edu" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-3 bg-[#44ebd4] text-slate-950 px-10 py-4 rounded-full font-bold text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:brightness-110 hover:shadow-[0_10px_40px_rgba(68,235,212,0.25)] w-full sm:w-auto"
                     >
                       <Mail size={18} strokeWidth={1.5} /> Get in Touch
                     </a>
                     <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase opacity-80 whitespace-nowrap">
                       Will reply in &lt;6 hours
                     </span>
                   </div>

                   <a 
                     href="/Meet%20Patel_Resume.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-4 rounded-full font-bold text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:bg-white/10 hover:border-white/20 w-full sm:w-auto"
                   >
                     <Download size={18} strokeWidth={1.5} /> Resume
                   </a>
                 </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
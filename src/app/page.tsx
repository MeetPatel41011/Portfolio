"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail, ChevronRight, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NeuronBackground } from '@/components/NeuronBackground';
import { BentoCard } from '@/components/BentoCard';
import { cn } from '@/lib/utils';

function LiveDuration({ start, end }: { start: string; end: string }) {
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const calculateDuration = () => {
      const startDate = new Date(start);
      let endDate;
      
      if (end.toLowerCase() === 'present') {
        endDate = new Date();
      } else {
        const parsedEnd = new Date(end);
        // Set to last day of the month, 23:59:59
        endDate = new Date(parsedEnd.getFullYear(), parsedEnd.getMonth() + 1, 0, 23, 59, 59);
      }

      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();
      let days = endDate.getDate() - startDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const parts = [];
      if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
      if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
      if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);

      const newDuration = parts.length > 0 ? parts.join(' ') : '0 days';
      setDuration(prev => prev !== newDuration ? newDuration : prev);
    };

    calculateDuration();
    // Update every second so changes at 11:59:59 PM trigger instantly
    const interval = setInterval(calculateDuration, 1000);
    return () => clearInterval(interval);
  }, [start, end]);

  return <span>{duration}</span>;
}

export default function Home() {
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -45% 0px" } // Adjust margins to switch active state when a section covers ~45% of the screen from the bottom
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);
  
  // Create a scroll-linked animation tied to the Contact section
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"]
  });

  // Highlight expands as you scroll into the contact section
  // It starts at 10% into the scroll margin and finishes by 45%
  const highlightProgress = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  
  return (
    <div className="bg-slate-950 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900 min-h-screen relative">
      
      {/* Interactive Neuron Background - forced remount to apply new color logic */}
      <NeuronBackground key="neuron-bg-golden-update" />

      {/* Optimized Noise Overlay */}
      <div className="noise-overlay" />
      
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-40 pointer-events-none">
        <div className="lg:flex lg:justify-between lg:gap-10 pointer-events-auto">
          
          {/* LEFT COLUMN - STICKY */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[45%] lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg relative inline-block">
                <motion.span 
                  style={{ scaleX: highlightProgress, transformOrigin: "left" }}
                  className="absolute inset-y-0 left-0 bg-[#298f88] -z-10 w-full"
                />
                <span>
                  Meet Patel
                </span>
              </h1>
              <h2 className="mt-4 text-xl font-medium tracking-tight text-slate-200 sm:text-2xl drop-shadow-md">
                Machine Learning Engineer
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-slate-300 drop-shadow-sm font-medium">
                I specialize in hardware-accelerated inference, distributed ML architectures, and deploying complex multi-modal AI systems.
              </p>
              
              {/* Navigation */}
              <nav className="nav hidden lg:block mt-16">
                <ul className="mt-8 w-max space-y-4">
                  <li>
                    <a className="group flex items-center py-2" href="#about">
                      <span className={cn("nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm", activeSection === 'about' && "w-16 bg-teal-300")}></span>
                      <span className={cn("nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors", activeSection === 'about' && "text-white")}>About</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-2" href="#projects">
                      <span className={cn("nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm", activeSection === 'projects' && "w-16 bg-teal-300")}></span>
                      <span className={cn("nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors", activeSection === 'projects' && "text-white")}>Selected Projects</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-2" href="#experience">
                      <span className={cn("nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm", activeSection === 'experience' && "w-16 bg-teal-300")}></span>
                      <span className={cn("nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors", activeSection === 'experience' && "text-white")}>Experience</span>
                    </a>
                  </li>
                  <li>
                    <a className="group flex items-center py-2" href="#contact">
                      <span className={cn("nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-teal-300 shadow-sm", activeSection === 'contact' && "w-16 bg-teal-300")}></span>
                      <span className={cn("nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-white drop-shadow-sm transition-colors", activeSection === 'contact' && "text-white")}>Contact Me</span>
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
              
              <BentoCard className="p-8 md:p-10 space-y-6 group">
                 <div className="flex items-center gap-3 text-teal-300 font-mono text-sm font-bold tracking-widest mb-4 glass-text">
                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                   TL;DR
                 </div>
                 <p className="text-xl md:text-2xl text-white font-medium leading-snug tracking-tight glass-text">
                   I build scalable ML architectures that bridge the gap between theoretical models and <span className="text-teal-300">hardware-accelerated execution.</span>
                 </p>
                 <p className="text-slate-300 leading-relaxed font-medium glass-text">
                   My expertise lies in model optimization, MLOps, and systems engineering. I specialize in post-training quantization, execution graph compilation, and deploying complex Vision-Language Models (VLMs) using TensorRT and ONNX Runtime. My research and industry experience actively focus on maximizing inference throughput, resolving class imbalances in computer vision pipelines, and building scalable, serverless GPU infrastructure.
                 </p>
              </BentoCard>
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
                <a href="https://neuro-yoga-presentation-site.vercel.app/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer group">
                  <BentoCard className="p-8 relative transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="z-10">
                      <h3 className="font-bold text-xl text-white flex items-center gap-2 glass-text">
                        Privacy Preserving Yoga Recommendation Model
                        <ChevronRight className="inline-block h-5 w-5 text-slate-500 group-hover:text-teal-300 transition-all group-hover:translate-x-1" />
                      </h3>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                        <p>Built a 4-stage LLM data extraction pipeline to collect data of 1,345 yoga poses from 50+ raw PDFs, generating 282,207 training samples via a rule-based system, including medical constraint layers to ensure training data was grounded in verified literature.</p>
                        <p>Architected a 100% on-device personalized yoga prediction application, purely using watch-sensor data via two-tower approach, executing inference locally. Pre-computed static yoga embeddings and generated live user embeddings for &lt;20ms cosine similarity search.</p>
                        <p>Deployed the system asymmetrically to the ANE, orchestrating heavy pre-computation for the yoga tower (384-dim to 32-dim) and lightweight live inference for watch sensor data (17-dim to 32-dim), achieving a Recall@10 of 0.959 and NDCG@10 of 0.809 on cold-start validation.</p>
                      </div>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                         <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">PyTorch</span></li>
                         <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">CoreML</span></li>
                         <li><span className="flex items-center rounded-full bg-teal-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Two-Tower Architecture</span></li>
                      </ul>
                    </div>
                  </BentoCard>
                </a>

                {/* Proj 2 */}
                <a href="https://pmp0792--fastvlm-unified-web.modal.run" target="_blank" rel="noopener noreferrer" className="block cursor-pointer group">
                  <BentoCard className="p-8 relative transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="z-10">
                      <h3 className="font-bold text-xl text-white flex items-center gap-2 glass-text">
                        Real-Time Multimodal Q&amp;A System
                        <ChevronRight className="inline-block h-5 w-5 text-slate-500 group-hover:text-teal-300 transition-all group-hover:translate-x-1" />
                      </h3>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                        <p>Architected a low-latency live video question answering system from handwritten questions using FastViTHD and Qwen2, compiled into an ONNX execution graph. Executed INT8 Post-Training Quantization and achieved a 4x latency reduction (sub 500ms TTFT) with a &lt;1.2% degradation in zero-shot accuracy.</p>
                        <p>Engineered a decoupled architecture to independently scale the FastViTHD encoder and language model. Implemented aggressive Lanczos downscaling algorithm to restrict inputs to a single processing patch, reducing vision-tower compute by 80%.</p>
                      </div>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                         <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">PyTorch</span></li>
                         <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">VLM</span></li>
                         <li><span className="flex items-center rounded-full bg-teal-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">ONNX Runtime</span></li>
                      </ul>
                    </div>
                  </BentoCard>
                </a>

                 {/* Proj 3 */}
                <a href="https://spiking-neural-network-presentation.vercel.app/" target="_blank" rel="noopener noreferrer" className="block cursor-pointer group">
                  <BentoCard className="p-8 relative transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="z-10">
                      <h3 className="font-bold text-xl text-white flex items-center gap-2 glass-text">
                        Neuromorphic vs. Transformer NLP Benchmarking
                        <ChevronRight className="inline-block h-5 w-5 text-slate-500 group-hover:text-teal-300 transition-all group-hover:translate-x-1" />
                      </h3>
                      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                        <p>Implemented an SNN compression pipeline based on NVIDIA&apos;s 2:4 structured sparsity, mapping dense linear layers to PyTorch Semi-Structured tensors which can engage A100 Tensor Cores and reduce the memory footprint.</p>
                        <p>Architected a low-power NLP microservice, replacing O(N&sup2;) Transformer attention with binary additions, achieving a ~150x reduction in compute energy with 89% accuracy retention.</p>
                      </div>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                         <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">PyTorch</span></li>
                         <li><span className="flex items-center rounded-full bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">snnTorch</span></li>
                         <li><span className="flex items-center rounded-full bg-teal-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Hardware Optimization</span></li>
                      </ul>
                    </div>
                  </BentoCard>
                </a>

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
                <BentoCard className="p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8 border border-teal-400/20 bg-teal-900/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-50"></div>
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-teal-400 shrink-0 md:w-1/4" aria-label="May 2026 to Present">
                    May 2026 — Present
                    <div className="mt-3 text-[10px] text-teal-500 font-bold uppercase tracking-widest bg-teal-400/10 inline-block px-2 py-1 rounded-md border border-teal-400/20"><LiveDuration start="May 2026" end="Present" /></div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>Deep Learning Intern</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">New Jersey Department of Health (DOH)</div>
                    </h3>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      <p>Independently architected an end-to-end Computer Vision QC pipeline for blood specimen images, saving 2.5 hours of manual review daily across ~150 dried blood spot specimens.</p>
                      <p>Benchmarked and combined OpenCV and YOLOv8m for specimen segmentation, balancing minimal memory requirements with high accuracy to overcome unstructured scanned artifacts, improving extraction from 92% to 99.5%.</p>
                      <p>Implemented a hybrid architecture with ResNet50_2 and PatchCore for anomaly detection. Achieved 98% accuracy and 0.90 F1, utilizing PatchCore anomaly maps for biological explainability. Enforced fully local inference to meet HIPAA data sensitivity requirements.</p>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Computer Vision</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">YOLOv8m</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">ResNet</span></li>
                    </ul>
                  </div>
                </BentoCard>

                {/* Exp 2 */}
                <BentoCard className="p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="Jan 2025 to Present">
                    Jan 2025 — Present
                    <div className="mt-2 text-[10px] text-slate-500 font-medium"><LiveDuration start="Jan 2025" end="Present" /></div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>Research Assistant</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">Fairleigh Dickinson University, New Jersey</div>
                    </h3>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      <p>Achieved the highest model performance in a competitive multi-author benchmark using fine-tuned VGG16 on 10,000+ dermoscopic images (7-class, HAM10000). Reached 97.75% validation accuracy and F1 = 0.9547, outperforming baseline EfficientNetV2 (91.32%) and ViT-B/16 (94.2%).</p>
                      <p>Resolved severe class imbalance via inverse-frequency weighted CrossEntropyLoss and stabilized test fluctuations using ReduceLROnPlateau scheduling and gradient clipping. Reduced train-val gap to 0.20%.</p>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">VGG16</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">PyTorch</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Model Benchmarking</span></li>
                    </ul>
                  </div>
                </BentoCard>

                {/* Exp 3 */}
                <BentoCard className="p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="Sep 2025 to May 2026">
                    Sep 2025 — May 2026
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
                </BentoCard>

                {/* Exp 4 */}
                <BentoCard className="p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8">
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="Jan 2023 to April 2023">
                    Jan 2023 — Apr 2023
                    <div className="mt-2 text-[10px] text-slate-500 font-medium"><LiveDuration start="Jan 2023" end="Apr 2023" /></div>
                  </header>
                  <div className="z-10 md:w-3/4">
                    <h3 className="text-xl font-bold text-white group/link leading-snug">
                      <div>Machine Learning Intern</div>
                      <div className="text-slate-400 font-medium text-lg mt-1">Tri State Technologies, Ahmedabad, India</div>
                    </h3>
                    <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 font-medium glass-text">
                      <p>Improved production model accuracy by 17% after optimizing the feature extraction pipeline. Resolved feature conflicts and upstream noise contamination that degraded model performance.</p>
                      <p>Managed an end-to-end ML stack via multi-endpoint FastAPI service deployed on GCP and Modal.com for scalable, serverless GPU execution and Jenkins CI/CD.</p>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">FastAPI</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">GCP & Modal</span></li>
                      <li><span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/20">Jenkins CI/CD</span></li>
                    </ul>
                  </div>
                </BentoCard>

                 {/* Exp 4 */}
                <BentoCard className="p-8 group relative flex flex-col md:flex-row gap-6 md:gap-8" delay={0.5}>
                  <header className="z-10 mt-1 text-xs font-bold uppercase tracking-widest text-slate-400 shrink-0 md:w-1/4" aria-label="2024">
                    Sep 2024 — Dec 2024
                    <div className="mt-2 text-[10px] text-slate-500 font-medium"><LiveDuration start="Sep 2024" end="Dec 2024" /></div>
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
                </BentoCard>

              </div>
            </section>

            {/* CONTACT */}
            <section id="contact" ref={contactRef} className="scroll-mt-24 pb-32">
               <div className="mb-12">
                <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-4">
                  <span className="h-px w-8 bg-teal-400/50"></span> Contact
                </h2>
              </div>
              
              <BentoCard className="p-12 md:p-16 text-center relative overflow-hidden group">
                 <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
                   Let&apos;s build the <span className="relative inline-block px-2 overflow-hidden">
                     <motion.span 
                       style={{ scaleX: highlightProgress, transformOrigin: "left" }}
                       className="absolute inset-y-0 left-0 bg-[#44ebd4] -z-10 w-full"
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
                     href="/Meet%20Patel-Resume.pdf" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-4 rounded-full font-bold text-xs tracking-[0.15em] uppercase transition-all duration-500 hover:bg-white/10 hover:border-white/20 w-full sm:w-auto"
                   >
                     <Download size={18} strokeWidth={1.5} /> Resume
                   </a>
                 </div>
              </BentoCard>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Node {
  layer: number;
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
  vx: number;
  vy: number;
  activation: number;
  cooldown: number;
  outgoingEdges: Edge[];
  activationType?: 'mouse' | 'auto';
}

interface Edge {
  from: Node;
  to: Node;
  weight: number;
}

interface Signal {
  edge: Edge;
  progress: number;
  speed: number;
  type?: 'mouse' | 'auto';
}

export function NeuronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let layers: Node[][] = [];
    let edges: Edge[] = [];
    let signals: Signal[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      // Limit DPR to 1.5 instead of 2 for better performance on high-res screens
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); 
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      layers = [];
      edges = [];
      signals = [];

      // Create a Deep Learning architecture topology
      const layerCount = Math.max(Math.floor(window.innerWidth / 180), 5); // At least 5 layers
      
      // Let the network bleed slightly off the edges for a seamless look
      const startX = -50;
      const endX = window.innerWidth + 50;
      const layerSpacing = (endX - startX) / (layerCount - 1);

      const baseHeight = Math.floor(window.innerHeight / 80);

      for (let i = 0; i < layerCount; i++) {
        const nodes: Node[] = [];
        
        // Shape the network like a deep autoencoder / dense net
        const progress = i / (layerCount - 1);
        const shapeFactor = Math.sin(progress * Math.PI); 
        // Increase node count to cover full height
        const nodeCount = Math.max(5, Math.floor(baseHeight * (0.8 + shapeFactor * 1.2)));

        // Span the full height of the screen, plus a tiny bleed
        const startY = -50;
        const endY = window.innerHeight + 50;
        const nodeSpacing = nodeCount > 1 ? (endY - startY) / (nodeCount - 1) : 0;

        for (let j = 0; j < nodeCount; j++) {
          const yPos = nodeCount === 1 ? window.innerHeight / 2 : startY + j * nodeSpacing;
          nodes.push({
            layer: i,
            x: startX + i * layerSpacing,
            y: yPos,
            anchorX: startX + i * layerSpacing,
            anchorY: yPos,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            activation: 0,
            cooldown: 0,
            outgoingEdges: [],
          });
        }
        layers.push(nodes);
      }

      // Create Synapses (Dense connections between adjacent layers)
      for (let i = 0; i < layers.length - 1; i++) {
        const currentLayer = layers[i];
        const nextLayer = layers[i + 1];

        currentLayer.forEach((nodeA) => {
          nextLayer.forEach((nodeB) => {
            // Apply a "dropout" effect so it's not a completely solid wall of lines
            if (Math.random() > 0.25) {
              const edge = {
                from: nodeA,
                to: nodeB,
                weight: Math.random() * 0.8 + 0.2,
              };
              edges.push(edge);
              nodeA.outgoingEdges.push(edge);
            }
          });
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Update Nodes (Spring physics & Activation decay)
      layers.forEach((layer) => {
        layer.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;

          // Spring back to architecture position
          const dx = node.anchorX - node.x;
          const dy = node.anchorY - node.y;
          node.vx += dx * 0.002;
          node.vy += dy * 0.002;
          
          // Friction
          node.vx *= 0.92;
          node.vy *= 0.92;

          // Neural properties
          node.activation = Math.max(0, node.activation - 0.02);
          node.cooldown = Math.max(0, node.cooldown - 1);

          // Mouse interaction (acts as an input stimulus)
          const distToMouse = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          if (distToMouse < 150) {
            const influence = 1 - distToMouse / 150;
            node.vx -= (mouse.x - node.x) * 0.0006 * influence;
            node.vy -= (mouse.y - node.y) * 0.0006 * influence;
            
            // Mouse forces the neuron to fire if ready
            if (influence > 0.5 && node.cooldown <= 0 && Math.random() < 0.1) {
               node.activation = 1;
               node.cooldown = 25;
               node.activationType = 'mouse';
               let firedCount = 0;
               node.outgoingEdges.forEach(edge => {
                  // Limit to firing down 4 paths maximum to prevent explosion
                  if (firedCount < 4 && signals.length < 1500) { 
                    signals.push({ edge, progress: 0, speed: 0.015 + Math.random() * 0.01, type: 'mouse' });
                    firedCount++;
                  }
               });
            }
          }
        });
      });

      // 2. Draw Synapses (Edges)
      ctx.lineWidth = 1;
      edges.forEach((edge) => {
        // Base visibility is low. Lights up if nodes are active.
        const activity = Math.max(edge.from.activation, edge.to.activation);
        const opacity = 0.15 + (activity * 0.4) + (edge.weight * 0.1);
        
        // Check if the dominant activating node is a mouse node
        const isMouseEdge = (edge.from.activation > edge.to.activation && edge.from.activationType === 'mouse') || 
                            (edge.to.activation >= edge.from.activation && edge.to.activationType === 'mouse');
                            
        const rgb = isMouseEdge ? '250, 204, 21' : '45, 212, 191';
        
        ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.stroke();
      });

      // 3. Spontaneous Forward Pass (Batch Inference Simulation)
      const autoSignalsCount = signals.filter(s => s.type !== 'mouse').length;
      if (Math.random() < 0.01 && autoSignalsCount < 100) { // Only start waves if background network is relatively quiet
        layers[0].forEach(node => {
           if (Math.random() > 0.4) { // 60% of input nodes fire
             node.activation = 1;
             node.cooldown = 30;
             node.activationType = 'auto';
             let firedCount = 0;
             node.outgoingEdges.forEach(edge => {
               if (firedCount < 3 && signals.length < 1500) {
                 signals.push({ edge, progress: 0, speed: 0.015 + Math.random() * 0.015, type: 'auto' });
                 firedCount++;
               }
             });
           }
        });
      }

      // 4. Update & Draw Data Signals (Action Potentials)
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;

        if (s.progress >= 1) {
          const target = s.edge.to;
          target.activation += s.edge.weight * 1.5; 
          
          const isMouseSignal = s.type === 'mouse';
          
          if (isMouseSignal) {
             target.activationType = 'mouse';
          }
          
          signals.splice(i, 1);
          
          // Mouse signals can bypass cooldown to ensure they don't get killed by background traffic
          if (target.activation >= 0.75 && (target.cooldown <= 0 || isMouseSignal)) { 
            target.activation = 1;
            target.cooldown = 20; 
            
            const outType = s.type || 'auto';
            target.activationType = outType; // Force the node to match the explosive signal
            
            // Randomly select 2-5 edges on the fly to prevent permanent dead zones
            const maxFires = 2 + Math.floor(Math.random() * 4); 
            const shuffledEdges = [...target.outgoingEdges].sort(() => Math.random() - 0.5);
            let firedCount = 0;

            for (const edge of shuffledEdges) {
              if (firedCount >= maxFires) break;
              if (Math.random() < edge.weight + 0.2 && signals.length < 1500) { 
                  signals.push({ edge, progress: 0, speed: 0.015 + Math.random() * 0.015, type: outType });
                  firedCount++;
              }
            }
          }
          continue;
        }

        const currX = s.edge.from.x + (s.edge.to.x - s.edge.from.x) * s.progress;
        const currY = s.edge.from.y + (s.edge.to.y - s.edge.from.y) * s.progress;

        const tailProgress = Math.max(0, s.progress - 0.15);
        const tailX = s.edge.from.x + (s.edge.to.x - s.edge.from.x) * tailProgress;
        const tailY = s.edge.from.y + (s.edge.to.y - s.edge.from.y) * tailProgress;
const isMouse = s.type === 'mouse';
ctx.strokeStyle = isMouse ? `rgba(250, 204, 21, 0.8)` : `rgba(45, 212, 191, 0.4)`;
ctx.lineWidth = 1.5; // Normalized thickness
ctx.beginPath();
ctx.moveTo(currX, currY);
ctx.lineTo(tailX, tailY);
ctx.stroke();

// Draw Bright Head
ctx.fillStyle = isMouse ? "#fef08a" : "#ffffff";
ctx.beginPath();
ctx.arc(currX, currY, 1.5, 0, Math.PI * 2); // Normalized radius
ctx.fill();
      }

      // 5. Draw Nodes
      layers.forEach((layer) => {
        layer.forEach((node) => {
          const visualActivation = Math.min(node.activation, 1.2);
          const radius = 2 + visualActivation * 1.5;
          
          const isMouse = node.activationType === 'mouse';
          const rgb = isMouse ? '250, 204, 21' : '45, 212, 191';
          
          ctx.fillStyle = `rgba(${rgb}, ${0.3 + visualActivation * 0.7})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();
          
          if (visualActivation > 0.1) {
            ctx.fillStyle = `rgba(${rgb}, ${visualActivation * 0.15})`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    let lastWidth = window.innerWidth;
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Only re-init if width changes to prevent reset on mobile scroll (address bar hide/show)
        if (window.innerWidth !== lastWidth) {
          lastWidth = window.innerWidth;
          init();
        }
      }, 200);
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-[#020617] opacity-70" />
    </div>
  );
}

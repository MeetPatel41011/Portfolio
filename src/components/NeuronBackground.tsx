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
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); 
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

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
               node.cooldown = 30;
               node.outgoingEdges.forEach(edge => {
                  signals.push({ edge, progress: 0, speed: 0.01 + Math.random() * 0.01 });
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
        
        ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.stroke();
      });

      // 3. Spontaneous Forward Pass (Batch Inference Simulation)
      if (Math.random() < 0.01) { // 1% chance per frame to start a wave
        layers[0].forEach(node => {
           if (Math.random() > 0.3) { // 70% of input nodes fire
             node.activation = 1;
             node.cooldown = 40;
             node.outgoingEdges.forEach(edge => {
               signals.push({ edge, progress: 0, speed: 0.01 + Math.random() * 0.015 });
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
          // Integrate signal
          target.activation += s.edge.weight * 0.4;
          signals.splice(i, 1);
          
          // Activation function (Threshold / Step)
          if (target.activation >= 0.7 && target.cooldown <= 0) {
            target.activation = 1;
            target.cooldown = 25; // Refractory period
            
            // Forward propagate
            target.outgoingEdges.forEach(edge => {
              if (Math.random() < edge.weight + 0.3) { // Higher weight = more likely to transmit
                signals.push({ edge, progress: 0, speed: 0.01 + Math.random() * 0.015 });
              }
            });
          }
          continue;
        }

        // Calculate positions for the "data packet" trail
        const currX = s.edge.from.x + (s.edge.to.x - s.edge.from.x) * s.progress;
        const currY = s.edge.from.y + (s.edge.to.y - s.edge.from.y) * s.progress;

        const tailProgress = Math.max(0, s.progress - 0.15); // 15% length tail
        const tailX = s.edge.from.x + (s.edge.to.x - s.edge.from.x) * tailProgress;
        const tailY = s.edge.from.y + (s.edge.to.y - s.edge.from.y) * tailProgress;

        // Draw Trail
        const gradient = ctx.createLinearGradient(currX, currY, tailX, tailY);
        gradient.addColorStop(0, `rgba(45, 212, 191, 1)`); // Bright head
        gradient.addColorStop(1, `rgba(45, 212, 191, 0)`); // Faded tail
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(currX, currY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Draw Bright Head
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(currX, currY, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw Nodes
      layers.forEach((layer) => {
        layer.forEach((node) => {
          // Cap the visual activation so the radius never exceeds a strict maximum
          const visualActivation = Math.min(node.activation, 1.2);
          const radius = 2 + visualActivation * 1.5;
          
          // Core
          ctx.fillStyle = `rgba(45, 212, 191, ${0.3 + visualActivation * 0.7})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow (reduced multiplier to prevent massive circles)
          if (visualActivation > 0.1) {
            ctx.fillStyle = `rgba(45, 212, 191, ${visualActivation * 0.15})`;
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

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(init, 200);
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

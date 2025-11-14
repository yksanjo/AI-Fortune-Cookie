import React, { useEffect, useRef } from 'react';
import './ParticleEffect.css';

function ParticleEffect({ active }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const container = containerRef.current;
    const particles = [];
    const particleCount = 30;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position around center
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 40;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      // Random size and color
      const size = 4 + Math.random() * 5;
      const colors = ['#f4a460', '#d2691e', '#daa520', '#cd853f', '#ffd700', '#ffa500'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Random direction for explosion
      const explosionAngle = angle + Math.PI + (Math.random() - 0.5) * 0.8;
      const dx = Math.cos(explosionAngle);
      const dy = Math.sin(explosionAngle);
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.color = color;
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      particle.style.setProperty('--dx', dx);
      particle.style.setProperty('--dy', dy);
      particle.style.animationDelay = `${Math.random() * 0.3}s`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Cleanup after animation
    const timeout = setTimeout(() => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    }, 2000);

    return () => {
      clearTimeout(timeout);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [active]);

  if (!active) return null;

  return <div ref={containerRef} className="particle-container" />;
}

export default ParticleEffect;


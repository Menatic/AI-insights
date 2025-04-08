
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  connections: number[];
  opacity: number;
}

const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 100);
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          connections: [],
          opacity: 0.1 + Math.random() * 0.4,
        });
      }

      // Create connections (simulate neural network)
      particles.forEach((particle, i) => {
        const connectionCount = Math.floor(Math.random() * 3) + 1;
        const possibleConnections = [...Array(particleCount).keys()].filter(k => k !== i);
        
        for (let j = 0; j < connectionCount; j++) {
          if (possibleConnections.length === 0) break;
          
          const randomIndex = Math.floor(Math.random() * possibleConnections.length);
          const connectionIndex = possibleConnections[randomIndex];
          
          particle.connections.push(connectionIndex);
          possibleConnections.splice(randomIndex, 1);
        }
      });

      particlesRef.current = particles;
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particle.connections.forEach(connectionIndex => {
          const connectedParticle = particlesRef.current[connectionIndex];
          const distance = Math.sqrt(
            Math.pow(particle.x - connectedParticle.x, 2) + 
            Math.pow(particle.y - connectedParticle.y, 2)
          );
          
          if (distance < 250) {
            const opacity = (1 - distance / 250) * 0.15 * particle.opacity;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(connectedParticle.x, connectedParticle.y);
            
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y, connectedParticle.x, connectedParticle.y
            );
            gradient.addColorStop(0, `rgba(58, 134, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            
            // Pulse effect (data transfer visualization)
            if (Math.random() > 0.99) {
              const pulseSize = 2;
              const steps = 5;
              
              for (let j = 0; j <= steps; j++) {
                const ratio = j / steps;
                const x = particle.x + (connectedParticle.x - particle.x) * ratio;
                const y = particle.y + (connectedParticle.y - particle.y) * ratio;
                
                const pulseOpacity = Math.sin(ratio * Math.PI) * opacity * 2;
                
                ctx.beginPath();
                ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(139, 92, 246, ${pulseOpacity})`;
                ctx.fill();
              }
            }
          }
        });
      });
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
        
        // Update positions
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });
      
      animationRef.current = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-10"
    />
  );
};

export default NeuralNetworkBackground;

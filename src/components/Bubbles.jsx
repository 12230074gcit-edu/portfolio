import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { trackEvents } from '../utils/analytics';

// Memoized bubble creation function for better performance
const createBubbleConfig = (id) => {
  // Varied sizes - small, medium, large
  const sizeCategory = Math.random();
  let size;
  if (sizeCategory < 0.5) {
    size = 12 + Math.random() * 10; // Small: 12-22px
  } else if (sizeCategory < 0.85) {
    size = 22 + Math.random() * 15; // Medium: 22-37px
  } else {
    size = 37 + Math.random() * 18; // Large: 37-55px
  }

  return {
    id,
    x: 5 + Math.random() * 90,
    y: 60 + Math.random() * 35, // Start from bottom portion
    size,
    opacity: 0.08 + Math.random() * 0.12,
    speedX: (Math.random() - 0.5) * 0.08,
    speedY: -0.03 - Math.random() * 0.06,
    wobbleSpeed: 0.01 + Math.random() * 0.015,
    wobbleAmount: 0.02 + Math.random() * 0.03,
    wobble: Math.random() * Math.PI * 2,
    popped: false,
  };
};

export default function Bubbles() {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const audioContextRef = useRef(null);

  // Create pop sound using Web Audio API
  const playPopSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create oscillator for pop sound
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Pop sound characteristics - short high frequency burst
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
      
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.type = 'sine';
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Audio not supported, fail silently
    }
  }, []);

  // Memoized initial bubbles - reduced count for better performance
  const initialBubbles = useMemo(() => {
    const count = 8; // Reduced from 12 to 8 for better performance
    return Array.from({ length: count }, (_, i) => createBubbleConfig(i));
  }, []);

  // Generate initial bubbles with varied sizes
  useEffect(() => {
    setBubbles(initialBubbles);
  }, [initialBubbles]);

  // Animate bubbles using requestAnimationFrame for smoother, more efficient animation
  useEffect(() => {
    if (bubbles.length === 0) return;

    let animationFrameId;
    let lastTime = 0;
    const targetInterval = 60; // ~16fps instead of 20fps (50ms) - saves CPU while still smooth

    const animate = (currentTime) => {
      if (currentTime - lastTime >= targetInterval) {
        lastTime = currentTime;
        
        setBubbles(prev => 
          prev.map(bubble => {
            if (bubble.popped) return bubble;

            let newX = bubble.x + bubble.speedX + Math.sin(bubble.wobble) * bubble.wobbleAmount;
            let newY = bubble.y + bubble.speedY;
            let newWobble = bubble.wobble + bubble.wobbleSpeed;

            // Soft boundary bounce
            if (newX < 3) {
              newX = 3;
              bubble.speedX = Math.abs(bubble.speedX) * 0.5;
            }
            if (newX > 97) {
              newX = 97;
              bubble.speedX = -Math.abs(bubble.speedX) * 0.5;
            }
            
            // Reset when reaching top
            if (newY < 5) {
              return createBubbleConfig(bubble.id);
            }

            return { ...bubble, x: newX, y: newY, wobble: newWobble };
          })
        );
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [bubbles.length]);

  // Regenerate popped bubbles after delay
  useEffect(() => {
    const poppedBubbles = bubbles.filter(b => b.popped);
    if (poppedBubbles.length === 0) return;

    const timeout = setTimeout(() => {
      setBubbles(prev => 
        prev.map(bubble => {
          if (bubble.popped) {
            return createBubbleConfig(bubble.id);
          }
          return bubble;
        })
      );
    }, 2500);

    return () => clearTimeout(timeout);
  }, [bubbles]);

  const handleBubblePop = (e, bubbleId) => {
    e.stopPropagation();
    const bubble = e.currentTarget;
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const bubbleSize = rect.width;
    
    // Play pop sound
    playPopSound();
    
    // Track bubble pop for analytics
    trackEvents.bubblePop();
    
    // Pop animation - quick burst outward then disappear
    gsap.to(bubble, {
      scale: 1.4,
      opacity: 0,
      duration: 0.12,
      ease: 'power2.out',
    });

    // Create pop particles - small water droplets effect
    const particleCount = Math.min(Math.floor(bubbleSize / 8) + 3, 8);
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const particleSize = 2 + Math.random() * 3;
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: ${particleSize}px;
        height: ${particleSize}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
        pointer-events: none;
        z-index: 100;
      `;
      document.body.appendChild(particle);

      const angle = (i / particleCount) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 10 + Math.random() * 20;
      const gravity = 30 + Math.random() * 20;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + gravity,
        opacity: 0,
        scale: 0.3,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => particle.remove(),
      });
    }

    // Mark as popped
    setBubbles(prev => 
      prev.map(b => b.id === bubbleId ? { ...b, popped: true } : b)
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      {bubbles.map(bubble => (
        !bubble.popped && (
          <div
            key={bubble.id}
            onClick={(e) => handleBubblePop(e, bubble.id)}
            style={{
              position: 'absolute',
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              // Realistic bubble gradient with light refraction
              background: `
                radial-gradient(circle at 30% 25%, 
                  rgba(255, 255, 255, ${bubble.opacity + 0.2}) 0%,
                  rgba(255, 255, 255, ${bubble.opacity * 0.5}) 20%,
                  rgba(200, 220, 255, ${bubble.opacity * 0.3}) 40%,
                  transparent 70%
                )
              `,
              border: `1px solid rgba(255, 255, 255, ${bubble.opacity * 0.4})`,
              boxShadow: `
                inset 0 -${bubble.size * 0.1}px ${bubble.size * 0.2}px rgba(255, 255, 255, ${bubble.opacity * 0.15}),
                inset ${bubble.size * 0.05}px ${bubble.size * 0.05}px ${bubble.size * 0.15}px rgba(255, 255, 255, ${bubble.opacity * 0.2}),
                0 0 ${bubble.size * 0.3}px rgba(255, 255, 255, ${bubble.opacity * 0.1})
              `,
              pointerEvents: 'auto',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              transition: 'transform 0.15s ease',
              willChange: 'transform, opacity',
              contain: 'layout style paint',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.08,
                duration: 0.15,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.15,
                ease: 'power2.out',
              });
            }}
          >
            {/* Primary highlight - top left */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '30%',
                height: '20%',
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${bubble.opacity + 0.25})`,
                filter: 'blur(1px)',
                transform: 'rotate(-40deg)',
              }}
            />
            {/* Secondary smaller highlight */}
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '15%',
                width: '12%',
                height: '8%',
                borderRadius: '50%',
                background: `rgba(255, 255, 255, ${bubble.opacity + 0.15})`,
                filter: 'blur(0.5px)',
                transform: 'rotate(-30deg)',
              }}
            />
          </div>
        )
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Bubbles() {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  // Generate initial bubbles - fewer and smaller
  useEffect(() => {
    const initialBubbles = [];
    const count = 8; // Reduced from 20

    for (let i = 0; i < count; i++) {
      initialBubbles.push({
        id: i,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 70, // Start below hero (20% from top)
        size: 15 + Math.random() * 25, // Smaller: 15-40px
        opacity: 0.15 + Math.random() * 0.1,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -0.05 - Math.random() * 0.1,
        wobble: Math.random() * Math.PI * 2,
        popped: false,
      });
    }

    setBubbles(initialBubbles);
  }, []);

  // Animate bubbles floating with gentle wobble
  useEffect(() => {
    if (bubbles.length === 0) return;

    const interval = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => {
          if (bubble.popped) return bubble;

          let newX = bubble.x + bubble.speedX + Math.sin(bubble.wobble) * 0.05;
          let newY = bubble.y + bubble.speedY;
          let newWobble = bubble.wobble + 0.02;

          // Keep within bounds, respecting hero section (top 15%)
          if (newX < 5) newX = 5;
          if (newX > 95) newX = 95;
          if (newY < 15) {
            // Reset to bottom when reaching top
            newY = 95;
            newX = 10 + Math.random() * 80;
          }

          return { ...bubble, x: newX, y: newY, wobble: newWobble };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, [bubbles.length]);

  // Regenerate popped bubbles after delay
  useEffect(() => {
    const poppedBubbles = bubbles.filter(b => b.popped);
    if (poppedBubbles.length === 0) return;

    const timeout = setTimeout(() => {
      setBubbles(prev => 
        prev.map(bubble => {
          if (bubble.popped) {
            return {
              ...bubble,
              popped: false,
              x: 10 + Math.random() * 80,
              y: 90 + Math.random() * 10, // Respawn near bottom
              size: 15 + Math.random() * 25,
              opacity: 0.15 + Math.random() * 0.1,
            };
          }
          return bubble;
        })
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, [bubbles]);

  const handleBubblePop = (e, bubbleId) => {
    e.stopPropagation();
    const bubble = e.currentTarget;
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Quick pop animation
    gsap.to(bubble, {
      scale: 1.3,
      opacity: 0,
      duration: 0.15,
      ease: 'power2.out',
    });

    // Small pop particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        pointer-events: none;
        z-index: 5;
      `;
      document.body.appendChild(particle);

      const angle = (i / 5) * Math.PI * 2;
      const distance = 15 + Math.random() * 15;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.3,
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
        top: '15vh', // Start below hero
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 2,
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
              background: `radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, ${bubble.opacity + 0.15}), 
                rgba(255, 255, 255, ${bubble.opacity * 0.4}) 50%,
                transparent 100%)`,
              border: `1px solid rgba(255, 255, 255, ${bubble.opacity * 0.6})`,
              boxShadow: `
                inset 0 -2px 4px rgba(255, 255, 255, ${bubble.opacity * 0.2}),
                inset 2px 2px 4px rgba(255, 255, 255, ${bubble.opacity * 0.3})
              `,
              pointerEvents: 'auto',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                duration: 0.2,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out',
              });
            }}
          >
            {/* Small highlight reflection */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '25%',
                height: '15%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.5)',
                filter: 'blur(1px)',
                transform: 'rotate(-30deg)',
              }}
            />
          </div>
        )
      ))}
    </div>
  );
}

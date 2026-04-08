import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Bubbles() {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  // Generate initial bubbles
  useEffect(() => {
    const initialBubbles = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      initialBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 30 + Math.random() * 80,
        opacity: 0.1 + Math.random() * 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -0.1 - Math.random() * 0.2,
        popped: false,
      });
    }

    setBubbles(initialBubbles);
  }, []);

  // Animate bubbles floating
  useEffect(() => {
    if (bubbles.length === 0) return;

    const interval = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => {
          if (bubble.popped) return bubble;

          let newX = bubble.x + bubble.speedX;
          let newY = bubble.y + bubble.speedY;

          // Wrap around edges
          if (newX < -10) newX = 110;
          if (newX > 110) newX = -10;
          if (newY < -10) newY = 110;

          return { ...bubble, x: newX, y: newY };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [bubbles.length]);

  // Regenerate popped bubbles after delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBubbles(prev => 
        prev.map(bubble => {
          if (bubble.popped) {
            return {
              ...bubble,
              popped: false,
              x: Math.random() * 100,
              y: 110,
              size: 30 + Math.random() * 80,
              opacity: 0.1 + Math.random() * 0.15,
            };
          }
          return bubble;
        })
      );
    }, 2000);

    return () => clearTimeout(timeout);
  }, [bubbles]);

  const handleBubblePop = (e, bubbleId) => {
    const bubble = e.currentTarget;
    
    // Pop animation
    gsap.to(bubble, {
      scale: 1.5,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    // Create pop particles
    const rect = bubble.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        z-index: 1000;
      `;
      document.body.appendChild(particle);

      const angle = (i / 8) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.5,
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
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {bubbles.map(bubble => (
        !bubble.popped && (
          <div
            key={bubble.id}
            onClick={(e) => handleBubblePop(e, bubble.id)}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.15,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
            }}
            style={{
              position: 'absolute',
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, ${bubble.opacity + 0.1}), 
                rgba(255, 255, 255, ${bubble.opacity * 0.5}) 40%,
                rgba(100, 150, 255, ${bubble.opacity * 0.3}) 70%,
                transparent 100%)`,
              border: `1px solid rgba(255, 255, 255, ${bubble.opacity * 0.5})`,
              boxShadow: `
                inset 0 0 20px rgba(255, 255, 255, ${bubble.opacity * 0.3}),
                0 0 30px rgba(100, 150, 255, ${bubble.opacity * 0.2})
              `,
              pointerEvents: 'auto',
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              transition: 'transform 0.1s ease',
            }}
          >
            {/* Highlight reflection */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '30%',
                height: '20%',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.4)',
                filter: 'blur(3px)',
                transform: 'rotate(-30deg)',
              }}
            />
          </div>
        )
      ))}
    </div>
  );
}

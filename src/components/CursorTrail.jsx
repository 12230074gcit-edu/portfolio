import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CursorTrail() {
  const trailsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const isVisible = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible.current) {
        isVisible.current = true;
        trailsRef.current.forEach((trail) => {
          if (trail) gsap.set(trail, { opacity: 1 });
        });
      }
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      trailsRef.current.forEach((trail) => {
        if (trail) gsap.to(trail, { opacity: 0, duration: 0.3 });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animate trails to follow mouse with delay
    const animateTrails = () => {
      trailsRef.current.forEach((trail, i) => {
        if (!trail) return;
        
        const delay = (i + 1) * 0.08;
        const scale = 1 - (i * 0.15);
        
        gsap.to(trail, {
          x: mousePos.current.x,
          y: mousePos.current.y,
          scale: Math.max(0.2, scale),
          duration: 0.5 + delay,
          ease: 'power2.out',
        });
      });
      
      requestAnimationFrame(animateTrails);
    };
    
    const animId = requestAnimationFrame(animateTrails);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          style={{
            position: 'absolute',
            width: `${12 - i * 2}px`,
            height: `${12 - i * 2}px`,
            borderRadius: '50%',
            background: `rgba(255, 255, 255, ${0.8 - i * 0.15})`,
            boxShadow: `0 0 ${15 - i * 2}px rgba(255, 255, 255, ${0.5 - i * 0.1})`,
            transform: 'translate(-50%, -50%)',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

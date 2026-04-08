import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RollingText({ words = ['DESIGN', 'DEVELOP', 'CREATE', 'INNOVATE'] }) {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        
        // Show current word
        tl.to(word, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, i * 2);
        
        // Hold
        tl.to({}, { duration: 1.2 }, i * 2 + 0.6);
        
        // Hide current word
        tl.to(word, {
          y: -50,
          opacity: 0,
          rotateX: -90,
          duration: 0.4,
          ease: 'power2.in',
        }, i * 2 + 1.8);
      });
    });

    return () => ctx.revert();
  }, [words]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '1.2em',
        overflow: 'hidden',
        perspective: '500px',
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => (wordsRef.current[i] = el)}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            opacity: i === 0 ? 1 : 0,
            transform: i === 0 ? 'translateY(0) rotateX(0)' : 'translateY(50px) rotateX(90deg)',
            transformOrigin: 'center center',
            fontWeight: 700,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

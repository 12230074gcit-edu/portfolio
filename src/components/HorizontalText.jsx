import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalText({ text = "DESIGN DEVELOP CREATE ", direction = "left", speed = 1 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textWidth = textRef.current?.offsetWidth || 0;
      const startX = direction === 'left' ? 0 : -textWidth / 2;
      const endX = direction === 'left' ? -textWidth / 2 : 0;

      gsap.fromTo(
        textRef.current,
        { x: startX },
        {
          x: endX,
          duration: 20 / speed,
          ease: 'none',
          repeat: -1,
        }
      );

      // Parallax on scroll
      gsap.to(containerRef.current, {
        x: direction === 'left' ? -100 : 100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [direction, speed]);

  const repeatedText = text.repeat(10);

  return (
    <div
      ref={containerRef}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '20px 0',
      }}
    >
      <div
        ref={textRef}
        style={{
          display: 'inline-block',
          fontSize: 'clamp(60px, 10vw, 120px)',
          fontWeight: 800,
          fontFamily: "'Montserrat', sans-serif",
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {repeatedText}
      </div>
    </div>
  );
}

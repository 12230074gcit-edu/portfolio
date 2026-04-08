import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const QuoteSection = () => {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const chessRef = useRef(null);
  const titleRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cube animation - simple smooth float with subtle rotation
      gsap.set(cubeRef.current, { y: 0, x: 0, rotation: 0 });
      
      // Gentle floating animation
      gsap.to(cubeRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Slow rotation on scroll
      gsap.to(cubeRef.current, {
        rotation: 15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Chess piece animation - floating
      gsap.to(chessRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });

      // Chess slight rotation on scroll
      gsap.to(chessRef.current, {
        rotation: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Word-by-word reveal with blur effect
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { 
            opacity: 0, 
            y: 60, 
            filter: 'blur(15px)',
            rotateX: -45,
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
            delay: i * 0.08,
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const quoteWords = [
    'Designing', 'experiences', 'that', 'turn',
    'interaction', 'into', 'engagement',
    'and', 'engagement', 'into', 'loyalty.'
  ];

  return (
    <section
      id="quote-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '70vh',
        padding: '80px 20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.15), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Quote text */}
      <h2
        ref={titleRef}
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          color: 'white',
          fontSize: 'clamp(36px, 6vw, 64px)',
          lineHeight: 1.3,
          maxWidth: '900px',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          letterSpacing: '-0.5px',
          perspective: '1000px',
        }}
      >
        {quoteWords.map((word, i) => (
          <span
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            style={{
              display: 'inline-block',
              marginRight: '0.3em',
              transformStyle: 'preserve-3d',
            }}
          >
            {word}
            {(i === 3 || i === 6) && <br />}
          </span>
        ))}
      </h2>

      {/* Floating cube - simple float, no squeeze */}
      <div
        ref={cubeRef}
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '140px',
          height: '140px',
          zIndex: 5,
        }}
      >
        <img
          src="/cube.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* Floating chess piece */}
      <div
        ref={chessRef}
        style={{
          position: 'absolute',
          top: '35%',
          right: '8%',
          width: '120px',
          height: '120px',
          zIndex: 5,
        }}
      >
        <img
          src="/chess.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.4))',
          }}
        />
      </div>
    </section>
  );
};

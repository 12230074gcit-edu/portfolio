import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const QuoteSection = () => {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const chessRef = useRef(null);
  const hatTargetRef = useRef(null);
  const titleRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hat into this section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          const hat = document.getElementById('shared-hat');
          if (!hat || !hatTargetRef.current) return;

          // Get target position
          const targetRect = hatTargetRef.current.getBoundingClientRect();
          
          gsap.killTweensOf(hat);
          gsap.to(hat, {
            x: targetRect.left + targetRect.width / 2 - window.innerWidth / 2,
            y: targetRect.top + targetRect.height / 2 - 100,
            scale: 0.8,
            duration: 1.5,
            ease: 'power3.inOut',
            onComplete: () => {
              // Gentle floating
              gsap.to(hat, {
                duration: 4,
                y: '+=15',
                rotation: 5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            },
          });
        },
      });

      // Parallax for decorative elements
      gsap.to(cubeRef.current, {
        y: -150,
        x: 80,
        rotation: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(chessRef.current, {
        y: -180,
        x: -100,
        rotation: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Word-by-word reveal
      wordsRef.current.forEach((word, i) => {
        gsap.fromTo(
          word,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
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
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '60vh',
        padding: '100px 20px',
        overflow: 'hidden',
        display: 'flex',
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
          width: '600px',
          height: '400px',
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
        }}
      >
        {quoteWords.map((word, i) => (
          <span
            key={i}
            ref={el => wordsRef.current[i] = el}
            style={{
              display: 'inline-block',
              marginRight: '0.3em',
            }}
          >
            {word}
            {(i === 3 || i === 6) && <br />}
          </span>
        ))}
      </h2>

      {/* Hat target */}
      <div
        ref={hatTargetRef}
        style={{
          position: 'absolute',
          top: '10%',
          right: '20%',
          width: '100px',
          height: '100px',
          zIndex: 10,
        }}
      />

      {/* Floating cube */}
      <img
        ref={cubeRef}
        src="/cube.png"
        alt=""
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '140px',
          zIndex: 5,
          opacity: 0.8,
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
        }}
      />

      {/* Floating chess piece */}
      <img
        ref={chessRef}
        src="/chess.png"
        alt=""
        style={{
          position: 'absolute',
          top: '40%',
          right: '8%',
          width: '120px',
          zIndex: 5,
          opacity: 0.8,
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
        }}
      />
    </section>
  );
};

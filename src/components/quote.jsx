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
  const highlightWordsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cube animation - simple smooth float
      gsap.set(cubeRef.current, { y: 0, rotation: 0 });
      
      // Gentle floating animation
      gsap.to(cubeRef.current, {
        y: -20,
        duration: 4,
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
        duration: 3,
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

      // Line drawing animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Word-by-word reveal with 3D flip and blur effect
      wordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { 
            opacity: 0, 
            y: 80, 
            filter: 'blur(20px)',
            rotateX: -90,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            rotateX: 0,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
            delay: i * 0.1,
          }
        );
      });

      // Highlight words color animation
      highlightWordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { 
            backgroundSize: '0% 100%',
          },
          {
            backgroundSize: '100% 100%',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
            },
            delay: 0.8 + i * 0.2,
          }
        );
      });

      // Title subtle parallax
      gsap.to(titleRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const quoteWords = [
    { text: 'Designing', highlight: false },
    { text: 'experiences', highlight: false },
    { text: 'that', highlight: false },
    { text: 'turn', highlight: false },
    { text: 'interaction', highlight: true, index: 0 },
    { text: 'into', highlight: false },
    { text: 'engagement', highlight: true, index: 1 },
    { text: 'and', highlight: false },
    { text: 'engagement', highlight: false },
    { text: 'into', highlight: false },
    { text: 'loyalty.', highlight: true, index: 2 },
  ];

  let highlightIndex = 0;

  return (
    <section
      id="quote-section"
      ref={sectionRef}
      className="quote-section"
      style={{
        position: 'relative',
        minHeight: '70vh',
        padding: '100px 20px',
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

      {/* Decorative line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: '80%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transformOrigin: 'left center',
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
          lineHeight: 1.4,
          maxWidth: '950px',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          letterSpacing: '-0.5px',
          perspective: '1000px',
        }}
      >
        {quoteWords.map((word, i) => {
          const isHighlight = word.highlight;
          
          return (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              style={{
                display: 'inline-block',
                marginRight: '0.3em',
                transformStyle: 'preserve-3d',
                position: 'relative',
              }}
            >
              {isHighlight ? (
                <span
                  ref={(el) => {
                    if (word.index !== undefined) {
                      highlightWordsRef.current[word.index] = el;
                    }
                  }}
                  style={{
                    background: 'linear-gradient(90deg, rgba(100, 100, 255, 0.4) 0%, rgba(150, 100, 255, 0.4) 100%)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0 0',
                    backgroundSize: '0% 100%',
                    padding: '0 0.15em',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {word.text}
                </span>
              ) : (
                word.text
              )}
              {(i === 3 || i === 6) && <br />}
            </span>
          );
        })}
      </h2>

      {/* Floating cube - simple float */}
      <div
        ref={cubeRef}
        className="quote-cube"
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
        className="quote-chess"
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

      {/* Decorative dots */}
      <div
        className="quote-dots"
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          display: 'flex',
          gap: '8px',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .quote-section {
            min-height: 60vh !important;
            padding: 60px 16px !important;
          }
          .quote-section h2 {
            font-size: clamp(24px, 7vw, 36px) !important;
            line-height: 1.5 !important;
          }
          .quote-cube, .quote-chess {
            display: none !important;
          }
          .quote-dots {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .quote-section h2 {
            font-size: 22px !important;
          }
        }
      `}</style>
    </section>
  );
};

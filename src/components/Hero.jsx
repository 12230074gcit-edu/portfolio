import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RollingText from './RollingText';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export const Hero = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconRef = useRef(null);
  const glowRef = useRef(null);
  const blocksRef = useRef([]);
  const titleWordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hat entrance with bounce
      gsap.from(iconRef.current, {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1.8,
        ease: 'elastic.out(1, 0.5)',
        delay: 1,
      });

      // Hat floating motion in Hero
      const hatFloat = gsap.timeline({ repeat: -1, yoyo: true });
      hatFloat.to(iconRef.current, {
        duration: 6,
        ease: 'sine.inOut',
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 40, y: -20 },
            { x: 80, y: 15 },
            { x: 50, y: 40 },
            { x: 0, y: 30 },
            { x: -30, y: 15 },
          ],
          curviness: 1.5,
        },
      });

      // Hat scroll animation - moves through sections
      ScrollTrigger.create({
        trigger: '#quote-section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 2,
        onUpdate: (self) => {
          hatFloat.pause();
          const progress = self.progress;
          gsap.to(iconRef.current, {
            x: 200 + progress * 300,
            y: progress * 150,
            rotation: progress * 30,
            scale: 0.9 - progress * 0.1,
            duration: 0.5,
          });
        },
        onLeave: () => {
          gsap.to(iconRef.current, {
            opacity: 0,
            duration: 0.5,
          });
        },
        onEnterBack: () => {
          gsap.to(iconRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });

      // Continue hat through projects section
      ScrollTrigger.create({
        trigger: '#projects-section',
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(iconRef.current, {
            x: 500 + progress * 200,
            y: 150 + progress * 100,
            rotation: 30 + progress * 20,
            duration: 0.5,
          });
        },
      });

      // Subtle pulsing glow
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Title words entrance with stagger
      titleWordsRef.current.forEach((word, i) => {
        if (!word) return;
        gsap.from(word, {
          y: 100,
          opacity: 0,
          rotateX: -90,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.5 + i * 0.1,
        });
      });

      // Subtitle entrance
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 1,
      });

      // Floating blocks animation with varied motion
      blocksRef.current.forEach((block, i) => {
        if (!block) return;
        
        // Random floating
        gsap.to(block, {
          y: gsap.utils.random(-20, 20),
          x: gsap.utils.random(-15, 15),
          rotation: gsap.utils.random(-10, 10),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });

        // Entrance animation
        gsap.from(block, {
          scale: 0,
          opacity: 0,
          rotation: gsap.utils.random(-180, 180),
          duration: 1,
          ease: 'back.out(1.7)',
          delay: 1.5 + i * 0.15,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const decorativeBlocks = [
    { top: '-10%', left: '10%', size: 50, color: 'rgba(59, 130, 246, 0.25)', rotate: 15 },
    { top: '20%', right: '15%', size: 40, color: 'rgba(34, 197, 94, 0.25)', rotate: -10 },
    { bottom: '25%', left: '20%', size: 45, color: 'rgba(236, 72, 153, 0.25)', rotate: 25 },
    { bottom: '15%', right: '10%', size: 55, color: 'rgba(168, 85, 247, 0.25)', rotate: -20 },
  ];

  const titleWords = ["Retention", "isn't", "luck.", "It's", "designed."];

  return (
    <div
      ref={contentRef}
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: '1024px',
        margin: '0 auto',
      }}
    >
      {/* Ambient glow behind content */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          left: '-100px',
          top: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      {/* Floating hat icon */}
      <div
        id="shared-hat"
        ref={iconRef}
        style={{
          position: 'absolute',
          left: '-120px',
          top: '10px',
          width: '110px',
          height: '110px',
          zIndex: 30,
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
        }}
      >
        <img
          src="/hat.svg"
          alt="Hat"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Main Title with word animation */}
      <h1
        ref={titleRef}
        style={{
          fontSize: 'clamp(48px, 8vw, 80px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'white',
          marginBottom: '28px',
          textAlign: 'center',
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: '-1px',
          textShadow: '0 4px 30px rgba(0,0,0,0.3)',
          perspective: '1000px',
        }}
      >
        {titleWords.slice(0, 3).map((word, i) => (
          <span
            key={i}
            ref={(el) => (titleWordsRef.current[i] = el)}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
              transformStyle: 'preserve-3d',
            }}
          >
            {word}
          </span>
        ))}
        <br />
        {titleWords.slice(3).map((word, i) => (
          <span
            key={i + 3}
            ref={(el) => (titleWordsRef.current[i + 3] = el)}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
              transformStyle: 'preserve-3d',
            }}
          >
            {word}
          </span>
        ))}
      </h1>

      {/* Rolling text subtitle */}
      <div
        ref={subtitleRef}
        style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          fontWeight: 400,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        I help product teams boost user retention through
        <br />
        user-centered{' '}
        <span style={{ display: 'inline-block', width: '140px', textAlign: 'left' }}>
          <RollingText words={['gamification', 'interaction', 'engagement', 'design']} />
        </span>{' '}
        design.
      </div>

      {/* Decorative floating blocks */}
      {decorativeBlocks.map((block, i) => (
        <div
          key={i}
          ref={(el) => (blocksRef.current[i] = el)}
          style={{
            position: 'absolute',
            ...block,
            width: `${block.size}px`,
            height: `${block.size}px`,
            backgroundColor: block.color,
            borderRadius: '12px',
            transform: `rotate(${block.rotate}deg)`,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      ))}
    </div>
  );
};

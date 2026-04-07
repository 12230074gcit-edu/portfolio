import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

export const Hero = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const iconRef = useRef(null);
  const glowRef = useRef(null);
  const blocksRef = useRef([]);

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

      // Hat floating motion
      const hatTl = gsap.timeline({ repeat: -1, yoyo: true });
      hatTl.to(iconRef.current, {
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

      // Subtle pulsing glow
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Text entrance with smooth stagger
      const textTl = gsap.timeline();
      textTl
        .from(titleRef.current, { 
          y: 80, 
          opacity: 0, 
          duration: 1.5, 
          ease: 'power4.out', 
          delay: 0.5 
        })
        .from(subtitleRef.current, { 
          y: 50, 
          opacity: 0, 
          duration: 1.2, 
          ease: 'power3.out' 
        }, '-=1');

      // Floating blocks animation
      blocksRef.current.forEach((block, i) => {
        if (!block) return;
        gsap.to(block, {
          y: gsap.utils.random(-15, 15),
          x: gsap.utils.random(-10, 10),
          rotation: gsap.utils.random(-5, 5),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const decorativeBlocks = [
    { top: '10%', left: '10%', size: 50, color: 'rgba(59, 130, 246, 0.25)', rotate: 15 },
    { top: '20%', right: '15%', size: 40, color: 'rgba(34, 197, 94, 0.25)', rotate: -10 },
    { bottom: '25%', left: '20%', size: 45, color: 'rgba(236, 72, 153, 0.25)', rotate: 25 },
    { bottom: '15%', right: '10%', size: 55, color: 'rgba(168, 85, 247, 0.25)', rotate: -20 },
  ];

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

      {/* Main Title */}
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
        }}
      >
        Retention isn&apos;t luck.
        <br />
        It&apos;s designed.
      </h1>

      {/* Subtitle */}
      <p
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
        user-centered gamification design.
      </p>

      {/* Decorative floating blocks */}
      {decorativeBlocks.map((block, i) => (
        <div
          key={i}
          ref={el => blocksRef.current[i] = el}
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

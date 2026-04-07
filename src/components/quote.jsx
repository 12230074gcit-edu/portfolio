import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/flip';

gsap.registerPlugin(ScrollTrigger, Flip);

export const QuoteSection = () => {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const chessRef = useRef(null);
  const hatTargetRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Flip hat into ProjectsSection
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          const hat = document.getElementById('shared-hat');
          if (!hat) return;

          gsap.killTweensOf(hat);
          const state = Flip.getState(hat);
          hatTargetRef.current.appendChild(hat);

          Flip.from(state, {
            duration: 1.5,
            ease: 'power3.inOut',
            absolute: true,
            scale: true,
            onComplete: () => {
              gsap.to(hat, {
                duration: 4,
                y: -20,
                rotation: 8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
              gsap.to(hat, { rotation: '+=15', duration: 10, repeat: -1, ease: 'power1.inOut' });
              gsap.to(hat, { scale: 1.08, duration: 3, repeat: -1, yoyo: true, ease: 'power2.inOut' });
            },
          });
        },
      });

      // Cube scroll animation
      gsap.to(cubeRef.current, {
        y: -200,
        x: 100,
        rotation: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Chess scroll animation
      gsap.to(chessRef.current, {
        y: -220,
        x: -120,
        rotation: -25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Title fade-in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 120 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: 'auto', // auto height based on content
        padding: '60px 20px', // reduced padding
        overflow: 'hidden',
      }}
    >
      {/* TITLE */}
      <h2
        ref={titleRef}
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          color: 'white',
          fontSize: '64px',
          lineHeight: '1.2',
          maxWidth: '900px',
          margin: '0 auto 40px auto', // less bottom margin
        }}
      >
        Designing experiences that turn <br />
        interaction into engagement <br />
        and engagement into loyalty.
      </h2>

      {/* HAT TARGET */}
      <div
        ref={hatTargetRef}
        style={{
          position: 'absolute',
          top: '15%',
          right: '25%',
          width: '100px',
          height: '100px',
          zIndex: 10,
        }}
      />

      {/* CUBE */}
      <img
        ref={cubeRef}
        src="/cube.png"
        alt="cube"
        style={{
          position: 'absolute',
          top: '25%',
          left: '8%',
          width: '160px',
          zIndex: 5,
        }}
      />

      {/* CHESS */}
      <img
        ref={chessRef}
        src="/chess.png"
        alt="chess"
        style={{
          position: 'absolute',
          top: '50%',
          right: '8%',
          width: '140px',
          zIndex: 5,
        }}
      />
    </section>
  );
};
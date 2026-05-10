import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const ringRef = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const progressRef = useRef(null);
  const progressTextRef = useRef(null);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(logoRef.current, { scale: 0, opacity: 0, rotation: -180 });
      gsap.set([ringRef.current, ring2Ref.current, ring3Ref.current], { scale: 0, opacity: 0 });
      gsap.set(glowRef.current, { scale: 0, opacity: 0 });
      gsap.set(progressRef.current, { scaleX: 0 });
      gsap.set(progressTextRef.current, { opacity: 0, y: 20 });

      // Main timeline
      const tl = gsap.timeline();

      // Glow appears first
      tl.to(glowRef.current, {
        scale: 1,
        opacity: 0.6,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Logo entrance with elastic bounce
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)'
      }, '-=0.5');

      // Rings appear with stagger
      tl.to(ringRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.8');

      tl.to(ring2Ref.current, {
        scale: 1,
        opacity: 0.6,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');

      tl.to(ring3Ref.current, {
        scale: 1,
        opacity: 0.3,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');

      // Progress text appears
      tl.to(progressTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');

      // Continuous animations
      // Logo pulse
      gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Ring rotations
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none'
      });

      gsap.to(ring2Ref.current, {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: 'none'
      });

      gsap.to(ring3Ref.current, {
        rotation: 360,
        duration: 16,
        repeat: -1,
        ease: 'none'
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Particles animation
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const angle = (i / 12) * Math.PI * 2;
        const radius = 120;
        
        gsap.set(particle, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          scale: 0.5 + Math.random() * 0.5
        });

        gsap.to(particle, {
          x: Math.cos(angle) * (radius + 30),
          y: Math.sin(angle) * (radius + 30),
          opacity: 0.2 + Math.random() * 0.3,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to(particle, {
          rotation: 360,
          duration: 4 + Math.random() * 4,
          repeat: -1,
          ease: 'none'
        });
      });

      // Progress animation (faster loading - reduced from ~2.3s to ~1s)
      const progressTl = gsap.timeline();
      progressTl.to(progressRef.current, {
        scaleX: 0.4,
        duration: 0.2,
        ease: 'power1.out',
        onUpdate: () => setProgress(Math.round(gsap.getProperty(progressRef.current, 'scaleX') * 100))
      });
      progressTl.to(progressRef.current, {
        scaleX: 0.75,
        duration: 0.3,
        ease: 'power1.out',
        onUpdate: () => setProgress(Math.round(gsap.getProperty(progressRef.current, 'scaleX') * 100))
      });
      progressTl.to(progressRef.current, {
        scaleX: 1,
        duration: 0.2,
        ease: 'power2.out',
        onUpdate: () => setProgress(Math.round(gsap.getProperty(progressRef.current, 'scaleX') * 100))
      });

      // Exit animation (faster)
      progressTl.to(logoRef.current, {
        scale: 1.3,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      }, '+=0.1');

      progressTl.to([ringRef.current, ring2Ref.current, ring3Ref.current, glowRef.current], {
        scale: 1.5,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      }, '-=0.2');

      progressTl.to(containerRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (onComplete) onComplete();
        }
      }, '-=0.15');
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #080C72 0%, #050840 50%, #080C72 100%)',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Ambient glow */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,150,255,0.4) 0%, rgba(100,100,255,0.2) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Particles */}
      <div style={{ position: 'absolute', width: '300px', height: '300px' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '6px',
              height: '6px',
              marginLeft: '-3px',
              marginTop: '-3px',
              borderRadius: '50%',
              background: 'rgba(150,180,255,0.5)',
              boxShadow: '0 0 10px rgba(150,180,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Outer ring 3 */}
      <div
        ref={ring3Ref}
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 30px rgba(100,150,255,0.1)',
        }}
      />

      {/* Outer ring 2 */}
      <div
        ref={ring2Ref}
        style={{
          position: 'absolute',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          border: '1px dashed rgba(255,255,255,0.15)',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'rgba(100,150,255,0.8)',
          borderRightColor: 'rgba(150,100,255,0.5)',
          boxShadow: '0 0 20px rgba(100,150,255,0.3)',
        }}
      />

      {/* Logo */}
      <div
        ref={logoRef}
        style={{
          position: 'relative',
          width: '100px',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 20px rgba(100,150,255,0.5))',
          }}
        />
      </div>

      {/* Progress section */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
        }}
      >
        {/* Progress bar container */}
        <div
          style={{
            width: '200px',
            height: '3px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, rgba(100,150,255,0.8), rgba(150,100,255,0.8))',
              borderRadius: '2px',
              transformOrigin: 'left',
              boxShadow: '0 0 10px rgba(100,150,255,0.5)',
            }}
          />
        </div>

        {/* Progress text */}
        <div
          ref={progressTextRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '3px',
              color: 'rgba(255,255,255,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Loading
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.8)',
              fontVariantNumeric: 'tabular-nums',
              minWidth: '40px',
            }}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}
      >
        Jigme Namgyel
      </div>
    </div>
  );
}

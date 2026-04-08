import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyPhoneMockup({ images = [], projectName = 'App', containerRef }) {
  const phoneRef = useRef(null);
  const wrapperRef = useRef(null);
  const screenRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Placeholder images if none provided
  const displayImages = images.length > 0 ? images : [];

  useEffect(() => {
    if (!phoneRef.current || !containerRef?.current) return;

    const ctx = gsap.context(() => {
      // Floating animation - continuous subtle movement
      gsap.to(phoneRef.current, {
        y: -12,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle rotation on float
      gsap.to(phoneRef.current, {
        rotateY: 3,
        rotateX: -1,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Entrance animation
      gsap.fromTo(phoneRef.current,
        { x: 100, opacity: 0, rotateY: -20 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 1,
        }
      );

      // Scroll-triggered screen changes based on page progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (displayImages.length === 0) return;
          // Map scroll progress (0-70%) to image indices
          const adjustedProgress = Math.min(self.progress / 0.7, 1);
          const newIndex = Math.min(
            Math.floor(adjustedProgress * displayImages.length),
            displayImages.length - 1
          );
          setCurrentIndex(newIndex);
        },
      });

      // Fade out phone when reaching results section (around 70% scroll)
      gsap.to(wrapperRef.current, {
        opacity: 0,
        x: 50,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '65% top',
          end: '75% top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, displayImages.length]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!phoneRef.current) return;
    gsap.to(phoneRef.current, {
      rotateY: mousePos.x,
      rotateX: -mousePos.y,
      duration: 1,
      ease: 'power2.out',
    });
  }, [mousePos]);

  // Screen transition animation
  useEffect(() => {
    if (!screenRef.current) return;
    
    gsap.fromTo(screenRef.current,
      { opacity: 0.7, scale: 0.98, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [currentIndex]);

  // Don't render if no images
  if (displayImages.length === 0) {
    return (
      <div
        ref={wrapperRef}
        style={{
          position: 'fixed',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          perspective: '1500px',
          pointerEvents: 'none',
        }}
      >
        {/* Phone with placeholder */}
        <div
          ref={phoneRef}
          style={{
            position: 'relative',
            width: '220px',
            height: '450px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Phone body */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 50%, #1a1a2e 100%)',
            borderRadius: '36px',
            boxShadow: `
              0 40px 80px rgba(0,0,0,0.5),
              0 0 0 1px rgba(255,255,255,0.1),
              inset 0 0 0 2px rgba(255,255,255,0.05),
              0 0 60px rgba(100,100,255,0.1)
            `,
          }}>
            {/* Screen bezel */}
            <div style={{
              position: 'absolute',
              inset: '10px',
              background: '#000',
              borderRadius: '30px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                textAlign: 'center',
                padding: '20px',
                opacity: 0.4,
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  margin: '0 auto 16px',
                  borderRadius: '12px',
                  background: 'rgba(100,100,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}>
                  +
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                  Add app screenshots
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        perspective: '1500px',
        pointerEvents: 'none',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(100,100,255,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* 3D Phone Frame */}
      <div
        ref={phoneRef}
        style={{
          position: 'relative',
          width: '220px',
          height: '450px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Phone body - outer frame */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 50%, #1a1a2e 100%)',
          borderRadius: '36px',
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.1),
            inset 0 0 0 2px rgba(255,255,255,0.05),
            0 0 60px rgba(100,100,255,0.1)
          `,
          transformStyle: 'preserve-3d',
        }}>
          {/* Side depth - left */}
          <div style={{
            position: 'absolute',
            left: '-6px',
            top: '20%',
            width: '6px',
            height: '60%',
            background: 'linear-gradient(90deg, #0a0a15 0%, #1a1a2e 100%)',
            borderRadius: '3px 0 0 3px',
          }} />
          
          {/* Side depth - right */}
          <div style={{
            position: 'absolute',
            right: '-6px',
            top: '20%',
            width: '6px',
            height: '60%',
            background: 'linear-gradient(90deg, #1a1a2e 0%, #0a0a15 100%)',
            borderRadius: '0 3px 3px 0',
          }} />

          {/* Volume buttons */}
          <div style={{
            position: 'absolute',
            left: '-3px',
            top: '100px',
            width: '3px',
            height: '28px',
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)',
            borderRadius: '2px 0 0 2px',
          }} />
          <div style={{
            position: 'absolute',
            left: '-3px',
            top: '138px',
            width: '3px',
            height: '45px',
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)',
            borderRadius: '2px 0 0 2px',
          }} />

          {/* Power button */}
          <div style={{
            position: 'absolute',
            right: '-3px',
            top: '120px',
            width: '3px',
            height: '35px',
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)',
            borderRadius: '0 2px 2px 0',
          }} />

          {/* Screen bezel */}
          <div style={{
            position: 'absolute',
            inset: '10px',
            background: '#000',
            borderRadius: '30px',
            overflow: 'hidden',
          }}>
            {/* Dynamic Island */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '24px',
              background: '#000',
              borderRadius: '16px',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              {/* Camera */}
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #1a1a3e, #0a0a1a)',
                boxShadow: 'inset 0 0 2px rgba(100,100,255,0.3)',
              }} />
            </div>

            {/* Screen content */}
            <div
              ref={screenRef}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '30px',
                overflow: 'hidden',
                background: '#0a0a1a',
              }}
            >
              <img
                src={displayImages[currentIndex]}
                alt={`${projectName} UI ${currentIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />

              {/* Screen reflection */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.02) 100%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Home indicator */}
            <div style={{
              position: 'absolute',
              bottom: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90px',
              height: '4px',
              background: 'rgba(255,255,255,0.25)',
              borderRadius: '2px',
              zIndex: 20,
            }} />
          </div>

          {/* Glass reflection on frame */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '36px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Shadow underneath */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '15%',
          right: '15%',
          height: '30px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)',
          filter: 'blur(12px)',
        }} />
      </div>

      {/* Screen indicator dots */}
      {displayImages.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          pointerEvents: 'auto',
        }}>
          {displayImages.map((_, i) => (
            <div
              key={i}
              style={{
                width: currentIndex === i ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: currentIndex === i 
                  ? 'linear-gradient(90deg, rgba(100,100,255,0.9), rgba(150,100,255,0.9))' 
                  : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Current screen label */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        opacity: 0.5,
        whiteSpace: 'nowrap',
      }}>
        {projectName} Preview
      </div>
    </div>
  );
}

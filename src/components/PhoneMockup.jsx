import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhoneMockup({ images = [], projectName = 'App' }) {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const screenRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Placeholder images if none provided
  const displayImages = images.length > 0 ? images : [
    '/placeholder-screen-1.png',
    '/placeholder-screen-2.png',
    '/placeholder-screen-3.png',
    '/placeholder-screen-4.png',
  ];

  useEffect(() => {
    if (!containerRef.current || !phoneRef.current) return;

    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(phoneRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle rotation on float
      gsap.to(phoneRef.current, {
        rotateY: 5,
        rotateX: -2,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Scroll-triggered screen change
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * displayImages.length),
            displayImages.length - 1
          );
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
          }
        },
      });

      // Entrance animation
      gsap.fromTo(phoneRef.current,
        { y: 100, opacity: 0, rotateX: 30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [displayImages.length, currentIndex]);

  // Mouse parallax effect
  const handleMouseMove = (e) => {
    if (!phoneRef.current || !isHovered) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    
    gsap.to(phoneRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(phoneRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  // Screen transition animation
  useEffect(() => {
    if (!screenRef.current) return;
    
    gsap.fromTo(screenRef.current,
      { opacity: 0.5, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
  }, [currentIndex]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1500px',
        padding: '60px 20px',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(100,100,255,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* 3D Phone Frame */}
      <div
        ref={phoneRef}
        style={{
          position: 'relative',
          width: '280px',
          height: '580px',
          transformStyle: 'preserve-3d',
          cursor: 'grab',
        }}
      >
        {/* Phone body - outer frame */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 50%, #1a1a2e 100%)',
          borderRadius: '45px',
          boxShadow: `
            0 50px 100px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.1),
            inset 0 0 0 2px rgba(255,255,255,0.05),
            0 0 80px rgba(100,100,255,0.15)
          `,
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0px)',
        }}>
          {/* Side depth effect - left */}
          <div style={{
            position: 'absolute',
            left: '-8px',
            top: '20%',
            width: '8px',
            height: '60%',
            background: 'linear-gradient(90deg, #0a0a15 0%, #1a1a2e 100%)',
            borderRadius: '4px 0 0 4px',
            transform: 'rotateY(-90deg) translateZ(4px)',
          }} />
          
          {/* Side depth effect - right */}
          <div style={{
            position: 'absolute',
            right: '-8px',
            top: '20%',
            width: '8px',
            height: '60%',
            background: 'linear-gradient(90deg, #1a1a2e 0%, #0a0a15 100%)',
            borderRadius: '0 4px 4px 0',
            transform: 'rotateY(90deg) translateZ(4px)',
          }} />

          {/* Volume buttons */}
          <div style={{
            position: 'absolute',
            left: '-4px',
            top: '120px',
            width: '4px',
            height: '35px',
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)',
            borderRadius: '2px 0 0 2px',
          }} />
          <div style={{
            position: 'absolute',
            left: '-4px',
            top: '170px',
            width: '4px',
            height: '55px',
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)',
            borderRadius: '2px 0 0 2px',
          }} />

          {/* Power button */}
          <div style={{
            position: 'absolute',
            right: '-4px',
            top: '150px',
            width: '4px',
            height: '45px',
            background: 'linear-gradient(180deg, #2a2a4e 0%, #1a1a2e 100%)',
            borderRadius: '0 2px 2px 0',
          }} />

          {/* Screen bezel */}
          <div style={{
            position: 'absolute',
            inset: '12px',
            background: '#000',
            borderRadius: '38px',
            overflow: 'hidden',
          }}>
            {/* Dynamic Island / Notch */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '28px',
              background: '#000',
              borderRadius: '20px',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              {/* Camera */}
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #1a1a3e, #0a0a1a)',
                boxShadow: 'inset 0 0 3px rgba(100,100,255,0.3)',
              }} />
            </div>

            {/* Screen content area */}
            <div
              ref={screenRef}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '38px',
                overflow: 'hidden',
                background: '#0a0a1a',
              }}
            >
              {/* App UI Image */}
              {displayImages[currentIndex] ? (
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
              ) : (
                /* Placeholder screen when no image */
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, #1a1a3e 0%, #0a0a1a 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(100,100,255,0.3), rgba(150,100,255,0.2))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: '28px', opacity: 0.7 }}>+</span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.4)',
                    textAlign: 'center',
                    padding: '0 20px',
                  }}>
                    Add your app screenshots
                  </span>
                </div>
              )}

              {/* Screen reflection overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Home indicator */}
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '4px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              zIndex: 20,
            }} />
          </div>

          {/* Glass reflection on frame */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '45px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Shadow */}
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          left: '10%',
          right: '10%',
          height: '40px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
          filter: 'blur(15px)',
          transform: 'rotateX(90deg)',
        }} />
      </div>

      {/* Screen indicator dots */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
      }}>
        {displayImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            style={{
              width: currentIndex === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentIndex === i 
                ? 'linear-gradient(90deg, rgba(100,100,255,0.8), rgba(150,100,255,0.8))' 
                : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            aria-label={`View screen ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        right: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: 0.4,
      }}>
        <span style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          writingMode: 'vertical-rl',
          fontWeight: 500,
        }}>
          Scroll to explore
        </span>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)',
        }} />
      </div>
    </div>
  );
}

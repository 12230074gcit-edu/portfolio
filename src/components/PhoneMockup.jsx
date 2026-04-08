import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StickyPhoneMockup({ images = [], projectName = 'App', containerRef }) {
  const wrapperRef = useRef(null);
  const screenRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const displayImages = images.length > 0 ? images : [];

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!containerRef?.current || displayImages.length === 0) return;

    const ctx = gsap.context(() => {
      // Main scroll trigger for screen changes
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '70% top',
        onUpdate: (self) => {
          const newIndex = Math.min(
            Math.floor(self.progress * displayImages.length),
            displayImages.length - 1
          );
          setCurrentIndex(newIndex);
        },
      });

      // Visibility trigger - fade out before results section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: '65% top',
        end: '75% top',
        onUpdate: (self) => {
          if (wrapperRef.current) {
            const opacity = 1 - self.progress;
            const translateX = self.progress * 100;
            wrapperRef.current.style.opacity = opacity;
            wrapperRef.current.style.transform = `translateY(-50%) translateX(${translateX}px)`;
          }
        },
        onLeave: () => setIsVisible(false),
        onEnterBack: () => setIsVisible(true),
      });
    });

    return () => ctx.revert();
  }, [containerRef, displayImages.length]);

  // Screen transition animation with GSAP
  useEffect(() => {
    if (!screenRef.current || !isLoaded) return;
    
    gsap.fromTo(screenRef.current,
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
    );
  }, [currentIndex, isLoaded]);

  // Don't render if no images or hidden
  if (displayImages.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        right: '3%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        width: 'clamp(280px, 22vw, 400px)',
        aspectRatio: '9 / 18',
        maxHeight: '85vh',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    >
      {/* Aspect ratio container for 3D model */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Spline 3D Phone iframe */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '40px',
            overflow: 'hidden',
            pointerEvents: 'auto',
          }}
        >
          <iframe
            src="https://my.spline.design/mockupcopycopy-kr79x9TmM487liADyGxlXhJw-Q2G/"
            frameBorder="0"
            width="100%"
            height="100%"
            onLoad={handleIframeLoad}
            title={`${projectName} 3D Phone Mockup`}
            style={{
              border: 'none',
              background: 'transparent',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}
            allow="autoplay"
            loading="lazy"
          />
          
          {/* Loading placeholder */}
          {!isLoaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(10, 10, 20, 0.5)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '50%',
                  height: '80%',
                  background: 'linear-gradient(145deg, rgba(30,30,50,0.8) 0%, rgba(15,15,30,0.8) 100%)',
                  borderRadius: '32px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animation: 'shimmer 2s ease-in-out infinite',
                }}
              />
            </div>
          )}
        </div>

        {/* UI Screen Overlay - positioned to align with phone screen */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44%',
            height: '52%',
            borderRadius: 'clamp(16px, 2vw, 28px)',
            overflow: 'hidden',
            pointerEvents: 'none',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
          }}
        >
          <div
            ref={screenRef}
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              background: '#0a0a0f',
            }}
          >
            <img
              src={displayImages[currentIndex]}
              alt={`${projectName} Screen ${currentIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                display: 'block',
              }}
              draggable={false}
            />
          </div>
          
          {/* Subtle screen reflection overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(165deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: 'inherit',
            }}
          />
        </div>

        {/* Progress indicator dots */}
        {displayImages.length > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 'clamp(4px, 0.5vw, 8px)',
              padding: '8px 12px',
              background: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease 0.3s',
            }}
          >
            {displayImages.map((_, i) => (
              <div
                key={i}
                style={{
                  width: currentIndex === i ? 'clamp(16px, 1.5vw, 24px)' : 'clamp(5px, 0.5vw, 8px)',
                  height: 'clamp(5px, 0.5vw, 8px)',
                  borderRadius: '4px',
                  background: currentIndex === i
                    ? 'linear-gradient(90deg, #8B5CF6, #6366F1)'
                    : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: currentIndex === i
                    ? '0 0 12px rgba(139, 92, 246, 0.6)'
                    : 'none',
                }}
              />
            ))}
          </div>
        )}

        {/* Floating glow effect behind phone */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(0.98);
          }
          50% { 
            opacity: 0.5;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

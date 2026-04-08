import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function StickyPhoneMockup({ images = [], projectName = 'App', containerRef }) {
  const wrapperRef = useRef(null);
  const screenRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  // Use provided images or empty array
  const displayImages = images.length > 0 ? images : [];

  useEffect(() => {
    if (!containerRef?.current) return;

    const ctx = gsap.context(() => {
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
        x: 80,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '60% top',
          end: '72% top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, displayImages.length]);

  // Screen transition animation
  useEffect(() => {
    if (!screenRef.current) return;
    
    gsap.fromTo(screenRef.current,
      { opacity: 0.6, scale: 0.96, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [currentIndex]);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  // Don't render if no images
  if (displayImages.length === 0) {
    return null;
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        right: '2%',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        pointerEvents: 'none',
        width: '380px',
        height: '700px',
      }}
    >
      {/* Spline 3D Phone Model */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'auto',
        }}
      >
        <Suspense fallback={
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '180px',
              height: '380px',
              background: 'linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)',
              borderRadius: '36px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/kr79x9TmM487liADyGxlXhJw/scene.splinecode"
            onLoad={handleSplineLoad}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Suspense>
      </div>

      {/* UI Screen Overlay - positioned over the phone screen */}
      <div
        style={{
          position: 'absolute',
          // Adjust these values to align with the Spline phone screen
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '168px', 
          height: '364px',
          borderRadius: '24px',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: isSplineLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <div
          ref={screenRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
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
        </div>
      </div>

      {/* Screen indicator dots */}
      {displayImages.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '30px',
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
                boxShadow: currentIndex === i ? '0 0 10px rgba(100,100,255,0.5)' : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

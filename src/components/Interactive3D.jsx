import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Floating 3D Torus
export function FloatingTorus({ size = 200, position = {} }) {
  const containerRef = useRef(null);
  const torusRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !torusRef.current) return;

    // Continuous rotation
    gsap.to(torusRef.current, {
      rotateX: 360,
      rotateY: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Floating motion
    gsap.to(containerRef.current, {
      y: -20,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angleX = (e.clientY - centerY) / 30;
      const angleY = (e.clientX - centerX) / 30;
      
      gsap.to(containerRef.current, {
        rotateX: -angleX,
        rotateY: angleY,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        pointerEvents: 'auto',
        cursor: 'grab',
      }}
    >
      <div
        ref={torusRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Create torus-like shape with rings */}
        {[0, 45, 90, 135].map((angle, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: '10%',
              borderRadius: '50%',
              border: `3px solid rgba(${100 + i * 30}, ${150 + i * 20}, 255, ${0.3 + i * 0.1})`,
              transform: `rotateY(${angle}deg)`,
              boxShadow: `0 0 30px rgba(100, 150, 255, 0.2), inset 0 0 30px rgba(100, 150, 255, 0.1)`,
            }}
          />
        ))}
        {/* Inner glow */}
        <div style={{
          position: 'absolute',
          inset: '30%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,150,255,0.3) 0%, transparent 70%)',
          filter: 'blur(15px)',
        }} />
      </div>
    </div>
  );
}

// Floating 3D Crystal/Gem
export function FloatingCrystal({ size = 150, position = {} }) {
  const containerRef = useRef(null);
  const crystalRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !crystalRef.current) return;

    // Rotation
    gsap.to(crystalRef.current, {
      rotateY: 360,
      duration: 15,
      ease: 'none',
      repeat: -1,
    });

    // Floating
    gsap.to(containerRef.current, {
      y: -15,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Pulse glow
    gsap.to(containerRef.current.querySelector('.crystal-glow'), {
      opacity: 0.8,
      scale: 1.2,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size * 1.5}px`,
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        ref={crystalRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Crystal faces */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '50%',
              height: '70%',
              left: '25%',
              top: '15%',
              background: `linear-gradient(180deg, rgba(${150 + i * 15}, ${100 + i * 20}, 255, 0.15) 0%, rgba(100, 150, 255, 0.05) 100%)`,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              transform: `rotateY(${angle}deg) translateZ(${size / 4}px)`,
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(5px)',
            }}
          />
        ))}
        {/* Glow */}
        <div
          className="crystal-glow"
          style={{
            position: 'absolute',
            inset: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(150,100,255,0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
}

// Interactive 3D Sphere
export function FloatingSphere({ size = 180, position = {} }) {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Floating motion
    gsap.to(containerRef.current, {
      y: -25,
      duration: 5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Rotate dots
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        rotateX: 360,
        rotateY: 360,
        rotateZ: 360,
        duration: 20 + i * 2,
        ease: 'none',
        repeat: -1,
      });
    });

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      
      gsap.to(containerRef.current, {
        rotateX: -y,
        rotateY: x,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(containerRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Generate points on sphere
  const points = [];
  const rings = 8;
  const pointsPerRing = 12;
  for (let r = 0; r < rings; r++) {
    for (let p = 0; p < pointsPerRing; p++) {
      const phi = (r / rings) * Math.PI;
      const theta = (p / pointsPerRing) * Math.PI * 2;
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      });
    }
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        cursor: 'grab',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}>
        {/* Latitude rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={`ring-${i}`}
            ref={el => dotsRef.current[i] = el}
            style={{
              position: 'absolute',
              inset: `${15 + i * 10}%`,
              borderRadius: '50%',
              border: `1px solid rgba(100, 150, 255, ${0.3 - i * 0.08})`,
              transformStyle: 'preserve-3d',
              transform: `rotateX(${60 + i * 30}deg)`,
            }}
          />
        ))}
        
        {/* Core glow */}
        <div style={{
          position: 'absolute',
          inset: '25%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,150,255,0.4) 0%, rgba(150,100,255,0.2) 50%, transparent 70%)',
          filter: 'blur(15px)',
        }} />
        
        {/* Outer shell */}
        <div style={{
          position: 'absolute',
          inset: '5%',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)',
        }} />
      </div>
    </div>
  );
}

// Animated 3D Cube Grid
export function FloatingCubeGrid({ size = 200, position = {} }) {
  const containerRef = useRef(null);
  const cubesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Floating
    gsap.to(containerRef.current, {
      y: -20,
      rotateY: 15,
      duration: 6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Animate individual cubes
    cubesRef.current.forEach((cube, i) => {
      if (!cube) return;
      gsap.to(cube, {
        y: gsap.utils.random(-10, 10),
        duration: 2 + Math.random() * 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.1,
      });
    });
  }, []);

  const cubeCount = 9;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '8px',
        transformStyle: 'preserve-3d',
        transform: 'rotateX(20deg) rotateY(-20deg)',
      }}>
        {[...Array(cubeCount)].map((_, i) => (
          <div
            key={i}
            ref={el => cubesRef.current[i] = el}
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, rgba(${80 + i * 15}, ${100 + i * 10}, 255, 0.15) 0%, rgba(100, 150, 255, 0.05) 100%)`,
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 0 20px rgba(100,150,255,0.05)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default { FloatingTorus, FloatingCrystal, FloatingSphere, FloatingCubeGrid };

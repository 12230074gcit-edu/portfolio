import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Navbar } from './components/navbar';
import { Hero } from './components/Hero';
import { TetrisCanvas } from './components/tetris';
import { QuoteSection } from './components/quote';
import ProjectsSection from './components/ProjectSection';
import AboutMe from './components/aboutMeSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/Contact';
import HandsLayer from './components/handsLayer';

export default function App() {
  const mainRef = useRef(null);
  const gridRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    gsap.to(mainRef.current, { opacity: 1, duration: 1.5, ease: 'power2.inOut' });

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(gridRef.current, { x, y, duration: 2, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    circlesRef.current.forEach((circle) => {
      if (!circle) return;
      const randomX = gsap.utils.random(-30, 30);
      const randomY = gsap.utils.random(-30, 30);
      const duration = gsap.utils.random(4, 8);
      gsap.to(circle, { x: randomX, y: randomY, duration, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main ref={mainRef} style={{ position: 'relative', width: '100%', minHeight: '100vh', opacity: 0, overflowX: 'hidden' }}>
      
      {/* BACKGROUND */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#080C72' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(200px)' }} />
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: '-50px',
            opacity: 0.15,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* ✅ FIXED: HANDS MOVED HERE */}
      <HandsLayer />

      {/* NAVBAR */}
      <div style={{ position: 'relative', zIndex: 20 }}>
        <Navbar />
      </div>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {[{ top: '15%', left: '0%', color: '#070DC7', size: 280 },
            { top: '15%', right: '-2%', color: '#1A64BA', size: 280 },
            { bottom: '5%', left: '5%', color: '#6048B7', size: 320 },
            { bottom: '1%', right: '1%', color: '#6A44F4', size: 290 },
            { top: '50%', left: '50%', color: '#7C0BB4', size: 350, center: true }].map((c, i) => (
            <div
              key={i}
              ref={el => circlesRef.current[i] = el}
              onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.2, opacity: 1, duration: 0.3 })}
              onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, opacity: 0.8, duration: 0.3 })}
              style={{
                position: 'absolute',
                ...(c.center ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' } : c),
                width: `${c.size}px`,
                height: `${c.size}px`,
                backgroundColor: c.color,
                borderRadius: '50%',
                filter: 'blur(40px)',
                opacity: 0.8,
              }}
            />
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
          <TetrisCanvas />
        </div>

        <div style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
        </div>
      </section>

      {/* QUOTE */}
      <QuoteSection />

      <ProjectsSection />
      <AboutMe/>
      <ServicesSection/>
      <ContactSection />

    </main>
  );
}
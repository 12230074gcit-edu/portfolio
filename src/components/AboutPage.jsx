import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Bubbles from './Bubbles';

export default function AboutPage() {
  const pageRef = useRef(null);
  const avatarRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    // Page entrance
    gsap.fromTo(pageRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Title animation
    gsap.fromTo('.about-page-title',
      { y: 100, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.about-page-subtitle',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
    );

    // Bio paragraphs
    gsap.fromTo('.bio-text',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
    );

    // Avatar entrance
    gsap.fromTo(avatarRef.current,
      { scale: 0.8, opacity: 0, x: 100 },
      { scale: 1, opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    );

    // Floating avatar
    gsap.to(avatarRef.current, {
      y: -15,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: 'sine.inOut',
    });

    // Stats counter animation
    statsRef.current.forEach((stat, i) => {
      if (!stat) return;
      gsap.fromTo(stat,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.7 + i * 0.1, ease: 'power3.out' }
      );
    });

    // Skills animation
    gsap.fromTo('.skill-tag',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.9, ease: 'back.out(1.7)' }
    );

    // Grid parallax
    const handleMouseMove = (e) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(gridRef.current, { x, y, duration: 1.5, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
  ];

  const skills = [
    'UI/UX Design', 'Gamification', 'Interaction Design', 'Prototyping',
    'Figma', 'After Effects', 'React', 'Three.js', 'GSAP', 'Blender'
  ];

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: '100vh',
        position: 'relative',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #080C72 0%, #0a0e5c 50%, #080C72 100%)'
        }} />

        {/* Animated grid */}
        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: '-50px',
            opacity: 0.06,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
          }}
        />

        {/* Glow orbs */}
        <div style={{
          position: 'absolute',
          left: '60%',
          top: '30%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.12), transparent 60%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          left: '10%',
          bottom: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(150, 100, 255, 0.08), transparent 60%)',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Back button */}
      <Link
        to="/"
        onMouseEnter={(e) => gsap.to(e.currentTarget, { x: -5, opacity: 1, duration: 0.3 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, opacity: 0.7, duration: 0.3 })}
        style={{
          position: 'fixed',
          top: '40px',
          left: '40px',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 600,
          opacity: 0.7,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          letterSpacing: '1px',
        }}
      >
        <span style={{ fontSize: '20px' }}>&#8592;</span> Back
      </Link>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '100px 60px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Left - Content */}
        <div>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '6px',
              opacity: 0.5,
              marginBottom: '16px',
              fontWeight: 500,
            }}
          >
            ABOUT ME
          </p>
          
          <h1
            className="about-page-title"
            style={{
              fontSize: 'clamp(44px, 7vw, 68px)',
              fontWeight: 700,
              marginBottom: '24px',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              textShadow: '0 0 80px rgba(255,255,255,0.15)',
            }}
          >
            Jigme
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Namgyel
            </span>
          </h1>

          <p
            className="about-page-subtitle"
            style={{
              fontSize: '18px',
              opacity: 0.7,
              marginBottom: '32px',
              fontWeight: 500,
            }}
          >
            Interactive Designer & Creative Developer
          </p>

          <div style={{ marginBottom: '40px' }}>
            <p
              className="bio-text"
              style={{
                fontSize: '15px',
                lineHeight: 1.9,
                opacity: 0.8,
                marginBottom: '20px',
                maxWidth: '500px',
              }}
            >
              I&apos;m an aspiring Interactive Designer passionate about creating engaging, 
              user-centered digital experiences. My focus lies in blending creativity with 
              functionality to craft memorable interactions.
            </p>
            <p
              className="bio-text"
              style={{
                fontSize: '15px',
                lineHeight: 1.9,
                opacity: 0.8,
                maxWidth: '500px',
              }}
            >
              With a background in gamification design and interactive media, I specialize 
              in turning complex ideas into intuitive, delightful user experiences that 
              drive engagement and retention.
            </p>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginBottom: '40px',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[i] = el)}
                style={{
                  padding: '20px 0',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                  paddingRight: i < stats.length - 1 ? '40px' : '0',
                }}
              >
                <p
                  style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    marginBottom: '8px',
                    background: 'linear-gradient(135deg, #fff 0%, rgba(200,200,255,0.8) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: '12px', opacity: 0.5, letterSpacing: '1px' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '4px', opacity: 0.4, marginBottom: '16px' }}>
              SKILLS
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.05,
                      background: 'rgba(255,255,255,0.15)',
                      borderColor: 'rgba(255,255,255,0.3)',
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      background: 'rgba(255,255,255,0.05)',
                      borderColor: 'rgba(255,255,255,0.1)',
                      duration: 0.3,
                    });
                  }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '30px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Avatar */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Glow behind avatar */}
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              filter: 'blur(100px)',
            }}
          />

          {/* Avatar frame */}
          <div
            ref={avatarRef}
            style={{
              position: 'relative',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 40px 80px rgba(0,0,0,0.3), 0 0 60px rgba(100,100,255,0.1)',
            }}
          >
            <img
              src="/me.png"
              alt="Jigme Namgyel"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />

            {/* Decorative ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-20px',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.05)',
                animation: 'spin 30s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '-40px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.03)',
                animation: 'spin 40s linear infinite reverse',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bubbles */}
      <Bubbles />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

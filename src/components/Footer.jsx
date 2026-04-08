import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const projectsRef = useRef([]);
  const quoteRef = useRef(null);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about-section' },
    { name: 'Services', href: '#services-section' },
    { name: 'Contact', href: '#contact' },
  ];

  const projects = [
    { name: 'Gamification Design', href: '#' },
    { name: 'Mobile Apps', href: '#' },
    { name: 'Web Development', href: '#' },
    { name: 'UI/UX Design', href: '#' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote entrance
      gsap.from(quoteRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });

      // Links stagger animation
      gsap.from(linksRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      });

      gsap.from(projectsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleLinkHover = (e) => {
    gsap.to(e.currentTarget, {
      x: 8,
      color: '#fff',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: 'rgba(255,255,255,0.6)',
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        padding: '80px 60px 40px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        zIndex: 10,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.08), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '60px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Quote Section */}
        <div ref={quoteRef} style={{ gridColumn: 'span 1' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '3px',
              marginBottom: '20px',
              opacity: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Philosophy
          </h3>
          <p
            style={{
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontWeight: 600,
              lineHeight: 1.5,
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built for engagement.
            <br />
            Designed for retention.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '3px',
              marginBottom: '24px',
              opacity: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Quick Links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {quickLinks.map((link, i) => (
              <li key={link.name} style={{ marginBottom: '14px' }}>
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  href={link.href}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '3px',
              marginBottom: '24px',
              opacity: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Projects
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {projects.map((project, i) => (
              <li key={project.name} style={{ marginBottom: '14px' }}>
                <a
                  ref={(el) => (projectsRef.current[i] = el)}
                  href={project.href}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'inline-block',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {project.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '60px auto 0',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p
          style={{
            fontSize: '13px',
            opacity: 0.4,
            fontWeight: 400,
          }}
        >
          2024 Jigme Namgyel. All rights reserved.
        </p>

        <div style={{ display: 'flex', gap: '24px' }}>
          {['LinkedIn', 'GitHub', 'Dribbble'].map((social) => (
            <a
              key={social}
              href="#"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -3, opacity: 1, duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, opacity: 0.5, duration: 0.3 })}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                opacity: 0.5,
                transition: 'opacity 0.3s ease',
              }}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

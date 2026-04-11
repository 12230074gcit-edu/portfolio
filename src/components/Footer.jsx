import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const projectsRef = useRef([]);
  const quoteRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about-section' },
    { name: 'Services', href: '#services-section' },
    { name: 'Projects', href: '#projects-section' },
    { name: 'Download CV', href: '/12230074_CV.pdf', download: true },
    { name: 'Resume Video', href: '/about#video-section' },
  ];

  const projects = [
    { name: 'QUBE', href: '#' },
    { name: 'INNEED', href: '#' },
    { name: 'TOVO', href: '#' },

  ];

  const socials = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/jigmenamgyel' },
    { name: 'GitHub', href: 'https://github.com/12230074gcit-edu' },
    { name: 'Facebook', href: 'https://www.facebook.com/jigme.namgyel.7146' },
    { name: 'WhatsApp', href: 'https://wa.me/97517364568?text=Hi%2C%20I%20am%20Jigme%20Namgyel%2C%20a%20UI%2FUX%20designer%20passionate%20about%20user%20engagement%20and%20interactive%20experiences.%20How%20may%20I%20assist%20you%3F' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );

      // Logo entrance
      gsap.fromTo(logoRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Quote entrance
      gsap.fromTo(quoteRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );

      // Links stagger animation
      gsap.fromTo(linksRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(projectsRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleLinkHover = (e) => {
    gsap.to(e.currentTarget, {
      x: 10,
      color: '#fff',
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(e.currentTarget.querySelector('.link-arrow'), {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: 'rgba(255,255,255,0.5)',
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(e.currentTarget.querySelector('.link-arrow'), {
      opacity: 0,
      x: -10,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        padding: '0 60px 50px',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        zIndex: 10,
      }}
    >
      {/* Top line */}
      <div
        ref={lineRef}
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.2) 80%, transparent 100%)',
          transformOrigin: 'center',
          marginBottom: '80px',
        }}
      />

      {/* Main Grid */}
      <div
        style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '60px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Brand & Quote Column */}
        <div>
          {/* Logo/Name */}
          <div ref={logoRef} style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-1px',
              marginBottom: '8px',
            }}>
              Jigme Namgyel
            </h2>
            <p style={{
              fontSize: '13px',
              opacity: 0.4,
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}>
              Interactive Designer
            </p>
          </div>

          {/* Philosophy Quote */}
          <div ref={quoteRef}>
            <p
              style={{
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 600,
                lineHeight: 1.4,
                maxWidth: '380px',
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
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
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '4px',
              marginBottom: '28px',
              opacity: 0.3,
              textTransform: 'uppercase',
            }}
          >
            Quick Links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {quickLinks.map((link, i) => (
              <li key={link.name} style={{ marginBottom: '16px' }}>
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  href={link.href}
                  {...(link.download ? { download: true, target: '_blank' } : {})}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {link.name}
                  <span
                    className="link-arrow"
                    style={{
                      opacity: 0,
                      transform: 'translateX(-10px)',
                      fontSize: '12px',
                    }}
                  >
                    &#8594;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h3
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '4px',
              marginBottom: '28px',
              opacity: 0.3,
              textTransform: 'uppercase',
            }}
          >
            Projects
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {projects.map((project, i) => (
              <li key={project.name} style={{ marginBottom: '16px' }}>
                <a
                  ref={(el) => (projectsRef.current[i] = el)}
                  href={project.href}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {project.name}
                  <span
                    className="link-arrow"
                    style={{
                      opacity: 0,
                      transform: 'translateX(-10px)',
                      fontSize: '12px',
                    }}
                  >
                    &#8594;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '4px',
              marginBottom: '28px',
              opacity: 0.3,
              textTransform: 'uppercase',
            }}
          >
            Connect
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {socials.map((social) => (
              <li key={social.name} style={{ marginBottom: '16px' }}>
                <a
                  href={social.href}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { x: 8, color: '#fff', duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { x: 0, color: 'rgba(255,255,255,0.5)', duration: 0.3 });
                  }}
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    display: 'inline-block',
                  }}
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          maxWidth: '1300px',
          margin: '80px auto 0',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
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
            opacity: 0.3,
            fontWeight: 400,
          }}
        >
          &copy; {new Date().getFullYear()} Jigme Namgyel. All rights reserved.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <span style={{ fontSize: '13px', opacity: 0.3 }}>
            Crafted with passion
          </span>
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(100,255,150,0.8)',
              boxShadow: '0 0 10px rgba(100,255,150,0.5)',
            }}
          />
        </div>
      </div>

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '0',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.06), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
    </footer>
  );
}

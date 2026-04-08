import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Bubbles from './Bubbles';

export default function ContactPage() {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const fieldsRef = useRef([]);
  const gridRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Page entrance animation
    gsap.fromTo(pageRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Title entrance
    gsap.fromTo('.contact-page-title',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );

    gsap.fromTo('.contact-page-subtitle',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
    );

    // Form fields stagger
    gsap.fromTo(fieldsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // Info cards
    gsap.fromTo('.info-card',
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.6,
      }
    );

    // Grid parallax
    const handleMouseMove = (e) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(gridRef.current, {
        x, y,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputFocus = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: 'rgba(255,255,255,0.5)',
      boxShadow: '0 0 40px rgba(255,255,255,0.15), inset 0 0 20px rgba(255,255,255,0.05)',
      duration: 0.4,
    });
  };

  const handleInputBlur = (e) => {
    gsap.to(e.currentTarget, {
      borderColor: 'rgba(255,255,255,0.1)',
      boxShadow: '0 0 0 rgba(255,255,255,0)',
      duration: 0.4,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      scale: 0.98,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        setFormData({ name: '', email: '', message: '' });
      },
    });
  };

  const infoCards = [
    { label: 'Email', value: 'hello@jigme.design', icon: 'M' },
    { label: 'Location', value: 'Bhutan', icon: 'L' },
    { label: 'Availability', value: 'Open to Projects', icon: 'A' },
  ];

  const inputStyle = {
    width: '100%',
    padding: '20px 26px',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    color: '#fff',
    fontSize: '15px',
    fontFamily: "'Montserrat', sans-serif",
    outline: 'none',
    transition: 'all 0.4s ease',
  };

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
      {/* Premium Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}>
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
          left: '10%',
          top: '20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.15), transparent 60%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          right: '5%',
          bottom: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(150, 100, 255, 0.1), transparent 60%)',
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
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '120px 60px 80px',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '100px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left - Form */}
        <div>
          <h1
            className="contact-page-title"
            style={{
              fontSize: 'clamp(52px, 9vw, 80px)',
              fontWeight: 700,
              marginBottom: '20px',
              letterSpacing: '-3px',
              lineHeight: 1.05,
              textShadow: '0 0 80px rgba(255,255,255,0.2)',
            }}
          >
            Let&apos;s Create
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Together
            </span>
          </h1>
          <p
            className="contact-page-subtitle"
            style={{
              fontSize: '17px',
              opacity: 0.6,
              marginBottom: '60px',
              maxWidth: '420px',
              lineHeight: 1.8,
            }}
          >
            Have a project in mind? I&apos;d love to hear about it. Drop me a message and let&apos;s discuss how we can work together.
          </p>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div ref={(el) => (fieldsRef.current[0] = el)} style={{ marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={inputStyle}
              />
            </div>

            <div ref={(el) => (fieldsRef.current[1] = el)} style={{ marginBottom: '24px' }}>
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={inputStyle}
              />
            </div>

            <div ref={(el) => (fieldsRef.current[2] = el)} style={{ marginBottom: '40px' }}>
              <textarea
                placeholder="Tell me about your project..."
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={{
                  ...inputStyle,
                  resize: 'none',
                }}
              />
            </div>

            <button
              ref={(el) => (fieldsRef.current[3] = el)}
              type="submit"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.03,
                  y: -4,
                  boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 50px rgba(255,255,255,0.25)',
                  duration: 0.4,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  y: 0,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  duration: 0.4,
                });
              }}
              style={{
                width: '100%',
                padding: '22px 40px',
                borderRadius: '16px',
                border: 'none',
                background: '#fff',
                color: '#080C72',
                fontWeight: 700,
                fontSize: '16px',
                fontFamily: "'Montserrat', sans-serif",
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                letterSpacing: '1px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2.5s infinite',
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>Send Message</span>
            </button>
          </form>
        </div>

        {/* Right - Info Cards */}
        <div style={{ paddingTop: '100px' }}>
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="info-card"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  y: -8,
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.1)',
                  duration: 0.4,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  y: 0,
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 0 0 rgba(0,0,0,0)',
                  duration: 0.4,
                });
              }}
              style={{
                padding: '32px 36px',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                cursor: 'default',
                transition: 'all 0.4s ease',
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 700,
              }}>
                {card.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    opacity: 0.4,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: 600,
                  }}
                >
                  {card.value}
                </p>
              </div>
            </div>
          ))}

          {/* Quote card */}
          <div
            style={{
              marginTop: '50px',
              padding: '36px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(100,100,255,0.12) 0%, rgba(150,100,255,0.06) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                opacity: 0.8,
                fontStyle: 'italic',
              }}
            >
              &ldquo;I typically respond within 24-48 hours. For urgent inquiries, feel free to reach out on LinkedIn.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bubbles */}
      <Bubbles />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </div>
  );
}

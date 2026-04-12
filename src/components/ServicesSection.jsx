import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Interactive 3D Floating Element
const Interactive3DElement = () => {
  const elementRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    const inner = innerRef.current;
    if (!element || !inner) return;

    // Floating animation
    gsap.to(element, {
      y: -20,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Rotation animation
    gsap.to(inner, {
      rotateY: 360,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angleX = (e.clientY - centerY) / 20;
      const angleY = (e.clientX - centerX) / 20;
      
      gsap.to(element, {
        rotateX: -angleX,
        rotateY: angleY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '300px',
        height: '300px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        cursor: 'grab',
        zIndex: 10,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D Cube faces */}
        {[
          { rotateY: 0, translateZ: 100 },
          { rotateY: 180, translateZ: 100 },
          { rotateY: 90, translateZ: 100 },
          { rotateY: -90, translateZ: 100 },
          { rotateX: 90, translateZ: 100 },
          { rotateX: -90, translateZ: 100 },
        ].map((face, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              left: '50px',
              top: '50px',
              background: `linear-gradient(135deg, rgba(100,150,255,${0.1 + i * 0.03}) 0%, rgba(150,100,255,${0.05 + i * 0.02}) 100%)`,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              transform: `rotateX(${face.rotateX || 0}deg) rotateY(${face.rotateY || 0}deg) translateZ(${face.translateZ}px)`,
              boxShadow: '0 0 40px rgba(100,150,255,0.1), inset 0 0 40px rgba(255,255,255,0.02)',
            }}
          />
        ))}
        
        {/* Inner glow */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100,150,255,0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const tagsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.from(".services-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".services-subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Blocks entrance with stagger
      gsap.from(".dev-block", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".design-block", {
        y: 120,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Tags stagger animation
      gsap.from(tagsRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const devSkills = [
    "React", "Javascript", "Flutter", "Figma",
    "Dart", "PostgreSQL", "DBMS",
    "Mobile App", "Web App"
  ];

  const designSkills = [
    "Branding", "UX/UI", "Videos", "Figma",
    "Adobe Photoshop", "Adobe Illustrator",
    "Icons", "Reels", "Adobe Premiere Pro"
  ];

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="services-section"
      style={{
        minHeight: "auto",
        padding: "80px 80px 40px",
        color: "#fff",
        position: "relative",
        zIndex: 5,
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          right: "20%",
          top: "40%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(100, 100, 255, 0.1), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Interactive 3D Element */}
      <Interactive3DElement />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          className="services-title"
          style={{
            fontSize: "clamp(60px, 10vw, 96px)",
            fontWeight: 700,
            letterSpacing: "-2px",
            textShadow: "0 0 60px rgba(255,255,255,0.15)",
          }}
        >
          SERVICES
        </h1>
        <p
          className="services-subtitle"
          style={{
            opacity: 0.5,
            fontSize: "clamp(18px, 3vw, 28px)",
            marginTop: "16px",
            fontWeight: 400,
          }}
        >
          You have the service, we make it engaging.
        </p>
      </div>

      {/* Development Section */}
      <div className="dev-block services-dev-block" style={{ marginBottom: "60px", width: "700px", maxWidth: "100%" }}>
        <div style={glassSlim}>
          <h2 style={sectionTitle}>Development</h2>
        </div>
        <div style={glassCard}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {devSkills.map((skill, i) => (
              <span
                key={skill}
                ref={el => tagsRef.current[i] = el}
                style={tagStyle}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1.08,
                    y: -3,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)",
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    y: 0,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    duration: 0.3,
                  });
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Design Section - Aligned right */}
      <div
        className="design-block services-design-wrapper"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div className="services-design-block" style={{ width: "60%", maxWidth: "600px" }}>
          <div style={glassSlim}>
            <h2 style={sectionTitle}>Design</h2>
          </div>
          <div style={glassCard}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              {designSkills.map((skill, i) => (
                <span
                  key={skill}
                  ref={el => tagsRef.current[devSkills.length + i] = el}
                  style={tagStyle}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.08,
                      y: -3,
                      boxShadow: "0 12px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)",
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      y: 0,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      duration: 0.3,
                    });
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Styles
const glassSlim = {
  padding: "20px 32px",
  borderRadius: "18px",
  marginBottom: "20px",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const glassCard = {
  padding: "32px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const sectionTitle = {
  fontSize: "28px",
  fontWeight: 600,
  fontFamily: "'Montserrat', sans-serif",
  letterSpacing: "-0.5px",
};

const tagStyle = {
  background: "#fff",
  color: "#080C72",
  padding: "12px 22px",
  borderRadius: "14px",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "'Montserrat', sans-serif",
  cursor: "default",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  transition: "background 0.3s ease",
};

// Add pulse keyframes and responsive styles via style injection
if (typeof document !== 'undefined' && !document.getElementById('services-keyframes')) {
  const style = document.createElement('style');
  style.id = 'services-keyframes';
  style.textContent = `
    @keyframes pulse {
      0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
    }
    @media (max-width: 1024px) {
      .services-section {
        padding: 60px 40px 40px !important;
      }
      .services-section > div:nth-child(3) {
        display: none !important;
      }
      .services-dev-block {
        width: 100% !important;
      }
      .services-design-wrapper {
        justify-content: flex-start !important;
      }
      .services-design-block {
        width: 100% !important;
        max-width: 100% !important;
      }
    }
    @media (max-width: 768px) {
      .services-section {
        padding: 50px 24px 30px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

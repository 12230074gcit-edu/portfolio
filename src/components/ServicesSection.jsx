import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
      style={{
        minHeight: "100vh",
        padding: "120px 80px",
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

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "100px" }}>
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
      <div className="dev-block" style={{ marginBottom: "60px" }}>
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
        className="design-block"
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "60%", maxWidth: "600px" }}>
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

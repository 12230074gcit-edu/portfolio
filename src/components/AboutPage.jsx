import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bubbles from './Bubbles';
import { Navbar } from './navbar';
import Footer from './Footer';
import ContactSection from './Contact';
import { FloatingTorus, FloatingCrystal, FloatingSphere, FloatingCubeGrid } from './Interactive3D';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const pageRef = useRef(null);
  const avatarRef = useRef(null);
  const gridRef = useRef(null);
  const imgRef = useRef(null);
  const circlesRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Page entrance
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
      );

      // Floating circles
      circlesRef.current.forEach((circle) => {
        if (!circle) return;
        gsap.to(circle, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Title animation
      gsap.fromTo(
        ".about-page-title",
        { y: 100, opacity: 0, rotateX: -45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        ".about-page-subtitle",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 },
      );

      // Bio paragraphs
      gsap.fromTo(
        ".bio-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      // Avatar entrance
      gsap.fromTo(
        avatarRef.current,
        { scale: 0.8, opacity: 0, x: 100 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        },
      );

      // Floating avatar
      gsap.to(avatarRef.current, {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
      // Image floating (separate from circle)
      gsap.to(imgRef.current, {
        y: -25,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
      });
      // Stats animation
      gsap.fromTo(
        ".stat-box",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.7,
          ease: "power3.out",
        },
      );

      // Skills animation
      gsap.fromTo(
        ".skill-tag",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.9,
          ease: "back.out(1.7)",
        },
      );

      // Education items
      gsap.utils.toArray(".education-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".education-section", start: "top 80%" },
          },
        );
      });

      // Experience items
      gsap.utils.toArray(".experience-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: ".experience-section", start: "top 80%" },
          },
        );
      });

      // Certifications
      gsap.utils.toArray(".cert-item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".cert-section", start: "top 80%" },
          },
        );
      });

      // Grid parallax
      const handleMouseMove = (e) => {
        if (!gridRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        gsap.to(gridRef.current, { x, y, duration: 1.5, ease: "power2.out" });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Completed' },
    { value: '5+', label: 'Happy Clients' },
  ];

  const technicalSkills = [
    'UI/UX Design', 'Figma', 'Adobe Creative Suite', 'WordPress',
    'React JS', 'HTML/CSS', 'JavaScript', 'Flutter',
    'Node.JS', 'MongoDB', 'Firebase', 'PostgreSQL'
  ];

  const softSkills = [
    'Team Collaboration', 'Effective Communication', 'Adaptability',
    'Empathy', 'Patience', 'Decision Making', 'Punctuality'
  ];

  const education = [
    {
      degree: 'Bachelors of Interactive Designing and Development',
      school: 'Gyalpozhing College of Information Technology',
      period: 'July 2023 - July 2027',
      current: true,
    },
    {
      degree: 'Science',
      school: 'Gelephu Higher Secondary School',
      period: 'Feb 2021 - Dec 2022',
      current: false,
    },
  ];

  const experience = [
    {
      role: 'Graphic Designer',
      company: 'AFK X Gaming',
      type: 'Freelance',
      period: '2025',
      desc: 'Designed promotional posters for Diamond and PUBG recharge services, focusing on clear visual communication and engaging layouts.',
    },
    {
      role: 'UI Designer',
      company: 'Mystic Realm',
      type: 'Freelance',
      period: '2025',
      desc: 'Designed an interactive user interface for a travel agency website, focusing on intuitive navigation and seamless user experience.',
    },
    {
      role: 'Video Editor',
      company: 'Bhutan Hydroponics',
      type: 'Freelance',
      period: '2025',
      desc: 'Produced and edited a documentary-style promotional video highlighting the company\'s work and sustainable agricultural services.',
    },
  ];

  const certifications = [
    { title: 'Introduction to CyberSecurity', issuer: 'Cisco Network Academy', year: '2024' },
    { title: 'Facilitator Certificate', issuer: 'Paro Youth Center', year: '2024' },
    { title: 'Health Captain', issuer: 'Phuentsholing Higher Secondary School', year: '2020' },
    { title: 'Management Captain', issuer: 'Gelephu Higher Secondary School', year: '2022' },
  ];

  const circleConfigs = [
    { top: '10%', left: '-5%', color: '#070DC7', size: 350 },
    { top: '20%', right: '-5%', color: '#1A64BA', size: 300 },
    { bottom: '30%', left: '5%', color: '#6048B7', size: 280 },
    { bottom: '10%', right: '0%', color: '#6A44F4', size: 320 },
  ];

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: "100vh",
        position: "relative",
        fontFamily: "'Montserrat', sans-serif",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background - matching App.jsx */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, #080C72 0%, #0a0e5c 50%, #080C72 100%)",
          }}
        />

        <div
          ref={gridRef}
          style={{
            position: "absolute",
            inset: "-50px",
            opacity: 0.08,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        {/* Floating blur circles */}
        {circleConfigs.map((c, i) => (
          <div
            key={i}
            ref={(el) => (circlesRef.current[i] = el)}
            style={{
              position: "absolute",
              ...c,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
              borderRadius: "50%",
              filter: "blur(80px)",
              opacity: 0.6,
            }}
          />
        ))}

        {/* 3D Interactive Elements */}
        <FloatingTorus size={180} position={{ right: "5%", top: "60%" }} />
        <FloatingCrystal size={100} position={{ left: "3%", top: "40%" }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "120px 60px 80px",
        }}
      >
        {/* Left - Content */}
        <div>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "6px",
              opacity: 0.5,
              marginBottom: "16px",
              fontWeight: 500,
            }}
          >
            ABOUT ME
          </p>

          <h1
            className="about-page-title"
            style={{
              fontSize: "clamp(44px, 7vw, 68px)",
              fontWeight: 700,
              marginBottom: "24px",
              letterSpacing: "-2px",
              lineHeight: 1.1,
              textShadow: "0 0 80px rgba(255,255,255,0.15)",
            }}
          >
            Jigme
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Namgyel
            </span>
          </h1>

          <p
            className="about-page-subtitle"
            style={{
              fontSize: "18px",
              opacity: 0.7,
              marginBottom: "32px",
              fontWeight: 500,
            }}
          >
            Interactive Designer & Creative Developer
          </p>

          <div style={{ marginBottom: "40px" }}>
            <p
              className="bio-text"
              style={{
                fontSize: "15px",
                lineHeight: 1.9,
                opacity: 0.8,
                marginBottom: "20px",
                maxWidth: "500px",
              }}
            >
              I am an aspiring Interactive Designer focused on creating
              engaging, user-centered digital experiences. I combine design
              thinking, usability, and gamification strategies to improve user
              retention and build impactful digital products.
            </p>
            <p
              className="bio-text"
              style={{
                fontSize: "15px",
                lineHeight: 1.9,
                opacity: 0.8,
                maxWidth: "500px",
              }}
            >
              With strong interests in UI/UX design, interactive systems, and
              digital storytelling, I aim to create solutions that are both
              functional and meaningful while continuously improving my creative
              and technical skills.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "40px", marginBottom: "40px" }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="stat-box"
                style={{
                  padding: "20px 0",
                  borderRight:
                    i < stats.length - 1
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "none",
                  paddingRight: i < stats.length - 1 ? "40px" : "0",
                }}
              >
                <p
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    marginBottom: "8px",
                    background:
                      "linear-gradient(135deg, #fff 0%, rgba(200,200,255,0.8) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    opacity: 0.5,
                    letterSpacing: "1px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Download CV Button */}
          <a
            href="/12230074_CV.pdf"
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 32px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                background: "rgba(255,255,255,0.2)",
                borderColor: "rgba(255,255,255,0.4)",
                scale: 1.02,
                duration: 0.3,
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                background: "rgba(255,255,255,0.1)",
                borderColor: "rgba(255,255,255,0.2)",
                scale: 1,
                duration: 0.3,
              });
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download CV
          </a>
        </div>

        {/* Right - Avatar with Clipping Mask */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "50%",
              filter: "blur(100px)",
            }}
          />

          {/* Avatar Container with Clipping Mask and Hover Glow */}
          <div
            ref={avatarRef}
            className="avatar-container"
            style={{
              position: "relative",
              width: "400px",
              height: "400px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const container = e.currentTarget;
              const glow = container.querySelector('.avatar-glow');
              const pulse = container.querySelector('.avatar-pulse');
              const ring = container.querySelector('.avatar-ring');
              
              gsap.to(glow, { opacity: 1, scale: 1.1, duration: 0.4, ease: 'power2.out' });
              gsap.to(pulse, { scale: 2, opacity: 0, duration: 0.8, ease: 'power2.out' });
              gsap.to(ring, { borderColor: 'rgba(100,150,255,0.4)', boxShadow: '0 0 40px rgba(100,150,255,0.3)', duration: 0.4 });
              gsap.to(container.querySelector('.avatar-clip'), { scale: 1.02, duration: 0.4, ease: 'power2.out' });
            }}
            onMouseLeave={(e) => {
              const container = e.currentTarget;
              const glow = container.querySelector('.avatar-glow');
              const pulse = container.querySelector('.avatar-pulse');
              const ring = container.querySelector('.avatar-ring');
              
              gsap.to(glow, { opacity: 0, scale: 1, duration: 0.4 });
              gsap.to(pulse, { scale: 1, opacity: 0.3, duration: 0.4 });
              gsap.to(ring, { borderColor: 'rgba(255,255,255,0.15)', boxShadow: 'none', duration: 0.4 });
              gsap.to(container.querySelector('.avatar-clip'), { scale: 1, duration: 0.4 });
            }}
          >
            {/* Hover Glow Effect */}
            <div
              className="avatar-glow"
              style={{
                position: "absolute",
                inset: "-30px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(100,150,255,0.4) 0%, transparent 70%)",
                opacity: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {/* Pulse Ring on Hover */}
            <div
              className="avatar-pulse"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "2px solid rgba(100,150,255,0.3)",
                opacity: 0.3,
                pointerEvents: "none",
              }}
            />

            {/* Outer Ring */}
            <div
              className="avatar-ring"
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.15)",
                transition: "all 0.4s ease",
                animation: "spin 30s linear infinite",
              }}
            />

            {/* Clipping Mask Container */}
            <div
              className="avatar-clip"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.3), 0 0 60px rgba(100,100,255,0.1)",
              }}
            >
              {/* Image inside clipping mask */}
              <img
                ref={imgRef}
                src="/Me1.png"
                alt="Jigme Namgyel"
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "450px",
                  height: "450px",
                  objectFit: "cover",
                  objectPosition: "top center",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Decorative dots */}
            <div style={{
              position: "absolute",
              top: "10%",
              right: "-10px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(100,150,255,0.6)",
              boxShadow: "0 0 15px rgba(100,150,255,0.5)",
            }} />
            <div style={{
              position: "absolute",
              bottom: "20%",
              left: "-15px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "rgba(150,100,255,0.6)",
              boxShadow: "0 0 12px rgba(150,100,255,0.5)",
            }} />
          </div>
        </div>
      </section>

      {/* Video Introduction Section */}
      <section
        style={{ padding: "80px 60px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <h2
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            opacity: 0.4,
            marginBottom: "40px",
            fontWeight: 600,
          }}
        >
          Video Introduction
        </h2>
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Placeholder for video */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <p style={{ fontSize: "14px", opacity: 0.5 }}>
              Resume Video Coming Soon
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        className="education-section"
        style={{ padding: "80px 60px", background: "rgba(0,0,0,0.1)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              opacity: 0.4,
              marginBottom: "50px",
              fontWeight: 600,
            }}
          >
            Education Journey
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            {education.map((edu, i) => (
              <div
                key={i}
                className="education-item"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "30px",
                  padding: "30px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  position: "relative",
                }}
              >
                {edu.current && (
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      padding: "6px 14px",
                      background: "rgba(100, 200, 100, 0.2)",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#8fef8f",
                      letterSpacing: "1px",
                    }}
                  >
                    CURRENT
                  </div>
                )}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.4)",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      marginBottom: "8px",
                      color: "#fff",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      opacity: 0.7,
                      marginBottom: "6px",
                    }}
                  >
                    {edu.school}
                  </p>
                  <p style={{ fontSize: "13px", opacity: 0.5 }}>{edu.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: "80px 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              opacity: 0.4,
              marginBottom: "40px",
              fontWeight: 600,
            }}
          >
            Technical Skills
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "50px",
            }}
          >
            {technicalSkills.map((skill) => (
              <span
                key={skill}
                className="skill-tag"
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    background: "rgba(255,255,255,0.15)",
                    duration: 0.3,
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    background: "rgba(255,255,255,0.05)",
                    duration: 0.3,
                  })
                }
                style={{
                  padding: "12px 20px",
                  borderRadius: "30px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "default",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <h2
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              opacity: 0.4,
              marginBottom: "40px",
              fontWeight: 600,
            }}
          >
            Soft Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="skill-tag"
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1.05,
                    background: "rgba(255,255,255,0.15)",
                    duration: 0.3,
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    scale: 1,
                    background: "rgba(255,255,255,0.05)",
                    duration: 0.3,
                  })
                }
                style={{
                  padding: "12px 20px",
                  borderRadius: "30px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "default",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        className="experience-section"
        style={{ padding: "80px 60px", background: "rgba(0,0,0,0.1)" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              opacity: 0.4,
              marginBottom: "50px",
              fontWeight: 600,
            }}
          >
            Experience
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {experience.map((exp, i) => (
              <div
                key={i}
                className="experience-item"
                style={{
                  padding: "30px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    y: -5,
                    borderColor: "rgba(255,255,255,0.15)",
                    duration: 0.3,
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    y: 0,
                    borderColor: "rgba(255,255,255,0.08)",
                    duration: 0.3,
                  })
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        marginBottom: "6px",
                        color: "#fff",
                      }}
                    >
                      {exp.role}
                    </h3>
                    <p style={{ fontSize: "14px", opacity: 0.7 }}>
                      {exp.company}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: "6px 12px",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 500,
                      opacity: 0.6,
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p style={{ fontSize: "13px", lineHeight: 1.7, opacity: 0.6 }}>
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="cert-section" style={{ padding: "80px 60px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "4px",
              opacity: 0.4,
              marginBottom: "50px",
              fontWeight: 600,
            }}
          >
            Certifications & Achievements
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="cert-item"
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="8" r="6" />
                    <path d="M9 14l-4 8 7-3 7 3-4-8" />
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "8px",
                    color: "#fff",
                  }}
                >
                  {cert.title}
                </h3>
                <p style={{ fontSize: "12px", opacity: 0.5 }}>{cert.issuer}</p>
                <p style={{ fontSize: "11px", opacity: 0.4, marginTop: "4px" }}>
                  {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <Bubbles />
      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

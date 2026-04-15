import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "qube",
    name: "QUBE",
    tags: ["UI/UX", "Frontend", "DBMS"],
    image: "/qube.png",
    desc: "Quick unlocks, bonus engagement platform.",
  },
  {
    id: "inneed",
    name: "INNEED",
    tags: ["UI/UX", "React", "Animation"],
    image: "/inneed.png",
    desc: "Smart job platform with real-time features.",
  },
  {
    id: "tovo",
    name: "TOVO",
    tags: ["UI/UX", "Frontend", "API"],
    image: "/tovo.png",
    desc: "Modern food ordering experience.",
  },
];

const marqueeText = "PROJECTS PORTFOLIO WORK DESIGN DEVELOPMENT CREATIVE ";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const flipRef = useRef([]);
  const marqueeRef = useRef(null);
  const marqueeRef2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Marquee animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }

      if (marqueeRef2.current) {
        gsap.to(marqueeRef2.current, {
          xPercent: 50,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      }

      const cards = cardsRef.current;
      const flips = flipRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${projects.length * 120}%`,
          scrub: 1.2,
          pin: true,
        },
      });

      // Set initial states
      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: i === 0 ? 1 : 0,
          zIndex: projects.length - i,
        });
        gsap.set(flips[i], {
          rotateY: i === 0 ? 0 : 90,
          transformPerspective: 1500,
          transformOrigin: "center center",
        });
      });

      // Animate through cards with smooth 3D flip
      cards.forEach((card, i) => {
        if (i === 0) return;

        const baseTime = i * 1.5;

        tl.to(
          flips[i - 1],
          {
            rotateY: -90,
            duration: 1,
            ease: "power2.inOut",
          },
          baseTime
        );

        tl.to(
          cards[i - 1],
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          baseTime + 0.3
        );

        tl.to(
          cards[i],
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          baseTime + 0.5
        );

        tl.fromTo(
          flips[i],
          { rotateY: 90 },
          {
            rotateY: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          baseTime + 0.5
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section
      id="projects-section"
      ref={sectionRef}
      className="projects-section"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        perspective: "2000px",
      }}
    >
      {/* Marquee Background Text - Top */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: 0,
          width: "100%",
          overflow: "hidden",
          zIndex: 0,
          opacity: 0.04,
          pointerEvents: "none",
        }}
      >
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "fit-content",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(80px, 15vw, 150px)",
                fontWeight: 800,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-5px",
                color: "#fff",
                textTransform: "uppercase",
                marginRight: "40px",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Background Text - Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          width: "100%",
          overflow: "hidden",
          zIndex: 0,
          opacity: 0.03,
          pointerEvents: "none",
        }}
      >
        <div
          ref={marqueeRef2}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "fit-content",
            transform: "translateX(-50%)",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: "clamp(60px, 12vw, 120px)",
                fontWeight: 800,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "-4px",
                color: "#fff",
                textTransform: "uppercase",
                marginRight: "40px",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Section title */}
      <h2
        ref={titleRef}
        style={{
          textAlign: "center",
          paddingTop: "50px",
          color: "white",
          fontSize: "clamp(24px, 4vw, 32px)",
          fontWeight: 700,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "2px",
          textTransform: "uppercase",
          textShadow: "0 0 30px rgba(255,255,255,0.2)",
          position: "relative",
          zIndex: 2,
        }}
      >
        Projects
      </h2>

      {/* Cards container */}
      <div
        className="projects-cards-container"
        style={{
          position: "relative",
          width: "min(700px, 90vw)",
          height: "520px",
          margin: "60px auto",
          perspective: "1500px",
          perspectiveOrigin: "center center",
          zIndex: 10,
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            onClick={() => handleCardClick(project.id)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 10,
              cursor: "pointer",
            }}
          >
            {/* Flip wrapper */}
            <div
              ref={(el) => (flipRef.current[i] = el)}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                transformStyle: "preserve-3d",
                transformOrigin: "center",
                willChange: "transform",
                transition: "box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.02,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.4,
                  ease: "power2.out",
                });
              }}
            >
              {/* Card front */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.95)",
                  boxShadow: `
                    0 0 60px rgba(255,255,255,0.3),
                    0 0 120px rgba(100,100,255,0.15),
                    0 50px 100px rgba(0,0,0,0.4),
                    0 0 0 1px rgba(255,255,255,0.2),
                    inset 0 0 80px rgba(255,255,255,0.1)
                  `,
                  overflow: "hidden",
                }}
              >
                {/* Project image */}
                <div style={{ padding: "20px", height: "65%" }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                </div>

                {/* Project info */}
                <div style={{ padding: "0 24px 24px", color: "#080C72" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {project.name}
                    </h3>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#080C72" 
                      strokeWidth="2"
                      style={{ opacity: 0.5 }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>

                  <p
                    style={{
                      fontSize: "14px",
                      opacity: 0.7,
                      marginBottom: "16px",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {project.desc}
                  </p>

                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#080C72",
                          color: "#fff",
                          padding: "8px 16px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 500,
                          fontFamily: "'Montserrat', sans-serif",
                          boxShadow: "0 4px 15px rgba(8, 12, 114, 0.3)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Click indicator overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    padding: "8px 16px",
                    background: "rgba(8, 12, 114, 0.1)",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#080C72",
                    fontFamily: "'Montserrat', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  Click to view
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .projects-section {
            min-height: 100vh !important;
          }
          .projects-section h2 {
            padding-top: 30px !important;
            font-size: 20px !important;
          }
          .projects-cards-container {
            width: calc(100vw - 40px) !important;
            height: 450px !important;
            margin: 30px auto !important;
          }
          .projects-cards-container > div > div > div {
            border-radius: 16px !important;
          }
          .projects-cards-container > div > div > div > div:first-child {
            height: 55% !important;
            padding: 16px !important;
          }
          .projects-cards-container > div > div > div > div:last-child {
            padding: 0 16px 16px !important;
          }
          .projects-cards-container h3 {
            font-size: 16px !important;
          }
          .projects-cards-container p {
            font-size: 12px !important;
            margin-bottom: 12px !important;
          }
          .projects-cards-container span {
            padding: 6px 12px !important;
            font-size: 10px !important;
          }
        }
        @media (max-width: 480px) {
          .projects-cards-container {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

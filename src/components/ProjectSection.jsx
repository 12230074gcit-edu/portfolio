import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    name: "QUBE",
    tags: ["UI/UX", "Frontend", "DBMS"],
    image: "/qube.png",
    desc: "Quick unlocks, bonus engagement platform.",
  },
  {
    id: 2,
    name: "INNEED",
    tags: ["UI/UX", "React", "Animation"],
    image: "/inneed.png",
    desc: "Smart job platform with real-time features.",
  },
  {
    id: 3,
    name: "TOVO",
    tags: ["UI/UX", "Frontend", "API"],
    image: "/tovo.png",
    desc: "Modern food ordering experience.",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const flipRef = useRef([]);

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

        // Flip out previous card
        tl.to(
          flips[i - 1],
          {
            rotateY: -90,
            duration: 0.8,
            ease: "power3.inOut",
          },
          baseTime
        );

        // Fade out previous card
        tl.to(
          cards[i - 1],
          {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
          },
          baseTime + 0.2
        );

        // Bring in current card
        tl.to(
          cards[i],
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
          },
          baseTime + 0.3
        );

        // Flip in current card
        tl.fromTo(
          flips[i],
          {
            rotateY: 90,
          },
          {
            rotateY: 0,
            duration: 0.8,
            ease: "power3.inOut",
          },
          baseTime + 0.4
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        perspective: "2000px",
      }}
    >
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
        }}
      >
        Projects
      </h2>

      {/* Cards container */}
      <div
        style={{
          position: "relative",
          width: "min(720px, 90vw)",
          height: "520px",
          margin: "60px auto",
          perspective: "1500px",
          perspectiveOrigin: "center center",
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 10,
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
                    0 40px 100px rgba(0,0,0,0.4),
                    0 0 0 1px rgba(255,255,255,0.1),
                    inset 0 0 60px rgba(255,255,255,0.1)
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
                  <h3
                    style={{
                      marginBottom: "12px",
                      fontSize: "20px",
                      fontWeight: 700,
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                  >
                    {project.name}
                  </h3>

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

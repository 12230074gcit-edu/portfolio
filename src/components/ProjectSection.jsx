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
  const cardsRef = useRef([]);
  const flipRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const flips = flipRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${projects.length * 120}%`,
        scrub: 1,
        pin: true,
      },
    });

    cards.forEach((card, i) => {
      // initial state
      gsap.set(card, {
        y: 0,
        opacity: i === 0 ? 1 : 0,
      });

      if (i === 0) return;

      const baseTime = i * 1.2;

      // bring current card
      tl.to(
        card,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        baseTime
      );

      // remove previous card completely
      tl.to(
        cards[i - 1],
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        baseTime
      );

      // subtle clean flip
      tl.fromTo(
        flips[i],
        {
          rotateX: -90,
          opacity: 0,
          transformPerspective: 1800,
        },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          force3D: true,
        },
        baseTime + 0.1
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        perspective: "2000px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          paddingTop: "40px",
          color: "white",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        Projects
      </h2>

      <div
        style={{
          position: "relative",
          width: "720px",
          height: "520px",
          margin: "60px auto",
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
            {/* FLIP WRAPPER */}
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
              {/* FRONT */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "22px",
                  background: "#ffffff",
                  boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: "20px", color: "#04128e" }}>
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      width: "100%",
                      height: "70%",
                      objectFit: "cover",
                      borderRadius: "14px",
                    }}
                  />
                </div>

                <div style={{ padding: "20px", color: "#04128e" }}>
                  <h3 style={{ marginBottom: "10px", fontSize: "16px", fontWeight: "600" }}>{project.name}</h3>

                  <div style={{ display: "flex", gap: "10px", marginBottom: "5px" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#04128e",
                          color: "#fff",
                          padding: "8px 14px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  borderRadius: "22px",
                  background: "#ffffff",
                  boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
                  padding: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3 style={{ marginBottom: "5px", color: "#04128e" }}>
                  {project.name}
                </h3>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "#04128e",
                        color: "#fff",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".services-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".dev-block", {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from(".design-block", {
        y: 120,
        opacity: 0,
        duration: 1,
        delay: 0.4,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      }}
    >
      {/* TITLE */}
      <div className="services-title" style={{ textAlign: "center", marginBottom: "90px" }}>
        <h1 style={{ fontSize: "96px", fontWeight: 700 }}>
          SERVICES
        </h1>
        <p style={{ opacity: 0.6, fontSize: "32px", marginTop: "12px" }}>
          You have the service, we make it engaging.
        </p>
      </div>

      {/* ===== TOP ROW ===== */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "0px",
        }}
      >
        {/* LEFT: DEV TITLE (HALF WIDTH) */}
        <div style={{ ...glassSlim, width: "50%" }}>
          <h2 style={bigTitle}>Develop web apps</h2>
        </div>

        {/* RIGHT: EMPTY SPACE (FOR HANDS) */}
        <div style={{ ...glassSlim, width: "50%", opacity: 0.2 }} />
      </div>

      {/* ===== DEV SKILLS ===== */}
      <div className="dev-block" style={{ width: "50%" }}>
        <div style={glassCard}>
          <TagList
            tags={[
              "React","Javascript","Flutter","Figma",
              "Dart","PostgreSQL","DBMS",
              "Mobile application","Web application"
            ]}
          />
        </div>
      </div>

      {/* ===== DESIGN (SHIFTED RIGHT & DOWN) ===== */}
      <div
        className="design-block"
        style={{
          marginTop: "0px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ width: "50%" }}>
          {/* TITLE */}
          <div style={glassSlim}>
            <h2 style={bigTitle}>Design</h2>
          </div>

          {/* SKILLS */}
          <div style={glassCard}>
            <TagList
              tags={[
                "Branding","UX/UI","Videos","Figma",
                "Adobe Photoshop","Adobe Illustrator",
                "Icons","Reels","Adobe Premiere Pro"
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* TAG LIST */
const TagList = ({ tags }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    {tags.map((t, i) => (
      <span key={i} style={tag}>{t}</span>
    ))}
  </div>
);

/* STYLES */

const glassSlim = {
  padding: "18px 28px", // slimmer
  borderRadius: "16px",
  marginBottom: "20px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const glassCard = {
  padding: "30px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const bigTitle = {
  fontSize: "32px",
  fontWeight: 600,
};

const tag = {
  background: "#fff",
  color: "#1a1a6c",
  padding: "10px 18px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: 500,
};
import React from "react";

export default function ContactSection() {
  return (
    <section
      style={{
        height: "100vh",
        position: "relative",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        fontFamily: "Montserrat" 
      }}
    >
      <div>
        <h1 style={{ fontSize: "72px" }}>
          Lets Join <br /> Forces
        </h1>

        <p style={{ opacity: 0.6 }}>
          As long as there's room to turn things up a notch, we're in
        </p>

        <button id="contact-btn" style={btn}>  {/* ✅ ADDED ID */}
          Contact Me →
        </button>
      </div>
    </section>
  );
}

const btn = {
  marginTop: "30px",
  padding: "14px 32px",
  borderRadius: "12px",
  border: "none",
  background: "#fff",
  color: "#080C72",
  fontWeight: "700",
  fontSize: "14px",
  cursor: "pointer",
};
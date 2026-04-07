import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HandsLayer() {
  const humanRef = useRef(null);
  const robotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // HIDDEN INITIALLY
      gsap.set([humanRef.current, robotRef.current], {
        opacity: 0,
        scale: 0.85
      });

      gsap.set(glowRef.current, {
        opacity: 0,
        scale: 0
      });

      // APPEAR ONLY WHEN ABOUT ENTERS
      gsap.to([humanRef.current, robotRef.current], {
        opacity: 0.8,
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",   // ✅ FIXED (no early trigger)
          end: "top 60%",
          scrub: 1
        }
      });

      // MAIN TIMELINE (ABOUT → CONTACT)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",   // ✅ FIXED
          endTrigger: "#contact-btn",
          end: "center center",
          scrub: 1
        }
      });

      // MOVEMENT (ADJUSTED FOR PERFECT TOUCH)
      tl.fromTo(
        humanRef.current,
        { x: -160, y: 80 },
        { x: 140, y: 0, ease: "power2.out" }   // 👈 pushed more
      );

      tl.fromTo(
        robotRef.current,
        { x: 160, y: -80 },
        { x: -140, y: 0, ease: "power2.out" }, // 👈 pushed more
        0
      );

      // GLOW BURST
      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1.8,
        ease: "power2.out"
      }, 0.9);

      tl.to(glowRef.current, {
        opacity: 0,
        scale: 2.5,
      }, 1);

      // BUTTON PREMIUM IMPACT
      tl.to("#contact-btn", {
        scale: 1.15,
        boxShadow: "0 20px 80px rgba(255,255,255,0.6)",
        duration: 0.2
      }, 0.92);

      tl.to("#contact-btn", {
        scale: 1,
      }, 1);

    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1
      }}
    >
      {/* GLOW */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "72%",
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.9), transparent)",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* HUMAN HAND */}
      <img
        ref={humanRef}
        src="/human-hand.png"
        alt=""
        style={{
          position: "absolute",
          left: "40%",
          top: "75%",
          width: "260px",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* ROBOT HAND */}
      <img
        ref={robotRef}
        src="/robot-hand.png"
        alt=""
        style={{
          position: "absolute",
          right: "40%",
          top: "65%",
          width: "260px",
          transform: "translate(50%, -50%)"
        }}
      />
    </div>
  );
}
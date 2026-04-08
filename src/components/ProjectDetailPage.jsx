import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bubbles from './Bubbles';
import { Navbar } from './navbar';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const projectsData = {
  qube: {
    id: 'qube',
    name: 'QUBE',
    tagline: 'Scan, play, and unlock rewards while you dine.',
    subtitle: 'Gamified dining rewards that keep customers coming back',
    year: '2026',
    role: 'Lead Product Designer',
    duration: '4 months',
    team: '3 designers, 2 developers',
    contributors: ['User Interface Design', 'User Research', 'Frontend Developer'],
    heroImage: '/qube.png',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6366F1 100%)',
    overview: 'QUBE transforms the traditional loyalty program into an engaging, game-like experience. By incorporating interactive elements directly into the dining journey, we created a system that feels less like point collection and more like play.',
    challenge: 'Traditional restaurant loyalty programs fail to excite customers. Points systems feel disconnected from the dining experience, resulting in low engagement and forgotten rewards. Restaurants needed a way to make loyalty feel rewarding in the moment, not just at redemption.',
    approach: [
      {
        title: 'Research & Discovery',
        desc: 'Conducted 40+ user interviews and analyzed competitor loyalty apps to understand pain points and opportunities in the F&B space.',
      },
      {
        title: 'Gamification Framework',
        desc: 'Designed a reward system based on behavioral psychology principles - variable rewards, progression mechanics, and social proof.',
      },
      {
        title: 'Rapid Prototyping',
        desc: 'Built and tested 3 distinct interaction models before landing on the QR-scan-to-play mechanic that became QUBE\'s signature.',
      },
    ],
    journey: [
      { phase: 'Discover', desc: 'User scans QR code at restaurant', icon: '01' },
      { phase: 'Play', desc: 'Engage with mini-game or challenge', icon: '02' },
      { phase: 'Unlock', desc: 'Win instant rewards or collect points', icon: '03' },
      { phase: 'Redeem', desc: 'Use rewards on current or future visits', icon: '04' },
    ],
    results: [
      { value: '340%', label: 'Increase in daily active users' },
      { value: '89%', label: 'User retention after 30 days' },
      { value: '4.8', label: 'App store rating' },
      { value: '156%', label: 'Revenue increase for partners' },
    ],
    testimonial: {
      quote: 'QUBE completely changed how our customers interact with our brand. They actually look forward to dining with us now.',
      author: 'Restaurant Partner',
      role: 'F&B Chain Owner',
    },
  },
  inneed: {
    id: 'inneed',
    name: 'INNEED',
    tagline: 'Turning job search into a seamless experience.',
    subtitle: 'A human-centered approach to career discovery',
    year: '2026',
    role: 'Product Designer',
    duration: '6 months',
    team: '2 designers, 4 developers',
    contributors: ['User Interface Design', 'User Research', 'Frontend Developer'],
    heroImage: '/inneed.png',
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1e40af 50%, #3B82F6 100%)',
    overview: 'INNEED reimagines the job search as a journey of self-discovery rather than a stressful hunt. By focusing on skills and potential rather than just experience, we created a platform that empowers candidates and delights recruiters.',
    challenge: 'Job searching is inherently stressful and overwhelming. Candidates face endless scrolling through irrelevant listings, impersonal application processes, and the dreaded silence after submitting. We needed to humanize the journey while making it remarkably efficient.',
    approach: [
      {
        title: 'Empathy Mapping',
        desc: 'Shadowed 20 job seekers through their entire search process to identify emotional highs, lows, and friction points.',
      },
      {
        title: 'AI-Powered Matching',
        desc: 'Designed an intelligent matching system that learns preferences over time and surfaces opportunities proactively.',
      },
      {
        title: 'Progress Visualization',
        desc: 'Created a journey map that celebrates small wins and maintains momentum throughout the search.',
      },
    ],
    journey: [
      { phase: 'Profile', desc: 'Build a dynamic skills profile', icon: '01' },
      { phase: 'Match', desc: 'AI finds relevant opportunities', icon: '02' },
      { phase: 'Apply', desc: 'One-tap applications with tracking', icon: '03' },
      { phase: 'Connect', desc: 'Direct communication with recruiters', icon: '04' },
    ],
    results: [
      { value: '67%', label: 'Faster time to hire' },
      { value: '92%', label: 'User satisfaction score' },
      { value: '2.5x', label: 'Application completion rate' },
      { value: '45%', label: 'Higher offer acceptance' },
    ],
    testimonial: {
      quote: 'INNEED made me feel in control of my career for the first time. The platform actually understands what I\'m looking for.',
      author: 'Sarah Chen',
      role: 'Software Engineer',
    },
  },
  tovo: {
    id: 'tovo',
    name: 'TOVO',
    tagline: 'Food ordering, reimagined for delight.',
    subtitle: 'Making every meal decision a joyful moment',
    year: '2025',
    role: 'Senior UX Designer',
    duration: '5 months',
    team: '2 designers, 3 developers',
    contributors: ['User Interface Design', 'Frontend Dev', 'API Integration'],
    heroImage: '/tovo.png',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #d97706 50%, #F59E0B 100%)',
    overview: 'TOVO brings personality back to food delivery. By combining mood-based recommendations with a visually stunning interface, we turned the mundane task of ordering food into a moment of anticipation and excitement.',
    challenge: 'Food delivery apps have become cluttered, slow, and devoid of personality. Decision fatigue leads to abandoned carts, while generic interfaces strip away the joy of discovering new cuisines. We needed to make ordering feel as satisfying as the first bite.',
    approach: [
      {
        title: 'Mood-Based Discovery',
        desc: 'Designed an innovative recommendation engine that suggests food based on mood, weather, and time of day.',
      },
      {
        title: 'Visual Storytelling',
        desc: 'Created immersive restaurant pages that communicate atmosphere, not just menu items.',
      },
      {
        title: 'Friction Elimination',
        desc: 'Reduced checkout to 3 taps through smart defaults and predictive ordering.',
      },
    ],
    journey: [
      { phase: 'Crave', desc: 'Express your mood or browse', icon: '01' },
      { phase: 'Discover', desc: 'Explore curated suggestions', icon: '02' },
      { phase: 'Order', desc: 'Quick, intuitive checkout', icon: '03' },
      { phase: 'Enjoy', desc: 'Real-time tracking & rewards', icon: '04' },
    ],
    results: [
      { value: '45%', label: 'Increase in order value' },
      { value: '78%', label: 'Reduction in cart abandonment' },
      { value: '12s', label: 'Average time to order' },
      { value: '4.9', label: 'App store rating' },
    ],
    testimonial: {
      quote: 'Finally, a food app that gets it. TOVO makes ordering food actually fun again.',
      author: 'Food Blogger',
      role: 'Industry Review',
    },
  },
};

const projectOrder = ['qube', 'inneed', 'tovo'];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId] || projectsData.qube;
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const taglineRef = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef = useRef(null);
  const scrollTextRef = useRef(null);
  const posterRef = useRef(null);
  const overviewRef = useRef(null);
  const challengeRef = useRef(null);
  const approachRef = useRef(null);
  const journeyRef = useRef(null);
  const resultsRef = useRef(null);
  const testimonialRef = useRef(null);
  const nextProjectRef = useRef(null);
  const decorativeRefs = useRef([]);
  const journeyItemRefs = useRef([]);
  const approachItemRefs = useRef([]);
  const statRefs = useRef([]);

  const currentIndex = projectOrder.indexOf(projectId);
  const otherProjects = projectOrder.filter(pid => pid !== projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Decorative blocks floating
      decorativeRefs.current.forEach((block, i) => {
        if (!block) return;
        gsap.to(block, {
          y: gsap.utils.random(-25, 25),
          x: gsap.utils.random(-15, 15),
          rotation: gsap.utils.random(-15, 15),
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.4,
        });
      });

      // Tagline entrance - character by character
      if (taglineRef.current) {
        const chars = taglineRef.current.querySelectorAll('.char');
        gsap.fromTo(chars,
          { y: 80, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power4.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle entrance
      gsap.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );

      // Meta info staggered entrance
      if (metaRef.current) {
        const metaItems = metaRef.current.querySelectorAll('.meta-item');
        gsap.fromTo(metaItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 1 }
        );
      }

      // Scroll text parallax and rotation
      gsap.to(scrollTextRef.current, {
        y: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Poster image entrance with reveal
      gsap.fromTo(posterRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 1.2 }
      );

      // Poster parallax on scroll
      gsap.to(posterRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: posterRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Overview section
      gsap.fromTo(overviewRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: overviewRef.current, start: 'top 85%' }
        }
      );

      // Challenge section with line drawing
      gsap.fromTo(challengeRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: challengeRef.current, start: 'top 85%' }
        }
      );

      // Approach items stagger
      approachItemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: approachRef.current, start: 'top 80%' }
          }
        );
      });

      // Journey items sequential reveal
      journeyItemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out',
            delay: i * 0.2,
            scrollTrigger: { trigger: journeyRef.current, start: 'top 80%' }
          }
        );
      });

      // Stats counter animation
      statRefs.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
            delay: i * 0.15,
            scrollTrigger: { trigger: resultsRef.current, start: 'top 80%' }
          }
        );
      });

      // Testimonial
      gsap.fromTo(testimonialRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: testimonialRef.current, start: 'top 85%' }
        }
      );

      // Next project cards
      gsap.fromTo(nextProjectRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: nextProjectRef.current, start: 'top 90%' }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [projectId]);

  // Split text into characters for animation
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ));
  };

  const decorativeBlocks = [
    { top: '15%', left: '5%', size: 60, color: 'rgba(99, 102, 241, 0.2)', rotate: 20 },
    { top: '25%', right: '8%', size: 45, color: 'rgba(236, 72, 153, 0.15)', rotate: -15 },
    { top: '60%', left: '3%', size: 35, color: 'rgba(34, 197, 94, 0.15)', rotate: 30 },
    { bottom: '30%', right: '5%', size: 50, color: 'rgba(168, 85, 247, 0.2)', rotate: -25 },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #080C72 0%, #0a0e5c 40%, #060a4a 100%)',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <Bubbles />
      <Navbar />

      {/* Decorative floating blocks */}
      {decorativeBlocks.map((block, i) => (
        <div
          key={i}
          ref={(el) => (decorativeRefs.current[i] = el)}
          style={{
            position: 'fixed',
            ...block,
            width: `${block.size}px`,
            height: `${block.size}px`,
            backgroundColor: block.color,
            borderRadius: '14px',
            transform: `rotate(${block.rotate}deg)`,
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Hero Section */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        padding: '140px 80px 60px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Scroll text behind everything */}
        <div
          ref={scrollTextRef}
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '60px',
            fontSize: 'clamp(120px, 20vw, 200px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            textTransform: 'uppercase',
            letterSpacing: '-5px',
            zIndex: 1,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            userSelect: 'none',
          }}
        >
          Scroll
        </div>

        {/* Tagline */}
        <h1
          ref={taglineRef}
          style={{
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            lineHeight: 1.15,
            maxWidth: '900px',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 10,
            perspective: '1000px',
          }}
        >
          {splitText(project.tagline)}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            opacity: 0.6,
            marginBottom: '50px',
            maxWidth: '600px',
            fontWeight: 400,
            zIndex: 10,
          }}
        >
          {project.subtitle}
        </p>

        {/* Meta Info */}
        <div ref={metaRef} style={{
          display: 'flex',
          gap: '60px',
          marginBottom: '60px',
          flexWrap: 'wrap',
          zIndex: 10,
        }}>
          <div className="meta-item">
            <div style={{ fontSize: '10px', opacity: 0.35, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>Project</div>
            <div style={{ fontSize: '15px', fontWeight: 600 }}>{project.name}</div>
          </div>
          <div className="meta-item">
            <div style={{ fontSize: '10px', opacity: 0.35, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>Year</div>
            <div style={{ fontSize: '15px', fontWeight: 500 }}>{project.year}</div>
          </div>
          <div className="meta-item">
            <div style={{ fontSize: '10px', opacity: 0.35, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>Role</div>
            <div style={{ fontSize: '15px', fontWeight: 500 }}>{project.role}</div>
          </div>
          <div className="meta-item">
            <div style={{ fontSize: '10px', opacity: 0.35, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>Duration</div>
            <div style={{ fontSize: '15px', fontWeight: 500 }}>{project.duration}</div>
          </div>
        </div>

        {/* Big Poster Image */}
        <div
          ref={posterRef}
          style={{
            width: '100%',
            maxWidth: '1200px',
            borderRadius: '28px',
            overflow: 'hidden',
            boxShadow: '0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <img
            src={project.heroImage}
            alt={project.name}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              minHeight: '400px',
              objectFit: 'cover',
            }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(8,12,114,0.8), transparent)',
            pointerEvents: 'none',
          }} />
        </div>
      </section>

      {/* Project Overview */}
      <section ref={overviewRef} style={{
        padding: '100px 80px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          opacity: 0.35,
          marginBottom: '25px',
          fontWeight: 600,
        }}>Overview</h2>
        <p style={{
          fontSize: 'clamp(22px, 3vw, 32px)',
          lineHeight: 1.6,
          fontWeight: 300,
          opacity: 0.9,
        }}>
          {project.overview}
        </p>
      </section>

      {/* The Challenge */}
      <section ref={challengeRef} style={{
        padding: '100px 80px',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            opacity: 0.35,
            marginBottom: '25px',
            fontWeight: 600,
          }}>The Challenge</h2>
          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            lineHeight: 1.7,
            opacity: 0.85,
            fontWeight: 300,
          }}>
            {project.challenge}
          </p>
        </div>
      </section>

      {/* My Approach */}
      <section ref={approachRef} style={{
        padding: '120px 80px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            opacity: 0.35,
            marginBottom: '60px',
            fontWeight: 600,
            textAlign: 'center',
          }}>How I Helped</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}>
            {project.approach.map((item, i) => (
              <div
                key={i}
                ref={el => approachItemRefs.current[i] = el}
                style={{
                  padding: '40px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  opacity: 0.1,
                  marginBottom: '15px',
                }}>0{i + 1}</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '15px',
                }}>{item.title}</h3>
                <p style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  opacity: 0.7,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section ref={journeyRef} style={{
        padding: '120px 80px',
        background: 'rgba(0,0,0,0.15)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            opacity: 0.35,
            marginBottom: '60px',
            fontWeight: 600,
            textAlign: 'center',
          }}>The User Journey</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            position: 'relative',
          }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute',
              top: '45px',
              left: '12%',
              right: '12%',
              height: '2px',
              background: `linear-gradient(90deg, ${project.color}40, ${project.color}, ${project.color}40)`,
              zIndex: 0,
            }} />

            {project.journey.map((step, i) => (
              <div
                key={i}
                ref={el => journeyItemRefs.current[i] = el}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
                  border: `2px solid ${project.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px',
                  fontWeight: 700,
                  boxShadow: `0 0 30px ${project.color}30`,
                }}>
                  {step.icon}
                </div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '8px',
                }}>{step.phase}</h4>
                <p style={{
                  fontSize: '13px',
                  opacity: 0.6,
                  lineHeight: 1.5,
                }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} style={{
        padding: '120px 80px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '70px',
          }}>The Results</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '25px',
          }}>
            {project.results.map((stat, i) => (
              <div
                key={i}
                ref={el => statRefs.current[i] = el}
                style={{
                  textAlign: 'center',
                  padding: '45px 25px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 20px 50px ${project.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: 'clamp(42px, 7vw, 60px)',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${project.color}, #fff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '12px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  opacity: 0.5,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section ref={testimonialRef} style={{
        padding: '100px 80px',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            fontSize: '60px',
            opacity: 0.15,
            marginBottom: '20px',
            fontFamily: 'Georgia, serif',
          }}>"</div>
          <p style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            fontWeight: 300,
            marginBottom: '30px',
            opacity: 0.9,
          }}>
            {project.testimonial.quote}
          </p>
          <div style={{
            fontSize: '14px',
            fontWeight: 600,
          }}>{project.testimonial.author}</div>
          <div style={{
            fontSize: '12px',
            opacity: 0.5,
            marginTop: '5px',
          }}>{project.testimonial.role}</div>
        </div>
      </section>

      {/* Other Projects - Carousel Cards */}
      <section ref={nextProjectRef} style={{
        padding: '100px 80px',
      }}>
        <h2 style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          opacity: 0.35,
          marginBottom: '50px',
          fontWeight: 600,
          textAlign: 'center',
        }}>Explore More Work</h2>

        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {otherProjects.map((pid) => {
            const p = projectsData[pid];
            return (
              <div
                key={pid}
                onClick={() => navigate(`/project/${pid}`)}
                style={{
                  width: '380px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.5s ease',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -15, scale: 1.03, duration: 0.4 });
                  e.currentTarget.style.boxShadow = `0 30px 60px ${p.color}25`;
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4 });
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  height: '220px',
                  overflow: 'hidden',
                }}>
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '8px',
                  }}>{p.name}</h3>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.6,
                    lineHeight: 1.5,
                  }}>{p.subtitle}</p>
                  <div style={{
                    marginTop: '15px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: p.color,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    View Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Let's Connect Section - same as home */}
      <section style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 40px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.1), transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 10 }}>
          <h2 style={{
            fontSize: 'clamp(42px, 8vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-2px',
          }}>
            Let's Join<br />Forces
          </h2>
          <p style={{
            opacity: 0.5,
            fontSize: '16px',
            maxWidth: '450px',
            margin: '0 auto 35px',
            lineHeight: 1.6,
          }}>
            Ready to create something extraordinary? Let's discuss your next project.
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: '18px 45px',
              borderRadius: '14px',
              border: 'none',
              background: '#fff',
              color: '#080C72',
              fontWeight: 700,
              fontSize: '15px',
              fontFamily: "'Montserrat', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { y: -5, scale: 1.05, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', duration: 0.3 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', duration: 0.3 });
            }}
          >
            Contact Me
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

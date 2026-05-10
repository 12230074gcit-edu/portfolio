import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bubbles from './Bubbles';
import { Navbar } from './navbar';
import Footer from './Footer';
import ContactSection from './Contact';
import { FloatingTorus, FloatingSphere } from './Interactive3D';

gsap.registerPlugin(ScrollTrigger);

const projectsData = {
  qube: {
    id: 'qube',
    name: 'QUBE',
    tagline: 'Turn every visit into a \nplayable experience that \nkeeps users coming back.',
    subtitle: 'Gamified retention system designed to drive repeat behavior',
    year: '2026',
    role: 'Lead Interactive Designer',
    duration: '4 months',
    team: '3 designers, 2 developers',
    contributors: ['Interaction Design', 'User Research', 'Frontend Developer'],
    heroImage: '/qube.png',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6366F1 100%)',

    overview: 'I led the interaction design for QUBE, transforming a basic loyalty concept into an addictive gamified experience. My focus was on creating emotional hooks through micro-interactions, reward animations, and progression systems that keep users genuinely excited to return.',

    challenge: 'The team needed someone who could bridge the gap between game design psychology and practical UX implementation. I took ownership of the entire interaction layer, pushing beyond conventional patterns to create something users would actually want to engage with daily.',

    approach: [
      {
        title: 'Psychology-First Approach',
        desc: 'I dove deep into behavioral psychology research, mapping out the exact emotional triggers that drive habit formation and repeat engagement.'
      },
      {
        title: 'Rapid Prototyping',
        desc: 'Built over 20 interactive prototypes to test different reward mechanics, refining each based on real user reactions and engagement data.'
      },
      {
        title: 'Pixel-Perfect Execution',
        desc: 'Crafted every animation curve, timing, and visual feedback to create that satisfying feeling users crave.'
      },
    ],

    results: [
      { value: '340%', label: 'Increase in repeat engagement' },
      { value: '89%', label: 'Retention after 30 days' },
      { value: '4.8', label: 'User satisfaction rating' },
      { value: '156%', label: 'Revenue from returning users' },
    ],

    gallery: ['/qube1.png', '/qube2.png', '/qube3.png', '/qube4.png'],

    testimonial: {
      quote: 'Jigme brought an energy and attention to detail that completely transformed our project. He didn\'t just design interfaces - he understood user psychology and built experiences that genuinely changed how people interact with our platform. His prototypes were so polished they looked production-ready.',
      author: 'Karma Wangchuk',
      role: 'Project Lead, QUBE Team',
    },
  },

  inneed: {
    id: 'inneed',
    name: 'INNEED',
    tagline: 'Designing motivation into every step of the journey.',
    subtitle: 'Retention-focused experience that keeps users progressing',
    year: '2026',
    role: 'Interactive Product Designer',
    duration: '6 months',
    team: '2 designers, 4 developers',
    contributors: ['Interaction Design', 'User Research', 'Frontend Developer'],
    heroImage: '/inneed.png',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1e40af 50%, #6366F1 100%)',

    overview: 'I owned the complete UX strategy for INNEED, designing an experience that transforms the emotionally draining job search into something users actually look forward to. My work focused on creating momentum through smart progress systems and celebrating every small win.',

    challenge: 'This project pushed me to deeply understand user psychology around motivation and frustration. I conducted extensive user interviews, identified the exact moments people give up, and designed interventions that turn those drop-off points into engagement opportunities.',

    approach: [
      {
        title: 'Empathy-Driven Research',
        desc: 'I spent weeks talking to job seekers, understanding their emotional journey, and mapping the exact pain points where motivation breaks down.'
      },
      {
        title: 'Momentum Design System',
        desc: 'Created a comprehensive system of progress indicators, micro-celebrations, and smart nudges that I prototyped and iterated on extensively.'
      },
      {
        title: 'Full-Stack Implementation',
        desc: 'Went beyond design to build key frontend interactions myself, ensuring the vision translated perfectly into the final product.'
      },
    ],

    results: [
      { value: '67%', label: 'Increase in user consistency' },
      { value: '92%', label: 'Engagement score' },
      { value: '2.5x', label: 'Higher completion rate' },
      { value: '45%', label: 'Retention improvement' },
    ],

    gallery: ['/inneed.png', '/inneed1.png', '/inneed2.png', '/inneed3.png'],
    video: '/inneed.mp4',

    testimonial: {
      quote: 'Working with Jigme was a game-changer for our team. He has this rare ability to take complex problems and simplify them into elegant solutions. His designs weren\'t just beautiful - they were backed by real user research and delivered measurable results. He\'s the kind of designer who makes everyone around him better.',
      author: 'Tshering Dorji',
      role: 'Tech Lead, INNEED Team',
    },
  },

  tovo: {
    id: 'tovo',
    name: 'TOVO',
    tagline: 'Turning simple choices into engaging experiences.',
    subtitle: 'Interactive design focused on habit and return behavior',
    year: '2025',
    role: 'UI/UX Designer',
    duration: '5 months',
    team: '2 designers, 3 developers',
    contributors: ['Interaction Design', 'Frontend Dev', 'API Integration'],
    heroImage: '/tovo.png',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',

    overview: 'I redesigned TOVO from the ground up, turning a forgettable food ordering app into an experience users genuinely enjoy. My focus was eliminating decision fatigue through intelligent design patterns and delightful micro-interactions.',

    challenge: 'The existing app was functional but boring. I took on the challenge of making routine decisions feel fresh and engaging, proving that even utility apps can create emotional connections with users.',

    approach: [
      {
        title: 'Decision Architecture',
        desc: 'I restructured the entire information hierarchy to reduce cognitive load while making discovery feel exciting and personal.'
      },
      {
        title: 'Interaction Choreography',
        desc: 'Designed a complete animation system with custom timing curves that make every tap, swipe, and transition feel intentional.'
      },
      {
        title: 'Developer Handoff Excellence',
        desc: 'Created detailed specs and worked closely with developers to ensure every design detail shipped exactly as intended.'
      },
    ],

    results: [
      { value: '45%', label: 'Increase in repeat orders' },
      { value: '78%', label: 'Drop-off reduction' },
      { value: '12s', label: 'Interaction time' },
      { value: '4.9', label: 'User rating' },
    ],

    gallery: ['/tovo1.png', '/tovo2.png', '/tovo3.png', '/tovo4.png'],

    testimonial: {
      quote: 'Jigme doesn\'t just design screens - he thinks through every user interaction obsessively. His attention to detail is insane, and he\'s incredibly collaborative. When we hit technical constraints, he found creative solutions instead of compromising the experience. I\'d work with him again in a heartbeat.',
      author: 'Pema Yangzom',
      role: 'Product Manager, TOVO Team',
    },
  },
};

const projectOrder = ['qube', 'inneed', 'tovo'];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId] || projectsData.qube;
  
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const taglineRef = useRef(null);
  const scrollTextRef = useRef(null);
  const posterRef = useRef(null);
  const galleryModalRef = useRef(null);
  const circlesRef = useRef([]);
  const gridRef = useRef(null);

  const otherProjects = projectOrder.filter(pid => pid !== projectId);

  // Open gallery modal with GSAP Flip animation
  const openGallery = (index) => {
    setSelectedImage(index);
    setGalleryOpen(true);
    
    gsap.fromTo(galleryModalRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );
  };

  const closeGallery = () => {
    gsap.to(galleryModalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setGalleryOpen(false)
    });
  };

  const nextImage = () => {
    gsap.to('.gallery-image', {
      x: -50,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setSelectedImage((prev) => (prev + 1) % project.gallery.length);
        gsap.fromTo('.gallery-image',
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });
  };

  const prevImage = () => {
    gsap.to('.gallery-image', {
      x: 50,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setSelectedImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
        gsap.fromTo('.gallery-image',
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Floating circles
      circlesRef.current.forEach((circle) => {
        if (!circle) return;
        gsap.to(circle, {
          x: gsap.utils.random(-30, 30),
          y: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      // Grid parallax
      const handleMouseMove = (e) => {
        if (!gridRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 15;
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        gsap.to(gridRef.current, { x, y, duration: 1.5, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', handleMouseMove);

      // Tagline character animation
      if (taglineRef.current) {
        const chars = taglineRef.current.querySelectorAll('.char');
        gsap.fromTo(chars,
          { y: 100, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.02, ease: 'power4.out', delay: 0.3 }
        );
      }

      // Scroll text parallax
      gsap.to(scrollTextRef.current, {
        y: 400,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });

      // Poster reveal
      gsap.fromTo(posterRef.current,
        { y: 120, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.8 }
      );

      // Section animations
      gsap.utils.toArray('.animate-section').forEach((section) => {
        gsap.fromTo(section,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 85%' }
          }
        );
      });

      // Approach cards stagger
      gsap.utils.toArray('.approach-card').forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: i * 0.15,
            scrollTrigger: { trigger: '.approach-section', start: 'top 80%' }
          }
        );
      });

      // Stats animation
      gsap.utils.toArray('.stat-item').forEach((stat, i) => {
        gsap.fromTo(stat,
          { y: 50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: i * 0.1,
            scrollTrigger: { trigger: '.results-section', start: 'top 80%' }
          }
        );
      });

      // Gallery items
      gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.fromTo(item,
          { y: 60, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: '.gallery-section', start: 'top 85%' }
          }
        );
      });

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [projectId]);

  const splitText = (text) => {
    // Split by words first to preserve word integrity
    const words = text.split(' ');
    let charIndex = 0;
    
    return words.map((word, wordIndex) => (
      <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, i) => (
          <span 
            key={charIndex++} 
            className="char" 
            style={{ 
              display: 'inline-block',
              whiteSpace: char === '\n' ? 'pre-wrap' : 'normal'
            }}
          >
            {char === '\n' ? <br /> : char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="char" style={{ display: 'inline-block', width: '0.3em' }}>&nbsp;</span>
        )}
      </span>
    ));
  };

  const circleConfigs = [
    { top: '10%', left: '-5%', color: '#070DC7', size: 350 },
    { top: '20%', right: '-5%', color: '#1A64BA', size: 300 },
    { bottom: '30%', left: '5%', color: '#6048B7', size: 280 },
    { bottom: '10%', right: '0%', color: '#6A44F4', size: 320 },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        fontFamily: "'Montserrat', sans-serif",
        color: '#fff',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background - matching App.jsx */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #080C72 0%, #0a0e5c 50%, #080C72 100%)'
        }} />
        
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(150px)'
        }} />

        <div
          ref={gridRef}
          style={{
            position: 'absolute',
            inset: '-50px',
            opacity: 0.08,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* Floating blur circles */}
        {circleConfigs.map((c, i) => (
          <div
            key={i}
            ref={el => circlesRef.current[i] = el}
            style={{
              position: 'absolute',
              ...c,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
              borderRadius: '50%',
              filter: 'blur(80px)',
              opacity: 0.6,
            }}
          />
        ))}

        {/* 3D Interactive Elements */}
        <FloatingTorus size={150} position={{ right: '3%', top: '30%' }} />
        <FloatingSphere size={120} position={{ left: '2%', bottom: '40%' }} />
      </div>

      <Bubbles />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="project-detail-hero" style={{
        minHeight: '100vh',
        padding: '140px 80px 80px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Scroll text behind */}
        <div
          ref={scrollTextRef}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '40px',
            fontSize: 'clamp(100px, 18vw, 180px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            textTransform: 'uppercase',
            letterSpacing: '-5px',
            zIndex: 0,
            writingMode: 'vertical-rl',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          Scroll
        </div>

        {/* Tagline */}
        <h1
          ref={taglineRef}
          style={{
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            lineHeight: 1.15,
            maxWidth: '850px',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 10,
            perspective: '1000px',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
          }}
        >
          {splitText(project.tagline)}
        </h1>

        {/* Meta Info */}
        <div className="animate-section" style={{
          display: 'flex',
          gap: '50px',
          marginBottom: '60px',
          flexWrap: 'wrap',
          zIndex: 10,
        }}>
          {[
            { label: 'Project', value: project.name },
            { label: 'Year', value: project.year },
            { label: 'Role', value: project.role },
            { label: 'Duration', value: project.duration },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: '10px', opacity: 0.4, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '3px', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Big Poster Image */}
        <div
          ref={posterRef}
          onClick={() => openGallery(0)}
          style={{
            width: '100%',
            maxWidth: '1100px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 60px 120px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            position: 'relative',
            zIndex: 10,
            cursor: 'pointer',
            transition: 'transform 0.4s ease, box-shadow 0.4s ease',
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.01, boxShadow: '0 70px 140px rgba(0,0,0,0.5)', duration: 0.4 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, boxShadow: '0 60px 120px rgba(0,0,0,0.4)', duration: 0.4 });
          }}
        >
          <img
            src={project.heroImage}
            alt={project.name}
            width={1100}
            height={550}
            fetchPriority="high"
            style={{ width: '100%', height: 'auto', display: 'block', minHeight: '450px', objectFit: 'cover', aspectRatio: '2 / 1' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(8,12,114,0.9), transparent)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            fontSize: '12px',
            opacity: 0.6,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Click to view gallery
          </div>
        </div>

        {/* Video Reel - Right under the hook */}
        {project.video && (
          <div style={{ marginTop: '60px', width: '100%', maxWidth: '1100px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              marginBottom: '24px' 
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ff4444',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span style={{ 
                fontSize: '13px', 
                textTransform: 'uppercase', 
                letterSpacing: '3px', 
                opacity: 0.7,
                fontWeight: 600,
              }}>
                Watch the Story Unfold
              </span>
            </div>
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '20px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              }}
            >
              <video
                controls
                preload="metadata"
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  background: '#000',
                }}
              >
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </section>

      {/* Overview */}
      <section className="animate-section" style={{ padding: '100px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '24px', fontWeight: 600 }}>Overview</h2>
        <p style={{ fontSize: 'clamp(20px, 2.8vw, 30px)', lineHeight: 1.7, fontWeight: 300, color: 'rgba(255,255,255,0.9)' }}>
          {project.overview}
        </p>
      </section>

      {/* Challenge */}
      <section className="animate-section" style={{ padding: '100px 80px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '24px', fontWeight: 600 }}>The Challenge</h2>
          <p style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.8, fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>
            {project.challenge}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="approach-section" style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '50px', fontWeight: 600 }}>How I Helped</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {project.approach.map((item, i) => (
              <div
                key={i}
                className="approach-card"
                style={{
                  padding: '40px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -8, background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', duration: 0.3 });
                }}
              >
                <div style={{ fontSize: '48px', fontWeight: 700, opacity: 0.1, marginBottom: '20px' }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: '#fff' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.8, opacity: 0.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .project-detail-hero {
              padding: 120px 40px 80px !important;
            }
            .animate-section, .approach-section, .gallery-section, .results-section {
              padding: 60px 40px !important;
            }
          }
          @media (max-width: 768px) {
            .project-detail-hero {
              padding: 100px 24px 60px !important;
            }
            .animate-section, .approach-section, .gallery-section, .results-section {
              padding: 40px 24px !important;
            }
            .results-section > div > div {
              flex-direction: column !important;
            }
          }
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
        `}</style>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section" style={{ padding: '100px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '50px', fontWeight: 600 }}>Project Gallery</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => openGallery(i)}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  aspectRatio: '4/3',
                  background: 'rgba(255,255,255,0.05)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.03, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('.gallery-overlay'), { opacity: 1, duration: 0.3 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });
                  gsap.to(e.currentTarget.querySelector('.gallery-overlay'), { opacity: 0, duration: 0.3 });
                }}
              >
                <img src={img} alt={`${project.name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="gallery-overlay" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(8,12,114,0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '2px' }}>VIEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="results-section" style={{ padding: '100px 80px', background: 'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '50px', fontWeight: 600 }}>The Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {project.results.map((stat, i) => (
              <div key={i} className="stat-item" style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(48px, 8vw, 72px)',
                  fontWeight: 700,
                  marginBottom: '12px',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(200,200,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', opacity: 0.6, letterSpacing: '1px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="animate-section" style={{ padding: '100px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.2, marginBottom: '30px' }}>
            <path d="M10 8H6L4 12V18H10V12H6L8 8H10V8ZM20 8H16L14 12V18H20V12H16L18 8H20V8Z" fill="white"/>
          </svg>
          <p style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '30px', fontWeight: 300, color: 'rgba(255,255,255,0.9)' }}>
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{project.testimonial.author}</p>
          <p style={{ fontSize: '12px', opacity: 0.5, marginTop: '4px' }}>{project.testimonial.role}</p>
        </div>
      </section>

      {/* Other Projects Carousel */}
      <section className="animate-section" style={{ padding: '100px 80px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '50px', fontWeight: 600 }}>Other Projects</h2>
          <div style={{ display: 'flex', gap: '30px', overflowX: 'auto', paddingBottom: '20px' }}>
            {otherProjects.map((pid) => {
              const p = projectsData[pid];
              return (
                <div
                  key={pid}
                  onClick={() => navigate(`/project/${pid}`)}
                  style={{
                    minWidth: '350px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { y: -10, boxShadow: '0 30px 60px rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.2)', duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { y: 0, boxShadow: 'none', borderColor: 'rgba(255,255,255,0.08)', duration: 0.3 });
                  }}
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={p.heroImage} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>{p.name}</h3>
                    <p style={{ fontSize: '13px', opacity: 0.6, lineHeight: 1.6 }}>{p.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Gallery Modal */}
      {galleryOpen && (
        <div
          ref={galleryModalRef}
          onClick={closeGallery}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeGallery(); }}
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '32px',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
            onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
          >
            &times;
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'absolute',
              left: '30px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '24px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            &#8249;
          </button>

          <img
            className="gallery-image"
            src={project.gallery[selectedImage]}
            alt={`${project.name} ${selectedImage + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}
          />

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'absolute',
              right: '30px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '24px',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            &#8250;
          </button>

          <div style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            gap: '10px',
          }}>
            {project.gallery.map((_, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(i); }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: i === selectedImage ? '#fff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bubbles from './Bubbles';
import { Navbar } from './navbar';
import Footer from './Footer';
import ContactSection from './Contact';

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
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6366F1 100%)',
    overview: 'QUBE transforms the traditional loyalty program into an engaging, game-like experience. By incorporating interactive elements directly into the dining journey, we created a system that feels less like point collection and more like play.',
    challenge: 'Traditional restaurant loyalty programs fail to excite customers. Points systems feel disconnected from the dining experience, resulting in low engagement and forgotten rewards. Restaurants needed a way to make loyalty feel rewarding in the moment, not just at redemption.',
    approach: [
      { title: 'Research & Discovery', desc: 'Conducted 40+ user interviews and analyzed competitor loyalty apps to understand pain points and opportunities in the F&B space.' },
      { title: 'Gamification Framework', desc: 'Designed a reward system based on behavioral psychology principles - variable rewards, progression mechanics, and social proof.' },
      { title: 'Rapid Prototyping', desc: 'Built and tested 3 distinct interaction models before landing on the QR-scan-to-play mechanic that became QUBE\'s signature.' },
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
    gallery: ['/qube.png', '/qube-2.png', '/qube-3.png', '/qube-4.png'],
    video: '/qube-demo.mp4',
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
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1e40af 50%, #6366F1 100%)',
    overview: 'INNEED reimagines the job search as a journey of self-discovery rather than a stressful hunt. By focusing on skills and potential rather than just experience, we created a platform that empowers candidates and delights recruiters.',
    challenge: 'Job searching is inherently stressful and overwhelming. Candidates face endless scrolling through irrelevant listings, impersonal application processes, and the dreaded silence after submitting. We needed to humanize the journey while making it remarkably efficient.',
    approach: [
      { title: 'Empathy Mapping', desc: 'Shadowed 20 job seekers through their entire search process to identify emotional highs, lows, and friction points.' },
      { title: 'AI-Powered Matching', desc: 'Designed an intelligent matching system that learns preferences over time and surfaces opportunities proactively.' },
      { title: 'Progress Visualization', desc: 'Created a journey map that celebrates small wins and maintains momentum throughout the search.' },
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
    gallery: ['/inneed.png', '/inneed-2.png', '/inneed-3.png', '/inneed-4.png'],
    video: '/inneed-demo.mp4',
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
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
    overview: 'TOVO brings personality back to food delivery. By combining mood-based recommendations with a visually stunning interface, we turned the mundane task of ordering food into a moment of anticipation and excitement.',
    challenge: 'Food delivery apps have become cluttered, slow, and devoid of personality. Decision fatigue leads to abandoned carts, while generic interfaces strip away the joy of discovering new cuisines. We needed to make ordering feel as satisfying as the first bite.',
    approach: [
      { title: 'Mood-Based Discovery', desc: 'Designed an innovative recommendation engine that suggests food based on mood, weather, and time of day.' },
      { title: 'Visual Storytelling', desc: 'Created immersive restaurant pages that communicate atmosphere, not just menu items.' },
      { title: 'Friction Elimination', desc: 'Reduced checkout to 3 taps through smart defaults and predictive ordering.' },
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
    gallery: ['/tovo.png', '/tovo-2.png', '/tovo-3.png', '/tovo-4.png'],
    video: '/tovo-demo.mp4',
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

      // Journey items with bounce effect
      gsap.utils.toArray('.journey-item').forEach((item, i) => {
        gsap.fromTo(item,
          { y: 80, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, delay: i * 0.2, ease: 'elastic.out(1, 0.6)',
            scrollTrigger: { trigger: '.journey-section', start: 'top 80%' }
          }
        );
      });

      // Journey path line draw animation
      gsap.to('.journey-line-fill', {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.journey-section', start: 'top 70%' }
      });

      // Journey particles floating
      gsap.utils.toArray('.journey-particle').forEach((particle) => {
        gsap.to(particle, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
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
    return text.split('').map((char, i) => (
      <span key={i} className="char" style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
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
      </div>

      <Bubbles />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} style={{
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
            style={{ width: '100%', height: 'auto', display: 'block', minHeight: '450px', objectFit: 'cover' }}
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
      </section>

      {/* User Journey - Fun Interactive Section */}
      <section className="journey-section" style={{ padding: '120px 80px', background: 'rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden' }}>
        {/* Animated background particles */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="journey-particle"
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                borderRadius: '50%',
                background: `rgba(${150 + Math.random() * 100}, ${100 + Math.random() * 100}, 255, ${0.1 + Math.random() * 0.2})`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '4px', opacity: 0.4, marginBottom: '20px', fontWeight: 600, textAlign: 'center' }}>The User Journey</h2>
          <p style={{ fontSize: '18px', opacity: 0.6, marginBottom: '60px', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            A seamless experience from start to finish
          </p>
          
          {/* Journey Path */}
          <div style={{ position: 'relative', padding: '40px 0' }}>
            {/* Animated connecting path */}
            <svg className="journey-path" style={{ position: 'absolute', top: '80px', left: '10%', width: '80%', height: '4px', overflow: 'visible' }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(100,100,255,0.8)" />
                  <stop offset="50%" stopColor="rgba(150,100,255,0.8)" />
                  <stop offset="100%" stopColor="rgba(200,100,255,0.8)" />
                </linearGradient>
              </defs>
              <line x1="0" y1="2" x2="100%" y2="2" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <line className="journey-line-fill" x1="0" y1="2" x2="100%" y2="2" stroke="url(#pathGradient)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
            </svg>

            {/* Journey Steps */}
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', gap: '20px' }}>
              {project.journey.map((step, i) => (
                <div
                  key={i}
                  className="journey-item"
                  style={{
                    flex: '1 1 200px',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    padding: '20px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const circle = e.currentTarget.querySelector('.journey-circle');
                    const icon = e.currentTarget.querySelector('.journey-icon');
                    const pulse = e.currentTarget.querySelector('.journey-pulse');
                    gsap.to(circle, { scale: 1.15, background: 'rgba(100,100,255,0.3)', borderColor: 'rgba(150,150,255,0.6)', boxShadow: '0 0 40px rgba(100,100,255,0.4)', duration: 0.4, ease: 'elastic.out(1, 0.5)' });
                    gsap.to(icon, { scale: 1.2, color: '#fff', duration: 0.3 });
                    gsap.to(pulse, { scale: 2.5, opacity: 0, duration: 0.8, ease: 'power2.out' });
                  }}
                  onMouseLeave={(e) => {
                    const circle = e.currentTarget.querySelector('.journey-circle');
                    const icon = e.currentTarget.querySelector('.journey-icon');
                    const pulse = e.currentTarget.querySelector('.journey-pulse');
                    gsap.to(circle, { scale: 1, background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.2)', boxShadow: 'none', duration: 0.3 });
                    gsap.to(icon, { scale: 1, color: 'rgba(255,255,255,0.7)', duration: 0.3 });
                    gsap.to(pulse, { scale: 1, opacity: 0.3, duration: 0.3 });
                  }}
                >
                  {/* Step Circle */}
                  <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 24px' }}>
                    {/* Pulse ring */}
                    <div className="journey-pulse" style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      border: '2px solid rgba(100,100,255,0.3)',
                      opacity: 0.3,
                    }} />
                    
                    <div className="journey-circle" style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.4s ease',
                      backdropFilter: 'blur(10px)',
                    }}>
                      <span className="journey-icon" style={{
                        fontSize: '32px',
                        fontWeight: 800,
                        color: 'rgba(255,255,255,0.7)',
                        transition: 'all 0.3s ease',
                      }}>
                        {step.icon}
                      </span>
                    </div>
                    
                    {/* Step connector dot */}
                    {i < project.journey.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        right: '-60%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'rgba(150,100,255,0.5)',
                        boxShadow: '0 0 10px rgba(150,100,255,0.5)',
                      }} />
                    )}
                  </div>
                  
                  <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#fff', letterSpacing: '0.5px' }}>{step.phase}</h4>
                  <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.7, maxWidth: '180px', margin: '0 auto' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-25px) translateX(5px); }
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

import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bubbles from './Bubbles';

gsap.registerPlugin(ScrollTrigger);

const projectsData = {
  qube: {
    id: 'qube',
    name: 'QUBE',
    tagline: 'Turning rewards into a seamless experience.',
    year: '2024',
    role: 'Lead Designer',
    contributors: ['UI/UX Design', 'Frontend Dev', 'Gamification'],
    heroImage: '/qube.png',
    challenge: {
      title: 'The Challenge',
      text: 'Traditional reward systems fail to engage users meaningfully. Points accumulate without excitement, redemption feels tedious, and users eventually disengage. QUBE needed to transform mundane point collection into an addictive, game-like experience that keeps users coming back.',
    },
    approach: {
      title: 'The Approach',
      text: 'I designed an interactive gamification layer that makes every interaction feel rewarding. Quick unlock mechanics, streak bonuses, and visual feedback create dopamine-driven engagement. The UI celebrates small wins while building toward meaningful rewards.',
    },
    result: {
      title: 'The Result',
      stats: [
        { value: '340%', label: 'Increase in daily active users' },
        { value: '89%', label: 'User retention after 30 days' },
        { value: '4.8', label: 'App store rating' },
      ],
      text: 'QUBE transformed user engagement metrics across the board. The gamified approach created genuine excitement around rewards, turning passive users into active participants.',
    },
    screens: ['/qube.png', '/qube.png', '/qube.png'],
    color: '#6366F1',
  },
  inneed: {
    id: 'inneed',
    name: 'INNEED',
    tagline: 'Turning job search into a seamless experience.',
    year: '2024',
    role: 'Product Designer',
    contributors: ['UI/UX Design', 'React Development', 'Animation'],
    heroImage: '/inneed.png',
    challenge: {
      title: 'The Challenge',
      text: 'Job searching is inherently stressful and overwhelming. Candidates face endless scrolling, impersonal applications, and zero feedback. INNEED needed to humanize the job search experience while making it more efficient and less anxiety-inducing.',
    },
    approach: {
      title: 'The Approach',
      text: 'I created an opportunity-first interface that surfaces relevant matches proactively. Real-time status updates, personalized recommendations, and micro-interactions reduce uncertainty. The design focuses on progress visualization to maintain motivation.',
    },
    result: {
      title: 'The Result',
      stats: [
        { value: '67%', label: 'Faster time to hire' },
        { value: '92%', label: 'User satisfaction score' },
        { value: '2.5x', label: 'Application completion rate' },
      ],
      text: 'INNEED redefined job searching as an empowering journey rather than a frustrating chore. Users report feeling more in control and optimistic throughout their search.',
    },
    screens: ['/inneed.png', '/inneed.png', '/inneed.png'],
    color: '#3B82F6',
  },
  tovo: {
    id: 'tovo',
    name: 'TOVO',
    tagline: 'Turning food ordering into a delightful experience.',
    year: '2023',
    role: 'UX Designer',
    contributors: ['UI/UX Design', 'Frontend Dev', 'API Integration'],
    heroImage: '/tovo.png',
    challenge: {
      title: 'The Challenge',
      text: 'Food delivery apps are cluttered, slow, and impersonal. Decision fatigue leads to abandoned carts, while generic interfaces fail to capture the joy of food. TOVO needed to make ordering as enjoyable as eating.',
    },
    approach: {
      title: 'The Approach',
      text: 'I designed a visually rich, fast-loading interface with smart defaults and AI-powered recommendations. Animated food photography, playful micro-interactions, and streamlined checkout reduce friction while increasing appetite appeal.',
    },
    result: {
      title: 'The Result',
      stats: [
        { value: '45%', label: 'Increase in order value' },
        { value: '78%', label: 'Reduction in cart abandonment' },
        { value: '12s', label: 'Average time to order' },
      ],
      text: 'TOVO proved that food apps can be both beautiful and functional. The design drives conversions while creating genuine delight at every tap.',
    },
    screens: ['/tovo.png', '/tovo.png', '/tovo.png'],
    color: '#F59E0B',
  },
};

const projectOrder = ['qube', 'inneed', 'tovo'];

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = projectsData[projectId] || projectsData.qube;
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);
  const challengeRef = useRef(null);
  const approachRef = useRef(null);
  const resultRef = useRef(null);
  const statsRef = useRef([]);
  const screensRef = useRef(null);
  const ctaRef = useRef(null);
  const tabsRef = useRef(null);

  const currentIndex = projectOrder.indexOf(projectId);
  const prevProject = currentIndex > 0 ? projectOrder[currentIndex - 1] : null;
  const nextProject = currentIndex < projectOrder.length - 1 ? projectOrder[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(metaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo(imageRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.7 }
      );

      // Tabs animation
      gsap.fromTo(tabsRef.current?.children || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.9 }
      );

      // Scroll-triggered sections
      gsap.fromTo(challengeRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: challengeRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(approachRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: approachRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(resultRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: resultRef.current, start: 'top 80%' }
        }
      );

      // Stats counter animation
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)',
            delay: i * 0.15,
            scrollTrigger: { trigger: resultRef.current, start: 'top 70%' }
          }
        );
      });

      // Screens parallax
      gsap.fromTo(screensRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: screensRef.current, start: 'top 85%' }
        }
      );

      // CTA section
      gsap.fromTo(ctaRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' }
        }
      );
    });

    return () => ctx.revert();
  }, [projectId]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #080C72 0%, #0a0e5c 50%, #080C72 100%)',
      fontFamily: "'Montserrat', sans-serif",
      color: '#fff',
      overflowX: 'hidden',
    }}>
      {/* Bubbles */}
      <Bubbles />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(8, 12, 114, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Link to="/" style={{
          color: '#fff',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 500,
          opacity: 0.8,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        {/* Project Tabs */}
        <div ref={tabsRef} style={{ display: 'flex', gap: '8px' }}>
          {projectOrder.map((pid) => (
            <button
              key={pid}
              onClick={() => navigate(`/project/${pid}`)}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                border: 'none',
                background: projectId === pid 
                  ? 'rgba(255,255,255,0.95)' 
                  : 'rgba(255,255,255,0.1)',
                color: projectId === pid ? '#080C72' : 'rgba(255,255,255,0.7)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: "'Montserrat', sans-serif",
              }}
              onMouseEnter={e => {
                if (projectId !== pid) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = '#fff';
                }
              }}
              onMouseLeave={e => {
                if (projectId !== pid) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                }
              }}
            >
              {projectsData[pid].name}
            </button>
          ))}
        </div>

        <Link to="/contact" style={{
          padding: '10px 24px',
          borderRadius: '30px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
        >
          Contact
        </Link>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '140px 40px 80px',
        textAlign: 'center',
      }}>
        {/* Title */}
        <h1 ref={titleRef} style={{
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          maxWidth: '900px',
          marginBottom: '50px',
          background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {project.tagline}
        </h1>

        {/* Meta Info */}
        <div ref={metaRef} style={{
          display: 'flex',
          gap: '60px',
          marginBottom: '60px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>{project.name}</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Year</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>{project.year}</div>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '12px', opacity: 0.5, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contributors</div>
            <div style={{ fontSize: '16px', fontWeight: 600 }}>{project.contributors.join(' / ')}</div>
          </div>
        </div>

        {/* Hero Image */}
        <div ref={imageRef} style={{
          width: '100%',
          maxWidth: '1000px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.1)',
        }}>
          <img 
            src={project.heroImage} 
            alt={project.name}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </div>
      </section>

      {/* Challenge Section */}
      <section ref={challengeRef} style={{
        padding: '100px 40px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          opacity: 0.5,
          marginBottom: '20px',
        }}>Challenge</h2>
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          lineHeight: 1.8,
          opacity: 0.9,
        }}>
          {project.challenge.text}
        </p>
      </section>

      {/* Approach Section */}
      <section ref={approachRef} style={{
        padding: '100px 40px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          opacity: 0.5,
          marginBottom: '20px',
        }}>Approach</h2>
        <p style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          lineHeight: 1.8,
          opacity: 0.9,
        }}>
          {project.approach.text}
        </p>
      </section>

      {/* Result Section */}
      <section ref={resultRef} style={{
        padding: '100px 40px',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '60px',
          }}>Result</h2>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}>
            {project.result.stats.map((stat, i) => (
              <div
                key={i}
                ref={el => statsRef.current[i] = el}
                style={{
                  textAlign: 'center',
                  padding: '40px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div style={{
                  fontSize: 'clamp(40px, 6vw, 64px)',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${project.color} 0%, #fff 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '10px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '14px',
                  opacity: 0.7,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.8,
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {project.result.text}
          </p>
        </div>
      </section>

      {/* Screens Gallery */}
      <section ref={screensRef} style={{
        padding: '100px 40px',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {project.screens.map((screen, i) => (
            <div
              key={i}
              style={{
                width: 'min(350px, 90vw)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
                transform: `rotate(${i === 1 ? 0 : i === 0 ? -3 : 3}deg)`,
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = `rotate(${i === 1 ? 0 : i === 0 ? -3 : 3}deg) scale(1)`;
              }}
            >
              <img
                src={screen}
                alt={`${project.name} screen ${i + 1}`}
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{
        padding: '120px 40px',
        background: project.color,
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 40px)',
          fontWeight: 300,
          marginBottom: '10px',
        }}>Your Path To</h2>
        <h3 style={{
          fontSize: 'clamp(40px, 7vw, 80px)',
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>OPPORTUNITY</h3>
        <p style={{
          fontSize: '20px',
          marginBottom: '40px',
        }}>Starts Here</p>
        
        <Link to="/contact" style={{
          display: 'inline-block',
          padding: '18px 50px',
          background: '#fff',
          color: project.color,
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
        }}
        >
          Start a Project
        </Link>
      </section>

      {/* Project Navigation */}
      <section style={{
        padding: '60px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {prevProject ? (
          <Link
            to={`/project/${prevProject}`}
            style={{
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span style={{ fontSize: '14px' }}>Previous: {projectsData[prevProject].name}</span>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link
            to={`/project/${nextProject}`}
            style={{
              color: '#fff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: 0.7,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
          >
            <span style={{ fontSize: '14px' }}>Next: {projectsData[nextProject].name}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        ) : <div />}
      </section>

      {/* Footer CTA */}
      <section style={{
        padding: '100px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <h2 style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 700,
          marginBottom: '30px',
        }}>Lets Join Forces</h2>
        <p style={{
          fontSize: '18px',
          opacity: 0.7,
          marginBottom: '40px',
          maxWidth: '500px',
          margin: '0 auto 40px',
        }}>
          Ready to create something extraordinary together?
        </p>
        <Link to="/contact" id="contact-btn" style={{
          display: 'inline-block',
          padding: '20px 60px',
          background: 'rgba(255,255,255,0.95)',
          color: '#080C72',
          borderRadius: '50px',
          fontSize: '18px',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'all 0.4s ease',
          boxShadow: '0 0 30px rgba(255,255,255,0.3), 0 20px 50px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 50px rgba(255,255,255,0.5), 0 30px 60px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.3), 0 20px 50px rgba(0,0,0,0.3)';
        }}
        >
          Contact Me
        </Link>
      </section>
    </div>
  );
}

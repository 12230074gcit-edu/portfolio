import { useEffect, useRef, useState } from 'react';
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
    year: '2026',
    contributors: ['User Interface Design', 'User Research', 'Frontend Developer'],
    heroImage: '/qube.png',
    heroImages: ['/qube.png', '/qube.png', '/qube.png', '/qube.png', '/qube.png', '/qube.png'],
    video: null,
    challenge: {
      title: 'Challenge',
      text: 'Traditional restaurant loyalty programs fail to excite customers. Points systems feel disconnected from the dining experience, resulting in low engagement and forgotten rewards. QUBE needed to transform how diners interact with rewards by making the experience as enjoyable as the meal itself.',
    },
    result: {
      title: 'Result',
      stats: [
        { value: '340%', label: 'Increase in daily active users' },
        { value: '89%', label: 'User retention after 30 days' },
        { value: '4.8', label: 'App store rating' },
      ],
      text: 'QUBE revolutionized restaurant engagement by turning rewards into an interactive dining companion. Users now actively seek out QUBE-enabled restaurants, creating a new standard for F&B loyalty programs.',
    },
    screens: ['/qube.png', '/qube.png', '/qube.png', '/qube.png'],
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6366F1 100%)',
  },
  inneed: {
    id: 'inneed',
    name: 'INNEED',
    tagline: 'Turning job search into a seamless experience.',
    year: '2026',
    contributors: ['User Interface Design', 'User Research', 'Frontend Developer'],
    heroImage: '/inneed.png',
    heroImages: ['/inneed.png', '/inneed.png', '/inneed.png', '/inneed.png', '/inneed.png', '/inneed.png'],
    video: null,
    challenge: {
      title: 'Challenge',
      text: 'Job searching is inherently stressful and overwhelming. Candidates face endless scrolling through irrelevant listings, impersonal application processes, and the dreaded silence after submitting. INNEED needed to humanize the journey while making it remarkably efficient.',
    },
    result: {
      title: 'Result',
      stats: [
        { value: '67%', label: 'Faster time to hire' },
        { value: '92%', label: 'User satisfaction score' },
        { value: '2.5x', label: 'Application completion rate' },
      ],
      text: 'INNEED redefined job searching as an empowering journey. Users report feeling more in control and optimistic throughout their search, with significantly reduced job search anxiety.',
    },
    screens: ['/inneed.png', '/inneed.png', '/inneed.png', '/inneed.png'],
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1e40af 50%, #3B82F6 100%)',
  },
  tovo: {
    id: 'tovo',
    name: 'TOVO',
    tagline: 'Turning food ordering into a delightful experience.',
    year: '2025',
    contributors: ['User Interface Design', 'Frontend Dev', 'API Integration'],
    heroImage: '/tovo.png',
    heroImages: ['/tovo.png', '/tovo.png', '/tovo.png', '/tovo.png', '/tovo.png', '/tovo.png'],
    video: null,
    challenge: {
      title: 'Challenge',
      text: 'Food delivery apps have become cluttered, slow, and devoid of personality. Decision fatigue leads to abandoned carts, while generic interfaces strip away the joy of discovering new cuisines. TOVO needed to make ordering feel as satisfying as the first bite.',
    },
    result: {
      title: 'Result',
      stats: [
        { value: '45%', label: 'Increase in order value' },
        { value: '78%', label: 'Reduction in cart abandonment' },
        { value: '12s', label: 'Average time to order' },
      ],
      text: 'TOVO proved that food apps can spark joy. The design drives conversions while creating genuine delight at every tap, making users crave the app almost as much as the food.',
    },
    screens: ['/tovo.png', '/tovo.png', '/tovo.png', '/tovo.png'],
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #d97706 50%, #F59E0B 100%)',
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
  const resultRef = useRef(null);
  const statsRef = useRef([]);
  const screensRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const hatRef = useRef(null);
  const carouselRef = useRef(null);

  const currentIndex = projectOrder.indexOf(projectId);
  const nextProject = projectOrder[(currentIndex + 1) % projectOrder.length];
  const prevProject = projectOrder[(currentIndex - 1 + projectOrder.length) % projectOrder.length];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Hat floating animation
      if (hatRef.current) {
        gsap.to(hatRef.current, {
          y: -15,
          rotation: 5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Scroll indicator rotation
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          rotation: 360,
          duration: 15,
          repeat: -1,
          ease: 'none',
        });
      }

      // Hero animations - staggered entrance
      gsap.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.3 }
      );

      gsap.fromTo(metaRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo(imageRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.9 }
      );

      // Challenge section
      gsap.fromTo(challengeRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: challengeRef.current, start: 'top 85%' }
        }
      );

      // Result section
      gsap.fromTo(resultRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: resultRef.current, start: 'top 85%' }
        }
      );

      // Stats counter animation with scale
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(stat,
          { y: 60, opacity: 0, scale: 0.8 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)',
            delay: i * 0.2,
            scrollTrigger: { trigger: resultRef.current, start: 'top 75%' }
          }
        );
      });

      // Screens gallery
      gsap.fromTo(screensRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: screensRef.current, start: 'top 90%' }
        }
      );

      // CTA section
      gsap.fromTo(ctaRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
        }
      );

      // Carousel entrance
      if (carouselRef.current) {
        gsap.fromTo(carouselRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: carouselRef.current, start: 'top 85%' }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [projectId]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #080C72 0%, #0a0e5c 100%)',
      fontFamily: "'Montserrat', sans-serif",
      color: '#fff',
      overflowX: 'hidden',
    }}>
      <Bubbles />
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        padding: '160px 60px 80px',
        position: 'relative',
      }}>
        {/* Hat mascot */}
        <div
          ref={hatRef}
          style={{
            position: 'absolute',
            top: '140px',
            right: '80px',
            width: '100px',
            height: '100px',
            zIndex: 20,
          }}
        >
          <img src="/hat.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '40px',
            transform: 'translateY(-50%)',
            width: '80px',
            height: '80px',
          }}
        >
          <svg
            ref={scrollIndicatorRef}
            viewBox="0 0 100 100"
            style={{ width: '100%', height: '100%' }}
          >
            <defs>
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
            </defs>
            <text fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Montserrat" letterSpacing="3">
              <textPath href="#circlePath">
                SCROLL DOWN SCROLL DOWN 
              </textPath>
            </text>
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#fff',
          }}/>
        </div>

        {/* Tagline */}
        <h1 ref={titleRef} style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 400,
          fontStyle: 'italic',
          fontFamily: "'Georgia', serif",
          lineHeight: 1.2,
          maxWidth: '800px',
          marginBottom: '60px',
        }}>
          {project.tagline}
        </h1>

        {/* Meta Info */}
        <div ref={metaRef} style={{
          display: 'flex',
          gap: '80px',
          marginBottom: '60px',
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Title</div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>{project.name}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Year</div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>{project.year}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Contributions</div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>
              {project.contributors.map((c, i) => (
                <div key={i} style={{ opacity: 0.9 }}>{c}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image Grid */}
        <div ref={imageRef} style={{
          width: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          background: project.gradient,
          padding: '40px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '20px',
            maxHeight: '600px',
          }}>
            {project.heroImages.map((img, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.03, duration: 0.4 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.4 });
                }}
              >
                <img
                  src={img}
                  alt={`${project.name} screen ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section ref={challengeRef} style={{
        padding: '120px 60px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          opacity: 0.4,
          marginBottom: '30px',
          fontWeight: 600,
        }}>Challenge</h2>
        <p style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          lineHeight: 1.7,
          opacity: 0.9,
          fontWeight: 300,
        }}>
          {project.challenge.text}
        </p>
      </section>

      {/* Result Section */}
      <section ref={resultRef} style={{
        padding: '120px 60px',
        background: 'rgba(0,0,0,0.15)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '80px',
          }}>Result</h2>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            marginBottom: '80px',
          }}>
            {project.result.stats.map((stat, i) => (
              <div
                key={i}
                ref={el => statsRef.current[i] = el}
                style={{
                  textAlign: 'center',
                  padding: '50px 30px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: 'clamp(48px, 8vw, 72px)',
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${project.color} 0%, #fff 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '15px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '13px',
                  opacity: 0.6,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '18px',
            lineHeight: 1.8,
            opacity: 0.7,
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
        padding: '120px 60px',
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
                width: 'min(280px, 45vw)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                transition: 'all 0.5s ease',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { rotation: 0, scale: 1.08, y: -10, duration: 0.4 });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { rotation: i % 2 === 0 ? -2 : 2, scale: 1, y: 0, duration: 0.4 });
              }}
            >
              <img src={screen} alt={`${project.name} screen ${i + 1}`} style={{ width: '100%', display: 'block' }} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} style={{
        padding: '140px 60px',
        background: project.gradient,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300,
          marginBottom: '10px',
          opacity: 0.9,
        }}>Your Path To</h2>
        <h3 style={{
          fontSize: 'clamp(48px, 8vw, 100px)',
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: '10px',
          letterSpacing: '-2px',
        }}>OPPORTUNITY</h3>
        <p style={{
          fontSize: '22px',
          marginBottom: '50px',
          opacity: 0.9,
        }}>Starts Here</p>
        
        <button
          onClick={() => navigate('/contact')}
          style={{
            display: 'inline-block',
            padding: '20px 60px',
            background: '#fff',
            color: project.color,
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            boxShadow: '0 15px 50px rgba(0,0,0,0.25)',
            fontFamily: "'Montserrat', sans-serif",
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { y: -5, scale: 1.05, boxShadow: '0 25px 60px rgba(0,0,0,0.35)', duration: 0.3 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { y: 0, scale: 1, boxShadow: '0 15px 50px rgba(0,0,0,0.25)', duration: 0.3 });
          }}
        >
          Start a Project
        </button>
      </section>

      {/* Other Projects Carousel */}
      <section ref={carouselRef} style={{
        padding: '100px 60px',
      }}>
        <h2 style={{
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          opacity: 0.4,
          marginBottom: '50px',
          textAlign: 'center',
          fontWeight: 600,
        }}>Other Projects</h2>

        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {projectOrder.filter(pid => pid !== projectId).map((pid) => {
            const p = projectsData[pid];
            return (
              <div
                key={pid}
                onClick={() => navigate(`/project/${pid}`)}
                style={{
                  width: '350px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { y: -10, scale: 1.02, duration: 0.4 });
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4 });
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <div style={{
                  height: '200px',
                  background: p.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    style={{ width: '80%', height: '80%', objectFit: 'cover', borderRadius: '12px' }}
                  />
                </div>
                <div style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{p.name}</h3>
                  <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.5 }}>{p.tagline}</p>
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    opacity: 0.7,
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

      {/* Let's Join Forces Section */}
      <section style={{
        padding: '120px 40px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(100, 100, 255, 0.12), transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }} />

        <h2 style={{
          fontSize: 'clamp(48px, 10vw, 80px)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '24px',
          position: 'relative',
          zIndex: 10,
        }}>
          Let&apos;s Join<br />Forces
        </h2>

        <p style={{
          opacity: 0.6,
          fontSize: 'clamp(14px, 2vw, 18px)',
          maxWidth: '500px',
          margin: '0 auto 40px',
          lineHeight: 1.6,
          position: 'relative',
          zIndex: 10,
        }}>
          As long as there&apos;s room to turn things up a notch, we&apos;re in.
          Let&apos;s create something extraordinary together.
        </p>

        <button
          onClick={() => navigate('/contact')}
          style={{
            padding: '18px 40px',
            borderRadius: '16px',
            border: 'none',
            background: '#fff',
            color: '#080C72',
            fontWeight: 700,
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2), 0 0 20px rgba(255,255,255,0.1)',
            position: 'relative',
            zIndex: 10,
            fontFamily: "'Montserrat', sans-serif",
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.05, y: -3, duration: 0.3 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3 });
          }}
        >
          Contact Me
        </button>
      </section>

      <Footer />
    </div>
  );
}

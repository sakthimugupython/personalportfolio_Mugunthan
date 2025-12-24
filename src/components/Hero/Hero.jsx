import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import profileImg from '../../assets/profile.jpeg';
import './Hero.css';

const Hero = () => {
  const { data, loading, error } = useData('hero');
  const heroRef = useRef(null);

  useEffect(() => {
    if (!data || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      gsap.set(['.hero-badge', '.hero-headline span', '.hero-description', '.scroll-indicator'], {
        y: 60,
        opacity: 0
      });

      tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        .to('.hero-headline span', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.5)
        .to('.hero-description', { opacity: 1, y: 0, duration: 0.7 }, 1)
        .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.6 }, 1.3)
        .to('.nav-dots', { opacity: 1, duration: 0.6 }, 1.2);
    }, heroRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg">
        <img src={profileImg} alt="Hero Background" />
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-line"></span>
          {data.badge}
        </div>
        
        <h1 className="hero-headline">
          {data.headline.map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </h1>
        
        <div className="hero-description">
          <p>{data.description}</p>
        </div>
      </div>

      <div className="nav-dots" style={{ display: 'none' }}>
        {data.navDots.map((dot, index) => (
          <div key={index} className={`nav-dot ${index === 0 ? 'active' : ''}`}>
            <span className="dot"></span>
          </div>
        ))}
      </div>

      <div className="scroll-indicator">
        <span className="scroll-icon">⌄</span>
      </div>
    </section>
  );
};

export default Hero;

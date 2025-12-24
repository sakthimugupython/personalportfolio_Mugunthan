import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import resumePDF from '../../assets/Mugunthan Resume.pdf';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { data, loading, error } = useData('about');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!data || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const header = document.querySelector('.about-header h2');
      const subtitle = document.querySelector('.about-header p');
      const left = document.querySelector('.about-left');
      const right = document.querySelector('.about-right');

      if (header) {
        gsap.from('.about-header h2', {
          scrollTrigger: { trigger: '.about', start: 'top 70%' },
          y: 80, opacity: 0, duration: 1,
        });
      }

      if (subtitle) {
        gsap.from('.about-header p', {
          scrollTrigger: { trigger: '.about', start: 'top 70%' },
          y: 40, opacity: 0, duration: 0.8, delay: 0.2,
        });
      }

      if (left) {
        gsap.from('.about-left', {
          scrollTrigger: { trigger: '.about-content', start: 'top 75%' },
          x: -80, opacity: 0, duration: 1,
        });
      }

      if (right) {
        gsap.from('.about-right', {
          scrollTrigger: { trigger: '.about-content', start: 'top 75%' },
          scale: 0.5, opacity: 0, duration: 1, delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-header">
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <div className="about-content">
          <div className="about-left">
            <p>{data.leftContent}</p>
            <p>{data.rightContent}</p>
          </div>

          <div className="about-right">
            <div className="about-3d-box">
              <div className="about-3d-face">FULLSTACK</div>
              <div className="about-3d-face">DEVELOPER</div>
              <div className="about-3d-face">REACT</div>
              <div className="about-3d-face">NODE.JS</div>
              <div className="about-3d-face">SCALABLE</div>
              <div className="about-3d-face">SOLUTIONS</div>
            </div>
          </div>
        </div>

        <div className="about-highlights" style={{ display: 'none' }}>
          {data.highlights.map((item, index) => (
            <div className="about-highlight" key={index}>
              <span className="highlight-value">{item.value}</span>
              <span className="highlight-label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="about-cta">
          <a 
            href={resumePDF} 
            className="resume-link" 
            download="Mugunthan Resume.pdf"
            rel="noopener noreferrer"
          >
            Download Resume →
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;

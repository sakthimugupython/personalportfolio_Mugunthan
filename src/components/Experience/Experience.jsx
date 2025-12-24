import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { data, loading, error } = useData('experience');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!data || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.experience .section-header', {
        scrollTrigger: { trigger: '.experience', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8,
      });

      gsap.from('.experience-item', {
        scrollTrigger: { trigger: '.experience-timeline', start: 'top 80%' },
        x: -50, opacity: 0, duration: 0.7, stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>
      </div>

      <div className="experience-timeline">
        {data.experiences.map((exp) => (
          <div className="experience-item" key={exp.id}>
            <div className="experience-marker"></div>
            <div className="experience-content">
              <div className="experience-header">
                <h3 className="experience-role">{exp.role}</h3>
                <span className="experience-period">{exp.period}</span>
              </div>
              <p className="experience-company">{exp.company} • {exp.location}</p>
              <ul className="experience-description">
                {exp.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="experience-tech">
                {exp.technologies.map((tech, idx) => (
                  <span className="tech-tag" key={idx}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;

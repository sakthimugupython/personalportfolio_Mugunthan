import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { data, loading, error } = useData('skills');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!data || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.skills .section-header', {
        scrollTrigger: { trigger: '.skills', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8,
      });

      gsap.from('.skill-category', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15,
      });

      gsap.from('.skill-bar-fill', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 75%' },
        scaleX: 0, duration: 1, stagger: 0.05, ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>
      </div>

      <div className="skills-grid">
        {data.categories.map((category, idx) => (
          <div className="skill-category" key={idx}>
            <h3 className="category-title">{category.name}</h3>
            <div className="skills-list">
              {category.skills.map((skill, skillIdx) => (
                <div className="skill-item" key={skillIdx}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

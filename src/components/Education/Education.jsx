import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './Education.css';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const { data, loading, error } = useData('education');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!data || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.education .section-header', {
        scrollTrigger: { trigger: '.education', start: 'top 80%' },
        y: 50, opacity: 0, duration: 0.8,
      });

      gsap.from('.education-card', {
        scrollTrigger: { trigger: '.education-grid', start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15,
      });

      gsap.from('.cert-card', {
        scrollTrigger: { trigger: '.certifications-grid', start: 'top 85%' },
        scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="education" id="education" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">{data.title}</h2>
        <p className="section-subtitle">{data.subtitle}</p>
      </div>

      <div className="education-grid">
        {data.education.map((edu) => (
          <div className="education-card" key={edu.id}>
            <div className="education-icon">🎓</div>
            <h3 className="education-degree">{edu.degree}</h3>
            <p className="education-institution">{edu.institution}</p>
            <p className="education-meta">{edu.location} • {edu.period}</p>
            <p className="education-gpa">GPA: {edu.gpa}</p>
            <ul className="education-highlights">
              {edu.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 className="certifications-title">Certifications</h3>
      <div className="certifications-grid">
        {data.certifications.map((cert) => (
          <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-card" key={cert.id}>
            <span className="cert-icon">📜</span>
            <h4 className="cert-name">{cert.name}</h4>
            <p className="cert-issuer">{cert.issuer}</p>
            <p className="cert-date">{cert.date}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Education;

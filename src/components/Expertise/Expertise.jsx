import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import './Expertise.css';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
  const { data, loading, error } = useData('expertise');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Simple animation without context
    gsap.to('.expertise-item', {
      scrollTrigger: {
        trigger: '.expertise-list',
        start: 'top 80%',
      },
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
    });
  }, [data]);

  if (loading) {
    return (
      <section className="expertise" id="expertise">
        <div className="expertise-wrapper">
          <p>Loading expertise...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="expertise" id="expertise">
        <div className="expertise-wrapper">
          <p>Error loading expertise</p>
        </div>
      </section>
    );
  }

  return (
    <section className="expertise" id="expertise" ref={sectionRef}>
      <div className="expertise-wrapper">
        <h2 className="expertise-title">{data.title}</h2>
        <p className="expertise-subtitle">{data.subtitle}</p>

        <div className="expertise-list">
          {data.services && data.services.map((service) => (
            <div className="expertise-item" key={service.id} style={{ opacity: 0 }}>
              <div className="item-icon">{service.icon}</div>
              <div className="item-content">
                <h3 className="item-title">{service.title}</h3>
                <p className="item-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

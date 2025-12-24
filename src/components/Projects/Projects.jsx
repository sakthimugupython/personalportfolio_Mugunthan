import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { data, loading, error } = useData('projects');
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!data || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-header h2', {
        scrollTrigger: { trigger: '.projects', start: 'top 70%' },
        y: 80, opacity: 0, duration: 1,
      });

      gsap.from('.projects-header p', {
        scrollTrigger: { trigger: '.projects', start: 'top 70%' },
        y: 40, opacity: 0, duration: 0.8, delay: 0.2,
      });

      gsap.from('.project-item', {
        scrollTrigger: { trigger: '.projects-list', start: 'top 75%' },
        y: 80, opacity: 0, duration: 0.8, stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <div className="projects-header">
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <div className="projects-list">
          {data.projects.map((project, index) => (
            <div className="project-item" key={project.id}>
              <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
              
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>

              <div className="project-details">
                <div className="project-meta">
                  <span className="project-year">{project.year}</span>
                  <span className="project-category">{project.category}</span>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Live →
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    Source Code →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useData } from '../../hooks/useData';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { data, loading, error } = useData('contact');
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!data || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-header h2', {
        scrollTrigger: { trigger: '.contact', start: 'top 70%' },
        y: 80, opacity: 0, duration: 1,
      });

      gsap.from('.contact-header p', {
        scrollTrigger: { trigger: '.contact', start: 'top 70%' },
        y: 40, opacity: 0, duration: 0.8, delay: 0.2,
      });

      gsap.from('.contact-content', {
        scrollTrigger: { trigger: '.contact', start: 'top 60%' },
        y: 60, opacity: 0, duration: 0.8, delay: 0.4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const whatsappNumber = '917639000740'; // Your WhatsApp Business number
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-header">
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-description">{data.description}</p>
            
            <div className="contact-details">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <a href={`tel:${data.phone}`}>{data.phone}</a>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span>{data.location}</span>
              </div>
            </div>

            <div className="contact-social">
              {data.social.map((item) => (
                <a 
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={item.name}
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className={`submit-btn ${submitted ? 'success' : ''}`}>
              {submitted ? '✓ Message Sent to WhatsApp!' : 'Send via WhatsApp'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

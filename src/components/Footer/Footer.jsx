import { useData } from '../../hooks/useData';
import './Footer.css';

const Footer = () => {
  const { data } = useData('contact');

  if (!data) return null;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Portfolio</h3>
            <p className="footer-tagline">Fullstack Developer</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#expertise">About</a></li>
              <li><a href="#projects">Work</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <div className="footer-social">
              {data.social.map((item) => (
                <a 
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="footer-social-link"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{data.footer.copyright}</p>
          <div className="footer-bottom-links">
            {data.footer.links.map((link, idx) => (
              <a key={idx} href={link.url}>{link.text}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

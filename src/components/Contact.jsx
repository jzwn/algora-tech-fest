import { useInView } from '../hooks/useInView';

const contactItems = [
  {
    label: 'Institution',
    value: "ST. GEORGE'S COLLEGE, ARUVITHURA",
  },
  {
    label: 'Department',
    value: 'DEPT. OF COMPUTER APPLICATIONS',
  },
  {
    label: 'Location',
    value: 'ARUVITHURA, KERALA, INDIA',
  },
  {
    label: 'Hashtag',
    value: '#ALGORA2026',
    isHashtag: true,
  },
];

export default function Contact() {
  const [ref, visible] = useInView();

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="section-header">
        <span className="section-label">Get In Touch</span>
        <span className="section-num">07</span>
      </div>

      <div className="contact-grid">
        <div>
          <h2 className={`contact-heading reveal-up ${visible ? 'in' : ''}`}>
            LET'S<br />CONNECT.
          </h2>
          <div className="contact-divider" />
          <p className={`contact-desc reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Have questions about ALGORA 2026? Need assistance with registrations or want to partner with us? Reach
            out directly to our overall fest coordinators — we'd love to hear from you.
          </p>

          {/* Overall Coordinators Spotlight */}
          <div className={`contact-coordinators-block reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.2s', marginTop: '28px' }}>
            <div className="coordinator-card student-coord">
              <div className="coordinator-card-inner">
                <div className="coordinator-avatar-wrap">
                  <span className="coord-avatar-icon">🎓</span>
                </div>
                <div className="coordinator-info">
                  <span className="coordinator-role">Overall Student Coordinator</span>
                  <div className="coordinator-name">Anjo Joyan</div>
                  <div className="coordinator-phone-actions">
                    <a
                      href="tel:+919061634012"
                      className="coord-call-btn"
                      title="Call Anjo Joyan (+91 90616 34012)"
                    >
                      <span className="coord-btn-icon">📞</span>
                      <span>+91 90616 34012</span>
                    </a>
                    <a
                      href="https://wa.me/919061634012"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="coord-wa-btn"
                      title="Chat with Anjo Joyan on WhatsApp"
                    >
                      <span className="coord-btn-icon">💬</span>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="coordinator-card faculty-coord" style={{ marginTop: '12px' }}>
              <div className="coordinator-card-inner">
                <div className="coordinator-avatar-wrap">
                  <span className="coord-avatar-icon">👨‍🏫</span>
                </div>
                <div className="coordinator-info">
                  <span className="coordinator-role">Main Faculty Coordinator</span>
                  <div className="coordinator-name">Dr. Jestin Joy</div>
                  <div className="coordinator-phone-actions">
                    <a
                      href="tel:+919446764386"
                      className="coord-call-btn"
                      title="Call Dr. Jestin Joy (+91 94467 64386)"
                    >
                      <span className="coord-btn-icon">📞</span>
                      <span>+91 94467 64386</span>
                    </a>
                    <a
                      href="https://wa.me/919446764386"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="coord-wa-btn"
                      title="Chat with Dr. Jestin Joy on WhatsApp"
                    >
                      <span className="coord-btn-icon">💬</span>
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-list">
          {contactItems.map((item, i) => (
            <div className={`contact-item reveal-right ${visible ? 'in' : ''}`} key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="contact-item-label">{item.label}</div>
              <div className={`contact-item-value${item.isHashtag ? ' hashtag' : ''}`}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

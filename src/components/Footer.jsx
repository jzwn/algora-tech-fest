export default function Footer() {
  const links = ['About', 'Events', 'Schedule', 'Gallery', 'Sponsors', 'Contact'];

  return (
    <>
      {/* Top band */}
      <div className="footer-band">
        <span>ALGORA 2026 · TECH FEST</span>
        <span>DEPT. OF COMPUTER APPLICATIONS · ST. GEORGE'S COLLEGE ARUVITHURA</span>
      </div>

      <footer>
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            {/* image logo */}
            <img src="/algora_logo.png" alt="Algora Logo" style={{ height: '40px', marginBottom: '16px', opacity: 0.9 }} />

            {/* St.George's text */}
            <div style={{ fontFamily: 'var(--condensed)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
              St.George's College Aruvithura
            </div>

            <div className="footer-brand-name">ALGORA</div>
            <div className="footer-brand-year">2026</div>
            <div className="footer-brand-tag">Where Innovation Meets Imagination</div>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-nav-heading">Navigation</div>
            <div className="footer-nav">
              {links.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-contact-heading">Contact</div>
            <div className="footer-contact-body">
              Department of Computer Applications<br />
              St. George's College<br />
              Aruvithura, Kerala, India
            </div>
            <div className="footer-contact-hashtag">#ALGORA2026</div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 ALGORA TECH FEST · ALL RIGHTS RESERVED</span>
          <span className="footer-edition">EDITION 01 · INAUGURAL</span>
        </div>
      </footer>
    </>
  );
}

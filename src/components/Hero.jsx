export default function Hero({ onTriggerNotice }) {
  return (
    <section className="hero" id="hero">
      {/* Side ribbons */}
      <div className="hero-ribbon hero-ribbon-left" style={{ paddingLeft: '16px' }}>
        <div className="hero-ribbon-line" />
        <span className="hero-ribbon-text">St. George's College, Aruvithura</span>
      </div>
      <div className="hero-ribbon hero-ribbon-right" style={{ paddingRight: '16px' }}>
        <div className="hero-ribbon-line" />
        <span className="hero-ribbon-text">Dept. of Computer Applications</span>
      </div>

      {/* Top: Logo + Big Title */}
      <div className="hero-top">
        {/* Logo Image */}
        <img src="/algora_logo.png" alt="Algora Logo" className="hero-logo" style={{ width: 'clamp(130px, 18vw, 220px)', marginBottom: '20px' }} />

        {/* Brand name under logo */}
        <div style={{
          fontFamily: 'var(--cinzel)',
          fontSize: '0.65rem',
          letterSpacing: '10px',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '12px',
          textShadow: '0 0 10px var(--gold-glow)',
        }}>
          A L G O R A
        </div>

        {/* Big ALGORA title */}
        <h1 className="hero-title">ALGORA</h1>

        {/* Zeus presides tagline */}
        <div style={{
          fontFamily: 'var(--cinzel)',
          fontSize: '0.58rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--gray)',
          marginTop: '10px',
          marginBottom: '14px',
          opacity: 0.75,
        }}>
          ⚡ Consecrated under the reign of Zeus · King of Olympus ⚡
        </div>
      </div>

      {/* Sub bar */}
      <div className="hero-sub-bar">
        <span>ST. GEORGE'S COLLEGE, ARUVITHURA</span>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', borderLeft: '1px solid rgba(255,255,255,0.15)', height: '40px' }} />
        <span>DEPT. OF COMPUTER APPLICATIONS</span>
      </div>

      {/* Bottom 3-column grid */}
      <div className="hero-bottom">
        {/* Col 1: Description */}
        <div className="hero-col">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="hero-col-label">Inaugural Edition</span>
            <span className="hero-col-label">Tech Fest 2026</span>
          </div>
          <div className="rule" />
          <p className="hero-col-label" style={{ marginBottom: '12px', color: 'var(--gold)', textShadow: '0 0 6px var(--gold-glow)' }}>WHERE INNOVATION MEETS IMAGINATION</p>
          <h2 className="hero-col-title">Tech Fest · 2026</h2>
          <p className="hero-col-body">
            The inaugural techno-cultural festival of the Department of Computer Applications —
            celebrating innovation, creativity, and collaboration with ₹51,000 in grand prizes.
          </p>
        </div>

        {/* Col 2: About blurb */}
        <div className="hero-col">
          <p className="hero-col-body" style={{ paddingTop: '30px' }}>
            ALGORA brings together the brightest minds, the boldest ideas, and the most creative spirits
            through 7 consecrated deity trials that push the boundaries of technology.
          </p>
        </div>

        {/* Col 3: CTAs */}
        <div className="hero-col">
          <div className="hero-edition">Edition 01 · Vol. I</div>
          <div className="hero-cta-group">
            <a
              className="btn-primary"
              href="#events"
              onClick={e => { e.preventDefault(); document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Events (₹51K)
            </a>
            <button
              className="btn-outline"
              onClick={onTriggerNotice}
            >
              Register Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

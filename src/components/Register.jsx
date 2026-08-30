import { useInView } from '../hooks/useInView';

const steps = [
  { num: '01', title: 'Choose Your Trial', body: 'Browse the 7 divine trials and exciting spot challenges across technical, creative, and gaming categories. Open the details popup to review full rules, prizes, and coordinators.', icon: '⚡' },
  { num: '02', title: 'Assemble Your Crew', body: 'Some events allow teams — gather your warriors and register together. Strength in numbers.', icon: '🛡️' },
  { num: '03', title: 'Register Online', body: 'Click any event\'s registration link to proceed to the official external portal.', icon: '📜' },
  { num: '04', title: 'Show Up & Conquer', body: 'Arrive on September 19, 2026, at St. George\'s College, Aruvithura. Let the best minds ascend!', icon: '🏆' },
];

export default function Register({ onTriggerNotice }) {
  const [ref, visible] = useInView();
  const [panelRef, panelVisible] = useInView();

  return (
    <section className="register" id="register">
      {/* Atmospheric background */}
      <div className="register-bg-img" />

      <div className="section-header">
        <span className="section-label">Participate</span>
        <span className="section-num">06</span>
      </div>

      <div className="register-grid" ref={ref}>
        {/* Left Column: Instructions */}
        <div>
          <h2 className={`register-heading reveal-up ${visible ? 'in' : ''}`}>
            How to<br />Register
          </h2>

          {steps.map((step, i) => (
            <div
              className={`register-step reveal-up ${visible ? 'in' : ''}`}
              key={i}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="register-step-num">{step.icon}</div>
              <div className="register-step-text">
                <strong>{step.num}. {step.title}</strong>
                {step.body}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Information & External Link Notice */}
        <div
          className={`register-panel reveal-up ${panelVisible ? 'in' : ''}`}
          ref={panelRef}
        >
          <div className="register-panel-bg" />

          <div className="register-panel-content">
            <div className="register-panel-label">⚡ External Entry Portal</div>
            <div className="register-panel-name" style={{ fontSize: '2rem', marginBottom: '16px' }}>
              ALGORA<br />2026
            </div>

            <p style={{ fontFamily: 'var(--barlow)', fontSize: '0.9rem', color: 'rgba(230,230,250,0.85)', lineHeight: '1.6', marginBottom: '24px' }}>
              Official registrations for all college, school, general, and spot events are conducted via our centralized external portal.
            </p>

            <button
              className="reg-big-btn"
              onClick={onTriggerNotice}
            >
              <span className="reg-btn-label">Go to Registration Portal →</span>
              <span className="reg-btn-status">External Link · Will Be Added Soon</span>
            </button>

            <div className="register-panel-date" style={{ marginTop: '24px' }}>
              <div className="register-panel-label" style={{ marginBottom: '4px' }}>📅 Date of the Trials</div>
              <div style={{ fontFamily: 'var(--cinzel)', fontSize: '1.1rem', color: 'var(--white)', textTransform: 'uppercase', textShadow: '0 0 10px var(--purple-glow)' }}>
                September 19, 2026
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--gray)', marginTop: '4px', letterSpacing: '1px' }}>
                Saturday · St. George's College · Aruvithura, Kerala
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

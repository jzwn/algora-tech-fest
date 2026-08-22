import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { EVENTS_DATA } from '../data/eventsData';

const tabs = [
  { key: 'all', label: 'All Events' },
  { key: 'college', label: 'College' },
  { key: 'school', label: 'School' },
  { key: 'general', label: 'General' },
];

export default function Events({ onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [ref, visible] = useInView();

  const filteredEvents = activeTab === 'all'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.category === activeTab || (activeTab === 'college' && e.category === 'main'));

  const handleRegisterClick = (event) => {
    setActiveModalEvent(null);
    if (onOpenRegister) {
      onOpenRegister(event);
    }
  };

  return (
    <section className="events" id="events">
      <div className="section-header">
        <span className="section-label">Competitions &amp; Challenges</span>
        <span className="section-num">02</span>
      </div>

      <h2 className={`events-heading reveal-up ${visible ? 'in' : ''}`} ref={ref}>
        EVENTS
      </h2>

      {/* Greek lore subtitle */}
      <p className={`events-lore reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.1s' }}>
        Each trial is consecrated under a Greek deity — click any event to view complete rules &amp; details.
      </p>

      {/* Category Tabs */}
      <div className="ev-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`ev-tab${activeTab === t.key ? ' active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="ev-grid">
        {filteredEvents.map((ev, i) => (
          <div
            key={ev.id}
            className={`ev-card${ev.featured ? ' featured' : ''} reveal-up ${visible ? 'in' : ''}`}
            style={{
              '--god-color': ev.godColor,
              '--god-glow': ev.godGlow,
              transitionDelay: `${i * 0.08}s`,
            }}
          >
            {/* Atmospheric god background */}
            <div
              className="ev-card-bg"
              style={{ backgroundImage: `url('${ev.bgImage}')` }}
            />

            {/* Card content */}
            <div className="ev-card-inner">
              <div className="ev-card-top">
                <span className="ev-card-num">EVT_{ev.id}</span>
                <span className="ev-god-badge">{ev.godName}</span>
              </div>

              <div className="ev-god-name-large">
                {ev.godName} · {ev.godTitle}
              </div>

              <span className="ev-card-icon">{ev.icon}</span>
              <h3 className="ev-card-title">{ev.title}</h3>

              {ev.subtitle && (
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--gold)', marginBottom: '8px' }}>
                  {ev.subtitle}
                </div>
              )}

              <span className={`ev-cat-badge ${ev.category}`}>
                {ev.categoryLabel}
              </span>

              <p className="ev-card-desc" style={{ marginTop: '12px' }}>{ev.desc}</p>
              
              <button
                className="ev-card-btn"
                onClick={() => setActiveModalEvent(ev)}
              >
                View Rules &amp; Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── EVENT DETAILS MODAL POP-UP ── */}
      {activeModalEvent && (
        <div
          className="event-modal-overlay"
          onClick={() => setActiveModalEvent(null)}
          style={{
            '--god-color': activeModalEvent.godColor,
            '--god-glow': activeModalEvent.godGlow,
          }}
        >
          <div
            className="event-modal-container"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="event-modal-header">
              <button
                className="event-modal-close"
                onClick={() => setActiveModalEvent(null)}
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="modal-god-subtitle">
                {activeModalEvent.godName} · {activeModalEvent.godTitle}
              </div>
              <h2 className="modal-event-title">
                {activeModalEvent.icon} {activeModalEvent.title}
              </h2>
              {activeModalEvent.subtitle && (
                <div className="modal-event-subtitle">
                  {activeModalEvent.subtitle}
                </div>
              )}
            </div>

            {/* Modal Scrollable Body */}
            <div className="event-modal-body">
              {/* Quick Specification Cards */}
              <div className="modal-specs-grid">
                <div className="spec-card">
                  <span className="spec-label">💰 Fee</span>
                  <span className="spec-value">{activeModalEvent.registrationFee || 'Free Entry'}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">⏱️ Duration</span>
                  <span className="spec-value">{activeModalEvent.duration}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">👥 Team / Solo</span>
                  <span className="spec-value">{activeModalEvent.participation}</span>
                </div>
                <div className="spec-card">
                  <span className="spec-label">🎯 Eligibility</span>
                  <span className="spec-value">{activeModalEvent.eligibility}</span>
                </div>
                {activeModalEvent.rounds && (
                  <div className="spec-card">
                    <span className="spec-label">🏆 Rounds</span>
                    <span className="spec-value">{activeModalEvent.rounds}</span>
                  </div>
                )}
                {activeModalEvent.maxTeams && (
                  <div className="spec-card">
                    <span className="spec-label">📊 Maximum Slots</span>
                    <span className="spec-value">{activeModalEvent.maxTeams}</span>
                  </div>
                )}
              </div>

              {/* Objective & Theme */}
              {activeModalEvent.objective && (
                <div>
                  <h4 className="modal-section-title">📌 Objective</h4>
                  <div className="modal-text-block">
                    {activeModalEvent.objective}
                  </div>
                </div>
              )}

              {activeModalEvent.theme && (
                <div>
                  <h4 className="modal-section-title">🎨 Theme &amp; Special Directives</h4>
                  <div className="modal-text-block" style={{ borderLeftColor: 'var(--gold)' }}>
                    {activeModalEvent.theme}
                  </div>
                </div>
              )}

              {/* Rules & Regulations */}
              {activeModalEvent.rules && activeModalEvent.rules.length > 0 && (
                <div>
                  <h4 className="modal-section-title">📜 Rules &amp; Regulations</h4>
                  <ul className="modal-rules-list">
                    {activeModalEvent.rules.map((rule, idx) => (
                      <li key={idx}>
                        <span className="rule-num">{idx + 1}</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Judging Criteria */}
              {activeModalEvent.judgingCriteria && activeModalEvent.judgingCriteria.length > 0 && (
                <div>
                  <h4 className="modal-section-title">⚖️ Judging Criteria &amp; Marks</h4>
                  <div className="judging-grid">
                    {activeModalEvent.judgingCriteria.map((item, idx) => (
                      <div className="judging-item" key={idx}>
                        <span className="judging-name">{item.criterion}</span>
                        <span className="judging-marks">{item.marks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Venue & Resources */}
              {(activeModalEvent.venueTech || activeModalEvent.resourcesRequired) && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  {activeModalEvent.resourcesRequired && (
                    <div>
                      <h4 className="modal-section-title">🎒 Required Resources</h4>
                      <div className="modal-text-block" style={{ fontSize: '0.85rem' }}>
                        {activeModalEvent.resourcesRequired}
                      </div>
                    </div>
                  )}
                  {activeModalEvent.venueTech && (
                    <div>
                      <h4 className="modal-section-title">📍 Venue &amp; Technical Requirements</h4>
                      <div className="modal-text-block" style={{ fontSize: '0.85rem' }}>
                        {activeModalEvent.venueTech}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer with REGISTER BUTTON */}
            <div className="event-modal-footer">
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--gray)' }}>
                EVT_{activeModalEvent.id} · Consecrated by {activeModalEvent.godName}
              </div>
              <button
                className="modal-register-btn"
                onClick={() => handleRegisterClick(activeModalEvent)}
              >
                Register for {activeModalEvent.title} →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

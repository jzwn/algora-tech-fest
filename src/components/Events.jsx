import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { EVENTS_DATA, GRAND_TOTAL_PRIZE_POOL } from '../data/eventsData';

const tabs = [
  { key: 'all', label: 'All Events' },
  { key: 'college', label: 'College' },
  { key: 'school', label: 'School' },
  { key: 'general', label: 'General' },
];

const isFirefox = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);

export default function Events({ onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [modalView, setModalView] = useState('rules'); // 'rules' | 'register'
  const [iframeLoading, setIframeLoading] = useState(true);
  const [ref, visible] = useInView();

  const filteredEvents = activeTab === 'all'
    ? EVENTS_DATA
    : EVENTS_DATA.filter(e => e.category === activeTab || (activeTab === 'college' && e.category === 'main'));

  const handleOpenEventModal = (ev, view = 'rules') => {
    setActiveModalEvent(ev);
    setModalView(view);
    setIframeLoading(true);
  };

  const handleRegisterClick = (event) => {
    // Switch to ticket registration view directly
    setModalView('register');
    setIframeLoading(true);
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
        Each trial is consecrated under a Greek deity — click Register on any event to view complete prize breakdown &amp; rules.
      </p>

      {/* Grand Prize Pool Attraction Banner */}
      <div className={`events-grand-prize-banner reveal-up ${visible ? 'in' : ''}`} style={{ transitionDelay: '0.15s' }}>
        <div className="grand-prize-border-glow" />
        <div className="grand-prize-content">
          <div className="grand-prize-icon-wrap">
            <span className="grand-prize-trophy">🏆</span>
          </div>
          <div className="grand-prize-text-col">
            <div className="grand-prize-pill-row">
              <span className="grand-prize-pill">✦ OLYMPIAN MEGA PRIZE POOL ✦</span>
              <span className="grand-prize-stat-pill">7 DIVINE TRIALS</span>
            </div>
            <div className="grand-prize-amount-row">
              <span className="grand-prize-amount">{GRAND_TOTAL_PRIZE_POOL}</span>
              <span className="grand-prize-amount-label">CASH &amp; MERIT HONOURS</span>
            </div>
            <p className="grand-prize-desc">
              Guaranteed Cash Prizes &amp; Trophies Across All 7 Trials · Flagship AI App Dev (<strong>₹12,000</strong>) &amp; Tech Treasure Hunt (<strong>₹10,000</strong>)
            </p>
          </div>
        </div>
      </div>

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
            className={`ev-card${ev.featured ? ' featured' : ''}${ev.isMainEvent ? ' main-flagship-card' : ''} reveal-up ${visible ? 'in' : ''}`}
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
                {ev.isMainEvent ? (
                  <span className="ev-god-badge main-flagship-badge">⭐ Flagship Trial · {ev.godName}</span>
                ) : (
                  <span className="ev-god-badge">{ev.godName}</span>
                )}
              </div>

              <div className="ev-god-name-large">
                {ev.godName} · {ev.godTitle}
              </div>

              <span className="ev-card-icon">{ev.icon}</span>
              <h3 className="ev-card-title">{ev.title}</h3>

              {ev.subtitle && (
                <div className="ev-card-subtitle">
                  {ev.subtitle}
                </div>
              )}

              {/* Prize & Category Badges Row */}
              <div className="ev-card-badges-row">
                <span className={`ev-cat-badge ${ev.category}`}>
                  {ev.categoryLabel}
                </span>

                {ev.prizePool && (
                  <span className="ev-card-prize-badge">
                    🏆 {ev.prizePool} Prize Pool
                  </span>
                )}

                {ev.registrationFee && (
                  <span className="ev-card-fee-badge">
                    💰 {ev.registrationFee}
                  </span>
                )}
              </div>

              <p className="ev-card-desc" style={{ marginTop: '12px' }}>{ev.desc}</p>
              
              <button
                className="ev-card-btn"
                onClick={() => handleOpenEventModal(ev, 'rules')}
              >
                Register →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── EVENT DETAILS MODAL POP-UP ── */}
      {activeModalEvent && (
        <div
          className={`event-modal-overlay ${modalView === 'register' ? 'is-register-overlay' : ''}`}
          onClick={() => setActiveModalEvent(null)}
          style={{
            '--god-color': activeModalEvent.godColor || 'var(--purple)',
            '--god-glow': activeModalEvent.godGlow || 'var(--purple-glow)',
          }}
        >
          <div
            className={`event-modal-container ${modalView === 'register' ? 'is-register-view' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Sheet Pull Handle */}
            <div className="modal-mobile-sheet-handle" onClick={() => setActiveModalEvent(null)} title="Close" />

            {modalView === 'rules' ? (
              <>
                {/* Rules Modal Header */}
                <div className="event-modal-header">
                  <button
                    className="event-modal-close"
                    onClick={() => setActiveModalEvent(null)}
                    aria-label="Close modal"
                    title="Close"
                  >
                    ✕
                  </button>

                  <div className="modal-header-top-row">
                    <span className="modal-god-subtitle">
                      {activeModalEvent.godName} · {activeModalEvent.godTitle}
                    </span>
                    {activeModalEvent.isMainEvent && (
                      <span className="modal-flagship-pill">⭐ Flagship Marquee Trial</span>
                    )}
                    {activeModalEvent.prizePool && (
                      <span className="modal-header-prize-pill">
                        🏆 {activeModalEvent.prizePool} Prize Pool
                      </span>
                    )}
                  </div>

                  <h2 className="modal-event-title">
                    <span className="modal-title-icon">{activeModalEvent.icon}</span>
                    <span>{activeModalEvent.title}</span>
                  </h2>
                  {activeModalEvent.subtitle && (
                    <div className="modal-event-subtitle">
                      {activeModalEvent.subtitle}
                    </div>
                  )}

                  {/* View Switcher Tabs */}
                  <div className="modal-view-tabs">
                    <button
                      type="button"
                      className="modal-view-tab-btn active"
                      onClick={() => setModalView('rules')}
                    >
                      <span>📜</span> Rules &amp; Regulations
                    </button>
                    <button
                      type="button"
                      className="modal-view-tab-btn"
                      onClick={() => {
                        setModalView('register');
                        setIframeLoading(true);
                      }}
                    >
                      <span>🎟️</span> Ticket Registration {activeModalEvent.embedUrl && <span style={{ color: 'var(--gold)' }}>● Live</span>}
                    </button>
                  </div>
                </div>

                {/* Rules Scrollable Body */}
                <div className="event-modal-body">
                  {/* 🥇 🥈 🥉 PODIUM PRIZE DISTRIBUTION GRID */}
                  {activeModalEvent.prizes && activeModalEvent.prizes.length > 0 && (
                    <div className="modal-prize-section">
                      <div className="modal-section-title-wrap">
                        <h4 className="modal-section-title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                          <span>👑</span> Prize Distribution &amp; Podium Rewards
                        </h4>
                        {activeModalEvent.prizePool && (
                          <span className="modal-section-prize-highlight">
                            Total Pool: <strong>{activeModalEvent.prizePool}</strong>
                          </span>
                        )}
                      </div>
                      <div className="modal-section-divider" />
                      <div className="modal-podium-grid">
                        {activeModalEvent.prizes.map((p, idx) => (
                          <div
                            className={`modal-podium-card tier-${p.tier || (idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : 'participation')}`}
                            key={idx}
                          >
                            <div className="podium-card-top">
                              <span className="podium-position-badge">{p.position}</span>
                              <span className="podium-cash-badge">{p.amount}</span>
                            </div>
                            <div className="podium-reward-desc">{p.reward}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Specification Cards */}
                  <div className="modal-specs-section">
                    <h4 className="modal-section-title">
                      <span>⚡</span> Event Specifications
                    </h4>
                    <div className="modal-specs-grid">
                      <div className="spec-card">
                        <span className="spec-label">🏆 Total Prize Pool</span>
                        <span className="spec-value highlight-gold">{activeModalEvent.prizePool || 'Cash Prizes'}</span>
                      </div>
                      <div className="spec-card">
                        <span className="spec-label">💰 Registration Fee</span>
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
                          <span className="spec-label">📊 Format &amp; Rounds</span>
                          <span className="spec-value">{activeModalEvent.rounds}</span>
                        </div>
                      )}
                      {activeModalEvent.maxTeams && (
                        <div className="spec-card">
                          <span className="spec-label">🏛️ Capacity / Slots</span>
                          <span className="spec-value">{activeModalEvent.maxTeams}</span>
                        </div>
                      )}
                    </div>
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

                  {/* Sequential Rounds / Challenge Roadmap */}
                  {activeModalEvent.roundDetails && activeModalEvent.roundDetails.length > 0 && (
                    <div>
                      <h4 className="modal-section-title">
                        <span>🗺️</span> Rounds &amp; Challenge Flow
                      </h4>
                      <div className="modal-rounds-timeline">
                        {activeModalEvent.roundDetails.map((rd, idx) => (
                          <div className="modal-round-step" key={idx}>
                            <div className="round-step-badge">
                              <span className="round-step-num">{rd.round || `Round ${idx + 1}`}</span>
                              {rd.venue && <span className="round-step-venue">📍 {rd.venue}</span>}
                              {rd.marks && <span className="round-step-marks">⭐ {rd.marks}</span>}
                            </div>
                            <div className="round-step-info">
                              <div className="round-step-title">{rd.name}</div>
                              <div className="round-step-desc">{rd.desc}</div>
                            </div>
                          </div>
                        ))}
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
                      <h4 className="modal-section-title">⚖️ Judging Criteria &amp; Scoring</h4>
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

                  {/* Participant Required Equipment / Materials */}
                  {activeModalEvent.resourcesRequired && (
                    <div>
                      <h4 className="modal-section-title">🎒 Required Participant Equipment</h4>
                      <div className="modal-text-block" style={{ fontSize: '0.85rem' }}>
                        {activeModalEvent.resourcesRequired}
                      </div>
                    </div>
                  )}
                </div>

                {/* Rules Modal Footer */}
                <div className="event-modal-footer">
                  <div className="modal-footer-info">
                    <span className="modal-footer-evt">EVT_{activeModalEvent.id} · Consecrated by {activeModalEvent.godName}</span>
                    <span className="modal-footer-prize">🏆 Total Prize: {activeModalEvent.prizePool}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {activeModalEvent.embedUrl && (
                      <button
                        type="button"
                        className="modal-back-btn"
                        onClick={() => {
                          setModalView('register');
                          setIframeLoading(true);
                        }}
                      >
                        ⚡ Embedded View
                      </button>
                    )}
                    {activeModalEvent.registrationUrl ? (
                      <a
                        href={activeModalEvent.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-register-btn"
                        style={{ textDecoration: 'none' }}
                      >
                        Register on MakeMyPass ↗
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="modal-register-btn"
                        onClick={() => {
                          setModalView('register');
                          setIframeLoading(true);
                        }}
                      >
                        Register for {activeModalEvent.title.split(' - ')[0]} →
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Slim Fullscreen Registration Header */}
                <div className="reg-fullscreen-header">
                  <div className="reg-header-left">
                    <button
                      type="button"
                      className="reg-header-back-btn"
                      onClick={() => setModalView('rules')}
                    >
                      ← Back to Rules
                    </button>
                    <div className="reg-header-title-wrap">
                      <span className="reg-header-icon">{activeModalEvent.icon}</span>
                      <span className="reg-header-title">{activeModalEvent.title}</span>
                      <span className="reg-header-badge">🎟️ MakeMyPass Checkout</span>
                    </div>
                  </div>

                  <div className="reg-header-right">
                    {activeModalEvent.registrationUrl && (
                      <a
                        href={activeModalEvent.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reg-header-ext-btn"
                        title="Open portal in separate tab"
                      >
                        Open in New Tab ↗
                      </a>
                    )}
                    <button
                      className="reg-header-close-btn"
                      onClick={() => setActiveModalEvent(null)}
                      aria-label="Close modal"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Helpful Privacy Notice & Direct Launch Fallback Banner */}
                {activeModalEvent.registrationUrl && (
                  <div className={`reg-iframe-fallback-bar ${isFirefox ? 'firefox-alert' : ''}`}>
                    <span className="fallback-text">
                      {isFirefox ? (
                        <>🦊 <strong>Firefox Enhanced Tracking Protection</strong> blocks third-party embedded forms by default.</>
                      ) : (
                        <>⚡ <strong>Embedded Checkout</strong> · Instant ticket booking powered by MakeMyPass.</>
                      )}
                    </span>
                    <a
                      href={activeModalEvent.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fallback-btn"
                    >
                      Open in New Tab ↗
                    </a>
                  </div>
                )}

                {/* Maximized Edge-to-Edge Body */}
                <div className="event-modal-body is-register-body">
                  {activeModalEvent.embedUrl ? (
                    <div className="modal-iframe-box is-fullscreen-iframe">
                      {iframeLoading && (
                        <div className="modal-iframe-loading">
                          <div className="modal-iframe-loading-spinner" />
                          <div className="modal-iframe-loading-text">
                            Loading MakeMyPass Ticket Portal...
                          </div>
                          <p style={{ fontFamily: 'var(--barlow)', fontSize: '0.82rem', color: 'rgba(230,230,250,0.7)', marginTop: '4px', textAlign: 'center', maxWidth: '380px' }}>
                            If the embedded form does not appear, click below to open the checkout directly:
                          </p>
                          {activeModalEvent.registrationUrl && (
                            <a
                              href={activeModalEvent.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="modal-register-btn"
                              style={{ marginTop: '10px', fontSize: '0.78rem', padding: '10px 22px', textDecoration: 'none' }}
                            >
                              Open Directly on MakeMyPass ↗
                            </a>
                          )}
                        </div>
                      )}
                      <iframe
                        src={activeModalEvent.embedUrl}
                        title={`Register for ${activeModalEvent.title}`}
                        className="modal-iframe-element"
                        onLoad={() => setIframeLoading(false)}
                        allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; microphone; payment; web-share"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  ) : (
                    <div className="modal-coming-soon-box" style={{ margin: '40px auto' }}>
                      <div className="modal-coming-soon-icon">⚡</div>
                      <h3 className="modal-coming-soon-title">Registration Opening Soon</h3>
                      <p className="modal-coming-soon-desc">
                        The official registration portal for <strong>{activeModalEvent.title}</strong> is being linked.
                        Check back shortly or review the competition rules and guidelines!
                      </p>
                      <button
                        type="button"
                        className="modal-back-btn"
                        onClick={() => setModalView('rules')}
                      >
                        ← Back to Rules &amp; Overview
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

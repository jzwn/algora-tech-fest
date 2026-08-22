export default function NoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="event-modal-overlay"
      onClick={onClose}
      style={{ zIndex: 10000 }}
    >
      <div
        className="event-modal-container"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '480px', textAlign: 'center', padding: '36px 28px' }}
      >
        <button
          className="event-modal-close"
          onClick={onClose}
          aria-label="Close notice"
        >
          ✕
        </button>

        <div style={{ fontSize: '3rem', marginBottom: '16px', filter: 'drop-shadow(0 0 12px var(--gold-glow))' }}>
          ⚡
        </div>

        <h3 style={{ fontFamily: 'var(--cinzel)', fontSize: '1.4rem', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '2px', textShadow: '0 0 12px var(--gold-glow)' }}>
          Will Be Added Soon!
        </h3>

        <p style={{ fontFamily: 'var(--barlow)', fontSize: '0.95rem', color: 'rgba(230,230,250,0.9)', lineHeight: 1.6, marginBottom: '24px' }}>
          The official external registration portal for <strong>ALGORA 2026</strong> is currently being prepared. Registration links will be live soon!
        </p>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--purple-light)', background: 'rgba(124, 58, 237, 0.12)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--purple-border)', marginBottom: '24px', letterSpacing: '1px' }}>
          ST. GEORGE'S COLLEGE · ARUVITHURA
        </div>

        <button
          className="modal-register-btn"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={onClose}
        >
          Got It, Understood! →
        </button>
      </div>
    </div>
  );
}

export default function NoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="inapp-modal-overlay"
      onClick={onClose}
      style={{ zIndex: 10000 }}
    >
      <div
        className="inapp-modal-container"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="inapp-modal-close"
          onClick={onClose}
          aria-label="Close notice"
        >
          ✕
        </button>

        <div className="inapp-modal-icon">
          ⚡
        </div>

        <h3 className="inapp-modal-title">
          Registrations Live!
        </h3>

        <p className="inapp-modal-body">
          Online registrations and ticket booking for <strong>ALGORA 2026</strong> are now officially open on MakeMyPass! Explore the events section to register.
        </p>

        <div className="inapp-modal-badge">
          ST. GEORGE'S COLLEGE · ARUVITHURA
        </div>

        <button
          className="inapp-modal-btn-primary"
          style={{ width: '100%' }}
          onClick={() => {
            onClose();
            document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Events &amp; Register →
        </button>
      </div>
    </div>
  );
}

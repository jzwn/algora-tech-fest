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
          Will Be Added Soon!
        </h3>

        <p className="inapp-modal-body">
          The official external registration portal for <strong>ALGORA 2026</strong> is currently being prepared. Registration links will be live soon!
        </p>

        <div className="inapp-modal-badge">
          ST. GEORGE'S COLLEGE · ARUVITHURA
        </div>

        <button
          className="inapp-modal-btn-primary"
          style={{ width: '100%' }}
          onClick={onClose}
        >
          Got It, Understood! →
        </button>
      </div>
    </div>
  );
}

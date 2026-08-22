import { useMessaging } from '../hooks/useMessaging';

export default function PushNotificationToast() {
  const { foregroundNotification, clearNotification } = useMessaging();

  if (!foregroundNotification) return null;

  const title = foregroundNotification.notification?.title || 'Notification';
  const body = foregroundNotification.notification?.body || '';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10002,
        maxWidth: '360px',
        padding: '16px 20px',
        background: 'linear-gradient(135deg, rgba(20, 15, 38, 0.98), rgba(30, 20, 50, 0.98))',
        border: '1px solid var(--gold)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4)',
        color: '#fff',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>🔔</span>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontFamily: 'var(--cinzel)', color: 'var(--gold)', letterSpacing: '1px' }}>
            {title}
          </h4>
        </div>
        <button
          onClick={clearNotification}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            fontSize: '1rem',
            lineHeight: 1,
            padding: '2px',
          }}
          aria-label="Close push toast"
        >
          ✕
        </button>
      </div>
      {body && (
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(230, 230, 250, 0.9)', fontFamily: 'var(--barlow)', lineHeight: 1.4 }}>
          {body}
        </p>
      )}
    </div>
  );
}

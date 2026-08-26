import { useMessaging } from '../hooks/useMessaging';

export default function PushNotificationToast() {
  const { foregroundNotification, clearNotification } = useMessaging();

  if (!foregroundNotification) return null;

  const title = foregroundNotification.notification?.title || foregroundNotification.data?.title || 'Notification';
  const body = foregroundNotification.notification?.body || foregroundNotification.data?.body || '';
  const link = foregroundNotification.data?.link || foregroundNotification.data?.url || foregroundNotification.data?.btnLink || foregroundNotification.fcmOptions?.link;
  const btnText = foregroundNotification.data?.btnText || 'View Details';

  const handleAction = () => {
    clearNotification();
    if (link) {
      if (link.startsWith('#')) {
        const el = document.querySelector(link);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (link.startsWith('http://') || link.startsWith('https://')) {
        window.open(link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = link;
      }
    }
  };

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
        <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'rgba(230, 230, 250, 0.9)', fontFamily: 'var(--barlow)', lineHeight: 1.4 }}>
          {body}
        </p>
      )}
      {link && (
        <button
          onClick={handleAction}
          style={{
            background: 'linear-gradient(135deg, var(--gold), #d97706)',
            border: 'none',
            color: '#0d0d1f',
            fontWeight: 700,
            fontSize: '0.75rem',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontFamily: 'var(--mono)',
            letterSpacing: '0.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'opacity 0.2s',
          }}
        >
          {btnText} →
        </button>
      )}
    </div>
  );
}

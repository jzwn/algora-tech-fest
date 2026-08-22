import { useState, useEffect } from 'react';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { logAnalyticsEvent } from '../firebase';

export default function InAppMessageModal() {
  const { campaigns, loading } = useRemoteConfig();
  const [activeCampaign, setActiveCampaign] = useState(null);

  useEffect(() => {
    let timer = null;

    if (!loading && campaigns && campaigns.length > 0) {
      // Find the first active campaign that the user has not dismissed yet
      const nextUndismissed = campaigns.find((c) => {
        const isEnabled = c.enabled === true || c.enabled === 'true';
        const isDismissed = localStorage.getItem(`dismissed_fiam_${c.id}`);
        return isEnabled && !isDismissed;
      });

      if (nextUndismissed) {
        // Convert delaySeconds (or delay) to milliseconds. Default to 0 if omitted.
        const delaySeconds = Number(nextUndismissed.delaySeconds ?? nextUndismissed.delay ?? 0);
        const delayMs = Math.max(0, delaySeconds) * 1000;

        timer = setTimeout(() => {
          setActiveCampaign(nextUndismissed);
          logAnalyticsEvent('in_app_message_impression', {
            message_id: nextUndismissed.id,
            message_title: nextUndismissed.title,
          });
        }, delayMs);
      } else {
        setActiveCampaign(null);
      }
    } else {
      setActiveCampaign(null);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [loading, campaigns]);

  if (!activeCampaign) return null;

  const { id, title, body, btnText, btnLink } = activeCampaign;

  const handleDismiss = () => {
    localStorage.setItem(`dismissed_fiam_${id}`, 'true');
    logAnalyticsEvent('in_app_message_dismiss', {
      message_id: id,
    });
    setActiveCampaign(null);
  };

  const handleAction = () => {
    localStorage.setItem(`dismissed_fiam_${id}`, 'true');
    logAnalyticsEvent('in_app_message_click', {
      message_id: id,
      action_url: btnLink,
    });
    setActiveCampaign(null);

    if (btnLink && btnLink.startsWith('#')) {
      const element = document.querySelector(btnLink);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (btnLink) {
      window.open(btnLink, '_blank');
    }
  };

  return (
    <div
      className="event-modal-overlay"
      onClick={handleDismiss}
      style={{ zIndex: 10001 }}
    >
      <div
        className="event-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          textAlign: 'center',
          padding: '36px 28px',
          background: 'linear-gradient(135deg, rgba(20, 15, 38, 0.95), rgba(10, 8, 20, 0.98))',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)',
        }}
      >
        <button
          className="event-modal-close"
          onClick={handleDismiss}
          aria-label="Close message"
        >
          ✕
        </button>

        <div style={{ fontSize: '2.5rem', marginBottom: '16px', filter: 'drop-shadow(0 0 10px var(--gold-glow))' }}>
          📢
        </div>

        <h3
          style={{
            fontFamily: 'var(--cinzel)',
            fontSize: '1.4rem',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '12px',
            letterSpacing: '1.5px',
            textShadow: '0 0 12px var(--gold-glow)',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: 'var(--barlow)',
            fontSize: '0.95rem',
            color: 'rgba(230,230,250,0.9)',
            lineHeight: 1.6,
            marginBottom: '24px',
          }}
        >
          {body}
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            className="modal-register-btn"
            style={{ flex: 1, justifyContent: 'center' }}
            onClick={handleAction}
          >
            {btnText || 'Learn More'} →
          </button>
          <button
            onClick={handleDismiss}
            style={{
              padding: '10px 18px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'var(--barlow)',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

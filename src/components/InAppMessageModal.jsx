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
      className="inapp-modal-overlay"
      onClick={handleDismiss}
      style={{ zIndex: 10001 }}
    >
      <div
        className="inapp-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="inapp-modal-close"
          onClick={handleDismiss}
          aria-label="Close message"
        >
          ✕
        </button>

        <div className="inapp-modal-icon">
          📢
        </div>

        <h3 className="inapp-modal-title">
          {title}
        </h3>

        <p className="inapp-modal-body">
          {body}
        </p>

        <div className="inapp-modal-actions">
          <button
            className="inapp-modal-btn-primary"
            onClick={handleAction}
          >
            {btnText || 'Learn More'} →
          </button>
          <button
            className="inapp-modal-btn-secondary"
            onClick={handleDismiss}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

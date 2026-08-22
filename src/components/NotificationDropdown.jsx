import { useEffect, useRef } from 'react';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { useMessaging } from '../hooks/useMessaging';
import { logAnalyticsEvent } from '../firebase';

// Fallback high-priority notifications if Remote Config has no active items
const DEFAULT_FALLBACK_NOTIFICATIONS = [
  {
    id: 'promo_v1',
    title: "Welcome to Algora 2026! 🎉",
    body: 'Registrations are preparing to go live! Explore the 7 deity trials and full schedule.',
    btnText: 'Explore Events',
    btnLink: '#events',
    icon: '⚡',
    time: 'Recent',
    unread: true,
  },
  {
    id: 'workshop_banner',
    title: 'Flagship AI App Trial 🤖',
    body: 'Aivora - AI App Development problem statement revealed soon. Check rules & specs.',
    btnText: 'View Details',
    btnLink: '#events',
    icon: '🏛️',
    time: 'Announcement',
    unread: true,
  },
  {
    id: 'venue_notice',
    title: 'Mount Olympus of Tech 📍',
    body: 'Grand trials commence Sept 5, 2026 at St. George\'s College, Aruvithura.',
    btnText: 'View Schedule',
    btnLink: '#schedule',
    icon: '🏆',
    time: 'Update',
    unread: false,
  },
];

export default function NotificationDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);
  const { campaigns, loading } = useRemoteConfig();
  const { permissionStatus, requestPermission } = useMessaging();

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter active campaigns from Remote Config or fallback to defaults
  let displayList = [];
  if (campaigns && campaigns.length > 0) {
    const activeCampaigns = campaigns.filter(c => c.enabled !== false && c.enabled !== 'false');
    displayList = activeCampaigns.length > 0 ? activeCampaigns : campaigns;
  }

  if (displayList.length === 0) {
    displayList = DEFAULT_FALLBACK_NOTIFICATIONS;
  }

  // Capped strictly at latest 3 notifications
  const latestThree = displayList.slice(0, 3);

  const handleItemClick = (item) => {
    logAnalyticsEvent('notification_dropdown_click', {
      notification_id: item.id,
      notification_title: item.title,
    });

    onClose();

    if (item.btnLink) {
      if (item.btnLink.startsWith('#')) {
        const el = document.querySelector(item.btnLink);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(item.btnLink, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleEnablePush = async (e) => {
    e.stopPropagation();
    await requestPermission();
  };

  return (
    <div className="liquid-dropdown-wrapper" ref={dropdownRef}>
      <div className="liquid-dropdown-container">
        {/* Specular sheen reflection overlay */}
        <div className="liquid-specular-overlay" />

        {/* Dropdown Header */}
        <div className="liquid-dropdown-header">
          <div className="liquid-dropdown-title-group">
            <div className="liquid-dropdown-bell-icon">🔔</div>
            <div>
              <h4 className="liquid-dropdown-title">Notifications</h4>
              <span className="liquid-dropdown-subtitle">Latest Updates &amp; Broadcasts</span>
            </div>
          </div>
          <div className="liquid-dropdown-badge">
            {latestThree.length} New
          </div>
        </div>

        {/* Notifications List (Top 3) */}
        <div className="liquid-dropdown-list">
          {latestThree.map((item, index) => {
            const hasLink = Boolean(item.btnLink);
            return (
              <div
                key={item.id || index}
                className="liquid-notif-card"
                onClick={() => handleItemClick(item)}
                role="button"
                tabIndex={0}
              >
                <div className="liquid-notif-card-accent" />
                
                <div className="liquid-notif-icon-col">
                  <span className="liquid-notif-emoji">{item.icon || '⚡'}</span>
                </div>

                <div className="liquid-notif-content-col">
                  <div className="liquid-notif-header-row">
                    <h5 className="liquid-notif-item-title">{item.title}</h5>
                    {item.time && (
                      <span className="liquid-notif-time">{item.time}</span>
                    )}
                  </div>

                  <p className="liquid-notif-item-body">{item.body}</p>

                  {hasLink && (
                    <div className="liquid-notif-action-row">
                      <span className="liquid-notif-action-btn">
                        {item.btnText || 'View Details'} →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dropdown Footer: Push Notification Status */}
        <div className="liquid-dropdown-footer">
          <div className="liquid-footer-status">
            <span
              className={`liquid-status-dot ${permissionStatus === 'granted' ? 'active' : ''}`}
            />
            <span className="liquid-status-text">
              {permissionStatus === 'granted'
                ? 'Push alerts active'
                : 'Web push notifications disabled'}
            </span>
          </div>

          {permissionStatus !== 'granted' && (
            <button
              className="liquid-enable-push-btn"
              onClick={handleEnablePush}
              title="Click to enable instant browser alerts"
            >
              Enable
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

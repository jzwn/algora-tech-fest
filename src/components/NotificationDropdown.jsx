import { useEffect, useRef } from 'react';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { useMessaging } from '../hooks/useMessaging';
import { logAnalyticsEvent } from '../firebase';

export default function NotificationDropdown({ isOpen, onClose }) {
  const dropdownRef = useRef(null);
  const { campaigns, loading } = useRemoteConfig();
  const { permissionStatus, requestPermission, pushNotifications } = useMessaging();

  // Close when clicking outside or pressing Escape
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

  // 1. Process active campaigns from Firebase Remote Config (in_app_messages / notifications)
  const activeRemoteNotifs = (campaigns || [])
    .filter((c) => c && c.enabled !== false && c.enabled !== 'false')
    .map((c, index) => ({
      id: c.id || `rc_${index}`,
      title: c.title || 'Announcement',
      body: c.body || c.message || '',
      btnText: c.btnText || c.actionText || (c.btnLink || c.link || c.url ? 'View Details' : ''),
      btnLink: c.btnLink || c.link || c.url || c.actionUrl || '',
      icon: c.icon || '📢',
      time: c.time || c.tag || 'Announcement',
      isPush: false,
      unread: c.unread ?? true,
    }));

  // 2. Process push notifications received from Firebase Messaging
  const pushNotifsList = (pushNotifications || []).map((p) => ({
    id: p.id,
    title: p.title || 'Push Alert',
    body: p.body || '',
    btnText: p.btnText || (p.btnLink ? 'View Link' : ''),
    btnLink: p.btnLink || '',
    icon: p.icon || '🔔',
    time: p.time || 'Push Alert',
    isPush: true,
    unread: p.unread ?? true,
  }));

  // 3. Combined display list (Push notifications first, followed by active Remote Config announcements)
  const combinedList = [...pushNotifsList, ...activeRemoteNotifs];

  // Deduplicate by ID
  const seenIds = new Set();
  const displayList = combinedList.filter((item) => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });

  const handleItemClick = (item) => {
    logAnalyticsEvent('notification_dropdown_click', {
      notification_id: item.id,
      notification_title: item.title,
      source: item.isPush ? 'push_messaging' : 'remote_config',
    });

    onClose();

    if (item.btnLink) {
      if (item.btnLink.startsWith('#')) {
        const el = document.querySelector(item.btnLink);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (item.btnLink.startsWith('http://') || item.btnLink.startsWith('https://')) {
        window.open(item.btnLink, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.btnLink;
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
              <span className="liquid-dropdown-subtitle">Announcements &amp; Alerts</span>
            </div>
          </div>
          <div className={`liquid-dropdown-badge ${displayList.length === 0 ? 'empty' : ''}`}>
            {loading ? '...' : displayList.length > 0 ? `${displayList.length} Active` : '0 New'}
          </div>
        </div>

        {/* Notifications List */}
        <div className="liquid-dropdown-list">
          {loading ? (
            <div className="liquid-notif-empty">
              <div className="liquid-notif-empty-icon">⏳</div>
              <h5 className="liquid-notif-empty-title">Checking for Updates...</h5>
              <p className="liquid-notif-empty-desc">
                Fetching latest notifications from Algora command...
              </p>
            </div>
          ) : displayList.length === 0 ? (
            <div className="liquid-notif-empty">
              <div className="liquid-notif-empty-icon">🔕</div>
              <h5 className="liquid-notif-empty-title">No Notifications</h5>
              <p className="liquid-notif-empty-desc">
                You're all caught up! When new announcements or deity trial updates go live, they will appear here.
              </p>
            </div>
          ) : (
            displayList.map((item, index) => {
              const hasLink = Boolean(item.btnLink);
              return (
                <div
                  key={item.id || index}
                  className={`liquid-notif-card ${item.isPush ? 'is-push' : ''}`}
                  onClick={() => handleItemClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                >
                  <div className="liquid-notif-card-accent" />
                  
                  <div className="liquid-notif-icon-col">
                    <span className="liquid-notif-emoji">{item.icon || (item.isPush ? '🔔' : '📢')}</span>
                  </div>

                  <div className="liquid-notif-content-col">
                    <div className="liquid-notif-header-row">
                      <h5 className="liquid-notif-item-title">{item.title}</h5>
                      <div className="liquid-notif-meta-row">
                        {item.isPush && (
                          <span className="liquid-notif-tag push">Push</span>
                        )}
                        {item.time && (
                          <span className="liquid-notif-time">{item.time}</span>
                        )}
                      </div>
                    </div>

                    {item.body && (
                      <p className="liquid-notif-item-body">{item.body}</p>
                    )}

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
            })
          )}
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
                : permissionStatus === 'denied'
                ? 'Push alerts blocked'
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

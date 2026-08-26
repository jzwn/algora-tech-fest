import { useState, useEffect } from 'react';
import { useMessaging } from '../hooks/useMessaging';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar({ onTriggerNotice }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { permissionStatus, requestPermission, pushNotifications } = useMessaging();
  const { campaigns } = useRemoteConfig();

  const activeCampaigns = (campaigns || []).filter(c => c && c.enabled !== false && c.enabled !== 'false');
  const totalNotifs = (pushNotifications?.length || 0) + activeCampaigns.length;
  const hasNotifications = totalNotifs > 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setIsNotificationOpen(prev => !prev);
  };

  const links = ['About', 'Events', 'Schedule', 'Gallery', 'Sponsors', 'Contact'];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <img src="/algora_logo.png" alt="Logo" style={{ width: '32px', height: '32px' }} />
            <span className="nav-logo-text">ALGORA<span className="nav-logo-year"> '26</span></span>
          </a>

          {/* Liquid Glass Navigation Dock (Header Only) */}
          <ul className="nav-links nav-liquid-dock">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="nav-liquid-btn">
                  <span className="nav-liquid-btn-text">{l}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            {/* Notification Bell Anchor Wrapper */}
            <div className="nav-notif-anchor">
              <button
                className={`nav-notif-btn-round ${isNotificationOpen ? 'active' : ''}`}
                onClick={toggleNotifications}
                title="View Notifications & Announcements"
                aria-label="Toggle notifications dropdown"
                aria-expanded={isNotificationOpen}
              >
                <span className="nav-notif-bell-icon">🔔</span>
                {hasNotifications && <span className="nav-notif-badge-dot" />}
              </button>

              {/* Anchored Liquid Glass Notification List Dropdown */}
              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
              />
            </div>

            <button
              className="nav-register"
              onClick={onTriggerNotice}
            >
              Register
            </button>
            
            <div style={{
              marginLeft: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              lineHeight: '1.1',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              paddingLeft: '16px'
            }}>
              <span style={{ fontFamily: 'var(--condensed)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--white)' }}>St.George's</span>
              <span style={{ fontFamily: 'var(--condensed)', fontSize: '0.55rem', letterSpacing: '0.5px', color: 'var(--gray)' }}>College Aruvithura</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="mobile-menu-links">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              <span>{l}</span>
              <span className="mobile-nav-link-arrow">→</span>
            </a>
          ))}
        </div>

        <button
          className="mobile-notif-btn"
          onClick={() => {
            setMenuOpen(false);
            setIsNotificationOpen(true);
          }}
        >
          <span>🔔</span>
          <span>View Notifications</span>
        </button>

        <button
          className="mobile-register-btn"
          onClick={() => {
            setMenuOpen(false);
            if (onTriggerNotice) onTriggerNotice();
          }}
        >
          Register Now →
        </button>
      </div>
    </>
  );
}

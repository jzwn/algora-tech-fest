import { useEffect } from 'react';
import { logAnalyticsEvent } from '../firebase';

export function useAnalytics() {
  useEffect(() => {
    // Automatically log page view on mount
    logAnalyticsEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, []);

  const trackEvent = (eventName, params = {}) => {
    logAnalyticsEvent(eventName, params);
  };

  return { trackEvent };
}

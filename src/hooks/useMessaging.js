import { useState, useEffect } from 'react';
import { requestFCMToken, onForegroundMessage, logAnalyticsEvent } from '../firebase';

export function useMessaging() {
  const [fcmToken, setFcmToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'unsupported'
  );
  const [foregroundNotification, setForegroundNotification] = useState(null);

  const requestPermission = async () => {
    const token = await requestFCMToken();
    if (token) {
      setFcmToken(token);
      setPermissionStatus('granted');
      logAnalyticsEvent('fcm_permission_granted');
    } else {
      setPermissionStatus(
        typeof window !== 'undefined' && 'Notification' in window
          ? Notification.permission
          : 'denied'
      );
      logAnalyticsEvent('fcm_permission_denied');
    }
    return token;
  };

  useEffect(() => {
    // Register listener for foreground push notifications
    onForegroundMessage((payload) => {
      setForegroundNotification(payload);
      
      logAnalyticsEvent('push_notification_received_foreground', {
        title: payload.notification?.title || '',
      });
    });

    // Auto-request notification permission on first load if not decided yet ('default')
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      const timer = setTimeout(() => {
        requestPermission();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const clearNotification = () => {
    setForegroundNotification(null);
  };

  return {
    fcmToken,
    permissionStatus,
    foregroundNotification,
    requestPermission,
    clearNotification,
  };
}

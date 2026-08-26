import { useState, useEffect } from 'react';
import { requestFCMToken, onForegroundMessage, logAnalyticsEvent } from '../firebase';

const FCM_PUSH_HISTORY_KEY = 'algora_fcm_push_history';

function getStoredPushHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(FCM_PUSH_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredPushHistory(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FCM_PUSH_HISTORY_KEY, JSON.stringify(items.slice(0, 15)));
  } catch (err) {
    console.warn('[useMessaging] Could not save push notifications to localStorage:', err);
  }
}

export function useMessaging() {
  const [fcmToken, setFcmToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'unsupported'
  );
  const [foregroundNotification, setForegroundNotification] = useState(null);
  const [pushNotifications, setPushNotifications] = useState(getStoredPushHistory);

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

  const clearNotification = () => {
    setForegroundNotification(null);
  };

  const dismissPushNotification = (id) => {
    setPushNotifications((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveStoredPushHistory(updated);
      window.dispatchEvent(new CustomEvent('algora_push_history_updated', { detail: updated }));
      return updated;
    });
  };

  const clearAllPushNotifications = () => {
    setPushNotifications([]);
    saveStoredPushHistory([]);
    window.dispatchEvent(new CustomEvent('algora_push_history_updated', { detail: [] }));
  };

  useEffect(() => {
    const handlePushUpdate = (e) => {
      if (e.detail) {
        setPushNotifications(e.detail);
      }
    };

    window.addEventListener('algora_push_history_updated', handlePushUpdate);
    return () => {
      window.removeEventListener('algora_push_history_updated', handlePushUpdate);
    };
  }, []);

  useEffect(() => {
    // Register listener for foreground push notifications
    onForegroundMessage((payload) => {
      setForegroundNotification(payload);

      const newPushItem = {
        id: payload.messageId || payload.data?.id || `push_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        title: payload.notification?.title || payload.data?.title || 'Push Announcement',
        body: payload.notification?.body || payload.data?.body || '',
        btnLink: payload.data?.link || payload.data?.url || payload.data?.btnLink || payload.fcmOptions?.link || payload.data?.click_action || '',
        btnText: payload.data?.btnText || ((payload.data?.link || payload.data?.url || payload.fcmOptions?.link || payload.data?.click_action) ? 'View Link' : ''),
        icon: payload.data?.icon || '🔔',
        time: payload.data?.time || 'Push Alert',
        receivedAt: Date.now(),
        isPush: true,
        unread: true,
      };

      setPushNotifications((prev) => {
        const updated = [newPushItem, ...prev.filter((i) => i.id !== newPushItem.id)].slice(0, 15);
        saveStoredPushHistory(updated);
        window.dispatchEvent(new CustomEvent('algora_push_history_updated', { detail: updated }));
        return updated;
      });
      
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

  return {
    fcmToken,
    permissionStatus,
    foregroundNotification,
    pushNotifications,
    requestPermission,
    clearNotification,
    dismissPushNotification,
    clearAllPushNotifications,
  };
}

import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported, logEvent as firebaseLogEvent } from 'firebase/analytics';
import { getRemoteConfig, isSupported as isRemoteConfigSupported, fetchAndActivate, getValue, getAll } from 'firebase/remote-config';
import { getMessaging, isSupported as isMessagingSupported, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Safe Analytics Instance
let analyticsInstance = null;
const initAnalyticsPromise = (async () => {
  if (typeof window === 'undefined') return null;
  try {
    const supported = await isAnalyticsSupported();
    if (supported && firebaseConfig.apiKey && firebaseConfig.apiKey !== "your_api_key_here") {
      analyticsInstance = getAnalytics(app);
      console.log('[Firebase] Analytics initialized successfully.');
      return analyticsInstance;
    } else {
      console.info('[Firebase] Analytics skipped (Missing config or unsupported environment).');
    }
  } catch (err) {
    console.warn('[Firebase] Analytics initialization error:', err);
  }
  return null;
})();

/**
 * Log custom analytics event safely
 * @param {string} eventName 
 * @param {Object} [eventParams] 
 */
export const logAnalyticsEvent = async (eventName, eventParams = {}) => {
  try {
    const analytics = await initAnalyticsPromise;
    if (analytics) {
      firebaseLogEvent(analytics, eventName, eventParams);
      console.log(`[Firebase Analytics] Event logged: ${eventName}`, eventParams);
    } else {
      console.log(`[Firebase Analytics (Mock)] Event logged: ${eventName}`, eventParams);
    }
  } catch (err) {
    console.warn(`[Firebase Analytics] Failed to log event ${eventName}:`, err);
  }
};

// Safe Remote Config Instance
let remoteConfigInstance = null;
const initRemoteConfigPromise = (async () => {
  if (typeof window === 'undefined') return null;
  try {
    const supported = await isRemoteConfigSupported();
    if (supported && firebaseConfig.apiKey && firebaseConfig.apiKey !== "your_api_key_here") {
      remoteConfigInstance = getRemoteConfig(app);
      
      // Minimum fetch interval: 10 seconds in dev mode, 1 hour in production
      remoteConfigInstance.settings = {
        minimumFetchIntervalMillis: import.meta.env.DEV ? 10000 : 3600000,
        fetchTimeoutMillis: 10000,
      };

      // Default values (empty array if no Remote Config set)
      remoteConfigInstance.defaultConfig = {
        in_app_messages: "[]"
      };

      await fetchAndActivate(remoteConfigInstance);
      console.log('[Firebase] Remote Config fetched and activated successfully.');
      return remoteConfigInstance;
    } else {
      console.info('[Firebase] Remote Config skipped (Missing config or unsupported environment).');
    }
  } catch (err) {
    console.warn('[Firebase] Remote Config fetch/activation warning:', err);
  }
  return null;
})();

// Safe Messaging (FCM) Instance
let messagingInstance = null;
const initMessagingPromise = (async () => {
  if (typeof window === 'undefined') return null;
  try {
    const supported = await isMessagingSupported();
    if (supported && firebaseConfig.apiKey && firebaseConfig.apiKey !== "your_api_key_here") {
      messagingInstance = getMessaging(app);
      console.log('[Firebase] Cloud Messaging (FCM) initialized successfully.');
      return messagingInstance;
    } else {
      console.info('[Firebase] Cloud Messaging skipped (Unsupported environment or missing config).');
    }
  } catch (err) {
    console.warn('[Firebase] Cloud Messaging initialization error:', err);
  }
  return null;
})();

/**
 * Request notification permission and get FCM Web Push registration token
 */
export const requestFCMToken = async () => {
  try {
    const messaging = await initMessagingPromise;
    if (!messaging) {
      console.warn('[FCM] Messaging is not supported in this browser or environment.');
      return null;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY || '';
      
      // Explicitly register Service Worker with dynamic config query params
      let swRegistration = null;
      if ('serviceWorker' in navigator) {
        const swParams = new URLSearchParams({
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
          appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
        }).toString();
        swRegistration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${swParams}`);
      }

      const token = await getToken(messaging, {
        vapidKey: vapidKey || undefined,
        serviceWorkerRegistration: swRegistration || undefined,
      });
      console.log('[FCM] Web Push Registration Token:', token);
      return token;
    } else {
      console.info('[FCM] Notification permission denied by user.');
      return null;
    }
  } catch (err) {
    console.error('[FCM] Error requesting FCM token:', err);
    return null;
  }
};

/**
 * Listen for foreground push notifications when tab is active
 * @param {Function} callback 
 */
export const onForegroundMessage = (callback) => {
  initMessagingPromise.then((messaging) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log('[FCM] Foreground push message received:', payload);
        if (callback) callback(payload);
      });
    }
  });
};

export {
  app,
  analyticsInstance,
  remoteConfigInstance,
  messagingInstance,
  initAnalyticsPromise,
  initRemoteConfigPromise,
  initMessagingPromise,
  getValue,
  getAll
};

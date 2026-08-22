// Firebase Cloud Messaging Background Service Worker
// Gives your web app the ability to receive push notifications when the tab or browser is in the background.

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Dynamically parse Firebase config parameters from service worker registration URL
const urlParams = new URLSearchParams(self.location.search);
const firebaseConfig = {
  apiKey: urlParams.get('apiKey') || '',
  authDomain: urlParams.get('authDomain') || '',
  projectId: urlParams.get('projectId') || '',
  storageBucket: urlParams.get('storageBucket') || '',
  messagingSenderId: urlParams.get('messagingSenderId') || '',
  appId: urlParams.get('appId') || ''
};

// Initialize Firebase App inside Service Worker if valid config exists
if (firebaseConfig.apiKey && typeof firebase !== 'undefined' && firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Retrieve Firebase Messaging object
let messaging = null;
try {
  if (typeof firebase !== 'undefined' && firebase.messaging.isSupported()) {
    messaging = firebase.messaging();

    // Listen for background push notifications
    messaging.onBackgroundMessage((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message:', payload);
      
      const notificationTitle = payload.notification?.title || 'Algora 2026 Notification';
      const notificationOptions = {
        body: payload.notification?.body || 'You have a new update from Algora 2026.',
        icon: payload.notification?.icon || '/favicon.ico',
        data: payload.data || {},
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
} catch (err) {
  console.warn('[firebase-messaging-sw.js] Messaging in service worker error:', err);
}

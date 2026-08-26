import { useState, useEffect } from 'react';
import { initRemoteConfigPromise, getValue } from '../firebase';

export function useRemoteConfig() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    initRemoteConfigPromise.then((remoteConfig) => {
      if (!isMounted) return;
      if (remoteConfig) {
        try {
          // Attempt reading 'in_app_messages' first
          const rawInApp = getValue(remoteConfig, 'in_app_messages');
          let jsonStr = rawInApp.asString();

          // Fallback to checking 'notifications' parameter if in_app_messages is empty
          if (!jsonStr || jsonStr === '[]' || jsonStr === '') {
            const rawNotif = getValue(remoteConfig, 'notifications');
            const notifStr = rawNotif.asString();
            if (notifStr) jsonStr = notifStr;
          }

          if (jsonStr) {
            const parsedArray = JSON.parse(jsonStr);
            if (Array.isArray(parsedArray)) {
              setCampaigns(parsedArray);
            } else {
              setCampaigns([]);
            }
          } else {
            setCampaigns([]);
          }
        } catch (err) {
          console.warn('[useRemoteConfig] Could not parse Remote Config JSON:', err);
          setCampaigns([]);
        }
      } else {
        setCampaigns([]);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { campaigns, loading };
}

import { useState, useEffect } from 'react';
import { initRemoteConfigPromise, getValue, getAll } from '../firebase';

export function useRemoteConfig() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    initRemoteConfigPromise.then((remoteConfig) => {
      if (!isMounted) return;
      if (remoteConfig) {
        try {
          const rawVal = getValue(remoteConfig, 'in_app_messages');
          const jsonStr = rawVal.asString();

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
          console.warn('[useRemoteConfig] Could not parse in_app_messages JSON:', err);
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

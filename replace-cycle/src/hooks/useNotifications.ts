import { useState, useEffect, useCallback } from 'react';
import type { ConsumableItem } from '../types';
import {
  requestNotificationPermission,
  registerServiceWorker,
  scheduleNotificationCheck,
} from '../utils/notifications';

export const useNotifications = (items: ConsumableItem[]) => {
  const [permission, setPermission] = useState<NotificationPermission>(
    () => ('Notification' in window ? Notification.permission : 'denied'),
  );
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    registerServiceWorker()
      .then((registration) => {
        setSwRegistered(registration !== null);
      })
      .catch((error) => {
        console.error('SW registration error in hook:', error);
      });
  }, []);

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    try {
      const result = await requestNotificationPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Failed to request permission:', error);
      return 'denied';
    }
  }, []);

  const checkAndNotify = useCallback((): void => {
    if (permission === 'granted' && swRegistered) {
      scheduleNotificationCheck(items);
    }
  }, [items, permission, swRegistered]);

  useEffect(() => {
    if (permission === 'granted' && swRegistered && items.length > 0) {
      scheduleNotificationCheck(items);
    }
  }, [items, permission, swRegistered]);

  return { permission, swRegistered, requestPermission, checkAndNotify };
};

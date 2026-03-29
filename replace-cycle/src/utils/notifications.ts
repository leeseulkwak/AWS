import type { ConsumableItem } from '../types';
import { getDaysRemaining } from './cycleUtils';

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    return 'denied';
  }
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    return registration;
  } catch (error) {
    console.error('Service worker registration failed:', error);
    return null;
  }
};

export const scheduleNotificationCheck = (items: ConsumableItem[]): void => {
  if (!('serviceWorker' in navigator) || Notification.permission !== 'granted') {
    return;
  }

  const dueItems = items.filter((item) => {
    const daysRemaining = getDaysRemaining(item.lastReplacedAt, item.intervalDays);
    return daysRemaining <= 0;
  });

  if (dueItems.length === 0) return;

  navigator.serviceWorker.ready
    .then((registration) => {
      dueItems.forEach((item) => {
        const daysRemaining = getDaysRemaining(item.lastReplacedAt, item.intervalDays);
        const daysOverdue = Math.abs(daysRemaining);

        const title = `${item.icon} ${item.name} 교체 시기`;
        const body =
          daysRemaining === 0
            ? '오늘 교체할 시기입니다!'
            : `${daysOverdue}일 지났습니다. 지금 교체하세요!`;

        registration.active?.postMessage({
          type: 'NOTIFY_DUE',
          title,
          body,
        });
      });
    })
    .catch((error) => {
      console.error('Failed to send notification via service worker:', error);
    });
};

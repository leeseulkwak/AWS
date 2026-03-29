self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('message', (e) => {
  if (e.data?.type === 'NOTIFY_DUE') {
    const { title, body } = e.data;
    self.registration.showNotification(title, {
      body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
    });
  }
});

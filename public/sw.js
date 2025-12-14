/* Service Worker for Web Push */
self.addEventListener('push', function (event) {
  // Debug log for incoming push
  console.log('[SW] Push event received:', event);
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {}
  const title = data.title || 'New notification';
  const body = data.body || '';
  const url = data.url || null;
  const options = {
    body,
    data: { url },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[SW] Notification click:', event.notification);
  event.notification.close();
  const url = event.notification?.data?.url;
  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { List, Card, Typography, Tag, Empty, Skeleton, message, Button, Alert } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import api from '../../services/api';
import { GoogleMeetModal } from '../../components/GoogleMeetModal';

const { Title, Paragraph, Text } = Typography;

const StudentAnnouncements = () => {
  const { courseId } = useParams();
  const courseIdNum = courseId ? Number(courseId) : null;
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [seenIds, setSeenIds] = useState(new Set());
  const [wsError, setWsError] = useState(false);
  const [meetModalOpen, setMeetModalOpen] = useState(false);
  const [selectedMeetUrl, setSelectedMeetUrl] = useState('');
  const [selectedAnnouncementTitle, setSelectedAnnouncementTitle] = useState('');

  const handleOpenMeetModal = (meetUrl, announcementTitle) => {
    setSelectedMeetUrl(meetUrl);
    setSelectedAnnouncementTitle(announcementTitle);
    setMeetModalOpen(true);
  };

  // Helper to convert base64 public key to Uint8Array for pushManager
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/student/courses/${courseId}/announcements`);
      const list = res.data || [];
      // Determine new items for notification
      const currentIds = new Set(announcements.map(a => a.id));
      const newOnes = list.filter(a => !currentIds.has(a.id));
      if (newOnes.length > 0 && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try {
          newOnes.slice(0, 3).forEach(a => {
            const body = (a.type === 'class_schedule' && a.class_link) ? `${a.content}\nClick to join class` : a.content;
            const n = new Notification(a.type === 'class_schedule' ? `Class scheduled: ${a.title}` : `New announcement: ${a.title}`, { body });
            n.onclick = () => {
              window.focus();
              if (a.class_link) {
                handleOpenMeetModal(a.class_link, a.title);
              }
            };
          });
        } catch {}
      }
      setAnnouncements(list);
      setSeenIds(new Set(list.map(a => a.id)));
    } catch (error) {
      message.error(error.response?.data?.detail || 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!courseId || Number.isNaN(courseIdNum)) return;
    // Initial load only; polling fallback is intentionally disabled
    fetchAnnouncements();
  }, [courseId]);

  // Register SW and subscribe to Web Push (once per mount)
  useEffect(() => {
    const setupPush = async () => {
      try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
        // Ask notification permission if still default
        if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
          try { 
            const perm = await Notification.requestPermission();
            console.log('[Push] Notification permission requested:', perm);
          } catch (e) {
            console.log('[Push] Error requesting permission', e);
          }
        }
        if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
          console.log('[Push] Permission not granted, skipping subscription');
          return;
        }
        // Register service worker
        const reg = await navigator.serviceWorker.register('/sw.js');
        console.log('[SW] Registered:', reg.scope);
        // Get VAPID key
        const { data } = await api.get('/push/public-key');
        const publicKey = data?.publicKey;
        if (!publicKey) {
          console.log('[Push] No public key from backend');
          return;
        }
        // Subscribe
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });
        console.log('[Push] Subscribed:', sub);
        // Send to backend
        await api.post('/push/subscribe', {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.toJSON().keys.p256dh,
            auth: sub.toJSON().keys.auth,
          },
        });
        console.log('[Push] Subscription saved to backend');
      } catch (e) {
        console.log('[Push] Setup error:', e);
      }
    };
    setupPush();
  }, []);

  useEffect(() => {
    if (!courseId || Number.isNaN(courseIdNum)) return;
    let ws;
    try {
      const url = `ws://https://brainbuzz-backend-1.onrender.com/ws/courses/${courseId}/announcements`;
      ws = new WebSocket(url);
      ws.onopen = () => console.log('[WS] Opened announcements channel for course', courseId);
      if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
      ws.onerror = (e) => { console.log('[WS] Error', e); setWsError(true); };
      ws.onclose = (e) => { console.log('[WS] Closed', e.code, e.reason); setWsError(true); };
      ws.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (data?.type === 'announcement:new' && data.announcement) {
            setAnnouncements(prev => [{
              ...data.announcement,
              read: false,
              read_at: null,
            }, ...prev]);
            console.log('[WS] New announcement received', data.announcement);
            if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
              try {
                const a = data.announcement;
                const body = (a.type === 'class_schedule' && a.class_link) ? `${a.content}\nClick to join class` : a.content;
                const n = new Notification((a.type === 'class_schedule') ? `Class scheduled: ${a.title}` : `New announcement: ${a.title}`, {
                  body,
                });
                n.onclick = () => {
                  window.focus();
                  if (a.class_link) {
                    handleOpenMeetModal(a.class_link, a.title);
                  }
                };
                console.log('[Push] Notification shown for', a.title);
              } catch {}
            }
          }
        } catch { /* ignore */ }
      };
    } catch { /* ignore */ }
    return () => {
      try { ws && ws.close(); } catch { /* ignore */ }
    };
  }, [courseId]);

  const hasUnread = useMemo(() => announcements.some(a => !(a.read || a.read_at || a.readAt)), [announcements]);

  const markAsRead = async (id) => {
    try {
      await api.post(`/student/courses/${courseId}/announcements/${id}/read`);
      setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, read: true, read_at: new Date().toISOString() } : a));
    } catch (e) {
      // non-blocking
    }
  };

  return (
    <div className="p-3 sm:p-4">
      {wsError && (
        <Alert
          type="error"
          showIcon
          className="mb-3"
          message="Live updates unavailable"
          description="We couldn't establish a live connection. Please reload the page and try again later."
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <Title level={4} className="mb-0 text-lg sm:text-xl">Announcements</Title>
          {hasUnread && <Tag color="red" className="text-xs sm:text-sm">New</Tag>}
        </div>
      </div>
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>

      {loading ? (
        <Card className="mb-4">
          <Skeleton active paragraph={{ rows: 3 }} />
        </Card>
      ) : announcements.length === 0 ? (
        <Empty description={<span className="text-gray-500">No announcements yet</span>} />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={announcements}
          renderItem={(item) => {
            const isUnread = !(item.read || item.read_at || item.readAt);
            return (
              <Card
                key={item.id}
                className={`mb-3 transition-colors ${isUnread ? 'border-l-4 border-l-blue-500' : ''}`}
                onClick={() => isUnread && markAsRead(item.id)}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start gap-3">
                    <BellOutlined className="text-blue-500 mt-1 text-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <Title level={5} className="m-0 text-base sm:text-lg truncate" style={{ lineHeight: '1.3' }}>{item.title}</Title>
                        {isUnread && <Tag color="blue" className="text-xs">New</Tag>}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Tag color={item.type === 'class_schedule' ? 'green' : 'blue'} className="text-xs sm:text-sm">
                          {item.type === 'class_schedule' ? 'Class' : 'Announcement'}
                        </Tag>
                        <Text type="secondary" className="text-xs sm:text-sm">
                          {dayjs(item.created_at || item.createdAt).format('MMM D, h:mm A')}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Paragraph className="mb-3 text-sm sm:text-base" style={{ marginBottom: '8px' }}>{item.content}</Paragraph>
                  {item.class_link && (
                    <Button 
                      type="primary" 
                      onClick={() => handleOpenMeetModal(item.class_link, item.title)}
                      size="small"
                      className="w-full sm:w-auto"
                    >
                      Join Class
                    </Button>
                  )}
                </div>
              </Card>
            );
          }}
        />
      )}
      </div>
      
      <GoogleMeetModal
        isOpen={meetModalOpen}
        onClose={() => setMeetModalOpen(false)}
        meetUrl={selectedMeetUrl}
        announcementTitle={selectedAnnouncementTitle}
      />
    </div>
  );
};

export default StudentAnnouncements;

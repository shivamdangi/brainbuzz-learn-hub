import { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { List, Card, Typography, Tag, Empty, Skeleton, Modal, Form, Input, Button, message, FloatButton, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import api from '../../services/api';

const { Title, Paragraph, Text } = Typography;

const TeacherAnnouncements = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [type, setType] = useState('communication');

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/teacher/courses/${courseId}/announcements`);
      setAnnouncements(res.data || []);
    } catch (error) {
      message.error(error.response?.data?.detail || 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchAnnouncements();
    }
  }, [courseId]);

  const openCreate = () => setIsModalOpen(true);
  const closeCreate = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);
      const payload = {
        title: values.title,
        content: values.content,
        type: values.type,
        class_link: values.class_link || null,
      };
      await api.post(`/teacher/courses/${courseId}/announcements`, payload);
      message.success('Announcement created');
      closeCreate();
      fetchAnnouncements();
    } catch (error) {
      if (error?.errorFields) return;
      message.error(error.response?.data?.detail || 'Failed to create announcement');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-2 md:p-3">
      <Title level={4} className="mb-4">Announcements</Title>
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 220px)' }}>
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
            renderItem={(item) => (
              <Card key={item.id} className="mb-3">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <Title level={5} className="m-0">{item.title}</Title>
                    <Text type="secondary" className="block mb-2">
                      {dayjs(item.created_at || item.createdAt).format('MMM D, YYYY h:mm A')}
                    </Text>
                    <div className="mb-2">
                      <Tag color={item.type === 'class_schedule' ? 'green' : 'blue'}>
                        {item.type === 'class_schedule' ? 'Class Schedule' : 'Communication'}
                      </Tag>
                    </div>
                    <Paragraph className="mb-2">{item.content}</Paragraph>
                    {item.type === 'class_schedule' && item.class_link && (
                      <Button type="primary" href={item.class_link} target="_blank" rel="noopener noreferrer">
                        Join Class
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}
          />
        )}
      </div>

      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={openCreate}
        style={{ right: 24, bottom: 24 }}
      />

      <Modal
        title="Create Announcement"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={closeCreate}
        confirmLoading={submitting}
        okText="Create"
      >
        <Form form={form} layout="vertical" initialValues={{ type: 'communication' }}>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'communication', label: 'Communication' },
                { value: 'class_schedule', label: 'Class Schedule' },
              ]}
              onChange={(v) => setType(v)}
            />
          </Form.Item>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
            <Input placeholder="Announcement title" maxLength={120} />
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter content' }]}>
            <Input.TextArea rows={5} placeholder="Write the announcement..." />
          </Form.Item>
          {type === 'class_schedule' && (
            <Form.Item name="class_link" label="Class Link" rules={[{ required: true, message: 'Class link is required for Class Schedule' }]}>
              <Input placeholder="https://..." type="url" />
            </Form.Item>
          )}
        </Form>
      </Modal>

      <Outlet />
    </div>
  );
};

export default TeacherAnnouncements;

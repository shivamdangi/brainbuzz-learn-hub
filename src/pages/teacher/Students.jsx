import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Card, Empty, Skeleton, message, Avatar, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import api from '../../services/api';

const TeacherStudents = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/teacher/courses/${courseId}/students`);
        setStudents(res.data || []);
      } catch (err) {
        message.error(err.response?.data?.detail || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    if (courseId) load();
  }, [courseId]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      responsive: ['md'],
    },
    {
      title: 'Student',
      key: 'student',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.full_name || record.username}</div>
            <div className="text-gray-500 text-xs">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      responsive: ['lg'],
    },
    {
      title: 'Status',
      key: 'is_active',
      render: (_, r) => (
        r.is_active ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>
      ),
      width: 120,
      align: 'center',
      responsive: ['sm'],
    },
  ];

  return (
    <div className="p-2 md:p-3">
      <Card bodyStyle={{ padding: 0 }}>
        {loading ? (
          <div className="p-4"><Skeleton active paragraph={{ rows: 4 }} /></div>
        ) : students.length === 0 ? (
          <div className="p-6"><Empty description={<span className="text-gray-500">No students enrolled yet</span>} /></div>
        ) : (
          <Table
            rowKey="id"
            dataSource={students}
            columns={columns}
            pagination={{ pageSize: 10 }}
            scroll={{ x: true }}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherStudents;

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import './Dashboard.css';
import api from '../../services/api';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_users: 0,
    total_courses: 0,
    total_students: 0,
    total_teachers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/stats');
        setStats(res.data || {});
      } catch (e) {
        // silent fail keeps previous zeros
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="stats-grid">
        <Card className="stat-card" loading={loading}>
          <Statistic
            title="Total Users"
            value={stats.total_users || 0}
            prefix={<UserOutlined />}
          />
        </Card>
        <Card className="stat-card" loading={loading}>
          <Statistic
            title="Total Courses"
            value={stats.total_courses || 0}
            prefix={<BookOutlined />}
          />
        </Card>
        <Card className="stat-card" loading={loading}>
          <Statistic
            title="Total Students"
            value={stats.total_students || 0}
            prefix={<TeamOutlined />}
          />
        </Card>
        <Card className="stat-card" loading={loading}>
          <Statistic
            title="Total Teachers"
            value={stats.total_teachers || 0}
            prefix={<TeamOutlined />}
          />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  // These would come from your API
  const stats = {
    totalUsers: 0,
    totalCourses: 0,
    totalStudents: 0,
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Courses"
              value={stats.totalCourses}
              prefix={<BookOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Students"
              value={stats.totalStudents}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;